import { createContext, useContext, useEffect, useRef } from "react"
import { useMap } from '../../hooks/useMap'
import getValueByBreakpoint from '../../utils/getValueByBreakpoint'

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

  const next = () => {
    if(context.rootRef.current) {
      const scrollLeft = context.rootRef.current.scrollLeft
      const scrollWidth = context.rootRef.current.scrollWidth

      if (scrollLeft > scrollWidth - context.rootWidth) scrollToEnd()
      else context.rootRef.current.scrollTo({ left: scrollLeft + context.rootWidth })
    }
  }
  const prev = () => {
    if(context.rootRef.current) {
      const scrollLeft = context.rootRef.current.scrollLeft

      if (scrollLeft < context.rootWidth) scrollToStart()
      else context.rootRef.current.scrollTo({ left: scrollLeft - context.rootWidth })
    }
  }
  const scrollToStart = () => {
    if(context.rootRef.current) {
      context.rootRef.current.scrollTo({ left: 0 })
    }
  }
  const scrollToEnd = () => {
    if (context.rootRef.current) {
      context.rootRef.current.scrollTo({ left: context.rootRef.current.scrollWidth })
    }
  }

  const actions= { next, prev, scrollToStart, scrollToEnd }

  const slotProps = {
    ...actions,
    start: context.start,
    end: context.end,
    total: list.length,
  }

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
