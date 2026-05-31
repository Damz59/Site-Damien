import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API_BASE } from "../../config/api";

function MotDePasseOublie() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const value = email.trim();
        if (!value) {
        setError("Veuillez saisir votre e-mail.");
        setLoading(false);
        return;
        }

        try {
        const response = await fetch(`${API_BASE}/forgot-password.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: value }),
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
            setError(data?.error || "Impossible de traiter la demande.");
            return;
        }

        // Important : on évite de révéler si le compte existe ou non
        setSuccess(
            "Si un compte correspond à cet e-mail, un e-mail de réinitialisation a été envoyé."
        );
        setEmail("");
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
                    <h1 className="h3 mb-4 text-center">Mot de passe oublié</h1>

                    {success && (
                    <Alert
                        variant="success"
                        className="mb-3"
                        onClose={() => setSuccess(null)}
                        dismissible
                    >
                        {success}
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
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ex: Example@msg.com"
                        disabled={loading}
                        autoComplete="email"
                        required
                        />
                        <Form.Text className="text-muted">
                        Nous vous enverrons un lien si un compte correspond.
                        </Form.Text>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? "Envoi..." : "Envoyer le lien"}
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

export default MotDePasseOublie;