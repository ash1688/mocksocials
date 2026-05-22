<?php
declare(strict_types=1);

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        // Load local config override if present (used for native / XAMPP installs)
        $cfg = [];
        $cfgFile = __DIR__ . '/config.local.php';
        if (is_file($cfgFile)) $cfg = require $cfgFile;

        $host = $cfg['host'] ?? getenv('DB_HOST') ?: 'db';
        $name = $cfg['name'] ?? getenv('DB_NAME') ?: 'mocksocial';
        $user = $cfg['user'] ?? getenv('DB_USER') ?: 'mocksocial';
        $pass = $cfg['pass'] ?? getenv('DB_PASS') ?: '';
        $dsn  = "mysql:host={$host};dbname={$name};charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}

function q(string $sql, array $params = []): PDOStatement {
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    return $stmt;
}
