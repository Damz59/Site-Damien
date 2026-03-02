// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_Php_VariablesEtTypes.jsx

import { Alert, Card, ListGroup } from "react-bootstrap";

export default function Chapitre_Php_VariablesEtTypes({ authUser }) {
	return (
		<div>
			<Alert variant="info" className="mb-4">
				<strong>Objectif :</strong> manipuler des variables, comprendre les types, et éviter
				les erreurs classiques (cast, null, string vs int).
			</Alert>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>1) Variables</strong>
				</Card.Header>
				<Card.Body>
					<ListGroup variant="flush">
						<ListGroup.Item className="px-0">
							En PHP, une variable commence par <code>$</code>.
						</ListGroup.Item>
						<ListGroup.Item className="px-0">
							Les types sont dynamiques, mais tu peux sécuriser avec <code>declare(strict_types=1)</code>.
						</ListGroup.Item>
					</ListGroup>

					<pre className="mt-3 mb-0">
{`<?php
declare(strict_types=1);

$age = 34;
$nom = "Damien";
$actif = true;

echo $nom . " a " . $age . " ans.";
`}
					</pre>
				</Card.Body>
			</Card>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>2) Tableaux (array)</strong>
				</Card.Header>
				<Card.Body>
					<pre className="mb-0">
{`<?php
$skills = ["PHP", "MySQL", "React"];
echo $skills[0]; // PHP

$user = [
  "id" => 1,
  "username" => "damien",
];
echo $user["username"];
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
	);
}