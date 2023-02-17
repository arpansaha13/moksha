/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react"

export function useSize(ref) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })
  }, [ref])

  return size
}