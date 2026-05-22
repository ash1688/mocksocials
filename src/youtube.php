<?php
declare(strict_types=1);

function handle_youtube(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') { yt_post_handler(); return; }
    $action = $_GET['action'] ?? 'feed';
    switch ($action) {
        case 'upload':    yt_upload_form(); break;
        case 'watch':     yt_watch(); break;
        case 'channel':   yt_channel(); break;
        case 'analytics': yt_analytics(); break;
        case 'feed':
        default:          yt_feed(); break;
    }
}

function yt_post_handler(): void {
    $sub = $_POST['subaction'] ?? '';
    $me  = current_user();
    log_event('youtube.'.$sub, 'post_id=' . ($_POST['post_id'] ?? '-') . ' title=' . ($_POST['title'] ?? '-'));
    if ($sub === 'upload') {
        $title    = trim((string)($_POST['title'] ?? ''));
        $desc     = trim((string)($_POST['content'] ?? ''));
        $thumb    = trim((string)($_POST['thumbnail_url'] ?? ''));
        $duration = trim((string)($_POST['duration'] ?? '0:00'));
        $profile  = $_POST['stats_profile'] ?? 'low';
        if (!in_array($profile, ['low','moderate','high','hyped','viral'], true)) $profile = 'low';
        if ($title === '') { flash('Title is required.'); redirect(url(['platform'=>'youtube','action'=>'upload'])); }

        if ($thumb === '') $thumb = 'https://picsum.photos/seed/yt'.random_int(1,9999).'/640/360';

        q('INSERT INTO posts (user_id, platform, content) VALUES (?,?,?)', [$me['id'],'youtube',$desc]);
        $pid = (int)db()->lastInsertId();
        $seed = youtube_seed($profile);
        $pct = random_int(25, 30);
        q('INSERT INTO youtube_meta (post_id, video_title, thumbnail_url, duration_display, stats_profile, premium_view_pct, seed_views, seed_likes, seed_comments, seed_sub_boost)
           VALUES (?,?,?,?,?,?,?,?,?,?)',
           [$pid, $title, $thumb, $duration, $profile, $pct, $seed['views'], $seed['likes'], $seed['comments'], $seed['sub_boost']]);

        // boost user's subscriber count
        $curSubs = get_stat((int)$me['id'], 'youtube', 'subscribers');
        set_stat((int)$me['id'], 'youtube', 'subscribers', $curSubs + $seed['sub_boost']);
        $curViews = get_stat((int)$me['id'], 'youtube', 'total_views');
        set_stat((int)$me['id'], 'youtube', 'total_views', $curViews + $seed['views']);

        flash('Video published.');
        redirect(url(['platform'=>'youtube','action'=>'watch','id'=>$pid]));
    } elseif ($sub === 'like') {
        $pid = (int)$_POST['post_id'];
        $exists = q('SELECT id FROM likes WHERE post_id=? AND user_id=?', [$pid, $me['id']])->fetch();
        if ($exists) q('DELETE FROM likes WHERE id=?', [$exists['id']]);
        else q('INSERT INTO likes (post_id, user_id) VALUES (?,?)', [$pid, $me['id']]);
    } elseif ($sub === 'comment') {
        $pid = (int)$_POST['post_id'];
        $c = trim((string)($_POST['content'] ?? ''));
        if ($c !== '') q('INSERT INTO comments (post_id, user_id, content) VALUES (?,?,?)', [$pid, $me['id'], $c]);
    }
    redirect($_POST['_return'] ?? url(['platform'=>'youtube']));
}

function yt_subnav(string $active = 'feed'): void {
    ?>
    <div class="yt-subnav">
      <a class="<?= $active==='feed'?'active':'' ?>"      href="<?= url(['platform'=>'youtube']) ?>">Home</a>
      <a class="<?= $active==='upload'?'active':'' ?>"    href="<?= url(['platform'=>'youtube','action'=>'upload']) ?>">Upload</a>
      <a class="<?= $active==='channel'?'active':'' ?>"   href="<?= url(['platform'=>'youtube','action'=>'channel']) ?>">My channel</a>
      <a class="<?= $active==='analytics'?'active':'' ?>" href="<?= url(['platform'=>'youtube','action'=>'analytics']) ?>">Analytics</a>
    </div>
    <?php
}

