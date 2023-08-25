import { getMokshaContest } from '~/utils/getMokshaContest'
import udaanContestsList from '~/data/contests/udaan'
import mokshaContestsMap from '~/data/contests/moksha-desc'
import { isNullOrUndefined } from '@arpansaha13/utils'

function getUdaanContest(contestSlug) {
  const contest = udaanContestsList.find(contest => contest.slug === contestSlug)
  return contest ?? null
}

export function getContest({ request }) {
  const pathSegments = new URL(request.url).pathname.split('/')
  const clubSlug = pathSegments.at(-2)
  const contestSlug = pathSegments.at(-1)

  const contest = getMokshaContest(clubSlug, contestSlug)

  return isNullOrUndefined(contest) ? getUdaanContest(contestSlug) : contest
}

export function getContests() {
  return { mokshaContestsMap, udaanContestsList }
}
