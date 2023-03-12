import { Fragment, memo } from "react"
import { Tab } from '@headlessui/react'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { useAppContext } from "../../containers/DataProvider"
import Sheet from "../common/Sheet"
import TeamContestOverview from "./TeamContestOverview"
import CreateTeam from './CreateTeam'
import JoinTeam from './JoinTeam'
import EmptyState from '../common/EmptyState'

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
                  <span className="hidden lg:block">{ tabName }</span>
                  <span className="lg:hidden">{ tabName.split(' ')[0] }</span>
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
