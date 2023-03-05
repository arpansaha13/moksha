import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { useMap } from '../../../hooks/useMap'
import getValueByBreakpoint from '../../../utils/getValueAtBreakpoint'

const DataContext = createContext(null)

const Wrapper = ({ list, children, visibleCount, exposeWidth = 0 }) => {
  const effectiveVisibleCount = useRef(5)

  const [context, {set: setContext}] = useMap({
    rootRef: null,
    rootWidth: 0,
    list,
    visibleCount: effectiveVisibleCount.current,
    exposeWidth,
    start: 0,
    end: effectiveVisibleCount.current - 1,
  })

  useEffect(() => {
    if (typeof visibleCount === 'number') {
      effectiveVisibleCount.current = visibleCount
    }
    else if (typeof visibleCount === 'object') {
      if (Object.keys(visibleCount).length === 0) {
        throw new Error('No breakpoints provided for prop `visibleCount`.')
      }
      effectiveVisibleCount.current = getValueByBreakpoint(visibleCount)
    }
    else {
      throw new Error('Invalid value for prop `visibleCount`.')
    }
    setContext('visibleCount', effectiveVisibleCount.current)
    setContext('end', effectiveVisibleCount.current - 1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    total: list.length,
  }), [next, prev, scrollToStart, scrollToEnd, context.start, context.end, context.visibleCount, list.length])

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
