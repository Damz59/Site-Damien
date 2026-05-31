// Chapitre_Flutter_InstallationEtPremierProjet.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banniere from "../../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

export default function Chapitre_Flutter_InstallationEtPremierProjet({ authUser }) {
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Flutter — Chapitre 2 : Installation & premier projet</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder à ce chapitre.
					</Alert>
				</Container>
			</main>
		);
	}

	return (
		<main className="flex-grow-1 overflow-auto">
			<Banniere />
			<div className="mt-3">
				<BanniereIsConnected authUser={authUser} />
			</div>

			<Container className="my-5">
				<div className="d-flex align-items-center justify-content-between mb-3">
					<h1 className="mb-0">Flutter — Chapitre 2 : Installation & premier projet</h1>
					<Badge bg="primary">Chapitre 2</Badge>
				</div>

				{/* 1) Objectif */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>1) Objectif</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">
							Installer Flutter sur Windows avec <strong>VS Code</strong>, puis lancer une première app (sur{" "}
							<strong>Chrome</strong>) pour valider que tout marche.
						</p>
					</Card.Body>
				</Card>

				{/* 2) Plan */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>2) Ce que tu vas faire (plan simple)</strong>
					</Card.Header>
					<Card.Body>
						<ol className="mb-0">
							<li>Installer les prérequis</li>
							<li>Installer Flutter via VS Code (Download SDK)</li>
							<li>Créer une app modèle</li>
							<li>La lancer sur Chrome</li>
							<li>Tester le hot reload</li>
							<li>Jeter un œil aux outils (sidebar + inspector)</li>
						</ol>
					</Card.Body>
				</Card>

				{/* 3) Pré-requis */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>3) Pré-requis</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
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

				{/* 4) Installer Flutter */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>4) Installer Flutter avec VS Code (Download SDK)</strong>
					</Card.Header>
					<Card.Body>
						<ol className="mb-0">
							<li>Ouvre la palette de commandes : <code>Ctrl + Shift + P</code></li>
							<li>Tape <code>flutter</code></li>
							<li>Choisis <strong>Flutter: New Project</strong></li>
							<li>Quand VS Code te demande le SDK Flutter : choisis <strong>Download SDK</strong></li>
							<li>Choisis un dossier d’installation (ex : <code>C:\src\flutter</code>)</li>
							<li>Clique <strong>Clone Flutter</strong></li>
							<li>Clique <strong>Add SDK to PATH</strong></li>
							<li>Ferme et rouvre VS Code (et les terminaux) pour prendre en compte le PATH</li>
						</ol>
					</Card.Body>
				</Card>

				{/* 5) Vérifier */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>5) Vérifier que tout est OK</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-2">Dans un terminal, lance :</p>
						<pre className="mb-0">{`flutter doctor`}</pre>
						<p className="mt-2 mb-0">
							Objectif : avoir un maximum de <strong>✅</strong>.
						</p>
					</Card.Body>
				</Card>

				{/* 6) Créer une app */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>6) Créer une nouvelle app</strong>
					</Card.Header>
					<Card.Body>
						<ol className="mb-0">
							<li>Palette : <code>Ctrl + Shift + P</code></li>
							<li><strong>Flutter: New Project</strong></li>
							<li>Template <strong>Application</strong> (app compteur)</li>
							<li>Choisir le dossier parent</li>
							<li>
								Nom en minuscules avec underscores (ex : <code>trying_flutter</code>)
							</li>
						</ol>
					</Card.Body>
				</Card>

				{/* 7) Lancer sur Chrome */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>7) Lancer l’app sur le Web (Chrome)</strong>
					</Card.Header>
					<Card.Body>
						<ol className="mb-0">
							<li>Palette : <code>Ctrl + Shift + P</code></li>
							<li><strong>Flutter: Select Device</strong></li>
							<li>Sélectionne <strong>Chrome</strong></li>
							<li>Debug : <strong>F5</strong> (ou Run → Start Debugging)</li>
						</ol>
					</Card.Body>
				</Card>

				{/* 8) Hot Reload */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>8) Tester le Hot Reload</strong>
					</Card.Header>
					<Card.Body>
						<ol className="mb-0">
							<li>Dans l’app, clique quelques fois sur <strong>+</strong></li>
							<li>Ouvre <code>lib/main.dart</code></li>
							<li>Dans <code>_incrementCounter</code>, remplace <code>++</code> par <code>--</code></li>
							<li>Sauvegarde (ou clique sur Hot Reload)</li>
							<li>Le compteur doit maintenant <strong>descendre</strong></li>
						</ol>
					</Card.Body>
				</Card>

				{/* 9) DevTools */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>9) Explorer l’onglet Flutter (sidebar)</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
							<li>Ouvre la sidebar Flutter</li>
							<li>Va dans <strong>DevTools</strong></li>
							<li>Teste <strong>Flutter Inspector</strong> pour voir l’arbre des widgets</li>
						</ul>
					</Card.Body>
				</Card>

				{/* 10) Lien officiel */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>10) Lien officiel (référence)</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">
							<a href="https://docs.flutter.dev/install/quick" target="_blank" rel="noreferrer">
								https://docs.flutter.dev/install/quick
							</a>
						</p>
					</Card.Body>
				</Card>

				<Card className="shadow-sm">
					<Card.Body className="d-flex gap-2 flex-wrap">
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos/dart_flutter/sommaire">
							← Retour Sommaire Dart / Flutter
						</Link>
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos">
							← Retour Cours &amp; Tutos
						</Link>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}