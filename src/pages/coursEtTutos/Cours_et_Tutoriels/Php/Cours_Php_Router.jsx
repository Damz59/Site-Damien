// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/Cours_Php_Router.jsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Alert, Badge, Card } from "react-bootstrap";
import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

import Chapitre_Php_Introduction from "./chapitres/Chapitre_Php_Introduction.jsx";
import Chapitre_Php_VariablesEtTypes from "./chapitres/Chapitre_Php_VariablesEtTypes.jsx";
import Chapitre_Php_ConditionsEtBoucles from "./chapitres/Chapitre_Php_ConditionsEtBoucles.jsx";
import Chapitre_Php_Fonctions from "./chapitres/Chapitre_Php_Fonctions.jsx";
import Chapitre_Php_PdoMysql from "./chapitres/Chapitre_Php_PdoMysql.jsx";

const PHP_CHAPTERS = {
	introduction: { title: "Introduction", component: Chapitre_Php_Introduction },
	"variables-et-types": { title: "Variables et types", component: Chapitre_Php_VariablesEtTypes },
	"conditions-et-boucles": { title: "Conditions et boucles", component: Chapitre_Php_ConditionsEtBoucles },
	fonctions: { title: "Fonctions", component: Chapitre_Php_Fonctions },
	"pdo-mysql": { title: "PDO + MySQL", component: Chapitre_Php_PdoMysql },
};

export default function Cours_Php_Router({ authUser }) {
	const navigate = useNavigate();
	const { chapterSlug } = useParams();

	const slug = String(chapterSlug || "").trim().toLowerCase();
	const chapter = PHP_CHAPTERS[slug];
	const ChapterComponent = chapter?.component || null;

	useEffect(() => {
		if (!chapterSlug) return;
		if (!chapter) {
			navigate("/coursEtTutos/php/sommaire", { replace: true });
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
						Chapitre introuvable. Redirection vers le sommaire PHP…
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
						<h1 className="mb-1">PHP — {chapter.title}</h1>
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
							onClick={() => navigate("/coursEtTutos/php/sommaire")}
						>
							← Retour Sommaire PHP
						</button>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}