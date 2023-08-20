import { isNullOrUndefined } from '@arpansaha13/utils'
import { getUdaanEvent } from '~/utils/getUdaanEvent'
import { getMokshaEvent } from '~/utils/getMokshaEvent'
import mokshaEventsList from '~/data/events/moksha-desc'
import udaanEventsList from '~/data/events/udaan-desc'

export function getEvent({ request }) {
  const pathSegments = new URL(request.url).pathname.split('/')

  const eventSlug = pathSegments.at(-1)

  const event = getMokshaEvent(eventSlug)

  return isNullOrUndefined(event) ? getUdaanEvent(eventSlug) : event
}

export function getEvents() {
  return { mokshaEventsList, udaanEventsList }
}
