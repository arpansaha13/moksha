import { useEffect } from 'react'

export function useEventListener(ref, event, listener, deps = []) {
  useEffect(() => {
    if (ref.current) {
      const refCurrent = ref.current
      refCurrent.addEventListener(event, listener)

      return () => {
        if (refCurrent) refCurrent.removeEventListener(event, listener)
      }
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps])
}
