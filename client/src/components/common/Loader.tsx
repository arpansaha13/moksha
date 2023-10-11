import { classNames } from '@arpansaha13/utils'

interface LoaderProps {
  className: string
}

export default function Loader({ className }: LoaderProps) {
  return <div className={classNames(className, 'aspect-square border-y-2 border-gray-50 rounded-full animate-spin')} />
}
