import { useEffect, useState } from "react"
import { Card, Form, Button, Alert, ListGroup, Spinner } from "react-bootstrap"
import { API_BASE } from "../../config/api"

export default function AdminNews() {
    const [items, setItems] = useState([])
    const [newText, setNewText] = useState("")
    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const load = async () => {
        const r = await fetch(`${API_BASE}/news-admin.php`, { credentials: "include" })
        const raw = await r.text()

        if (!r.ok) throw new Error(`HTTP ${r.status} : ${raw.slice(0, 160)}...`)

        let data
        try {
        data = JSON.parse(raw)
        } catch {
        throw new Error(`Réponse non-JSON (${r.status}) : ${raw.slice(0, 160)}...`)
        }

        if (!data.success) throw new Error(data.error || "Erreur chargement news")
        setItems(data.items || [])
    }

    useEffect(() => {
        let cancelled = false

        const run = async () => {
        setLoading(true)
        setError(null)
        try {
            await load()
        } catch (e) {
            if (!cancelled) setError(e.message)
        } finally {
            if (!cancelled) setLoading(false)
        }
        }

        run()
        return () => {
        cancelled = true
        }
    }, [])

    const addItem = async () => {
        setMsg(null)
        setError(null)

        const text = newText.trim()
        if (!text) return setError("Texte vide.")

        const r = await fetch(`${API_BASE}/news-admin.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
        })

        const data = await r.json()
        if (!r.ok || !data.success) return setError(data.error || "Erreur ajout")

        setNewText("")
        setMsg("News ajoutée.")
        await load()
    }

    const removeItem = async (id) => {
        setMsg(null)
        setError(null)

        const r = await fetch(`${API_BASE}/news-admin.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
        })

        const data = await r.json()
        if (!r.ok || !data.success) return setError(data.error || "Erreur suppression")

        setMsg("News supprimée.")
        await load()
    }

    const moveLocal = (index, dir) => {
        const to = index + dir
        if (to < 0 || to >= items.length) return

        const copy = [...items]
        ;[copy[index], copy[to]] = [copy[to], copy[index]]
        setItems(copy)
    }

    const saveOrder = async () => {
        setMsg(null)
        setError(null)

        const orderedIds = items.map((i) => i.id)
        const r = await fetch(`${API_BASE}/news-admin.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "reorder", orderedIds }),
        })

        const data = await r.json()
        if (!r.ok || !data.success) return setError(data.error || "Erreur enregistrement ordre")

        setMsg("Ordre enregistré.")
        await load()
    }

    return (
        <Card className="shadow-sm mb-4">
        <Card.Body>
            <h2 className="h4 mb-3">Bandeau News</h2>

            {msg && <Alert variant="success">{msg}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form
            className="d-flex gap-2 mb-3"
            onSubmit={(e) => {
                e.preventDefault()
                addItem()
            }}
            >
            <Form.Control
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Nouveau message (ex: 🗞️ ...)"
                disabled={loading}
            />
            <Button type="submit" disabled={loading}>
                Ajouter
            </Button>
            </Form>

            {loading ? (
            <div className="text-center my-3">
                <Spinner size="sm" />
            </div>
            ) : (
            <ListGroup className="mb-3">
                {items.map((it, idx) => (
                <ListGroup.Item
                    key={it.id}
                    className="d-flex align-items-center justify-content-between gap-2"
                >
                    <div className="flex-grow-1">{it.text}</div>

                    <div className="d-flex gap-1">
                    <Button variant="outline-secondary" size="sm" onClick={() => moveLocal(idx, -1)}>
                        ↑
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => moveLocal(idx, 1)}>
                        ↓
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => removeItem(it.id)}>
                        Supprimer
                    </Button>
                    </div>
                </ListGroup.Item>
                ))}
            </ListGroup>
            )}

            <Button onClick={saveOrder} disabled={loading || items.length === 0}>
            Enregistrer l’ordre
            </Button>
        </Card.Body>
        </Card>
    )
}