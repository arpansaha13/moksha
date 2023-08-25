import { isNullOrUndefined } from '@arpansaha13/utils'
import mokshaEventsList from '~/data/events/moksha'
import udaanEventsList from '~/data/events/udaan'

function getMokshaEvent(eventSlug) {
  const event = mokshaEventsList.find(event => event.slug === eventSlug)
  return event ?? null
}

function getUdaanEvent(contestSlug) {
  const event = udaanEventsList.find(contest => contest.slug === contestSlug)
  return event ?? null
}

export function getEvent({ request }) {
  const pathSegments = new URL(request.url).pathname.split('/')
  const eventSlug = pathSegments.at(-1)

  const event = getMokshaEvent(eventSlug)

  return isNullOrUndefined(event) ? getUdaanEvent(eventSlug) : event
}

export function getEvents() {
  return { mokshaEventsList, udaanEventsList }
}
