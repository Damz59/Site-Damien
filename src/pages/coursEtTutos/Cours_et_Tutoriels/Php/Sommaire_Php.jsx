// Sommaire_Php.jsx
import { Container, Card, ListGroup, Badge, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import Banniere from "../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"
import "./Sommaire_Php.css"

export default function Sommaire_Php({ authUser }) {
	return (
		<main className="flex-grow-1 overflow-auto page-content">
			<Banniere />

			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-4 sommaire-php">
				{/* Header “chapitre-style” */}
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">PHP — Sommaire</h1>
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
							{/* Tu peux garder ce header Bootstrap, ou le retirer si tu préfères plus “chapitre-style” */}
							<Card.Header className="bg-primary text-white">
								<strong>Liste</strong>
							</Card.Header>

							<ListGroup variant="flush">
								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>1. Introduction</span>
									<Button
										as={Link}
										to="/coursEtTutos/php/introduction"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>2. Variables et types</span>
									<Button
										as={Link}
										to="/coursEtTutos/php/variables-et-types"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>3. Conditions et boucles</span>
									<Button
										as={Link}
										to="/coursEtTutos/php/conditions-et-boucles"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>4. Fonctions</span>
									<Button
										as={Link}
										to="/coursEtTutos/php/fonctions"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span>5. PDO + MySQL</span>
									<Button
										as={Link}
										to="/coursEtTutos/php/pdo-mysql"
										variant="outline-primary"
										size="sm"
									>
										Ouvrir
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>

						{/* Navigation bas (chapitre-style) */}
						<nav className="chapter-navigation">
							<Link className="btn-prev" to="/coursEtTutos">
								← Retour Cours & Tutos
							</Link>
							<Link className="btn-next" to="/coursEtTutos/php/introduction">
								Suivant → Introduction
							</Link>
						</nav>
					</div>
				</section>
			</Container>
		</main>
	)
}