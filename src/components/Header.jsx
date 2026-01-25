import { Link, useLocation } from 'react-router-dom'
import { useScrollDirection } from '../hooks/useScrollDirection'

function Header() {
    const scrollDirection = useScrollDirection()
    const location = useLocation()
    
    return (
        <header className={`bg-white border-bottom shadow-sm transition-header ${scrollDirection === 'down' ? 'header-hidden' : ''}`}>
        <div className="container-fluid py-3">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
            <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
                <span className="fs-4 fw-bold">DV</span>
            </Link>
            
            <ul className="nav">
                <li className="nav-item">
                <Link to="/" className={`nav-link px-3 ${location.pathname === '/' ? 'link-secondary' : 'link-dark'}`}>
                    Accueil
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/projets" className={`nav-link px-3 ${location.pathname === '/projets' ? 'link-secondary' : 'link-dark'}`}>
                    Projets
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/cv-competences" className={`nav-link px-3 ${location.pathname === '/cv-competences' ? 'link-secondary' : 'link-dark'}`}>
                    CV / Compétences
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/contact" className={`nav-link px-3 ${location.pathname === '/contact' ? 'link-secondary' : 'link-dark'}`}>
                    Contact
                </Link>
                </li>
            </ul>
            
            <div className="d-flex gap-2">
                <Link to="/connexion" className="btn btn-outline-primary">Connexion</Link>
                <Link to="/inscription" className="btn btn-primary text-decoration-none">S'inscrire</Link>
            </div>
            </div>
        </div>
        </header>
    )
}

export default Header