import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { getContest, getContests } from './loaders/contests.loader'
import { allowIfNoTeamCreated, getTeamData } from './loaders/teams.loader'
import { allowIfNotAuthenticated, getAuthUserData } from './loaders/auth.loader'
import { getAuthUserContests, getAuthUserTeams } from './loaders/account.loader'

import AuthProvider from './containers/AuthProvider'

import FloatingWindow from './layouts/floating-window'
import DefaultLayout from './layouts/default'
import AuthLayout from './layouts/auth'
import AccountLayout from './layouts/account'
import TeamsLayout from './layouts/teams'

// const FloatingWindow = lazy(() => import('./layouts/floating-window'))
// const DefaultLayout = lazy(() => import('./layouts/default'))
// const AuthLayout = lazy(() => import('./layouts/auth'))
// const AccountLayout = lazy(() => import('./layouts/account'))
// const TeamsLayout = lazy(() => import('./layouts/teams'))

import Home from './pages/Home'
import Events from './pages/Events'
import Contests from './pages/contests'
import Contest from './pages/contests/Contest'
import Faqs from './pages/Faqs'
import Sponsors from './pages/Sponsors'
import Contact from './pages/Contact'
import Team from './pages/teams/Team'
import CreateTeam from './pages/teams/Create'

// const Home = lazy(() => import('./pages/Home'))
// const Events = lazy(() => import('./pages/Events'))
// const Contests = lazy(() => import('./pages/contests'))
// const Contest = lazy(() => import('./pages/contests/Contest'))
// const Faqs = lazy(() => import('./pages/Faqs'))
// const Sponsors = lazy(() => import('./pages/Sponsors'))
// const Contact = lazy(() => import('./pages/Contact'))
// const Team = lazy(() => import('./pages/teams/Team'))
// const CreateTeam = lazy(() => import('./pages/teams/Create'))

import Profile from './pages/account/Profile'
import Teams from './pages/account/Teams'
import Registrations from './pages/account/Registrations'

// const Profile = lazy(() => import('./pages/account/Profile'))
// const Teams = lazy(() => import('./pages/account/Teams'))
// const Registrations = lazy(() => import('./pages/account/Registrations'))

import Login from './pages/auth/login'
import Registration from './pages/auth/register'
import Verification from './pages/auth/verification'
import ForgotPassword from './pages/auth/forgot-password'

// const Login = lazy(() => import('./pages/auth/login'))
// const Registration = lazy(() => import('./pages/auth/register'))
// const Verification = lazy(() => import('./pages/auth/verification'))
// const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'))

import NotFound from './pages/404'

// const NotFound = lazy(() => import('./pages/404'))

const routes = createRoutesFromElements(
  <Route element={<FloatingWindow />}>
    <Route element={<DefaultLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/events' element={<Events />} />
      <Route path='/faqs' element={<Faqs />} />
      <Route path='/sponsors' element={<Sponsors />} />
      <Route path='/contact' element={<Contact />} />

      <Route loader={getContests} path='/contests' element={<Contests />} />
      <Route loader={getContest} path='/contests/:club/:contest' element={<Contest />} />

      <Route path='/*' element={<NotFound />} />

      <Route element={<AccountLayout />}>
        <Route loader={getAuthUserData} path='/account/profile' element={<Profile />} />
        <Route loader={getAuthUserTeams} path='/account/teams' element={<Teams />} />
        <Route loader={getAuthUserContests} path='/account/registrations' element={<Registrations />} />
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

const router = createBrowserRouter(routes)

function AppRoutes() {
  return <RouterProvider router={router} />
}

export default AppRoutes
