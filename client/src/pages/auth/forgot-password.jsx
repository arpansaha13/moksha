import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import { useAppContext } from '../../containers/DataProvider'

const ForgotPasswordPage = () => {
  const { setAppContext } = useAppContext()
  const navigate = useNavigate()


  const fetchHook = useFetch()

  const [formData, { set }] = useMap({
    email: '',
  })

  function signIn(e) {
    e.preventDefault()

    fetchHook('users/forgot-password', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (res.message === "User logged in!!") {
        // TODO: replace with user data from designated api
        setAppContext(state => {
          const newState = { ...state }
          newState.authUser = { ...state.authUser, ...formData }
          return newState
        })
        navigate('/')
      }
    })
    .catch(err => {
      // Failed
    })
  }

  return (
    <div className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Forgot password</title>
      </Helmet>

      <form className="space-y-6" onSubmit={signIn}>
        <BaseInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email address"
          value={formData.email}
          onChange={e => set('email', e.target.value)}
        />

        <div>
          <BaseButton type="submit" stretch>
            Submit
          </BaseButton>
        </div>

        <div className="flex items-center">
          <div className="text-sm">
            <Link to="/auth/login">
              <span className="font-medium text-amber-600 hover:text-amber-500 cursor-pointer">Back to Login</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
export default ForgotPasswordPage
