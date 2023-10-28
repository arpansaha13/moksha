import type { ClubSlug, Image, ProseElement } from './common'

export type ContestType = 'solo' | 'team' | 'duo' | 'duet' | 'squad' | 'open'

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
  type: ('solo' | 'open')[]
}

export interface TeamContest extends BaseContest {
  type: ContestType[]
  allowedTeamSize: AllowedTeamSize
}

export type Contest = SoloContest | TeamContest
