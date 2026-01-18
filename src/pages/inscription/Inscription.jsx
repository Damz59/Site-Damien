import { Container, Form, Button, Card } from 'react-bootstrap'
import { useState } from 'react'

function Inscription() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Inscription:', formData)
        // TODO: Ajouter la logique d'inscription
    }

    return (
        <Container className="my-5">
            <Card className="shadow-sm mx-auto" >
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4">Créer un compte</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
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
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            S'inscrire
                        </Button>

                        <p className="text-center text-muted mb-0">
                            Déjà inscrit ? <a href="/connexion">Se connecter</a>
                        </p>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Inscription