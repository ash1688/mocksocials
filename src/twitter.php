<?php
declare(strict_types=1);

function handle_twitter(): void {
    $action = $_GET['action'] ?? 'feed';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        twitter_post_handler();
        return;
    }

    switch ($action) {
        case 'profile':  twitter_profile(); break;
        case 'hashtag':  twitter_hashtag(); break;
        case 'analytics': twitter_analytics(); break;
        case 'feed':
        default:         twitter_feed(); break;
    }
}

function twitter_post_handler(): void {
    $sub = $_POST['subaction'] ?? '';
    $me  = current_user();

    if ($sub === 'tweet') {
        $content = trim((string)($_POST['content'] ?? ''));
        if ($content !== '' && mb_strlen($content) <= 280) {
            q('INSERT INTO posts (user_id, platform, content) VALUES (?,?,?)',
                [$me['id'], 'twitter', $content]);
            flash('Posted.');
        }
    } elseif ($sub === 'retweet') {
        $pid = (int)$_POST['post_id'];
        q('INSERT INTO posts (user_id, platform, parent_id) VALUES (?,?,?)',
            [$me['id'], 'twitter', $pid]);
        flash('Retweeted.');
    } elseif ($sub === 'quote') {
        $pid = (int)$_POST['post_id'];
        $quote = trim((string)($_POST['quote_text'] ?? ''));
        if ($quote !== '' && mb_strlen($quote) <= 280) {
            q('INSERT INTO posts (user_id, platform, parent_id, quote_text) VALUES (?,?,?,?)',
                [$me['id'], 'twitter', $pid, $quote]);
            flash('Reply posted.');
        }
    } elseif ($sub === 'like') {
        $pid = (int)$_POST['post_id'];
        $exists = q('SELECT id FROM likes WHERE post_id=? AND user_id=?', [$pid, $me['id']])->fetch();
        if ($exists) {
            q('DELETE FROM likes WHERE id=?', [$exists['id']]);
        } else {
            q('INSERT INTO likes (post_id, user_id) VALUES (?,?)', [$pid, $me['id']]);
        }
    } elseif ($sub === 'note') {
        $pid = (int)$_POST['post_id'];
        $text = trim((string)($_POST['note_text'] ?? ''));
        if ($text !== '') {
            q('INSERT INTO community_notes (post_id, user_id, note_text) VALUES (?,?,?)',
                [$pid, $me['id'], $text]);
            flash('Community Note submitted.');
        }
    }

    $ret = $_POST['_return'] ?? url(['platform'=>'twitter']);
    redirect($ret);
}

function twitter_feed(): void {
    $me = current_user();
    $posts = q(
        "SELECT p.*, ".author_select_sql()."
         FROM posts p ".author_join_sql()."
         WHERE p.platform='twitter'
         ORDER BY p.created_at DESC LIMIT 50"
    )->fetchAll();

    render_header('twitter', 'MockTweet');
    render_flash();
    ?>
    <div class="tw-layout">
      <div class="tw-main">
        <div class="composer card">
          <form method="post" action="<?= url(['platform'=>'twitter']) ?>">
            <input type="hidden" name="subaction" value="tweet">
            <textarea name="content" maxlength="280" placeholder="What's happening?" oninput="document.getElementById('tw-count').textContent = (280 - this.value.length)"></textarea>
            <div class="composer-bar">
              <span id="tw-count" class="muted">280</span>
              <button type="submit" class="btn-twitter">Tweet</button>
            </div>
          </form>
        </div>
        <?php foreach ($posts as $p) twitter_render_post($p, $me); ?>
      </div>
      <aside class="tw-side">
        <?php twitter_trending(); ?>
      </aside>
    </div>
    <?php
    render_footer();
}

function twitter_trending(): void {
    $rows = q("SELECT content FROM posts WHERE platform='twitter' AND content IS NOT NULL")->fetchAll();
    $counts = [];
    foreach ($rows as $r) {
        foreach (find_hashtags($r['content'] ?? '') as $h) {
            $counts[$h] = ($counts[$h] ?? 0) + 1;
        }
    }
    arsort($counts);
    $top = array_slice($counts, 0, 5, true);
    ?>
    <div class="card">
      <h3>Trends</h3>
      <?php if (!$top): ?><p class="muted">No trends yet.</p><?php endif; ?>
      <?php foreach ($top as $tag => $c): ?>
        <a class="trend-row" href="<?= url(['platform'=>'twitter','action'=>'hashtag','tag'=>$tag]) ?>">
          <div class="trend-tag">#<?= e($tag) ?></div>
          <div class="muted small"><?= (int)$c ?> tweets</div>
        </a>
      <?php endforeach; ?>
    </div>
    <?php
}

