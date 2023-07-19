import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import Sheet from '~common/Sheet'
import ContestOverview from '../ContestOverview'
import RegisterPanel from './RegisterPanel'

const TeamContest = ({ contest }) => {
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
          <ContestOverview contest={contest} />
        </Tab.Panel>

        <Tab.Panel>
          <RegisterPanel contest={contest} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default TeamContest
