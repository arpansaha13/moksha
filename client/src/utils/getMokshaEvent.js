import mokshaEvents from '../data/events/moksha'

export function getMokshaEvent(eventSlug) {
  const event = mokshaEvents.find(event => event.slug === eventSlug)

  return event ?? null
}
