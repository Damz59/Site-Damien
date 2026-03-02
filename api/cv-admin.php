<?php
// cv-admin.php
declare(strict_types=1);

// --------------------
// CORS DEV (Vite)
// --------------------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
	'http://localhost:5173',
];

if (in_array($origin, $allowedOrigins, true)) {
	header("Access-Control-Allow-Origin: $origin");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Methods: GET,POST,DELETE,OPTIONS");
}

// Préflight (ne doit PAS passer par l'auth)
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
	http_response_code(204);
	exit();
}

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db.php';

function requireAuth(int $timeoutSeconds = 300): void
{
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

	if (empty($_SESSION['logged_in'])) {
		http_response_code(401);
		echo json_encode(['success' => false, 'error' => 'Non authentifié']);
		exit();
	}

	if (isset($_SESSION['last_activity']) && (time() - (int)$_SESSION['last_activity']) > $timeoutSeconds) {
		session_unset();
		session_destroy();
		http_response_code(401);
		echo json_encode(['success' => false, 'error' => 'Session expirée (inactivité)']);
		exit();
	}

	$_SESSION['last_activity'] = time();
}

function requireAdmin(): void
{
	$role = (string)($_SESSION['role'] ?? '');
	if ($role !== 'admin') {
		http_response_code(403);
		echo json_encode(['success' => false, 'error' => 'Accès admin requis']);
		exit();
	}
}

