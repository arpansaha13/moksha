import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import fetchWithCredentials from './utils/fetchWithCredentials'
import nprogress from 'nprogress'

import AuthProvider from './containers/AuthProvider'

import FloatingWindow from './layouts/floating-window'
import DefaultLayout from './layouts/default'
import AuthLayout from './layouts/auth'
import AccountLayout from './layouts/account'

// const DefaultLayout = lazy(() => import('./layouts/default'))
// const AuthLayout = lazy(() => import('./layouts/auth'))
// const ContestLayout = lazy(() => import('./layouts/contest'))
// const AccountLayout = lazy(() => import('./layouts/account'))

import Home from './pages/Home'
import Events from './pages/Events'
import Contests from './pages/Contests'
import Contest from './pages/Contests/Contest'
import Faqs from './pages/Faqs'
import Sponsors from './pages/Sponsors'
import Contact from './pages/Contact'

import Profile from './pages/account/Profile'
import Teams from './pages/account/Teams'
import Registrations from './pages/account/Registrations'

import Login from './pages/auth/login'
import Registration from './pages/auth/register'
import Verification from './pages/auth/verification'
import ForgotPassword from './pages/auth/forgot-password'

import NotFound from './pages/404'

// const Home = lazy(() => import('./pages/Home'))
// const Profile = lazy(() => import('./pages/account/Profile'))
// const Events = lazy(() => import('./pages/Events'))
// const Contests = lazy(() => import('./pages/Contests'))
// const Faqs = lazy(() => import('./pages/Faqs'))
// const Sponsors = lazy(() => import('./pages/Sponsors'))
// const LoginPage = lazy(() => import('./pages/auth/login'))
// const RegistrationPage = lazy(() => import('./pages/auth/register'))
// const VerificationPage = lazy(() => import('./pages/auth/verification'))
// const ForgotPasswordPage = lazy(() => import('./pages/auth/forgot-password'))

const isAuthenticated = async () => {
  // Replace this with another designated api
  try {
    await fetchWithCredentials('users/particular')
    return true
  } catch {
    return false
  }
}

function getPathFromURL(url) {
  return new URL(url).pathname
}

const allowIfAuthenticated = async ({ request }) => {
  nprogress.start()
  const authenticated = await isAuthenticated()
  nprogress.done()

  if (!authenticated) {
    // redirect to login if not authenticated
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
  return null
}

const allowIfNotAuthenticated = async () => {
  nprogress.start()
  const authenticated = await isAuthenticated()
  nprogress.done()

  if (authenticated) {
    return redirect('/') // redirect to home if authenticated
  }
  return null
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<FloatingWindow />}>
      <Route element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/faqs' element={<Faqs />} />
        <Route path='/sponsors' element={<Sponsors />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/contests' element={<Contests />} />
        <Route path='/contests/:club/:contest' element={<Contest />} />

        <Route path='/*' element={<NotFound />} />

        <Route loader={allowIfAuthenticated} element={<AccountLayout />}>
          <Route path='/account/profile' element={<Profile />} />
          <Route path='/account/teams' element={<Teams />} />
          <Route path='/account/registrations' element={<Registrations />} />
        </Route>
      </Route>

      <Route
        loader={allowIfNotAuthenticated}
        element={
          <AuthProvider>
            <AuthLayout />
          </AuthProvider>
        }
      >
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Registration />} />
        <Route path='/auth/verification' element={<Verification />} />
        <Route path='/auth/forgot-password' element={<ForgotPassword />} />
      </Route>
    </Route>
  )
)

function AppRoutes() {
  return <RouterProvider router={router} />
}

export default AppRoutes
