import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { API_BASE } from "../../config/api";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = useMemo(() => (searchParams.get("token") || "").trim(), [searchParams]);

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!token) {
        setError("Lien invalide : token manquant.");
        return;
        }

        if (password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères.");
        return;
        }

        if (password !== confirm) {
        setError("Les mots de passe ne correspondent pas.");
        return;
        }

        setLoading(true);
        try {
        const response = await fetch(`${API_BASE}/reset-password.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
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
            setError(data?.error || "Impossible de réinitialiser le mot de passe.");
            return;
        }

        setSuccess("Mot de passe mis à jour. Vous pouvez maintenant vous connecter.");
        setPassword("");
        setConfirm("");

        setTimeout(() => navigate("/connexion"), 1200);
        } catch (err) {
        console.error(err);
        setError("Impossible d'envoyer la demande. Veuillez réessayer.");
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
                    <h1 className="h3 mb-4 text-center">Réinitialiser le mot de passe</h1>

                    {!token && (
                    <Alert variant="warning" className="mb-3">
                        Lien invalide ou incomplet. Recommence la procédure “Mot de passe oublié”.
                    </Alert>
                    )}

                    {success && (
                    <Alert variant="success" className="mb-3" onClose={() => setSuccess(null)} dismissible>
                        {success}
                    </Alert>
                    )}

                    {error && (
                    <Alert variant="danger" className="mb-3" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Nouveau mot de passe</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Au moins 8 caractères"
                        disabled={loading || !token}
                        autoComplete="new-password"
                        required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirm">
                        <Form.Label>Confirmer le mot de passe</Form.Label>
                        <Form.Control
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Répétez le mot de passe"
                        disabled={loading || !token}
                        autoComplete="new-password"
                        required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading || !token}>
                        {loading ? "Mise à jour..." : "Mettre à jour"}
                    </Button>
                    </Form>

                    <div className="text-center">
                    <Link to="/connexion" className="text-decoration-none">
                        ← Retour à la connexion
                    </Link>
                    </div>
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

export default ResetPassword;