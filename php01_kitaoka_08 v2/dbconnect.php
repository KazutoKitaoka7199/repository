<?php

try {

  $pdo = new PDO(
    'mysql:dbname=phpkadai1v2;host=localhost;charset=utf8mb4',
    'kitaoka0719',
    'kitaoka7199',
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
  );

} catch (PDOException $e) {

    header('Content-Type: text/plain; charset=UTF-8', true, 500);
    exit($e->getMessage());

}