import { useEffect, useMemo, useState } from "react";
import { Container, Card, Spinner, Alert, Badge, Button } from "react-bootstrap";

import Banniere from "../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../components/Banniere_isConnected/Banniere_isConnected.jsx";

import AdminCVManager from "./AdminCVManager.jsx";
import AdminSectionsManager from "./AdminSectionsManager.jsx";

import { API_BASE } from "../../config/api";

// --------- API helpers
async function fetchSectionsAdmin() {
	const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
		credentials: "include",
	});

	const raw = await res.text();
	if (!res.ok) throw new Error(`HTTP ${res.status} : ${raw.slice(0, 160)}...`);

	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		throw new Error(`Réponse non-JSON : ${raw.slice(0, 160)}...`);
	}

	if (!data.success) throw new Error(data.error || "Erreur chargement sections");
	return data.sections || [];
}

async function fetchSectionPublic(sectionKey) {
	const res = await fetch(`${API_BASE}/cv.php?section=${encodeURIComponent(sectionKey)}`);
	const raw = await res.text();
	if (!res.ok) throw new Error(`HTTP ${res.status} : ${raw.slice(0, 160)}...`);

	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		throw new Error(`Réponse non-JSON : ${raw.slice(0, 160)}...`);
	}

	if (!data.success) throw new Error(data.error || "Erreur chargement");
	return {
		sectionActive: Number(data.sectionActive ?? 1),
		items: data.items || [],
	};
}

// --------- Preview component (dépend des sections dynamiques)
function AdminCVPublicPreview({ refreshKey, sections }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	// { sectionKey: { sectionActive, items } }
	const [data, setData] = useState({});

	useEffect(() => {
		let cancelled = false;

		const run = async () => {
			setLoading(true);
			setError(null);

			try {
				const results = {};
				for (const s of sections) {
					// eslint-disable-next-line no-await-in-loop
					results[s.section] = await fetchSectionPublic(s.section);
				}
				if (!cancelled) setData(results);
			} catch (e) {
				if (!cancelled) setError(e.message || "Erreur chargement aperçu");
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		if (sections.length > 0) run();
		else {
			setLoading(false);
			setData({});
		}

		return () => {
			cancelled = true;
		};
	}, [refreshKey, sections]);

	const visibleSections = useMemo(() => {
		return sections.filter((s) => {
			const sectionData = data[s.section] || { sectionActive: 1, items: [] };
			return sectionData.sectionActive === 1;
		});
	}, [sections, data]);

	return (
		<Card className="shadow-sm">
			<Card.Body>
				<div className="d-flex align-items-center justify-content-between gap-2">
					<h2 className="h4 mb-0">Aperçu public (comme la page CV / Compétences)</h2>
					<Badge bg="secondary">Live</Badge>
				</div>

				<hr className="my-3" />

				{loading && (
					<div className="text-center my-3">
						<Spinner />
					</div>
				)}

				{error && (
					<Alert variant="danger" className="my-3">
						{error}
					</Alert>
				)}

				{!loading && !error && (
					<div className="d-flex flex-column gap-3">
						{visibleSections.length === 0 ? (
							<Card className="shadow-sm">
								<Card.Body>
									<p className="text-muted mb-0">Aucune section active pour le moment.</p>
								</Card.Body>
							</Card>
						) : (
							visibleSections.map((s) => {
								const sectionData = data[s.section] || { sectionActive: 1, items: [] };
								const items = sectionData.items || [];

								return (
									<Card key={s.section} className="shadow-sm">
										<Card.Body>
											<div className="d-flex align-items-center justify-content-between gap-2">
												<Card.Title className="h5 mb-0">{s.label || s.section}</Card.Title>
												<Badge bg="secondary">{items.length}</Badge>
											</div>

											<hr className="my-3" />

											{items.length === 0 ? (
												<p className="text-muted mb-0">Aucun élément pour le moment.</p>
											) : (
												<ul className="mb-0">
													{items.map((it) => (
														<li key={it.id}>
															{it.text}
															{it.description ? (
																<div className="small text-muted">{it.description}</div>
															) : null}
														</li>
													))}
												</ul>
											)}
										</Card.Body>
									</Card>
								);
							})
						)}
					</div>
				)}
			</Card.Body>
		</Card>
	);
}

export default function Admin_CVCompetences({ authUser }) {
	const [refreshKey, setRefreshKey] = useState(0);

	const [sectionsLoading, setSectionsLoading] = useState(true);
	const [sectionsError, setSectionsError] = useState(null);
	const [sections, setSections] = useState([]);

	const reloadSections = async () => {
		setSectionsLoading(true);
		setSectionsError(null);

		try {
			const rows = await fetchSectionsAdmin();
			setSections(rows);
		} catch (e) {
			setSectionsError(e.message || "Erreur chargement sections");
		} finally {
			setSectionsLoading(false);
		}
	};

	useEffect(() => {
		reloadSections();
	}, []);

	return (
		<main className="flex-grow-1 overflow-auto">
			<Banniere />

			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-5">
				<h1 className="mb-4">Administration — CV / Compétences</h1>

				<AdminSectionsManager
					refreshAll={() => {
						reloadSections();
						setRefreshKey((k) => k + 1);
					}}
				/>

				<AdminCVManager />

				<div className="d-flex justify-content-end gap-2 mb-2">
					<Button variant="outline-secondary" size="sm" onClick={reloadSections}>
						Recharger les sections
					</Button>

					<Button variant="outline-secondary" size="sm" onClick={() => setRefreshKey((k) => k + 1)}>
						Recharger l’aperçu
					</Button>
				</div>

				{sectionsLoading && (
					<div className="text-center my-3">
						<Spinner />
					</div>
				)}

				{sectionsError && <Alert variant="danger">{sectionsError}</Alert>}

				{!sectionsLoading && !sectionsError && (
					<AdminCVPublicPreview refreshKey={refreshKey} sections={sections} />
				)}
			</Container>
		</main>
	);
}