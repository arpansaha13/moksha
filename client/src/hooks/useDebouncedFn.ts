import { useRef } from 'react'

export function useDebouncedFn(fn: (...args: any[]) => void, ms: number) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const debouncedFn = (...args: any[]) => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      fn(...args)
      timeoutId.current = null
    }, ms)
  }

  return debouncedFn
}
