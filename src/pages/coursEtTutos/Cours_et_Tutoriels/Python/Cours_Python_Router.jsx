// Cours_Python_Router.jsx
import { useParams, Link } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";

import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

// ✅ Chapitres Python (mets ici TES vrais fichiers)
import Chapitre_01_Python_Environnement_Python from "./chapitres/Chapitre_01_Python_Environnement_Python.jsx";
import Chapitre_02_Python_premier_pas from "./chapitres/Chapitre_02_Python_Premiers_Pas.jsx";
import Chapitre_03_Condition_Boucle_Fonction from "./chapitres/Chapitre_03_Condition_Boucle_Fonction.jsx";

export default function Cours_Python_Router({ authUser }) {
	const { chapterSlug } = useParams();

	// ⚠️ Les clés doivent correspondre EXACTEMENT aux slugs en base
	const registry = {
		"environnement-python": Chapitre_01_Python_Environnement_Python,
		"python-premier-pas": Chapitre_02_Python_premier_pas,
		"python-condition-boucle-fonction": Chapitre_03_Condition_Boucle_Fonction,
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
					<h1 className="mb-3">Python — Chapitre introuvable</h1>

					<Alert variant="warning">
						Aucun chapitre ne correspond à : <strong>{chapterSlug}</strong>
					</Alert>

					<Link
						className="btn btn-outline-secondary btn-sm"
						to="/coursEtTutos/base-python/sommaire"
					>
						← Retour Sommaire Python
					</Link>
				</Container>
			</main>
		);
	}

	return <ChapterComponent authUser={authUser} />;
}