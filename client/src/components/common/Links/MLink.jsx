import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export default function MLink({ children, to, as = 'span', ...attrs }) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  return isTabletOrMobile ? (
    <Link to={to} {...attrs}>
      {children}
    </Link>
  ) : (
    createElement(as, attrs, children)
  )
}
