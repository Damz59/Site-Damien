// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/chapitres/Chapitre_Php_Introduction.jsx
import { Link } from "react-router-dom";
import { Alert, Card, ListGroup, Badge } from "react-bootstrap"
import "./Chapitre_Php.css"

export default function Chapitre_Php_Introduction({ authUser }) {
	return (
		<>
			{/* Header (banner) */}
			<header className="chapter-header">
				<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
					<div>
						<h1 className="chapter-title">PHP — Introduction</h1>
						<p className="chapter-subtitle mb-0">
							Objectif : comprendre à quoi sert PHP, où il s’exécute (serveur), et comment l’utiliser dans ton projet (API + pages
							dynamiques).
						</p>
					</div>

					<Badge bg="light" text="dark">
						Chapitre 1
					</Badge>
				</div>
			</header>

			{/* (Optionnel) Logos si tu en as */}
			
			<div className="stack-logos">
				<img className="Php-logo" src="/PHP/php-logo.svg" alt="PHP" />
				<span className="logo-plus">+</span>
				<img className="MySql-logo" src="/PHP/mysql-logo.svg" alt="MySQL" />
			</div>
			

			{/* Contenu principal */}
			<section className="chapter-card">
				{/* Intro / objectif */}
				<div className="chapter-callout">
					<Alert variant="info" className="mb-0">
						<strong>Objectif :</strong> comprendre à quoi sert PHP, où il s’exécute (serveur), et comment l’utiliser dans ton projet
						(API + pages dynamiques).
					</Alert>
				</div>

				{/* 1) PHP, c’est quoi ? */}
				<div className="chapter-section">
					<h2 className="section-title">A&#41; PHP, c’est quoi ?</h2>

					<Card className="shadow-sm">
						<Card.Body>
							{/* On garde ListGroup, mais on applique ton style de liste via clean-list */}
							<ListGroup variant="flush" className="clean-list">
								<ListGroup.Item className="px-0">
									<strong>Langage côté serveur :</strong> le code PHP s’exécute sur le serveur, pas dans le navigateur.
								</ListGroup.Item>
								<ListGroup.Item className="px-0">
									<strong>Retour HTML ou JSON :</strong> soit tu génères une page HTML, soit tu fais une API (comme tes fichiers
									dans <code>/api</code>).
								</ListGroup.Item>
								<ListGroup.Item className="px-0">
									<strong>Dans ton site :</strong> PHP sert surtout à ton API (login, register, check-auth, etc.).
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</div>

				{/* 2) Exemple minimal */}
				<div className="chapter-section">
					<h2 className="section-title">B&#41; Exemple minimal</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<p className="mb-2">
								Un fichier <code>hello.php</code> très simple :
							</p>

							<pre className="code mb-0">{`<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');

echo "Hello PHP!";
`}</pre>
						</Card.Body>
					</Card>
				</div>

				{/* 3) Notes projet */}
				<div className="chapter-section">
					<h2 className="section-title">C&#41; Notes projet</h2>

					<Card className="shadow-sm">
						<Card.Body>
							<ListGroup variant="flush" className="clean-list">
								<ListGroup.Item className="px-0">
									<strong>Auth :</strong> si un endpoint utilise la session, penser à <code>credentials: "include"</code> côté React.
								</ListGroup.Item>
								<ListGroup.Item className="px-0">
									<strong>Base de données :</strong> accès via <code>getPDO()</code> (dans <code>db.php</code>).
								</ListGroup.Item>
								<ListGroup.Item className="px-0">
									<strong>Utilisateur connecté :</strong> {authUser ? "Oui" : "Non"}.
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</div>
				<nav className="chapter-navigation">
					<Link className="btn-prev" to="/coursEtTutos/php/sommaire">
					← Retour Sommaire PHP
					</Link>

					<Link className="btn-next" to="/coursEtTutos/php/php-premier-pas">
					Chapitre 02 → Suite
					</Link>
				</nav>
			</section>
		</>
	)
}