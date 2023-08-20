import udaanEvents from '../data/events/udaan'

export function getUdaanEvent(contestSlug) {
  const event = udaanEvents.find(contest => contest.slug === contestSlug)

  return event ?? null
}
