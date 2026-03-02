import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import Section from "../../components/Section/Section.jsx";
import Banniere from "../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../components/Banniere_isConnected/Banniere_isConnected";
import "./Projets_style.css";

function Projets({ authUser }) {
	return (
		<main className="flex-grow-1 overflow-auto">
			<Banniere />

			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-5">
				<Row>
					<Col lg={9}>
						<h1 className="display-3 border-bottom border-1 border-dark pb-2 d-inline-block mb-4">
							Mes Projets
						</h1>

						<Row className="g-4">
							<Col md={6}>
								<Card className="h-100 shadow-sm">
									<Card.Body>
										<Card.Title className="h4">🌐 Site personnel (full-stack)</Card.Title>
										<Card.Text className="text-muted">
											Site React (Vite) déployé sur Raspberry Pi avec Apache et SSL (Let’s Encrypt),
											DuckDNS, API PHP et espace membre (inscription, connexion, déconnexion, rôles).
										</Card.Text>

										<div className="mb-3">
											<Badge bg="info" className="me-1 mb-1">
												React
											</Badge>
											<Badge bg="info" className="me-1 mb-1">
												Vite
											</Badge>
											<Badge bg="info" className="me-1 mb-1">
												PHP API
											</Badge>
											<Badge bg="info" className="me-1 mb-1">
												Apache
											</Badge>
											<Badge bg="info" className="me-1 mb-1">
												SSL
											</Badge>
										</div>

										<a
											href="https://damienvdh59250.duckdns.org/"
											target="_blank"
											rel="noopener noreferrer"
											className="btn btn-primary btn-sm"
										>
											Voir le site
										</a>
									</Card.Body>
								</Card>
							</Col>

							<Col md={6}>
								<Card className="h-100 shadow-sm">
									<Card.Body>
										<Card.Title className="h4">🔒 Infrastructure serveur</Card.Title>
										<Card.Text className="text-muted">
											Configuration et exploitation du serveur : VirtualHosts Apache (HTTP/HTTPS),
											gestion SSL Let’s Encrypt, routage SPA React + API PHP via Alias, et déploiement
											front/API en évitant d’écraser le dossier <code>api/</code>.
										</Card.Text>

										<div className="mb-3">
											<Badge bg="success" className="me-1 mb-1">
												Linux
											</Badge>
											<Badge bg="success" className="me-1 mb-1">
												Apache
											</Badge>
											<Badge bg="success" className="me-1 mb-1">
												Let’s Encrypt
											</Badge>
											<Badge bg="success" className="me-1 mb-1">
												DuckDNS
											</Badge>
										</div>
									</Card.Body>
								</Card>
							</Col>

							<Col md={6}>
								<Card className="h-100 shadow-sm">
									<Card.Body>
										<Card.Title className="h4">📱 Application web (modules)</Card.Title>
										<Card.Text className="text-muted">
											Interface responsive avec React Bootstrap et modules complets : Administration
											(utilisateurs, messages, news), et Cours & Tutoriels (catégories, cours, chapitres).
										</Card.Text>

										<div className="mb-3">
											<Badge bg="primary" className="me-1 mb-1">
												React
											</Badge>
											<Badge bg="primary" className="me-1 mb-1">
												React Bootstrap
											</Badge>
											<Badge bg="primary" className="me-1 mb-1">
												React Router
											</Badge>
											<Badge bg="warning" text="dark" className="me-1 mb-1">
												En cours
											</Badge>
										</div>
									</Card.Body>
								</Card>
							</Col>

							<Col md={6}>
								<Card className="h-100 shadow-sm">
									<Card.Body>
										<Card.Title className="h4">🗄️ Base de données</Card.Title>
										<Card.Text className="text-muted">
											Base relationnelle MariaDB + phpMyAdmin. Modélisation des données pour les
											utilisateurs et pour le module Cours & Tutoriels (catégories, items, chapitres),
											avec contraintes d’unicité et relations.
										</Card.Text>

										<div className="mb-3">
											<Badge bg="info" className="me-1 mb-1">
												MariaDB
											</Badge>
											<Badge bg="info" className="me-1 mb-1">
												MySQL
											</Badge>
											<Badge bg="info" className="me-1 mb-1">
												phpMyAdmin
											</Badge>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>

					<Col lg={3}>
						<Section />
					</Col>
				</Row>
			</Container>
		</main>
	);
}

export default Projets;