/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useMemo, useRef, useState } from "react"
import { useSize } from '../../hooks/useSize'
import { useScrolling } from '../../hooks/useScrolling'
import { useData } from './Wrapper'
import classNames from '../../utils/classNames'
import getValueByBreakpoint from '../../utils/getValueByBreakpoint'
import styles from './style.css'

export default function TzCardsSlider({ children, className, gap }) {
  const { context, setContext } = useData()
  const rootRef = useRef(null)
  const [effectiveGap, setGap] = useState(0)
  const { width: rootWidth } = useSize(rootRef)
  const isScrolling = useScrolling(rootRef)

  const cardWidth = useMemo(
    () => getCardWidth(rootWidth, context.visibleCount, effectiveGap, context.exposeWidth),
    [effectiveGap, rootWidth, context]
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
          styles['tz-card-stack-carousal-scrollbar']
        )}
        style={{ gap: `${effectiveGap}px` }}
      >
        {
          context.list.map(item => (
            <Card key={ item.id } item={item} style={{ width: `${cardWidth}px` }}>
              { children }
            </Card>
          ))
        }
      </div>
    </div>
  )
}

const Card = memo(({ children, item, style }) => (
  <div className="flex-shrink-0 snap-center" style={style}>
    {children(item)}
  </div>
))

const getCardWidth = (rootWidth, visibleCount, gap, exposeWidth) => {
  const availableWidth = rootWidth - exposeWidth
  return Math.floor((availableWidth - (visibleCount - 1) * gap) / visibleCount)
}
