import { useEffect, useRef } from 'react'
import { register as Tz3dCardRegister } from '@tranzis/core/Tz3dCard'
import { register as TzGallery1Register } from '@tranzis/core/TzGallery1'

export function useCe() {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      Tz3dCardRegister()
      TzGallery1Register()

      isFirstRender.current = false
    }
  }, [isFirstRender])
}
