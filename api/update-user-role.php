<?php
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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	http_response_code(405);
	echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
	exit();
}

require_once __DIR__ . '/auth.php';
requireAuth(300);
requireRole('admin'); // ✅ admin only

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
	http_response_code(400);
	echo json_encode(['success' => false, 'error' => 'JSON invalide']);
	exit();
}

$id = (int)($data['id'] ?? 0);
$role = (string)($data['role'] ?? '');

$allowedRoles = ['admin', 'user', 'moderator'];
if ($id <= 0 || !in_array($role, $allowedRoles, true)) {
	http_response_code(400);
	echo json_encode(['success' => false, 'error' => 'Données invalides']);
	exit();
}

// Optionnel mais conseillé : empêcher de se retirer ses propres droits admin
$myId = (int)($_SESSION['user_id'] ?? 0);
if ($myId > 0 && $id === $myId && $role !== 'admin') {
	http_response_code(400);
	echo json_encode(['success' => false, 'error' => 'Impossible de retirer votre propre rôle admin']);
	exit();
}

require_once __DIR__ . '/db.php';

try {
	$pdo = getPDO();
	$stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
	$stmt->execute([$role, $id]);

	echo json_encode(['success' => true, 'id' => $id, 'role' => $role]);
	exit();
} catch (Throwable $e) {
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
	exit();
}