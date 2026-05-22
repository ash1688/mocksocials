<?php
declare(strict_types=1);

function handle_facebook(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') { fb_post_handler(); return; }
    $action = $_GET['action'] ?? 'feed';
    switch ($action) {
        case 'profile':    fb_profile(); break;
        case 'groups':     fb_groups_index(); break;
        case 'group':      fb_group_view(); break;
        case 'analytics':  fb_analytics(); break;
        case 'feed':
        default:           fb_feed(); break;
    }
}

function fb_post_handler(): void {
    $sub = $_POST['subaction'] ?? '';
    $me  = current_user();
    log_event('facebook.'.$sub, 'post_id=' . ($_POST['post_id'] ?? '-') . ' group_id=' . ($_POST['group_id'] ?? '-'));

    if ($sub === 'post') {
        $content = trim((string)($_POST['content'] ?? ''));
        $img     = trim((string)($_POST['image_url'] ?? ''));
        $group   = $_POST['group_id'] ?? null;
        $group   = ($group === '' || $group === null) ? null : (int)$group;
        if ($content !== '' || $img !== '') {
            q('INSERT INTO posts (user_id, platform, content, image_url, group_id) VALUES (?,?,?,?,?)',
                [$me['id'], 'facebook', $content, $img, $group]);
        }
    } elseif ($sub === 'comment') {
        $pid = (int)$_POST['post_id'];
        $c   = trim((string)($_POST['content'] ?? ''));
        if ($c !== '') q('INSERT INTO comments (post_id, user_id, content) VALUES (?,?,?)', [$pid, $me['id'], $c]);
    } elseif ($sub === 'like') {
        $pid = (int)$_POST['post_id'];
        $exists = q('SELECT id FROM likes WHERE post_id=? AND user_id=?', [$pid, $me['id']])->fetch();
        if ($exists) q('DELETE FROM likes WHERE id=?', [$exists['id']]);
        else q('INSERT INTO likes (post_id, user_id) VALUES (?,?)', [$pid, $me['id']]);
    } elseif ($sub === 'create_group') {
        $name = trim((string)($_POST['name'] ?? ''));
        $desc = trim((string)($_POST['description'] ?? ''));
        $cover = trim((string)($_POST['cover_url'] ?? ''));
        if ($name !== '') {
            q('INSERT INTO groups_tbl (name, description, cover_url, created_by) VALUES (?,?,?,?)',
                [$name, $desc, $cover, $me['id']]);
            $gid = (int)db()->lastInsertId();
            q('INSERT INTO group_members (group_id, user_id, role) VALUES (?,?,?)', [$gid, $me['id'], 'admin']);
            flash('Group created.');
            redirect(url(['platform'=>'facebook','action'=>'group','id'=>$gid]));
        }
    } elseif ($sub === 'join_group') {
        $gid = (int)$_POST['group_id'];
        q('INSERT IGNORE INTO group_members (group_id, user_id) VALUES (?,?)', [$gid, $me['id']]);
        flash('Joined group.');
    } elseif ($sub === 'leave_group') {
        $gid = (int)$_POST['group_id'];
        q('DELETE FROM group_members WHERE group_id=? AND user_id=?', [$gid, $me['id']]);
    } elseif ($sub === 'update_about') {
        $bio  = trim((string)($_POST['bio'] ?? ''));
        $loc  = trim((string)($_POST['location'] ?? ''));
        $edu  = trim((string)($_POST['education'] ?? ''));
        $cov  = trim((string)($_POST['cover_url'] ?? ''));
        q('UPDATE users SET bio=?, location=?, education=?, cover_url=? WHERE id=?',
            [$bio, $loc, $edu, $cov, $me['id']]);
        flash('About section updated.');
    }
    redirect($_POST['_return'] ?? url(['platform'=>'facebook']));
}

