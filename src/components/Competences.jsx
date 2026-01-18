import { Row, Col, Card, Badge } from 'react-bootstrap'

function Competences() {
    return (
        <>
            <h2 className="text-center mb-4">Compétences Techniques</h2>
            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="h-100 shadow-sm service-card">
                        <Card.Body>
                            <Card.Title className="h4 text-primary">⚛️ Frontend</Card.Title>
                            <div className="mb-2">
                                <Badge bg="primary" className="me-1 mb-1">React</Badge>
                                <Badge bg="primary" className="me-1 mb-1">Vite</Badge>
                                <Badge bg="primary" className="me-1 mb-1">JavaScript</Badge>
                                <Badge bg="primary" className="me-1 mb-1">HTML/CSS</Badge>
                                <Badge bg="primary" className="me-1 mb-1">Bootstrap</Badge>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={4}>
                    <Card className="h-100 shadow-sm service-card">
                        <Card.Body>
                            <Card.Title className="h4 text-primary">🔧 Backend & DevOps</Card.Title>
                            <div className="mb-2">
                                <Badge bg="success" className="me-1 mb-1">Node.js</Badge>
                                <Badge bg="success" className="me-1 mb-1">Apache</Badge>
                                <Badge bg="success" className="me-1 mb-1">Linux</Badge>
                                <Badge bg="success" className="me-1 mb-1">SSH</Badge>
                                <Badge bg="success" className="me-1 mb-1">Git</Badge>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={4}>
                    <Card className="h-100 shadow-sm service-card">
                        <Card.Body>
                            <Card.Title className="h4 text-primary">🗄️ Base de données</Card.Title>
                            <div className="mb-2">
                                <Badge bg="warning" text="dark" className="me-1 mb-1">MariaDB</Badge>
                                <Badge bg="warning" text="dark" className="me-1 mb-1">MySQL</Badge>
                                <Badge bg="warning" text="dark" className="me-1 mb-1">phpMyAdmin</Badge>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <h2 className="text-center mb-4">Projets</h2>
            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="h5">🌐 Site Personnel</Card.Title>
                            <Card.Text className="text-muted">
                                Site React déployé sur serveur Apache (Raspberry Pi) avec certificat SSL,
                                configuration DNS DuckDNS et gestion complète de l'infrastructure.
                            </Card.Text>
                            <Badge bg="info" className="me-1">React</Badge>
                            <Badge bg="info" className="me-1">Apache</Badge>
                            <Badge bg="info" className="me-1">SSL</Badge>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="h5">🔒 Infrastructure</Card.Title>
                            <Card.Text className="text-muted">
                                Configuration serveur web sécurisé : pare-feu UFW, certificats Let's Encrypt,
                                déploiement automatisé, gestion des VirtualHosts Apache.
                            </Card.Text>
                            <Badge bg="info" className="me-1">Linux</Badge>
                            <Badge bg="info" className="me-1">Security</Badge>
                            <Badge bg="info" className="me-1">DevOps</Badge>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Competences