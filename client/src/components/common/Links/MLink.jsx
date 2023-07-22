import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export default function MLink({ children, to, as = 'span', ...attrs }) {
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
