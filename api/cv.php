<?php
// cv.php (PUBLIC - lecture seule)
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
	header("Access-Control-Allow-Methods: GET,OPTIONS");
}

// Préflight
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
	http_response_code(204);
	exit();
}

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
	http_response_code(405);
	echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
	exit();
}

require_once __DIR__ . '/db.php';

try {
	$section = trim((string)($_GET['section'] ?? ''));

	if ($section === '') {
		http_response_code(400);
		echo json_encode(['success' => false, 'error' => 'Paramètre section manquant']);
		exit();
	}

	// ✅ Remplace la whitelist par une validation générique
	if (!preg_match('/^[a-z0-9_]+$/', $section)) {
		http_response_code(400);
		echo json_encode(['success' => false, 'error' => 'Section invalide']);
		exit();
	}

	$pdo = getPDO();

	// ✅ Vérifie si la section est active (par défaut: active)
	$sectionActive = 1;

	try {
		$chk = $pdo->prepare("SELECT active FROM cv_sections WHERE section = ? LIMIT 1");
		$chk->execute([$section]);
		$row = $chk->fetch(PDO::FETCH_ASSOC);

		if ($row && isset($row['active'])) {
			$sectionActive = (int)$row['active'];
		}
	} catch (Throwable $e) {
		// Si cv_sections n'existe pas encore, on laisse actif par défaut
		$sectionActive = 1;
	}

	// Si section inactive => renvoyer vide (mais success=true)
	if ($sectionActive !== 1) {
		echo json_encode(['success' => true, 'sectionActive' => 0, 'items' => []]);
		exit();
	}

	$stmt = $pdo->prepare(
		"SELECT id, section, text, description, position
		FROM cv_items
		WHERE section = ? AND active = 1
		ORDER BY position ASC, id ASC"
	);
	$stmt->execute([$section]);

	$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode(['success' => true, 'sectionActive' => 1, 'items' => $items]);
	exit();
} catch (Throwable $e) {
	error_log('cv.php error: ' . $e->getMessage());
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
	exit();
}