function fb_feed(): void {
    $me = current_user();
    $posts = q("SELECT p.*, ".author_select_sql().", g.name AS group_name
                FROM posts p ".author_join_sql()."
                LEFT JOIN groups_tbl g ON g.id=p.group_id
                WHERE p.platform='facebook'
                ORDER BY p.created_at DESC LIMIT 50")->fetchAll();

    $friends = fb_friend_list((int)$me['id']);

    render_header('facebook', 'MockBook');
    render_flash();
    ?>
    <div class="fb-layout">
      <aside class="fb-left">
        <div class="card">
          <h3>Shortcuts</h3>
          <a href="<?= url(['platform'=>'facebook','action'=>'profile']) ?>">My profile</a>
          <a href="<?= url(['platform'=>'facebook','action'=>'groups']) ?>">Groups</a>
          <a href="<?= url(['platform'=>'facebook','action'=>'analytics']) ?>">Analytics</a>
        </div>
        <div class="card">
          <h3>Friends</h3>
          <?php if (!$friends): ?><p class="muted small">Other students appear here.</p><?php endif; ?>
          <?php foreach ($friends as $f): ?>
            <a class="friend-row" href="<?= url(['platform'=>'facebook','action'=>'profile','user'=>$f['id']]) ?>">
              <img class="avatar-sm" src="<?= e($f['avatar_url'] ?: 'https://picsum.photos/seed/u'.$f['id'].'/40') ?>" alt="">
              <?= e($f['display_name']) ?>
            </a>
          <?php endforeach; ?>
        </div>
      </aside>
      <div class="fb-main">
        <div class="composer card">
          <form method="post" action="<?= url(['platform'=>'facebook']) ?>">
            <input type="hidden" name="subaction" value="post">
            <textarea name="content" placeholder="What's on your mind, <?= e($me['display_name']) ?>?"></textarea>
            <input name="image_url" placeholder="Image URL (optional)">
            <div class="composer-bar">
              <button type="submit" class="btn-facebook">Post</button>
            </div>
          </form>
        </div>
        <?php foreach ($posts as $p) fb_render_post($p, $me); ?>
      </div>
    </div>
    <?php
    render_footer();
}

function fb_friend_list(int $uid): array {
    // simple model: all other users are "friends"
    return q('SELECT id, display_name, avatar_url FROM users WHERE id <> ? AND is_admin=0 ORDER BY display_name', [$uid])->fetchAll();
}

function fb_render_post(array $p, array $me): void {
    $likeCount = (int)q('SELECT COUNT(*) c FROM likes WHERE post_id=?', [$p['id']])->fetch()['c'];
    $myLike    = q('SELECT id FROM likes WHERE post_id=? AND user_id=?', [$p['id'], $me['id']])->fetch();
    $comments  = q("SELECT c.*,
                           COALESCE(u.display_name, fu.display_name) AS display_name,
                           COALESCE(u.avatar_url,   fu.avatar_url)   AS avatar_url
                    FROM comments c
                    LEFT JOIN users u  ON u.id  = c.user_id
                    LEFT JOIN fake_users fu ON fu.id = c.fake_user_id
                    WHERE c.post_id=? ORDER BY c.created_at ASC",
                    [$p['id']])->fetchAll();
    ?>
    <article class="fb-post card">
      <div class="post-head">
        <img class="avatar" src="<?= e($p['avatar_url'] ?: 'https://picsum.photos/seed/u'.($p['user_id'] ?? $p['fake_user_id']).'/48') ?>" alt="">
        <div>
          <a class="strong-link" href="<?= profile_url('facebook', $p) ?>"><strong><?= e($p['display_name']) ?></strong></a>
          <?php if (!empty($p['group_name'])): ?>
            <span class="muted"> in <a href="<?= url(['platform'=>'facebook','action'=>'group','id'=>$p['group_id']]) ?>"><?= e($p['group_name']) ?></a></span>
          <?php endif; ?>
          <div class="muted small"><?= e(relative_time($p['created_at'])) ?> ago</div>
        </div>
      </div>
      <?php if ($p['content']): ?><div class="post-body"><?= nl2br(e($p['content'])) ?></div><?php endif; ?>
      <?php if ($p['image_url']): ?><img class="post-image" src="<?= e($p['image_url']) ?>" alt=""><?php endif; ?>
      <div class="fb-actions">
        <form method="post" action="<?= url(['platform'=>'facebook']) ?>" class="inline">
          <input type="hidden" name="subaction" value="like">
          <input type="hidden" name="post_id" value="<?= (int)$p['id'] ?>">
          <button class="action <?= $myLike?'liked':'' ?>">👍 Like (<?= $likeCount ?>)</button>
        </form>
        <span class="action muted">💬 <?= count($comments) ?> comments</span>
      </div>
      <div class="comments">
        <?php foreach ($comments as $c): ?>
          <div class="comment">
            <img class="avatar-sm" src="<?= e($c['avatar_url'] ?: 'https://picsum.photos/seed/u'.($c['user_id'] ?? $c['fake_user_id']).'/32') ?>" alt="">
            <div><strong><?= e($c['display_name']) ?></strong> <?= e($c['content']) ?>
              <div class="muted small"><?= e(relative_time($c['created_at'])) ?> ago</div>
            </div>
          </div>
        <?php endforeach; ?>
        <form method="post" action="<?= url(['platform'=>'facebook']) ?>" class="comment-form">
          <input type="hidden" name="subaction" value="comment">
          <input type="hidden" name="post_id" value="<?= (int)$p['id'] ?>">
          <input name="content" placeholder="Write a comment..." required>
          <button class="btn-facebook">Reply</button>
        </form>
      </div>
    </article>
    <?php
}

function fb_profile(): void {
    $me     = current_user();
    $fakeId = (int)($_GET['fake'] ?? 0);
    if ($fakeId > 0) {
        $u = fake_user_by_id($fakeId);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $isMe   = false;
        $stats  = fake_user_stats($fakeId, 'facebook');
        $posts  = q("SELECT p.*, ".author_select_sql().", g.name AS group_name
                     FROM posts p ".author_join_sql()."
                     LEFT JOIN groups_tbl g ON g.id=p.group_id
                     WHERE p.platform='facebook' AND p.fake_user_id=?
                     ORDER BY p.created_at DESC", [$fakeId])->fetchAll();
        $friends = q('SELECT id, display_name, avatar_url FROM fake_users WHERE id <> ? ORDER BY RAND() LIMIT 8', [$fakeId])->fetchAll();
    } else {
        $uid = (int)($_GET['user'] ?? $me['id']);
        $u   = user_by_id($uid);
        if (!$u) { http_response_code(404); echo 'Not found'; return; }
        $isMe = $uid === (int)$me['id'];
        $stats = all_stats($uid, 'facebook');
        $posts = q("SELECT p.*, ".author_select_sql().", g.name AS group_name
                    FROM posts p ".author_join_sql()."
                    LEFT JOIN groups_tbl g ON g.id=p.group_id
                    WHERE p.platform='facebook' AND p.user_id=?
                    ORDER BY p.created_at DESC", [$uid])->fetchAll();
        $friends = fb_friend_list($uid);
    }

    render_header('facebook', $u['display_name']);
    render_flash();
    ?>
    <div class="fb-cover" style="background-image:url('<?= e($u['cover_url'] ?: 'https://picsum.photos/seed/cover'.$u['id'].'/1200/300') ?>')"></div>
    <div class="profile-head card">
      <img class="avatar avatar-lg" src="<?= e($u['avatar_url'] ?: 'https://picsum.photos/seed/u'.$u['id'].'/120') ?>" alt="">
      <div>
        <h2><?= e($u['display_name']) ?></h2>
        <p><?= e($u['bio']) ?></p>
        <div class="profile-stats">
          <span><strong><?= pretty_number($stats['friends']) ?></strong> friends</span>
          <span><strong><?= pretty_number($stats['page_likes']) ?></strong> page likes</span>
        </div>
      </div>
      <?php if ($isMe): ?>
        <a class="btn-outline" href="<?= url(['action'=>'stats','platform'=>'facebook']) ?>">Edit stats</a>
      <?php endif; ?>
    </div>

    <div class="fb-layout">
      <aside class="fb-left">
        <div class="card">
          <h3>About</h3>
          <?php if ($isMe): ?>
            <form method="post" action="<?= url(['platform'=>'facebook']) ?>">
              <input type="hidden" name="subaction" value="update_about">
              <label>Bio<textarea name="bio"><?= e($u['bio']) ?></textarea></label>
              <label>Location<input name="location" value="<?= e($u['location']) ?>"></label>
              <label>Education<input name="education" value="<?= e($u['education']) ?>"></label>
              <label>Cover URL<input name="cover_url" value="<?= e($u['cover_url']) ?>"></label>
              <button class="btn-facebook">Save</button>
            </form>
          <?php else: ?>
            <p>📍 <?= e($u['location'] ?: '—') ?></p>
            <p>🎓 <?= e($u['education'] ?: '—') ?></p>
          <?php endif; ?>
        </div>
        <div class="card">
          <h3>Friends</h3>
          <?php foreach ($friends as $f): $fkey = !empty($fakeId) ? 'fake' : 'user'; ?>
            <a class="friend-row" href="<?= url(['platform'=>'facebook','action'=>'profile',$fkey=>$f['id']]) ?>">
              <img class="avatar-sm" src="<?= e($f['avatar_url'] ?: 'https://picsum.photos/seed/u'.$f['id'].'/40') ?>" alt=""><?= e($f['display_name']) ?>
            </a>
          <?php endforeach; ?>
        </div>
      </aside>
      <div class="fb-main">
        <?php foreach ($posts as $p) fb_render_post($p, $me); ?>
        <?php if (!$posts): ?><p class="muted">No posts yet.</p><?php endif; ?>
      </div>
    </div>
    <?php
    render_footer();
}

function fb_groups_index(): void {
    $me = current_user();
    $groups = q('SELECT g.*, (SELECT COUNT(*) FROM group_members gm WHERE gm.group_id=g.id) AS members
                 FROM groups_tbl g ORDER BY g.created_at DESC')->fetchAll();
    render_header('facebook', 'Groups');
    render_flash();
    ?>
    <h2>Groups</h2>
    <div class="card">
      <h3>Create a group</h3>
      <form method="post" action="<?= url(['platform'=>'facebook']) ?>">
        <input type="hidden" name="subaction" value="create_group">
        <label>Name<input name="name" required></label>
        <label>Description<textarea name="description"></textarea></label>
        <label>Cover URL<input name="cover_url" placeholder="https://picsum.photos/..."></label>
        <button class="btn-facebook">Create</button>
      </form>
    </div>
    <div class="group-grid">
      <?php foreach ($groups as $g):
        $isMember = q('SELECT 1 FROM group_members WHERE group_id=? AND user_id=?', [$g['id'], $me['id']])->fetch();
      ?>
        <div class="card group-card">
          <div class="group-cover" style="background-image:url('<?= e($g['cover_url'] ?: 'https://picsum.photos/seed/g'.$g['id'].'/600/200') ?>')"></div>
          <h3><a href="<?= url(['platform'=>'facebook','action'=>'group','id'=>$g['id']]) ?>"><?= e($g['name']) ?></a></h3>
          <p class="muted small"><?= (int)$g['members'] ?> members</p>
          <p><?= e($g['description']) ?></p>
          <?php if (!$isMember): ?>
            <form method="post" action="<?= url(['platform'=>'facebook']) ?>" class="inline">
              <input type="hidden" name="subaction" value="join_group">
              <input type="hidden" name="group_id" value="<?= (int)$g['id'] ?>">
              <button class="btn-facebook">Join</button>
            </form>
          <?php else: ?>
            <span class="muted small">✓ Member</span>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
    <?php
    render_footer();
}

function fb_group_view(): void {
    $gid = (int)($_GET['id'] ?? 0);
    $g = q('SELECT * FROM groups_tbl WHERE id=?', [$gid])->fetch();
    if (!$g) { http_response_code(404); echo 'Not found'; return; }
    $me = current_user();
    $isMember = q('SELECT 1 FROM group_members WHERE group_id=? AND user_id=?', [$gid, $me['id']])->fetch();
    $posts = q("SELECT p.*, ".author_select_sql().", g.name AS group_name
                FROM posts p ".author_join_sql()."
                JOIN groups_tbl g ON g.id=p.group_id
                WHERE p.platform='facebook' AND p.group_id=?
                ORDER BY p.created_at DESC", [$gid])->fetchAll();
    $members = q('SELECT u.*, gm.role FROM group_members gm JOIN users u ON u.id=gm.user_id WHERE gm.group_id=?', [$gid])->fetchAll();

    render_header('facebook', $g['name']);
    render_flash();
    ?>
    <div class="fb-cover" style="background-image:url('<?= e($g['cover_url'] ?: 'https://picsum.photos/seed/g'.$g['id'].'/1200/300') ?>')"></div>
    <div class="card group-head">
      <h2><?= e($g['name']) ?></h2>
      <p><?= e($g['description']) ?></p>
      <p class="muted small"><?= count($members) ?> members</p>
      <?php if (!$isMember): ?>
        <form method="post" action="<?= url(['platform'=>'facebook']) ?>" class="inline">
          <input type="hidden" name="subaction" value="join_group">
          <input type="hidden" name="group_id" value="<?= $gid ?>">
          <input type="hidden" name="_return" value="<?= e(url(['platform'=>'facebook','action'=>'group','id'=>$gid])) ?>">
          <button class="btn-facebook">Join group</button>
        </form>
      <?php else: ?>
        <form method="post" action="<?= url(['platform'=>'facebook']) ?>" class="inline">
          <input type="hidden" name="subaction" value="leave_group">
          <input type="hidden" name="group_id" value="<?= $gid ?>">
          <input type="hidden" name="_return" value="<?= e(url(['platform'=>'facebook','action'=>'groups'])) ?>">
          <button class="btn-outline">Leave group</button>
        </form>
      <?php endif; ?>
    </div>

    <div class="fb-layout">
      <div class="fb-main">
        <?php if ($isMember): ?>
          <div class="composer card">
            <form method="post" action="<?= url(['platform'=>'facebook']) ?>">
              <input type="hidden" name="subaction" value="post">
              <input type="hidden" name="group_id" value="<?= $gid ?>">
              <input type="hidden" name="_return" value="<?= e(url(['platform'=>'facebook','action'=>'group','id'=>$gid])) ?>">
              <textarea name="content" placeholder="Post to <?= e($g['name']) ?>..."></textarea>
              <input name="image_url" placeholder="Image URL (optional)">
              <button class="btn-facebook">Post to group</button>
            </form>
          </div>
        <?php endif; ?>
        <?php foreach ($posts as $p) fb_render_post($p, $me); ?>
      </div>
      <aside class="fb-left">
        <div class="card">
          <h3>Members</h3>
          <?php foreach ($members as $m): ?>
            <div class="friend-row">
              <img class="avatar-sm" src="<?= e($m['avatar_url'] ?: 'https://picsum.photos/seed/u'.$m['id'].'/40') ?>" alt="">
              <span><?= e($m['display_name']) ?> <?php if ($m['role']==='admin'): ?><span class="muted small">admin</span><?php endif; ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      </aside>
    </div>
    <?php
    render_footer();
}

function fb_analytics(): void {
    $me = current_user();
    $stats = all_stats((int)$me['id'], 'facebook');
    render_header('facebook', 'Analytics');
    ?>
    <h2>MockBook Analytics — <?= e($me['display_name']) ?></h2>
    <div class="analytics-grid">
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['friends']) ?></div><div class="muted">Friends</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['page_likes']) ?></div><div class="muted">Page likes</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['reach']) ?></div><div class="muted">Reach</div></div>
      <div class="stat-card"><div class="stat-num"><?= pretty_number($stats['post_reach']) ?></div><div class="muted">Post reach</div></div>
      <div class="stat-card"><div class="stat-num"><?= e((string)$stats['engagement_rate']) ?>%</div><div class="muted">Engagement rate</div></div>
    </div>
    <p><a class="btn-facebook" href="<?= url(['action'=>'stats','platform'=>'facebook']) ?>">Edit stats</a></p>
    <?php
    render_footer();
}
