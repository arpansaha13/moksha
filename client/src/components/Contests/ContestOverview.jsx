import { useMediaQuery } from 'react-responsive'
import { isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '../common/Sheet'
import ContestTypeBadge from '../Contests/ContestTypeBadge'

export default function ContestOverview({ contest }) {
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
            <Para key={i} para={para} />
          ))}
        </article>
      </Sheet>

      {contest.instructions && (
        <Sheet className='mt-4 sm:mt-6 p-4 sm:p-6'>
          <article className='markdown'>
            <h2>Instructions</h2>

            {contest.instructions.map((para, i) => (
              <Para key={i} para={para} />
            ))}
          </article>
        </Sheet>
      )}
    </>
  )
}

const Para = ({ para }) => {
  if (!isNullOrUndefined(para.heading)) return <h3>{para.heading}</h3>

  if (!isNullOrUndefined(para.p)) return <p className={para.bold ? 'font-semibold' : ''}>{para.p}</p>

  if (!isNullOrUndefined(para.ul))
    return (
      <ul>
        {para.ul.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    )
}
