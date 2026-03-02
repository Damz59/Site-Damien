// Chapitre_ReactJs_JSX_Et_Composants.jsx
import { Container, Card, Badge, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banniere from "../../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

export default function Chapitre_ReactJs_JSX_Et_Composants({ authUser }) {
	// UI guard (normalement déjà protégé par ProtectedRoute)
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">ReactJS — JSX et composants</h1>
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
					<h1 className="mb-0">ReactJS — JSX et composants</h1>
					<Badge bg="primary">Chapitre 2</Badge>
				</div>

				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>JSX</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
							<li>
								Le JSX ressemble à du HTML, mais c’est du JavaScript (transformé à la build).
							</li>
							<li>
								Tu peux utiliser des expressions JS avec <code>{"{...}"}</code>.
							</li>
							<li>
								Attributs spéciaux : <code>className</code>, <code>htmlFor</code>, etc.
							</li>
						</ul>

						<Card className="mt-3">
							<Card.Body>
								<pre className="mb-0">
{`const name = "Damien";

return (
  <h2 className="text-primary">
    Bonjour {name}
  </h2>
);`}
								</pre>
							</Card.Body>
						</Card>
					</Card.Body>
				</Card>

				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>Composants</strong>
					</Card.Header>
					<Card.Body>
						<ul className="mb-0">
							<li>Un composant = une fonction qui retourne du JSX.</li>
							<li>
								Les composants se composent entre eux : un composant parent rend des composants enfants.
							</li>
							<li>
								On peut passer des données via les <strong>props</strong>.
							</li>
						</ul>

						<Card className="mt-3">
							<Card.Body>
								<pre className="mb-0">
{`function Hello({ name }) {
  return <p>Salut {name}</p>;
}

export default function App() {
  return <Hello name="React" />;
}`}
								</pre>
							</Card.Body>
						</Card>
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