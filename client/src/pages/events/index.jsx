import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData } from 'react-router-dom'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import rightIcon from '@iconify-icons/mdi/chevron-right'
import { capitalCase } from 'change-case'
import SocialShare from '~/components/SocialShare'
import Sheet from '~common/Sheet'
import Container from '~common/Container'
import MLink from '~common/Links/MLink'
import DLink from '~common/Links/DLink'
import Picture from '~/components/pictures/Picture'
import StayTunedBanner from '~/components/StayTunedBanner'
import { getEvents } from '~loaders/events.loader'

export const loader = getEvents

export function Component() {
  const { mokshaEventsList, udaanEventsList } = useLoaderData()

  return (
    <>
      <Helmet>
        <title>Moksha | Events</title>
      </Helmet>

      <Container>
        <h1 className='sr-only'>Events</h1>

        <UdaanEvents udaanEventsList={udaanEventsList} />
        <MokshaEvents mokshaEventsList={mokshaEventsList} />
      </Container>
    </>
  )
}

Component.displayName = 'Events'

const UdaanEvents = memo(
  ({ udaanEventsList }) => (
    <section className='mb-12' id='udaan-events'>
      <h2 className='mb-6 text-4xl text-center font-semibold border-b-2 border-amber-900/70'>Udaan</h2>

      <div className='h-scroll sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {udaanEventsList.map(event => (
          <div key={event.id} className='min-w-[16rem]'>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </section>
  ),
  () => true
)

const MokshaEvents = memo(
  () => (
    <section id='moksha-events'>
      <h2 className='mb-6 text-4xl text-center font-semibold border-b-2 border-amber-900/70'>Moksha</h2>

      <StayTunedBanner />

      {/* <div className='h-scroll sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {mokshaEventsList.map(event => (
          <div key={event.id} className='min-w-[16rem]'>
            <EventCard event={event} />
          </div>
        ))}
      </div> */}
    </section>
  ),
  () => true
)

const EventCard = memo(
  ({ event }) => (
    <Sheet className='w-full flex flex-col !bg-amber-900/60 text-sm overflow-hidden'>
      <MLink to={`/events/${event.club}/${event.slug}`} as='div' className='block h-[304px]'>
        <div className='w-full h-48 flex items-center justify-center relative'>
          <Picture picture={event.image} alt={`moksha-event-${event.slug}-poster`} />
        </div>

        <div className='w-full px-4 pt-4'>
          <h3 className='text-lg text-amber-500 font-semibold'>
            <DLink to={`/events/${event.club}/${event.slug}`} className='lg:hover:underline'>
              {event.name}
            </DLink>
          </h3>

          <p className='text-sm text-gray-400'>{capitalCase(event.club)}</p>

          <div className='mt-2 text-sm text-gray-300 space-y-1 line-clamp-2'>
            {event.description.map((para, i) => (
              <p key={i}>{para.p}</p>
            ))}
          </div>
        </div>
      </MLink>

      <div className='px-4 pt-2 pb-4 w-full flex items-center justify-end lg:justify-between'>
        <Link
          to={`/events/${event.club}/${event.slug}`}
          className='hidden lg:block font-medium text-amber-600 hover:text-amber-500 transition-colors'
        >
          <span>View event</span>
          <span className='inline-block w-5 h-5'>
            <Icon icon={rightIcon} className='inline-block' color='inherit' width='100%' height='100%' />
          </span>
        </Link>

        <SocialShare
          data={{
            url: `/events/${event.club}/${event.slug}`,
            title: `Moksha event - ${event.name}`,
            text:
              event.description[0].p.length <= 100
                ? event.description[0].p.length
                : `${event.description[0].p.substr(0, 100)}...`, // trim to 100 characters
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
  (prev, next) => prev.event.id === next.event.id
)
