<?php
    // news.php
    declare(strict_types=1);

    require_once __DIR__ . '/cors.php';
    header('Content-Type: application/json; charset=utf-8');

    // Préflight
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
        exit();
    }

    require_once __DIR__ . '/db.php';

    try {
        $pdo = getPDO();

        $stmt = $pdo->query(
            "SELECT id, text, position
            FROM news_items
            ORDER BY position ASC, id ASC"
        );

        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'items' => $items]);
        exit();

    } catch (Throwable $e) {
        error_log("news.php error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
        exit();
    }