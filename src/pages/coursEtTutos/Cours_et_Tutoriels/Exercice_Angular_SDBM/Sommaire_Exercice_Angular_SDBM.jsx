// Sommaire_Exercice_Angular_SDBM.jsx

import { useEffect, useMemo, useState } from "react";
import { Container, Card, ListGroup, Badge, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";
import { API_BASE } from "../../../../config/api.js";

export default function Sommaire_Exercice_Angular_SDBM({ authUser }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [chapters, setChapters] = useState([]);

	// ✅ slug qui doit correspondre EXACTEMENT à la BDD
	const courseSlug = "angular-sdbm";

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
					}
				);

				const data = await res.json();

				if (!res.ok || !data?.success) {
					throw new Error(data?.error || "Erreur chargement sommaire Angular SDBM");
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
			(a, b) => (Number(a.position) || 0) - (Number(b.position) || 0)
		);
	}, [chapters]);

	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Exercice Angular SDBM — Sommaire</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder à ce cours.
					</Alert>
				</Container>
			</main>
		);
	}

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
					<h1 className="mb-0">Exercice Angular SDBM — Sommaire</h1>
					<Badge bg="primary">Cours</Badge>
				</div>

				{loading && (
					<div className="text-center my-3">
						<Spinner />
					</div>
				)}

				{error && <Alert variant="danger">{error}</Alert>}

				{!loading && !error && (
					<Card className="shadow-sm mb-4">
						<Card.Header className="bg-primary text-white">
							<strong>Chapitres</strong>
						</Card.Header>

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
					</Card>
				)}

				<Card className="shadow-sm">
					<Card.Body className="d-flex gap-2 flex-wrap">
						<Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos">
							← Retour Cours &amp; Tutos
						</Link>

						<Link
							className="btn btn-outline-secondary btn-sm"
							to={`/coursEtTutos/${courseSlug}`}
						>
							← Retour Exercice Angular SDBM
						</Link>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}