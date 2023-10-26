import { startTransition, useState } from 'react'
import { useFetch } from '~/hooks/common/useFetch'
import type { RegisteredProps } from './registered.types'

export function useRegisteredController({ contestId, team, setRegistration }: RegisteredProps) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  function cancelRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    fetchHook('contests/team/registration', {
      method: 'DELETE',
      body: {
        team_id: team.team_id,
        contest_id: contestId,
      },
    })
      .then(() =>
        startTransition(() => {
          setRegistration(null)
          setLoading(false)
        })
      )
      .catch(() => setLoading(false))
  }

  return { loading, cancelRegistration }
}
