// Sommaire_Dart_Flutter.jsx
import { Container, Card, ListGroup, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

export default function Sommaire_Dart_Flutter({ authUser }) {
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
					<h1 className="mb-0">Dart / Flutter — Sommaire</h1>
					<Badge bg="primary">Cours</Badge>
				</div>

				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white">
						<strong>Chapitres</strong>
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

				<Card className="shadow-sm">
					<Card.Body className="d-flex gap-2 flex-wrap">
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos">
							← Retour Cours &amp; Tutos
						</Link>

						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos/dart_flutter">
							← Retour Dart / Flutter
						</Link>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}