// Admin_Sommaire_Python.jsx
import { useEffect, useMemo, useState } from "react";
import {
	Container,
	Card,
	Badge,
	Spinner,
	Alert,
	Table,
	Button,
	Form,
	Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";
import { API_BASE } from "../../../../config/api.js";

import "./Admin_Sommaire_Python.css";

export default function Admin_Sommaire_Python({ authUser }) {
	// ✅ slug BDD confirmé
	const courseSlug = "base-python";

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);
	const [chapters, setChapters] = useState([]);

	// Modal (create/edit)
	const [showModal, setShowModal] = useState(false);
	const [editing, setEditing] = useState(null); // chapter object or null
	const [form, setForm] = useState({
		title: "",
		slug: "",
		position: 0,
		active: true,
	});

	const sorted = useMemo(() => {
		return [...chapters].sort(
			(a, b) => (Number(a.position) || 0) - (Number(b.position) || 0),
		);
	}, [chapters]);

	const resetForm = () => {
		setForm({ title: "", slug: "", position: 0, active: true });
		setEditing(null);
	};

	const openCreate = () => {
		resetForm();
		const nextPos =
			sorted.length > 0
				? (Number(sorted[sorted.length - 1].position) || 0) + 1
				: 1;
		setForm((f) => ({ ...f, position: nextPos }));
		setShowModal(true);
	};

	const openEdit = (ch) => {
		setEditing(ch);
		setForm({
			title: ch.title ?? "",
			slug: ch.slug ?? "",
			position: Number(ch.position) || 0,
			active: Number(ch.active) === 1 || ch.active === true,
		});
		setShowModal(true);
	};

	const fetchChapters = async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch(
				`${API_BASE}/coursEtTutos-chapters-admin.php?course_slug=${encodeURIComponent(courseSlug)}`,
				{ credentials: "include" },
			);

			const data = await res.json();

			if (!res.ok || !data?.success) {
				throw new Error(data?.error || "Erreur chargement chapitres (admin)");
			}

			setChapters(Array.isArray(data.chapters) ? data.chapters : []);
		} catch (e) {
			setError(e?.message || "Erreur chargement chapitres");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!authUser) {
			setLoading(false);
			setError(null);
			setChapters([]);
			return;
		}
		fetchChapters();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	const saveChapter = async (e) => {
		e.preventDefault();
		setSaving(true);
		setError(null);

		const payload = {
			course_slug: courseSlug,
			title: form.title.trim(),
			slug: form.slug.trim(),
			position: Number(form.position) || 0,
			active: form.active ? 1 : 0,
		};

		if (!payload.title || !payload.slug) {
			setSaving(false);
			setError("Le titre et le slug sont obligatoires.");
			return;
		}

		try {
			const isEdit = Boolean(editing?.id);

			const res = await fetch(`${API_BASE}/coursEtTutos-chapters-admin.php`, {
				method: isEdit ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(isEdit ? { id: editing.id, ...payload } : payload),
			});

			const data = await res.json();

			if (!res.ok || !data?.success) {
				throw new Error(data?.error || "Erreur sauvegarde chapitre");
			}

			setShowModal(false);
			resetForm();
			await fetchChapters();
		} catch (e2) {
			setError(e2?.message || "Erreur sauvegarde");
		} finally {
			setSaving(false);
		}
	};

	const deleteChapter = async (ch) => {
		const ok = window.confirm(`Supprimer le chapitre "${ch.title}" ?`);
		if (!ok) return;

		setSaving(true);
		setError(null);

		try {
			const res = await fetch(
				`${API_BASE}/coursEtTutos-chapters-admin.php?id=${encodeURIComponent(ch.id)}`,
				{
					method: "DELETE",
					credentials: "include",
				},
			);

			const data = await res.json();

			if (!res.ok || !data?.success) {
				throw new Error(data?.error || "Erreur suppression");
			}

			await fetchChapters();
		} catch (e) {
			setError(e?.message || "Erreur suppression");
		} finally {
			setSaving(false);
		}
	};

	const toggleActive = async (ch) => {
		setSaving(true);
		setError(null);

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-chapters-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					id: ch.id,
					course_slug: courseSlug,
					title: ch.title,
					slug: ch.slug,
					position: Number(ch.position) || 0,
					active: Number(ch.active) === 1 ? 0 : 1,
				}),
			});

			const data = await res.json();

			if (!res.ok || !data?.success) {
				throw new Error(data?.error || "Erreur toggle active");
			}

			await fetchChapters();
		} catch (e) {
			setError(e?.message || "Erreur toggle");
		} finally {
			setSaving(false);
		}
	};

	// Réordonner simple: échange des positions avec le voisin (2 PUT)
	const swapPosition = async (idx, direction) => {
		const a = sorted[idx];
		const b = sorted[idx + direction];
		if (!a || !b) return;

		setSaving(true);
		setError(null);

		try {
			const updates = [
				{ ...a, position: Number(b.position) || 0 },
				{ ...b, position: Number(a.position) || 0 },
			];

			for (const ch of updates) {
				const res = await fetch(`${API_BASE}/coursEtTutos-chapters-admin.php`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({
						id: ch.id,
						course_slug: courseSlug,
						title: ch.title,
						slug: ch.slug,
						position: Number(ch.position) || 0,
						active: Number(ch.active) === 1 ? 1 : 0,
					}),
				});

				const data = await res.json();

				if (!res.ok || !data?.success) {
					throw new Error(data?.error || "Erreur réordonnancement");
				}
			}

			await fetchChapters();
		} catch (e) {
			setError(e?.message || "Erreur réordonnancement");
		} finally {
			setSaving(false);
		}
	};

	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto page-content">
				<Banniere />
				<Container className="my-5">
					<h1 className="mb-4">Administration — Python (Sommaire)</h1>
					<Alert variant="warning" className="mb-0">
						Tu dois être connecté.
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

			<Container className="my-4 admin-sommaire-python">
				<header className="chapter-header">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div>
							<h1 className="chapter-title">Administration — Python (Sommaire)</h1>
							<p className="chapter-subtitle mb-0">
								Gère l’ordre, l’activation et les informations des chapitres.
							</p>
						</div>
						<Badge bg="light" text="dark">
							Admin
						</Badge>
					</div>
				</header>

				<section className="chapter-card">
					<div className="chapter-section">
						<h2 className="section-title">Chapitres</h2>

						{(loading || saving) && (
							<div className="text-center my-3">
								<Spinner />
							</div>
						)}

						{error && <Alert variant="danger">{error}</Alert>}

						<Card className="shadow-sm">
							<Card.Header className="admin-sommaire-python__cardHeader">
								<strong>Liste</strong>
								<Button
									variant="primary"
									size="sm"
									onClick={openCreate}
									disabled={saving}
								>
									+ Ajouter un chapitre
								</Button>
							</Card.Header>

							<Card.Body>
								{!loading && sorted.length === 0 ? (
									<p className="text-muted mb-0">Aucun chapitre pour le moment.</p>
								) : (
									<div className="admin-sommaire-python__tableWrap">
										<Table responsive hover className="mb-0 align-middle">
											<thead>
												<tr>
													<th className="admin-sommaire-python__colOrder">Ordre</th>
													<th>Titre</th>
													<th>Slug</th>
													<th className="admin-sommaire-python__colActive">Actif</th>
													<th className="admin-sommaire-python__colActions text-end">
														Actions
													</th>
												</tr>
											</thead>

											<tbody>
												{sorted.map((ch, idx) => (
													<tr key={ch.id ?? ch.slug}>
														<td>
															<div className="admin-sommaire-python__orderBtns">
																<Button
																	variant="outline-secondary"
																	size="sm"
																	disabled={idx === 0 || saving}
																	onClick={() => swapPosition(idx, -1)}
																>
																	↑
																</Button>
																<Button
																	variant="outline-secondary"
																	size="sm"
																	disabled={idx === sorted.length - 1 || saving}
																	onClick={() => swapPosition(idx, +1)}
																>
																	↓
																</Button>
															</div>
														</td>

														<td className="fw-semibold">{ch.title}</td>

														<td>
															<code className="admin-sommaire-python__code">{ch.slug}</code>
														</td>

														<td>
															<Badge
																bg={Number(ch.active) === 1 ? "success" : "secondary"}
															>
																{Number(ch.active) === 1 ? "Oui" : "Non"}
															</Badge>
														</td>

														<td className="text-end">
															<div className="admin-sommaire-python__actions">
																<Button
																	variant="outline-success"
																	size="sm"
																	disabled={saving}
																	onClick={() => toggleActive(ch)}
																>
																	{Number(ch.active) === 1
																		? "Désactiver"
																		: "Activer"}
																</Button>

																<Button
																	variant="outline-primary"
																	size="sm"
																	disabled={saving}
																	onClick={() => openEdit(ch)}
																>
																	Éditer
																</Button>

																<Button
																	variant="outline-danger"
																	size="sm"
																	disabled={saving}
																	onClick={() => deleteChapter(ch)}
																>
																	Supprimer
																</Button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</Table>
									</div>
								)}
							</Card.Body>
						</Card>

						<nav className="chapter-navigation">
							<Link className="btn-prev" to="/admin/coursEtTutos">
								← Administration Cours & Tutos
							</Link>
						</nav>
					</div>
				</section>
			</Container>

			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{editing ? "Modifier le chapitre" : "Ajouter un chapitre"}
					</Modal.Title>
				</Modal.Header>

				<Form onSubmit={saveChapter}>
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Label>Titre</Form.Label>
							<Form.Control
								value={form.title}
								onChange={(e) =>
									setForm((f) => ({ ...f, title: e.target.value }))
								}
								placeholder="Ex: Environnement Python"
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Slug (pour l’URL)</Form.Label>
							<Form.Control
								value={form.slug}
								onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
								placeholder="Ex: environnement-python"
								required
							/>
							<Form.Text className="text-muted">
								Minuscules + tirets. Exemple : <code>variables-types</code>
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Position</Form.Label>
							<Form.Control
								type="number"
								value={form.position}
								onChange={(e) =>
									setForm((f) => ({ ...f, position: e.target.value }))
								}
							/>
						</Form.Group>

						<Form.Check
							type="switch"
							id="active-switch"
							label="Actif"
							checked={form.active}
							onChange={(e) =>
								setForm((f) => ({ ...f, active: e.target.checked }))
							}
						/>
					</Modal.Body>

					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowModal(false)}
							disabled={saving}
						>
							Annuler
						</Button>
						<Button variant="primary" type="submit" disabled={saving}>
							{editing ? "Enregistrer" : "Créer"}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</main>
	);
}