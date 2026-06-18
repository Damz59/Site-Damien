// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_02_Php_VariablesEtTypes.jsx
import { Alert, Card, ListGroup, Badge } from "react-bootstrap"
import "./Chapitre_Php.css"

export default function Chapitre_Php_VariablesEtTypes({ authUser }) {
	return (
		<>
			{/* Header (banner) */}
			<header className="chapter-header">
				<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
					<div>
						<h1 className="chapter-title">PHP — Variables & types</h1>
						<p className="chapter-subtitle mb-0">
							Objectif : manipuler des variables, comprendre les types, et éviter les erreurs classiques (cast, null, string vs int).
						</p>
					</div>

					<Badge bg="light" text="dark">
						Chapitre 2
					</Badge>
				</div>
			</header>

			{/* Contenu principal */}
			<section className="chapter-card">
				{/* Intro / objectif */}
				<div className="chapter-callout">
					<Alert variant="info" className="mb-0">
						<strong>Objectif :</strong> manipuler des variables, comprendre les types, et éviter les erreurs classiques (cast, null,
						string vs int).
					</Alert>
				</div>

				{/* A) Variables */}
				<div className="chapter-section">
					<h2 className="section-title">A&#41; Variables</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<ListGroup variant="flush" className="clean-list">
								<ListGroup.Item className="px-0">
									En PHP, une variable commence par <code>$</code>.
								</ListGroup.Item>
								<ListGroup.Item className="px-0">
									Les types sont dynamiques, mais tu peux sécuriser avec <code>declare(strict_types=1)</code>.
								</ListGroup.Item>
							</ListGroup>

							<pre className="code mt-3 mb-0">{`<?php
declare(strict_types=1);

$age = 34;
$nom = "Damien";
$actif = true;

echo $nom . " a " . $age . " ans.";
`}</pre>
						</Card.Body>
					</Card>
				</div>

				{/* B) Tableaux */}
				<div className="chapter-section">
					<h2 className="section-title">B&#41; Tableaux (array)</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<pre className="code mb-0">{`<?php
$skills = ["PHP", "MySQL", "React"];
echo $skills[0]; // PHP

$user = [
	"id" => 1,
	"username" => "damien",
];

echo $user["username"];
`}</pre>
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
									<strong>JSON :</strong> dans tes endpoints, tu fais souvent{" "}
									<code>json_decode(file_get_contents('php://input'), true)</code>.
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