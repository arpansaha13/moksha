import { useEffect } from 'react'
import { useDebouncedFn } from './useDebouncedFn'

type DebouncedFn = (...args: any[]) => void | Promise<void>

export function useDebounce(fn: DebouncedFn, ms: number, deps: React.DependencyList) {
  const debouncedFn = useDebouncedFn(fn, ms, deps)

  useEffect(() => {
    debouncedFn()
  }, [debouncedFn])
}
