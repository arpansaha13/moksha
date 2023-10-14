import { useCallback, useRef, useState } from 'react'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import { useAppContext } from '~/containers/DataProvider'
import { useFetch } from '~/hooks/common/useFetch'
import getFormData from '~/utils/getFormData'

export function useLoginController() {
  const { setAppContext } = useAppContext()!
  const { setNotification, setAllNotification } = useOutletContext() as any // FIXME: fix types

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const signIn = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)

      const formData = getFormData(formRef.current)

      fetchHook('auth/login', {
        method: 'POST',
        body: formData,
      })
        .then(res => {
          setAppContext('authenticated', true)
          setAppContext('avatar_idx', res.avatar_idx)
          setAppContext('user_id', res.user_id)
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formRef]
  )

  return { loading, formRef, searchParams, signIn }
}
