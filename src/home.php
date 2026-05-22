<?php
declare(strict_types=1);

function handle_home(): void {
    $user = current_user();

    $tiles = [
        ['platform'=>'twitter',  'name'=>'MockTweet',  'stat'=>'followers',   'label'=>'followers'],
        ['platform'=>'facebook', 'name'=>'MockBook',   'stat'=>'friends',     'label'=>'friends'],
        ['platform'=>'instagram','name'=>'MockGram',   'stat'=>'followers',   'label'=>'followers'],
        ['platform'=>'youtube',  'name'=>'MockTube',   'stat'=>'subscribers', 'label'=>'subscribers'],
    ];

    // most recent like received on any of my posts (real or fake liker)
    $recentLike = q(
        "SELECT l.created_at, p.platform, p.content, p.id AS post_id,
                COALESCE(u.display_name, fu.display_name) AS display_name,
                COALESCE(u.avatar_url,   fu.avatar_url)   AS avatar_url
         FROM likes l
         JOIN posts p ON p.id = l.post_id
         LEFT JOIN users u       ON u.id  = l.user_id
         LEFT JOIN fake_users fu ON fu.id = l.fake_user_id
         WHERE p.user_id = ?
           AND (l.user_id IS NULL OR l.user_id <> ?)
         ORDER BY l.created_at DESC
         LIMIT 1",
        [$user['id'], $user['id']]
    )->fetch();

    render_header('', 'Home');
    render_flash();
    ?>
    <section class="home-hero">
      <h1>Welcome back, <?= e($user['display_name']) ?>.</h1>
      <p class="muted">Pick a platform to jump in.</p>
    </section>

    <?php if ($recentLike): ?>
      <div class="notify-strip">
        <img src="<?= e($recentLike['avatar_url'] ?: 'https://picsum.photos/seed/n/40') ?>" alt="">
        <span><strong><?= e($recentLike['display_name']) ?></strong> liked your <?= e(platform_label($recentLike['platform'])) ?> post
          &mdash; <a href="<?= url(['platform'=>$recentLike['platform']]) ?>">view</a></span>
        <span class="muted small"><?= e(relative_time($recentLike['created_at'])) ?> ago</span>
      </div>
    <?php endif; ?>

    <section class="tile-grid">
    <?php foreach ($tiles as $t):
      $v = get_stat((int)$user['id'], $t['platform'], $t['stat']); ?>
      <a class="tile tab-<?= e($t['platform']) ?>" href="<?= url(['platform'=>$t['platform']]) ?>">
        <h2><?= e($t['name']) ?></h2>
        <div class="tile-stat"><?= pretty_number($v) ?> <span><?= e($t['label']) ?></span></div>
      </a>
    <?php endforeach; ?>
    </section>
    <?php
    render_footer();
}

function platform_label(string $p): string {
    return ['twitter'=>'MockTweet','facebook'=>'MockBook','instagram'=>'MockGram','youtube'=>'MockTube'][$p] ?? $p;
}
