import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import { useAuthContext } from '../../containers/AuthProvider'

const SignUpPage = () => {
  const navigate = useNavigate()
  const { setNotification, setAllNotification } = useAuthContext()
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const [formData, { set }] = useMap({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    institution_name: '',
    phone_no: '',
  })

  const [validationErrors, { set: setError,reset: resetErrors }] = useMap({
    password: null,
    confirm_password: null,
  })

  const fields = getFields(formData, validationErrors, set)

  function signUp(e) {
    e.preventDefault()

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
  }

  return (
    <main className='sm:max-w-2xl px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Sign up</title>
      </Helmet>

      <form className="space-y-6" onSubmit={signUp}>
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

const getFields = (formData, validationErrors, set) => {
  const fields = [
    {
      id: "name",
      name: "name",
      type: "text",
      autoComplete: "name",
      required: true,
      label: "Name",
      value: formData.name,
      onChange: e => set('name', e.target.value),
    },
    {
      id: "username",
      name: "username",
      type: "text",
      autoComplete: "username",
      required: true,
      label: "Username",
      value: formData.username,
      onChange: e => set('username', e.target.value),
    },
    {
      id: "email",
      name: "email",
      type: "email",
      autoComplete: "email",
      required: true,
      label: "Email address",
      value: formData.email,
      onChange: e => set('email', e.target.value),
    },
    {
      id: "institution",
      name: "institution",
      type: "text",
      autoComplete: "organization",
      required: true,
      label: "Institution name",
      value: formData.institution_name,
      onChange: e => set('institution_name', e.target.value),
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
      value: formData.password,
      validationError: validationErrors.password,
      onChange: e => set('password', e.target.value),
    },
    {
      id: "phone",
      name: "phone",
      type: "tel",
      autoComplete: "tel",
      required: true,
      label: "Phone number",
      pattern: "[0-9]{10}",
      minLength: 10,
      maxLength: 10,
      value: formData.phone_no,
      onChange: e => set('phone_no', e.target.value),
    },
    {
      id: "confirm-password",
      name: "confirm-password",
      type: "password",
      autoComplete: "new-password",
      required: true,
      label: "Confirm password",
      value: formData.confirm_password,
      validationError: validationErrors.confirm_password,
      onChange: e => set('confirm_password', e.target.value),
    },
  ]
  return fields
}
