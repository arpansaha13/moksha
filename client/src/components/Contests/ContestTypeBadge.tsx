import { memo } from 'react'
import { classNames } from '@arpansaha13/utils'
import type { ContestBadge } from '~/types'

interface ContestTypeBadgeProps {
  badge: ContestBadge

  /** @default false */
  small?: boolean
}

const ContestTypeBadge = memo(({ badge, small = false }: ContestTypeBadgeProps) => (
  <span
    className={classNames(
      'inline-block px-2 py-0.5 rounded-md font-semibold',
      small ? 'text-xs' : 'text-sm',
      badge === 'solo' && 'bg-indigo-300 text-indigo-900',
      badge === 'team' && 'bg-rose-300 text-rose-900',
      (badge === 'duo' || badge === 'duet') && 'bg-emerald-300 text-emerald-900',
      badge === 'squad' && 'bg-yellow-300 text-yellow-900',
      !['solo', 'team', 'duo', 'duet'].includes(badge) && 'bg-gray-300 text-gray-900'
    )}
  >
    {badge}
  </span>
))

export default ContestTypeBadge
