<?php
// check-auth.php
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

// Session (cookie params avant session_start)
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

// Autoriser uniquement GET
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
	http_response_code(405);
	echo json_encode([
		'authenticated' => false,
		'error' => 'Méthode non autorisée',
	]);
	exit();
}

// Timeout d'inactivité : 5 minutes
$timeout = 300;

// Pas connecté
if (empty($_SESSION['logged_in'])) {
	http_response_code(401);
	echo json_encode(['authenticated' => false]);
	exit();
}

// Expiration par inactivité
if (isset($_SESSION['last_activity']) && (time() - (int)$_SESSION['last_activity']) > $timeout) {
	session_unset();
	session_destroy();
	http_response_code(401);
	echo json_encode([
		'authenticated' => false,
		'error' => 'Session expirée (inactivité)',
	]);
	exit();
}

// Mise à jour du timestamp à chaque appel
$_SESSION['last_activity'] = time();

// OK : renvoyer les infos
echo json_encode([
	'authenticated' => true,
	'user' => [
		'id' => $_SESSION['user_id'] ?? null,
		'username' => $_SESSION['username'] ?? null,
		'email' => $_SESSION['email'] ?? null,
		'role' => $_SESSION['role'] ?? null,
		'prenom' => (string)($_SESSION['prenom'] ?? ''),
		'nom' => (string)($_SESSION['nom'] ?? ''),
	],
]);
exit();