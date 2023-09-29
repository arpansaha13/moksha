import { isNullOrUndefined } from '@arpansaha13/utils'
import mokshaContests from '../data/contests/moksha'

type ClubName = 'fine-arts' | 'malhar' | 'dzire' | 'pixel'

export function getMokshaContest(clubName: string, contestSlug: string) {
  if (isNullOrUndefined(mokshaContests[clubName as ClubName])) return null

  const contest = mokshaContests[clubName as ClubName].find(contest => contest.slug === contestSlug)

  return contest ?? null
}