function yt_feed(): void {
    $rows = q("SELECT p.*, ym.*, ".author_select_sql().", ym.post_id AS pid
               FROM posts p
               JOIN youtube_meta ym ON ym.post_id = p.id
               ".author_join_sql()."
               WHERE p.platform='youtube'
               ORDER BY p.created_at DESC LIMIT 50")->fetchAll();
    render_header('youtube', 'MockTube');
    render_flash();
    yt_subnav('feed');
    ?>
    <div class="yt-grid">
      <?php foreach ($rows as $r): yt_render_card($r); endforeach; ?>
    </div>
    <?php
    render_footer();
}

function yt_render_card(array $r): void {
    $viral = in_array($r['stats_profile'], ['hyped','viral'], true);
    ?>
    <a class="yt-card" href="<?= url(['platform'=>'youtube','action'=>'watch','id'=>$r['post_id']]) ?>">
      <div class="yt-thumb">
        <img src="<?= e($r['thumbnail_url']) ?>" alt="">
        <span class="yt-duration"><?= e($r['duration_display']) ?></span>
        <span class="yt-play">▶</span>
        <?php if ($viral): ?><span class="yt-badge">🔥 <?= e(ucfirst($r['stats_profile'])) ?></span><?php endif; ?>
      </div>
      <div class="yt-meta">
        <img class="avatar-sm" src="<?= e($r['avatar_url'] ?: 'https://picsum.photos/seed/u'.($r['user_id'] ?? $r['fake_user_id']).'/40') ?>" alt="">
        <div>
          <div class="yt-title"><?= e($r['video_title']) ?></div>
          <div class="muted small"><?= e($r['display_name']) ?></div>
          <div class="muted small"><?= pretty_number((int)$r['seed_views']) ?> views · <?= e(relative_time($r['created_at'])) ?> ago</div>
        </div>
      </div>
    </a>
    <?php
}

function yt_watch(): void {
    $id = (int)($_GET['id'] ?? 0);
    $r = q("SELECT p.*, ym.*, ".author_select_sql()."
            FROM posts p JOIN youtube_meta ym ON ym.post_id=p.id
            ".author_join_sql()." WHERE p.id=?", [$id])->fetch();
    if (!$r) { http_response_code(404); echo 'Not found'; return; }
    $me = current_user();
    $likes = (int)q('SELECT COUNT(*) c FROM likes WHERE post_id=?', [$id])->fetch()['c'] + (int)$r['seed_likes'];
    $myLike = q('SELECT id FROM likes WHERE post_id=? AND user_id=?', [$id, $me['id']])->fetch();
    $comments = q("SELECT c.*,
                          COALESCE(u.display_name, fu.display_name) AS display_name,
                          COALESCE(u.avatar_url,   fu.avatar_url)   AS avatar_url
                   FROM comments c
                   LEFT JOIN users u  ON u.id  = c.user_id
                   LEFT JOIN fake_users fu ON fu.id = c.fake_user_id
                   WHERE c.post_id=? ORDER BY c.created_at DESC", [$id])->fetchAll();
    $channelSubs = $r['user_id'] ? get_stat((int)$r['user_id'], 'youtube', 'subscribers') : 0;

    render_header('youtube', $r['video_title']);
    yt_subnav('');
    ?>
    <div class="yt-watch">
      <div class="yt-player">
        <img src="<?= e($r['thumbnail_url']) ?>" alt="">
        <div class="yt-play-big">▶</div>
        <div class="muted small yt-novideo">No real video — MockTube uses thumbnail cards only.</div>
      </div>
      <h1 class="yt-watch-title"><?= e($r['video_title']) ?></h1>
      <div class="yt-watch-meta">
        <?php
          $chanUrl = !empty($r['user_id'])
            ? url(['platform'=>'youtube','action'=>'channel','user'=>$r['user_id']])
            : url(['platform'=>'youtube','action'=>'channel','fake'=>$r['fake_user_id']]);
          $chanSubs = !empty($r['user_id']) ? $channelSubs : fake_user_stats((int)$r['fake_user_id'], 'youtube')['subscribers'];
        ?>
        <a class="channel-row" href="<?= $chanUrl ?>">
          <img class="avatar" src="<?= e($r['avatar_url'] ?: 'https://picsum.photos/seed/u'.($r['user_id'] ?? $r['fake_user_id']).'/48') ?>" alt="">
          <div>
            <div><strong><?= e($r['display_name']) ?></strong></div>
            <div class="muted small"><?= pretty_number($chanSubs) ?> subscribers</div>
          </div>
        </a>
        <div class="yt-watch-actions">
          <form method="post" action="<?= url(['platform'=>'youtube']) ?>" class="inline">
            <input type="hidden" name="subaction" value="like">
            <input type="hidden" name="post_id" value="<?= $id ?>">
            <input type="hidden" name="_return" value="<?= e(url(['platform'=>'youtube','action'=>'watch','id'=>$id])) ?>">
            <button class="action <?= $myLike?'liked':'' ?>">👍 <?= pretty_number($likes) ?></button>
          </form>
          <span class="action muted"><?= pretty_number((int)$r['seed_views']) ?> views</span>
        </div>
      </div>
      <?php if ($r['content']): ?><div class="yt-desc"><?= nl2br(e($r['content'])) ?></div><?php endif; ?>

      <h3><?= pretty_number(count($comments) + (int)$r['seed_comments']) ?> Comments</h3>
      <form method="post" action="<?= url(['platform'=>'youtube']) ?>" class="comment-form">
        <input type="hidden" name="subaction" value="comment">
        <input type="hidden" name="post_id" value="<?= $id ?>">
        <input type="hidden" name="_return" value="<?= e(url(['platform'=>'youtube','action'=>'watch','id'=>$id])) ?>">
        <input name="content" placeholder="Add a comment..." required>
        <button class="btn-youtube">Comment</button>
      </form>
      <?php foreach ($comments as $c): ?>
        <div class="yt-comment">
          <img class="avatar-sm" src="<?= e($c['avatar_url'] ?: 'https://picsum.photos/seed/u'.($c['user_id'] ?? $c['fake_user_id']).'/40') ?>" alt="">
          <div>
            <div><strong><?= e($c['display_name']) ?></strong> <span class="muted small"><?= e(relative_time($c['created_at'])) ?> ago</span></div>
            <div><?= e($c['content']) ?></div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
    <?php
    render_footer();
}

function yt_channel(): void {
    $me     = current_user();
    $fakeId = (int)($_GET['fake'] ?? 0);
    if ($fakeId > 0) {
        $u = fake_user_by_id($fakeId);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $isMe  = false;
        $stats = fake_user_stats($fakeId, 'youtube');
        $videos = q("SELECT p.*, ym.* FROM posts p JOIN youtube_meta ym ON ym.post_id=p.id
                     WHERE p.platform='youtube' AND p.fake_user_id=? ORDER BY p.created_at DESC", [$fakeId])->fetchAll();
    } else {
        $uid = (int)($_GET['user'] ?? $me['id']);
        $u   = user_by_id($uid);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $isMe  = $uid === (int)$me['id'];
        $stats = all_stats($uid, 'youtube');
        $videos = q("SELECT p.*, ym.* FROM posts p JOIN youtube_meta ym ON ym.post_id=p.id
                     WHERE p.platform='youtube' AND p.user_id=? ORDER BY p.created_at DESC", [$uid])->fetchAll();
    }

    render_header('youtube', $u['display_name']);
    yt_subnav('channel');
    ?>
    <div class="yt-banner" style="background-image:url('<?= e(($u['cover_url'] ?? '') ?: 'https://picsum.photos/seed/yb'.$u['id'].'/1200/200') ?>')"></div>
    <div class="profile-head card">
      <img class="avatar avatar-lg" src="<?= e($u['avatar_url'] ?: 'https://picsum.photos/seed/u'.$u['id'].'/120') ?>" alt="">
      <div>
        <h2><?= e($u['display_name']) ?></h2>
        <div class="muted">@<?= e($u['username']) ?> · <?= pretty_number($stats['subscribers']) ?> subscribers · <?= count($videos) ?> videos</div>
        <p><?= e($u['bio']) ?></p>
      </div>
      <?php if ($isMe): ?>
        <a class="btn-outline" href="<?= url(['action'=>'stats','platform'=>'youtube']) ?>">Edit stats</a>
      <?php endif; ?>
    </div>
    <div class="yt-grid">
      <?php foreach ($videos as $r): $r['display_name']=$u['display_name']; $r['avatar_url']=$u['avatar_url']; $r['username']=$u['username']; yt_render_card($r); endforeach; ?>
    </div>
    <?php
    render_footer();
}

function yt_upload_form(): void {
    render_header('youtube', 'Upload');
    render_flash();
    yt_subnav('upload');
    ?>
    <div class="card upload-form">
      <h2>Upload a video</h2>
      <form method="post" action="<?= url(['platform'=>'youtube']) ?>">
        <input type="hidden" name="subaction" value="upload">
        <label>Video title<input name="title" required maxlength="255"></label>
        <label>Description<textarea name="content" rows="4"></textarea></label>
        <label>Thumbnail URL<input name="thumbnail_url" placeholder="https://picsum.photos/640/360 (leave blank for random)"></label>
        <label>Duration label<input name="duration" placeholder="e.g. 10:24" value="10:00"></label>
        <label>Stats profile
          <select name="stats_profile">
            <option value="low">Low — 200–800 views, +5 to +20 subs</option>
            <option value="moderate" selected>Moderate — 5k–25k views, +50 to +300 subs</option>
            <option value="high">High — 100k–500k views, +2k to +10k subs</option>
            <option value="hyped">Hyped — 1M–5M views, +20k to +100k subs</option>
            <option value="viral">Viral — 10M–80M views, +100k to +2M subs</option>
          </select>
        </label>
        <button class="btn-youtube">Publish</button>
      </form>
    </div>
    <?php
    render_footer();
}

function yt_analytics(): void {
    $me = current_user();
    $stats = all_stats((int)$me['id'], 'youtube');
    $totalViews = max($stats['total_views'], 0);
    $premiumPct = 27; // average for display
    $premiumViews  = (int)round($totalViews * ($premiumPct / 100));
    $standardViews = $totalViews - $premiumViews;

    $rpmLow  = 1.40; $rpmHigh = 2.20;
    $premLow = 0.40; $premHigh = 0.80;

    $stdLow  = $standardViews / 1000 * $rpmLow;
    $stdHigh = $standardViews / 1000 * $rpmHigh;
    $prmLow  = $premiumViews  / 1000 * $premLow;
    $prmHigh = $premiumViews  / 1000 * $premHigh;
    $totLow  = $stdLow + $prmLow;
    $totHigh = $stdHigh + $prmHigh;

    $monetised = $stats['subscribers'] >= 1000 && $stats['watch_time_hours'] >= 4000;

    render_header('youtube', 'Analytics');
    yt_subnav('analytics');
    ?>
    <h2>MockTube Analytics — <?= e($me['display_name']) ?></h2>
    <div class="analytics-grid">
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['subscribers']) ?></div><div class="muted">Subscribers</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['total_views']) ?></div><div class="muted">Total views</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['watch_time_hours']) ?></div><div class="muted">Watch time (hours)</div></div>
      <div class="stat-card"><div class="stat-num"><?= (int)$stats['avg_view_duration'] ?>s</div><div class="muted">Avg view duration</div></div>
      <div class="stat-card"><div class="stat-num">£<?= pretty_number($stats['revenue_gbp']) ?></div><div class="muted">Reported revenue (GBP)</div></div>
    </div>

    <div class="card earnings">
      <h3>Estimated earnings</h3>
      <div class="muted small">Monetisation status:
        <?php if ($monetised): ?><span class="badge-ok">✓ Eligible (1k subs + 4k watch hours)</span>
        <?php else: ?><span class="badge-warn">Not yet eligible — need 1,000 subs & 4,000 watch hours</span><?php endif; ?>
      </div>
      <table class="earnings-table">
        <thead><tr><th>Stream</th><th>Views</th><th>Rate (per 1,000)</th><th>Estimated</th></tr></thead>
        <tbody>
          <tr>
            <td>Ad revenue (standard views)</td>
            <td><?= pretty_number($standardViews) ?></td>
            <td>£<?= number_format($rpmLow,2) ?> – £<?= number_format($rpmHigh,2) ?> RPM</td>
            <td>£<?= number_format($stdLow,0) ?> – £<?= number_format($stdHigh,0) ?></td>
          </tr>
          <tr>
            <td>YouTube Premium pool</td>
            <td><?= pretty_number($premiumViews) ?> (<?= $premiumPct ?>%)</td>
            <td>£<?= number_format($premLow,2) ?> – £<?= number_format($premHigh,2) ?> Premium RPM</td>
            <td>£<?= number_format($prmLow,0) ?> – £<?= number_format($prmHigh,0) ?></td>
          </tr>
          <tr class="total">
            <td colspan="3"><strong>Estimated total</strong></td>
            <td><strong>£<?= number_format($totLow,0) ?> – £<?= number_format($totHigh,0) ?></strong></td>
          </tr>
        </tbody>
      </table>
      <p class="muted small">Actual earnings vary significantly by niche, audience geography, ad density, and seasonality. A gaming channel and a finance channel with identical view counts can earn very differently.</p>
    </div>
    <p><a class="btn-youtube" href="<?= url(['action'=>'stats','platform'=>'youtube']) ?>">Edit stats</a></p>
    <?php
    render_footer();
}
