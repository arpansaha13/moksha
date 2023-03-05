/* eslint-disable jsx-a11y/alt-text */
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { capitalCase } from 'change-case'
import Container from '../../components/common/Container'
import Sheet from '../../components/common/Sheet'
import CardsSlider from "../../components/common/CardsSlider"
import { useHashLink } from '../../hooks/useHashLink'
import { Icon } from '@iconify/react'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import rightIcon from '@iconify-icons/mdi/chevron-right'
import doubleLeftIcon from '@iconify-icons/mdi/chevron-double-left'
import doubleRightIcon from '@iconify-icons/mdi/chevron-double-right'
import contestsMap from '../../data/contests'
import CastleGate2 from '../../assets/castle-gate-2.svg' // Reference image for now

function Contests() {
  useHashLink()

  return (
    <>
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
      className="flex-grow py-4 w-full xl:!max-w-[84rem]"
      id={`${clubName}-contests`}
    >
      <h2 className="mb-6 text-4xl font-semibold">{ capitalCase(clubName) }</h2>

      <CardsSlider.Wrapper
        list={contests}
        exposeWidth={44}
        visibleCount={{ base: 1, sm: 3, xl: 4 }}
      >
        {
          ({ scrollToStart, scrollToEnd, prev, next, start, end, visible, total }) => (
            <>
              <CardsSlider className='w-full h-96' gap={cardGap}>
                {
                  contest => (
                    <Link to={`/contests/${clubName}/${contest.id}`}>
                      <Sheet className="w-full h-full bg-amber-900/60 text-sm overflow-hidden">
                        <div className="w-full h-48 flex items-center justify-center">
                          <img src={CastleGate2} alt='' className='w-full h-full object-cover' aria-hidden={true} />
                        </div>
                        <div className='p-4'>
                          <h3 className="text-lg text-amber-500 font-semibold">{ contest.name }</h3>
                          <p className="mt-2 line-clamp-4 text-sm text-gray-300">
                            {contest.description}
                          </p>
                        </div>
                      </Sheet>
                    </Link>
                  )
                }
              </CardsSlider>

              {
                total > visible && (
                  <div className='mx-auto mt-6 w-max flex items-center gap-4'>
                    <PaginateButton onClick={scrollToStart}>
                      <Icon icon={doubleLeftIcon} className="block" color="inherit" width='100%' height='100%' />
                    </PaginateButton>
                    <PaginateButton onClick={prev}>
                      <Icon icon={leftIcon} className="block" color="inherit" width='100%' height='100%' />
                    </PaginateButton>

                    {/* Specify a width to prevent shifts in width during scroll */}
                    <p className="w-[5ch] sm:w-[8ch] text-center">
                      <span>{start + 1}</span>
                      <span className="hidden sm:inline">{'-'}{end + 1}</span>
                      <span>{'/'}{total}</span>
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
