/* eslint-disable jsx-a11y/alt-text */
import { memo } from 'react'
import EventLayout from '../layouts/event'
import Container from '../components/base/Container'
import TzCardsSlider from "../components/TzCardsSlider"
import { Icon } from '@iconify/react'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import rightIcon from '@iconify-icons/mdi/chevron-right'
import doubleLeftIcon from '@iconify-icons/mdi/chevron-double-left'
import doubleRightIcon from '@iconify-icons/mdi/chevron-double-right'

// Fake data for now
const events = [
  ...(() => {
    const array = []
    for (let i = 0; i < 20; i++) {
      array.push({ id: i + 1, value: i + 1 })
    }
    return array
  })(),
]

function Contests() {
  return (
    <section className="flex-grow w-full prose prose-invert max-w-none flex flex-col justify-center" id='events-list'>
      <div className="mx-auto max-w-xs sm:max-w-3xl px-2 sm:px-0 text-center">
        <h2>
          Lorem Ipsum
        </h2>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, corrupti debitis necessitatibus eos pariatur quis expedita laborum cumque hic enim ipsum provident recusandae voluptate excepturi labore dolore, nesciunt incidunt libero.
        </p>
      </div>

      <Container className='w-full'>
        <TzCardsSlider.Wrapper
          list={events}
          exposeWidth={48}
          visibleCount={{ base: 1, sm: 3, xl: 5 }}
        >
          {
            ({ scrollToStart, scrollToEnd, prev, next, start, end, total }) => (
              <>
                <TzCardsSlider className='w-full h-80' gap={{ base: 16, sm: 20, xl: 32 }}>
                  {
                    event => (
                      <div className="not-prose w-full h-full bg-amber-900/60 rounded-md flex items-center justify-center text-5xl">
                        {event.value}
                      </div>
                    )
                  }
                </TzCardsSlider>

                <div className='mx-auto mt-4 w-max flex items-center gap-4'>
                  <PaginateButton onClick={scrollToStart}>
                    <Icon icon={doubleLeftIcon} className="block" color="inherit" width='100%' height='100%' />
                  </PaginateButton>
                  <PaginateButton onClick={prev}>
                    <Icon icon={leftIcon} className="block" color="inherit" width='100%' height='100%' />
                  </PaginateButton>
                  <p>
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
              </>
            )
          }
        </TzCardsSlider.Wrapper>
      </Container>
    </section>
  )
}

Contests.getLayout = (page) => <EventLayout>{page}</EventLayout>
export default Contests

const PaginateButton = memo(({ children, onClick }) => (
  <button type="button" className="block p-1 w-10 h-10 focus:text-amber-600 border border-amber-600 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-offset-amber-600 focus:ring-amber-600 transition-colors relative" onClick={onClick}>
    { children }
  </button>
))
