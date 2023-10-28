import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import type { HTMLElementTagNames } from '~/types'

interface MLinkProps extends React.HTMLAttributes<HTMLElement> {
  to: string
  as?: HTMLElementTagNames
  children: React.ReactNode
}

export default function MLink({ children, to, as = 'span', ...attrs }: MLinkProps) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  if (isTabletOrMobile) {
    return (
      <Link to={to} {...attrs}>
        {children}
      </Link>
    )
  }

  return createElement(as, attrs, children)
}
