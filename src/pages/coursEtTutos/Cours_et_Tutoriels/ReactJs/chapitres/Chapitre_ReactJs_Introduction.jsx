// Chapitre_ReactJs_Introduction.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banniere from "../../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

import "./Chapitre_ReactJs_Introduction.css";

export default function Chapitre_ReactJs_Introduction({ authUser }) {
	// UI guard (normalement déjà protégé par ProtectedRoute)
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">ReactJS — Introduction</h1>
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
					<h1 className="mb-0">ReactJS — Introduction</h1>
					<Badge bg="primary">Chapitre 1</Badge>
				</div>
				{/* Un peu d’histoire */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>Un peu d’histoire</strong>
					</Card.Header>

					<Card.Body>
						<p className="mb-0">
							React est né chez Facebook au début des années 2010 pour faciliter la mise à jour d’interfaces
							riches et dynamiques. L’idée principale est de découper l’UI en composants réutilisables et de
							décrire l’interface comme une fonction de l’état de l’application. React a été publié en open
							source en 2013, ce qui a accéléré son adoption. Aujourd’hui, il est largement utilisé pour
							construire des applications web modernes, et son approche (composants, rendu déclaratif,
							mises à jour efficaces) a influencé l’écosystème front-end.
						</p>
					</Card.Body>
				</Card>

				{/* Objectif */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>Objectif</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">
							Comprendre ce qu’est React, à quoi ça sert, et comment un projet React s’organise
							(composants, rendu, état).
						</p>
					</Card.Body>
				</Card>

				{/* Cours */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>Cours</strong>
					</Card.Header>

					<Card.Body>
						<h3 className="h5 mb-3">Objectif de React</h3>

						<p className="mb-2">
							React est une bibliothèque JavaScript qui sert à construire des interfaces utilisateur en{" "}
							<strong>composants</strong>.
							<br />
							Un composant est un petit bloc réutilisable d’UI (bouton, carte, formulaire, page).
						</p>

						{/* Logo React (dans public/React_Images/) */}
						<img
							src="/ReactJS/React_Icones/React-icon.svg"
							alt="Logo React"
							className="img-fluid react-logo"
						/>

						<hr className="my-4" />

						<h3 className="h5 mb-3">La grande idée : une UI déclarative</h3>

						<p className="mb-0">
							Avec React, tu décris <em>à quoi doit ressembler</em> l’interface en fonction des données
							(state, props).
							<br />
							Quand les données changent, React <strong>recalcule</strong> ce qu’il faut afficher et
							s’occupe de mettre à jour la page.
						</p>

						<hr className="my-4" />

						<h3 className="h5 mb-3">Pourquoi React est “efficace”</h3>

						<p className="mb-2">
							React garde une représentation en mémoire de l’interface (souvent appelée <em>Virtual DOM</em>)
							et compare les changements pour n’appliquer au DOM réel que les mises à jour nécessaires.
						</p>

						<p className="mb-0">
							Ce mécanisme est lié à ce que la doc appelle la <strong>reconciliation</strong>{" "}
							(réconciliation) : React aligne l’UI affichée avec le nouvel état.
						</p>

						{/* Schéma Virtual DOM / Reconciliation (dans public/React_Images/) */}
						<img
							src="/ReactJS/React_Images/Schéma_Virtual_Dom_Reconciliation.jpg"
							alt="Schéma Virtual DOM / Reconciliation"
							className="img-fluid vdom-schema"
						/>

						<hr className="my-4" />

						<h3 className="h5 mb-3">Comment on construit une application React</h3>

						<p className="mb-2">On part souvent d’une maquette d’écran, puis on :</p>

						<ul className="mb-3">
							<li>découpe l’interface en <strong>composants</strong> (petits blocs)</li>
							<li>organise ces composants en <strong>arbre</strong> (parent → enfants)</li>
							<li>
								fait circuler les données :
								<ul className="mb-0">
									<li>du parent vers l’enfant avec les <strong>props</strong></li>
									<li>dans un composant avec le <strong>state</strong></li>
								</ul>
							</li>
						</ul>

						{/* Schéma UI as a tree (ajuste le nom si différent) */}
						<img
							src="/ReactJS/React_Images/Schema_Presevetion_Etat_DOM_Arbre.jpg"
							alt="Schéma UI as a tree"
							className="img-fluid my-2"
						/>

						<Alert variant="info" className="mt-3 mb-0">
							Une bonne manière de progresser : commencer par faire des composants statiques (sans données),
							puis ajouter des données (state/props) et enfin brancher une API.
						</Alert>
					</Card.Body>
				</Card>

				{/* À retenir */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>À retenir</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
							<li>React sert à construire des interfaces via des composants réutilisables.</li>
							<li>Une app React est une composition de composants.</li>
							<li>On affiche du contenu en fonction des données (state/props).</li>
						</ul>
					</Card.Body>
				</Card>

				{/* Navigation */}
				<Card className="shadow-sm">
					<Card.Body className="d-flex gap-2 flex-wrap">
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos/reactjs/sommaire">
							← Retour Sommaire ReactJS
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