import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { getTeamData } from './loader/teams/getTeamData'
import { getAuthUserData } from './loader/getAuthUserData'
import { getAuthUserTeams } from './loader/account/getAuthUserTeams'
import { allowIfNoTeamCreated } from './loader/teams/allowIfNoTeamCreated'
import { allowIfAuthenticated, allowIfNotAuthenticated } from './loader/checkAuth'

import AuthProvider from './containers/AuthProvider'

import FloatingWindow from './layouts/floating-window'
import DefaultLayout from './layouts/default'
import AuthLayout from './layouts/auth'
import AccountLayout from './layouts/account'
import TeamsLayout from './layouts/teams'

// const DefaultLayout = lazy(() => import('./layouts/default'))
// const AuthLayout = lazy(() => import('./layouts/auth'))
// const ContestLayout = lazy(() => import('./layouts/contest'))
// const AccountLayout = lazy(() => import('./layouts/account'))

import Home from './pages/Home'
import Events from './pages/Events'
import Contests from './pages/contests'
import Contest from './pages/contests/Contest'
import Faqs from './pages/Faqs'
import Sponsors from './pages/Sponsors'
import Contact from './pages/Contact'
import Team from './pages/teams/Team'
import CreateTeam from './pages/teams/Create'

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

        <Route element={<AccountLayout />}>
          <Route loader={getAuthUserData} path='/account/profile' element={<Profile />} />
          <Route loader={getAuthUserTeams} path='/account/teams' element={<Teams />} />
          <Route loader={allowIfAuthenticated} path='/account/registrations' element={<Registrations />} />
        </Route>
      </Route>

      <Route element={<TeamsLayout />}>
        <Route loader={allowIfNoTeamCreated} path='/teams/create' element={<CreateTeam />} />
        <Route loader={getTeamData} path='/teams/:team' element={<Team />} />
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
