import { isNullOrUndefined } from '@arpansaha13/utils'
import mokshaEventsList from '~/data/events/moksha'
import udaanEventsList from '~/data/events/udaan'
import loaderWrapper from './loaderWrapper'

function getMokshaEvent(eventSlug: string) {
  const event = mokshaEventsList.find(event => event.slug === eventSlug)
  return event ?? null
}

function getUdaanEvent(eventSlug: string) {
  const event = udaanEventsList.find(event => event.slug === eventSlug)
  return event ?? null
}

export const getEvent = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    const pathSegments = new URL(request.url).pathname.split('/')
    const eventSlug = pathSegments.at(-1)!

    let event = getMokshaEvent(eventSlug)

    if (isNullOrUndefined(event)) {
      event = getUdaanEvent(eventSlug)
    }

    if (isNullOrUndefined(event)) return new Error('Invalid url')

    return event
  },
})

export const getEvents = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: () => {
    return { mokshaEventsList, udaanEventsList }
  },
})
