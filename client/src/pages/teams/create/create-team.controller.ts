import { useCallback, useRef, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { trim } from '@arpansaha13/utils'
import { useFetch } from '~/hooks/common/useFetch'
import { useNotification } from '~/hooks/useNotification'
import getFormData from '~/utils/getFormData'
import type { CreateTeamFormProps } from './create-team.types'

export function useCreateTeamController() {
  const createdTeam = useLoaderData() as any

  const [notification, { set, setAll }] = useNotification()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setShowNotification = useCallback((bool: boolean) => set('show', bool), [])

  return { createdTeam, notification, setShowNotification, setAllNotification: setAll }
}

export function useCreateTeamFormController({ setShowNotification, setAllNotification }: CreateTeamFormProps) {
  const navigate = useNavigate()
  const fetchHook = useFetch()
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  const createTeam = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    const formData = getFormData(formRef.current)
    formData.team_name = trim(formData.team_name as string)

    fetchHook('teams', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        navigate(`/teams/${res.team_id}`)
        setShowNotification(false)
      })
      .catch(err => {
        if (Number(err.status) !== 409) throw err

        setAllNotification({
          show: true,
          title: 'Team creation failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { formRef, loading, createTeam }
}
