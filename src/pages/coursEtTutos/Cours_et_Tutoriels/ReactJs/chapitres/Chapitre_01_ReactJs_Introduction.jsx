// Chapitre_ReactJs_Introduction.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

import Banniere from "../../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"

import "./Chapitre_ReactJs.css"

export default function Chapitre_ReactJs_Introduction({ authUser }) {
	// UI guard (normalement déjà protégé par ProtectedRoute)
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">ReactJS — Introduction</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder à ce chapitre.
					</Alert>
				</Container>
			</main>
		)
	}

	return (
		<main className="flex-grow-1 overflow-auto page-content">
			<Banniere />

			<div className="mt-3">
				<BanniereIsConnected authUser={authUser} />
			</div>

			<Container className="my-4">
				{/* Header (banner) */}
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">ReactJS — Introduction</h1>
							<p className="chapter-subtitle mb-0">
								Objectif : comprendre ce qu’est React, son approche par composants et la notion d’UI déclarative.
							</p>
						</div>

						<Badge bg="light" text="dark">
							Chapitre 1
						</Badge>
					</div>
				</header>

				{/* Pagination (A/B/C/...) — visuelle */}
				<div className="d-flex flex-wrap gap-2 my-3">
					<span className="badge text-bg-secondary">A) Histoire</span>
					<span className="badge text-bg-secondary">B) Objectif</span>
					<span className="badge text-bg-secondary">C) Cours</span>
					<span className="badge text-bg-secondary">D) À retenir</span>
				</div>

				{/* Contenu principal */}
				<section className="chapter-card">
					{/* A) Un peu d’histoire */}
					<div className="chapter-section">
						<h2 className="section-title">A&#41; Un peu d’histoire</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-0">
									React est né chez Facebook au début des années 2010 pour faciliter la mise à jour d’interfaces riches et
									dynamiques. L’idée principale est de découper l’UI en composants réutilisables et de décrire l’interface
									comme une fonction de l’état de l’application. React a été publié en open source en 2013, ce qui a accéléré
									son adoption. Aujourd’hui, il est largement utilisé pour construire des applications web modernes, et son
									approche (composants, rendu déclaratif, mises à jour efficaces) a influencé l’écosystème front-end.
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* B) Objectif */}
					<div className="chapter-section">
						<h2 className="section-title">B&#41; Objectif</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<p className="mb-0">
									Comprendre ce qu’est React, à quoi ça sert, et comment un projet React s’organise (composants, rendu, état).
								</p>
							</Card.Body>
						</Card>
					</div>

					{/* C) Cours */}
					<div className="chapter-section">
						<h2 className="section-title">C&#41; Cours</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<h3 className="h5 mb-3">Objectif de React</h3>

								<p className="mb-2">
									React est une bibliothèque JavaScript qui sert à construire des interfaces utilisateur en{" "}
									<strong>composants</strong>.
									<br />
									Un composant est un petit bloc réutilisable d’UI (bouton, carte, formulaire, page).
								</p>

								<img
									src="/ReactJS/React_Icones/React-icon.svg"
									alt="Logo React"
									className="img-fluid chapter-image w-25 d-block mx-auto my-4"
								/>

								<hr className="my-4" />

								<h3 className="h5 mb-3">La grande idée : une UI déclarative</h3>
								<p className="mb-0">
									Avec React, tu décris <em>à quoi doit ressembler</em> l’interface en fonction des données (state, props).
									<br />
									Quand les données changent, React <strong>recalcule</strong> ce qu’il faut afficher et s’occupe de mettre à
									jour la page.
								</p>

								<hr className="my-4" />

								<h3 className="h5 mb-3">Pourquoi React est “efficace”</h3>

								<p className="mb-2">
									React garde une représentation en mémoire de l’interface (souvent appelée <em>Virtual DOM</em>) et compare
									les changements pour n’appliquer au DOM réel que les mises à jour nécessaires.
								</p>

								<p className="mb-0">
									Ce mécanisme est lié à la <strong>reconciliation</strong> (réconciliation) : React aligne l’UI affichée avec
									le nouvel état.
								</p>

								<img
									src="/ReactJS/React_Images/Schéma_Virtual_Dom_Reconciliation.jpg"
									alt="Schéma Virtual DOM / Reconciliation"
									className="img-fluid chapter-image"
								/>

								<hr className="my-4" />

								<h3 className="h5 mb-3">Comment on construit une application React</h3>
								<p className="mb-2">On part souvent d’une maquette d’écran, puis on :</p>

								<ul className="clean-list mb-3">
									<li>
										découpe l’interface en <strong>composants</strong> (petits blocs)
									</li>
									<li>
										organise ces composants en <strong>arbre</strong> (parent → enfants)
									</li>
									<li>
										fait circuler les données :
										<ul className="clean-list mb-0">
											<li>
												du parent vers l’enfant avec les <strong>props</strong>
											</li>
											<li>
												dans un composant avec le <strong>state</strong>
											</li>
										</ul>
									</li>
								</ul>

								<img
									src="/ReactJS/React_Images/Schema_Presevetion_Etat_DOM_Arbre.jpg"
									alt="Schéma UI as a tree"
									className="img-fluid chapter-image"
								/>

								<div className="chapter-callout">
									<Alert variant="info" className="mb-0">
										Une bonne manière de progresser : commencer par faire des composants statiques (sans données), puis ajouter
										des données (state/props) et enfin brancher une API.
									</Alert>
								</div>
							</Card.Body>
						</Card>
					</div>

					{/* D) À retenir */}
					<div className="chapter-section">
						<h2 className="section-title">D&#41; À retenir</h2>
						<Card className="shadow-sm">
							<Card.Body>
								<ul className="clean-list mb-0">
									<li>React sert à construire des interfaces via des composants réutilisables.</li>
									<li>Une app React est une composition de composants.</li>
									<li>On affiche du contenu en fonction des données (state/props).</li>
								</ul>
							</Card.Body>
						</Card>
					</div>

					{/* Navigation (uniformisée) */}
					<nav className="chapter-navigation">
						<Link className="btn-prev" to="/coursEtTutos/reactjs/sommaire">
							← Retour Sommaire ReactJS
						</Link>

						<Link className="btn-next" to="/coursEtTutos/reactjs/jsx-et-composants">
							Chapitre suivant : JSX et composants →
						</Link>
					</nav>
				</section>
			</Container>
		</main>
	)
}