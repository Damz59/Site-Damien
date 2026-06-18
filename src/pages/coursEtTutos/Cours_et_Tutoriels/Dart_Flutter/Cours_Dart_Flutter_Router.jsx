// src/pages/coursEtTutos/Cours_et_Tutoriels/Dart_Flutter/Cours_Dart_Flutter_Router.jsx
import { useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Container, Alert, Badge } from "react-bootstrap"

import Banniere from "../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"

import "./Chapitres/Chapitre_DartFlutter.css"

// Chapitres Dart / Flutter
import Chapitre_01_Flutter_QuEstCeQueFlutter from "./chapitres/Chapitre_01_Flutter_QuEstCeQueFlutter.jsx"
import Chapitre_02_Flutter_InstallationEtPremierProjet from "./chapitres/Chapitre_02_Flutter_InstallationEtPremierProjet.jsx"
import Chapitre_03_Dart_PremiereAppCLI from "./chapitres/Chapitre_03_Dart_PremiereAppCLI.jsx"

// ✅ Uniformisé comme les autres cours : registry = slug -> composant
const DART_FLUTTER_CHAPTERS = {
	"flutter_chapitre_1": Chapitre_01_Flutter_QuEstCeQueFlutter,
	"flutter_chapitre_2": Chapitre_02_Flutter_InstallationEtPremierProjet,
	"dart_chapitre_3": Chapitre_03_Dart_PremiereAppCLI,
}

export default function Cours_Dart_Flutter_Router({ authUser }) {
	const navigate = useNavigate()
	const { chapterSlug } = useParams()

	const slug = String(chapterSlug || "").trim()
	const ChapterComponent = DART_FLUTTER_CHAPTERS[slug] || null

	useEffect(() => {
		if (!chapterSlug) return
		if (!ChapterComponent) {
			navigate("/coursEtTutos/dart_flutter/sommaire", { replace: true })
		}
	}, [ChapterComponent, chapterSlug, navigate])

	if (!ChapterComponent) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
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
		)
	}

	return (
		<main className="flex-grow-1 overflow-auto page-content">
			<Banniere />

			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-4">
				

				{/* Le chapitre */}
				<ChapterComponent authUser={authUser} />

				
			</Container>
		</main>
	)
}