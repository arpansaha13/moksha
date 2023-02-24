import { useEffect, useRef } from "react"
import { useLocation } from 'react-router-dom'

export function useHashLink() {
  const hashElRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (hashElRef.current) {
      window.scrollTo({
        top: hashElRef.current.offsetTop,
        behavior: 'smooth'
      })
    }
  }, [location.hash])

  const hashRef = id => ref => {
      if (location.hash.replace('#', '') === id) {
      hashElRef.current = ref
    }
  }

  return hashRef
}
