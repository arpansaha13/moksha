import { Children, Fragment, createElement, cloneElement, useEffect, useState, useRef } from "react"
import { useList } from '../../hooks/useList'
import classNames from '../../utils/classNames'

export default function Transition({
  show,
  unmount = true,
  as = Fragment,
  children,
  enter = "",
  enterFrom = "",
  enterTo = "",
  leave = "",
  leaveFrom = "",
  leaveTo = "",
  afterLeave, // call after leave, if any
  ...props
}) {
  const [initialClasses, { setAll }] = useList([])

  useEffect(() => {
    setAll(Children.map(children, (child, i) => {
      return child.props.className
    }))
  }, [])

  // 1 = start
  // 2 = transitioning to end
  // 3 = unmount after leave
  const [transitionState, setTransitionState] = useState(1)
  const resetting = useRef(false)

  const resetTransitionState = () => {
    resetting.current = true
    setTimeout(() => setTransitionState(1))
  }

  const modifiedChildren = Children.map(children, (child, i) => {
    if (resetting.current) {
      resetting.current = false
      return show ? child : null
    }

    let clonedChild

    if (show) {
      if (transitionState === 1) {
        clonedChild = cloneElement(child, { className: classNames(initialClasses[i], enter, enterFrom) })
        setTimeout(() => setTransitionState(2))
      }
      else if (transitionState === 2) {
        clonedChild = cloneElement(child, {
          className: classNames(initialClasses[i], enter, enterTo),
          onTransitionEnd: resetTransitionState
        })
      }
      return clonedChild
    }
    else {
      if (transitionState === 1) {
        clonedChild = cloneElement(child, { className: classNames(initialClasses[i], leave, leaveFrom) })
        setTransitionState(2)
      }
      else if (transitionState === 2) {
        const newProps = { className: classNames(initialClasses[i], leave, leaveTo) }
        newProps.onTransitionEnd = () => {
          afterLeave?.()
          if (unmount) setTransitionState(3)
        }

        clonedChild = cloneElement(child, newProps)
      }
      else if (transitionState === 3) {
        clonedChild = null
        resetTransitionState()
      }
      return clonedChild
    }
  })

  return createElement(as, props, modifiedChildren)
}
