<?php
    // users-admin.php
    declare(strict_types=1);

    if (session_status() === PHP_SESSION_NONE) {
        // ✅ prod HTTPS
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'samesite' => 'Lax',
            'secure' => true,
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

    require_once __DIR__ . '/auth.php';
    requireAuth(300);
    requireRole('admin');

    require_once __DIR__ . '/db.php';

    function respond(int $status, array $payload): void
    {
        http_response_code($status);
        echo json_encode($payload);
        exit();
    }

    try {
        $pdo = getPDO();
    } catch (Throwable $e) {
        respond(500, ['success' => false, 'error' => 'Erreur de connexion à la base de données']);
    }

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    switch ($method) {
        case 'GET': {
            $stmt = $pdo->query(
                'SELECT id, username, email, prenom, nom, role, active, created_at, updated_at
                FROM users
                ORDER BY created_at DESC'
            );
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            respond(200, ['success' => true, 'users' => $users]);
        }

        case 'POST': {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!is_array($data)) {
                respond(400, ['success' => false, 'error' => 'JSON invalide']);
            }

            $username = trim((string)($data['username'] ?? ''));
            $email = trim((string)($data['email'] ?? ''));
            $password = (string)($data['password'] ?? '');
            $prenom = trim((string)($data['prenom'] ?? ''));
            $nom = trim((string)($data['nom'] ?? ''));
            $roleIn = (string)($data['role'] ?? 'user'); // admin|moderator|user
            $active = array_key_exists('active', $data) ? (int)((bool)$data['active']) : 1;

            if ($username === '' || $email === '' || $password === '') {
                respond(400, ['success' => false, 'error' => 'Données manquantes']);
            }

            $allowedRoles = ['admin', 'moderator', 'user'];
            if (!in_array($roleIn, $allowedRoles, true)) {
                respond(400, ['success' => false, 'error' => 'Rôle invalide']);
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            try {
                $stmt = $pdo->prepare(
                    'INSERT INTO users (username, email, prenom, nom, password, role, active)
                    VALUES (?, ?, ?, ?, ?, ?, ?)'
                );
                $stmt->execute([$username, $email, $prenom, $nom, $hashedPassword, $roleIn, $active]);
                respond(201, ['success' => true, 'id' => (int)$pdo->lastInsertId()]);
            } catch (PDOException $e) {
                respond(400, ['success' => false, 'error' => 'Utilisateur ou email déjà existant']);
            }
        }

        case 'PUT': {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!is_array($data)) {
                respond(400, ['success' => false, 'error' => 'JSON invalide']);
            }

            $id = (int)($data['id'] ?? 0);
            if ($id <= 0) {
                respond(400, ['success' => false, 'error' => 'ID manquant ou invalide']);
            }

            $updates = [];
            $params = [];

            if (array_key_exists('username', $data)) {
                $updates[] = 'username = ?';
                $params[] = trim((string)$data['username']);
            }
            if (array_key_exists('email', $data)) {
                $updates[] = 'email = ?';
                $params[] = trim((string)$data['email']);
            }
            if (array_key_exists('prenom', $data)) {
                $updates[] = 'prenom = ?';
                $params[] = trim((string)$data['prenom']);
            }
            if (array_key_exists('nom', $data)) {
                $updates[] = 'nom = ?';
                $params[] = trim((string)$data['nom']);
            }
            if (array_key_exists('password', $data) && (string)$data['password'] !== '') {
                $updates[] = 'password = ?';
                $params[] = password_hash((string)$data['password'], PASSWORD_DEFAULT);
            }
            if (array_key_exists('role', $data)) {
                $roleIn = (string)$data['role'];
                $allowedRoles = ['admin', 'moderator', 'user'];
                if (!in_array($roleIn, $allowedRoles, true)) {
                    respond(400, ['success' => false, 'error' => 'Rôle invalide']);
                }
                $updates[] = 'role = ?';
                $params[] = $roleIn;
            }
            if (array_key_exists('active', $data)) {
                $updates[] = 'active = ?';
                $params[] = (int)((bool)$data['active']);
            }

            if (empty($updates)) {
                respond(400, ['success' => false, 'error' => 'Aucune donnée à modifier']);
            }

            $params[] = $id;

            try {
                $sql = 'UPDATE users SET ' . implode(', ', $updates) . ' WHERE id = ?';
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
                respond(200, ['success' => true]);
            } catch (PDOException $e) {
                respond(400, ['success' => false, 'error' => 'Erreur lors de la modification']);
            }
        }

        case 'DELETE': {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!is_array($data)) {
                respond(400, ['success' => false, 'error' => 'JSON invalide']);
            }

            $id = (int)($data['id'] ?? 0);
            if ($id <= 0) {
                respond(400, ['success' => false, 'error' => 'ID manquant ou invalide']);
            }

            // Empêcher de supprimer son propre compte
            $myId = (int)($_SESSION['user_id'] ?? 0);
            if ($myId > 0 && $id === $myId) {
                respond(400, ['success' => false, 'error' => 'Impossible de supprimer votre propre compte']);
            }

            try {
                $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
                $stmt->execute([$id]);
                respond(200, ['success' => true]);
            } catch (PDOException $e) {
                respond(400, ['success' => false, 'error' => 'Erreur lors de la suppression']);
            }
        }

        default:
            respond(405, ['success' => false, 'error' => 'Méthode non autorisée']);
}