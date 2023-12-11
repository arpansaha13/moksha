import type { ClubSlug, Image, ProseElement } from './common'

type SoloContestBadge = 'solo' | 'open'
type TeamContestBadge = 'solo' | 'team' | 'duo' | 'duet' | 'squad' | 'open'

export type ContestBadge = SoloContestBadge | TeamContestBadge

interface TeamSizeRange {
  min: number
  max: number | null
}

type AllowedTeamSize = number | TeamSizeRange

interface BaseContest {
  id: number
  slug: string
  name: string
  club?: ClubSlug
  subtitle?: string
  image: Image
  deadline: Date
  description: ProseElement[]
  instructions?: ProseElement[]
}

export interface SoloContest extends BaseContest {
  type: 'solo'
  badges: SoloContestBadge[]
}

export interface TeamContest extends BaseContest {
  type: 'team'
  badges: TeamContestBadge[]
  allowedTeamSize: AllowedTeamSize
}

export type Contest = SoloContest | TeamContest
