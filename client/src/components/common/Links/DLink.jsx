import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export default function DLink({ children, to, as = 'span', ...attrs }) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })

  return isDesktop ? (
    <Link to={to} {...attrs}>
      {children}
    </Link>
  ) : (
    createElement(as, attrs, children)
  )
}
