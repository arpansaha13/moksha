import { getMokshaContest } from '~/utils/getMokshaContest'
import udaanContestsList from '~/data/contests/udaan'
import mokshaContestsMap from '~/data/contests/moksha-desc'
import { isNullOrUndefined } from '@arpansaha13/utils'
import loaderWrapper from './loaderWrapper'

function getUdaanContest(contestSlug) {
  const contest = udaanContestsList.find(contest => contest.slug === contestSlug)
  return contest ?? null
}

export const getContest = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: ({ request }) => {
    const pathSegments = new URL(request.url).pathname.split('/')
    const clubSlug = pathSegments.at(-2)
    const contestSlug = pathSegments.at(-1)

    const contest = getMokshaContest(clubSlug, contestSlug)

    return isNullOrUndefined(contest) ? getUdaanContest(contestSlug) : contest
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
