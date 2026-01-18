import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            
            // Seulement changer l'état si le scroll change vraiment
            if (Math.abs(currentScrollY - lastScrollY) < 5) {
                return // Ignorer les petits mouvements
            }
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scroll vers le bas et dépassé 100px
                setIsVisible(false)
            } else if (currentScrollY < lastScrollY) {
                // Scroll vers le haut
                setIsVisible(true)
            }
            
            setLastScrollY(currentScrollY)
        }

        // Throttle pour éviter trop d'appels
        let ticking = false
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [lastScrollY])

    return (
        <header className={isVisible ? 'header-visible' : 'header-hidden'}>
        <Container fluid className="py-2">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                    <span className="fs-5 fw-bold">DV</span>
                </a>
                
                <ul className="nav">
                    <li className="nav-item"><a href="#" className="nav-link px-2 py-1 link-secondary">Accueil</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 py-1 link-dark">Projets</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 py-1 link-dark">Compétences</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 py-1 link-dark">CV</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 py-1 link-dark">Contact</a></li>
                </ul>
                
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline-primary">Connexion</button>
                    <button 
                        type="button" 
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate('/inscription')}>
                        S'inscrire
                    </button>
                </div>
            </div>
        </Container>
        <Container className="py-2">
            <h1 className="display-5 fw-bold mb-1">Damien Vandendorpe</h1>
            <p className="lead mb-1">Développeur Web Junior | Recherche stage développeur Web ou Fullstack en alternance</p>
        </Container>
        </header>
    )
}

export default Header