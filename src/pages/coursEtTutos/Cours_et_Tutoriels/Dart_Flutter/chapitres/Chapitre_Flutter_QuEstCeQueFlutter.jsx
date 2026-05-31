// Chapitre_Flutter_QuEstCeQueFlutter.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banniere from "../../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

export default function Chapitre_Flutter_QuEstCeQueFlutter({ authUser }) {
	// UI guard (normalement déjà protégé par ProtectedRoute)
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Flutter — Chapitre 1 : Qu’est-ce que Flutter ?</h1>
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
					<h1 className="mb-0">Flutter — Chapitre 1 : Qu’est-ce que Flutter ?</h1>
					<Badge bg="primary">Chapitre 1</Badge>
				</div>

				{/* 1) Histoire */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>1) Histoire</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-2">
							Flutter a été présenté pour la première fois par Google en 2015 sous le nom de code{" "}
							<strong>« Sky »</strong>, lors du <strong>Dart Developer Summit</strong>.
						</p>
						<p className="mb-2">
							L’objectif annoncé était d’obtenir un rendu très fluide, avec une démo visant{" "}
							<strong>120 images par seconde</strong>.
						</p>
						<p className="mb-2">
							Le projet a ensuite été renommé <strong>Flutter</strong>, avec une première sortie publique
							en <strong>mai 2017</strong>.
						</p>
						<p className="mb-0">
							La première version stable (<strong>Flutter 1.0</strong>) a été annoncée le{" "}
							<strong>4 décembre 2018</strong> lors de l’événement <strong>Flutter Live</strong>.
							<br />
							<br />
							Du côté du langage, <strong>Dart</strong> a été annoncé par Google le{" "}
							<strong>10 octobre 2011</strong>.
						</p>
					</Card.Body>
				</Card>

				{/* 2) Objectif */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>2) Objectif</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">
							Comprendre ce qu’est Flutter, à quoi ça sert, et comment il fonctionne (widgets, rendu, hot
							reload).
						</p>
					</Card.Body>
				</Card>

				{/* 3) À retenir */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>3) À retenir</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
							<li>
								Flutter est un <strong>SDK</strong> pour créer des apps <strong>Android, iOS, Web et Desktop</strong>{" "}
								avec <strong>une seule base de code</strong>.
							</li>
							<li>
								L’interface est construite avec des <strong>widgets</strong>.
							</li>
							<li>
								Flutter compile en <strong>code natif</strong> (mobile/desktop) et offre un <strong>Hot Reload</strong>{" "}
								pour itérer vite.
							</li>
						</ul>
					</Card.Body>
				</Card>

				{/* 4) Vocabulaire */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>4) Vocabulaire</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
							<li>
								<strong>Widget</strong> : brique d’UI (texte, bouton, layout, page).
							</li>
							<li>
								<strong>Tree</strong> (arbre de widgets) : structure de l’écran.
							</li>
							<li>
								<strong>State</strong> : données qui changent et font reconstruire l’UI.
							</li>
						</ul>
					</Card.Body>
				</Card>

				{/* 5) Exemple simple */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>5) Exemple simple (à lire, pas à apprendre par cœur)</strong>
					</Card.Header>
					<Card.Body>
						<pre className="mb-0">
{`import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(child: Text('Hello Flutter')),
      ),
    );
  }
}`}
						</pre>
					</Card.Body>
				</Card>

				{/* 6) Prochaine étape */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>6) Prochaine étape</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">Au chapitre 2, on installera Flutter et on créera le premier projet.</p>
					</Card.Body>
				</Card>

				{/* Navigation */}
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