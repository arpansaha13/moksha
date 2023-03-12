/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react"
import { useSize } from '../../../hooks/useSize'
import { useScrolling } from '../../../hooks/useScrolling'
import { useData } from './Wrapper'
import classNames from '../../../utils/classNames'
import getValueByBreakpoint from '../../../utils/getValueAtBreakpoint'
import styles from './style.module.css'

// interface CardsSliderProps {
//   children: ReactNode
//   className: string
//   gap: number | Breakpoint
//   /**
//    * Stretch the cards to fill the empty space if not enough cards are available to fill the visible count.
//    * @default false
//    */
//   stretch?: boolean
// }

export default function CardsSlider({ children, className, gap, stretch = false }) {
  const { context, setContext } = useData()
  const rootRef = useRef(null)
  const [effectiveGap, setGap] = useState(0)
  const { width: rootWidth } = useSize(rootRef)
  const isScrolling = useScrolling(rootRef)

  const cardWidth = useMemo(() => {
      const effectiveExposeWidth = context.length <= context.visibleCount && stretch ? 0 : context.exposeWidth
      const availableWidth = rootWidth - effectiveExposeWidth

      return Math.floor((availableWidth - (context.visibleCount - 1) * effectiveGap) / context.visibleCount)
    },
    [effectiveGap, rootWidth, context.visibleCount, context.exposeWidth, context.length]
  )

  useEffect(() => {
    if (typeof gap === 'number') {
      setGap(gap)
    }
    else if (typeof gap === 'object') {
      if (Object.keys(gap).length === 0) throw new Error('No breakpoints provided for prop `gap`.')
      setGap(getValueByBreakpoint(gap))
    }
    else {
      throw new Error('Invalid value for prop `gap`.')
    }
  }, [])

  useEffect(() => {
    setContext('rootRef', rootRef)
  }, [rootRef])

  useEffect(() => {
    setContext('rootWidth', rootWidth)
    if (rootRef.current) rootRef.current.scrollTo({ left: 0 })
  }, [rootWidth])

  useEffect(() => {
    // When scrolling ends, update the start and end
    if (!isScrolling) {
      const newStart = Math.ceil(rootRef.current.scrollLeft / (cardWidth + effectiveGap))
      const newEnd = newStart + context.visibleCount - 1
      setContext('start', newStart)
      setContext('end', newEnd)
    }
  }, [isScrolling, effectiveGap, cardWidth])

  return (
    <div className={className}>
      <div
        ref={rootRef}
        className={classNames(
          'py-2 w-full h-full flex overflow-x-scroll scroll-smooth snap-x',
          styles['cards-slider-scrollbar']
        )}
        style={{ gap: `${effectiveGap}px` }}
      >
        { children({cardWidth}) }
      </div>
    </div>
  )
}
