import { NavLink, Outlet } from 'react-router-dom'
import Container from '../components/common/Container'
import classNames from '../utils/classNames'
import { profileTabs, accountTabs } from '../data/tabs'
import Sheet from '../components/common/Sheet'

function AccountLayout() {
  return (
    <Container className='xl:!max-w-7xl py-4'>
      <div className='grid grid-cols-1 lg:grid-cols-11 gap-6'>
        {/* Desktop sidebar */}
        <aside className='hidden lg:block lg:col-span-2 text-white sticky top-4'>
          <ul className='space-y-2'>
            {profileTabs.map(tab => (
              <li key={tab.to}>
                <NavLink
                  to={tab.to}
                  className={({ isActive }) =>
                    classNames(
                      'block px-4 py-2 rounded-md',
                      isActive
                        ? 'bg-gradient-to-r from-amber-900'
                        : 'sm:hover:bg-gradient-to-r sm:hover:from-amber-900/40'
                    )
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
            {accountTabs.map(tab => (
              <li key={tab.to}>
                <NavLink
                  to={tab.to}
                  className={({ isActive }) =>
                    classNames(
                      'block px-4 py-2 rounded-md',
                      isActive
                        ? 'bg-gradient-to-r from-amber-900'
                        : 'sm:hover:bg-gradient-to-r sm:hover:from-amber-900/40'
                    )
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <section className='lg:col-span-6'>
          <Outlet />
        </section>

        <section className='lg:col-span-3'>
          <Sheet className='group p-4 sm:p-6'>
            <div className='h-80'>secondary content</div>
          </Sheet>
        </section>
      </div>
    </Container>
  )
}
export default AccountLayout
