// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_04_Php_ConditionsEtBoucles.jsx
import { Alert, Card, ListGroup, Badge } from "react-bootstrap"
import "./Chapitre_Php.css"

export default function Chapitre_Php_ConditionsEtBoucles({ authUser }) {
	return (
		<>
			{/* Header (banner) */}
			<header className="chapter-header">
				<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
					<div>
						<h1 className="chapter-title">PHP — Conditions & boucles</h1>
						<p className="chapter-subtitle mb-0">
							Objectif : écrire des conditions claires (if/switch) et parcourir des données (foreach), comme tu le fais pour vérifier
							auth/role.
						</p>
					</div>

					<Badge bg="light" text="dark">
						Chapitre 4
					</Badge>
				</div>
			</header>

			{/* Contenu principal */}
			<section className="chapter-card">
				{/* Intro / objectif */}
				<div className="chapter-callout">
					<Alert variant="info" className="mb-0">
						<strong>Objectif :</strong> écrire des conditions claires (if/switch) et parcourir des données (foreach), comme tu le fais
						pour vérifier auth/role.
					</Alert>
				</div>

				{/* A) Conditions */}
				<div className="chapter-section">
					<h2 className="section-title">A&#41; Conditions</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<pre className="code mb-0">{`
	<?php
		$role = "admin";

		if ($role === "admin") {
			echo "Accès admin";
		} else {
			echo "Accès refusé";
		}`}
							</pre>
						</Card.Body>
					</Card>
				</div>

				{/* B) Boucles */}
				<div className="chapter-section">
					<h2 className="section-title">B&#41; Boucles</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<pre className="code mb-0">{`
	<?php
		$users = [
			["id" => 1, "username" => "damien"],
			["id" => 2, "username" => "test"],
		];

		foreach ($users as $u) {
			echo $u["id"] . " - " . $u["username"] . "\\n";
		}`}
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
									Tu utilises ce principe dans tes endpoints : si pas connecté → <code>401</code>, si rôle insuffisant → <code>403</code>.
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