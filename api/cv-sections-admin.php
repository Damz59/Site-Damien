<?php
declare(strict_types=1);

session_start();

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === 'http://localhost:5173') {
	header("Access-Control-Allow-Origin: $origin");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Methods: GET,POST,DELETE,OPTIONS");
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
	http_response_code(204);
	exit;
}

header('Content-Type: application/json; charset=utf-8');

// ---- helpers JSON
function json_out(bool $success, array $payload = [], int $http = 200): void
{
	http_response_code($http);
	echo json_encode(array_merge(['success' => $success], $payload));
	exit;
}

// ---- auth (✅ adapté à ton $_SESSION)
function isAdmin(): bool
{
	return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}
function requireAdmin(): void
{
	if (!isAdmin()) {
		json_out(false, ['error' => 'Accès refusé : admin requis.'], 403);
	}
}

// ---- DB
require_once __DIR__ . '/db.php'; // contient getPDO()
$pdo = getPDO();

requireAdmin();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// ============ GET: liste sections ============
if ($method === 'GET') {
	$stmt = $pdo->query('
		SELECT section, label, active, position
		FROM cv_sections
		ORDER BY position ASC, section ASC
	');
	$rows = $stmt->fetchAll();
	json_out(true, ['sections' => $rows]);
}

// lire body JSON (POST/DELETE)
$raw = file_get_contents('php://input') ?: '';
$body = json_decode($raw, true);
if (!is_array($body)) $body = [];
$action = (string)($body['action'] ?? '');

// ============ POST create ============
if ($method === 'POST' && $action === 'create') {
	$section = trim((string)($body['section'] ?? ''));
	$label   = trim((string)($body['label'] ?? ''));

	if ($section === '' || $label === '') json_out(false, ['error' => 'section et label requis'], 400);
	if (!preg_match('/^[a-z0-9_]+$/', $section)) json_out(false, ['error' => 'section invalide (a-z0-9_)'], 400);

	$maxPos = (int)$pdo->query('SELECT COALESCE(MAX(position), 0) FROM cv_sections')->fetchColumn();
	$newPos = $maxPos + 10;

	try {
		$stmt = $pdo->prepare('
			INSERT INTO cv_sections (section, label, active, position)
			VALUES (?, ?, 1, ?)
		');
		$stmt->execute([$section, $label, $newPos]);
	} catch (Throwable $e) {
		json_out(false, ['error' => 'Section déjà existante'], 409);
	}
	json_out(true);
}

// ============ POST toggle ============
if ($method === 'POST' && $action === 'toggle') {
	$section = trim((string)($body['section'] ?? ''));
	$active  = (int)($body['active'] ?? 0);

	if ($section === '') json_out(false, ['error' => 'section requise'], 400);

	$stmt = $pdo->prepare('UPDATE cv_sections SET active = ? WHERE section = ?');
	$stmt->execute([$active ? 1 : 0, $section]);

	json_out(true);
}

// ============ POST update (modifier label) ============
if ($method === 'POST' && $action === 'update') {
	$section = trim((string)($body['section'] ?? ''));
	$label   = trim((string)($body['label'] ?? ''));

	if ($section === '' || $label === '') {
		json_out(false, ['error' => 'section et label requis'], 400);
	}
	if (!preg_match('/^[a-z0-9_]+$/', $section)) {
		json_out(false, ['error' => 'section invalide (a-z0-9_)'], 400);
	}

	$stmt = $pdo->prepare('UPDATE cv_sections SET label = ? WHERE section = ?');
	$stmt->execute([$label, $section]);

	if ($stmt->rowCount() === 0) {
		// soit section introuvable, soit aucune modif (label identique) : on vérifie l'existence
		$chk = $pdo->prepare('SELECT 1 FROM cv_sections WHERE section = ?');
		$chk->execute([$section]);
		if (!$chk->fetchColumn()) {
			json_out(false, ['error' => 'Section introuvable'], 404);
		}
	}

	json_out(true);
}

// ============ POST move (up/down) ============
if ($method === 'POST' && $action === 'move') {
	$section = trim((string)($body['section'] ?? ''));
	$dir     = (string)($body['dir'] ?? '');

	if ($section === '') json_out(false, ['error' => 'section requise'], 400);
	if (!in_array($dir, ['up', 'down'], true)) json_out(false, ['error' => 'dir invalide'], 400);

	$stmt = $pdo->prepare('SELECT section, position FROM cv_sections WHERE section = ?');
	$stmt->execute([$section]);
	$cur = $stmt->fetch();

	if (!$cur) json_out(false, ['error' => 'Section introuvable'], 404);

	$pos = (int)$cur['position'];

	if ($dir === 'up') {
		$stmt = $pdo->prepare('
			SELECT section, position
			FROM cv_sections
			WHERE position < ?
			ORDER BY position DESC
			LIMIT 1
		');
		$stmt->execute([$pos]);
	} else {
		$stmt = $pdo->prepare('
			SELECT section, position
			FROM cv_sections
			WHERE position > ?
			ORDER BY position ASC
			LIMIT 1
		');
		$stmt->execute([$pos]);
	}

	$other = $stmt->fetch();
	if (!$other) json_out(true); // déjà en haut/bas

	$pdo->beginTransaction();
	try {
		$upd = $pdo->prepare('UPDATE cv_sections SET position = ? WHERE section = ?');
		$upd->execute([(int)$other['position'], $section]);
		$upd->execute([$pos, (string)$other['section']]);
		$pdo->commit();
	} catch (Throwable $e) {
		$pdo->rollBack();
		json_out(false, ['error' => 'Erreur déplacement'], 500);
	}

	json_out(true);
}

// ============ POST delete ============
if ($method === 'POST' && $action === 'delete') {
	$section = trim((string)($body['section'] ?? ''));
	if ($section === '') json_out(false, ['error' => 'section requise'], 400);

	$stmt = $pdo->prepare('DELETE FROM cv_sections WHERE section = ?');
	$stmt->execute([$section]);

	json_out(true);
}

// ============ DELETE (suppression définitive) ============
if ($method === 'DELETE') {
	$section = trim((string)($body['section'] ?? ''));
	if ($section === '') json_out(false, ['error' => 'section requise'], 400);

	$stmt = $pdo->prepare('DELETE FROM cv_sections WHERE section = ?');
	$stmt->execute([$section]);

	json_out(true);
}

json_out(false, ['error' => 'Action non supportée'], 405);