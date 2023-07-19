import { memo } from 'react'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify-icons/mdi/plus'
import minusIcon from '@iconify-icons/mdi/minus'
import { classNames } from '@arpansaha13/utils'
import Loader from '~common/Loader'

const InviteButton = memo(({ loading, userId, invited, invite, withdrawInvite }) => (
  <button
    type='button'
    disabled={loading}
    className='p-0.5 lg:p-1 xl:px-2 xl:py-1 flex items-center justify-center hover:bg-amber-900/60 text-amber-500 border border-amber-500 rounded-full transition-colors relative'
    onClick={(invited ? withdrawInvite : invite).bind(this, userId)}
  >
    <div className={classNames('w-5 h-5', loading && 'opacity-0')}>
      <Icon icon={invited ? minusIcon : plusIcon} className='inline-block' color='inherit' width='100%' height='100%' />
    </div>

    <span className={classNames('hidden xl:inline-block xl:ml-1 text-xs', loading && 'opacity-0')}>
      {invited ? 'Withdraw' : 'Invite'}
    </span>

    {loading && <Loader className='absolute w-3.5 xl:w-5' />}
  </button>
))

export default InviteButton
