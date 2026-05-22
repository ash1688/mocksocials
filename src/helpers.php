<?php
declare(strict_types=1);

function e(?string $s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function base_path(): string {
    $sn = $_SERVER['SCRIPT_NAME'] ?? '/index.php';
    $dir = rtrim(str_replace('\\', '/', dirname($sn)), '/');
    return $dir === '' ? '' : $dir;
}

function url(array $params): string {
    $qs = http_build_query(array_filter($params, fn($v) => $v !== null && $v !== ''));
    // Return a relative URL (just the query string). Browsers resolve it
    // against the current document, so this works regardless of whether the
    // app is mounted at /, /mocksocial/, or via a vhost.
    return $qs ? '?' . $qs : '?';
}

function redirect(string $to): void {
    header('Location: ' . $to);
    exit;
}

function relative_time(string $datetime): string {
    $ts = strtotime($datetime);
    $diff = time() - $ts;
    if ($diff < 60)    return $diff . 's';
    if ($diff < 3600)  return floor($diff/60) . 'm';
    if ($diff < 86400) return floor($diff/3600) . 'h';
    if ($diff < 604800) return floor($diff/86400) . 'd';
    return date('j M', $ts);
}

function pretty_number(int|float $n): string {
    if ($n < 1000) return (string)$n;
    if ($n < 1_000_000) return rtrim(rtrim(number_format($n/1000, 1, '.', ''), '0'), '.') . 'K';
    if ($n < 1_000_000_000) return rtrim(rtrim(number_format($n/1_000_000, 1, '.', ''), '0'), '.') . 'M';
    return rtrim(rtrim(number_format($n/1_000_000_000, 1, '.', ''), '0'), '.') . 'B';
}

function find_hashtags(string $text): array {
    preg_match_all('/#([\p{L}0-9_]+)/u', $text, $m);
    return array_map('mb_strtolower', $m[1]);
}

function linkify(string $text, string $platform = 'twitter'): string {
    // Pull hashtags out FIRST on the raw text so the regex doesn't accidentally
    // match digits inside HTML entities like &#039; once e() has run. We swap
    // each hashtag for a placeholder, escape the rest, then restore the links.
    $tags = [];
    $text = preg_replace_callback('/#([\p{L}0-9_]+)/u', function($m) use (&$tags, $platform) {
        $u = url(['platform' => $platform, 'action' => 'hashtag', 'tag' => mb_strtolower($m[1])]);
        $tags[] = '<a class="hashtag" href="' . e($u) . '">#' . e($m[1]) . '</a>';
        return "\x00LINKIFY" . (count($tags) - 1) . "\x00";
    }, $text);
    $text = e($text);
    return preg_replace_callback('/\x00LINKIFY(\d+)\x00/', fn($m) => $tags[(int)$m[1]], $text);
}

function stat_keys(string $platform): array {
    return [
        'twitter'   => ['followers','following','impressions','profile_visits','mentions'],
        'facebook'  => ['friends','page_likes','reach','post_reach','engagement_rate'],
        'instagram' => ['followers','following','impressions','reach','profile_visits','story_views'],
        'youtube'   => ['subscribers','total_views','watch_time_hours','avg_view_duration','revenue_gbp'],
    ][$platform] ?? [];
}

function get_stat(int $userId, string $platform, string $key): int {
    $row = q('SELECT stat_value FROM manual_stats WHERE user_id=? AND platform=? AND stat_key=?',
        [$userId, $platform, $key])->fetch();
    return $row ? (int)$row['stat_value'] : 0;
}

function set_stat(int $userId, string $platform, string $key, int $value): void {
    q('INSERT INTO manual_stats (user_id, platform, stat_key, stat_value)
       VALUES (?,?,?,?)
       ON DUPLICATE KEY UPDATE stat_value = VALUES(stat_value)',
       [$userId, $platform, $key, $value]);
}

function all_stats(int $userId, string $platform): array {
    $out = [];
    foreach (stat_keys($platform) as $k) $out[$k] = get_stat($userId, $platform, $k);
    return $out;
}

function rand_in(int $min, int $max): int {
    return random_int($min, $max);
}

function autofill_preset(string $platform, string $preset): array {
    $r = function($lo, $hi) { return rand_in($lo, $hi); };
    $presets = [
        'twitter' => [
            'low'    => ['followers'=>$r(80,400),'following'=>$r(50,300),'impressions'=>$r(1000,8000),'profile_visits'=>$r(50,400),'mentions'=>$r(2,30)],
            'medium' => ['followers'=>$r(2000,15000),'following'=>$r(200,800),'impressions'=>$r(30000,180000),'profile_visits'=>$r(800,3500),'mentions'=>$r(40,250)],
            'high'   => ['followers'=>$r(50000,500000),'following'=>$r(300,1500),'impressions'=>$r(500000,5000000),'profile_visits'=>$r(10000,80000),'mentions'=>$r(500,5000)],
        ],
        'facebook' => [
            'low'    => ['friends'=>$r(40,200),'page_likes'=>$r(80,500),'reach'=>$r(1000,6000),'post_reach'=>$r(200,1500),'engagement_rate'=>$r(2,5)],
            'medium' => ['friends'=>$r(200,500),'page_likes'=>$r(800,3000),'reach'=>$r(15000,60000),'post_reach'=>$r(3000,12000),'engagement_rate'=>$r(3,7)],
            'high'   => ['friends'=>$r(800,2000),'page_likes'=>$r(20000,250000),'reach'=>$r(200000,2000000),'post_reach'=>$r(50000,400000),'engagement_rate'=>$r(4,9)],
        ],
        'instagram' => [
            'low'    => ['followers'=>$r(100,500),'following'=>$r(100,400),'impressions'=>$r(1000,9000),'reach'=>$r(800,7000),'profile_visits'=>$r(40,400),'story_views'=>$r(80,800)],
            'medium' => ['followers'=>$r(2000,15000),'following'=>$r(200,800),'impressions'=>$r(30000,200000),'reach'=>$r(20000,150000),'profile_visits'=>$r(800,5000),'story_views'=>$r(1500,10000)],
            'high'   => ['followers'=>$r(50000,500000),'following'=>$r(300,1500),'impressions'=>$r(500000,5000000),'reach'=>$r(300000,4000000),'profile_visits'=>$r(10000,80000),'story_views'=>$r(20000,200000)],
        ],
        'youtube' => [
            'low'    => ['subscribers'=>$r(80,800),'total_views'=>$r(2000,20000),'watch_time_hours'=>$r(40,500),'avg_view_duration'=>$r(120,300),'revenue_gbp'=>$r(2,40)],
            'medium' => ['subscribers'=>$r(5000,40000),'total_views'=>$r(200000,2000000),'watch_time_hours'=>$r(8000,80000),'avg_view_duration'=>$r(200,420),'revenue_gbp'=>$r(300,3000)],
            'high'   => ['subscribers'=>$r(80000,2000000),'total_views'=>$r(5000000,80000000),'watch_time_hours'=>$r(200000,3000000),'avg_view_duration'=>$r(300,600),'revenue_gbp'=>$r(8000,160000)],
        ],
    ];
    return $presets[$platform][$preset] ?? [];
}

// YouTube stats profile seed ranges (per the spec)
function youtube_seed(string $profile): array {
    $ranges = [
        'low'      => [[200,800],         [10,40],       [2,8],      [5,20]],
        'moderate' => [[5000,25000],      [300,1500],    [50,200],   [50,300]],
        'high'     => [[100000,500000],   [8000,40000],  [1000,5000],[2000,10000]],
        'hyped'    => [[1000000,5000000], [80000,400000],[10000,50000],[20000,100000]],
        'viral'    => [[10000000,80000000],[500000,5000000],[50000,500000],[100000,2000000]],
    ];
    $r = $ranges[$profile] ?? $ranges['low'];
    return [
        'views'     => rand_in($r[0][0], $r[0][1]),
        'likes'     => rand_in($r[1][0], $r[1][1]),
        'comments'  => rand_in($r[2][0], $r[2][1]),
        'sub_boost' => rand_in($r[3][0], $r[3][1]),
    ];
}

function user_by_id(int $id): ?array {
    $row = q('SELECT * FROM users WHERE id = ?', [$id])->fetch();
    return $row ?: null;
}

function fake_user_by_id(int $id): ?array {
    $row = q('SELECT * FROM fake_users WHERE id = ?', [$id])->fetch();
    return $row ?: null;
}

// Builds a profile link for any post — real or fake author.
function profile_url(string $platform, array $post): string {
    if (!empty($post['user_id'])) {
        return url(['platform'=>$platform, 'action'=>'profile', 'user'=>$post['user_id']]);
    }
    if (!empty($post['fake_user_id'])) {
        return url(['platform'=>$platform, 'action'=>'profile', 'fake'=>$post['fake_user_id']]);
    }
    return url(['platform'=>$platform]);
}

// Deterministic fake stats per (fake_user_id, platform) so numbers don't
// reshuffle on every page load. Mirrors stat_keys() shapes.
function fake_user_stats(int $fakeId, string $platform): array {
    $keys = stat_keys($platform);
    if (!$keys) return [];
    $out = [];
    foreach ($keys as $i => $k) {
        // mulberry-ish hash → stable pseudo-random per (fake_id, platform, key)
        $h = crc32($fakeId . '|' . $platform . '|' . $k);
        $r = ($h % 100000) / 100000;
        // pick a scale based on key name
        if (str_contains($k, 'follow') || str_contains($k, 'friend') || str_contains($k, 'subscribers') || $k === 'page_likes') {
            $out[$k] = (int)round(200 + $r * 50000);
        } elseif (str_contains($k, 'view') || str_contains($k, 'reach') || str_contains($k, 'impressions')) {
            $out[$k] = (int)round(2000 + $r * 500000);
        } elseif ($k === 'engagement_rate') {
            $out[$k] = (int)round(2 + $r * 8);
        } elseif ($k === 'revenue_gbp') {
            $out[$k] = (int)round($r * 4000);
        } elseif ($k === 'watch_time_hours') {
            $out[$k] = (int)round(50 + $r * 20000);
        } elseif ($k === 'avg_view_duration') {
            $out[$k] = (int)round(120 + $r * 360);
        } else {
            $out[$k] = (int)round(20 + $r * 1500);
        }
    }
    return $out;
}

// SQL fragments for joining the author of a post — author may be a real user
// (posts.user_id) or a fake persona (posts.fake_user_id). Use in any query
// that needs author display_name / avatar_url / username.
function author_select_sql(string $postAlias = 'p'): string {
    return "COALESCE(u.username, fu.username) AS username,
            COALESCE(u.display_name, fu.display_name) AS display_name,
            COALESCE(u.avatar_url, fu.avatar_url) AS avatar_url";
}
function author_join_sql(string $postAlias = 'p'): string {
    return "LEFT JOIN users u ON u.id = {$postAlias}.user_id
            LEFT JOIN fake_users fu ON fu.id = {$postAlias}.fake_user_id";
}

function user_by_username(string $u): ?array {
    $row = q('SELECT * FROM users WHERE username = ?', [$u])->fetch();
    return $row ?: null;
}

function render_header(string $platform = '', string $title = 'MockSocial'): void {
    $user = current_user();
    $bodyClass = $platform ? 'platform-' . $platform : '';
    $bp = base_path();
    ?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= e($title) ?> — MockSocial</title>
<base href="<?= e($bp) ?>/">
<link rel="icon" type="image/png" href="assets/images/logo.png">
<?php
// Pick the most recent mtime across our CSS files so any edit forces a fetch.
$cssFiles = ['base','twitter','facebook','instagram','youtube'];
$cssV = (string)max(array_map(fn($f) => @filemtime(__DIR__ . '/../assets/css/' . $f . '.css') ?: 0, $cssFiles));
?>
<link rel="stylesheet" href="assets/css/base.css?v=<?= e($cssV) ?>">
<link rel="stylesheet" href="assets/css/twitter.css?v=<?= e($cssV) ?>">
<link rel="stylesheet" href="assets/css/facebook.css?v=<?= e($cssV) ?>">
<link rel="stylesheet" href="assets/css/instagram.css?v=<?= e($cssV) ?>">
<link rel="stylesheet" href="assets/css/youtube.css?v=<?= e($cssV) ?>">
<style>
/* Inline override — guarantees these win regardless of cached external CSS. */
html[data-theme="dark"] .flash {
  background: #3a3210 !important;
  border: 1px solid #8a7320 !important;
  color: #ffe98a !important;
}
html[data-theme="dark"] .error {
  background: #4a1818 !important;
  border: 1px solid #8a3030 !important;
  color: #ffb3b3 !important;
}
/* Backup: catches the case where the OS is in dark mode but data-theme isn't set. */
@media (prefers-color-scheme: dark) {
  html:not([data-theme="light"]) .flash {
    background: #3a3210 !important;
    border: 1px solid #8a7320 !important;
    color: #ffe98a !important;
  }
  html:not([data-theme="light"]) .error {
    background: #4a1818 !important;
    border: 1px solid #8a3030 !important;
    color: #ffb3b3 !important;
  }
}
</style>
<script>
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
function toggleTheme() {
  var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  var next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
}
</script>
</head>
<body class="<?= e($bodyClass) ?>">
<header class="topbar">
  <a class="brand" href="./">
    <img src="assets/images/logo_light.png" alt="MockSocial" class="brand-logo brand-logo-light">
    <img src="assets/images/logo_dark.png"  alt="MockSocial" class="brand-logo brand-logo-dark">
  </a>
  <nav class="topnav">
    <a class="<?= $platform==='twitter'?'active':''?> tab-twitter"     href="<?= url(['platform'=>'twitter']) ?>">MockTweet</a>
    <a class="<?= $platform==='facebook'?'active':''?> tab-facebook"   href="<?= url(['platform'=>'facebook']) ?>">MockBook</a>
    <a class="<?= $platform==='instagram'?'active':''?> tab-instagram" href="<?= url(['platform'=>'instagram']) ?>">MockGram</a>
    <a class="<?= $platform==='youtube'?'active':''?> tab-youtube"     href="<?= url(['platform'=>'youtube']) ?>">MockTube</a>
  </nav>
  <div class="userbox">
    <button type="button" class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark mode" title="Toggle theme"><span class="icon-moon">🌙</span><span class="icon-sun">☀️</span></button>
    <?php if ($user): ?>
      <img class="avatar-sm" src="<?= e($user['avatar_url'] ?: 'https://picsum.photos/seed/u'.$user['id'].'/40') ?>" alt="">
      <span><?= e($user['display_name']) ?></span>
      <?php if ((int)$user['is_admin']===1): ?><a href="<?= url(['action'=>'admin']) ?>">Admin</a><?php endif; ?>
      <a href="<?= url(['action'=>'logout']) ?>">Log out</a>
    <?php endif; ?>
  </div>
</header>
<main class="content">
<?php
}

function render_footer(): void {
    echo '</main></body></html>';
}

function flash(string $msg = null): ?string {
    if ($msg !== null) { $_SESSION['_flash'] = $msg; return null; }
    $m = $_SESSION['_flash'] ?? null; unset($_SESSION['_flash']);
    return $m;
}

function render_flash(): void {
    $m = flash();
    if ($m) echo '<div class="flash">' . e($m) . '</div>';
}
