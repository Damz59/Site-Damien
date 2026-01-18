import { useState, useEffect } from 'react'

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState('up')
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scroll vers le bas et dépassé 100px
                setScrollDirection('down')
            } else {
                // Scroll vers le haut
                setScrollDirection('up')
            }
            
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return scrollDirection
}