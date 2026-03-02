<?php
    // register.php
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

    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'JSON invalide']);
        exit();
    }

    $prenom = trim((string)($data['prenom'] ?? ''));
    $nom = trim((string)($data['nom'] ?? ''));
    $email = strtolower(trim((string)($data['email'] ?? '')));
    $password = (string)($data['password'] ?? '');
    $confirmPassword = (string)($data['confirmPassword'] ?? '');
    $username = trim((string)($data['username'] ?? ''));

    if ($email === '' || $password === '' || $confirmPassword === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Données manquantes']);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email invalide']);
        exit();
    }

    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Mot de passe trop court (min 6 caractères)']);
        exit();
    }

    if ($password !== $confirmPassword) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Les mots de passe ne correspondent pas']);
        exit();
    }

    // Limites simples (anti-abus)
    if (mb_strlen($prenom) > 100 || mb_strlen($nom) > 100 || mb_strlen($email) > 190) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Champs trop longs']);
        exit();
    }

    if ($username !== '' && mb_strlen($username) > 50) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Pseudo trop long']);
        exit();
    }

    /** username auto si pas fourni */
    if ($username === '') {
        $base = explode('@', $email)[0] ?? 'user';
        $base = preg_replace('/[^a-zA-Z0-9._-]/', '', $base);
        $username = $base !== '' ? $base : 'user';
    }

    // Email unique
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'error' => 'Email déjà utilisé']);
        exit();
    }

    // Username unique (ajoute suffixe si besoin)
    $checkUser = $pdo->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
    $candidate = $username;
    $i = 0;

    while (true) {
        $checkUser->execute([$candidate]);
        if (!$checkUser->fetch()) break;

        $i++;
        $candidate = $username . $i;

        if ($i > 50) {
            http_response_code(409);
            echo json_encode(['success' => false, 'error' => 'Impossible de générer un pseudo unique']);
            exit();
        }
    }

    $username = $candidate;

    $hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare(
            'INSERT INTO users (username, email, prenom, nom, password, role, active)
            VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$username, $email, $prenom, $nom, $hash, 'user', 1]);

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Compte créé',
            'user' => [
                'id' => (int)$pdo->lastInsertId(),
                'username' => $username,
                'email' => $email,
                'prenom' => $prenom,
                'nom' => $nom,
                'role' => 'user',
            ],
        ]);
        exit();

    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur lors de la création du compte']);
        exit();
    }