import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { useAppContext } from '../../containers/DataProvider'
import Sheet from '../common/Sheet'
import EmptyState from '../common/EmptyState'
import ContestOverview from './ContestOverview'
import SoloRegistration from './SoloRegistration'

const SoloContest = ({ contest }) => {
  const { appContext } = useAppContext()

  return (
    <>
      <div className='mt-6'>
        <ContestOverview contest={contest} />
      </div>

      <Sheet className='mt-6 p-6'>
        {appContext.authenticated ? (
          <SoloRegistration />
        ) : (
          <EmptyState
            icon={accountAlertIcon}
            title='Interested in this contest?'
            description='Login to register in it...'
          />
        )}
      </Sheet>
    </>
  )
}

export default SoloContest
