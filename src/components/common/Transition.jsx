/* eslint-disable react-hooks/exhaustive-deps */
import { Children, Fragment, createElement, cloneElement, useEffect, useState, useRef, useCallback } from "react"
import { useList } from '../../hooks/useList'
import classNames from '../../utils/classNames'

export default function Transition({
  show,
  unmount = true,
  appear = false,
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
  const isFirstRender = useRef(!appear)

  useEffect(() => {
    setAll(Children.map(children, (child, i) => {
      return child.props.className
    }))
  }, [])

  // 1 = start
  // 2 = transitioning to end
  // 3 = unmount after leave
  const [transitionState, setTransitionState] = useState(1)
  const [entering, setEntering] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [modifiedChildren, setChildren] = useState(null)
  const resetting = useRef(false)

  const resetTransitionState = useCallback(() => {
    resetting.current = true
    setTimeout(() => setTransitionState(1))
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (show) setEntering(true)
    else setLeaving(true)
  }, [show])

  useEffect(() => {
    if (resetting.current) {
      resetting.current = false
      setChildren(show || !unmount ? modifiedChildren : null)
    }

    if (!entering) return

    const newChildren = Children.map(children, (child, i) => {
      let clonedChild

      if (transitionState === 1) {
        clonedChild = cloneElement(child, { className: classNames(initialClasses[i], enter, enterFrom) })
        setTimeout(() => setTransitionState(2))
      }
      else if (transitionState === 2) {
        clonedChild = cloneElement(child, {
          className: classNames(initialClasses[i], enter, enterTo),
          onTransitionEnd: () => {
            resetTransitionState()
            setEntering(false)
          }
        })
      }
      return clonedChild
    })
    setChildren(newChildren)
  }, [entering, transitionState])

  useEffect(() => {
    if (resetting.current) {
      resetting.current = false
      setChildren(show || !unmount ? modifiedChildren : null)
    }

    if (!leaving) return

    const newChildren = Children.map(children, (child, i) => {
      let clonedChild

      if (transitionState === 1) {
        clonedChild = cloneElement(child, { className: classNames(initialClasses[i], leave, leaveFrom) })
        setTransitionState(2)
      }
      else if (transitionState === 2) {
        const newProps = {
          className: classNames(initialClasses[i], leave, leaveTo),
          onTransitionEnd: () => {
            afterLeave?.()
            if (unmount) setTransitionState(3)
            else setLeaving(false)
          }
        }

        clonedChild = cloneElement(child, newProps)
      }
      else if (transitionState === 3) {
        clonedChild = null
        resetTransitionState()
        setLeaving(false)
      }
      return clonedChild
    })

    setChildren(newChildren)
  }, [leaving, transitionState])

  return createElement(as, props, modifiedChildren)
}
