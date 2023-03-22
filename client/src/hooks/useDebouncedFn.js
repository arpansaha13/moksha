import { useRef } from 'react'

export function useDebouncedFn(fn, ms) {
  const timeoutId = useRef(null)

  const debouncedFn = (...args) => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      fn(...args)
      timeoutId.current = null
    }, ms)
  }

  return debouncedFn
}
