import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData } from 'react-router-dom'
import { capitalCase } from 'change-case'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import rightIcon from '@iconify-icons/mdi/chevron-right'
import { classNames } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import MLink from '~common/Links/MLink'
import DLink from '~common/Links/DLink'
import Container from '~common/Container'
import SocialShare from '~/components/SocialShare'
import Picture from '~/components/pictures/Picture'
import ContestTypeBadge from '~/components/Contests/ContestTypeBadge'
import { getContests } from '~loaders/contests.loader'
import { clubNames } from '~/data/clubs'

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

      <MokshaContests mokshaContestsMap={mokshaContestsMap} className='mb-12 space-y-12' />
      <UdaanContests udaanContestsList={udaanContestsList} className='space-y-6' />
    </>
  )
}

Component.displayName = 'Contests'

const UdaanContests = memo(
  ({ udaanContestsList, className }) => (
    <Container className={className}>
      <h2 className='text-4xl text-center font-bold border-b-2 border-amber-900/70'>Udaan</h2>

      <div className='h-scroll lg:pb-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {udaanContestsList.map(contest => (
          <div key={contest.id} className='mx-auto min-w-[16rem] w-64 lg:w-auto'>
            <ContestCard clubSlug={contest.club} contest={contest} />
          </div>
        ))}
      </div>
    </Container>
  ),
  () => true
)

const MokshaContests = memo(
  ({ className, mokshaContestsMap }) => (
    <Container className={className}>
      <h2 className='text-4xl text-center font-bold border-b-2 border-amber-900/70'>Moksha</h2>

      {Object.keys(mokshaContestsMap).map(clubSlug => (
        <ClubContests key={clubSlug} clubSlug={clubSlug} contests={mokshaContestsMap[clubSlug]} />
      ))}
    </Container>
  ),
  () => true
)

/** Display contests of a particular club */
const ClubContests = memo(
  ({ clubSlug, contests }) => (
    <section className='flex-grow w-full' id={`${clubSlug}-contests`}>
      <h3 className='mb-4 text-4xl font-bold'>{clubNames[clubSlug] ?? capitalCase(clubSlug)}</h3>

      <div className='h-scroll lg:pb-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {contests.map(contest => (
          <div key={contest.id} className='min-w-[16rem]'>
            <ContestCard clubSlug={clubSlug} contest={contest} />
          </div>
        ))}
      </div>
    </section>
  ),
  (prev, next) => prev.clubSlug === next.clubSlug
)

const ContestCard = memo(
  ({ clubSlug, contest }) => (
    <Sheet className='flex flex-col !bg-amber-900/60 text-sm overflow-hidden'>
      <MLink to={`/contests/${clubSlug}/${contest.slug}`} as='div' className='block h-[304px]'>
        <div className='w-full h-48 flex items-center justify-center relative'>
          <Picture picture={contest.image} alt={`moksha-contest-${contest.slug}-poster`} />

          <span
            role='presentation'
            className='absolute w-full h-full bg-gradient-to-bl from-brown via-transparent mix-blend-darken'
            aria-hidden={true}
          />

          <div className='absolute top-3 right-3 z-20 flex gap-2'>
            {contest.badges.map(badge => (
              <ContestTypeBadge key={badge} small badge={badge} />
            ))}
          </div>
        </div>

        <div className='w-full px-4 pt-4'>
          <h4 className='text-lg text-amber-500 font-semibold'>
            <DLink to={`/contests/${clubSlug}/${contest.slug}`} className='lg:hover:underline line-clamp-1'>
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
          to={`/contests/${clubSlug}/${contest.slug}`}
          className='hidden lg:block font-medium text-amber-600 hover:text-amber-500 transition-colors'
        >
          <span>View contest</span>
          <span className='inline-block w-5 h-5'>
            <Icon icon={rightIcon} className='inline-block' color='inherit' width='100%' height='100%' />
          </span>
        </Link>

        <SocialShare
          data={{
            url: `/contests/${clubSlug}/${contest.slug}`,
            title: `Moksha contest - ${contest.name}`,
            text: contest.description[0].p,
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
