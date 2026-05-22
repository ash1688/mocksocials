<?php
declare(strict_types=1);

function handle_instagram(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') { ig_post_handler(); return; }
    $action = $_GET['action'] ?? 'feed';
    switch ($action) {
        case 'explore':   ig_explore(); break;
        case 'profile':   ig_profile(); break;
        case 'view':      ig_view(); break;
        case 'analytics': ig_analytics(); break;
        case 'feed':
        default:          ig_feed(); break;
    }
}

function ig_post_handler(): void {
    $sub = $_POST['subaction'] ?? '';
    $me  = current_user();
    log_event('instagram.'.$sub, 'post_id=' . ($_POST['post_id'] ?? '-'));
    if ($sub === 'post') {
        $img = trim((string)($_POST['image_url'] ?? ''));
        $cap = trim((string)($_POST['content'] ?? ''));
        if ($img !== '') {
            q('INSERT INTO posts (user_id, platform, content, image_url) VALUES (?,?,?,?)',
                [$me['id'], 'instagram', $cap, $img]);
            flash('Posted.');
        } else {
            flash('Image URL is required.');
        }
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
    redirect($_POST['_return'] ?? url(['platform'=>'instagram']));
}

function ig_story_bar(): void {
    $rows = q("SELECT id, display_name, avatar_url FROM fake_users ORDER BY RAND() LIMIT 8")->fetchAll();
    ?>
    <div class="ig-stories card">
      <?php foreach ($rows as $u): ?>
        <div class="story">
          <div class="story-ring"><img src="<?= e($u['avatar_url'] ?: 'https://picsum.photos/seed/u'.$u['id'].'/80') ?>" alt=""></div>
          <div class="story-name"><?= e($u['display_name']) ?></div>
        </div>
      <?php endforeach; ?>
    </div>
    <?php
}

function ig_feed(): void {
    $me = current_user();
    $posts = q("SELECT p.*, ".author_select_sql()."
                FROM posts p ".author_join_sql()."
                WHERE p.platform='instagram' AND p.image_url<>''
                ORDER BY p.created_at DESC LIMIT 30")->fetchAll();

    render_header('instagram', 'MockGram');
    render_flash();
    ?>
    <div class="ig-subnav">
      <a class="active" href="<?= url(['platform'=>'instagram']) ?>">Feed</a>
      <a href="<?= url(['platform'=>'instagram','action'=>'explore']) ?>">Explore</a>
      <a href="<?= url(['platform'=>'instagram','action'=>'profile']) ?>">Profile</a>
      <a href="<?= url(['platform'=>'instagram','action'=>'analytics']) ?>">Analytics</a>
    </div>
    <?php
    ig_story_bar();
    ?>
    <div class="composer card ig-composer">
      <form method="post" action="<?= url(['platform'=>'instagram']) ?>">
        <input type="hidden" name="subaction" value="post">
        <label>Image URL (required)<input name="image_url" required placeholder="https://picsum.photos/600/600"></label>
        <label>Caption<textarea name="content" placeholder="Write a caption..."></textarea></label>
        <button class="btn-instagram">Share</button>
      </form>
    </div>
    <div class="ig-feed">
      <?php foreach ($posts as $p) ig_render_post($p, $me); ?>
    </div>
    <?php
    render_footer();
}

function ig_render_post(array $p, array $me): void {
    $likeCount = (int)q('SELECT COUNT(*) c FROM likes WHERE post_id=?', [$p['id']])->fetch()['c'];
    $myLike    = q('SELECT id FROM likes WHERE post_id=? AND user_id=?', [$p['id'], $me['id']])->fetch();
    $comments  = q("SELECT c.*,
                           COALESCE(u.display_name, fu.display_name) AS display_name
                    FROM comments c
                    LEFT JOIN users u  ON u.id  = c.user_id
                    LEFT JOIN fake_users fu ON fu.id = c.fake_user_id
                    WHERE c.post_id=? ORDER BY c.created_at ASC LIMIT 3", [$p['id']])->fetchAll();
    ?>
    <article class="ig-post card">
      <div class="post-head">
        <img class="avatar-sm" src="<?= e($p['avatar_url'] ?: 'https://picsum.photos/seed/u'.($p['user_id'] ?? $p['fake_user_id']).'/40') ?>" alt="">
        <a class="strong-link" href="<?= profile_url('instagram', $p) ?>"><strong><?= e($p['display_name']) ?></strong></a>
      </div>
      <a href="<?= url(['platform'=>'instagram','action'=>'view','id'=>$p['id']]) ?>">
        <img class="ig-image" src="<?= e($p['image_url']) ?>" alt="">
      </a>
      <div class="ig-actions">
        <form method="post" action="<?= url(['platform'=>'instagram']) ?>" class="inline">
          <input type="hidden" name="subaction" value="like">
          <input type="hidden" name="post_id" value="<?= (int)$p['id'] ?>">
          <button class="action <?= $myLike?'liked':'' ?>">♥</button>
        </form>
        <span class="action muted"><?= $likeCount ?> likes</span>
      </div>
      <?php if ($p['content']): ?>
        <div class="ig-caption"><strong><?= e($p['display_name']) ?></strong> <?= linkify($p['content'], 'instagram') ?></div>
      <?php endif; ?>
      <?php foreach ($comments as $c): ?>
        <div class="ig-comment"><strong><?= e($c['display_name']) ?></strong> <?= e($c['content']) ?></div>
      <?php endforeach; ?>
      <form method="post" action="<?= url(['platform'=>'instagram']) ?>" class="comment-form">
        <input type="hidden" name="subaction" value="comment">
        <input type="hidden" name="post_id" value="<?= (int)$p['id'] ?>">
        <input name="content" placeholder="Add a comment..." required>
        <button class="btn-instagram">Post</button>
      </form>
      <div class="muted small ig-time"><?= e(relative_time($p['created_at'])) ?> ago</div>
    </article>
    <?php
}

function ig_explore(): void {
    $posts = q("SELECT p.*, ".author_select_sql()." FROM posts p ".author_join_sql()."
                WHERE p.platform='instagram' AND p.image_url<>''
                ORDER BY RAND() LIMIT 30")->fetchAll();
    render_header('instagram', 'Explore');
    ?>
    <h2>Explore</h2>
    <div class="ig-explore">
      <?php foreach ($posts as $p): ?>
        <a href="<?= url(['platform'=>'instagram','action'=>'view','id'=>$p['id']]) ?>" class="ig-explore-tile">
          <img src="<?= e($p['image_url']) ?>" alt="">
        </a>
      <?php endforeach; ?>
    </div>
    <?php
    render_footer();
}

function ig_view(): void {
    $id = (int)($_GET['id'] ?? 0);
    $p = q('SELECT p.*, '.author_select_sql().' FROM posts p
            '.author_join_sql().' WHERE p.id=?', [$id])->fetch();
    if (!$p) { http_response_code(404); echo 'Not found'; return; }
    $me = current_user();
    render_header('instagram', $p['display_name'].' on MockGram');
    ?>
    <div class="ig-modal">
      <a class="ig-close" href="<?= url(['platform'=>'instagram']) ?>">← Back to feed</a>
      <?php ig_render_post($p, $me); ?>
    </div>
    <?php
    render_footer();
}

function ig_profile(): void {
    $me     = current_user();
    $fakeId = (int)($_GET['fake'] ?? 0);
    if ($fakeId > 0) {
        $u = fake_user_by_id($fakeId);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $isMe  = false;
        $stats = fake_user_stats($fakeId, 'instagram');
        $posts = q("SELECT * FROM posts WHERE platform='instagram' AND fake_user_id=? AND image_url<>''
                    ORDER BY created_at DESC", [$fakeId])->fetchAll();
    } else {
        $uid = (int)($_GET['user'] ?? $me['id']);
        $u   = user_by_id($uid);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $isMe  = $uid === (int)$me['id'];
        $stats = all_stats($uid, 'instagram');
        $posts = q("SELECT * FROM posts WHERE platform='instagram' AND user_id=? AND image_url<>''
                    ORDER BY created_at DESC", [$uid])->fetchAll();
    }
    $postCount = count($posts);

    render_header('instagram', '@'.$u['username']);
    ?>
    <div class="ig-profile-head card">
      <img class="avatar-xl" src="<?= e($u['avatar_url'] ?: 'https://picsum.photos/seed/u'.$u['id'].'/160') ?>" alt="">
      <div>
        <h2><?= e($u['username']) ?></h2>
        <div class="ig-prof-stats">
          <span><strong><?= pretty_number($postCount) ?></strong> posts</span>
          <span><strong><?= pretty_number($stats['followers']) ?></strong> followers</span>
          <span><strong><?= pretty_number($stats['following']) ?></strong> following</span>
        </div>
        <p><strong><?= e($u['display_name']) ?></strong></p>
        <p><?= nl2br(e($u['bio'])) ?></p>
        <?php if ($isMe): ?>
          <a class="btn-outline" href="<?= url(['action'=>'stats','platform'=>'instagram']) ?>">Edit stats</a>
        <?php endif; ?>
      </div>
    </div>
    <div class="ig-grid">
      <?php foreach ($posts as $p): ?>
        <a class="ig-grid-tile" href="<?= url(['platform'=>'instagram','action'=>'view','id'=>$p['id']]) ?>">
          <img src="<?= e($p['image_url']) ?>" alt="">
        </a>
      <?php endforeach; ?>
    </div>
    <?php
    render_footer();
}

function ig_analytics(): void {
    $me = current_user();
    $stats = all_stats((int)$me['id'], 'instagram');
    render_header('instagram', 'Analytics');
    ?>
    <h2>MockGram Analytics — <?= e($me['display_name']) ?></h2>
    <div class="analytics-grid">
      <?php foreach ($stats as $k => $v): ?>
        <div class="stat-card"><div class="stat-num"><?= pretty_number($v) ?></div><div class="muted"><?= e(ucwords(str_replace('_',' ',$k))) ?></div></div>
      <?php endforeach; ?>
    </div>
    <p><a class="btn-instagram" href="<?= url(['action'=>'stats','platform'=>'instagram']) ?>">Edit stats</a></p>
    <?php
    render_footer();
}
