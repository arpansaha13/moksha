import { memo } from 'react'
import { capitalCase } from 'change-case'
import Sheet from '~common/Sheet'
import MLink from '~common/Links/MLink'
import DLink from '~common/Links/DLink'
import { getMokshaContest } from '~/utils/getMokshaContest'

const RegisteredSoloContestCard = memo(({ clubName, contestSlug }) => {
  const contest = getMokshaContest(clubName, contestSlug)
  const link = `/contests/${clubName}/${contestSlug}`

  return (
    <MLink to={link} className='block'>
      <Sheet className='flex flex-row-reverse lg:flex-row overflow-hidden'>
        <div className='h-36 w-36 relative'>
          {/* Replace this image with contest poster */}
          <img src={contest.image.src} alt='' className='w-full h-full object-cover' />
        </div>

        <div className='flex-grow px-4 sm:px-6 py-3 sm:py-4 flex flex-col'>
          <div className='flex-grow'>
            <h3 className='mb-2 text-lg font-semibold text-amber-500'>
              <DLink to={link} className='hover:underline'>
                {contest.name}
              </DLink>
            </h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
              <div>
                <p className='font-semibold text-gray-400'>Organized by</p>
                <p className='text-gray-100 capitalize'>{capitalCase(clubName)}</p>
              </div>
            </div>
          </div>

          <div className='hidden lg:block'>
            <DLink to={link} className='text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors'>
              View contest
            </DLink>
          </div>
        </div>
      </Sheet>
    </MLink>
  )
})

export default RegisteredSoloContestCard
