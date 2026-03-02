<?php
// coursEtTutos-chapters-admin.php
declare(strict_types=1);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

// --------------------
// Session + Auth (admin requis)
// Aligné sur ton modèle coursEtTutos-categories.php
// --------------------
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

// Pas connecté
if (empty($_SESSION['logged_in'])) {
	http_response_code(401);
	echo json_encode(['success' => false, 'error' => 'Connexion requise'], JSON_UNESCAPED_UNICODE);
	exit;
}

// Expiration par inactivité
if (isset($_SESSION['last_activity']) && (time() - (int)$_SESSION['last_activity']) > $timeout) {
	session_unset();
	session_destroy();
	http_response_code(401);
	echo json_encode(['success' => false, 'error' => 'Session expirée (inactivité)'], JSON_UNESCAPED_UNICODE);
	exit;
}

// Admin requis (⚠️ adapte si ta clé de rôle est différente)
$role = $_SESSION['user']['role'] ?? ($_SESSION['role'] ?? null);
if ($role !== 'admin') {
	http_response_code(403);
	echo json_encode(['success' => false, 'error' => 'Accès admin requis'], JSON_UNESCAPED_UNICODE);
	exit;
}

// Mise à jour timestamp
$_SESSION['last_activity'] = time();

$pdo = getPDO();

function readJson(): array {
	$raw = file_get_contents('php://input');
	if (!$raw) return [];
	$decoded = json_decode($raw, true);
	return is_array($decoded) ? $decoded : [];
}

function getCourseBySlug(PDO $pdo, string $courseSlug): ?array {
	$stmt = $pdo->prepare("SELECT id, title, slug FROM cours_et_tutos_items WHERE slug = ? LIMIT 1");
	$stmt->execute([$courseSlug]);
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	return $row ?: null;
}

try {
	$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

	// --------------------
	// GET: list chapters by course_slug
	// --------------------
	if ($method === 'GET') {
		$courseSlug = trim((string)($_GET['course_slug'] ?? ''));
		if ($courseSlug === '') {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'course_slug manquant'], JSON_UNESCAPED_UNICODE);
			exit;
		}

		$course = getCourseBySlug($pdo, $courseSlug);
		if (!$course) {
			http_response_code(404);
			echo json_encode(['success' => false, 'error' => 'Cours introuvable'], JSON_UNESCAPED_UNICODE);
			exit;
		}

		$stmt = $pdo->prepare("
			SELECT id, course_id, title, slug, position, active
			FROM cours_et_tutos_chapters
			WHERE course_id = ?
			ORDER BY position ASC, id ASC
		");
		$stmt->execute([(int)$course['id']]);
		$chapters = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode(['success' => true, 'course' => $course, 'chapters' => $chapters], JSON_UNESCAPED_UNICODE);
		exit;
	}

	// --------------------
	// POST: create chapter
	// body: { course_slug, title, slug, position, active }
	// --------------------
	if ($method === 'POST') {
		$body = readJson();

		$courseSlug = trim((string)($body['course_slug'] ?? ''));
		$title = trim((string)($body['title'] ?? ''));
		$slug = trim((string)($body['slug'] ?? ''));
		$position = (int)($body['position'] ?? 0);
		$active = (int)($body['active'] ?? 1);

		if ($courseSlug === '' || $title === '' || $slug === '') {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'course_slug, title et slug sont obligatoires'], JSON_UNESCAPED_UNICODE);
			exit;
		}

		$course = getCourseBySlug($pdo, $courseSlug);
		if (!$course) {
			http_response_code(404);
			echo json_encode(['success' => false, 'error' => 'Cours introuvable'], JSON_UNESCAPED_UNICODE);
			exit;
		}

		$stmt = $pdo->prepare("
			INSERT INTO cours_et_tutos_chapters (course_id, title, slug, position, active)
			VALUES (?, ?, ?, ?, ?)
		");
		$stmt->execute([(int)$course['id'], $title, $slug, $position, $active ? 1 : 0]);

		echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()], JSON_UNESCAPED_UNICODE);
		exit;
	}

	// --------------------
	// PUT: update chapter
	// body: { id, title, slug, position, active }
	// --------------------
	if ($method === 'PUT') {
		$body = readJson();

		$id = (int)($body['id'] ?? 0);
		$title = trim((string)($body['title'] ?? ''));
		$slug = trim((string)($body['slug'] ?? ''));
		$position = (int)($body['position'] ?? 0);
		$active = (int)($body['active'] ?? 1);

		if ($id <= 0 || $title === '' || $slug === '') {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'id, title et slug sont obligatoires'], JSON_UNESCAPED_UNICODE);
			exit;
		}

		$stmt = $pdo->prepare("
			UPDATE cours_et_tutos_chapters
			SET title = ?, slug = ?, position = ?, active = ?
			WHERE id = ?
		");
		$stmt->execute([$title, $slug, $position, $active ? 1 : 0, $id]);

		echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
		exit;
	}

	// --------------------
	// DELETE: delete chapter
	// query: ?id=123
	// --------------------
	if ($method === 'DELETE') {
		$id = (int)($_GET['id'] ?? 0);
		if ($id <= 0) {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'id manquant'], JSON_UNESCAPED_UNICODE);
			exit;
		}

		$stmt = $pdo->prepare("DELETE FROM cours_et_tutos_chapters WHERE id = ?");
		$stmt->execute([$id]);

		echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
		exit;
	}

	http_response_code(405);
	echo json_encode(['success' => false, 'error' => 'Méthode non supportée'], JSON_UNESCAPED_UNICODE);
	exit;

} catch (Throwable $e) {
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur'], JSON_UNESCAPED_UNICODE);
	exit;
}