function twitter_render_post(array $p, array $me, bool $standalone = false): void {
    $isRetweet = !empty($p['parent_id']);
    $parent = null;
    if ($isRetweet) {
        $parent = q('SELECT p.*, '.author_select_sql().'
                     FROM posts p '.author_join_sql().' WHERE p.id=?',
                     [$p['parent_id']])->fetch();
    }
    $displayPost = $parent ?: $p;

    $likeCount = (int)q('SELECT COUNT(*) c FROM likes WHERE post_id=?', [$displayPost['id']])->fetch()['c'];
    $myLike    = q('SELECT id FROM likes WHERE post_id=? AND user_id=?', [$displayPost['id'], $me['id']])->fetch();
    $rtCount   = (int)q("SELECT COUNT(*) c FROM posts WHERE parent_id=? AND quote_text IS NULL", [$displayPost['id']])->fetch()['c'];

    $notes = q("SELECT cn.*,
                       COALESCE(u.display_name, fu.display_name) AS display_name
                FROM community_notes cn
                LEFT JOIN users u  ON u.id = cn.user_id
                LEFT JOIN fake_users fu ON fu.id = cn.fake_user_id
                WHERE cn.post_id=? AND cn.status='visible' ORDER BY cn.created_at ASC",
                [$displayPost['id']])->fetchAll();
    ?>
    <article class="tweet card">
      <?php if ($isRetweet && empty($p['quote_text'])): ?>
        <div class="rt-banner">🔁 <?= e($p['display_name']) ?> retweeted</div>
      <?php endif; ?>

      <?php if ($isRetweet && !empty($p['quote_text'])): ?>
        <div class="quoted card-inner">
          <div class="tweet-head">
            <img class="avatar avatar-sm" src="<?= e($displayPost['avatar_url'] ?: 'https://picsum.photos/seed/u'.($displayPost['user_id'] ?? $displayPost['fake_user_id']).'/40') ?>" alt="">
            <div><strong><?= e($displayPost['display_name']) ?></strong> <span class="muted">@<?= e($displayPost['username']) ?></span></div>
          </div>
          <div class="tweet-body"><?= linkify($displayPost['content'] ?? '') ?></div>
        </div>
        <div class="tweet-head" style="margin-top:10px;">
          <img class="avatar" src="<?= e($p['avatar_url'] ?: 'https://picsum.photos/seed/u'.($p['user_id'] ?? $p['fake_user_id']).'/48') ?>" alt="">
          <div>
            <strong><?= e($p['display_name']) ?></strong>
            <span class="muted">@<?= e($p['username']) ?> · <?= e(relative_time($p['created_at'])) ?> · replied</span>
          </div>
        </div>
        <div class="tweet-body"><?= linkify($p['quote_text']) ?></div>
      <?php else: ?>
        <div class="tweet-head">
          <img class="avatar" src="<?= e($displayPost['avatar_url'] ?: 'https://picsum.photos/seed/u'.($displayPost['user_id'] ?? $displayPost['fake_user_id']).'/48') ?>" alt="">
          <div>
            <a class="strong-link" href="<?= profile_url('twitter', $displayPost) ?>"><strong><?= e($displayPost['display_name']) ?></strong></a>
            <span class="muted">@<?= e($displayPost['username']) ?> · <?= e(relative_time($displayPost['created_at'])) ?></span>
          </div>
        </div>
        <div class="tweet-body"><?= linkify($displayPost['content'] ?? '') ?></div>
      <?php endif; ?>

      <?php foreach ($notes as $n): ?>
        <div class="note">
          <div class="note-head">📝 Readers added context — <span class="muted">by <?= e($n['display_name']) ?></span></div>
          <div><?= nl2br(e($n['note_text'])) ?></div>
        </div>
      <?php endforeach; ?>

      <div class="tweet-actions">
        <form method="post" action="<?= url(['platform'=>'twitter']) ?>" class="inline">
          <input type="hidden" name="subaction" value="like">
          <input type="hidden" name="post_id" value="<?= (int)$displayPost['id'] ?>">
          <button class="action <?= $myLike ? 'liked':'' ?>" title="Like">♥ <?= $likeCount ?></button>
        </form>
        <form method="post" action="<?= url(['platform'=>'twitter']) ?>" class="inline">
          <input type="hidden" name="subaction" value="retweet">
          <input type="hidden" name="post_id" value="<?= (int)$displayPost['id'] ?>">
          <button class="action" title="Retweet">🔁 <?= $rtCount ?></button>
        </form>
        <details class="inline">
          <summary class="action">💬 Reply</summary>
          <form method="post" action="<?= url(['platform'=>'twitter']) ?>" class="popover">
            <input type="hidden" name="subaction" value="quote">
            <input type="hidden" name="post_id" value="<?= (int)$displayPost['id'] ?>">
            <textarea name="quote_text" maxlength="280" placeholder="Write your reply..."></textarea>
            <div class="popover-actions">
              <button type="submit" class="btn-twitter">Reply</button>
              <button type="button" class="btn-outline" onclick="this.closest('details').open=false">Close</button>
            </div>
          </form>
        </details>
        <details class="inline">
          <summary class="action">📝 Note</summary>
          <form method="post" action="<?= url(['platform'=>'twitter']) ?>" class="popover">
            <input type="hidden" name="subaction" value="note">
            <input type="hidden" name="post_id" value="<?= (int)$displayPost['id'] ?>">
            <textarea name="note_text" placeholder="Add context to this tweet..."></textarea>
            <div class="popover-actions">
              <button type="submit" class="btn-twitter">Submit Note</button>
              <button type="button" class="btn-outline" onclick="this.closest('details').open=false">Close</button>
            </div>
          </form>
        </details>
      </div>
    </article>
    <?php
}

