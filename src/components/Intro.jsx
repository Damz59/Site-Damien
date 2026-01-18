import { Container } from 'react-bootstrap'

function Intro() {
    return (
        <Container className="my-5">
            <div className="text-center mb-3">
                <h2 className="display-5 border-bottom border-1 border-dark pb-2 d-inline-block">À propos</h2>
                
                <p className="text-muted text-center text-container my-3">
                    Titulaire d'un <strong>Baccalauréat Technologique Électrotechnique</strong> et fort d'une expérience
                    d'électricien monteur, j'ai développé une approche <strong>rigoureuse et méthodique</strong> face
                    aux problèmes techniques complexes.
                </p>
                
                <p className="text-muted text-center text-container">
                    Passionné par la technologie et l'innovation, j'ai naturellement évolué vers la <strong>programmation
                    et la création de solutions numériques</strong>. Mon expérience m'a permis d'affiner mon esprit d'analyse,
                    ma capacité à travailler en équipe et à respecter des délais exigeants.
                </p>
                
                <p className="text-muted text-center text-container">
                    Aujourd'hui, je suis <strong>en recherche active d'une alternance</strong> en tant que
                    <strong> Développeur Web et Web Mobile</strong> ou <strong>Concepteur Développeur d'Applications</strong>.
                    Mon objectif : concevoir des applications intuitives et efficaces qui répondent aux besoins réels des utilisateurs.
                </p>
            </div>
        </Container>
    )
}

export default Intro