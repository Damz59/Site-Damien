import { Alert } from 'react-bootstrap'
import "./Banniere_style.css"

function Banniere() {
    return (
        <Alert variant="warning" className="mb-0 text-center rounded-0">
            <strong>🚧 Site en construction</strong> - Site en cours de développement 🚧
        </Alert>
    )
}

export default Banniere