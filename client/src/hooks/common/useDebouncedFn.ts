import { useCallback, useRef } from 'react'

type DebouncedFn = (...args: any[]) => void | Promise<void>

export function useDebouncedFn(fn: DebouncedFn, ms: number, deps: React.DependencyList) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const debouncedFn: DebouncedFn = useCallback((...args: any[]) => {
    if (timeoutId.current !== null) clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      // eslint-disable-next-line no-extra-semi
      ;(async () => {
        await fn(...args)
        timeoutId.current = null
      })()
    }, ms)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return debouncedFn
}
