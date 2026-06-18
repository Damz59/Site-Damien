// Chapitre_ReactJs_JSX_Et_Composants.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

import Banniere from "../../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"

import "./Chapitre_ReactJs.css"

export default function Chapitre_ReactJs_JSX_Et_Composants({ authUser }) {
	// UI guard (normalement déjà protégé par ProtectedRoute)
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">ReactJS — JSX et composants</h1>
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
							<h1 className="chapter-title">ReactJS — JSX et composants</h1>
							<p className="chapter-subtitle mb-0">
								Objectif : comprendre le JSX et apprendre à créer / utiliser des composants React.
							</p>
						</div>

						<Badge bg="light" text="dark">
							Chapitre 2
						</Badge>
					</div>
				</header>

				{/* Pagination (A/B/C/...) — visuelle */}
				<div className="d-flex flex-wrap gap-2 my-3">
					<span className="badge text-bg-secondary">A&#41; JSX</span>
					<span className="badge text-bg-secondary">B&#41; Composants</span>
				</div>

				{/* Contenu principal */}
				<section className="chapter-card">
					{/* A) JSX */}
					<div className="chapter-section">
						<h2 className="section-title">A&#41; JSX</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ul className="clean-list mb-0">
									<li>Le JSX ressemble à du HTML, mais c’est du JavaScript (transformé à la build).</li>
									<li>
										Tu peux utiliser des expressions JS avec <code>{"{...}"}</code>.
									</li>
									<li>
										Attributs spéciaux : <code>className</code>, <code>htmlFor</code>, etc.
									</li>
								</ul>

								<Card className="mt-3">
									<Card.Body>
										<pre className="code mb-0">{`const name = "Damien";

return (
	<h2 className="text-primary">
		Bonjour {name}
	</h2>
);`}</pre>
									</Card.Body>
								</Card>

								<div className="chapter-callout">
									<Alert variant="info" className="mb-0">
										En JSX, tu peux afficher une variable, appeler une fonction, ou faire un ternaire, tant que ça retourne une
										valeur affichable.
									</Alert>
								</div>
							</Card.Body>
						</Card>
					</div>

					{/* B) Composants */}
					<div className="chapter-section">
						<h2 className="section-title">B&#41; Composants</h2>

						<Card className="shadow-sm">
							<Card.Body>
								<ul className="clean-list mb-0">
									<li>Un composant = une fonction qui retourne du JSX.</li>
									<li>Les composants se composent entre eux : un parent rend des enfants.</li>
									<li>
										On peut passer des données via les <strong>props</strong>.
									</li>
								</ul>

								<Card className="mt-3">
									<Card.Body>
										<pre className="code mb-0">{`function Hello({ name }) {
	return <p>Salut {name}</p>;
}

export default function App() {
	return <Hello name="React" />;
}`}</pre>
									</Card.Body>
								</Card>

								<div className="chapter-callout">
									<Alert variant="info" className="mb-0">
										Bon réflexe : crée d’abord un composant simple et réutilisable, puis rends-le “configurable” avec des props.
									</Alert>
								</div>
							</Card.Body>
						</Card>
					</div>

					{/* Navigation (uniformisée) */}
					<nav className="chapter-navigation">
						<Link className="btn-prev" to="/coursEtTutos/reactjs/introduction">
							← Chapitre précédent : Introduction
						</Link>

						<Link className="btn-next" to="/coursEtTutos/reactjs/sommaire">
							Retour Sommaire ReactJS →
						</Link>
					</nav>
				</section>
			</Container>
		</main>
	)
}