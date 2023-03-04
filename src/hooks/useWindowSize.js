import { useEffect, useState } from 'react'

export function useWindowSize() {

  const [windowWidth, setWindowWidth] = useState(null)
  const [windowHeight, setWindowHeight] = useState(null)

  useEffect(() => {
    setWindowWidth(window.screen.width)
    setWindowHeight(window.screen.height)
  }, [])

  return { windowWidth, windowHeight }
}
