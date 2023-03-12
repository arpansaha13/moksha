/* eslint-disable jsx-a11y/alt-text */
import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { capitalCase } from 'change-case'
import Container from '../../components/common/Container'
import Sheet from '../../components/common/Sheet'
import ContestTypeBadge from '../../components/Contests/ContestTypeBadge'
import CardsSlider from "../../components/common/CardsSlider"
import { useHashLink } from '../../hooks/useHashLink'
import { Icon } from '@iconify/react'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import rightIcon from '@iconify-icons/mdi/chevron-right'
import doubleLeftIcon from '@iconify-icons/mdi/chevron-double-left'
import doubleRightIcon from '@iconify-icons/mdi/chevron-double-right'
import contestsMap from '../../data/contests'
import CastleGate2 from '../../assets/castle-gate-2.svg' // Reference image for now
import classNames from '../../utils/classNames'

function Contests() {
  useHashLink()

  return (
    <>
      <Helmet>
        <title>Moksha | Contests</title>
      </Helmet>

      <Container className="pb-4 grid grid-cols-1 sm:grid-cols-2" id="contests-hero-section">
        <div className='markdown'>
          <h1>Contests</h1>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, asperiores perferendis! Ex rem, alias id doloribus impedit dignissimos voluptatibus suscipit natus corporis quis.
          </p>

          <ul>
            {
              Object.keys(contestsMap).map(clubName => (
                <li key={clubName}>
                  <Link to={{ hash: `${clubName}-contests` }}>
                    { capitalCase(clubName) }
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </Container>

      {
        Object.keys(contestsMap).map(clubName => (
          <ClubContest
            key={clubName}
            clubName={clubName}
            contests={contestsMap[clubName]}
          />
        ))
      }
    </>
  )
}

export default Contests

const PaginateButton = memo(({ children, onClick }) => (
  <button type="button" className="block p-1 w-10 h-10 text-gray-200 focus:text-amber-600 border border-amber-600 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-amber-600 focus:ring-amber-600 transition-colors relative" onClick={onClick}>
    { children }
  </button>
))

const cardGap = { base: 16, sm: 20, xl: 28 }

/** Display contests of a particular club */
const ClubContest = memo(({ clubName, contests }) => {
  return (
    <Container
      as="section"
      className="flex-grow py-4 w-full"
      id={`${clubName}-contests`}
    >
      <h2 className="mb-6 text-4xl font-semibold">{ capitalCase(clubName) }</h2>

      <CardsSlider.Wrapper
        length={contests.length}
        exposeWidth={{ base: 44, sm: 140 }}
        visibleCount={{ base: 1, sm: 3 }}
      >
        {
          ({ scrollToStart, scrollToEnd, prev, next, start, end, visible }) => (
            <>
              <CardsSlider className='w-full h-96' gap={cardGap}>
                {
                  ({ cardWidth }) => contests.map(contest => (
                    <ContestCard key={contest.slug} clubName={clubName} cardWidth={cardWidth} contest={contest} />
                  ))
                }
              </CardsSlider>

              {
                contests.length > visible && (
                  <div className='mx-auto mt-6 w-max flex items-center gap-4'>
                    <PaginateButton onClick={scrollToStart}>
                      <Icon icon={doubleLeftIcon} className="block" color="inherit" width='100%' height='100%' />
                    </PaginateButton>
                    <PaginateButton onClick={prev}>
                      <Icon icon={leftIcon} className="block" color="inherit" width='100%' height='100%' />
                    </PaginateButton>

                    {/* Specify a width to prevent shifts in width during scroll */}
                    <p className="w-[5ch] sm:w-[8ch] text-center">
                      <span>{start + 1}{''}</span>
                      <span className="hidden sm:inline">{'-'}{end + 1}</span>
                      <span>{'/'}{contests.length}</span>
                    </p>

                    <PaginateButton onClick={next}>
                      <Icon icon={rightIcon} className="block" color="inherit" width='100%' height='100%' />
                    </PaginateButton>
                    <PaginateButton onClick={scrollToEnd}>
                      <Icon icon={doubleRightIcon} className="block" color="inherit" width='100%' height='100%' />
                    </PaginateButton>
                  </div>
                )
              }
            </>
          )
        }
      </CardsSlider.Wrapper>
    </Container>
  )
})

const ContestCard = memo(({ clubName, cardWidth, contest }) => (
  <div className="flex-shrink-0 snap-center" style={{ width: `${cardWidth}px` }}>
    <Link to={`/contests/${clubName}/${contest.slug}`}>
      <Sheet className="w-full h-full !bg-amber-900/60 text-sm overflow-hidden">
        <div className="w-full h-48 flex items-center justify-center relative">
          <img src={CastleGate2} alt='' className='w-full h-full object-cover' />
          <span
            role="presentation"
            className='absolute w-full h-full bg-gradient-to-bl from-brown via-transparent mix-blend-darken'
            aria-hidden={true}
          />

          <div className="absolute top-3 right-3 z-20 flex gap-2">
            {
              contest.type.map(type => (
                <ContestTypeBadge small type={type} />
              ))
            }
          </div>
        </div>
        <div className='p-4'>
          <h3 className="text-lg text-amber-500 font-semibold">{ contest.name }</h3>

          { contest.subtitle && <p className="text-sm text-gray-400">{ contest.subtitle }</p> }

          <div className={classNames(
            "mt-2 text-sm text-gray-300 space-y-1",
            contest.subtitle ? 'line-clamp-3' : 'line-clamp-4'
          )}>
            {
              contest.description.map((para, i) => (
                <p key={i}>{para.p}</p>
              ))
            }
          </div>
        </div>
      </Sheet>
    </Link>
  </div>
))
