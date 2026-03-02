// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_Php_Fonctions.jsx

import { Alert, Card, ListGroup } from "react-bootstrap";

export default function Chapitre_Php_Fonctions({ authUser }) {
	return (
		<div>
			<Alert variant="info" className="mb-4">
				<strong>Objectif :</strong> créer des fonctions réutilisables (comme tes helpers
				<code> requireAuth()</code> et <code>requireRole()</code>).
			</Alert>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>1) Fonction simple</strong>
				</Card.Header>
				<Card.Body>
					<pre className="mb-0">
{`<?php
function add(int $a, int $b): int {
  return $a + $b;
}

echo add(2, 3); // 5
`}
					</pre>
				</Card.Body>
			</Card>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>2) Exemple “respond” (pattern API)</strong>
				</Card.Header>
				<Card.Body>
					<pre className="mb-0">
{`<?php
function respond(int $status, array $payload): void {
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit();
}

respond(200, ["success" => true]);
`}
					</pre>
				</Card.Body>
			</Card>

			<Card className="shadow-sm">
				<Card.Header className="bg-primary text-white">
					<strong>3) Notes projet</strong>
				</Card.Header>
				<Card.Body>
					<ListGroup variant="flush">
						<ListGroup.Item className="px-0">
							Un fichier comme <code>auth.php</code> est parfait pour centraliser cette logique.
						</ListGroup.Item>
						<ListGroup.Item className="px-0">
							<strong>Utilisateur connecté :</strong> {authUser ? "Oui" : "Non"}.
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	);
}
