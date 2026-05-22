<?php
declare(strict_types=1);

function handle_login(): void {
    $error = null;
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $u = trim($_POST['username'] ?? '');
        $p = (string)($_POST['password'] ?? '');
        if (try_login($u, $p)) {
            header('Location: ' . base_path() . '/');
            exit;
        }
        $error = 'Invalid username or password.';
    }
    ?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>MockSocial — Log in</title>
<base href="<?= e(base_path()) ?>/">
<link rel="icon" type="image/png" href="assets/images/logo.png">
<?php $cssV = (string)@filemtime(__DIR__ . '/../assets/css/base.css'); ?>
<link rel="stylesheet" href="assets/css/base.css?v=<?= e($cssV) ?>">
</head>
<body class="login-page">
<div class="login-card">
  <img src="assets/images/logo_light.png" alt="MockSocial" class="login-logo">
  <p class="muted">Internal teaching tool — Hereford College</p>
  <?php if ($error): ?><div class="error"><?= e($error) ?></div><?php endif; ?>
  <form method="post" action="<?= url(['action'=>'login']) ?>">
    <label>Username<input name="username" autofocus required></label>
    <label>Password<input type="password" name="password" required></label>
    <button type="submit">Log in</button>
  </form>
  <p class="muted small">Students: log in with your <strong>Student ID</strong> and the password <code>Student26</code>. Staff log in with their admin credentials.</p>
</div>
</body>
</html>
<?php
}
