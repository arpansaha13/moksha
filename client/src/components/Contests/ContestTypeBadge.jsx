import { memo } from "react"
import classNames from "../../utils/classNames"

const ContestTypeBadge = memo(({ type, small = false }) => (
  <span
    className={classNames(
      "px-2 py-0.5 rounded-md font-semibold",
      small ? 'text-xs' : 'text-sm',
      type === 'solo' && 'bg-indigo-300 text-indigo-900',
      type === 'team' && 'bg-rose-300 text-rose-900',
      (type === 'duo' || type === 'duet') && 'bg-emerald-300 text-emerald-900',
      type === 'squad' && 'bg-yellow-300 text-yellow-900',
      !['solo', 'team', 'duo', 'duet'].includes(type) && 'bg-gray-300 text-gray-900',
    )}
  >
    {type}
  </span>
))

export default ContestTypeBadge
