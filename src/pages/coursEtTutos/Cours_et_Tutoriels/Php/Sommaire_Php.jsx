// Sommaire_Php.jsx

import { Container, Card, ListGroup, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

export default function Sommaire_Php({ authUser }) {
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
					<h1 className="mb-0">PHP — Sommaire</h1>
					<Badge bg="primary">Cours</Badge>
				</div>

				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>Chapitres</strong>
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

				<Card className="shadow-sm">
					<Card.Body>
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos">
							← Retour Cours & Tutos
						</Link>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}