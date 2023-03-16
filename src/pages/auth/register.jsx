import { useCallback, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import { useAuthContext } from '../../containers/AuthProvider'
import { getAvatarIdx} from '../../data/avatar-colors'
import getFormData from '../../utils/getFormData'

const SignUpPage = () => {
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const { setNotification, setAllNotification } = useAuthContext()

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const [validationErrors, { set: setError }] = useMap({
    username: null,
    password: null,
    confirm_password: null,
  })

  const fields = useMemo(() => getFields(validationErrors), [validationErrors])

  const signUp = useCallback(e => {
    e.preventDefault()

    const formData = getFormData(formRef.current, { format: 'object' })
    formData['avatar_idx'] = getAvatarIdx('email')
    formData['username'] = formData['username'].toLowerCase() // force lowercase

    let hasError = false

    if (formData.password !== formData.confirm_password) {
      setError('password', 'Password and confirm password do not match')
      setError('confirm_password', 'Password and confirm password do not match')
      hasError = true
    }
    else if (validationErrors.password) {
      setError('password', null)
      setError('confirm_password', null)
    }

    if (!validateUsername(formData.username, setError)) {
      hasError = true
    }

    if (hasError) return

    setLoading(true)

    fetchHook('users/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(() => {
        setLoading(false)
        setNotification('show', false)
        navigate({pathname: '/auth/verification', search: searchParams.toString()})
      })
      .catch(err => {
        setLoading(false)
        setAllNotification({
          show: true,
          title: 'Registration failed',
          description: err.message,
          status: 'error',
        })
      })
  }, [validationErrors, formRef])

  return (
    <main className='sm:max-w-2xl px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Sign up</title>
      </Helmet>

      <form ref={formRef} className="space-y-6" onSubmit={signUp}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          { fields.map(field => <BaseInput key={ field.id } {...field} />) }
        </div>

        <div>
          <BaseButton type="submit" stretch loading={loading}>
            Sign up
          </BaseButton>
        </div>

        <div className="flex items-center">
          <div className="text-sm">
            <span className="text-gray-100">Already have an account?</span>{' '}
            <Link to={{pathname: "/auth/login", search: searchParams.toString()}}>
              <span className="font-medium text-amber-600 hover:text-amber-500 cursor-pointer">Login</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}
export default SignUpPage

function validateUsername(username, setError) {
  const spacialChars = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/
  const consecutiveDots = /\.{2,}/g

  if (username.includes(' ')) {
    setError('username', 'Username cannot contain any spaces')
  }
  else if (spacialChars.test(username)) {
    setError('username', 'Username cannot contain special characters')
  }
  else if (consecutiveDots.test(username)) {
    setError('username', 'Username cannot contain consecutive dots')
  }
  else {
    setError('username', null)
    return true
  }
  return false
}

const getFields = (validationErrors) => {
  const fields = [
    {
      id: "name",
      name: "name",
      type: "text",
      autoComplete: "name",
      autocapitalize: "words",
      required: true,
      label: "Name",
    },
    {
      id: "username",
      name: "username",
      type: "text",
      autoComplete: "username",
      autocapitalize: "none",
      required: true,
      label: "Username",
      minLength: 6,
      maxLength: 20,
      validationError: validationErrors.username,
      style: { textTransform: 'lowercase' }, // force lowercase
    },
    {
      id: "email",
      name: "email",
      type: "email",
      autoComplete: "email",
      required: true,
      label: "Email address",
    },
    {
      id: "institution",
      name: "institution_name",
      type: "text",
      autoComplete: "organization",
      autocapitalize: "words",
      required: true,
      label: "Institution name",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      autoComplete: "new-password",
      required: true,
      minLength: 8,
      maxLength: 30,
      label: "Password",
      validationError: validationErrors.password,
    },
    {
      id: "phone",
      name: "phone",
      type: "tel",
      autoComplete: "tel",
      inputMode: 'numeric',
      required: true,
      label: "Phone number",
      pattern: "[0-9]{10}",
      minLength: 10,
      maxLength: 10,
    },
    {
      id: "confirm-password",
      name: "confirm_password",
      type: "password",
      autoComplete: "new-password",
      required: true,
      label: "Confirm password",
      validationError: validationErrors.confirm_password,
    },
  ]
  return fields
}
