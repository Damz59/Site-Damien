import { Container, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
        <main className="flex-grow-1 overflow-auto">
            <Container className="my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <Card className="shadow-sm">
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
                                            autoComplete="given-name"
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
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 mb-3">
                                        S'inscrire
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
    )
}

export default Inscription