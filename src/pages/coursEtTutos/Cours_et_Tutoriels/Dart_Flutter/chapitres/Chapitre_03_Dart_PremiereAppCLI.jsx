// Chapitre_Dart_PremiereAppCLI.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import Banniere from "../../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"
import "./Chapitre_DartFlutter.css"

export default function Chapitre_Dart_PremiereAppCLI({ authUser }) {
	// UI guard (normalement déjà protégé par ProtectedRoute)
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Dart — Chapitre 3 : Première app (CLI)</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder à ce chapitre.
					</Alert>
				</Container>
			</main>
		)
	}

	return (
		<main className="flex-grow-1 overflow-auto page-content">
		

			<Container className="my-4">
				{/* Header (banner) */}
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">Dart — Première app (CLI)</h1>
							<p className="chapter-subtitle mb-0">
								Objectif : vérifier Dart et comprendre le cycle <strong>créer → exécuter → modifier → relancer</strong> avec une app en
								ligne de commande.
							</p>
						</div>
						<Badge bg="light" text="dark">
							Chapitre 3
						</Badge>
					</div>
				</header>

				{/* Contenu principal */}
				<section className="chapter-card">
					{/* 1) Objectif */}
					<div className="chapter-section">
						<h2 className="section-title">A) Objectif</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-0">
									Valider que Dart est bien installé et comprendre le cycle{" "}
									<strong>créer → exécuter → modifier → relancer</strong> avec une petite app en ligne de commande.
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* 2) Avant de commencer */}
					<div className="chapter-section">
						<h2 className="section-title">B) Avant de commencer</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-2">Dans un terminal, vérifie Dart :</p>
								<pre className="code mb-0">{`dart --version`}</pre>
							</Card.Body>
						</Card>
					</div>

					{/* 3) Créer ton premier projet Dart */}
					<div className="chapter-section">
						<h2 className="section-title">C) Créer ton premier projet Dart (CLI)</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-2">On fait simple : un dossier + un template CLI.</p>
								<pre className="code mb-0">{`mkdir dartpedia
cd dartpedia

# Crée un projet CLI dans le dossier courant
dart create -t cli .`}</pre>
							</Card.Body>
						</Card>
					</div>

					{/* 4) Lancer le projet */}
					<div className="chapter-section">
						<h2 className="section-title">D) Lancer le projet</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-2">Exécute :</p>
								<pre className="code mb-0">{`dart run`}</pre>
								<p className="mt-2 mb-0">
									Tu devrais voir un message du style : <code>Hello world: 42!</code>
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* 5) Ta première modif */}
					<div className="chapter-section">
						<h2 className="section-title">E) Ta première modif (important)</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<ol className="clean-list mb-2">
									<li>
										Ouvre : <code>bin/cli.dart</code>
									</li>
									<li>
										Repère <code>main()</code> (point d’entrée)
									</li>
									<li>Simplifie pour afficher un message clair</li>
								</ol>

								<p className="mb-2">Exemple :</p>
								<pre className="code mb-0">{`void main(List<String> arguments) {
  print('Hello, Dart!');
}`}</pre>

								<p className="mt-2 mb-0">
									Puis relance <code>dart run</code>. Objectif : voir ton message dans le terminal.
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* 6) Mini repères */}
					<div className="chapter-section">
						<h2 className="section-title">F) Mini repères (à retenir)</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<ul className="clean-list mb-0">
									<li>
										<code>bin/</code> : le code exécutable (entrypoint)
									</li>
									<li>
										<code>lib/</code> : le code réutilisable (bibliothèque)
									</li>
									<li>
										<code>pubspec.yaml</code> : la “carte d’identité” du projet + dépendances
									</li>
								</ul>
							</Card.Body>
						</Card>
					</div>

					{/* 7) Lien officiel */}
					<div className="chapter-section">
						<h2 className="section-title">G) Lien officiel (référence)</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-0">
									<a href="https://dart.dev/tutorials" target="_blank" rel="noreferrer">
										https://dart.dev/tutorials
									</a>
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* Navigation (CSS uniformisé) */}
					<nav className="chapter-navigation">
						<Link className="btn-prev" to="/coursEtTutos/dart_flutter/flutter_chapitre_2">
							← Chapitre 2
						</Link>

						<Link className="btn-next" to="/coursEtTutos/dart_flutter/sommaire">
							Suivant → Sommaire
						</Link>
					</nav>
				</section>
			</Container>
		</main>
	)
}