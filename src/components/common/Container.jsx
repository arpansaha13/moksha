import { createElement } from 'react'
import classNames from '../../utils/classNames'

export default function Container({ children, as ='div', className = '' }) {
  return createElement(
    as,
    { className: classNames("mx-auto px-4 sm:max-w-xl sm:px-0 lg:max-w-4xl xl:max-w-6xl", className) },
    children,
  )
}
