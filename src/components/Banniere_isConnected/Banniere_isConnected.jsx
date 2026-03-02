
import { Alert } from "react-bootstrap"

export default function BanniereIsConnected({ authUser }) {
    if (!authUser) return null

    const prenom = authUser.prenom || authUser.username || "Utilisateur"
    const role = authUser.role || "user"
    const roleTitle = role.toUpperCase()

    return (
        <Alert variant="warning" className="mb-0 text-center rounded-0">
        <strong>{roleTitle}</strong>
        <br />
        Bienvenue {prenom}, vous êtes connecté(e) en tant que <strong>{role}</strong>, bonne navigation !
        </Alert>
    )
}
