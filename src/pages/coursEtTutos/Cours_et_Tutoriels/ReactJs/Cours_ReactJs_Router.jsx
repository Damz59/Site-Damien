// Cours_ReactJs_Router.jsx
import { useParams, Link } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";

import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

import Chapitre_01_ReactJs_Introduction from "./chapitres/Chapitre_01_ReactJs_Introduction.jsx";
import Chapitre_02_ReactJs_JSX_Et_Composants from "./chapitres/Chapitre_02_ReactJs_JSX_Et_Composants.jsx";

export default function Cours_ReactJs_Router({ authUser }) {
	const { chapterSlug } = useParams();

	const registry = {
		"introduction": Chapitre_01_ReactJs_Introduction,
		"jsx-et-composants": Chapitre_02_ReactJs_JSX_Et_Composants,
	};

	const ChapterComponent = registry[chapterSlug];

	if (!ChapterComponent) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				{authUser && (
					<div className="mt-3">
						<BanniereIsConnected authUser={authUser} />
					</div>
				)}
				<Container className="my-5">
					<h1 className="mb-3">ReactJS — Chapitre introuvable</h1>
					<Alert variant="warning">
						Aucun chapitre ne correspond à : <strong>{chapterSlug}</strong>
					</Alert>

					<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos/reactjs/sommaire">
						← Retour Sommaire ReactJS
					</Link>
				</Container>
			</main>
		);
	}

	return <ChapterComponent authUser={authUser} />;
}