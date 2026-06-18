// Chapitre_02_Flutter_InstallationEtPremierProjet.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

import Banniere from "../../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"

import "./Chapitre_DartFlutter.css"

export default function Chapitre_Flutter_InstallationEtPremierProjet({ authUser }) {
	// UI guard (normalement déjà protégé par ProtectedRoute)
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Flutter — Chapitre 2 : Installation & premier projet</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder à ce chapitre.
					</Alert>
				</Container>
			</main>
		)
	}

	return (
		<main className="flex-grow-1 overflow-auto page-content">
			<Container className="my-2">
				{/* Header (banner) */}
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">Flutter — Installation & premier projet</h1>
							<p className="chapter-subtitle mb-0">
								Objectif : installer Flutter sur Windows avec VS Code, créer une app modèle et la lancer sur Chrome.
							</p>
						</div>

						<Badge bg="light" text="dark">
							Chapitre 2
						</Badge>
					</div>
				</header>

				{/* Contenu principal */}
				<section className="chapter-card">
					{/* A) Objectif */}
					<div className="chapter-section">
						<h2 className="section-title">A) Objectif</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-0">
									Installer Flutter sur Windows avec <strong>VS Code</strong>, puis lancer une première app (sur <strong>Chrome</strong>)
									pour valider que tout marche.
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* B) Plan */}
					<div className="chapter-section">
						<h2 className="section-title">B) Ce que tu vas faire (plan simple)</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ol className="clean-list mb-0">
									<li>Installer les prérequis</li>
									<li>Installer Flutter via VS Code (Download SDK)</li>
									<li>Créer une app modèle</li>
									<li>La lancer sur Chrome</li>
									<li>Tester le hot reload</li>
									<li>Jeter un œil aux outils (sidebar + inspector)</li>
								</ol>
							</Card.Body>
						</Card>
					</div>

					{/* C) Pré-requis */}
					<div className="chapter-section">
						<h2 className="section-title">C) Pré-requis</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ul className="clean-list mb-0">
									<li>
										<strong>Git (Windows)</strong> : installer Git for Windows.
									</li>
									<li>
										<strong>VS Code</strong> : installer Visual Studio Code.
									</li>
									<li>
										<strong>Extensions VS Code</strong> : installer l’extension Flutter (Dart inclus en général).
									</li>
								</ul>
							</Card.Body>
						</Card>
					</div>

					{/* D) Installer Flutter */}
					<div className="chapter-section">
						<h2 className="section-title">D) Installer Flutter avec VS Code (Download SDK)</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ol className="clean-list mb-0">
									<li>
										Ouvre la palette de commandes : <code>Ctrl + Shift + P</code>
									</li>
									<li>
										Tape <code>flutter</code>
									</li>
									<li>
										Choisis <strong>Flutter: New Project</strong>
									</li>
									<li>
										Quand VS Code te demande le SDK Flutter : choisis <strong>Download SDK</strong>
									</li>
									<li>
										Choisis un dossier d’installation (ex : <code>C:\src\flutter</code>)
									</li>
									<li>
										Clique <strong>Clone Flutter</strong>
									</li>
									<li>
										Clique <strong>Add SDK to PATH</strong>
									</li>
									<li>Ferme et rouvre VS Code (et les terminaux) pour prendre en compte le PATH</li>
								</ol>
							</Card.Body>
						</Card>
					</div>

					{/* E) Vérifier */}
					<div className="chapter-section">
						<h2 className="section-title">E) Vérifier que tout est OK</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-2">Dans un terminal, lance :</p>
								<pre className="code mb-0">{`flutter doctor`}</pre>
								<p className="mt-2 mb-0">
									Objectif : avoir un maximum de <strong>✅</strong>.
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* F) Créer une app */}
					<div className="chapter-section">
						<h2 className="section-title">F) Créer une nouvelle app</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ol className="clean-list mb-0">
									<li>
										Palette : <code>Ctrl + Shift + P</code>
									</li>
									<li>
										<strong>Flutter: New Project</strong>
									</li>
									<li>
										Template <strong>Application</strong> (app compteur)
									</li>
									<li>Choisir le dossier parent</li>
									<li>
										Nom en minuscules avec underscores (ex : <code>trying_flutter</code>)
									</li>
								</ol>
							</Card.Body>
						</Card>
					</div>

					{/* G) Lancer sur Chrome */}
					<div className="chapter-section">
						<h2 className="section-title">G) Lancer l’app sur le Web (Chrome)</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ol className="clean-list mb-0">
									<li>
										Palette : <code>Ctrl + Shift + P</code>
									</li>
									<li>
										<strong>Flutter: Select Device</strong>
									</li>
									<li>
										Sélectionne <strong>Chrome</strong>
									</li>
									<li>
										Debug : <strong>F5</strong> (ou Run → Start Debugging)
									</li>
								</ol>
							</Card.Body>
						</Card>
					</div>

					{/* H) Hot Reload */}
					<div className="chapter-section">
						<h2 className="section-title">H) Tester le Hot Reload</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ol className="clean-list mb-0">
									<li>
										Dans l’app, clique quelques fois sur <strong>+</strong>
									</li>
									<li>
										Ouvre <code>lib/main.dart</code>
									</li>
									<li>
										Dans <code>_incrementCounter</code>, remplace <code>++</code> par <code>--</code>
									</li>
									<li>Sauvegarde (ou clique sur Hot Reload)</li>
									<li>
										Le compteur doit maintenant <strong>descendre</strong>
									</li>
								</ol>
							</Card.Body>
						</Card>
					</div>

					{/* I) DevTools */}
					<div className="chapter-section">
						<h2 className="section-title">I) Explorer l’onglet Flutter (sidebar)</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ul className="clean-list mb-0">
									<li>Ouvre la sidebar Flutter</li>
									<li>
										Va dans <strong>DevTools</strong>
									</li>
									<li>
										Teste <strong>Flutter Inspector</strong> pour voir l’arbre des widgets
									</li>
								</ul>
							</Card.Body>
						</Card>
					</div>

					{/* J) Lien officiel */}
					<div className="chapter-section">
						<h2 className="section-title">J) Lien officiel (référence)</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-0">
									<a href="https://docs.flutter.dev/install/quick" target="_blank" rel="noreferrer">
										https://docs.flutter.dev/install/quick
									</a>
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* Navigation (CSS uniformisé) */}
					<nav className="chapter-navigation">
						<Link className="btn-prev" to="/coursEtTutos/dart_flutter/flutter_chapitre_1">
							← Chapitre 1
						</Link>

						<Link className="btn-next" to="/coursEtTutos/dart_flutter/dart_chapitre_3">
							Suivant → Chapitre 3
						</Link>
					</nav>
				</section>
			</Container>
		</main>
	)
}