import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import { useEffect, useState } from "react"
import Section from "../../components/Section/Section.jsx"
import Banniere from "../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../components/Banniere_isConnected/Banniere_isConnected"
import { API_BASE } from "../../config/api"
import "./Contact_style.css"

function Contact({ authUser }) {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        sujet: "",
        message: "",
    })

    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // Pré-remplissage si connecté (sans sujet ni message)
    useEffect(() => {
        if (!authUser) return
        setFormData((prev) => ({
        ...prev,
        prenom: authUser.prenom || prev.prenom || "",
        nom: authUser.nom || prev.nom || "",
        email: authUser.email || prev.email || "",
        // sujet et message restent tels quels
        }))
    }, [authUser])

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
        const response = await fetch(`${API_BASE}/contact.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (data.success) {
            setSubmitted(true)
            setTimeout(() => {
            setSubmitted(false)
            // Reset : on garde les infos connues si connecté
            setFormData((prev) => ({
                nom: authUser?.nom || prev.nom || "",
                prenom: authUser?.prenom || prev.prenom || "",
                email: authUser?.email || prev.email || "",
                sujet: "",
                message: "",
            }))
            }, 3000)
        } else {
            setError(data.error || "Une erreur est survenue")
        }
        } catch (err) {
        console.error("Erreur:", err)
        setError("Impossible d'envoyer le message. Veuillez réessayer.")
        } finally {
        setLoading(false)
        }
    }

    return (
        <main className="flex-grow-1 overflow-auto">
        <Banniere />
        {authUser && (
            <div className="mt-3">
            <BanniereIsConnected authUser={authUser} />
            </div>
        )}

        <Container className="my-5">
            <Row>
            <Col lg={9}>
                <h1 className="display-3 border-bottom border-1 border-dark pb-2 d-inline-block mb-4">
                Contact
                </h1>

                {submitted && (
                <Alert variant="success" className="mb-4">
                    <strong>✓ Message envoyé !</strong> Merci pour votre message, je
                    vous répondrai dans les plus brefs délais.
                </Alert>
                )}

                {error && (
                <Alert
                    variant="danger"
                    className="mb-4"
                    onClose={() => setError(null)}
                    dismissible
                >
                    <strong>Erreur :</strong> {error}
                </Alert>
                )}

                <Card className="shadow-sm">
                <Card.Body className="p-4">
                    <h2 className="h4 mb-4">Envoyez-moi un message</h2>

                    <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Prénom *</Form.Label>
                            <Form.Control
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            autoComplete="given-name"
                            placeholder="Votre prénom"
                            disabled={loading}
                            required
                            />
                        </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom *</Form.Label>
                            <Form.Control
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            autoComplete="family-name"
                            placeholder="Votre nom"
                            disabled={loading}
                            required
                            />
                        </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="votre.email@exemple.com"
                        disabled={loading}
                        required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Sujet *</Form.Label>
                        <Form.Control
                        type="text"
                        name="sujet"
                        value={formData.sujet}
                        onChange={handleChange}
                        placeholder="Objet de votre message"
                        disabled={loading}
                        required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Votre message..."
                        disabled={loading}
                        required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? "📤 Envoi en cours..." : "📧 Envoyer le message"}
                    </Button>
                    </Form>
                </Card.Body>
                </Card>
            </Col>

            <Col lg={3}>
                <Section />
            </Col>
            </Row>
        </Container>
        </main>
    )
}

export default Contact