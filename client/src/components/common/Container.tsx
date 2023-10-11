import { createElement, forwardRef } from 'react'
import { classNames } from '@arpansaha13/utils'
import type { HTMLElementTagNames } from '~/types'

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** @default 'div' */
  as?: HTMLElementTagNames
  className?: string
  children: React.ReactNode
}

const Container = forwardRef(({ children, as = 'div', className = '', ...rest }: ContainerProps, ref) => {
  return createElement(
    as,
    {
      ref,
      className: classNames('mx-auto px-4 xs:max-w-md sm:max-w-xl sm:px-0 lg:max-w-4xl xl:max-w-6xl', className),
      ...rest,
    },
    children
  )
})
export default Container
