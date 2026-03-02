// src/pages/user/User.jsx

import { useEffect, useState } from "react"
import { Container, Card, Spinner, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API_BASE } from "../../config/api"

export default function User() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const run = async () => {
            try {
            const res = await fetch(`${API_BASE}/check-auth.php`, {
                credentials: "include",
            })
            const data = await res.json()

            if (!res.ok || !data.authenticated) {
                navigate("/connexion")
                return
            }

            setUser(data.user)
            } catch (e) {
                console.error(e)
                setError("Impossible de charger l'espace utilisateur.")
            } finally {
            setLoading(false)
            }
        }

        run()
        }, [navigate])

    if (loading) {
        return (
        <div className="text-center my-5">
            <Spinner />
        </div>
        )
    }

    if (error) {
        return (
        <Alert variant="danger" className="m-4">
            {error}
        </Alert>
        )
    }

    const displayName = user?.prenom || user?.username || "!"

    return (
        <main className="flex-grow-1 overflow-auto">
        <Container className="my-5">
            <Card className="shadow-sm">
            <Card.Body>
                <h1 className="h4 mb-2">Espace utilisateur</h1>
                <p className="text-muted mb-0">Bienvenue {displayName} !</p>
            </Card.Body>
            </Card>
        </Container>
        </main>
    )
}