/* eslint-disable react-hooks/exhaustive-deps */
import { Children, Fragment, createElement, cloneElement, useEffect, useState, useRef, useCallback } from "react"
import { useList } from '../../hooks/useList'
import classNames from '../../utils/classNames'

export const Transition = ({
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
}) => {
  const [initialClasses, setClasses] = useState('')
  const isFirstRender = useRef(!appear)

  useEffect(() => {
    setClasses(Children.map(children, (child, i) => {
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
    setTransitionState(1)
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
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (show) setChildren(cloneElement(children, { className: classNames(initialClasses, enter, enterTo) }))
  }, [children])

  useEffect(() => {
    if (resetting.current) {
      resetting.current = false
      setChildren(show || !unmount ? modifiedChildren : null)
    }

    if (!entering) return

    let newChildren

    if (transitionState === 1) {
      newChildren = cloneElement(children, { className: classNames(initialClasses, enter, enterFrom) })
      setTimeout(setTransitionState, 200, 2)
    }
    else if (transitionState === 2) {
      const onTransitionEnd = () => {
        setEntering(false)
        resetTransitionState()
      }
      const newProps = {
        className: classNames(initialClasses, enter, enterTo),
        onTransitionEnd
      }
      newChildren = cloneElement(children, newProps)
    }
    setChildren(newChildren)
  }, [entering, transitionState])

  useEffect(() => {
    if (resetting.current) {
      resetting.current = false
      setChildren(show || !unmount ? modifiedChildren : null)
    }

    if (!leaving) return

    let newChildren

    if (transitionState === 1) {
      newChildren = cloneElement(children, { className: classNames(initialClasses, leave, leaveFrom) })
      setTransitionState(2)
    }
    else if (transitionState === 2) {
      const newProps = {
        className: classNames(initialClasses, leave, leaveTo),
        onTransitionEnd: () => {
          afterLeave?.()
          setTransitionState(3)
        }
      }
      newChildren = cloneElement(children, newProps)
    }
    else if (transitionState === 3) {
      newChildren = unmount ? null : children
      setLeaving(false)
      resetTransitionState()
    }

    setChildren(newChildren)
  }, [leaving, transitionState])

  return createElement(as, props, modifiedChildren)
}
export default Transition
