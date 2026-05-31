// src/pages/coursEtTutos/Cours_et_Tutoriels/Dart_Flutter/Cours_Dart_Flutter_Router.jsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Alert, Badge, Card } from "react-bootstrap";

import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

// Chapitres Dart / Flutter (noms de fichiers selon ta convention)
import Chapitre_Flutter_QuEstCeQueFlutter from "./chapitres/Chapitre_Flutter_QuEstCeQueFlutter.jsx";
import Chapitre_Flutter_InstallationEtPremierProjet from "./chapitres/Chapitre_Flutter_InstallationEtPremierProjet.jsx";
import Chapitre_Dart_PremiereAppCLI from "./chapitres/Chapitre_Dart_PremiereAppCLI.jsx";

const DART_FLUTTER_CHAPTERS = {
	flutter_chapitre_1: {
		title: "Flutter — Chapitre 1 : Qu’est-ce que Flutter ?",
		component: Chapitre_Flutter_QuEstCeQueFlutter,
	},
	flutter_chapitre_2: {
		title: "Flutter — Chapitre 2 : Installation & premier projet",
		component: Chapitre_Flutter_InstallationEtPremierProjet,
	},
	dart_chapitre_3: {
		title: "Dart — Chapitre 3 : première app (CLI)",
		component: Chapitre_Dart_PremiereAppCLI,
	},
};

export default function Cours_Dart_Flutter_Router({ authUser }) {
	const navigate = useNavigate();
	const { chapterSlug } = useParams();

	const slug = String(chapterSlug || "").trim(); // garde la casse telle quelle (underscore OK)
	const chapter = DART_FLUTTER_CHAPTERS[slug];
	const ChapterComponent = chapter?.component || null;

	useEffect(() => {
		if (!chapterSlug) return;
		if (!chapter) {
			navigate("/coursEtTutos/dart_flutter/sommaire", { replace: true });
		}
	}, [chapter, chapterSlug, navigate]);

	if (!chapter) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				{authUser && (
					<div className="mt-3">
						<BanniereIsConnected authUser={authUser} />
					</div>
				)}

				<Container className="my-5">
					<Alert variant="warning" className="mb-0">
						Chapitre introuvable. Redirection vers le sommaire Dart / Flutter…
					</Alert>
				</Container>
			</main>
		);
	}

	return (
		<main className="flex-grow-1 overflow-auto">
			<Banniere />
			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-5">
				<div className="d-flex align-items-center justify-content-between mb-3">
					<div>
						<h1 className="mb-1">Dart / Flutter — {chapter.title}</h1>
						<div className="text-muted small">Slug : {slug}</div>
					</div>
					<Badge bg="primary">Cours</Badge>
				</div>

				<Card className="shadow-sm">
					<Card.Body>
						<ChapterComponent authUser={authUser} />

						<hr />

						<button
							type="button"
							className="btn btn-outline-secondary btn-sm"
							onClick={() => navigate("/coursEtTutos/dart_flutter/sommaire")}
						>
							← Retour Sommaire Dart / Flutter
						</button>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}