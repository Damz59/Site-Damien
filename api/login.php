<?php
// login.php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
	$https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

	session_set_cookie_params([
		'lifetime' => 0,
		'path' => '/',
		'samesite' => 'Lax',
		'secure' => $https, // ✅ true en prod HTTPS, false en dev HTTP
		'httponly' => true,
	]);

	session_start();
}

require_once __DIR__ . '/cors.php';
header('Content-Type: application/json; charset=utf-8');

// Préflight
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
	http_response_code(200);
	exit();
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	http_response_code(405);
	echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
	exit();
}

require_once __DIR__ . '/db.php';

try {
	$pdo = getPDO();
} catch (Throwable $e) {
	error_log("login.php DB connect error: " . $e->getMessage());
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données']);
	exit();
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
	http_response_code(400);
	echo json_encode(['success' => false, 'error' => 'JSON invalide']);
	exit();
}

$inputUsername = trim((string)($data['username'] ?? ''));
$inputPassword = (string)($data['password'] ?? '');

if ($inputUsername === '' || $inputPassword === '') {
	http_response_code(400);
	echo json_encode(['success' => false, 'error' => 'Données manquantes']);
	exit();
}

try {
	$stmt = $pdo->prepare(
		'SELECT id, username, email, prenom, nom, password, role, active
		 FROM users
		 WHERE username = ? OR email = ?
		 LIMIT 1'
	);

	$stmt->execute([$inputUsername, $inputUsername]);
	$user = $stmt->fetch(PDO::FETCH_ASSOC);

	if (!$user) {
		http_response_code(401);
		echo json_encode(['success' => false, 'error' => 'Identifiants incorrects']);
		exit();
	}

	if ((int)($user['active'] ?? 0) !== 1) {
		http_response_code(403);
		echo json_encode(['success' => false, 'error' => 'Compte désactivé']);
		exit();
	}

	if (!password_verify($inputPassword, (string)($user['password'] ?? ''))) {
		http_response_code(401);
		echo json_encode(['success' => false, 'error' => 'Identifiants incorrects']);
		exit();
	}

	// Sécurité : régénérer l’ID de session après login
	session_regenerate_id(true);

	$_SESSION['logged_in'] = true;
	$_SESSION['user_id'] = (int)$user['id'];
	$_SESSION['username'] = (string)$user['username'];
	$_SESSION['email'] = (string)$user['email'];
	$_SESSION['role'] = (string)$user['role']; // admin | moderator | user
	$_SESSION['prenom'] = (string)($user['prenom'] ?? '');
	$_SESSION['nom'] = (string)($user['nom'] ?? '');
	$_SESSION['last_activity'] = time();

	echo json_encode([
		'success' => true,
		'message' => 'Connexion réussie',
		'user' => [
			'id' => (int)$user['id'],
			'username' => (string)$user['username'],
			'email' => (string)$user['email'],
			'role' => (string)$user['role'],
			'prenom' => (string)($user['prenom'] ?? ''),
			'nom' => (string)($user['nom'] ?? ''),
		],
	]);
	exit();

} catch (PDOException $e) {
	error_log("login.php PDO error: " . $e->getMessage());
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur lors de la vérification']);
	exit();
} catch (Throwable $e) {
	error_log("login.php error: " . $e->getMessage());
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Erreur serveur']);
	exit();
}