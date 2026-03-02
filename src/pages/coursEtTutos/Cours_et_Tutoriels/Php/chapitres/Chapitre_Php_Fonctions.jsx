// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_Php_ConditionsEtBoucles.jsx

import { Alert, Card, ListGroup } from "react-bootstrap";

export default function Chapitre_Php_ConditionsEtBoucles({ authUser }) {
	return (
		<div>
			<Alert variant="info" className="mb-4">
				<strong>Objectif :</strong> écrire des conditions claires (if/switch) et parcourir des
				données (foreach), comme tu le fais pour vérifier auth/role.
			</Alert>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>1) Conditions</strong>
				</Card.Header>
				<Card.Body>
					<pre className="mb-0">
{`<?php
$role = "admin";

if ($role === "admin") {
  echo "Accès admin";
} else {
  echo "Accès refusé";
}
`}
					</pre>
				</Card.Body>
			</Card>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>2) Boucles</strong>
				</Card.Header>
				<Card.Body>
					<pre className="mb-0">
{`<?php
$users = [
  ["id" => 1, "username" => "damien"],
  ["id" => 2, "username" => "test"],
];

foreach ($users as $u) {
  echo $u["id"] . " - " . $u["username"] . "\\n";
}
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
							Tu utilises ce principe dans tes endpoints : si pas connecté → <code>401</code>,
							si rôle insuffisant → <code>403</code>.
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