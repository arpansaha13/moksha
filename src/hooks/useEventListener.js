import { useEffect } from "react";

export function useEventListener(ref, event, listener) {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(event, listener)

      return () => {
        if (ref.current) ref.current.removeEventListener(event, listener)
      }
    }
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
