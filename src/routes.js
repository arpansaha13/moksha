import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import AuthProvider from './containers/AuthProvider'

import FloatingWindow from './layouts/floating-window'
import DefaultLayout from './layouts/default'
import AuthLayout from './layouts/auth'
import ContestLayout from './layouts/contest'
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
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/login'
import Registration from './pages/auth/register'
import Verification from './pages/auth/verification'
import ForgotPassword from './pages/auth/forgot-password'
import NotFound from './pages/404'

// const Home = lazy(() => import('./pages/Home'))
// const Dashboard = lazy(() => import('./pages/Dashboard'))
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
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/*" element={<NotFound />} />

        <Route element={<AccountLayout />}>
          <Route path="/account/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route element={<AuthProvider><AuthLayout /></AuthProvider>}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route path="/auth/verification" element={<Verification />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<ContestLayout />}>
        <Route path="/contests" element={<Contests />} />
        <Route path="/contests/:club/:contest" element={<Contest />} />
      </Route>
    </Route>
  )
)

function AppRoutes() {
  return <RouterProvider router={router} />
}

export default AppRoutes
