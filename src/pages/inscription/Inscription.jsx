import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE } from "../../config/api";
import "./Inscription_style.css";

function Inscription() {
	const [formData, setFormData] = useState({
		username: "",
		nom: "",
		prenom: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);
		setSuccess(null);

		if (formData.password.length < 6) {
			setError("Le mot de passe doit contenir au moins 6 caractères.");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Les mots de passe ne correspondent pas.");
			return;
		}

		const usernameToSend =
			formData.username.trim() !== ""
				? formData.username.trim()
				: (formData.email.split("@")[0] || formData.email).trim();

		if (usernameToSend.length < 3) {
			setError("Le pseudo doit contenir au moins 3 caractères (ou utiliser un email valide).");
			return;
		}

		setLoading(true);

		try {
			const res = await fetch(`${API_BASE}/register.php`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: usernameToSend,
					prenom: formData.prenom,
					nom: formData.nom,
					email: formData.email,
					password: formData.password,
					confirmPassword: formData.confirmPassword,
				}),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				setError(data.error || `Erreur HTTP ${res.status}`);
				return;
			}

			setSuccess("Compte créé avec succès. Redirection vers la page de connexion...");
			setTimeout(() => navigate("/connexion"), 900);
		} catch (err) {
			console.error("Erreur:", err);
			setError("Impossible de créer le compte. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex-grow-1 overflow-auto">
			<Container className="my-5">
				<div className="row justify-content-center">
					<div className="col-md-10 col-lg-7 col-xl-6">
						<Card className="shadow-sm">
							<Card.Body className="p-4">
								<h2 className="text-center mb-4">Créer un compte</h2>

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

								{success && <Alert variant="success" className="mb-3">{success}</Alert>}

								<Form onSubmit={handleSubmit}>
									<Form.Group className="mb-3">
										<Form.Label>Pseudo (optionnel)</Form.Label>
										<Form.Control
											type="text"
											name="username"
											value={formData.username}
											onChange={handleChange}
											autoComplete="username"
											disabled={loading}
											placeholder="Laisser vide pour utiliser l'email"
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Prénom</Form.Label>
										<Form.Control
											type="text"
											name="prenom"
											value={formData.prenom}
											onChange={handleChange}
											autoComplete="given-name"
											disabled={loading}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Nom</Form.Label>
										<Form.Control
											type="text"
											name="nom"
											value={formData.nom}
											onChange={handleChange}
											autoComplete="family-name"
											disabled={loading}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											autoComplete="email"
											disabled={loading}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Mot de passe</Form.Label>
										<Form.Control
											type="password"
											name="password"
											value={formData.password}
											onChange={handleChange}
											autoComplete="new-password"
											disabled={loading}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Confirmer le mot de passe</Form.Label>
										<Form.Control
											type="password"
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleChange}
											autoComplete="new-password"
											disabled={loading}
											required
										/>
									</Form.Group>

									<Button
										variant="primary"
										type="submit"
										className="w-100 mb-3"
										disabled={loading}
									>
										{loading ? "Création..." : "S'inscrire"}
									</Button>

									<p className="text-center text-muted mb-0">
										Déjà inscrit ? <Link to="/connexion">Se connecter</Link>
									</p>
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

export default Inscription;