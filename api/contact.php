<?php
	// contact.php
	declare(strict_types=1);

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
		http_response_code(500);
		echo json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données']);
		exit();
	}

	// Read JSON
	$data = json_decode(file_get_contents('php://input'), true);
	if (!is_array($data)) {
		http_response_code(400);
		echo json_encode(['success' => false, 'error' => 'JSON invalide']);
		exit();
	}

	// Required fields
	$required = ['nom', 'prenom', 'email', 'sujet', 'message'];
	foreach ($required as $field) {
		if (empty($data[$field])) {
			http_response_code(400);
			echo json_encode(['success' => false, 'error' => 'Données manquantes']);
			exit();
		}
	}

	// Validate email
	$email = trim((string)($data['email'] ?? ''));
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		http_response_code(400);
		echo json_encode(['success' => false, 'error' => 'Email invalide']);
		exit();
	}

	// Sanitize (light) + limits
	$nom = trim((string)$data['nom']);
	$prenom = trim((string)$data['prenom']);
	$sujet = trim((string)$data['sujet']);
	$message = trim((string)$data['message']);

	if (mb_strlen($nom) > 100 || mb_strlen($prenom) > 100 || mb_strlen($sujet) > 150) {
		http_response_code(400);
		echo json_encode(['success' => false, 'error' => 'Champs trop longs']);
		exit();
	}

	if (mb_strlen($message) > 5000) {
		http_response_code(400);
		echo json_encode(['success' => false, 'error' => 'Message trop long']);
		exit();
	}

	// Insert
	try {
		$stmt = $pdo->prepare(
			'INSERT INTO messages (nom, prenom, email, sujet, message) VALUES (?, ?, ?, ?, ?)'
		);
		$stmt->execute([$nom, $prenom, $email, $sujet, $message]);

		// Notification email (optionnel)
		$to = 'damienvdh59@gmail.com';
		$subject = 'Nouveau message - Formulaire de contact';
		$body =
			"Nouveau message reçu depuis le site :\n\n" .
			"Prénom : {$prenom}\n" .
			"Nom : {$nom}\n" .
			"Email : {$email}\n" .
			"Sujet : {$sujet}\n\n" .
			"Message :\n{$message}\n";

		$headers = [
			'From: noreply@damienvdh59250.duckdns.org',
			'Reply-To: ' . $email,
			'MIME-Version: 1.0',
			'Content-Type: text/plain; charset=UTF-8',
		];

		$mailSent = @mail($to, $subject, $body, implode("\r\n", $headers));

		http_response_code(201);
		echo json_encode([
			'success' => true,
			'message' => 'Message envoyé avec succès',
			'id' => (int)$pdo->lastInsertId(),
			'mailSent' => $mailSent,
		]);
		exit();

	} catch (PDOException $e) {
		http_response_code(500);
		echo json_encode(['success' => false, 'error' => "Erreur lors de l'enregistrement du message"]);
		exit();
	}