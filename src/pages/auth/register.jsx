import { useCallback, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import { useAuthContext } from '../../containers/AuthProvider'
import { getAvatarIdx} from '../../data/avatar-colors'
import getFormData from '../../utils/getFormData'

const SignUpPage = () => {
  const navigate = useNavigate()
  const { setNotification, setAllNotification } = useAuthContext()

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const [validationErrors, { set: setError,reset: resetErrors }] = useMap({
    password: null,
    confirm_password: null,
  })

  const fields = getFields(validationErrors)

  const signUp = useCallback(e => {
    e.preventDefault()

    const formData = getFormData(formRef.current, { format: 'object' })
    formData['avatar_idx'] = getAvatarIdx('email')

    if (formData.password !== formData.confirm_password) {
      setError('password', 'Password and confirm password do not match')
      setError('confirm_password', 'Password and confirm password do not match')
      return
    }
    else if (validationErrors.password) {
      resetErrors()
    }

    setLoading(true)

    fetchHook('users/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(() => {
        setLoading(false)
        setNotification('show', false)
        navigate('/auth/verification')
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
            <Link to="/auth/login">
              <span className="font-medium text-amber-600 hover:text-amber-500 cursor-pointer">Login</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}
export default SignUpPage

const getFields = (validationErrors) => {
  const fields = [
    {
      id: "name",
      name: "name",
      type: "text",
      autoComplete: "name",
      required: true,
      label: "Name",
    },
    {
      id: "username",
      name: "username",
      type: "text",
      autoComplete: "username",
      required: true,
      label: "Username",
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
