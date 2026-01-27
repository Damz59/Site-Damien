import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { useState } from 'react'
import Section from '../../Components/Section'
import Banniere from '../../Components/Banniere'

function Contact() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        sujet: '',
        message: ''
    })
    
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        try {
            const response = await fetch('https://damienvdh59250.duckdns.org/api/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            
            const data = await response.json()
            
            if (data.success) {
                setSubmitted(true)
                // Réinitialiser le formulaire après 3 secondes
                setTimeout(() => {
                    setSubmitted(false)
                    setFormData({
                        nom: '',
                        prenom: '',
                        email: '',
                        sujet: '',
                        message: ''
                    })
                }, 3000)
            } else {
                setError(data.error || 'Une erreur est survenue')
            }
        } catch (err) {
            console.error('Erreur:', err)
            setError('Impossible d\'envoyer le message. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex-grow-1 overflow-auto">
            <Banniere />
            <Container className="my-5">
                <Row>
                    <Col lg={9}>
                        <h1 className="display-3 border-bottom border-1 border-dark pb-2 d-inline-block mb-4">Contact</h1>
                        
                        {submitted && (
                            <Alert variant="success" className="mb-4">
                                <strong>✓ Message envoyé !</strong> Merci pour votre message, je vous répondrai dans les plus brefs délais.
                            </Alert>
                        )}
                        
                        {error && (
                            <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
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
                                        {loading ? '📤 Envoi en cours...' : '📧 Envoyer le message'}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        
                        <Card className="shadow-sm mt-4">
                            <Card.Body>
                                <h3 className="h5 mb-3">Autres moyens de me contacter</h3>
                                <Row>
                                    <Col md={4} className="mb-3 mb-md-0">
                                        <div className="text-center">
                                            <div className="fs-2 mb-2">📧</div>
                                            <p className="small text-muted mb-0">Email</p>
                                            <p className="small">damienvdh59@gmail.com</p>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-3 mb-md-0">
                                        <div className="text-center">
                                            <div className="fs-2 mb-2">📍</div>
                                            <p className="small text-muted mb-0">Localisation</p>
                                            <p className="small">Halluin, France</p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="text-center">
                                            <div className="fs-2 mb-2">💼</div>
                                            <p className="small text-muted mb-0">LinkedIn</p>
                                            <a href="https://www.linkedin.com/in/damien-vandendorpe-81617824a" target="_blank" rel="noopener noreferrer" className="small">Mon profil</a>
                                        </div>
                                    </Col>
                                </Row>
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