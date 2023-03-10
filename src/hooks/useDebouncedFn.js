import { useCallback, useRef } from "react"

export function useDebouncedFn(fn, ms) {
  const timeoutId = useRef(null)

  const debouncedFn = useCallback((...args) => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      fn()
      timeoutId.current = null
    }, ms, ...args)
  })

  return debouncedFn
}
