import { useEffect, useState } from 'react'

export function useScrolling(ref) {
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const refCurrent = ref.current
      let scrollingTimeout

      const handleScrollEnd = () => setScrolling(false)

      const handleScroll = () => {
        setScrolling(true)
        clearTimeout(scrollingTimeout)
        scrollingTimeout = setTimeout(() => handleScrollEnd(), 150) // lasts for 150ms
      }

      refCurrent.addEventListener('scroll', handleScroll, false)

      return () => {
        if (refCurrent) {
          refCurrent.removeEventListener('scroll', handleScroll, false)
        }
      }
    }
    return () => {}
  }, [ref])

  return scrolling
}
