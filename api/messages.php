<?php
// messages.php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

require_once __DIR__ . '/cors.php';
header('Content-Type: application/json; charset=utf-8');

// Préflight (au cas où)
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
	http_response_code(200);
	exit();
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
	http_response_code(405);
	echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
	exit();
}

require_once __DIR__ . '/auth.php';
requireAuth(300);        // timeout 5 min
requireRole('admin');    // ✅ admin only

require_once __DIR__ . '/db.php';

try {
	$pdo = getPDO();

	$stmt = $pdo->query(
			'SELECT id, nom, prenom, email, sujet, message, lu, created_at
			FROM messages
			ORDER BY created_at DESC'
	);

	$messages = $stmt->fetchAll();

	echo json_encode(['success' => true, 'messages' => $messages]);
	exit();
} catch (Throwable $e) {
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
	exit();
}