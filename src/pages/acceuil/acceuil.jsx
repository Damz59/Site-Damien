import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import Header from "../../components/Header/Header.jsx"
import Body from "../../components/Body/Body.jsx"
import Section from "../../components/Section/Section.jsx" 
import Footer from "../../components/Footer/Footer.jsx"
import '../../App.css'

function Acceuil() {
    return (
        <div className="d-flex flex-column min-vh-100">  
        <Header />  
        <Container fluid className="flex-grow-1">
            <Row className="g-4">
            <Col lg={9}>
                <Body />
            </Col>
            <Col lg={3} className="pe-0">
                <Section />
            </Col>
            </Row>
        </Container>
        <Footer />  
        </div>
    )
}

export default Acceuil