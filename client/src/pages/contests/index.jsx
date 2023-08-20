import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData } from 'react-router-dom'
// import { capitalCase } from 'change-case'
import { classNames } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import MLink from '~common/Links/MLink'
import DLink from '~common/Links/DLink'
import Container from '~common/Container'
import SocialShare from '~/components/SocialShare'
import StayTunedBanner from '~/components/StayTunedBanner'
import ContestTypeBadge from '~/components/Contests/ContestTypeBadge'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import rightIcon from '@iconify-icons/mdi/chevron-right'
import { getContests } from '~loaders/contests.loader'

export const loader = getContests

export function Component() {
  const { mokshaContestsMap, udaanContestsList } = useLoaderData()

  return (
    <>
      <Helmet>
        <title>Moksha | Contests</title>
      </Helmet>

      <Container className='mb-12 grid grid-cols-1 sm:grid-cols-2' id='contests-hero-section'>
        <div className='markdown'>
          <h1>Contests</h1>

          <p>
            Unleash your brilliance: engage, excel, and elevate in the ultimate arena of creativity! Welcome to NIT
            Agartala Moksha contests - where talents collide and legends emerge. Explore, participate, and ignite your
            competitive spirit!
          </p>
        </div>
      </Container>

      <UdaanContests udaanContestsList={udaanContestsList} className='mb-12 space-y-6' />
      <MokshaContests mokshaContestsMap={mokshaContestsMap} className='space-y-6' />
    </>
  )
}

Component.displayName = 'Contests'

const UdaanContests = memo(
  ({ udaanContestsList, className }) => (
    <Container className={className}>
      <h2 className='text-4xl text-center font-semibold border-b-2 border-amber-900/70'>Udaan</h2>

      <div className='h-scroll lg:pb-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {udaanContestsList.map(contest => (
          <div key={contest.id} className='min-w-[16rem]'>
            <ContestCard clubName={contest.club} contest={contest} />
          </div>
        ))}
      </div>
    </Container>
  ),
  () => true
)

const MokshaContests = memo(
  ({ className }) => (
    <Container className={className}>
      <h2 className='text-4xl text-center font-semibold border-b-2 border-amber-900/70'>Moksha</h2>

      <StayTunedBanner />

      {/* {Object.keys(mokshaContestsMap).map(clubName => (
        <ClubContests key={clubName} clubName={clubName} contests={mokshaContestsMap[clubName]} />
      ))} */}
    </Container>
  ),
  () => true
)

/** Display contests of a particular club */
// const ClubContests = memo(
//   ({ clubName, contests }) => (
//     <section className='flex-grow w-full' id={`${clubName}-contests`}>
//       <h3 className='mb-6 text-4xl font-semibold'>{capitalCase(clubName)}</h3>

//       <div className='h-scroll lg:pb-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6'>
//         {contests.map(contest => (
//           <div key={contest.id} className='min-w-[16rem]'>
//             <ContestCard clubName={clubName} contest={contest} />
//           </div>
//         ))}
//       </div>
//     </section>
//   ),
//   (prev, next) => prev.clubName === next.clubName
// )

const ContestCard = memo(
  ({ clubName, contest }) => (
    <Sheet className='flex flex-col !bg-amber-900/60 text-sm overflow-hidden'>
      <MLink to={`/contests/${clubName}/${contest.slug}`} as='div' className='block h-[304px]'>
        <div className='w-full h-48 flex items-center justify-center relative'>
          <img
            src={contest.image.src}
            alt={`moksha-contest-${contest.slug}-poster`}
            className='w-full h-full object-cover'
          />
          <span
            role='presentation'
            className='absolute w-full h-full bg-gradient-to-bl from-brown via-transparent mix-blend-darken'
            aria-hidden={true}
          />

          <div className='absolute top-3 right-3 z-20 flex gap-2'>
            {contest.type.map(type => (
              <ContestTypeBadge key={type} small type={type} />
            ))}
          </div>
        </div>

        <div className='w-full px-4 pt-4'>
          <h4 className='text-lg text-amber-500 font-semibold'>
            <DLink to={`/contests/${clubName}/${contest.slug}`} className='lg:hover:underline'>
              {contest.name}
            </DLink>
          </h4>

          {contest.subtitle && <p className='text-sm text-gray-400'>{contest.subtitle}</p>}

          <div
            className={classNames(
              'mt-2 text-sm text-gray-300 space-y-1',
              contest.subtitle ? 'line-clamp-2' : 'line-clamp-3'
            )}
          >
            {contest.description.map((para, i) => (
              <p key={i}>{para.p}</p>
            ))}
          </div>
        </div>
      </MLink>

      <div className='px-4 pt-2 pb-4 w-full flex items-center justify-end lg:justify-between'>
        <Link
          to={`/contests/${clubName}/${contest.slug}`}
          className='hidden lg:block font-medium text-amber-600 hover:text-amber-500 transition-colors'
        >
          <span>View contest</span>
          <span className='inline-block w-5 h-5'>
            <Icon icon={rightIcon} className='inline-block' color='inherit' width='100%' height='100%' />
          </span>
        </Link>

        <SocialShare
          data={{
            url: `/contests/${clubName}/${contest.slug}`,
            title: `Moksha contest - ${contest.name}`,
            text:
              contest.description[0].p.length <= 100
                ? contest.description[0].p.length
                : `${contest.description[0].p.substr(0, 100)}...`, // trim to 100 characters
          }}
          className='block text-amber-600 hover:text-amber-500'
        >
          <div className='w-6 h-6 transition-colors'>
            <Icon icon={shareIcon} className='block' color='inherit' width='100%' height='100%' aria-hidden />
          </div>
          <span className='sr-only'>Share</span>
        </SocialShare>
      </div>
    </Sheet>
  ),
  (prev, next) => prev.contest.id === next.contest.id
)
