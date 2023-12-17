import { useCallback, useEffect, useRef, useState } from 'react'
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import type { OtpFormProps, ResendOtpCoolDownProps } from './verification.types'

export function useVerificationController() {
  const linkIsValid = useLoaderData()
  const [verified, setVerified] = useState(false)

  return { linkIsValid, verified, setVerified }
}

export function useOtpFormController({ setVerified }: Readonly<OtpFormProps>) {
  const params = useParams()
  const { setNotification, setAllNotification } = useOutletContext() as any

  const fetchHook = useFetch()

  const [otpValue, setOtpValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [coolDownIsActive, setCoolDown] = useState(false)

  const onCoolDownEnd = useCallback(() => setCoolDown(false), [setCoolDown])

  function verifyOTP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = {
      otp: otpValue,
    }

    fetchHook(`auth/verification/${params.hash}`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        setVerified(true)
        setNotification('show', false)
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Validation failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  }

  function resendOTP() {
    setCoolDown(true)

    fetchHook(`auth/resend-otp/${params.hash}`)
      .then(() => {
        setAllNotification({
          show: true,
          title: 'OTP sent',
          description: 'The OTP has been sent to your email',
          status: 'success',
        })
      })
      .catch(() => {
        setAllNotification({
          show: true,
          title: 'Failed to resend OTP',
          description: 'Please try to register for a new account again.',
          status: 'error',
        })
      })
  }

  return { loading, otpValue, coolDownIsActive, verifyOTP, resendOTP, onCoolDownEnd, setOtpValue }
}

export function useResendOtpCoolDownController({ onCoolDownEnd }: Readonly<ResendOtpCoolDownProps>) {
  const [count, setCount] = useState(30)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeoutId.current = setInterval(() => {
      setCount(state => {
        if (state === 1) {
          if (timeoutId.current) clearInterval(timeoutId.current)
          onCoolDownEnd()
          return state
        }
        return state - 1
      })
    }, 1000)

    return () => {
      if (timeoutId.current !== null) clearInterval(timeoutId.current)
    }
  }, [onCoolDownEnd])

  return { count }
}
