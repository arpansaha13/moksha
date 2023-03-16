/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useCallback, useContext, useEffect, useMemo } from "react"
import { useMap } from '../../../hooks/useMap'
import getValueByBreakpoint from '../../../utils/getValueAtBreakpoint'

const DataContext = createContext(null)

const Wrapper = ({ length, children, visibleCount, exposeWidth = 0 }) => {
  const [context, {set: setContext}] = useMap({
    rootRef: null,
    rootWidth: 0,
    visibleCount: 5,
    exposeWidth: 0,
    start: 0,
    end: 4,
    length,
  })

  useEffect(() => {
    let effectiveVisibleCount = 0

    if (typeof visibleCount === 'number') {
      effectiveVisibleCount = visibleCount
    }
    else if (typeof visibleCount === 'object') {
      if (Object.keys(visibleCount).length === 0) {
        throw new Error('No breakpoints provided for prop `visibleCount`.')
      }
      effectiveVisibleCount = getValueByBreakpoint(visibleCount)
    }
    else {
      throw new Error('Invalid value for prop `visibleCount`.')
    }
    setContext('visibleCount', effectiveVisibleCount)
    setContext('end', effectiveVisibleCount - 1)

    let effectiveExposeWidth = 0

    if (typeof exposeWidth === 'number') {
      effectiveExposeWidth = exposeWidth
    }
    else if (typeof exposeWidth === 'object') {
      if (Object.keys(exposeWidth).length === 0) {
        throw new Error('No breakpoints provided for prop `exposeWidth`.')
      }
      effectiveExposeWidth = getValueByBreakpoint(exposeWidth)
    }
    else {
      throw new Error('Invalid value for prop `exposeWidth`.')
    }
    setContext('exposeWidth', effectiveExposeWidth)
  }, [])

  const scrollToStart = useCallback(() => {
    if(context.rootRef.current) {
      context.rootRef.current.scrollTo({ left: 0 })
    }
  }, [context.rootRef])

  const scrollToEnd = useCallback(() => {
    if (context.rootRef.current) {
      context.rootRef.current.scrollTo({ left: context.rootRef.current.scrollWidth })
    }
  }, [context.rootRef])

  const next = useCallback(() => {
    if(context.rootRef.current) {
      const scrollLeft = context.rootRef.current.scrollLeft
      const scrollWidth = context.rootRef.current.scrollWidth

      if (scrollLeft > scrollWidth - context.rootWidth) scrollToEnd()
      else context.rootRef.current.scrollTo({ left: scrollLeft + context.rootWidth })
    }
  }, [context.rootRef, context.rootWidth, scrollToEnd])

  const prev = useCallback(() => {
    if(context.rootRef.current) {
      const scrollLeft = context.rootRef.current.scrollLeft

      if (scrollLeft < context.rootWidth) scrollToStart()
      else context.rootRef.current.scrollTo({ left: scrollLeft - context.rootWidth })
    }
  }, [context.rootRef, context.rootWidth, scrollToStart])

  const slotProps = useMemo(() => ({
    next,
    prev,
    scrollToStart,
    scrollToEnd,
    start: context.start,
    end: context.end,
    visible: context.visibleCount,
  }), [next, prev, scrollToStart, scrollToEnd, context.start, context.end, context.visibleCount])

  return (
    <DataContext.Provider value={{ context, setContext }}>
      { children(slotProps) }
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext)
}

export default Wrapper
