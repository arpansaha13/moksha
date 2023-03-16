import { createElement, forwardRef } from 'react'
import classNames from '../../utils/classNames'

const Container = forwardRef(({ children, as ='div', className = '', ...rest }, ref) =>  {
  return createElement(
    as,
    {
      ref,
      className: classNames("mx-auto px-4 sm:max-w-xl sm:px-0 lg:max-w-4xl xl:max-w-6xl", className),
      ...rest,
    },
    children,
  )
})
export default Container
