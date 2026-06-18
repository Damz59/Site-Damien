// Sommaire_Python.jsx
import { useEffect, useMemo, useState } from "react";
import { Container, Card, ListGroup, Badge, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";
import { API_BASE } from "../../../../config/api.js";

import "./Sommaire_Python.css";

export default function Sommaire_Python({ authUser }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [chapters, setChapters] = useState([]);

	// ✅ slug BDD confirmé
	const courseSlug = "base-python";

	// UI guard si pas connecté
	useEffect(() => {
		if (!authUser) {
			setLoading(false);
			setError(null);
			setChapters([]);
		}
	}, [authUser]);

	useEffect(() => {
		if (!authUser) return;

		const controller = new AbortController();

		const run = async () => {
			setLoading(true);
			setError(null);

			try {
				const res = await fetch(
					`${API_BASE}/coursEtTutos-chapters.php?course_slug=${encodeURIComponent(courseSlug)}`,
					{
						credentials: "include",
						signal: controller.signal,
					},
				);

				const data = await res.json();

				if (!res.ok || !data?.success) {
					throw new Error(data?.error || "Erreur chargement sommaire Python");
				}

				setChapters(Array.isArray(data.chapters) ? data.chapters : []);
			} catch (e) {
				if (e.name !== "AbortError") {
					setError(e?.message || "Erreur chargement chapitres");
				}
			} finally {
				setLoading(false);
			}
		};

		run();
		return () => controller.abort();
	}, [authUser, courseSlug]);

	const sorted = useMemo(() => {
		return [...chapters].sort(
			(a, b) => (Number(a.position) || 0) - (Number(b.position) || 0),
		);
	}, [chapters]);

	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Python — Sommaire</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder à ce cours.
					</Alert>
				</Container>
			</main>
		);
	}

	return (
		<main className="flex-grow-1 overflow-auto page-content">
			<Banniere />
			<div className="mt-3">
				<BanniereIsConnected authUser={authUser} />
			</div>

			<Container className="my-4">
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">Python — Sommaire</h1>
							<p className="chapter-subtitle mb-0">
								Sélectionne un chapitre pour commencer (ou reprendre) le cours.
							</p>
						</div>
						<Badge bg="light" text="dark">
							Cours
						</Badge>
					</div>
				</header>

				<section className="chapter-card">
					{loading && (
						<div className="chapter-section">
							<h2 className="section-title">Chargement</h2>
							<Card className="shadow-sm">
								<Card.Body className="text-center">
									<Spinner />
								</Card.Body>
							</Card>
						</div>
					)}

					{!loading && error && (
						<div className="chapter-section">
							<h2 className="section-title">Erreur</h2>
							<Card className="shadow-sm">
								<Card.Body>
									<Alert variant="danger" className="mb-0">
										{error}
									</Alert>
								</Card.Body>
							</Card>
						</div>
					)}

					{!loading && !error && (
						<div className="chapter-section">
							<h2 className="section-title">Chapitres</h2>
							<Card className="shadow-sm">
								<Card.Body className="p-0">
									<ListGroup variant="flush">
										{sorted.length === 0 ? (
											<ListGroup.Item className="text-muted">
												Aucun chapitre actif pour le moment.
											</ListGroup.Item>
										) : (
											sorted.map((ch, idx) => {
												const number = idx + 1;
												const to = `/coursEtTutos/${courseSlug}/${ch.slug}`;

												return (
													<ListGroup.Item
														key={ch.id ?? ch.slug}
														className="d-flex justify-content-between align-items-center"
													>
														<span>
															{number}. {ch.title}
														</span>
														<Link className="btn btn-outline-primary btn-sm" to={to}>
															Ouvrir
														</Link>
													</ListGroup.Item>
												);
											})
										)}
									</ListGroup>
								</Card.Body>
							</Card>
						</div>
					)}

					<nav className="chapter-navigation">
						<Link className="btn-prev" to="/coursEtTutos">
							← Retour Cours & Tutos
						</Link>

						{sorted.length > 0 ? (
							<Link
								className="btn-next"
								to={`/coursEtTutos/${courseSlug}/${sorted[0].slug}`}
							>
								Commencer → Chapitre 1
							</Link>
						) : (
							// safe: retourne au sommaire (pas à /base-python “nu”)
							<Link className="btn-next" to={`/coursEtTutos/${courseSlug}/sommaire`}>
								Actualiser →
							</Link>
						)}
					</nav>
				</section>
			</Container>
		</main>
	);
}