import { isNullOrUndefined } from '@arpansaha13/utils'
import mokshaEventsList from '~/data/events/moksha'
import udaanEventsList from '~/data/events/udaan'
import loaderWrapper from './loaderWrapper'

function getMokshaEvent(eventSlug) {
  const event = mokshaEventsList.find(event => event.slug === eventSlug)
  return event ?? null
}

function getUdaanEvent(contestSlug) {
  const event = udaanEventsList.find(contest => contest.slug === contestSlug)
  return event ?? null
}

export const getEvent = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    const pathSegments = new URL(request.url).pathname.split('/')
    const eventSlug = pathSegments.at(-1)

    const event = getMokshaEvent(eventSlug)

    return isNullOrUndefined(event) ? getUdaanEvent(eventSlug) : event
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
