import { startTransition, useRef, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import BaseButton from '../../base/BaseButton'
import CsrfField from '../../common/CsrfField'
import getFormData from '../../../utils/getFormData'

export default function Register({ setRegistrationId, contestId }) {
  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  function soloRegister(e) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current, { format: 'object' })
    formData.contest_id = contestId

    fetchHook('contests/solo/registration', {
      method: 'POST',
      body: JSON.stringify(formData),
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
