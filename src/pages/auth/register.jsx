import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import Notification from '../../components/common/Notification'
import { STORAGE_AUTH_KEY } from '../../constants'
import { useAuthContext } from '../../containers/AuthProvider'

const SignUpPage = () => {
  const navigate = useNavigate();
  const [token] = useLocalStorage(STORAGE_AUTH_KEY)
  const {setAuthContext} = useAuthContext()

  const [notification, { set: setNotification, setAll: setAllNotification }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  useEffect(() => {
    if (token) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchHook = useFetch()

  const [formData, { set }] = useMap({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    institution_name: '',
    phone_no: '',
  })
  const fields = getFields(formData, set)

  function signUp(e) {
    e.preventDefault()

    fetchHook('users/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(() => {
        setAuthContext({ email: formData.email })
        navigate('/auth/verification')
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Registration failed',
          description: err.message,
          status: 'error',
        })
      })
  }

  return (
    <div className='sm:max-w-2xl px-4 sm:px-0'>
      <Notification
        show={notification.show}
        setShow={bool => setNotification('show', bool)}
        status={ notification.status }
        title={ notification.title }
        description={ notification.description }
      />

      <form className="space-y-6" onSubmit={signUp}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          { fields.map(field => <BaseInput key={ field.id } {...field} />) }
        </div>


        <div>
          <BaseButton type="submit" stretch>
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
    </div>
  )
}
export default SignUpPage

const getFields = (formData, set) => {
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
      onChange: e => set('confirm_password', e.target.value),
    },
  ]
  return fields
}
