import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { trim } from '@arpansaha13/utils'
import { useFetch } from '~/hooks/common/useFetch'
import { useNotification } from '~/hooks/useNotification'
import type { CreateTeamFormProps } from './create-team.types'

interface CreateTeamFormData {
  team_name: string
}

export function useCreateTeamController() {
  const createdTeam = useLoaderData() as any

  const [notification, { set, setAll }] = useNotification()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setShowNotification = useCallback((bool: boolean) => set('show', bool), [])

  return { createdTeam, notification, setShowNotification, setAllNotification: setAll }
}

export function useCreateTeamFormController({ setShowNotification, setAllNotification }: CreateTeamFormProps) {
  const { register: formRegister, handleSubmit } = useForm<CreateTeamFormData>()
  const navigate = useNavigate()
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const createTeam = handleSubmit((formData: CreateTeamFormData) => {
    setLoading(true)
    formData.team_name = trim(formData.team_name)

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
  })

  return { loading, createTeam, formRegister }
}
