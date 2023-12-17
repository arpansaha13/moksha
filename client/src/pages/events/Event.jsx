import { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import { defineCustomElement } from '@tranzis/core/dist/components/tz-3d-card'
import { isNullOrUndefined } from '@arpansaha13/utils'
import SocialShare from '~/components/SocialShare'
import Container from '~common/Container'
import Sheet from '~/components/common/Sheet'
import { getEvent } from '~loaders/events.loader'

defineCustomElement()

export const loader = getEvent

export function Component() {
  const event = useLoaderData()
  const location = useLocation()

  const shareData = useMemo(
    () => ({
      url: location.pathname,
      title: `Moksha event - ${event.name}`,
      text: event.description[0].p,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  )

  return (
    <Container as='section' className='py-4' id={`event-${event}`}>
      <Helmet>
        <title>Moksha | Events</title>
      </Helmet>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 h-full'>
        <div className='lg:col-span-3 h-full'>
          <div className='mb-6 flex items-center justify-between'>
            <h1 className='text-4xl font-bold'>{event.name}</h1>

            <SocialShare data={shareData} className='group flex items-center lg:gap-1'>
              <div className='w-6 h-6 text-amber-700 group-hover:text-amber-600 transition-colors'>
                <Icon
                  icon={shareIcon}
                  className='block'
                  color='inherit'
                  width='100%'
                  height='100%'
                  aria-hidden='true'
                />
              </div>
              <p className='sr-only lg:not-sr-only text-sm font-medium text-amber-600 group-hover:text-amber-500 transition-colors'>
                Share
              </p>
            </SocialShare>
          </div>

          <Link
            to='/events'
            className='w-max mb-6 flex items-center font-medium text-sm lg:text-base text-amber-600 hover:text-amber-500'
          >
            <Icon icon={leftIcon} className='inline-block' color='inherit' width='1.5rem' height='1.5rem' />
            <span>Go to events</span>
          </Link>

          <EventInfo event={event} />
        </div>

        <div className='lg:col-span-2 order-first lg:order-2'>
          <div className='sm:sticky sm:top-8'>
            <div className='mx-auto w-64 h-64 sm:w-80 sm:h-80'>
              <tz-3d-card src={event.image.src} alt={`moksha-event-${event}-poster`} rotation='-30' elevation='120' />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

Component.displayName = 'Event'

function EventInfo({ event }) {
  return (
    <>
      <Sheet className='p-4 sm:p-6'>
        <article className='markdown'>
          {event.description.map((proseElement, i) => (
            <ProseElement key={i} proseElement={proseElement} />
          ))}
        </article>
      </Sheet>

      {event.instructions && (
        <Sheet className='mt-4 sm:mt-6 p-4 sm:p-6'>
          <article className='markdown'>
            <h2>Instructions</h2>

            {event.instructions.map((proseElement, i) => (
              <ProseElement key={i} proseElement={proseElement} />
            ))}
          </article>
        </Sheet>
      )}
    </>
  )
}

const ProseElement = ({ proseElement }) => {
  if (!isNullOrUndefined(proseElement.heading)) return <h3>{proseElement.heading}</h3>

  if (!isNullOrUndefined(proseElement.p))
    return <p className={proseElement.bold ? 'font-semibold' : ''}>{proseElement.p}</p>

  if (!isNullOrUndefined(proseElement.ul))
    return (
      <ul>
        {proseElement.ul.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>
    )
}
