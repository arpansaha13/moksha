import { useState } from 'react'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useStore } from '~/store'
import { useFetch } from '~/hooks/common/useFetch'

interface LoginFormData {
  username: string
  password: string
}

export function useLoginController() {
  const { register: formRegister, handleSubmit } = useForm<LoginFormData>()

  const setAuthState = useStore(state => state.setAuthState)
  const { setNotification, setAllNotification } = useOutletContext() as any // FIXME: fix types

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const signIn = handleSubmit((formData: LoginFormData) => {
    setLoading(true)

    fetchHook('auth/login', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        setAuthState('authenticated', true)
        setAuthState('avatar_idx', res.avatar_idx)
        setAuthState('user_id', res.user_id)
        setNotification('show', false)

        if (searchParams.get('from')) navigate(decodeURIComponent(searchParams.get('from')!), { replace: true })
        else navigate('/', { replace: true })
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Login failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  })

  return { loading, searchParams, formRegister, signIn }
}
