import { ReactNode, createElement, forwardRef } from 'react'
import { classNames } from '@arpansaha13/utils'
import type { HTMLElementTagNames } from '~/types'

interface SheetProps {
  as?: HTMLElementTagNames
  children: ReactNode
  className?: string
}

/** background-color should be provided from parent. */
const Sheet = forwardRef(({ as = 'div', children, className, ...rest }: SheetProps, ref) => {
  return createElement(
    as,
    {
      ref,
      className: classNames(
        'bg-amber-900/30 shadow shadow-amber-900/60 rounded-md lg:rounded-lg backdrop-blur-sm',
        className
      ),
      ...rest,
    },
    children
  )
})

export default Sheet
