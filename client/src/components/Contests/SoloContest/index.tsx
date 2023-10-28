import { useMemo } from 'react'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { useStore } from '~/store'
import Sheet from '~common/Sheet'
import EmptyState from '~common/EmptyState'
import ContestOverview from '../ContestOverview'
import SoloRegistration from './SoloRegistration'
import type { SoloContest as SoloContestType } from '~/types'

interface SoloContestProps {
  contest: SoloContestType
}

const SoloContest = ({ contest }: SoloContestProps) => {
  const authState = useStore(state => state.authState)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contestTypeIsOpen = useMemo<boolean>(() => contest.type.includes('open'), [contest.id])

  return (
    <>
      <div className='mt-6'>
        <ContestOverview contest={contest} />
      </div>

      {!contestTypeIsOpen && (
        <Sheet className='mt-6 p-6'>
          {authState.authenticated ? (
            <SoloRegistration contest={contest} />
          ) : (
            <EmptyState
              icon={accountAlertIcon}
              title='Interested in this contest?'
              description='Login to register in it...'
            />
          )}
        </Sheet>
      )}
    </>
  )
}

export default SoloContest
