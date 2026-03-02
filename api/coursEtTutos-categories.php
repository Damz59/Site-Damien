<?php
// coursEtTutos-categories.php
declare(strict_types=1);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

// --------------------
// Session + Auth (minimum connecté)
// Aligné sur ton check-auth.php
// --------------------
if (session_status() === PHP_SESSION_NONE) {
	$https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
	session_set_cookie_params([
		'lifetime' => 0,
		'path' => '/',
		'samesite' => 'Lax',
		'secure' => $https, // true en prod HTTPS, false en dev HTTP
		'httponly' => true,
	]);
	session_start();
}

// Timeout d'inactivité : 5 minutes
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

// Mise à jour timestamp
$_SESSION['last_activity'] = time();

try {
	$pdo = getPDO();

	$catTable = 'cours_et_tutos_categories';
	$itemTable = 'cours_et_tutos_items';

	// 1) Catégories actives
	$stmt = $pdo->query("
		SELECT id, name, position
		FROM {$catTable}
		WHERE active = 1
		ORDER BY position ASC, name ASC
	");
	$categories = $stmt->fetchAll();

	// 2) Items actifs (✅ inclut image_url)
	$stmt = $pdo->query("
		SELECT id, category_id, title, slug, position, active, short_desc, image_url
		FROM {$itemTable}
		WHERE active = 1
		ORDER BY category_id ASC, position ASC, title ASC
	");
	$items = $stmt->fetchAll();

	// 3) Grouper les items par catégorie
	$itemsByCategory = [];
	foreach ($items as $it) {
		$cid = (int)$it['category_id'];
		if (!isset($itemsByCategory[$cid])) $itemsByCategory[$cid] = [];
		$itemsByCategory[$cid][] = $it;
	}

	// 4) Injecter items dans chaque catégorie
	foreach ($categories as &$c) {
		$cid = (int)$c['id'];
		$c['items'] = $itemsByCategory[$cid] ?? [];
	}
	unset($c);

	echo json_encode([
		'success' => true,
		'categories' => $categories,
	], JSON_UNESCAPED_UNICODE);
	exit;
} catch (PDOException $e) {
	http_response_code(500);
	echo json_encode([
		'success' => false,
		'error' => 'Erreur serveur',
	], JSON_UNESCAPED_UNICODE);
	exit;
}