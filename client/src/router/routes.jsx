import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { allowIfNotAuthenticated } from '~loaders/auth.loader'
import { getReceivedTeamInvites } from '~loaders/account.loader'

import FloatingWindow from '../layouts/floating-window'
import DefaultLayout from '../layouts/default'
import AuthLayout from '../layouts/auth'
import AccountLayout from '../layouts/account'
import TeamsLayout from '../layouts/teams'

// const FloatingWindow = lazy(() => import('../layouts/floating-window'))
// const DefaultLayout = lazy(() => import('../layouts/default'))
// const AuthLayout = lazy(() => import('../layouts/auth'))
// const AccountLayout = lazy(() => import('../layouts/account'))
// const TeamsLayout = lazy(() => import('../layouts/teams'))

const Home = () => import('../pages/Home')
const Events = () => import('../pages/events')
const Event = () => import('../pages/events/Event')
const Contests = () => import('../pages/contests')
const Contest = () => import('../pages/contests/Contest')
const Faqs = () => import('../pages/Faqs')
// const Sponsors = () => import('../pages/Sponsors')
const Contact = () => import('../pages/Contact')
const Team = () => import('../pages/teams/Team')
const CreateTeam = () => import('../pages/teams/Create')

const Profile = () => import('../pages/account/Profile')
const Teams = () => import('../pages/account/Teams')
const Registrations = () => import('../pages/account/Registrations')

const Login = () => import('../pages/auth/login')
const Registration = () => import('../pages/auth/register')
const Verification = () => import('../pages/auth/verification')
const ForgotPassword = () => import('../pages/auth/forgot-password')

const NotFound = () => import('../pages/404')

const routes = createRoutesFromElements(
  <Route element={<FloatingWindow />}>
    <Route element={<DefaultLayout />}>
      <Route path='/' lazy={Home} />
      <Route path='/faqs' lazy={Faqs} />
      {/* <Route path='/sponsors' element={<Sponsors />} /> */}
      <Route path='/contact' lazy={Contact} />

      <Route path='/events' lazy={Events} />
      <Route path='/events/:club/:event' lazy={Event} />

      <Route path='/contests' lazy={Contests} />
      <Route path='/contests/:club/:contest' lazy={Contest} />

      <Route path='/*' lazy={NotFound} />

      <Route loader={getReceivedTeamInvites} element={<AccountLayout />}>
        <Route path='/account/profile' lazy={Profile} />
        <Route path='/account/teams' lazy={Teams} />
        <Route path='/account/registrations' lazy={Registrations} />
      </Route>
    </Route>

    <Route element={<TeamsLayout />}>
      <Route path='/teams/create' lazy={CreateTeam} />
      <Route path='/teams/:team' lazy={Team} />
    </Route>

    <Route loader={allowIfNotAuthenticated} element={<AuthLayout />}>
      <Route path='/auth/login' lazy={Login} />
      <Route path='/auth/register' lazy={Registration} />
      <Route path='/auth/verification' lazy={Verification} />
      <Route path='/auth/forgot-password' lazy={ForgotPassword} />
    </Route>
  </Route>
)

const router = createBrowserRouter(routes)

function AppRoutes() {
  return <RouterProvider router={router} />
}

export default AppRoutes
