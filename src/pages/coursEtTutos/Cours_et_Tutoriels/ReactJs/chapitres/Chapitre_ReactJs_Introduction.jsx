// Chapitre_ReactJs_Introduction.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banniere from "../../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

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

				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>Objectif</strong>
					</Card.Header>
					<Card.Body>
						<p className="mb-0">
							Comprendre ce qu’est React, à quoi ça sert, et comment un projet React
							s’organise (composants, rendu, état).
						</p>
					</Card.Body>
				</Card>

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

				<Card className="shadow-sm">
					<Card.Body className="d-flex gap-2 flex-wrap">
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos/reactjs/sommaire">
							← Retour Sommaire ReactJS
						</Link>
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos">
							← Retour Cours & Tutos
						</Link>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}