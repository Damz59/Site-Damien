import { useEffect, useMemo, useState } from "react"
import { Card, Form, Button, Alert, ListGroup, Spinner, Badge } from "react-bootstrap"
import { API_BASE } from "../../config/api"
import "./AdminCVManager_style.css"

// modes d’aperçu (si tu veux garder "hobbies" en mode texte)
const PREVIEW = {
	hobbies: { title: "Hobbies", mode: "text" },
}

export default function AdminCVManager() {
	// ---- sections dynamiques
	const [sectionsLoading, setSectionsLoading] = useState(true)
	const [sectionsError, setSectionsError] = useState(null)
	const [sections, setSections] = useState([])

	// section sélectionnée (clé)
	const [section, setSection] = useState("")

	// données de la section (items + active)
	const [sectionActive, setSectionActive] = useState(1)
	const [items, setItems] = useState([])

	// Ajout
	const [newText, setNewText] = useState("")
	const [hasDescription, setHasDescription] = useState(false)
	const [newDescription, setNewDescription] = useState("")

	// Edition
	const [editingId, setEditingId] = useState(null)
	const [editingText, setEditingText] = useState("")
	const [editingHasDescription, setEditingHasDescription] = useState(false)
	const [editingDescription, setEditingDescription] = useState("")

	const [msg, setMsg] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	// ----- charge les sections depuis l’API admin
	const loadSections = async () => {
		setSectionsLoading(true)
		setSectionsError(null)

		try {
			const res = await fetch(`${API_BASE}/cv-sections-admin.php`, {
				credentials: "include",
			})
			const raw = await res.text()

			let data
			try {
				data = JSON.parse(raw)
			} catch {
				throw new Error(`Réponse non-JSON (sections) : ${raw.slice(0, 160)}...`)
			}

			if (!res.ok || !data.success) {
				throw new Error(data.error || `HTTP ${res.status}`)
			}

			const rows = data.sections || []
			setSections(rows)

			// choisir une section par défaut si vide ou supprimée
			const hasCurrent = rows.some((s) => s.section === section)
			if (!section || !hasCurrent) {
				setSection(rows[0]?.section || "")
			}
		} catch (e) {
			setSectionsError(e.message || "Erreur chargement sections")
		} finally {
			setSectionsLoading(false)
		}
	}

	useEffect(() => {
		loadSections()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sectionMeta = useMemo(() => {
		const fromDb = sections.find((s) => s.section === section)
		const title = fromDb?.label || section || "Aperçu"
		const mode = PREVIEW[section]?.mode || "list"
		return { title, mode }
	}, [sections, section])

	// ----- chargement des items d’une section (API admin existante)
	const load = async (sec = section) => {
		if (!sec) return

		const res = await fetch(
			`${API_BASE}/cv-admin.php?section=${encodeURIComponent(sec)}`,
			{
				credentials: "include",
			},
		)
		const raw = await res.text()

		if (!res.ok) throw new Error(`HTTP ${res.status} : ${raw.slice(0, 160)}...`)

		let data
		try {
			data = JSON.parse(raw)
		} catch {
			throw new Error(`Réponse non-JSON : ${raw.slice(0, 160)}...`)
		}

		if (!data.success) throw new Error(data.error || "Erreur chargement")

		setSectionActive(Number(data.sectionActive ?? 1))
		setItems(data.items || [])
	}

	useEffect(() => {
		let cancelled = false

		const run = async () => {
			if (!section) return

			setLoading(true)
			setError(null)
			setMsg(null)

			try {
				await load(section)
			} catch (e) {
				if (!cancelled) setError(e.message)
			} finally {
				if (!cancelled) setLoading(false)
			}
		}

		run()

		return () => {
			cancelled = true
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [section])

	// ----- actions (inchangées, mais section vient maintenant de la DB)
	const toggleSectionActive = async (active) => {
		setMsg(null)
		setError(null)

		const res = await fetch(`${API_BASE}/cv-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "toggleSection", section, active }),
		})

		const data = await res.json()
		if (!res.ok || !data.success)
			throw new Error(data.error || "Erreur toggle section")

		await load(section)

		if (active !== 1) {
			setNewText("")
			setHasDescription(false)
			setNewDescription("")
		}
	}

	const addItem = async () => {
		setMsg(null)
		setError(null)

		if (sectionActive !== 1)
			return setError("Section désactivée : active-la pour ajouter des éléments.")

		const text = newText.trim()
		if (!text) return setError("Texte vide.")

		const description = hasDescription ? newDescription.trim() : ""

		const res = await fetch(`${API_BASE}/cv-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ section, text, description }),
		})

		const data = await res.json()
		if (!res.ok || !data.success) return setError(data.error || "Erreur ajout")

		setNewText("")
		setHasDescription(false)
		setNewDescription("")
		setMsg("Élément ajouté.")
		await load(section)
	}

	const removeItem = async (id) => {
		if (!window.confirm("Supprimer cet élément ?")) return

		setMsg(null)
		setError(null)

		const res = await fetch(`${API_BASE}/cv-admin.php`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ id }),
		})

		const data = await res.json()
		if (!res.ok || !data.success) return setError(data.error || "Erreur suppression")

		setMsg("Élément supprimé.")
		await load(section)
	}

	const toggleActive = async (id, active) => {
		setMsg(null)
		setError(null)

		const res = await fetch(`${API_BASE}/cv-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "toggle", id, active }),
		})

		const data = await res.json()
		if (!res.ok || !data.success)
			return setError(data.error || "Erreur mise à jour")

		await load(section)
	}

	const startEdit = (item) => {
		setEditingId(item.id)
		setEditingText(item.text ?? "")

		const desc = (item.description ?? "").toString()
		setEditingHasDescription(desc.trim() !== "")
		setEditingDescription(desc)
	}

	const cancelEdit = () => {
		setEditingId(null)
		setEditingText("")
		setEditingHasDescription(false)
		setEditingDescription("")
	}

	const saveEdit = async () => {
		setMsg(null)
		setError(null)

		const text = editingText.trim()
		if (!text) return setError("Texte vide.")

		const description = editingHasDescription ? editingDescription.trim() : ""

		const res = await fetch(`${API_BASE}/cv-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "update", id: editingId, text, description }),
		})

		const data = await res.json()
		if (!res.ok || !data.success)
			return setError(data.error || "Erreur modification")

		cancelEdit()
		setMsg("Élément modifié.")
		await load(section)
	}

	const moveItem = async (id, dir) => {
		setMsg(null)
		setError(null)

		const res = await fetch(`${API_BASE}/cv-admin.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ action: "move", id, dir }),
		})

		const data = await res.json()
		if (!res.ok || !data.success)
			return setError(data.error || "Erreur déplacement")

		await load(section)
	}

	const activeItems = items.filter((i) => Number(i.active) === 1)

	return (
		<Card className="admin-cv-card shadow-sm mb-4">
			<Card.Body>
				<div className="admin-cv-header">
					<h2 className="h4 mb-0">Gestion CV / Compétences</h2>

					<Button
						variant="outline-secondary"
						size="sm"
						onClick={loadSections}
						disabled={sectionsLoading}
					>
						Recharger sections
					</Button>
				</div>

				{msg && (
					<Alert variant="success" className="admin-cv-alert mt-3">
						{msg}
					</Alert>
				)}
				{error && (
					<Alert variant="danger" className="admin-cv-alert mt-3">
						{error}
					</Alert>
				)}
				{sectionsError && (
					<Alert variant="danger" className="admin-cv-alert mt-3">
						{sectionsError}
					</Alert>
				)}

				<Form.Group className="admin-cv-form mb-3 mt-3">
					<Form.Label>Section</Form.Label>

					<Form.Select
						value={section}
						onChange={(e) => setSection(e.target.value)}
						disabled={loading || sectionsLoading || sections.length === 0}
					>
						{sections.map((s) => (
							<option key={s.section} value={s.section}>
								{s.label || s.section}
							</option>
						))}
					</Form.Select>

					<Form.Check
						className="mt-2"
						type="checkbox"
						label="Section active (visible sur la page publique)"
						checked={sectionActive === 1}
						disabled={loading || !section}
						onChange={async (e) => {
							const active = e.target.checked ? 1 : 0
							try {
								await toggleSectionActive(active)
								setMsg(active ? "Section activée." : "Section désactivée.")
							} catch (err) {
								setError(err.message)
							}
						}}
					/>
				</Form.Group>

				<Card className="admin-cv-preview shadow-sm mb-3">
					<Card.Body>
						<h3 className="h6 text-muted mb-2">Aperçu (comme sur la page CV)</h3>
						<h4 className="admin-cv-preview-title">{sectionMeta.title}</h4>

						{sectionActive !== 1 ? (
							<p className="text-muted mb-0">
								Section désactivée (elle sera masquée côté public).
							</p>
						) : activeItems.length === 0 ? (
							<p className="text-muted mb-0">Aucun élément actif dans cette section.</p>
						) : sectionMeta.mode === "text" ? (
							<div className="text-muted">
								{activeItems.map((i) => (
									<div key={i.id} className="mb-2">
										<div>{i.text}</div>
										{i.description ? (
											<div className="small text-muted">{i.description}</div>
										) : null}
									</div>
								))}
							</div>
						) : (
							<ul className="admin-cv-clean-list mb-0">
								{activeItems.map((i) => (
									<li key={i.id}>
										{i.text}
										{i.description ? (
											<div className="small text-muted">{i.description}</div>
										) : null}
									</li>
								))}
							</ul>
						)}
					</Card.Body>
				</Card>

				<div className="admin-cv-add mb-3">
					<Form
						onSubmit={(e) => {
							e.preventDefault()
							addItem()
						}}
					>
						<div className="d-flex gap-2">
							<Form.Control
								value={newText}
								onChange={(e) => setNewText(e.target.value)}
								placeholder="Nouvel élément..."
								disabled={loading || sectionActive !== 1}
							/>

							<Button type="submit" disabled={loading || sectionActive !== 1}>
								Ajouter
							</Button>
						</div>

						<div className="mt-2">
							<Form.Check
								type="checkbox"
								label="Description"
								checked={hasDescription}
								disabled={loading || sectionActive !== 1}
								onChange={(e) => {
									setHasDescription(e.target.checked)
									if (!e.target.checked) setNewDescription("")
								}}
							/>

							{hasDescription && (
								<Form.Control
									as="textarea"
									rows={3}
									className="mt-2"
									placeholder="Description (optionnel)"
									value={newDescription}
									onChange={(e) => setNewDescription(e.target.value)}
									disabled={loading || sectionActive !== 1}
								/>
							)}
						</div>
					</Form>
				</div>

				{loading ? (
					<div className="text-center my-3">
						<Spinner size="sm" />
					</div>
				) : (
					<ListGroup className="admin-cv-list mb-3">
						{items.map((it) => (
							<ListGroup.Item key={it.id}>
								<div className="admin-cv-item">
									<div className="admin-cv-item-text flex-grow-1">
										{editingId === it.id ? (
											<>
												<Form.Control
													value={editingText}
													onChange={(e) => setEditingText(e.target.value)}
													size="sm"
													className="mb-2"
												/>

												<Form.Check
													type="checkbox"
													label="Description"
													checked={editingHasDescription}
													onChange={(e) => {
														setEditingHasDescription(e.target.checked)
														if (!e.target.checked) setEditingDescription("")
													}}
												/>

												{editingHasDescription && (
													<Form.Control
														as="textarea"
														rows={3}
														className="mt-2"
														placeholder="Description (optionnel)"
														value={editingDescription}
														onChange={(e) => setEditingDescription(e.target.value)}
													/>
												)}
											</>
										) : (
											<>
												<div>
													{it.text}{" "}
													{Number(it.active) === 1 ? (
														<Badge bg="success" className="admin-cv-status-badge">
															actif
														</Badge>
													) : (
														<Badge bg="secondary" className="admin-cv-status-badge">
															inactif
														</Badge>
													)}
												</div>

												{it.description ? (
													<div className="small text-muted">{it.description}</div>
												) : null}
											</>
										)}
									</div>

									<div className="admin-cv-actions d-flex gap-1 flex-wrap">
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={() => moveItem(it.id, "up")}
										>
											↑
										</Button>
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={() => moveItem(it.id, "down")}
										>
											↓
										</Button>

										<Button
											variant="outline-primary"
											size="sm"
											onClick={() =>
												toggleActive(it.id, Number(it.active) === 1 ? 0 : 1)
											}
										>
											Actif/Inactif
										</Button>

										{editingId === it.id ? (
											<>
												<Button variant="primary" size="sm" onClick={saveEdit}>
													Enregistrer
												</Button>
												<Button
													variant="outline-secondary"
													size="sm"
													onClick={cancelEdit}
												>
													Annuler
												</Button>
											</>
										) : (
											<Button
												variant="outline-dark"
												size="sm"
												onClick={() => startEdit(it)}
											>
												Modifier
											</Button>
										)}

										<Button
											variant="outline-danger"
											size="sm"
											onClick={() => removeItem(it.id)}
										>
											Supprimer
										</Button>
									</div>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Card.Body>
		</Card>
	)
}