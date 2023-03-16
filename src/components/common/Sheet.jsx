import { createElement, forwardRef } from "react"
import classNames from "../../utils/classNames"

/** background-color should be provided from parent. */
const Sheet = forwardRef(({ as = 'div', children, className, ...rest }, ref) => {
  return createElement(
    as,
    {
      ref,
      className: classNames(
        'bg-amber-900/30 shadow shadow-amber-900/60 rounded-md lg:rounded-lg backdrop-blur-sm',
        className,
      ),
      ...rest,
    },
    children
  )
})

export default Sheet
