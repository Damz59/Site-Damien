import { useState, useEffect } from 'react'

export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState('up')
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY
        
        // Disparaît dès le premier scroll vers le bas (suppression du seuil de 100px)
        if (currentScrollY > lastScrollY && currentScrollY > 0) {
            setScrollDirection('down')
        } else {
            setScrollDirection('up')
        }
        
        setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return scrollDirection
}