<?php
declare(strict_types=1);

function current_user(): ?array {
    static $cache = false;
    if ($cache !== false) return $cache;
    if (empty($_SESSION['user_id'])) return $cache = null;
    $row = q('SELECT * FROM users WHERE id = ?', [$_SESSION['user_id']])->fetch();
    return $cache = $row ?: null;
}

function require_admin(): void {
    $u = current_user();
    if (!$u || (int)$u['is_admin'] !== 1) {
        http_response_code(403);
        echo 'Forbidden — admin only.';
        exit;
    }
}

function touch_last_active(int $userId): void {
    q('UPDATE users SET last_active = NOW() WHERE id = ?', [$userId]);
}

function try_login(string $username, string $password): bool {
    $row = q('SELECT * FROM users WHERE username = ?', [$username])->fetch();
    if (!$row) return false;
    if (!password_verify($password, $row['password'])) return false;
    $_SESSION['user_id'] = (int)$row['id'];
    return true;
}
