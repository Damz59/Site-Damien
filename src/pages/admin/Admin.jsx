import { useEffect, useState } from "react";
import { Container, Button, Alert, Spinner, Card, Badge, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AdminNews from "./AdminNews";
import { API_BASE } from "../../config/api";
import "./Admin_style.css";

export default function Admin() {
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useState(null);
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const run = async () => {
			try {
				// 1) Check auth
				const res = await fetch(`${API_BASE}/check-auth.php`, {
					credentials: "include",
				});
				const data = await res.json();

				if (!res.ok || !data.authenticated) {
					setError("Accès refusé : veuillez vous connecter.");
					setTimeout(() => navigate("/connexion"), 800);
					return;
				}

				setAuth(data);

				// 2) Load messages
				const r2 = await fetch(`${API_BASE}/messages.php`, {
					credentials: "include",
				});
				const d2 = await r2.json();
				if (!r2.ok || !d2.success) throw new Error(d2.error || "Erreur chargement messages");
				setMessages(d2.messages || []);

				// 3) Load users
				const u = await fetch(`${API_BASE}/users-admin.php`, {
					credentials: "include",
				});
				const ud = await u.json();
				if (!u.ok || !ud.success) throw new Error(ud.error || "Erreur chargement users");
				setUsers(ud.users || []);
			} catch (e) {
				setError(e?.message || "Impossible de charger l'administration.");
			} finally {
				setLoading(false);
			}
		};

		run();
	}, [navigate]);

	const setMessageLu = async (id, lu) => {
		try {
			const res = await fetch(`${API_BASE}/mark-read.php`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, lu }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur update");

			setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, lu } : m)));
		} catch (e) {
			setError(e?.message || "Impossible de modifier le statut du message.");
		}
	};

	const deleteMessage = async (id) => {
		if (!window.confirm("Supprimer ce message ?")) return;

		try {
			const res = await fetch(`${API_BASE}/delete-message.php`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur suppression");

			setMessages((prev) => prev.filter((m) => m.id !== id));
		} catch (e) {
			setError(e?.message || "Impossible de supprimer le message.");
		}
	};

	const updateUserRole = async (id, role) => {
		try {
			const res = await fetch(`${API_BASE}/update-user-role.php`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id, role }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur update role");

			setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
		} catch (e) {
			setError(e?.message || "Impossible de modifier le rôle.");
		}
	};

	const deleteUser = async (id) => {
		if (!window.confirm("Supprimer cet utilisateur ?")) return;

		try {
			const res = await fetch(`${API_BASE}/delete-user.php`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ id }),
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.error || "Erreur suppression user");

			setUsers((prev) => prev.filter((u) => u.id !== id));
		} catch (e) {
			setError(e?.message || "Impossible de supprimer l'utilisateur.");
		}
	};

	const unread = messages.filter((m) => Number(m.lu) === 0);
	const read = messages.filter((m) => Number(m.lu) === 1);

	if (loading) {
		return (
			<div className="text-center my-5">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="danger" className="m-4">
				{error}
			</Alert>
		);
	}

	return (
		<main className="flex-grow-1 overflow-auto">
			<Container className="my-5">
				<div className="d-flex align-items-center justify-content-between">
					<h1 className="mb-0">Page d'administration</h1>
				</div>

				<p className="text-muted mt-2">
					Connecté en tant que <strong>{auth?.user?.username}</strong> (rôle :{" "}
					<strong>{auth?.user?.role}</strong>)
				</p>

				<div className="d-flex flex-wrap gap-2">
					<Link to="/admin/cv-competences" className="btn btn-outline-dark btn-sm">
						Administration CV / Compétences
					</Link>

					<Link to="/admin/coursEtTutos" className="btn btn-outline-dark btn-sm">
						Administration Cours & Tutos
					</Link>
				</div>

				<hr />

				{/* ✅ Gestion du bandeau News */}
				<AdminNews />

				<hr className="my-4" />

				{/* ✅ Gestion des utilisateurs */}
				<h2 className="h4">Utilisateurs</h2>
				{users.length === 0 ? (
					<p className="text-muted">Aucun utilisateur.</p>
				) : (
					<div className="table-responsive">
						<table className="table table-sm align-middle">
							<thead>
								<tr>
									<th>ID</th>
									<th>Pseudo</th>
									<th>Email</th>
									<th className="admin-col-role">Rôle</th>
									<th>Actif</th>
									<th>Créé</th>
									<th></th>
								</tr>
							</thead>

							<tbody>
								{users.map((u) => (
									<tr key={u.id}>
										<td>{u.id}</td>
										<td>{u.username}</td>
										<td>{u.email}</td>
										<td>
											<Form.Select
												size="sm"
												value={u.role}
												onChange={(e) => updateUserRole(u.id, e.target.value)}
											>
												<option value="user">user</option>
												<option value="moderator">moderator</option>
												<option value="admin">admin</option>
											</Form.Select>
										</td>
										<td>{Number(u.active) === 1 ? "Oui" : "Non"}</td>
										<td className="text-muted">{u.created_at}</td>
										<td className="text-end">
											<Button
												size="sm"
												variant="outline-danger"
												onClick={() => deleteUser(u.id)}
											>
												Supprimer
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<hr className="my-4" />

				<h2 className="h4">
					Messages non lus <Badge bg="danger">{unread.length}</Badge>
				</h2>

				{unread.length === 0 ? (
					<p className="text-muted">Aucun message non lu.</p>
				) : (
					unread.map((m) => (
						<Card className="mb-3" key={m.id}>
							<Card.Body>
								<div className="d-flex justify-content-between align-items-start gap-3">
									<div className="flex-grow-1">
										<Card.Title className="h6 mb-1">{m.sujet}</Card.Title>
										<div className="text-muted small">
											{m.prenom} {m.nom} — {m.email} — {m.created_at}
										</div>
										<div className="mt-2">{m.message}</div>
									</div>

									<div className="flex-shrink-0">
										<Button size="sm" variant="success" onClick={() => setMessageLu(m.id, 1)}>
											Marquer comme lu
										</Button>
									</div>
								</div>
							</Card.Body>
						</Card>
					))
				)}

				<hr className="my-4" />

				<h2 className="h4">
					Messages lus <Badge bg="secondary">{read.length}</Badge>
				</h2>

				{read.length === 0 ? (
					<p className="text-muted">Aucun message lu.</p>
				) : (
					read.map((m) => (
						<Card className="mb-3" key={m.id}>
							<Card.Body>
								<div className="d-flex justify-content-between align-items-start gap-3">
									<div className="flex-grow-1">
										<Card.Title className="h6 mb-1">{m.sujet}</Card.Title>
										<div className="text-muted small">
											{m.prenom} {m.nom} — {m.email} — {m.created_at}
										</div>
										<div className="mt-2">{m.message}</div>
									</div>

									<div className="flex-shrink-0 d-flex gap-2">
										<Button
											size="sm"
											variant="outline-secondary"
											onClick={() => setMessageLu(m.id, 0)}
										>
											Remettre en non lu
										</Button>

										<Button
											size="sm"
											variant="outline-danger"
											onClick={() => deleteMessage(m.id)}
										>
											Supprimer
										</Button>
									</div>
								</div>
							</Card.Body>
						</Card>
					))
				)}
			</Container>
		</main>
	);
}