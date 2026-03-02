// CoursEtTutos.jsx
import { useEffect, useState } from "react";
import { Container, Card, Badge, Spinner, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banniere from "../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../components/Banniere_isConnected/Banniere_isConnected.jsx";
import { API_BASE } from "../../config/api";
import "./CoursEtTutos.css";

export default function CoursEtTutos({ authUser }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		// Accès uniquement si connecté
		if (!authUser) {
			setLoading(false);
			setError(null);
			setCategories([]);
			return;
		}

		const run = async () => {
			setLoading(true);
			setError(null);

			try {
				const res = await fetch(`${API_BASE}/coursEtTutos-categories.php`, {
					credentials: "include",
				});
				const data = await res.json();

				if (!res.ok || !data.success) {
					throw new Error(data.error || "Erreur chargement cours & tutoriels");
				}

				setCategories(data.categories || []);
			} catch (e) {
				setError(e?.message || "Erreur chargement catégories");
			} finally {
				setLoading(false);
			}
		};

		run();
	}, [authUser]);

	// UI guard si pas connecté
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Cours & Tutoriels</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder aux cours et tutoriels.
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
				<h1 className="mb-4">Cours & Tutoriels</h1>

				{loading && (
					<div className="text-center my-3">
						<Spinner />
					</div>
				)}

				{error && <Alert variant="danger">{error}</Alert>}

				{!loading && !error && categories.length === 0 && (
					<p className="text-muted">Aucune catégorie active pour le moment.</p>
				)}

				{!loading &&
					!error &&
					categories.map((c) => {
						const items = (c.items || []).filter((it) => Number(it.active) === 1);

						return (
							<Card key={c.id} className="shadow-sm mb-4">
								<Card.Header className="bg-primary text-white d-flex align-items-center justify-content-between">
									<div className="fw-bold">{c.name}</div>
									<Badge bg="light" text="dark">
										{items.length}
									</Badge>
								</Card.Header>

								<Card.Body>
									{items.length === 0 ? (
										<p className="text-muted mb-0">Aucun cours dans cette catégorie.</p>
									) : (
										<Row className="g-3">
											{items.map((it) => {
												// ✅ Routes protégées vers les sommaires
												const to =
													it.slug === "reactjs"
														? "/coursEtTutos/reactjs/sommaire"
														: it.slug === "php"
															? "/coursEtTutos/php/sommaire"
															: `/coursEtTutos/${it.slug}`;

												return (
													<Col key={it.id} xs={12} md={6} lg={4}>
														<Card
															as={Link}
															to={to}
															className="h-100 shadow-sm text-decoration-none cet-course-card"
														>
															<Card.Header className="bg-primary text-white text-center py-2">
																<strong>Cours</strong>
															</Card.Header>

															<Card.Body className="d-flex flex-column align-items-center justify-content-center">
																{it.image_url ? (
																	<img
																		className="cet-course-logo"
																		src={it.image_url}
																		alt={`Logo ${it.title}`}
																	/>
																) : null}

																{it.short_desc ? (
																	<p className="text-muted text-center mt-3 mb-0">
																		{it.short_desc}
																	</p>
																) : null}
															</Card.Body>

															<Card.Footer className="text-center fw-bold">
																{it.title}
															</Card.Footer>
														</Card>
													</Col>
												);
											})}
										</Row>
									)}
								</Card.Body>
							</Card>
						);
					})}
			</Container>
		</main>
	);
}