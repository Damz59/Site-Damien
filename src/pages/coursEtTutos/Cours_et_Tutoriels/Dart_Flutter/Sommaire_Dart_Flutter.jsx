// Sommaire_Dart_Flutter.jsx
import { Container, Card, ListGroup, Badge, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import Banniere from "../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"
import "./Sommaire_Dart_Flutter.css"

export default function Sommaire_Dart_Flutter({ authUser }) {
	return (
		<main className="flex-grow-1 overflow-auto page-content">
			<Banniere />

			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-4 sommaire-dartflutter">
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">Dart / Flutter — Sommaire</h1>
							<p className="chapter-subtitle mb-0">
								Choisis un chapitre pour démarrer le cours.
							</p>
						</div>
						<Badge bg="light" text="dark">
							Cours
						</Badge>
					</div>
				</header>

				<section className="chapter-card">
					<div className="chapter-section">
						<h2 className="section-title">Chapitres</h2>

						<Card className="shadow-sm mb-0">
							<Card.Header className="bg-primary text-white">
								<strong>Liste</strong>
							</Card.Header>

							<ListGroup variant="flush">
								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>1. Flutter — Chapitre 1 : Qu’est-ce que Flutter ?</span>
									<Button
										as={Link}
										to="/coursEtTutos/dart_flutter/flutter_chapitre_1"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>2. Flutter — Chapitre 2 : Installation & premier projet</span>
									<Button
										as={Link}
										to="/coursEtTutos/dart_flutter/flutter_chapitre_2"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>3. Dart — Chapitre 3 : première app (CLI)</span>
									<Button
										as={Link}
										to="/coursEtTutos/dart_flutter/dart_chapitre_3"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>

						<nav className="chapter-navigation">
							<Link className="btn-prev" to="/coursEtTutos">
								← Retour Cours & Tutos
							</Link>
							<Link className="btn-next" to="/coursEtTutos/dart_flutter/flutter_chapitre_1">
								Suivant → Chapitre 01
							</Link>
						</nav>
					</div>
				</section>
			</Container>
		</main>
	)
}