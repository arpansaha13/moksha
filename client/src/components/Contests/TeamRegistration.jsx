import { Fragment, memo } from 'react'
import { Tab } from '@headlessui/react'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { useAppContext } from '../../containers/DataProvider'
import Sheet from '../common/Sheet'
import ContestOverview from './ContestOverview'
import CreateTeam from './CreateTeam'
import EmptyState from '../common/EmptyState'

const TeamRegistration = () => {
  const { appContext } = useAppContext()

  return (
    <Tab.Group>
      <Tab.List
        as={Sheet}
        className='my-4 sm:my-6 grid grid-cols-2 bg-amber-900/30 text-gray-200 text-sm font-medium divide-x divide-amber-900/70 overflow-hidden'
      >
        {['Overview', 'Register'].map(tabName => (
          <Tab as={Fragment} key={tabName}>
            {({ selected }) => <button className='px-4 py-3 w-full relative'>{tabName}</button>}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <ContestOverview />
        </Tab.Panel>

        <Tab.Panel>
          {appContext.authenticated ? (
            <CreateTeam />
          ) : (
            <div className='mt-6'>
              <EmptyState
                icon={accountAlertIcon}
                title='Interested in this contest?'
                description='Login to register in it...'
              />
            </div>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default memo(TeamRegistration)
