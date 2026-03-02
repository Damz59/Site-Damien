import { useEffect, useState } from "react"
import "./News_style.css"
import { API_BASE } from "../../config/api"

function News() {
    const [items, setItems] = useState([])

    useEffect(() => {
        const loadNews = async () => {
        try {
            const res = await fetch(`${API_BASE}/news.php`)
            const data = await res.json()

            if (data.success) setItems(data.items || [])
            else setItems([])
        } catch (e) {
            console.error("Erreur chargement news:", e)
            setItems([])
        }
        }

        loadNews()
    }, [])

    useEffect(() => {
        const ticker = document.getElementById("news-ticker")
        if (!ticker) return

        const texts = items.length ? items.map((i) => i.text) : ["Aucune nouveauté pour le moment."]
        const html = texts.map((t) => `<span>${t}</span>`).join("")
        ticker.innerHTML = html + html
    }, [items])

    return (
        <div className="App">
        <div className="gazette-wrapper">
            <img
            src="/Bandeau_newspaper.png"
            alt="Damien's Daily News Website"
            className="bandeau-newspaper"
            />
            <div className="news-container">
            <span className="news-title">Nouveautés</span>
            <div className="news-ticker-wrapper">
                <div className="news-ticker" id="news-ticker"></div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default News