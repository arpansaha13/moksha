import { useLoaderData } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import ContestTypeBadge from '~/components/Contests/ContestTypeBadge'
import { getContest } from '~loaders/contests.loader'
import type { Contest } from '~/types'

export const loader = getContest

interface RenderProseElementProps {
  // FIXME: typescript is not able to identify the type of ProseElement
  // proseElement: ProseElement

  proseElement: any // for now
}

export function Component() {
  const contest = useLoaderData() as Contest
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  return (
    <>
      <Sheet className='p-4 sm:p-6'>
        <article className='markdown'>
          <div className='flex gap-2'>
            {contest.badges.map(badge => (
              <ContestTypeBadge small={isTabletOrMobile} key={badge} badge={badge} />
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

Component.displayName = 'ContestOverview'

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