try {
	requireAuth(300);
	requireAdmin();

	$pdo = getPDO();
	$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

	// -----------------------
	// GET ?section=...
	// -----------------------
	if ($method === 'GET') {
		$section = trim((string)($_GET['section'] ?? ''));
		if ($section === '') {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'Paramètre section manquant']);
			exit();
		}

		// ✅ état section (par défaut active si non présente / table absente)
		$sectionActive = 1;
		try {
			$chk = $pdo->prepare("SELECT active FROM cv_sections WHERE section = ? LIMIT 1");
			$chk->execute([$section]);
			$row = $chk->fetch(PDO::FETCH_ASSOC);
			if ($row && isset($row['active'])) {
				$sectionActive = (int)$row['active'];
			}
		} catch (Throwable $e) {
			// Si la table n'existe pas encore, on reste sur "active" par défaut.
			$sectionActive = 1;
		}

		$stmt = $pdo->prepare(
			"SELECT id, section, text, description, position, active
			 FROM cv_items
			 WHERE section = ?
			 ORDER BY position ASC, id ASC"
		);
		$stmt->execute([$section]);
		$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode([
			'success' => true,
			'sectionActive' => $sectionActive,
			'items' => $items
		]);
		exit();
	}

	// JSON body pour POST/DELETE
	$raw = file_get_contents('php://input');
	$data = json_decode($raw ?: '[]', true);
	if (!is_array($data)) $data = [];

	// -----------------------
	// POST
	//  - add: { section, text, description? }
	//  - reorder: { action:"reorder", section, orderedIds:[...] }
	//  - toggle: { action:"toggle", id, active }
	//  - update: { action:"update", id, text, description? }
	//  - move: { action:"move", id, dir:"up"|"down" }
	//  - toggleSection: { action:"toggleSection", section, active }
	// -----------------------
	if ($method === 'POST') {
		$action = (string)($data['action'] ?? '');

		// ✅ Toggle section active
		if ($action === 'toggleSection') {
			$section = trim((string)($data['section'] ?? ''));
			$active = (int)($data['active'] ?? 0);

			if ($section === '' || ($active !== 0 && $active !== 1)) {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Données toggleSection invalides']);
				exit();
			}

			$stmt = $pdo->prepare(
				"INSERT INTO cv_sections (section, active)
				 VALUES (?, ?)
				 ON DUPLICATE KEY UPDATE active = VALUES(active)"
			);
			$stmt->execute([$section, $active]);

			echo json_encode(['success' => true]);
			exit();
		}

		// Reorder
		if ($action === 'reorder') {
			$section = trim((string)($data['section'] ?? ''));
			$orderedIds = $data['orderedIds'] ?? null;

			if ($section === '' || !is_array($orderedIds) || count($orderedIds) === 0) {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Données reorder invalides']);
				exit();
			}

			$pdo->beginTransaction();
			$upd = $pdo->prepare("UPDATE cv_items SET position = ? WHERE id = ? AND section = ?");

			$pos = 1;
			foreach ($orderedIds as $id) {
				$id = (int)$id;
				$upd->execute([$pos, $id, $section]);
				$pos++;
			}

			$pdo->commit();
			echo json_encode(['success' => true]);
			exit();
		}

		// Toggle item active
		if ($action === 'toggle') {
			$id = (int)($data['id'] ?? 0);
			$active = (int)($data['active'] ?? 0);

			if ($id <= 0 || ($active !== 0 && $active !== 1)) {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Données toggle invalides']);
				exit();
			}

			$stmt = $pdo->prepare("UPDATE cv_items SET active = ? WHERE id = ?");
			$stmt->execute([$active, $id]);

			echo json_encode(['success' => true]);
			exit();
		}

		// Update text + description
		if ($action === 'update') {
			$id = (int)($data['id'] ?? 0);
			$text = trim((string)($data['text'] ?? ''));
			$description = trim((string)($data['description'] ?? ''));

			if ($id <= 0 || $text === '') {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Données update invalides']);
				exit();
			}

			$stmt = $pdo->prepare("UPDATE cv_items SET text = ?, description = ? WHERE id = ?");
			$stmt->execute([
				$text,
				$description !== '' ? $description : null,
				$id
			]);

			echo json_encode(['success' => true]);
			exit();
		}

		// Move up/down (swap positions)
		if ($action === 'move') {
			$id = (int)($data['id'] ?? 0);
			$dir = (string)($data['dir'] ?? ''); // "up" | "down"

			if ($id <= 0 || ($dir !== 'up' && $dir !== 'down')) {
				http_response_code(400);
				echo json_encode(['success' => false, 'error' => 'Données move invalides']);
				exit();
			}

			$stmt = $pdo->prepare("SELECT id, section, position FROM cv_items WHERE id = ?");
			$stmt->execute([$id]);
			$current = $stmt->fetch(PDO::FETCH_ASSOC);

			if (!$current) {
				http_response_code(404);
				echo json_encode(['success' => false, 'error' => 'Item introuvable']);
				exit();
			}

			$section = (string)$current['section'];
			$pos = (int)$current['position'];

			if ($dir === 'up') {
				$neighborStmt = $pdo->prepare(
					"SELECT id, position FROM cv_items
					 WHERE section = ? AND position < ?
					 ORDER BY position DESC, id DESC
					 LIMIT 1"
				);
				$neighborStmt->execute([$section, $pos]);
			} else {
				$neighborStmt = $pdo->prepare(
					"SELECT id, position FROM cv_items
					 WHERE section = ? AND position > ?
					 ORDER BY position ASC, id ASC
					 LIMIT 1"
				);
				$neighborStmt->execute([$section, $pos]);
			}

			$neighbor = $neighborStmt->fetch(PDO::FETCH_ASSOC);
			if (!$neighbor) {
				echo json_encode(['success' => true]);
				exit();
			}

			$neighborId = (int)$neighbor['id'];
			$neighborPos = (int)$neighbor['position'];

			$pdo->beginTransaction();
			$u = $pdo->prepare("UPDATE cv_items SET position = ? WHERE id = ?");
			$u->execute([$neighborPos, $id]);
			$u->execute([$pos, $neighborId]);
			$pdo->commit();

			echo json_encode(['success' => true]);
			exit();
		}

		// Add item (default) + description
		$section = trim((string)($data['section'] ?? ''));
		$text = trim((string)($data['text'] ?? ''));
		$description = trim((string)($data['description'] ?? ''));

		if ($section === '' || $text === '') {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'Section ou texte manquant']);
			exit();
		}

		$stmt = $pdo->prepare("SELECT COALESCE(MAX(position), 0) AS maxpos FROM cv_items WHERE section = ?");
		$stmt->execute([$section]);
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		$maxpos = (int)($row['maxpos'] ?? 0);

		$ins = $pdo->prepare(
			"INSERT INTO cv_items (section, text, description, position, active)
			 VALUES (?, ?, ?, ?, 1)"
		);
		$ins->execute([
			$section,
			$text,
			$description !== '' ? $description : null,
			$maxpos + 1
		]);

		echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
		exit();
	}

	// -----------------------
	// DELETE { id }
	// -----------------------
	if ($method === 'DELETE') {
		$id = (int)($data['id'] ?? 0);
		if ($id <= 0) {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'ID manquant']);
			exit();
		}

		$stmt = $pdo->prepare("DELETE FROM cv_items WHERE id = ?");
		$stmt->execute([$id]);

		echo json_encode(['success' => true]);
		exit();
	}

	http_response_code(405);
	echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
	exit();
} catch (Throwable $e) {
	error_log("cv-admin.php error: " . $e->getMessage());
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
	exit();
}