<?php
    // delete-message.php
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

    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'DELETE') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
        exit();
    }

    require_once __DIR__ . '/auth.php';
    requireAuth(300);
    requireRole('admin');

    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'JSON invalide']);
        exit();
    }

    $id = (int)($data['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID manquant']);
        exit();
    }

    require_once __DIR__ . '/db.php';

    try {
        $pdo = getPDO();

        $stmt = $pdo->prepare('DELETE FROM messages WHERE id = ?');
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Message introuvable']);
            exit();
        }

        echo json_encode(['success' => true, 'id' => $id]);
        exit();

    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur suppression']);
        exit();
    }