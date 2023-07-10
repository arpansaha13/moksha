import { classNames } from '@arpansaha13/utils'

export default function Loader({ className }) {
  return <div className={classNames(className, 'aspect-square border-y-2 border-gray-50 rounded-full animate-spin')} />
}
