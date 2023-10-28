import { startTransition, useEffect, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useFetch } from '~/hooks/common/useFetch'
import { useStore } from '~/store'
import type { SoloRegistrationProps } from './solo-registration.types'

export function useSoloRegistrationController({ contest }: SoloRegistrationProps) {
  const authState = useStore(state => state.authState)
  const fetchHook = useFetch()
  const [registrationId, setRegistrationId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authState.authenticated) {
      const params = new URLSearchParams({ contest_id: contest.id.toString() })

      fetchHook(`contests/solo/registration?${params.toString()}`).then(({ data }) => {
        if (isNullOrUndefined(data)) setRegistrationId(null)
        else setRegistrationId(data.id)

        startTransition(() => setLoading(false))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, registrationId, setRegistrationId }
}
