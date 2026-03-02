<?php
    // auth.php
    declare(strict_types=1);

    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    function requireAuth(int $timeoutSeconds = 300): void
    {
        header('Content-Type: application/json; charset=utf-8');

        if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Non authentifié']);
            exit();
        }

        if (isset($_SESSION['last_activity']) && (time() - (int)$_SESSION['last_activity']) > $timeoutSeconds) {
            session_unset();
            session_destroy();

            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();

                // PHP 7.3+ (recommandé)
                setcookie(session_name(), '', [
                    'expires' => time() - 42000,
                    'path' => $params['path'] ?? '/',
                    'domain' => $params['domain'] ?? '',
                    'secure' => (bool)($params['secure'] ?? true),
                    'httponly' => (bool)($params['httponly'] ?? true),
                    'samesite' => 'Lax',
                ]);
            }

            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Session expirée (inactivité)']);
            exit();
        }

        $_SESSION['last_activity'] = time();
    }

    /**
     * Pour l’instant: moderator = user
     */
    function hasRole(string $required): bool
    {
        $role = (string)($_SESSION['role'] ?? '');

        if ($role === 'moderator') {
            $role = 'user';
        }

        if ($required === 'user') {
            return in_array($role, ['user', 'admin'], true);
        }

        if ($required === 'admin') {
            return $role === 'admin';
        }

        return false;
    }

    function requireRole(string $required): void
    {
        header('Content-Type: application/json; charset=utf-8');

        if (!hasRole($required)) {
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'Permissions insuffisantes']);
            exit();
        }
    }