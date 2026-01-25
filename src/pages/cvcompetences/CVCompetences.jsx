import { Container, Row, Col } from 'react-bootstrap'
import Competences from '../../Components/Competences'
import Section from '../../Components/Section'
import Banniere from '../../Components/Banniere'

function CVCompetences() {
    return (
        <main className="flex-grow-1 overflow-auto">
            <Banniere />
            <Container className="my-5">
                <Row>
                    <Col lg={9}>
                        <h1 className="display-3 border-bottom border-1 border-dark pb-2 d-inline-block mb-4">CV & Compétences</h1>
                        <Competences />
                    </Col>
                    
                    <Col lg={3}>
                        <Section />
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default CVCompetences