function twitter_hashtag(): void {
    $tag = mb_strtolower((string)($_GET['tag'] ?? ''));
    $me  = current_user();
    $rows = q("SELECT p.*, ".author_select_sql()."
               FROM posts p ".author_join_sql()."
               WHERE p.platform='twitter' AND p.content LIKE ?
               ORDER BY p.created_at DESC LIMIT 100",
               ['%#'.$tag.'%'])->fetchAll();
    render_header('twitter', '#'.$tag);
    ?>
    <div class="tw-layout">
      <div class="tw-main">
        <h2>#<?= e($tag) ?></h2>
        <?php if (!$rows): ?><p class="muted">No tweets yet.</p><?php endif; ?>
        <?php foreach ($rows as $p) twitter_render_post($p, $me); ?>
      </div>
      <aside class="tw-side"><?php twitter_trending(); ?></aside>
    </div>
    <?php
    render_footer();
}

function twitter_profile(): void {
    $me = current_user();
    $fakeId = (int)($_GET['fake'] ?? 0);
    if ($fakeId > 0) {
        $u = fake_user_by_id($fakeId);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $stats = fake_user_stats($fakeId, 'twitter');
        $posts = q("SELECT p.*, ".author_select_sql()."
                    FROM posts p ".author_join_sql()."
                    WHERE p.platform='twitter' AND p.fake_user_id=?
                    ORDER BY p.created_at DESC", [$fakeId])->fetchAll();
        $isMe = false;
    } else {
        $uid = (int)($_GET['user'] ?? $me['id']);
        $u = user_by_id($uid);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $stats = all_stats($uid, 'twitter');
        $posts = q("SELECT p.*, ".author_select_sql()."
                    FROM posts p ".author_join_sql()."
                    WHERE p.platform='twitter' AND p.user_id=?
                    ORDER BY p.created_at DESC", [$uid])->fetchAll();
        $isMe = $uid === (int)$me['id'];
    }

    render_header('twitter', '@'.$u['username']);
    ?>
    <div class="profile-head card">
      <img class="avatar avatar-lg" src="<?= e($u['avatar_url'] ?: 'https://picsum.photos/seed/u'.$u['id'].'/120') ?>" alt="">
      <div>
        <h2><?= e($u['display_name']) ?></h2>
        <div class="muted">@<?= e($u['username']) ?></div>
        <p><?= e($u['bio']) ?></p>
        <div class="profile-stats">
          <span><strong><?= pretty_number($stats['followers']) ?></strong> followers</span>
          <span><strong><?= pretty_number($stats['following']) ?></strong> following</span>
        </div>
      </div>
      <?php if ($isMe): ?>
        <a class="btn-outline" href="<?= url(['action'=>'stats','platform'=>'twitter']) ?>">Edit stats</a>
      <?php endif; ?>
    </div>
    <?php foreach ($posts as $p) twitter_render_post($p, $me); ?>
    <?php
    render_footer();
}

function twitter_analytics(): void {
    $me = current_user();
    $stats = all_stats((int)$me['id'], 'twitter');
    $myTweets = (int)q("SELECT COUNT(*) c FROM posts WHERE platform='twitter' AND user_id=? AND parent_id IS NULL", [$me['id']])->fetch()['c'];
    $myLikes  = (int)q("SELECT COUNT(*) c FROM likes l JOIN posts p ON p.id=l.post_id WHERE p.user_id=? AND p.platform='twitter'", [$me['id']])->fetch()['c'];

    render_header('twitter', 'Analytics');
    ?>
    <h2>MockTweet Analytics — <?= e($me['display_name']) ?></h2>
    <div class="analytics-grid">
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['followers']) ?></div><div class="muted">Followers</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['impressions']) ?></div><div class="muted">Impressions</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['profile_visits']) ?></div><div class="muted">Profile visits</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['mentions']) ?></div><div class="muted">Mentions</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($myTweets) ?></div><div class="muted">Tweets posted</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($myLikes) ?></div><div class="muted">Likes received</div></div>
    </div>
    <p><a class="btn-twitter" href="<?= url(['action'=>'stats','platform'=>'twitter']) ?>">Edit stats</a></p>
    <?php
    render_footer();
}
