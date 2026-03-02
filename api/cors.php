<?php
    // cors.php
    declare(strict_types=1);

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    $allowed = [
        // DEV (Vite)
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ];

    if ($origin && in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(200);
        exit();
    }