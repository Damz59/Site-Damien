<?php
// coursEtTutos-categories-admin.php
declare(strict_types=1);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

// Session
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

// Admin only
if (empty($_SESSION['logged_in']) || (string)($_SESSION['role'] ?? '') !== 'admin') {
	http_response_code(401);
	echo json_encode(['success' => false, 'error' => 'Non autorisé']);
	exit;
}

function readJsonBody(): array
{
	$raw = file_get_contents('php://input') ?: '';
	$data = json_decode($raw, true);
	return is_array($data) ? $data : [];
}

$pdo = getPDO();
$table = 'cours_et_tutos_categories';

try {
	$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

	// GET : list
	if ($method === 'GET') {
		$stmt = $pdo->query("SELECT id, name, position, active, created_at, updated_at
			FROM $table
			ORDER BY position ASC, name ASC");
		echo json_encode(['success' => true, 'categories' => $stmt->fetchAll()]);
		exit;
	}

	// POST : create
	if ($method === 'POST') {
		$body = readJsonBody();
		$name = trim((string)($body['name'] ?? ''));

		if ($name === '') {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'Nom requis']);
			exit;
		}

		$maxPosRow = $pdo->query("SELECT COALESCE(MAX(position), 0) AS m FROM $table")->fetch();
		$pos = ((int)$maxPosRow['m']) + 1;

		$stmt = $pdo->prepare("INSERT INTO $table (name, position, active) VALUES (?, ?, 1)");
		$stmt->execute([$name, $pos]);

		echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
		exit;
	}

	// PUT : update OR move (swap + reindex)
	if ($method === 'PUT') {
		$body = readJsonBody();
		$id = (int)($body['id'] ?? 0);

		if ($id <= 0) {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'ID invalide']);
			exit;
		}

		// ✅ MOVE : swap with neighbor + reindex 1..N
		if (($body['action'] ?? '') === 'move') {
			$direction = (string)($body['direction'] ?? '');
			if (!in_array($direction, ['up', 'down'], true)) {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Direction invalide']);
				exit;
			}

			$pdo->beginTransaction();

			// current row (lock)
			$stmt = $pdo->prepare("SELECT id, position FROM $table WHERE id = ? FOR UPDATE");
			$stmt->execute([$id]);
			$current = $stmt->fetch();

			if (!$current) {
				$pdo->rollBack();
				http_response_code(404);
				echo json_encode(['success' => false, 'error' => 'Catégorie introuvable']);
				exit;
			}

			$pos = (int)$current['position'];

			// neighbor row (lock)
			if ($direction === 'up') {
				$stmt = $pdo->prepare("
					SELECT id, position
					FROM $table
					WHERE position < ?
					ORDER BY position DESC
					LIMIT 1
					FOR UPDATE
				");
				$stmt->execute([$pos]);
			} else {
				$stmt = $pdo->prepare("
					SELECT id, position
					FROM $table
					WHERE position > ?
					ORDER BY position ASC
					LIMIT 1
					FOR UPDATE
				");
				$stmt->execute([$pos]);
			}

			$neighbor = $stmt->fetch();
			if (!$neighbor) {
				$pdo->commit();
				echo json_encode(['success' => true, 'moved' => false]);
				exit;
			}

			$nid = (int)$neighbor['id'];
			$npos = (int)$neighbor['position'];

			// swap positions
			$u = $pdo->prepare("UPDATE $table SET position = ? WHERE id = ?");
			$u->execute([$npos, $id]);
			$u->execute([$pos, $nid]);

			// reindex 1..N
			$rows = $pdo->query("SELECT id FROM $table ORDER BY position ASC, name ASC")->fetchAll();
			$i = 1;
			$u2 = $pdo->prepare("UPDATE $table SET position = ? WHERE id = ?");
			foreach ($rows as $r) {
				$u2->execute([$i, (int)$r['id']]);
				$i++;
			}

			$pdo->commit();
			echo json_encode(['success' => true, 'moved' => true]);
			exit;
		}

		// ✅ Update simple (rename / active / position si besoin)
		$fields = [];
		$params = [];

		if (array_key_exists('name', $body)) {
			$name = trim((string)$body['name']);
			if ($name === '') {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Nom invalide']);
				exit;
			}
			$fields[] = "name = ?";
			$params[] = $name;
		}

		if (array_key_exists('position', $body)) {
			$fields[] = "position = ?";
			$params[] = (int)$body['position'];
		}

		if (array_key_exists('active', $body)) {
			$fields[] = "active = ?";
			$params[] = ((int)$body['active'] ? 1 : 0);
		}

		if (!$fields) {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'Aucun champ à modifier']);
			exit;
		}

		$params[] = $id;
		$sql = "UPDATE $table SET " . implode(', ', $fields) . " WHERE id = ?";
		$stmt = $pdo->prepare($sql);
		$stmt->execute($params);

		echo json_encode(['success' => true]);
		exit;
	}

	// DELETE : delete
	if ($method === 'DELETE') {
		$body = readJsonBody();
		$id = (int)($body['id'] ?? 0);

		if ($id <= 0) {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'ID invalide']);
			exit;
		}

		$stmt = $pdo->prepare("DELETE FROM $table WHERE id = ?");
		$stmt->execute([$id]);

		echo json_encode(['success' => true]);
		exit;
	}

	http_response_code(405);
	echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
} catch (PDOException $e) {
	$msg = $e->getMessage();
	if (stripos($msg, 'Duplicate') !== false) {
		http_response_code(409);
		echo json_encode(['success' => false, 'error' => 'Cette catégorie existe déjà']);
		exit;
	}
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
}