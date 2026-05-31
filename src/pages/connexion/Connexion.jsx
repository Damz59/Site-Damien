import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE } from "../../config/api";
import "./Connexion_style.css";

function Connexion({ refreshAuth, authMessage, clearAuthMessage }) {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	// ✅ Si ProtectedRoute t’a envoyé ici, il peut stocker la page d’origine
	const from = location.state?.from || "/";

	useEffect(() => {
		// À l’arrivée sur la page Connexion, on vide juste le mot de passe
		setFormData((prev) => ({ ...prev, password: "" }));
	}, []);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`${API_BASE}/login.php`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(formData),
			});

			let data;
			try {
				data = await response.json();
			} catch {
				setError("Réponse non-JSON (erreur serveur ou mauvaise URL).");
				return;
			}

			if (!response.ok) {
				setError(data?.error || `Erreur HTTP ${response.status}`);
				return;
			}

			if (!data?.success) {
				setError(data?.error || "Erreur de connexion");
				return;
			}

			// Login OK
			clearAuthMessage?.();
			setFormData((prev) => ({ ...prev, password: "" }));

			// Met à jour l’état global (Header / App)
			await refreshAuth?.();

			// ✅ Retourne sur la page demandée (ex: /admin/cv-competences)
			navigate(from, { replace: true });
		} catch (err) {
			console.error(err);
			setError("Impossible de se connecter. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex-grow-1 overflow-auto d-flex align-items-center">
			<Container className="py-3">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-5">
						<Card className="shadow-sm">
							<Card.Body className="p-4">
								<h1 className="h3 mb-4 text-center">Connexion</h1>

								{authMessage && (
									<Alert
										variant="warning"
										className="mb-3"
										onClose={() => clearAuthMessage?.()}
										dismissible
									>
										{authMessage}
									</Alert>
								)}

								{error && (
									<Alert
										variant="danger"
										className="mb-3"
										onClose={() => setError(null)}
										dismissible
									>
										{error}
									</Alert>
								)}

								<Form onSubmit={handleSubmit}>
									<Form.Group className="mb-3" controlId="formUsername">
										<Form.Label>Nom d'utilisateur</Form.Label>
										<Form.Control
											type="text"
											name="username"
											value={formData.username}
											onChange={handleChange}
											autoComplete="username"
											placeholder="Pseudo ou e-mail"
											disabled={loading}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formPassword">
										<Form.Label>Mot de passe</Form.Label>
										<Form.Control
											type="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											autoComplete="current-password"
											placeholder="Votre mot de passe"
											disabled={loading}
											required
										/>
									</Form.Group>
									
									<div className="d-flex justify-content-end mb-3">
										<Link to="/mot-de-passe-oublie" className="text-decoration-none small">
											Mot de passe oublié ?
										</Link>
									</div>

									<Button
										variant="primary"
										type="submit"
										className="w-100 mb-3"
										disabled={loading}
									>
										{loading ? "Connexion..." : "Se connecter"}
									</Button>
								</Form>
							</Card.Body>
						</Card>

						<div className="text-center mt-3">
							<Link to="/" className="btn btn-home-back btn-sm">
								← Retour à l'accueil
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
}

export default Connexion;