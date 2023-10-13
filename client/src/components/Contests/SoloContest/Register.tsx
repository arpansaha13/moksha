import { startTransition, useRef, useState } from 'react'
import { useFetch } from '~/hooks/common/useFetch'
import BaseButton from '~base/BaseButton'
import CsrfField from '~common/CsrfField'
import getFormData from '~/utils/getFormData'

interface RegisterProps {
  contestId: number
  setRegistrationId: React.Dispatch<React.SetStateAction<number | null>>
}

export default function Register({ contestId, setRegistrationId }: RegisterProps) {
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
          setRegistrationId(res.data.id)
          setLoading(false)
        })
      })
      .catch(() => setLoading(false))
  }

  return (
    <form ref={formRef} onSubmit={soloRegister}>
      <div className='not-prose'>
        <BaseButton type='submit' loading={loading}>
          Register
        </BaseButton>
      </div>

      <CsrfField />
    </form>
  )
}
