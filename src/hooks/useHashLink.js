import { useEffect } from "react"
import { useLocation } from 'react-router-dom'

export function useHashLink() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const el = document.getElementById(location.hash.replace('#', ''))

    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth'
      })
    }
  }, [location.hash])
}
