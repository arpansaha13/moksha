import { startTransition, useState } from 'react'
import { useFetch } from '~/hooks/common/useFetch'
import type { CancelRegistrationProps } from './cancel-registration.types'

export function useCancelRegistrationController({ registrationId, setRegistrationId }: CancelRegistrationProps) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  function cancelRegistration() {
    setLoading(true)

    fetchHook(`contests/solo/registration`, {
      method: 'DELETE',
      body: {
        solo_reg_id: registrationId,
      },
    }).then(() => {
      startTransition(() => {
        setRegistrationId(null)
        setLoading(false)
      })
    })
  }

  return { loading, cancelRegistration }
}
