import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import Section from '../../Components/Section'
import Banniere from '../../Components/Banniere'

function Projets() {
    return (
        <main className="flex-grow-1 overflow-auto">
            <Banniere />
            <Container className="my-5">
                <Row>
                    <Col lg={9}>
                        <h1 className="display-3 border-bottom border-1 border-dark pb-2 d-inline-block mb-4">Mes Projets</h1>
                        
                        <Row className="g-4">
                            <Col md={6}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="h4">🌐 Site Personnel</Card.Title>
                                        <Card.Text className="text-muted">
                                            Site React déployé sur serveur Apache (Raspberry Pi) avec certificat SSL,
                                            configuration DNS DuckDNS et gestion complète de l'infrastructure.
                                        </Card.Text>
                                        <div className="mb-3">
                                            <Badge bg="info" className="me-1 mb-1">React</Badge>
                                            <Badge bg="info" className="me-1 mb-1">Vite</Badge>
                                            <Badge bg="info" className="me-1 mb-1">Apache</Badge>
                                            <Badge bg="info" className="me-1 mb-1">SSL</Badge>
                                        </div>
                                        <a href="https://damienvdh59250.duckdns.org" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                            Voir le site
                                        </a>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col md={6}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="h4">🔒 Infrastructure Serveur</Card.Title>
                                        <Card.Text className="text-muted">
                                            Configuration serveur web sécurisé : pare-feu UFW, certificats Let's Encrypt,
                                            déploiement automatisé, gestion des VirtualHosts Apache.
                                        </Card.Text>
                                        <div className="mb-3">
                                            <Badge bg="success" className="me-1 mb-1">Linux</Badge>
                                            <Badge bg="success" className="me-1 mb-1">Apache</Badge>
                                            <Badge bg="success" className="me-1 mb-1">Security</Badge>
                                            <Badge bg="success" className="me-1 mb-1">DevOps</Badge>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col md={6}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="h4">📱 Application Web</Card.Title>
                                        <Card.Text className="text-muted">
                                            Développement d'une application web responsive avec interface utilisateur moderne,
                                            système d'authentification et gestion de données.
                                        </Card.Text>
                                        <div className="mb-3">
                                            <Badge bg="primary" className="me-1 mb-1">React</Badge>
                                            <Badge bg="primary" className="me-1 mb-1">Bootstrap</Badge>
                                            <Badge bg="warning" text="dark" className="me-1 mb-1">En cours</Badge>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col md={6}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="h4">🗄️ Base de données</Card.Title>
                                        <Card.Text className="text-muted">
                                            Conception et mise en place d'une base de données relationnelle MariaDB avec
                                            interface de gestion phpMyAdmin et requêtes optimisées.
                                        </Card.Text>
                                        <div className="mb-3">
                                            <Badge bg="info" className="me-1 mb-1">MariaDB</Badge>
                                            <Badge bg="info" className="me-1 mb-1">MySQL</Badge>
                                            <Badge bg="info" className="me-1 mb-1">phpMyAdmin</Badge>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col lg={3}>
                        <Section />
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Projets