<?php
// coursEtTutos-items-admin.php
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
$table = 'cours_et_tutos_items';

try {
	$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

	// GET : list
	if ($method === 'GET') {
		$stmt = $pdo->query("
			SELECT id, category_id, title, slug, position, active, short_desc, image_url, created_at, updated_at
			FROM $table
			ORDER BY category_id ASC, position ASC, title ASC
		");
		echo json_encode(['success' => true, 'items' => $stmt->fetchAll()]);
		exit;
	}

	// POST : create
	if ($method === 'POST') {
		$body = readJsonBody();

		$category_id = (int)($body['category_id'] ?? 0);
		$title = trim((string)($body['title'] ?? ''));
		$slug = trim((string)($body['slug'] ?? ''));
		$short_desc = trim((string)($body['short_desc'] ?? ''));
		$image_url = trim((string)($body['image_url'] ?? ''));

		if ($category_id <= 0 || $title === '' || $slug === '') {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'category_id, title et slug requis']);
			exit;
		}

		// position = max+1 dans la catégorie
		$maxPosStmt = $pdo->prepare("SELECT COALESCE(MAX(position), 0) AS m FROM $table WHERE category_id = ?");
		$maxPosStmt->execute([$category_id]);
		$maxPosRow = $maxPosStmt->fetch();
		$pos = ((int)($maxPosRow['m'] ?? 0)) + 1;

		$stmt = $pdo->prepare("
			INSERT INTO $table (category_id, title, slug, position, active, short_desc, image_url)
			VALUES (?, ?, ?, ?, 1, ?, ?)
		");
		$stmt->execute([$category_id, $title, $slug, $pos, $short_desc, ($image_url !== '' ? $image_url : null)]);

		echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
		exit;
	}

	// PUT : update OR move
	if ($method === 'PUT') {
		$body = readJsonBody();
		$id = (int)($body['id'] ?? 0);

		if ($id <= 0) {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'ID invalide']);
			exit;
		}

		// ✅ MOVE : swap avec voisin DANS LA MÊME catégorie + reindex
		if (($body['action'] ?? '') === 'move') {
			$direction = (string)($body['direction'] ?? '');
			if (!in_array($direction, ['up', 'down'], true)) {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Direction invalide']);
				exit;
			}

			$pdo->beginTransaction();

			// current row (lock)
			$stmt = $pdo->prepare("SELECT id, category_id, position FROM $table WHERE id = ? FOR UPDATE");
			$stmt->execute([$id]);
			$current = $stmt->fetch();

			if (!$current) {
				$pdo->rollBack();
				http_response_code(404);
				echo json_encode(['success' => false, 'error' => 'Item introuvable']);
				exit;
			}

			$categoryId = (int)$current['category_id'];
			$pos = (int)$current['position'];

			// neighbor row (lock)
			if ($direction === 'up') {
				$stmt = $pdo->prepare("
					SELECT id, position
					FROM $table
					WHERE category_id = ? AND position < ?
					ORDER BY position DESC
					LIMIT 1
					FOR UPDATE
				");
				$stmt->execute([$categoryId, $pos]);
			} else {
				$stmt = $pdo->prepare("
					SELECT id, position
					FROM $table
					WHERE category_id = ? AND position > ?
					ORDER BY position ASC
					LIMIT 1
					FOR UPDATE
				");
				$stmt->execute([$categoryId, $pos]);
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

			// reindex 1..N (uniquement dans la catégorie)
			$stmt = $pdo->prepare("SELECT id FROM $table WHERE category_id = ? ORDER BY position ASC, title ASC");
			$stmt->execute([$categoryId]);
			$rows = $stmt->fetchAll();

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

		// ✅ Update simple (title / slug / active / short_desc / image_url / category_id)
		$fields = [];
		$params = [];

		if (array_key_exists('title', $body)) {
			$title = trim((string)$body['title']);
			if ($title === '') {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Titre invalide']);
				exit;
			}
			$fields[] = "title = ?";
			$params[] = $title;
		}

		if (array_key_exists('slug', $body)) {
			$slug = trim((string)$body['slug']);
			if ($slug === '') {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Slug invalide']);
				exit;
			}
			$fields[] = "slug = ?";
			$params[] = $slug;
		}

		if (array_key_exists('short_desc', $body)) {
			$fields[] = "short_desc = ?";
			$params[] = trim((string)$body['short_desc']);
		}

		if (array_key_exists('image_url', $body)) {
			$image_url = trim((string)$body['image_url']);
			$fields[] = "image_url = ?";
			$params[] = ($image_url !== '' ? $image_url : null);
		}

		if (array_key_exists('active', $body)) {
			$fields[] = "active = ?";
			$params[] = ((int)$body['active'] ? 1 : 0);
		}

		if (array_key_exists('category_id', $body)) {
			$fields[] = "category_id = ?";
			$params[] = (int)$body['category_id'];
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

	// DELETE
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
		echo json_encode(['success' => false, 'error' => 'Slug déjà utilisé']);
		exit;
	}

	if ($pdo->inTransaction()) {
		$pdo->rollBack();
	}

	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
}