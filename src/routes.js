import { Suspense, lazy } from "react"
import { Routes, Route, BrowserRouter } from 'react-router-dom'

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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Routes>
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
          </Route>

          <Route element={<ContestLayout />}>
            <Route path="/contests" element={<Contests />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
