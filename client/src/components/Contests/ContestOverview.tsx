import { useMediaQuery } from 'react-responsive'
import { isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '../common/Sheet'
import ContestTypeBadge from './ContestTypeBadge'
import type { Contest } from '~/types'

interface ContestOverviewProps {
  contest: Contest
}

interface RenderProseElementProps {
  // FIXME: typescript is not able to identify the type of ProseElement
  // proseElement: ProseElement

  proseElement: any // for now
}

export default function ContestOverview({ contest }: ContestOverviewProps) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  return (
    <>
      <Sheet className='p-4 sm:p-6'>
        <article className='markdown'>
          <div className='flex gap-2'>
            {contest.type.map(type => (
              <ContestTypeBadge small={isTabletOrMobile} key={type} type={type} />
            ))}
          </div>
          {contest.description.map((para, i) => (
            <RenderProseElement key={i} proseElement={para} />
          ))}
        </article>
      </Sheet>

      {contest.instructions && (
        <Sheet className='mt-4 sm:mt-6 p-4 sm:p-6'>
          <article className='markdown'>
            <h2>Instructions</h2>

            {contest.instructions.map((para, i) => (
              <RenderProseElement key={i} proseElement={para} />
            ))}
          </article>
        </Sheet>
      )}
    </>
  )
}

const RenderProseElement = ({ proseElement }: RenderProseElementProps) => {
  if (!isNullOrUndefined(proseElement.heading)) return <h3>{proseElement.heading}</h3>

  if (!isNullOrUndefined(proseElement.p))
    return <p className={proseElement.bold ? 'font-semibold' : ''}>{proseElement.p}</p>

  if (!isNullOrUndefined(proseElement.ul)) {
    return (
      <ul>
        {proseElement.ul.map((li: string, i: number) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    )
  }

  return null
}