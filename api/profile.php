<?php
	// profile.php
	declare(strict_types=1);

	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	require_once __DIR__ . '/cors.php';
	header('Content-Type: application/json; charset=utf-8');

	// Préflight
	if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
		http_response_code(200);
		exit();
	}

	if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
		http_response_code(405);
		echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
		exit();
	}

	require_once __DIR__ . '/auth.php';
	requireAuth(300);

	echo json_encode([
		'success' => true,
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