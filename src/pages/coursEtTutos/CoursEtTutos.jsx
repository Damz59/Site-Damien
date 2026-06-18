// CoursEtTutos.jsx
import { useEffect, useState } from "react"
import { Container, Card, Badge, Spinner, Alert, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import Banniere from "../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../components/Banniere_isConnected/Banniere_isConnected.jsx"
import { API_BASE } from "../../config/api"
import "./CoursEtTutos.css"

export default function CoursEtTutos({ authUser }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [categories, setCategories] = useState([])

	useEffect(() => {
		// Accès uniquement si connecté
		if (!authUser) {
			setLoading(false)
			setError(null)
			setCategories([])
			return
		}

		const run = async () => {
			setLoading(true)
			setError(null)

			try {
				const res = await fetch(`${API_BASE}/coursEtTutos-categories.php`, {
					credentials: "include",
				})
				const data = await res.json()

				if (!res.ok || !data?.success) {
					throw new Error(data?.error || "Erreur chargement cours & tutoriels")
				}

				setCategories(data?.categories || [])
			} catch (e) {
				setError(e?.message || "Erreur chargement catégories")
			} finally {
				setLoading(false)
			}
		}

		run()
	}, [authUser])

	// UI guard si pas connecté
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Cours & Tutoriels</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté pour accéder aux cours et tutoriels.
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
				{/* Header (style chapitres) */}
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">Cours & Tutoriels</h1>
							<p className="chapter-subtitle mb-0">Choisis une catégorie, puis un cours (sommaire).</p>
						</div>
						<Badge bg="light" text="dark">
							Accueil
						</Badge>
					</div>
				</header>

				{/* Contenu principal */}
				<section className="chapter-card">
					{/* Loading */}
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

					{/* Error */}
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

					{/* Empty */}
					{!loading && !error && categories.length === 0 && (
						<div className="chapter-section">
							<h2 className="section-title">Infos</h2>
							<Card className="shadow-sm">
								<Card.Body>
									<p className="text-muted mb-0">Aucune catégorie active pour le moment.</p>
								</Card.Body>
							</Card>
						</div>
					)}

					{/* Catégories */}
					{!loading &&
						!error &&
						categories.map((c) => {
							const items = (c.items || []).filter((it) => Number(it.active) === 1)

							return (
								<div key={c.id} className="chapter-section">
									<h2 className="section-title">
										{c.name}{" "}
										<Badge bg="light" text="dark">
											{items.length}
										</Badge>
									</h2>

									{items.length === 0 ? (
										<Card className="shadow-sm">
											<Card.Body>
												<p className="text-muted mb-0">Aucun cours dans cette catégorie.</p>
											</Card.Body>
										</Card>
									) : (
										<Row className="g-3">
											{items.map((it) => {
												const to =
													it.slug === "reactjs"
														? "/coursEtTutos/reactjs/sommaire"
														: it.slug === "php"
															? "/coursEtTutos/php/sommaire"
															: it.slug === "dart-flutter"
																? "/coursEtTutos/dart_flutter/sommaire"
																: it.slug === "java_sdbm"
																	? "/coursEtTutos/java_sdbm/sommaire"
																	: `/coursEtTutos/${it.slug}`

												return (
													<Col key={it.id} xs={12} md={6} lg={4}>
														<Card
															as={Link}
															to={to}
															className="cet-course-card h-100 text-decoration-none"
														>
															{/* Si tu as gardé cet ancien header bootstrap, ça marche aussi,
																mais si tu veux le look chapitres : utilise plutôt <div className="cet-course-top"> */}
															<div className="cet-course-top">Cours</div>

															<Card.Body className="d-flex flex-column align-items-center justify-content-center">
																{it.image_url ? (
																	<img
																		className="cet-course-logo"
																		src={it.image_url}
																		alt={`Logo ${it.title}`}
																	/>
																) : null}

																{it.short_desc ? (
																	<p className="text-muted text-center mt-3 mb-0">{it.short_desc}</p>
																) : null}
															</Card.Body>

															<div className="cet-course-footer">{it.title}</div>
														</Card>
													</Col>
												)
											})}
										</Row>
									)}
								</div>
							)
						})}

					{/* Navigation bas de page */}
					<nav className="chapter-navigation">
						<Link className="btn-prev" to="/">
							← Accueil
						</Link>
						<Link className="btn-next" to="/coursEtTutos/reactjs/sommaire">
							Suivant → ReactJS
						</Link>
					</nav>
				</section>
			</Container>
		</main>
	)
}