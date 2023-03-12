/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { memo, useCallback } from "react"
import { createSearchParams, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Icon } from '@iconify/react'
import menuIcon from '@iconify-icons/mdi/menu'
import closeIcon from '@iconify-icons/mdi/close'
import NavbarDropdown from "./NavbarDropdown"
import { useAppContext } from '../../containers/DataProvider'
import { useFetch } from '../../hooks/useFetch'
import { useWindowSize } from "../../hooks/useWindowSize"
import TzFloatingWindow from '@tranzis/react-layouts/TzFloatingWindow'
import { navTabs } from '../../data/tabs'
import classNames from "../../utils/classNames"

const NavTab = memo(({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      "block w-max font-semibold text-xl p-1.5 uppercase transition-colors",
      isActive ? 'text-amber-600': 'hover:text-amber-500',
    )}
  >
    { children }
  </NavLink>
))

function Navbar() {
  const { appContext, resetAuthContext } = useAppContext()
  const { windowWidth } = useWindowSize()
  const location = useLocation()
  const navigate = useNavigate()
  const fetchHook = useFetch()

  const logOut = useCallback(() => {
    fetchHook('users/logout')
    resetAuthContext()

    if (location.pathname.startsWith('/account/')) {
      navigate('/')
    }
  }, [fetchHook, location.pathname])

  // const headerRef = useRef(null)

  // const scrollListener = useCallback(() => {
  //   console.log(headerRef)
  //   headerRef.current.classList[window.scrollY > 100 ? 'add' : 'remove']('top-0')
  // }, [headerRef])

  // useEffect(() => {
  //   window.addEventListener('scroll', scrollListener)

  //   return () => { window.removeEventListener('scroll', scrollListener) }
  // }, [scrollListener])

  if (windowWidth === null) return <></>

  return (
    <header className="z-40">
      <nav className="px-4 sm:px-20 h-[100px] w-full flex items-center justify-between text-ochre">
        {
          windowWidth < 1024 ? (
            // Mobile Navbar
            <TzFloatingWindow.Button className="block p-1 w-10 h-10 focus:text-amber-600 border border-ochre rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-amber-200 focus:ring-amber-600 transition-colors relative">
              {
                ({float}) => (
                  <Icon icon={float ? closeIcon : menuIcon} className="block" color="inherit" width='100%' height='100%' />
                )
              }
            </TzFloatingWindow.Button>
          ) : (
            // Desktop Navbar
            <div className="flex items-center">
              <div className='sm:mr-8 w-12 h-12'>
                <img src="/moksha-logo.svg" alt="Moksha logo" className='w-full h-full' />
              </div>
              <ul className="flex gap-3 sm:gap-6">
                {
                  navTabs.map(tab => (
                    <li key={tab.to}>
                      <NavTab to={tab.to}>
                        { tab.name }
                      </NavTab>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }

        {/* Common for both Mobile and Desktop */}
        {
          appContext.authenticated
          ? (
            <NavbarDropdown
              name={ appContext.authUser.name }
              avatarIdx={ appContext.authUser.avatar_idx }
              onLogOut={logOut}
            />
          )
          : (
            <div className="flex gap-3 sm:gap-6">
              <NavTab to={{pathname: "/auth/login", search: `${createSearchParams({from: location.pathname})}`}}>
                Login
              </NavTab>

              <NavTab to={{pathname: "/auth/register", search: `${createSearchParams({from: location.pathname})}`}}>
                Sign up
              </NavTab>
            </div>
          )
        }
      </nav>
    </header>
  )
}
export default Navbar
