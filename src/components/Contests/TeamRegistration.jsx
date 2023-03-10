import { Fragment, memo } from "react"
import { Tab } from '@headlessui/react'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import Sheet from "../common/Sheet"
import CreateTeam from './CreateTeam'
import JoinTeam from './JoinTeam'
import EmptyState from '../common/EmptyState'
import { useAppContext } from "../../containers/DataProvider"

const TeamRegistration = () => {
  const { appContext } = useAppContext()
  return (
    <Tab.Group>
      <Tab.List as={Sheet} className="my-4 sm:my-6 grid grid-cols-3 bg-amber-900/30 text-gray-200 text-sm font-medium divide-x divide-amber-900/70 overflow-hidden">
        {
          ['Overview', 'Create team', 'Join team'].map(tabName => (
            <Tab as={Fragment} key={ tabName }>
              {({ selected }) => (
                <button className="px-4 py-3 w-full relative">
                  <span>{ tabName }</span>
                  {
                    selected && <span className="absolute left-0 bottom-0 inline-block w-full h-1 bg-amber-800" aria-hidden />
                  }
                </button>
              )}
            </Tab>
          ))
        }
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <TeamContestOverview />
        </Tab.Panel>

        <Tab.Panel>
          {
            appContext.authenticated
            ? <CreateTeam />
            : (
              <div className="mt-6">
                <EmptyState
                  icon={accountAlertIcon}
                  title="Interested in this contest?"
                  description="Login to register in it..."
                />
              </div>
            )
          }
        </Tab.Panel>

        <Tab.Panel>
          {
            appContext.authenticated
            ? <JoinTeam />
            : (
              <div className="mt-6">
                <EmptyState
                  icon={accountAlertIcon}
                  title="Interested in this contest?"
                  description="Login to register in it..."
                />
              </div>
            )
          }
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default memo(TeamRegistration)

const TeamContestOverview = () => {
  return (
    <>
      <Sheet className="p-4 sm:p-6">
        <article className='markdown'>
          <h1>Team contest name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi?
          </p>
        </article>
      </Sheet>

      <Sheet className="mt-4 sm:mt-6 p-4 sm:p-6">
        <article className='markdown'>
          <h2>Instructions</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi?
          </p>
        </article>
      </Sheet>
    </>
  )
}
