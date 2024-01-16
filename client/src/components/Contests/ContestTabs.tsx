import { Fragment, memo, startTransition, useCallback, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import { classNames } from '@arpansaha13/utils'
import { useStore } from '~/store'
import Sheet from '~common/Sheet'
import type { Contest } from '~/types'

interface ContestTabsProps {
  contestType: Contest['type']
  isOpen: boolean
}

interface TabPanelButtonProps {
  name: string
  to: string
}

const ContestTabs = ({ contestType, isOpen }: ContestTabsProps) => {
  const params = useParams()
  const location = useLocation()
  const authState = useStore(state => state.authState)
  const showRegistrationsPanel = contestType === 'team' && !isOpen

  const panels = useMemo(() => {
    const panels = [
      {
        name: 'Overview',
        requiresAuth: false,
        to: `/contests/${params.club}/${params.contest}`,
      },
      {
        name: 'Register',
        requiresAuth: false,
        to: `/contests/${params.club}/${params.contest}/register`,
      },
    ]

    if (showRegistrationsPanel) {
      panels.push({
        name: 'Registrations',
        requiresAuth: true,
        to: `/contests/${params.club}/${params.contest}/registrations`,
      })
    }

    return panels
  }, [params, contestType])

  const showPanel = useMemo(
    () => panels.map(panel => !panel.requiresAuth || authState.authenticated),
    [panels, authState.authenticated]
  )

  const [selectedIndex, setSelectedIndex] = useState(() => panels.findIndex(panel => location.pathname === panel.to))
  const switchTab = useCallback((i: number) => startTransition(() => setSelectedIndex(i)), [])

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={switchTab}>
      <Tab.List
        as={Sheet}
        className={classNames(
          'my-4 sm:my-6 grid bg-amber-900/30 text-gray-200 text-sm font-medium divide-x divide-amber-900/70 overflow-hidden',
          authState.authenticated && showRegistrationsPanel ? 'grid-cols-3' : 'grid-cols-2'
        )}
      >
        {panels.map((panel, i) =>
          showPanel[i] ? <TabPanelButton key={panel.name} name={panel.name} to={panel.to} /> : null
        )}
      </Tab.List>
    </Tab.Group>
  )
}

export default ContestTabs

const TabPanelButton = memo(({ name, to }: TabPanelButtonProps) => (
  <Tab as={Fragment}>
    {({ selected }) => (
      <Link to={to} className='block px-1 xs:px-4 py-3 w-full text-center relative focus:outline-none'>
        {name}
        {selected && (
          <span className='absolute left-0 bottom-0 inline-block w-full h-1 bg-amber-800' aria-hidden='true' />
        )}
      </Link>
    )}
  </Tab>
))
