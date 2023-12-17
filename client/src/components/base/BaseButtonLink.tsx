import { Link } from 'react-router-dom'

interface BaseButtonLinkProps {
  to: string
  children: React.ReactNode
}

export default function BaseButtonLink({ to, children }: BaseButtonLinkProps) {
  return (
    <Link
      to={to}
      className='inline-block rounded-md bg-amber-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700'
    >
      {children}
    </Link>
  )
}
