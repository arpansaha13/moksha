import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData } from 'react-router-dom'
import { capitalCase } from 'change-case'
import { classNames } from '@arpansaha13/utils'
import { isTouchDevice } from '@arpansaha13/utils/browser'
import Sheet from '~common/Sheet'
import MLink from '~common/Links/MLink'
import DLink from '~common/Links/DLink'
import Container from '~common/Container'
import CardsSlider from '~common/CardsSlider'
import SocialShare from '~/components/SocialShare'
import ContestTypeBadge from '~/components/Contests/ContestTypeBadge'
import { useHashLink } from '~/hooks/useHashLink'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import rightIcon from '@iconify-icons/mdi/chevron-right'
import doubleLeftIcon from '@iconify-icons/mdi/chevron-double-left'
import doubleRightIcon from '@iconify-icons/mdi/chevron-double-right'

function Contests() {
  useHashLink()

  const contestsMap = useLoaderData()

  return (
    <>
      <Helmet>
        <title>Moksha | Contests</title>
      </Helmet>

      <Container className='pb-4 grid grid-cols-1 sm:grid-cols-2' id='contests-hero-section'>
        <div className='markdown'>
          <h1>Contests</h1>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, asperiores perferendis! Ex rem, alias id
            doloribus impedit dignissimos voluptatibus suscipit natus corporis quis.
          </p>

          <ul className='grid grid-cols-2 gap-y-0'>
            {Object.keys(contestsMap).map(clubName => (
              <li key={clubName}>
                <Link to={{ hash: `${clubName}-contests` }}>{capitalCase(clubName)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {Object.keys(contestsMap).map(clubName => (
        <ClubContests key={clubName} clubName={clubName} contests={contestsMap[clubName]} />
      ))}
    </>
  )
}

export default Contests

const PaginateButton = memo(({ children, onClick }) => (
  <button
    type='button'
    className='block p-1 w-10 h-10 text-gray-200 focus:text-amber-600 border border-amber-600 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-amber-600 focus:ring-amber-600 transition-colors relative'
    onClick={onClick}
  >
    {children}
  </button>
))

const cardGap = { base: 16, sm: 20, xl: 28 }

/** Display contests of a particular club */
const ClubContests = memo(({ clubName, contests }) => {
  return (
    <Container as='section' className='flex-grow py-4 w-full' id={`${clubName}-contests`}>
      <h2 className='mb-6 text-4xl font-semibold'>{capitalCase(clubName)}</h2>

      <CardsSlider.Wrapper
        length={contests.length}
        exposeWidth={{ base: 44, sm: 140 }}
        visibleCount={{ base: 1, sm: 3 }}
      >
        {({ scrollToStart, scrollToEnd, prev, next, start, end, visible }) => (
          <>
            <CardsSlider className='w-full' gap={cardGap}>
              {({ cardWidth }) =>
                contests.map(contest => (
                  <ContestCard key={contest.id} clubName={clubName} cardWidth={cardWidth} contest={contest} />
                ))
              }
            </CardsSlider>

            {!isTouchDevice() && contests.length > visible && (
              <div className='mx-auto mt-6 w-max flex items-center gap-4'>
                <PaginateButton onClick={scrollToStart}>
                  <Icon icon={doubleLeftIcon} className='block' color='inherit' width='100%' height='100%' />
                </PaginateButton>
                <PaginateButton onClick={prev}>
                  <Icon icon={leftIcon} className='block' color='inherit' width='100%' height='100%' />
                </PaginateButton>

                {/* Specify a width to prevent shifts in width during scroll */}
                <p className='w-[5ch] sm:w-[8ch] text-center'>
                  <span>
                    {start + 1}
                    {''}
                  </span>
                  <span className='hidden sm:inline'>
                    {'-'}
                    {end + 1}
                  </span>
                  <span>
                    {'/'}
                    {contests.length}
                  </span>
                </p>

                <PaginateButton onClick={next}>
                  <Icon icon={rightIcon} className='block' color='inherit' width='100%' height='100%' />
                </PaginateButton>
                <PaginateButton onClick={scrollToEnd}>
                  <Icon icon={doubleRightIcon} className='block' color='inherit' width='100%' height='100%' />
                </PaginateButton>
              </div>
            )}
          </>
        )}
      </CardsSlider.Wrapper>
    </Container>
  )
})

const ContestCard = memo(({ clubName, cardWidth, contest }) => (
  <div className='flex-shrink-0 snap-center' style={{ width: `${cardWidth}px` }}>
    <Sheet className='w-full flex flex-col !bg-amber-900/60 text-sm overflow-hidden'>
      <MLink to={`/contests/${clubName}/${contest.slug}`} as='div' className='block h-[304px]'>
        <div className='w-full h-48 flex items-center justify-center relative'>
          <img src={contest.image.src} alt={`moksha-contest-${contest.slug}-poster`} className='w-full h-full object-cover' />
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
          <h3 className='text-lg text-amber-500 font-semibold'>
            <DLink to={`/contests/${clubName}/${contest.slug}`} className='lg:hover:underline'>
              {contest.name}
            </DLink>
          </h3>

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
  </div>
))
