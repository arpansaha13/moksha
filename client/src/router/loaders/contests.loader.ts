import { getMokshaContest } from '~/utils/getMokshaContest'
import udaanContestsList from '~/data/contests/udaan'
import mokshaContestsMap from '~/data/contests/moksha'
import { isNullOrUndefined } from '@arpansaha13/utils'
import loaderWrapper from './loaderWrapper'

function getUdaanContest(contestSlug: string) {
  const contest = udaanContestsList.find(contest => contest.slug === contestSlug)
  return contest ?? null
}

export const getContest = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: ({ request }) => {
    const pathSegments = new URL(request.url).pathname.split('/')

    if (['register', 'registrations'].includes(pathSegments.at(-1)!)) pathSegments.pop()

    const clubSlug = pathSegments.at(-2)!
    const contestSlug = pathSegments.at(-1)!

    let contest = getMokshaContest(clubSlug, contestSlug)

    if (isNullOrUndefined(contest)) contest = getUdaanContest(contestSlug)

    if (isNullOrUndefined(contest)) throw new Error('Invalid url')

    return contest
  },
})

export const getContests = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: () => {
    return { mokshaContestsMap, udaanContestsList }
  },
})
