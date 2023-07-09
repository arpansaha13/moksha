import contestsMap, { getMokshaContest } from '../data/contests/moksha'

export function getContest({ request }) {
  const pathSegments = new URL(request.url).pathname.split('/')

  const clubSlug = pathSegments.at(-2)
  const contestSlug = pathSegments.at(-1)

  return getMokshaContest(clubSlug, contestSlug)
}

export function getContests() {
  return contestsMap
}
