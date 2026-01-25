import { Container, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Connexion() {
    return (
        <main className="flex-grow-1 overflow-auto d-flex align-items-center">
            <Container className="py-3">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <Card className="shadow-sm">
                            <Card.Body className="p-4">
                                <h1 className="h3 mb-4 text-center">Connexion</h1>
                                
                                <Form>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Adresse email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="exemple@email.com"
                                            autoComplete="email"
                                            required 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Votre mot de passe"
                                            autoComplete="current-password"
                                            required 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formRemember">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Se souvenir de moi" 
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 mb-3">
                                        Se connecter
                                    </Button>
                                </Form>

                                <div className="text-center">
                                    <Link to="#" className="text-muted small">Mot de passe oublié ?</Link>
                                </div>

                                <hr className="my-4" />

                                <div className="text-center">
                                    <p className="text-muted mb-2">Pas encore de compte ?</p>
                                    <Link to="/inscription" className="btn btn-outline-primary">
                                        Créer un compte
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
    )
}

export default Connexion