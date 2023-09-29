import { useEffect } from 'react'
import { useDebouncedFn } from './useDebouncedFn'

export function useDebounce(fn: (...args: any[]) => void, ms: number, deps: React.DependencyList) {
  const debouncedFn = useDebouncedFn(fn, ms)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(debouncedFn, deps)
}
