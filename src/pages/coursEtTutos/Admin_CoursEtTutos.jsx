// Admin_CoursEtTutos.jsx

import { useEffect, useMemo, useState } from "react";
import {
	Container,
	Card,
	Button,
	Alert,
	Form,
	Spinner,
	ListGroup,
	Badge,
	Row,
	Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Banniere from "../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../components/Banniere_isConnected/Banniere_isConnected.jsx";
import { API_BASE } from "../../config/api";
import "./Admin_CoursEtTutos.css";

const slugify = (s) =>
	String(s || "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // remove accents
		.replace(/[^a-z0-9]+/g, "-") // replace non-alnum by -
		.replace(/(^-|-$)/g, ""); // trim -

export default function AdminCoursEtTutos({ authUser }) {
	// -----------------------------
	// Categories
	// -----------------------------
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [categories, setCategories] = useState([]);
	const [newName, setNewName] = useState("");

	// -----------------------------
	// Items / Cards
	// -----------------------------
	const [itemsLoading, setItemsLoading] = useState(true);
	const [itemsError, setItemsError] = useState(null);
	const [items, setItems] = useState([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState("");

	const [newItemTitle, setNewItemTitle] = useState("");
	const [newItemSlug, setNewItemSlug] = useState("");
	const [newItemShortDesc, setNewItemShortDesc] = useState("");
	const [newItemImageUrl, setNewItemImageUrl] = useState("");

	const loadCategories = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-categories-admin.php`, {
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok || !data.success) {
				throw new Error(data.error || "Erreur chargement catégories");
			}

			const nextCats = data.categories || [];
			setCategories(nextCats);

			// Assure une sélection valide
			if (nextCats.length > 0) {
				const stillExists = nextCats.some(
					(c) => String(c.id) === String(selectedCategoryId)
				);
				if (!selectedCategoryId || !stillExists) {
					setSelectedCategoryId(String(nextCats[0].id));
				}
			} else {
				setSelectedCategoryId("");
			}
		} catch (e) {
			setError(e?.message || "Erreur chargement catégories");
		} finally {
			setLoading(false);
		}
	};

	const loadItems = async () => {
		setItemsLoading(true);
		setItemsError(null);
		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok || !data.success) {
				throw new Error(data.error || "Erreur chargement items");
			}
			setItems(data.items || []);
		} catch (e) {
			setItemsError(e?.message || "Erreur chargement items");
		} finally {
			setItemsLoading(false);
		}
	};

	const loadAll = async () => {
		await Promise.all([loadCategories(), loadItems()]);
	};

	// Charger seulement quand authUser est présent
	useEffect(() => {
		if (!authUser) return;
		loadAll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	// Auto-slug si vide
	useEffect(() => {
		if (!newItemSlug.trim() && newItemTitle.trim()) {
			setNewItemSlug(slugify(newItemTitle));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newItemTitle]);

	const selectedCatIdNum = selectedCategoryId ? Number(selectedCategoryId) : null;

	const itemsForSelectedCategory = useMemo(() => {
		if (!selectedCatIdNum) return [];
		return items
			.filter((it) => Number(it.category_id) === selectedCatIdNum)
			.sort((a, b) => Number(a.position) - Number(b.position));
	}, [items, selectedCatIdNum]);

	// -----------------------------
	// Actions catégories
	// -----------------------------
	const createCategory = async () => {
		const name = newName.trim();
		if (!name) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-categories-admin.php`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ name }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur création");

			setNewName("");
			await loadCategories();
		} catch (e) {
			setError(e?.message || "Erreur création");
		}
	};

	const renameCategory = async (id, currentName) => {
		const next = window.prompt("Nouveau nom :", currentName);
		if (!next || !next.trim()) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-categories-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, name: next.trim() }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur modification");

			await loadCategories();
		} catch (e) {
			setError(e?.message || "Erreur modification");
		}
	};

	const deleteCategory = async (id, name) => {
		if (!window.confirm(`Supprimer la catégorie "${name}" ?`)) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-categories-admin.php`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur suppression");

			await loadAll();
		} catch (e) {
			setError(e?.message || "Erreur suppression");
		}
	};

	const toggleActiveCategory = async (id, nextActive) => {
		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-categories-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, active: nextActive }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur update");

			await loadCategories();
		} catch (e) {
			setError(e?.message || "Erreur update");
		}
	};

	const moveCategory = async (id, direction) => {
		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-categories-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ action: "move", id, direction }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur déplacement");

			await loadCategories();
		} catch (e) {
			setError(e?.message || "Erreur déplacement");
		}
	};

	// -----------------------------
	// Actions items / cards
	// -----------------------------
	const createItem = async () => {
		const category_id = Number(selectedCategoryId);
		const title = newItemTitle.trim();
		const slug = slugify(newItemSlug.trim());
		const short_desc = newItemShortDesc.trim();
		const image_url = newItemImageUrl.trim();

		if (!category_id || !title || !slug) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ category_id, title, slug, short_desc, image_url }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur création item");

			setNewItemTitle("");
			setNewItemSlug("");
			setNewItemShortDesc("");
			setNewItemImageUrl("");
			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur création item");
		}
	};

	const renameItem = async (id, currentTitle) => {
		const next = window.prompt("Nouveau titre :", currentTitle);
		if (!next || !next.trim()) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, title: next.trim() }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur modification");

			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur modification");
		}
	};

	const editItemSlug = async (id, currentSlug) => {
		const next = window.prompt("Nouveau slug :", currentSlug);
		if (!next || !next.trim()) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, slug: slugify(next.trim()) }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur modification slug");

			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur modification slug");
		}
	};

	const editItemDesc = async (id, currentDesc) => {
		const next = window.prompt("Nouvelle description courte :", currentDesc || "");
		if (next === null) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, short_desc: next }),
			});
			const data = await res.json();
			if (!res.ok || !data.success)
				throw new Error(data.error || "Erreur modification description");

			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur modification description");
		}
	};

	const editItemLogo = async (id, currentUrl) => {
		const next = window.prompt("URL/chemin du logo (image_url) :", currentUrl || "");
		if (next === null) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, image_url: next.trim() }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur modification logo");

			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur modification logo");
		}
	};

	const toggleActiveItem = async (id, nextActive) => {
		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, active: nextActive }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur update item");

			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur update item");
		}
	};

	const moveItem = async (id, direction) => {
		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ action: "move", id, direction }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur déplacement item");

			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur déplacement item");
		}
	};

	const deleteItem = async (id, title) => {
		if (!window.confirm(`Supprimer le cours "${title}" ?`)) return;

		try {
			const res = await fetch(`${API_BASE}/coursEtTutos-items-admin.php`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur suppression item");

			await loadItems();
		} catch (e) {
			setItemsError(e?.message || "Erreur suppression item");
		}
	};

	// -----------------------------
	// UI guards
	// -----------------------------
	if (!authUser) {
		return (
			<main className="flex-grow-1 overflow-auto">
				<Banniere />
				<Container className="my-5">
					<Alert variant="warning" className="mb-0">
						Connexion requise.
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
				<h1 className="mb-4">Administration Cours & Tutoriels</h1>

				{error && <Alert variant="danger">{error}</Alert>}

				{/* ------------------- */}
				{/* CATEGORIES */}
				{/* ------------------- */}
				<Card className="shadow-sm mb-4">
					<Card.Header className="bg-primary text-white d-flex align-items-center justify-content-between">
						<strong>Catégories</strong>
						<Badge bg="light" text="dark">
							{categories.length}
						</Badge>
					</Card.Header>

					<Card.Body>
						<div className="d-flex gap-2">
							<Form.Control
								placeholder="Nouvelle catégorie (ex: Développement)"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") createCategory();
								}}
							/>
							<Button variant="success" onClick={createCategory}>
								Ajouter
							</Button>
							<Button variant="outline-secondary" onClick={loadAll}>
								Recharger
							</Button>
						</div>

						<hr />

						{loading ? (
							<div className="text-center my-3">
								<Spinner />
							</div>
						) : categories.length === 0 ? (
							<p className="text-muted mb-0">Aucune catégorie.</p>
						) : (
							<ListGroup>
								{categories.map((c, idx) => (
									<ListGroup.Item
										key={c.id}
										className="d-flex justify-content-between align-items-center"
									>
										<div>
											<strong>{c.name}</strong>{" "}
											<span className="text-muted small">(pos: {c.position})</span>
											{Number(c.active) === 0 && (
												<span className="text-muted"> — inactive</span>
											)}
										</div>

										<div className="d-flex gap-2">
											<Button
												size="sm"
												variant="outline-secondary"
												disabled={idx === 0}
												onClick={() => moveCategory(c.id, "up")}
												title="Monter"
											>
												↑
											</Button>
											<Button
												size="sm"
												variant="outline-secondary"
												disabled={idx === categories.length - 1}
												onClick={() => moveCategory(c.id, "down")}
												title="Descendre"
											>
												↓
											</Button>
											<Button
												size="sm"
												variant={Number(c.active) ? "outline-warning" : "outline-success"}
												onClick={() =>
													toggleActiveCategory(c.id, Number(c.active) ? 0 : 1)
												}
											>
												{Number(c.active) ? "Désactiver" : "Activer"}
											</Button>
											<Button
												size="sm"
												variant="outline-primary"
												onClick={() => renameCategory(c.id, c.name)}
											>
												Renommer
											</Button>
											<Button
												size="sm"
												variant="outline-danger"
												onClick={() => deleteCategory(c.id, c.name)}
											>
												Supprimer
											</Button>
										</div>
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
					</Card.Body>
				</Card>

				{/* ------------------- */}
				{/* ITEMS / CARDS */}
				{/* ------------------- */}
				<Card className="shadow-sm">
					<Card.Header className="bg-primary text-white d-flex align-items-center justify-content-between">
						<strong>Cards / Cours</strong>
						<Badge bg="light" text="dark">
							{items.length}
						</Badge>
					</Card.Header>

					<Card.Body>
						{itemsError && <Alert variant="danger">{itemsError}</Alert>}

						{categories.length === 0 ? (
							<Alert variant="warning" className="mb-0">
								Crée d’abord une catégorie avant d’ajouter des cours.
							</Alert>
						) : (
							<>
								<Row className="g-3 align-items-end">
									<Col xs={12} md={4}>
										<Form.Label>Catégorie</Form.Label>
										<Form.Select
											value={selectedCategoryId}
											onChange={(e) => setSelectedCategoryId(e.target.value)}
										>
											{categories.map((c) => (
												<option key={c.id} value={c.id}>
													{c.name}
												</option>
											))}
										</Form.Select>
									</Col>

									<Col xs={12} md={4}>
										<Form.Label>Titre</Form.Label>
										<Form.Control
											placeholder="PHP"
											value={newItemTitle}
											onChange={(e) => setNewItemTitle(e.target.value)}
										/>
									</Col>

									<Col xs={12} md={4}>
										<Form.Label>Slug</Form.Label>
										<Form.Control
											placeholder="php"
											value={newItemSlug}
											onChange={(e) => setNewItemSlug(e.target.value)}
										/>
									</Col>

									<Col xs={12}>
										<Form.Label>Description courte (optionnel)</Form.Label>
										<Form.Control
											placeholder="Ex: Cours PHP"
											value={newItemShortDesc}
											onChange={(e) => setNewItemShortDesc(e.target.value)}
										/>
									</Col>

									<Col xs={12}>
										<Form.Label>Logo (image_url)</Form.Label>
										<Form.Control
											placeholder="/logos/php.svg"
											value={newItemImageUrl}
											onChange={(e) => setNewItemImageUrl(e.target.value)}
										/>
									</Col>

									<Col xs={12} className="d-flex gap-2">
										<Button
											variant="success"
											onClick={createItem}
											disabled={
												!selectedCategoryId ||
												!newItemTitle.trim() ||
												!newItemSlug.trim()
											}
										>
											Ajouter le cours
										</Button>

										<Button variant="outline-secondary" onClick={loadItems}>
											Recharger cours
										</Button>
									</Col>
								</Row>

								<hr />

								{itemsLoading ? (
									<div className="text-center my-3">
										<Spinner />
									</div>
								) : !selectedCategoryId ? (
									<p className="text-muted mb-0">Aucune catégorie sélectionnée.</p>
								) : itemsForSelectedCategory.length === 0 ? (
									<p className="text-muted mb-0">Aucun cours dans cette catégorie.</p>
								) : (
									<ListGroup>
										{itemsForSelectedCategory.map((it, idx) => (
											<ListGroup.Item
												key={it.id}
												className="d-flex justify-content-between align-items-center"
											>
												<div className="d-flex align-items-center gap-3">
													{it.image_url ? (
														<img
															className="admin-cet-logo"
															src={it.image_url}
															alt={`Logo ${it.title}`}
														/>
													) : null}

													<div>
														<strong>{it.title}</strong>{" "}
														<span className="text-muted small">
															(slug: {it.slug} | pos: {it.position})
														</span>
														{Number(it.active) === 0 && (
															<span className="text-muted"> — inactif</span>
														)}

														{it.short_desc ? (
															<div className="text-muted small">{it.short_desc}</div>
														) : null}
														{it.image_url ? (
															<div className="text-muted small">logo: {it.image_url}</div>
														) : null}
													</div>
												</div>

												<div className="d-flex gap-2">
													<Button
														size="sm"
														variant="outline-secondary"
														disabled={idx === 0}
														onClick={() => moveItem(it.id, "up")}
														title="Monter"
													>
														↑
													</Button>
													<Button
														size="sm"
														variant="outline-secondary"
														disabled={idx === itemsForSelectedCategory.length - 1}
														onClick={() => moveItem(it.id, "down")}
														title="Descendre"
													>
														↓
													</Button>

													<Button
														size="sm"
														variant={Number(it.active) ? "outline-warning" : "outline-success"}
														onClick={() => toggleActiveItem(it.id, Number(it.active) ? 0 : 1)}
													>
														{Number(it.active) ? "Désactiver" : "Activer"}
													</Button>

													<Button
														size="sm"
														variant="outline-primary"
														onClick={() => renameItem(it.id, it.title)}
													>
														Renommer
													</Button>

													<Button
														size="sm"
														variant="outline-primary"
														onClick={() => editItemSlug(it.id, it.slug)}
													>
														Slug
													</Button>

													<Button
														size="sm"
														variant="outline-primary"
														onClick={() => editItemDesc(it.id, it.short_desc)}
													>
														Description
													</Button>

													<Button
														size="sm"
														variant="outline-primary"
														onClick={() => editItemLogo(it.id, it.image_url)}
													>
														Logo
													</Button>

													{/* ✅ Accès admin chapitres */}
													{it.slug === "reactjs" && (
														<Link
															to="/admin/coursEtTutos/reactjs/chapitres"
															className="btn btn-outline-dark btn-sm"
														>
															Chapitres
														</Link>
													)}
													{it.slug === "php" && (
														<Link
															to="/admin/coursEtTutos/php/chapitres"
															className="btn btn-outline-dark btn-sm"
														>
															Chapitres
														</Link>
													)}

													<Button
														size="sm"
														variant="outline-danger"
														onClick={() => deleteItem(it.id, it.title)}
													>
														Supprimer
													</Button>
												</div>
											</ListGroup.Item>
										))}
									</ListGroup>
								)}
							</>
						)}
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
}