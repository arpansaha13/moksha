import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

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
import LoginPage from './pages/auth/login'
import RegistrationPage from './pages/auth/register'
import VerificationPage from './pages/auth/verification'
import ForgotPasswordPage from './pages/auth/forgot-password'

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
    <>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/sponsors" element={<Sponsors />} />

        <Route element={<AccountLayout />}>
          <Route path="/account/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegistrationPage />} />
        <Route path="/auth/verification" element={<VerificationPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ContestLayout />}>
        <Route path="/contests" element={<Contests />} />
        <Route path="/contests/:contest" element={<Contest />} />
      </Route>
    </>
  )
)


function AppRoutes() {
  return (
    <RouterProvider router={router} />
  )
}
export default AppRoutes
