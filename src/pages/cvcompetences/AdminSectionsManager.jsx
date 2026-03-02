import { useEffect, useMemo, useState } from "react";
import { Card, Form, Button, Alert, ListGroup, Badge, Spinner } from "react-bootstrap";
import { API_BASE } from "../../config/api";

export default function AdminSectionsManager({ refreshAll }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [msg, setMsg] = useState(null);

	const [sections, setSections] = useState([]);
	const [newSection, setNewSection] = useState("");
	const [newLabel, setNewLabel] = useState("");

	// --- Edition (bouton Modifier)
	const [editingSection, setEditingSection] = useState(null);
	const [editLabel, setEditLabel] = useState("");

	const load = async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
				credentials: "include",
			});

			const raw = await res.text();
			let data;

			try {
				data = JSON.parse(raw);
			} catch {
				throw new Error(`Réponse non-JSON: ${raw.slice(0, 160)}...`);
			}

			if (!res.ok || !data.success) {
				throw new Error(data.error || `HTTP ${res.status}`);
			}

			setSections(data.sections || []);
		} catch (e) {
			setError(e.message || "Erreur chargement sections");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const activeSections = useMemo(
		() => sections.filter((s) => Number(s.active) === 1),
		[sections]
	);

	const inactiveSections = useMemo(
		() => sections.filter((s) => Number(s.active) !== 1),
		[sections]
	);

	const createSection = async () => {
		setMsg(null);
		setError(null);

		const section = newSection.trim();
		const label = newLabel.trim();

		if (!section || !label) return setError("section et label requis.");
		if (!/^[a-z0-9_]+$/.test(section)) return setError("section invalide (a-z0-9_).");

		const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "create", section, label }),
		});

		const data = await res.json();
		if (!res.ok || !data.success) return setError(data.error || "Erreur création");

		setNewSection("");
		setNewLabel("");
		setMsg("Section ajoutée.");

		await load();
		refreshAll?.();
	};

	const toggle = async (section, active) => {
		setMsg(null);
		setError(null);

		const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "toggle", section, active }),
		});

		const data = await res.json();
		if (!res.ok || !data.success) return setError(data.error || "Erreur toggle");

		await load();
		refreshAll?.();
	};

	const move = async (section, dir) => {
		setMsg(null);
		setError(null);

		const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "move", section, dir }),
		});

		const data = await res.json();
		if (!res.ok || !data.success) return setError(data.error || "Erreur déplacement");

		await load();
		refreshAll?.();
	};

	const del = async (section) => {
		if (!window.confirm(`Supprimer définitivement la section "${section}" ?`)) return;

		setMsg(null);
		setError(null);

		const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "delete", section }),
		});

		const data = await res.json();
		if (!res.ok || !data.success) return setError(data.error || "Erreur suppression");

		setMsg("Section supprimée.");

		// Si on supprime la section en cours d'édition, on reset
		if (editingSection === section) {
			setEditingSection(null);
			setEditLabel("");
		}

		await load();
		refreshAll?.();
	};

	// --- Edition label
	const startEdit = (s) => {
		setMsg(null);
		setError(null);
		setEditingSection(s.section);
		setEditLabel(s.label || "");
	};

	const cancelEdit = () => {
		setEditingSection(null);
		setEditLabel("");
	};

	const saveEdit = async (section) => {
		setMsg(null);
		setError(null);

		const label = editLabel.trim();
		if (!label) return setError("Label requis.");

		const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "update", section, label }),
		});

		const data = await res.json();
		if (!res.ok || !data.success) return setError(data.error || "Erreur update");

		setMsg("Section modifiée.");
		cancelEdit();

		await load();
		refreshAll?.();
	};

	return (
		<Card className="shadow-sm mb-4">
			<Card.Body>
				<div className="d-flex align-items-center justify-content-between">
					<h2 className="h5 mb-0">Gestion des sections</h2>
					<Badge bg="secondary">{sections.length}</Badge>
				</div>

				<hr className="my-3" />

				{msg && <Alert variant="success">{msg}</Alert>}
				{error && <Alert variant="danger">{error}</Alert>}

				<Form
					className="mb-3"
					onSubmit={(e) => {
						e.preventDefault();
						createSection();
					}}
				>
					<div className="d-flex gap-2 flex-wrap">
						<Form.Control
							value={newSection}
							onChange={(e) => setNewSection(e.target.value)}
							placeholder="section (ex: projets_perso)"
							disabled={loading}
						/>
						<Form.Control
							value={newLabel}
							onChange={(e) => setNewLabel(e.target.value)}
							placeholder="Label (ex: Projets perso)"
							disabled={loading}
						/>
						<Button type="submit" disabled={loading}>
							Ajouter
						</Button>
					</div>
					<div className="small text-muted mt-2">
						Clé section : minuscules, chiffres, underscore.
					</div>
				</Form>

				{loading ? (
					<div className="text-center my-3">
						<Spinner size="sm" />
					</div>
				) : (
					<>
						<div className="d-flex align-items-center justify-content-between mb-2">
							<div className="text-muted">Actives</div>
							<Badge bg="success">{activeSections.length}</Badge>
						</div>

						<ListGroup className="mb-3">
							{activeSections.map((s) => (
								<ListGroup.Item
									key={s.section}
									className="d-flex justify-content-between gap-2"
								>
									<div className="flex-grow-1">
										<div>
											<strong>{s.label}</strong>{" "}
											<span className="text-muted">({s.section})</span>
										</div>

										{editingSection === s.section && (
											<div className="mt-2 d-flex gap-2 flex-wrap">
												<Form.Control
													size="sm"
													value={editLabel}
													onChange={(e) => setEditLabel(e.target.value)}
													placeholder="Nouveau label"
													disabled={loading}
												/>
												<Button
													size="sm"
													variant="success"
													onClick={() => saveEdit(s.section)}
													disabled={loading}
												>
													Enregistrer
												</Button>
												<Button
													size="sm"
													variant="outline-secondary"
													onClick={cancelEdit}
													disabled={loading}
												>
													Annuler
												</Button>
											</div>
										)}
									</div>

									<div className="d-flex gap-1 flex-wrap">
										<Button
											size="sm"
											variant="outline-secondary"
											onClick={() => move(s.section, "up")}
										>
											↑
										</Button>
										<Button
											size="sm"
											variant="outline-secondary"
											onClick={() => move(s.section, "down")}
										>
											↓
										</Button>

										<Button
											size="sm"
											variant="outline-warning"
											onClick={() => startEdit(s)}
										>
											Modifier
										</Button>

										<Button
											size="sm"
											variant="outline-primary"
											onClick={() => toggle(s.section, 0)}
										>
											Désactiver
										</Button>
										<Button
											size="sm"
											variant="outline-danger"
											onClick={() => del(s.section)}
										>
											Supprimer
										</Button>
									</div>
								</ListGroup.Item>
							))}
						</ListGroup>

						<div className="d-flex align-items-center justify-content-between mb-2">
							<div className="text-muted">Inactives</div>
							<Badge bg="secondary">{inactiveSections.length}</Badge>
						</div>

						<ListGroup>
							{inactiveSections.map((s) => (
								<ListGroup.Item
									key={s.section}
									className="d-flex justify-content-between gap-2"
								>
									<div className="flex-grow-1">
										<div>
											<strong>{s.label}</strong>{" "}
											<span className="text-muted">({s.section})</span>
										</div>

										{editingSection === s.section && (
											<div className="mt-2 d-flex gap-2 flex-wrap">
												<Form.Control
													size="sm"
													value={editLabel}
													onChange={(e) => setEditLabel(e.target.value)}
													placeholder="Nouveau label"
													disabled={loading}
												/>
												<Button
													size="sm"
													variant="success"
													onClick={() => saveEdit(s.section)}
													disabled={loading}
												>
													Enregistrer
												</Button>
												<Button
													size="sm"
													variant="outline-secondary"
													onClick={cancelEdit}
													disabled={loading}
												>
													Annuler
												</Button>
											</div>
										)}
									</div>

									<div className="d-flex gap-1 flex-wrap">
										<Button
											size="sm"
											variant="outline-warning"
											onClick={() => startEdit(s)}
										>
											Modifier
										</Button>

										<Button
											size="sm"
											variant="outline-success"
											onClick={() => toggle(s.section, 1)}
										>
											Activer
										</Button>
										<Button
											size="sm"
											variant="outline-danger"
											onClick={() => del(s.section)}
										>
											Supprimer
										</Button>
									</div>
								</ListGroup.Item>
							))}
						</ListGroup>
					</>
				)}
			</Card.Body>
		</Card>
	);
}