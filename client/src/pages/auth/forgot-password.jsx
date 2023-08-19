import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from '~/hooks/useFetch'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import { useAppContext } from '~/containers/DataProvider'
import getFormData from '~/utils/getFormData'

const ForgotPasswordPage = () => {
  const { setAppContext } = useAppContext()
  const navigate = useNavigate()

  const fetchHook = useFetch()

  const [formRef, { set }] = useRef(null)

  function forgotPassword(e) {
    e.preventDefault()

    const formData = getFormData(formRef.current, { format: 'object' })

    fetchHook('users/forgot-password', {
      method: 'POST',
      body: JSON.stringify(formData),
    }).then(res => {
      if (res.message === 'User logged in!!') {
        setAppContext(state => {
          const newState = { ...state }
          newState.authUser = { ...state.authUser, ...formData }
          return newState
        })
        navigate('/')
      }
    })
  }

  return (
    <div className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Forgot password</title>
      </Helmet>

      <form ref={formRef} className='space-y-6' onSubmit={forgotPassword}>
        <BaseInput id='email' name='email' type='email' autoComplete='email' required label='Email address' />

        <div>
          <BaseButton type='submit' stretch>
            Submit
          </BaseButton>
        </div>

        <div className='flex items-center'>
          <div className='text-sm'>
            <Link to='/auth/login'>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>Back to Login</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
export default ForgotPasswordPage
