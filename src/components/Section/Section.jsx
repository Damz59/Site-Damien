// src/components/Section/Section.jsx
import { Card } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import "./Section_style.css";

function Section() {
    return (
        <aside className="d-flex flex-column mt-5 top-section">
        {/* Card 1 - Liens utiles */}
        <Card className="shadow-sm mb-3 rounded-bottom-0 hover-lift">
            <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Liens utiles</h5>
            </Card.Header>
            <Card.Body>
            <ul className="list-unstyled mb-0">
                <li className="mb-2">
                <a
                    href="https://github.com/Damz59"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                >
                    <FaGithub className="me-1" /> Mon GitHub
                </a>
                </li>

                <li className="mb-2">
                <a
                    href="https://www.linkedin.com/in/damien-vandendorpe-81617824a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                >
                    <FaLinkedin className="me-1" /> Mon LinkedIn
                </a>
                </li>

                <li className="mb-2">
                <a
                    href="https://damz59.github.io/Portfolio_DV_2026--Build/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                >
                    <FaGlobe className="me-1" /> Portfolio
                </a>
                </li>

                <li className="mb-0">
                <a
                    href="/CV_2026_Dev_web.pdf"
                    className="text-decoration-none"
                    download
                >
                    📄 Télécharger mon CV
                </a>
                </li>
            </ul>
            </Card.Body>
        </Card>

        {/* Card 2 - Contact */}
        <Card className="shadow-sm mb-3 rounded-0 hover-lift">
            <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Contact rapide</h5>
            </Card.Header>
            <Card.Body>
            <p className="small text-muted mb-1">
                📧{" "}
                <a
                href="mailto:damienvdh59@gmail.com?subject=Contact%20depuis%20le%20site"
                className="email-link"
                title="Envoyer un mail"
                >
                damienvdh59@gmail.com
                </a>
            </p>
            <p className="small text-muted mb-0">📍 Halluin, France</p>
            </Card.Body>
        </Card>

        {/* Card 3 - Informations supplémentaires */}
        <Card className="shadow-sm mb-0 rounded-top-0 hover-lift">
            <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Statut</h5>
            </Card.Header>
            <Card.Body>
            <p className="small text-muted mb-1">🎯 En recherche d&apos;alternance</p>
            <p className="small text-muted mb-0">📅 Disponible immédiatement</p>
            </Card.Body>
        </Card>
        </aside>
    );
}

export default Section;