import { useScrollDirection } from '../hooks/useScrollDirection'

function Header() {
    const scrollDirection = useScrollDirection()
    
    return (
        <header className={`bg-white border-bottom shadow-sm transition-header ${scrollDirection === 'down' ? 'header-hidden' : ''}`}>
        <div className="container-fluid py-3">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
            <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                <span className="fs-4 fw-bold">DV</span>
            </a>
            
            <ul className="nav">
                <li className="nav-item"><a href="#" className="nav-link px-3 link-secondary">Accueil</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-3 link-dark">Projets</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-3 link-dark">Compétences</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-3 link-dark">CV</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-3 link-dark">Contact</a></li>
            </ul>
            
            <div className="d-flex gap-2">
                <button type="button" className="btn btn-outline-primary">Connexion</button>
                <button type="button" className="btn btn-primary">S'inscrire</button>
            </div>
            </div>
        </div>
        </header>
    )
}

export default Header