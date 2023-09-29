import { useEffect, useRef } from 'react'

export function useScrollbarWidth() {
  const scrollbarWidth = useRef(0)
  const div = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    div.current = document.createElement('div')

    div.current.style.overflowY = 'scroll'
    div.current.style.width = '50px'
    div.current.style.height = '50px'

    // must put it in the document, otherwise sizes will be 0
    document.body.append(div.current)
    scrollbarWidth.current = div.current.offsetWidth - div.current.clientWidth

    div.current.remove()

    return () => div.current?.remove()
  })

  return scrollbarWidth
}
