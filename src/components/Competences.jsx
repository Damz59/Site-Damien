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
        </>
    )
}

export default Competences