import { Container } from 'react-bootstrap'
import Intro from "./Intro.jsx"
import Competences from "./Competences.jsx"
import Banniere from './Banniere'

function Body() {
    return (
        <main className="flex-grow-1 overflow-auto">
            <Banniere />
            <Container className="">
                <h1 className="display-3 border-bottom border-1 border-dark pb-2 d-inline-block">Bienvenue sur mon site !</h1>
                <Intro />
                <Competences />
            </Container>
        </main>
    )
}

export default Body