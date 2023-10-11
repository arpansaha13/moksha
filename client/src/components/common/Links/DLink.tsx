import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import type { HTMLElementTagNames } from '~/types'

interface DLinkProps extends React.HTMLAttributes<HTMLElement> {
  to: string
  as?: HTMLElementTagNames
  children: React.ReactNode
}

export default function DLink({ children, to, as = 'span', ...attrs }: DLinkProps) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

  if (isDesktop) {
    return (
      <Link to={to} {...attrs}>
        {children}
      </Link>
    )
  }

  return createElement(as, attrs, children)
}
