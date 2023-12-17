import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { classNames } from '@arpansaha13/utils'
import { navTabs } from '~/data/tabs'
import MokshaLogo from '~/components/pictures/MokshaLogo'
import TzFloatingWindow from '@tranzis/react-layouts/TzFloatingWindow'

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className='pl-2 py-8 w-full h-full text-amber-400'>
      {/* TODO: don't put anchor tag inside button */}
      <TzFloatingWindow.Button className='block mb-6 mx-auto w-16 h-16'>
        {() => (
          <Link to='/' className='block relative'>
            <MokshaLogo />
            <span className='absolute inset-0 -z-10 bg-amber-800/40 filter blur-lg' />
          </Link>
        )}
      </TzFloatingWindow.Button>

      <ul className='space-y-2'>
        {navTabs.map(tab => (
          <li key={tab.to}>
            <SidebarTab to={tab.to} active={pathname === tab.to}>
              <div className='w-5 h-5 flex-shrink-0 text-amber-600'>
                <Icon icon={tab.icon} className='block' color='inherit' width='100%' height='100%' />
              </div>
              <p>{tab.name}</p>
            </SidebarTab>
          </li>
        ))}
      </ul>
    </aside>
  )
}

const SidebarTab = memo(({ to, active, children }) => (
  <TzFloatingWindow.Button className='block w-full text-sm text-left'>
    {() => (
      <Link
        to={to}
        className={classNames(
          'flex gap-x-2 items-center px-4 py-2 w-full rounded-md',
          active ? 'bg-gradient-to-r from-amber-900/70' : ''
        )}
      >
        {children}
      </Link>
    )}
  </TzFloatingWindow.Button>
))
