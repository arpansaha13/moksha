import { isNullOrUndefined } from '@arpansaha13/utils'
import mokshaContests from '../data/contests/moksha'

export function getMokshaContest(clubName, contestSlug) {
  if (isNullOrUndefined(mokshaContests[clubName])) return null

  const contest = mokshaContests[clubName].find(contest => contest.slug === contestSlug)

  return isNullOrUndefined(contest) ? null : contest
}
