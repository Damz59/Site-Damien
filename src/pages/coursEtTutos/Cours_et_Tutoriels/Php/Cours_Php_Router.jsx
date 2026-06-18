// src/pages/coursEtTutos/Cours_et_Tutoriels/Php/Cours_Php_Router.jsx
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Alert } from "react-bootstrap"

import Banniere from "../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"

import Chapitre_01_Php_Introduction from "./chapitres/Chapitre_01_Php_Introduction.jsx"
import Chapitre_Php_VariablesEtTypes from "./chapitres/Chapitre_02_Php_VariablesEtTypes.jsx"
import Chapitre_Php_ConditionsEtBoucles from "./chapitres/Chapitre_03_Php_ConditionsEtBoucles.jsx"
import Chapitre_Php_Fonctions from "./chapitres/Chapitre_04_Php_Fonctions.jsx"
import Chapitre_Php_PdoMysql from "./chapitres/Chapitre_05_Php_PdoMysql.jsx"

const PHP_CHAPTERS = {
	introduction: Chapitre_01_Php_Introduction,
	"variables-et-types": Chapitre_Php_VariablesEtTypes,
	"conditions-et-boucles": Chapitre_Php_ConditionsEtBoucles,
	fonctions: Chapitre_Php_Fonctions,
	"pdo-mysql": Chapitre_Php_PdoMysql,
}

export default function Cours_Php_Router({ authUser }) {
	const navigate = useNavigate()
	const { chapterSlug } = useParams()

	const slug = String(chapterSlug || "").trim().toLowerCase()
	const ChapterComponent = PHP_CHAPTERS[slug] || null

	useEffect(() => {
		if (!chapterSlug) return
		if (!ChapterComponent) {
			navigate("/coursEtTutos/php/sommaire", { replace: true })
		}
	}, [ChapterComponent, chapterSlug, navigate])

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
					<Alert variant="warning" className="mb-0">
						Chapitre introuvable. Redirection vers le sommaire PHP…
					</Alert>
				</Container>
			</main>
		)
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
				<ChapterComponent authUser={authUser} />

				<hr />

				<button
					type="button"
					className="btn btn-outline-secondary btn-sm"
					onClick={() => navigate("/coursEtTutos/php/sommaire")}
				>
					← Retour Sommaire PHP
				</button>
			</Container>
		</main>
	)
}