// Chapitre_01_Flutter_QuEstCeQueFlutter.jsx
import { Container, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Chapitre_DartFlutter.css"

export default function Chapitre_Flutter_QuEstCeQueFlutter({ authUser }) {
	if (!authUser) {
		return (
			<Container className="my-4">
				<Alert variant="warning" className="mb-0">
					Tu dois être connecté pour accéder à ce chapitre.
				</Alert>
			</Container>
		)
	}

	return (
		<Container className="my-4">
			<section className="chapter-card">
				{/* A) Histoire */}
				<div className="chapter-section">
					<h2 className="section-title">A) Histoire</h2>
					<Card className="shadow-sm">
						<Card.Body>
							<p>
								Flutter a été présenté pour la première fois par Google en 2015 sous le nom de code <strong>« Sky »</strong>, lors du{" "}
								<strong>Dart Developer Summit</strong>.
							</p>
							<p>
								L’objectif annoncé était d’obtenir un rendu très fluide, avec une démo visant <strong>120 images par seconde</strong>.
							</p>
							<p>
								Le projet a ensuite été renommé <strong>Flutter</strong>, avec une première sortie publique en <strong>mai 2017</strong>.
							</p>
							<p className="mb-0">
								La première version stable (<strong>Flutter 1.0</strong>) a été annoncée le <strong>4 décembre 2018</strong> lors de
								l’événement <strong>Flutter Live</strong>.
								<br />
								<br />
								Du côté du langage, <strong>Dart</strong> a été annoncé par Google le <strong>10 octobre 2011</strong>.
							</p>
						</Card.Body>
					</Card>
				</div>

				{/* B) Objectif */}
				<div className="chapter-section">
					<h2 className="section-title">B) Objectif</h2>
					<Card className="shadow-sm">
						<Card.Body>
							<p className="mb-0">
								Comprendre ce qu’est Flutter, à quoi ça sert, et comment il fonctionne (widgets, rendu, hot reload).
							</p>
						</Card.Body>
					</Card>
				</div>

				{/* C) À retenir */}
				<div className="chapter-section">
					<h2 className="section-title">C) À retenir</h2>
					<Card className="shadow-sm">
						<Card.Body>
							<ul className="clean-list mb-0">
								<li>
									Flutter est un <strong>SDK</strong> pour créer des apps <strong>Android, iOS, Web et Desktop</strong> avec{" "}
									<strong>une seule base de code</strong>.
								</li>
								<li>
									L’interface est construite avec des <strong>widgets</strong>.
								</li>
								<li>
									Flutter compile en <strong>code natif</strong> (mobile/desktop) et offre un <strong>Hot Reload</strong> pour itérer vite.
								</li>
							</ul>
						</Card.Body>
					</Card>
				</div>

				{/* D) Vocabulaire */}
				<div className="chapter-section">
					<h2 className="section-title">D) Vocabulaire</h2>
					<Card className="shadow-sm">
						<Card.Body>
							<ul className="clean-list mb-0">
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
				</div>

				{/* E) Exemple simple */}
				<div className="chapter-section">
					<h2 className="section-title">E) Exemple simple (à lire, pas à apprendre par cœur)</h2>
					<Card className="shadow-sm">
						<Card.Body>
							<pre className="code mb-0">{`import 'package:flutter/material.dart';
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
}
`}</pre>
						</Card.Body>
					</Card>
				</div>

				{/* F) Prochaine étape */}
				<div className="chapter-section">
					<h2 className="section-title">F) Prochaine étape</h2>
					<Card className="shadow-sm">
						<Card.Body>
							<p className="mb-0">Au chapitre 2, on installera Flutter et on créera le premier projet.</p>
						</Card.Body>
					</Card>
				</div>

				{/* Navigation */}
				<nav className="chapter-navigation">
					<Link className="btn-prev" to="/coursEtTutos/dart_flutter/sommaire">
						← Sommaire Dart / Flutter
					</Link>

					<Link className="btn-next" to="/coursEtTutos/dart_flutter/flutter_chapitre_2">
						Suivant → Chapitre 2
					</Link>
				</nav>
			</section>
		</Container>
	)
}