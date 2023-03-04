import { memo } from "react"
import { Link, useLocation } from "react-router-dom"
import navTabs from '../data/nav-tabs'
import classNames from '../utils/classNames'
import TzFloatingWindow from '@tranzis/react-layouts/TzFloatingWindow'

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="pl-2 py-8 w-full h-full text-gray-50">
      <ul className="space-y-2">
        {
          navTabs.map((tab) => (
            <li key ={ tab.to }>
              <SidebarTab to={ tab.to } active={pathname === tab.to}>
                { tab.name }
              </SidebarTab>
            </li>
          ))
        }
      </ul>
    </aside>
  )
}

const SidebarTab = memo(({to, active, children}) => (
  <TzFloatingWindow.Button className="block w-full text-left">
    {() => (
      <Link to={to} className={classNames(
        'block px-4 py-2 w-full rounded-md text-ochre',
        active ? 'bg-gradient-to-r from-amber-900/70' : ''
        )}>
        { children }
      </Link>
    )}
  </TzFloatingWindow.Button>
))
