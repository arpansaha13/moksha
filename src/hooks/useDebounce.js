import { useEffect } from 'react'
import { useDebouncedFn } from './useDebouncedFn'

export function useDebounce(fn, ms, deps) {
  const debouncedFn = useDebouncedFn(fn, ms)
  useEffect(debouncedFn, deps)
}
