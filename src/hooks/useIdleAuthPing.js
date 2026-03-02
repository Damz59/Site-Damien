import { useEffect, useRef } from "react"

/**
 * Déclenche refreshAuth() uniquement après une période d’inactivité utilisateur.
 *
 * - Écoute des événements d’activité (mousemove, keydown, scroll, etc.)
 * - (Re)programme un timer à chaque activité
 * - Si aucune activité pendant idleMs, appelle refreshAuth()
 *
 * @param {Function} refreshAuth - fonction async qui appelle check-auth.php et gère le 401
 * @param {Object} options
 * @param {number} options.idleMs - durée d'inactivité avant de ping (ex: 60_000 = 1 min)
 */
export default function useIdleAuthPing(refreshAuth, { idleMs = 90_000 } = {}) {
    // Init "pure" : pas d'appel Date.now() pendant le rendu
    const lastActivityRef = useRef(0)
    const timerRef = useRef(null)

    useEffect(() => {
        const markActivity = () => {
        lastActivityRef.current = Date.now()

        // On annule le timer et on le reprogramme à chaque activité
        if (timerRef.current) clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            // Si aucune activité pendant idleMs, on ping
            const inactiveFor = Date.now() - lastActivityRef.current
            if (inactiveFor >= idleMs) {
            // pas besoin d'await ici
            refreshAuth?.()
            }
        }, idleMs)
        }

        // Événements d’activité (tu peux en retirer/ajouter)
        const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"]
        events.forEach((evt) => window.addEventListener(evt, markActivity, { passive: true }))

        // Initialise le timer au montage
        markActivity()

        return () => {
        events.forEach((evt) => window.removeEventListener(evt, markActivity))
        if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [refreshAuth, idleMs])
}