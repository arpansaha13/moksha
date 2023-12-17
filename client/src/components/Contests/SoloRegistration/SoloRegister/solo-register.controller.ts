import { startTransition, useRef, useState } from 'react'
import { useFetch } from '~/hooks/common/useFetch'
import getFormData from '~/utils/getFormData'
import type { SoloRegisterProps } from './solo-register.types'

export function useSoloRegisterController({ contestId, setRegistrationId }: Readonly<SoloRegisterProps>) {
  const fetchHook = useFetch()
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  function soloRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current!)
    formData.contest_id = contestId.toString()

    fetchHook('contests/solo/registration', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        startTransition(() => {
          setRegistrationId(res.id)
          setLoading(false)
        })
      })
      .catch(() => setLoading(false))
  }

  return { formRef, loading, soloRegister }
}
