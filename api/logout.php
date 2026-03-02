<?php
	// logout.php
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

	session_unset();
	session_destroy();

	if (ini_get("session.use_cookies")) {
		$params = session_get_cookie_params();
		setcookie(session_name(), '', [
			'expires' => time() - 42000,
			'path' => $params['path'] ?? '/',
			'domain' => $params['domain'] ?? '',
			'secure' => (bool)($params['secure'] ?? false),
			'httponly' => (bool)($params['httponly'] ?? true),
			'samesite' => 'Lax',
		]);
	}

	echo json_encode(['success' => true]);
	exit();