import { Card } from 'react-bootstrap'

function Section() {
    return (
        <aside className="d-flex flex-column mt-5 top-section">
            {/* Card 1 - Liens utiles */}
            <Card className="shadow-sm mb-3 rounded-bottom-0">
                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Liens utiles</h5>
                </Card.Header>
                <Card.Body>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                            <a href="#" className="text-decoration-none">🔗 Mon GitHub</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="text-decoration-none">🔗 Mon LinkedIn</a>
                        </li>
                        <li className="mb-0">
                            <a href="#" className="text-decoration-none">📄 Télécharger mon CV</a>
                        </li>
                    </ul>
                </Card.Body>
            </Card>
            
            {/* Card 2 - Contact */}
            <Card className="shadow-sm mb-3 rounded-0">
                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Contact rapide</h5>
                </Card.Header>
                <Card.Body>
                    <p className="small text-muted mb-1">📧 damienvdh59@gmail.com</p>
                    <p className="small text-muted mb-0">📍 Lille, France</p>
                </Card.Body>
            </Card>
            
            {/* Card 3 - Informations supplémentaires */}
            <Card className="shadow-sm mb-0 rounded-top-0">
                <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">Statut</h5>
                </Card.Header>
                <Card.Body>
                    <p className="small text-muted mb-1">🎯 En recherche d'alternance</p>
                    <p className="small text-muted mb-0">📅 Disponible immédiatement</p>
                </Card.Body>
            </Card>
        </aside>
    )
}

export default Section