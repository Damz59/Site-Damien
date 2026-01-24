import { Card } from 'react-bootstrap'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from "react"

function Section() {
    const [copied, setCopied] = useState(false)

    const copyEmail = () => {
    navigator.clipboard.writeText('damienvdh59@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    }
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
                            <a href="https://github.com/Damz59" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <FaGithub className="me-1" /> Mon GitHub
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="https://www.linkedin.com/in/damien-vandendorpe-81617824a" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            <FaLinkedin className="me-1" /> Mon LinkedIn
                            </a>
                        </li>
                        <li className="mb-0">
                            <a href="/CV_2026_Dev_web.pdf" className="text-decoration-none" download> 📄 Télécharger mon CV</a>
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
                    <p className="small text-muted mb-1">
                        📧  <span 
                                onClick={copyEmail} 
                                className="email-link"
                                title="Cliquer pour copier">
                                damienvdh59@gmail.com
                            </span>
                        {copied && <span className="text-success ms-2">✓ Copié!</span>}
                    </p>
                    <p className="small text-muted mb-0">📍 Halluin, France</p>
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