<?php
declare(strict_types=1);

session_start();

require_once __DIR__ . '/src/db.php';
require_once __DIR__ . '/src/helpers.php';
require_once __DIR__ . '/src/auth.php';

$action    = $_GET['action']    ?? null;
$platform  = $_GET['platform']  ?? null;

// public routes
if ($action === 'login') {
    require __DIR__ . '/src/login.php';
    handle_login();
    exit;
}

if (!current_user()) {
    require __DIR__ . '/src/login.php';
    handle_login();
    exit;
}

// authenticated: bump last_active
touch_last_active(current_user()['id']);

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    header('Location: ' . base_path() . '/');
    exit;
}

if ($action === 'admin') {
    require __DIR__ . '/src/admin.php';
    handle_admin();
    exit;
}

if ($action === 'stats') {
    require __DIR__ . '/src/stats.php';
    handle_stats();
    exit;
}

if ($platform === 'twitter') {
    require __DIR__ . '/src/twitter.php';
    handle_twitter();
    exit;
}
if ($platform === 'facebook') {
    require __DIR__ . '/src/facebook.php';
    handle_facebook();
    exit;
}
if ($platform === 'instagram') {
    require __DIR__ . '/src/instagram.php';
    handle_instagram();
    exit;
}
if ($platform === 'youtube') {
    require __DIR__ . '/src/youtube.php';
    handle_youtube();
    exit;
}

// default: home
require __DIR__ . '/src/home.php';
handle_home();
