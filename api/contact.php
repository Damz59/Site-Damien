<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://damienvdh59250.duckdns.org');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gestion de la requête OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
    exit();
}

// Configuration de la base de données
$host = 'localhost';
$dbname = 'site_db';
$username = 'damien';
$password = 'votre_mot_de_passe'; // Remplacer par le vrai mot de passe

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur de connexion à la base de données']);
    exit();
}

// Récupérer les données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validation des données
if (!isset($data['nom']) || !isset($data['prenom']) || !isset($data['email']) || 
    !isset($data['sujet']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Données manquantes']);
    exit();
}

// Validation de l'email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email invalide']);
    exit();
}

// Nettoyage des données
$nom = trim(htmlspecialchars($data['nom']));
$prenom = trim(htmlspecialchars($data['prenom']));
$email = trim($data['email']);
$sujet = trim(htmlspecialchars($data['sujet']));
$message = trim(htmlspecialchars($data['message']));

// Insertion dans la base de données
try {
    $stmt = $pdo->prepare('INSERT INTO messages (nom, prenom, email, sujet, message) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$nom, $prenom, $email, $sujet, $message]);
    
    http_response_code(201);
    echo json_encode([
        'success' => true, 
        'message' => 'Message envoyé avec succès',
        'id' => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'enregistrement du message']);
}
?>