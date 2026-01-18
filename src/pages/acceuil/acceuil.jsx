import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import Header from "../../Components/Header.jsx"
import Body from "../../Components/Body.jsx"
import Section from "../../Components/Section.jsx" 
import Footer from "../../Components/Footer.jsx"
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