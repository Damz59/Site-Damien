// src/pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Angular_SDBM/Exercice_Angular_SDBM_Router.jsx
import { useParams, Link } from "react-router-dom"
import { Container, Alert } from "react-bootstrap"

import Banniere from "../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"

import Chapitre_01_Angular_SDBM_Creation_du_Projet from "./chapitres/Chapitre_01_Angular_SDBM_Creation_du_Projet.jsx"
import Chapitre_02_Angular_SDBM_Création_Connexion_API_Routing_CRUD from "./chapitres/Chapitre_02_Angular_SDBM_Création_Connexion_API_Routing_CRUD.jsx"
import Chapitre_03_Angular_SDBM_Formulaires_avances from "./chapitres/Chapitre_03_Angular_SDBM_Formulaires_avances.jsx"

import "./chapitres/chapitre_Angular_SDBM.css"

export default function Exercice_Angular_SDBM_Router({ authUser }) {
	const { chapterSlug } = useParams()

	const registry = {
		"creation-du-projet": Chapitre_01_Angular_SDBM_Creation_du_Projet,
		"connexion-api-routing-crud": Chapitre_02_Angular_SDBM_Création_Connexion_API_Routing_CRUD,
		"formulaire-angular": Chapitre_03_Angular_SDBM_Formulaires_avances,
	}

	const ChapterComponent = registry[chapterSlug]

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
					<h1 className="mb-3">Exercice Angular SDBM — Chapitre introuvable</h1>

					<Alert variant="warning">
						Aucun chapitre ne correspond à : <strong>{chapterSlug}</strong>
					</Alert>

					<Link
						className="btn btn-outline-secondary btn-sm"
						to="/coursEtTutos/angular-sdbm/sommaire"
					>
						← Retour Sommaire Exercice Angular SDBM
					</Link>
				</Container>
			</main>
		)
	}

	return <ChapterComponent authUser={authUser} />
}