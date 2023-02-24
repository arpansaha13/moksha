import { Suspense, lazy } from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const DefaultLayout = lazy(() => import('./layouts/default'))
const AuthLayout = lazy(() => import('./layouts/auth'))
const ContestLayout = lazy(() => import('./layouts/contest'))

const Home = lazy(() => import('./pages/Home'))
const Events = lazy(() => import('./pages/Events'))
const Contests = lazy(() => import('./pages/Contests'))
const Faqs = lazy(() => import('./pages/Faqs'))
const Sponsors = lazy(() => import('./pages/Sponsors'))
const LoginPage = lazy(() => import('./pages/auth/login'))
const RegistrationPage = lazy(() => import('./pages/auth/register'))
const VerificationPage = lazy(() => import('./pages/auth/verification'))
const ForgotPasswordPage = lazy(() => import('./pages/auth/forgot-password'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegistrationPage />} />
        <Route path="/auth/verification" element={<VerificationPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ContestLayout />}>
        <Route path="/contests" element={<Contests />} />
      </Route>
    </>
  )
)

function AppRoutes() {
  return (
    <Suspense fallback={<div />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRoutes
