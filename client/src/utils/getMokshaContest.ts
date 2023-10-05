import { isNullOrUndefined } from '@arpansaha13/utils'
import mokshaContests from '../data/contests/moksha'
import type { ClubSlug } from '~/types'

export function getMokshaContest(clubSlug: string, contestSlug: string) {
  if (isNullOrUndefined(mokshaContests[clubSlug as ClubSlug])) return null

  const contest = mokshaContests[clubSlug as ClubSlug].find(contest => contest.slug === contestSlug)

  return contest ?? null
}
