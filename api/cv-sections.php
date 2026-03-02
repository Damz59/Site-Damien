<?php
// cv-sections.php (PUBLIC - lecture seule)
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
	$pdo = getPDO();

	// Sections actives, triées
	$stmt = $pdo->query("
		SELECT section, label, position
		FROM cv_sections
		WHERE active = 1
		ORDER BY position ASC, section ASC
	");

	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

	// Fallback : si label est NULL, on affiche la clé
	$sections = array_map(function ($r) {
		$section = (string)($r['section'] ?? '');
		$label = $r['label'] ?? null;
		$label = is_string($label) && trim($label) !== '' ? trim($label) : $section;

		return [
			'section' => $section,
			'label' => $label,
			'position' => (int)($r['position'] ?? 0),
		];
	}, $rows);

	echo json_encode(['success' => true, 'sections' => $sections]);
	exit();
} catch (Throwable $e) {
	error_log('cv-sections.php error: ' . $e->getMessage());
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
	exit();
}