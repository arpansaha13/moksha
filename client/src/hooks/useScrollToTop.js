import { isNullOrUndefined } from '@arpansaha13/utils'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop(ref = null) {
  const location = useLocation()

  useEffect(() => {
    let el

    if (!isNullOrUndefined(ref)) {
      if (!isNullOrUndefined(ref.current)) el = ref.current
      // If ref is provided but ref.current is null, then don't do anything
      // probably ref.current is null initially and will change in future renders
      else return
    } else {
      el = window
    }

    el.scrollTo({ top: 0 })
  }, [ref, location.key])
}
