import { Fragment, memo } from 'react'
import { Tab } from '@headlessui/react'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { useAppContext } from '../../containers/DataProvider'
import Sheet from '../common/Sheet'
import EmptyState from '../common/EmptyState'
import ContestOverview from './ContestOverview'
import TeamRegister from './TeamRegister'

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
            {({ selected }) => (
              <button className='px-4 py-3 w-full relative'>
                {tabName}
                {selected && (
                  <span className='absolute left-0 bottom-0 inline-block w-full h-1 bg-amber-800' aria-hidden />
                )}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <ContestOverview />
        </Tab.Panel>

        <Tab.Panel>
          {appContext.authenticated ? (
            <>
              <Sheet className='mb-6 p-4 sm:p-6 markdown'>
                <h2>How does it work?</h2>

                <p>
                  Since this is a team contest, you need to register through a team. Now you may create your own team or
                  join a team through an invite from the respective team leader. You can create, and be the leader, of
                  only one team. But you can join as many teams as you want.
                </p>
              </Sheet>

              <TeamRegister />
            </>
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
