import { memo } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Disclosure } from '@headlessui/react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { capitalCase } from 'change-case'
import Sheet from '~common/Sheet'
import MLink from '~common/Links/MLink'
import DLink from '~common/Links/DLink'
import RegisteredContestMembers from '../Teams/RegisteredContestMembers'
import CastleGate2 from '~/assets/castle-gate-2.svg' // Reference image for now
import { getMokshaContest } from '~/utils/getMokshaContest'

const RegisteredTeamContestCard = memo(({ reg, showRegisteredMembers = true }) => {
  const clubName = reg.contest.club_slug
  const contestSlug = reg.contest.contest_slug

  const contest = getMokshaContest(clubName, contestSlug)
  const link = `/contests/${clubName}/${contestSlug}`

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const renderDisclosure = showRegisteredMembers

  return (
    <ConditionalWrapper renderDisclosure={renderDisclosure} className='overflow-hidden'>
      <div className='flex'>
        <MLink to={link} as='div' className='flex-shrink-0 block h-36 w-36 relative'>
          {/* Replace this image with contest poster */}
          <img src={CastleGate2} alt='' className='w-full h-full object-cover' />
        </MLink>

        <div className='@container flex-grow px-4 sm:px-6 py-3 sm:py-4 flex flex-col justify-between'>
          <MLink to={link} as='div' className='flex-grow block'>
            <h3 className='mb-2 text-lg font-semibold text-amber-500 line-clamp-1'>
              <DLink to={link} className='hover:underline'>
                {contest.name}
              </DLink>
            </h3>

            <div className='grid grid-cols-1 @2xs:grid-cols-2 gap-2 text-sm'>
              <div>
                <p className='font-semibold text-gray-400'>Organized by</p>
                <p className='text-gray-100 capitalize'>{capitalCase(clubName)}</p>
              </div>

              {!isNullOrUndefined(reg.team) && (
                <div className='hidden @2xs:block'>
                  <p className='font-semibold text-gray-400'>Team</p>
                  <DLink
                    to={`/teams/${reg.team.team_id}`}
                    className='text-gray-100 lg:hover:underline lg:transition-colors'
                  >
                    {reg.team.team_name}
                  </DLink>
                </div>
              )}
            </div>
          </MLink>

          {(!isTabletOrMobile || renderDisclosure) && (
            <div className='pt-2.5 w-full text-sm flex justify-end lg:justify-between'>
              <DLink
                to={link}
                className='hidden lg:inline-block text-amber-600 hover:text-amber-500 font-medium transition-colors'
              >
                View contest
              </DLink>

              {renderDisclosure && (
                <Disclosure.Button className='text-amber-600 hover:text-amber-500 font-medium transition-colors'>
                  {({ open }) => (open ? 'Hide members' : 'Show members')}
                </Disclosure.Button>
              )}
            </div>
          )}
        </div>
      </div>

      {renderDisclosure && (
        <Disclosure.Panel className='px-4 sm:px-6 py-3 sm:py-4'>
          <h4 className='mb-2 text-lg text-gray-300 font-semibold'>Participating members</h4>

          <RegisteredContestMembers members={reg.registered_members} />
        </Disclosure.Panel>
      )}
    </ConditionalWrapper>
  )
})

export default RegisteredTeamContestCard

function ConditionalWrapper({ renderDisclosure, children, className }) {
  return renderDisclosure ? (
    <Disclosure as={Sheet} className={className}>
      {children}
    </Disclosure>
  ) : (
    <Sheet className={className}>{children}</Sheet>
  )
}
