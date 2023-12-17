import { isNullOrUndefined } from '@arpansaha13/utils'
import mokshaContests from '../data/contests/moksha'
import type { ClubSlug, Contest } from '~/types'

export function getMokshaContest(clubSlug: ClubSlug, contestSlug: string) {
  let contest: Contest | null = null

  if (!isNullOrUndefined(mokshaContests[clubSlug])) {
    contest = mokshaContests[clubSlug]!.find(contest => contest.slug === contestSlug) ?? null
  }

  return contest ?? null
}
