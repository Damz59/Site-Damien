// Chapitre_Dart_PremiereAppCLI.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banniere from "../../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

export default function Chapitre_Dart_PremiereAppCLI({ authUser }) {
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Flutter — Chapitre 3 : Dart — première app (CLI)</h1>
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
					<h1 className="mb-0">Flutter — Chapitre 3 : Dart — première app (CLI)</h1>
					<Badge bg="primary">Chapitre 3</Badge>
				</div>

				{/* 1) Objectif */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>1) Objectif</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">
							Valider que Dart est bien installé et comprendre le cycle{" "}
							<strong>créer → exécuter → modifier → relancer</strong> avec une petite app en ligne de commande.
						</p>
					</Card.Body>
				</Card>

				{/* 2) Avant de commencer */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>2) Avant de commencer</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-2">Dans un terminal, vérifie Dart :</p>
						<pre className="mb-0">{`dart --version`}</pre>
					</Card.Body>
				</Card>

				{/* 3) Créer ton premier projet Dart */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>3) Créer ton premier projet Dart</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-2">On fait simple : un dossier + un template CLI.</p>
						<pre className="mb-0">{`mkdir dartpedia
cd dartpedia

dart create cli`}</pre>
					</Card.Body>
				</Card>

				{/* 4) Lancer le projet */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>4) Lancer le projet</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-2">Entre dans le projet généré et exécute :</p>
						<pre className="mb-0">{`cd cli

dart run`}</pre>
						<p className="mt-2 mb-0">
							Tu devrais voir un message du style : <code>Hello world: 42!</code>
						</p>
					</Card.Body>
				</Card>

				{/* 5) Ta première modif */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>5) Ta première modif (important)</strong>
					</Card.Header>
					<Card.Body>
						<ol className="mb-2">
							<li>Ouvre : <code>bin/cli.dart</code></li>
							<li>Repère <code>main()</code> (point d’entrée)</li>
							<li>Simplifie pour afficher un message clair</li>
						</ol>
						<p className="mb-2">Exemple :</p>
						<pre className="mb-0">{`void main(List<String> arguments) {
  print('Hello, Dart!');
}`}</pre>
						<p className="mt-2 mb-0">
							Puis relance <code>dart run</code>. Objectif : voir ton message dans le terminal.
						</p>
					</Card.Body>
				</Card>

				{/* 6) Mini repères */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>6) Mini repères (à retenir)</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
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

				{/* 7) Lien officiel */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>7) Lien officiel (référence)</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">
							<a href="https://dart.dev/learn/tutorial/first-app" target="_blank" rel="noreferrer">
								https://dart.dev/learn/tutorial/first-app
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