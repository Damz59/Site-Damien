import { useEffect, useMemo, useState } from "react"
import { Container, Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap"
import Section from "../../components/Section/Section.jsx"
import Banniere from "../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../components/Banniere_isConnected/Banniere_isConnected.jsx"
import { API_BASE } from "../../config/api"
import "./CVCompetences_style.css"

async function fetchSections() {
	const res = await fetch(`${API_BASE}/cv-sections.php`)
	const raw = await res.text()

	if (!res.ok) throw new Error(`HTTP ${res.status} : ${raw.slice(0, 160)}...`)

	let data
	try {
		data = JSON.parse(raw)
	} catch {
		throw new Error(`Réponse non-JSON : ${raw.slice(0, 160)}...`)
	}

	if (!data.success) throw new Error(data.error || "Erreur chargement sections")

	return (data.sections || []).map((s) => ({
		key: s.section, // clé technique
		title: s.label || s.section, // label affiché
	}))
}

async function fetchSectionItems(sectionKey) {
	const res = await fetch(
		`${API_BASE}/cv.php?section=${encodeURIComponent(sectionKey)}`,
	)
	const raw = await res.text()

	if (!res.ok) {
		throw new Error(`HTTP ${res.status} : ${raw.slice(0, 160)}...`)
	}

	let data
	try {
		data = JSON.parse(raw)
	} catch {
		throw new Error(`Réponse non-JSON : ${raw.slice(0, 160)}...`)
	}

	if (!data.success) throw new Error(data.error || "Erreur chargement")

	return {
		sectionActive: Number(data.sectionActive ?? 1),
		items: data.items || [],
	}
}

export default function CVCompetences({ authUser }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [sections, setSections] = useState([]) // [{key,title}]
	const [data, setData] = useState({}) // { sectionKey: { sectionActive, items } }

	useEffect(() => {
		let cancelled = false

		const run = async () => {
			setLoading(true)
			setError(null)

			try {
				const secs = await fetchSections()
				if (cancelled) return

				setSections(secs)

				const results = {}
				for (const s of secs) {
					// eslint-disable-next-line no-await-in-loop
					results[s.key] = await fetchSectionItems(s.key)
				}

				if (!cancelled) setData(results)
			} catch (e) {
				if (!cancelled) setError(e.message || "Erreur chargement CV")
			} finally {
				if (!cancelled) setLoading(false)
			}
		}

		run()

		return () => {
			cancelled = true
		}
	}, [])

	const visibleSections = useMemo(() => {
		return sections.filter((s) => {
			const sectionData = data[s.key] || { sectionActive: 1, items: [] }
			return sectionData.sectionActive === 1
		})
	}, [sections, data])

	return (
		<main className="page-content flex-grow-1 overflow-auto">
			<Banniere />

			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-5">
				<Row>
					<Col lg={9}>
						<h1 className="cv-title pb-2 d-inline-block mb-4">
							CV / Compétences
						</h1>

						{loading && (
							<div className="cv-loading text-center my-4">
								<Spinner />
							</div>
						)}

						{error && (
							<Alert variant="danger" className="cv-error my-3">
								{error}
							</Alert>
						)}

						{!loading && !error && (
							<div className="d-flex flex-column gap-3">
								{visibleSections.length === 0 ? (
									<Card className="cv-section-card">
										<Card.Body>
											<p className="cv-empty mb-0">
												Aucune section active pour le moment.
											</p>
										</Card.Body>
									</Card>
								) : (
									visibleSections.map((s) => {
										const sectionData = data[s.key] || {
											sectionActive: 1,
											items: [],
										}
										const items = sectionData.items || []

										return (
											<Card key={s.key} className="cv-section-card">
												<Card.Body>
													<div className="cv-section-header">
														<Card.Title className="cv-section-title mb-0">
															{s.title}
														</Card.Title>

														<Badge bg="secondary" className="cv-count-badge">
															{items.length}
														</Badge>
													</div>

													<hr className="cv-divider" />

													{items.length === 0 ? (
														<p className="cv-empty mb-0">
															Aucun élément pour le moment. (On complètera
															ensemble plus tard.)
														</p>
													) : (
														<ul className="cv-list mb-0">
															{items.map((it) => (
																<li key={it.id}>
																	{it.text}
																	{it.description ? (
																		<div className="small text-muted cv-item-desc">
																			{it.description}
																		</div>
																	) : null}
																</li>
															))}
														</ul>
													)}
												</Card.Body>
											</Card>
										)
									})
								)}
							</div>
						)}
					</Col>

					<Col lg={3}>
						<Section />
					</Col>
				</Row>
			</Container>
		</main>
	)
}