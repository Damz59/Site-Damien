// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_Php_Introduction.jsx

import { Alert, Card, ListGroup } from "react-bootstrap";

export default function Chapitre_Php_Introduction({ authUser }) {
	return (
		<div>
			<Alert variant="info" className="mb-4">
				<strong>Objectif :</strong> comprendre à quoi sert PHP, où il s’exécute (serveur),
				et comment l’utiliser dans ton projet (API + pages dynamiques).
			</Alert>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>1) PHP, c’est quoi ?</strong>
				</Card.Header>
				<Card.Body>
					<ListGroup variant="flush">
						<ListGroup.Item className="px-0">
							<strong>Langage côté serveur :</strong> le code PHP s’exécute sur le serveur, pas
							dans le navigateur.
						</ListGroup.Item>
						<ListGroup.Item className="px-0">
							<strong>Retour HTML ou JSON :</strong> soit tu génères une page HTML, soit tu
							fais une API (comme tes fichiers dans <code>/api</code>).
						</ListGroup.Item>
						<ListGroup.Item className="px-0">
							<strong>Dans ton site :</strong> PHP sert surtout à ton API (login, register,
							check-auth, etc.).
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>

			<Card className="shadow-sm mb-4">
				<Card.Header className="bg-primary text-white">
					<strong>2) Exemple minimal</strong>
				</Card.Header>
				<Card.Body>
					<p className="mb-2">
						Un fichier <code>hello.php</code> très simple :
					</p>
					<pre className="mb-0">
{`<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');
echo "Hello PHP!";
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
							<strong>Auth :</strong> si un endpoint utilise la session, penser à
							<code> credentials: "include"</code> côté React.
						</ListGroup.Item>
						<ListGroup.Item className="px-0">
							<strong>Base de données :</strong> accès via <code>getPDO()</code> (dans
							<code> db.php</code>).
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