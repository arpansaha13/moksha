/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react'
import menuIcon from '@iconify-icons/mdi/menu'
// import { AiOutlineClose, AiOutlineAlignRight } from "react-icons/ai"
import { useAppContext } from '../../containers/DataProvider'
import './Navbar.css'

// <img src={click ? <AiOutlineClose /> : <AiOutlineAlignRight />} />

const tabs = [
  {
    to: '/',
    name: 'Home',
  },
  {
    to: '/events',
    name: 'Events',
  },
  {
    to: '/contests',
    name: 'Contests',
  },
  {
    to: '/faqs',
    name: 'FAQs',
  },
  {
    to: '/sponsors',
    name: 'Sponsors',
  },
]

const NavTab = ({ to, children }) => (
  <Link to={to} className="block w-max font-semibold text-lg sm:text-2xl p-1.5 uppercase transition-colors">
    { children }
  </Link>
)

function Navbar() {
  const { appContext } = useAppContext()
  const isAuthorized = !!appContext.authUser.email

  return (
    <nav className="px-4 navbar sm:px-20 py-2.5 w-full flex justify-between top-0">
      {/* Mobile Navbar */}
      <div className="sm:hidden">
        <button className="block p-1 w-10 h-10 focus:text-amber-600 border border-ochre rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-amber-200 focus:ring-amber-600 transition-colors relative">
          <Icon icon={menuIcon} className="block" color="inherit" width='100%' height='100%' />
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden sm:block">
        <ul className="flex gap-3 sm:gap-6">
          {
            tabs.map(tab => (
              <li key={tab.to} className="">
                <NavTab to={tab.to}>
                  { tab.name }
                </NavTab>
              </li>
            ))
          }
        </ul>
      </div>

      {/* Common for both Mobile and Desktop */}
      {
        isAuthorized
        ? (
          <NavTab to="/profile">
            Profile
          </NavTab>
        )
        : (
          <div className="flex gap-3 sm:gap-6">
            <NavTab to="/auth/login">
              Login
            </NavTab>

            <NavTab to="auth/register">
              Sign up
            </NavTab>
          </div>
        )
      }
    </nav>
  );
}
export default Navbar;
