<?php
    // delete-user.php
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

        // Empêcher de supprimer son propre compte
        $currentUserId = (int)($_SESSION['user_id'] ?? 0);
        if ($currentUserId > 0 && $currentUserId === $id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Impossible de supprimer le compte connecté']);
            exit();
        }

        $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$id]);

        // Optionnel : si id n'existe pas
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Utilisateur introuvable']);
            exit();
        }

        echo json_encode(['success' => true, 'id' => $id]);
        exit();

    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
        exit();
    }