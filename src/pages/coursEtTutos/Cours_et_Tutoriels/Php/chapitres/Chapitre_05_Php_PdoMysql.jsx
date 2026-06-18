// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_Php_Fonctions.jsx
import { Alert, Card, ListGroup, Badge } from "react-bootstrap"
import "./Chapitre_Php.css"

export default function Chapitre_Php_Fonctions({ authUser }) {
	return (
		<>
			{/* Header (banner) */}
			<header className="chapter-header">
				<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
					<div>
						<h1 className="chapter-title">PHP — Fonctions</h1>
						<p className="chapter-subtitle mb-0">
							Objectif : créer des fonctions réutilisables (comme tes helpers <code>requireAuth()</code> et <code>requireRole()</code>).
						</p>
					</div>

					<Badge bg="light" text="dark">
						Chapitre 5
					</Badge>
				</div>
			</header>

			{/* Contenu principal */}
			<section className="chapter-card">
				{/* Intro / objectif */}
				<div className="chapter-callout">
					<Alert variant="info" className="mb-0">
						<strong>Objectif :</strong> créer des fonctions réutilisables (comme tes helpers <code>requireAuth()</code> et{" "}
						<code>requireRole()</code>).
					</Alert>
				</div>

				{/* A) Fonction simple */}
				<div className="chapter-section">
					<h2 className="section-title">A&#41; Fonction simple</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<pre className="code mb-0">
	{`<?php
		function add(int $a, int $b): int {
			return $a + $b;
		}

		echo add(2, 3); // 5`}
							</pre>
						</Card.Body>
					</Card>
				</div>

				{/* B) Exemple respond */}
				<div className="chapter-section">
					<h2 className="section-title">B&#41; Exemple “respond” (pattern API)</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<pre className="code mb-0">
	{`<?php
		function respond(int $status, array $payload): void {
			http_response_code($status);
			echo json_encode($payload, JSON_UNESCAPED_UNICODE);
			exit();
		}

		respond(200, ["success" => true]);`}
						</pre>
						</Card.Body>
					</Card>
				</div>

				{/* C) Notes projet */}
				<div className="chapter-section">
					<h2 className="section-title">C&#41; Notes projet</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<ListGroup variant="flush" className="clean-list">
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
			</section>
		</>
	)
}