<?php
// coursEtTutos-chapters.php
declare(strict_types=1);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

// ---- Session + Auth (connecté requis) ----
if (session_status() === PHP_SESSION_NONE) {
	$https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
	session_set_cookie_params([
		'lifetime' => 0,
		'path' => '/',
		'samesite' => 'Lax',
		'secure' => $https,
		'httponly' => true,
	]);
	session_start();
}

$timeout = 300;

if (empty($_SESSION['logged_in'])) {
	http_response_code(401);
	echo json_encode(['success' => false, 'error' => 'Connexion requise'], JSON_UNESCAPED_UNICODE);
	exit;
}

if (isset($_SESSION['last_activity']) && (time() - (int)$_SESSION['last_activity']) > $timeout) {
	session_unset();
	session_destroy();
	http_response_code(401);
	echo json_encode(['success' => false, 'error' => 'Session expirée (inactivité)'], JSON_UNESCAPED_UNICODE);
	exit;
}

$_SESSION['last_activity'] = time();

// ---- Input ----
$courseSlug = trim((string)($_GET['course_slug'] ?? ''));
if ($courseSlug === '') {
	http_response_code(400);
	echo json_encode(['success' => false, 'error' => 'course_slug manquant'], JSON_UNESCAPED_UNICODE);
	exit;
}

try {
	$pdo = getPDO();

	// Trouver le cours via son slug
	$stmt = $pdo->prepare("SELECT id, title, slug FROM cours_et_tutos_items WHERE slug = ? LIMIT 1");
	$stmt->execute([$courseSlug]);
	$course = $stmt->fetch(PDO::FETCH_ASSOC);

	if (!$course) {
		http_response_code(404);
		echo json_encode(['success' => false, 'error' => 'Cours introuvable'], JSON_UNESCAPED_UNICODE);
		exit;
	}

	$courseId = (int)$course['id'];

	// Récupérer les chapitres actifs
	$stmt = $pdo->prepare("
		SELECT id, title, slug, position, active
		FROM cours_et_tutos_chapters
		WHERE course_id = ? AND active = 1
		ORDER BY position ASC, id ASC
	");
	$stmt->execute([$courseId]);
	$chapters = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode([
		'success' => true,
		'course' => $course,
		'chapters' => $chapters,
	], JSON_UNESCAPED_UNICODE);
	exit;

} catch (Throwable $e) {
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur'], JSON_UNESCAPED_UNICODE);
	exit;
}