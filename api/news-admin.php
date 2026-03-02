<?php
    // news-admin.php
    declare(strict_types=1);

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    require_once __DIR__ . '/cors.php';
    header('Content-Type: application/json; charset=utf-8');

    // Préflight
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    require_once __DIR__ . '/auth.php';
    requireAuth(300);
    requireRole('admin');

    require_once __DIR__ . '/db.php';

    try {
        $pdo = getPDO();
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données']);
        exit();
    }

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) $data = [];

    try {
        // 1) GET: liste des news
        if ($method === 'GET') {
            $stmt = $pdo->query(
                "SELECT id, text, position, active
                FROM news_items
                ORDER BY position ASC, id ASC"
            );
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'items' => $items]);
            exit();
        }

        // 2) POST: reorder
        if ($method === 'POST' && (($data['action'] ?? '') === 'reorder')) {
            $ids = $data['orderedIds'] ?? [];

            if (!is_array($ids) || count($ids) === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'orderedIds manquant']);
                exit();
            }

            $pdo->beginTransaction();

            $pos = 1;
            $stmt = $pdo->prepare("UPDATE news_items SET position = ? WHERE id = ?");

            foreach ($ids as $id) {
                $stmt->execute([$pos, (int)$id]);
                $pos++;
            }

            $pdo->commit();
            echo json_encode(['success' => true]);
            exit();
        }

        // 3) POST: add item
        if ($method === 'POST') {
            $text = trim((string)($data['text'] ?? ''));

            if ($text === '') {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Texte vide']);
                exit();
            }

            if (mb_strlen($text) > 300) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Texte trop long']);
                exit();
            }

            $max = $pdo->query("SELECT COALESCE(MAX(position),0) AS m FROM news_items")
                ->fetch(PDO::FETCH_ASSOC);

            $pos = ((int)($max['m'] ?? 0)) + 1;

            $stmt = $pdo->prepare("INSERT INTO news_items (text, position, active) VALUES (?, ?, 1)");
            $stmt->execute([$text, $pos]);

            echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
            exit();
        }

        // 4) DELETE: delete item
        if ($method === 'DELETE') {
            $id = (int)($data['id'] ?? 0);

            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'ID manquant']);
                exit();
            }

            $stmt = $pdo->prepare("DELETE FROM news_items WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'News introuvable']);
                exit();
            }

            echo json_encode(['success' => true]);
            exit();
        }

        // Méthode non gérée
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
        exit();

    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Erreur serveur',
        ]);
        exit();
    }