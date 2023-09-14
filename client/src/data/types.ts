// Contest and Event types

type Heading = Record<'heading', string>
type UnorderedList = Record<'ul', string[]>

interface Para {
  p: string
  bold?: boolean
}

interface ImageSource {
  srcSet: string
  media?: string
  type?: string
}

export interface Event {
  id: number
  slug: string
  name: string
  club: string
  image: {
    sources?: ImageSource[]
    src: string
  }
  description: (Heading | Para | UnorderedList)[]
  instructions?: (Heading | Para | UnorderedList)[]
}

type ContestType = 'solo' | 'team' | 'duo' | 'duet' | 'squad' | 'open'

interface TeamSizeRange {
  min: number
  max: number | null
}

type AllowedTeamSize = number | TeamSizeRange

interface BaseContest {
  id: number
  slug: string
  name: string
  subtitle?: string
  image: {
    sources?: ImageSource[]
    src: string
  }
  description: (Heading | Para | UnorderedList)[]
  instructions?: (Heading | Para | UnorderedList)[]
}

interface SoloContest extends BaseContest {
  type: ['solo'] | ['open']
}

interface TeamContest extends BaseContest {
  type: ContestType[]
  allowedTeamSize: AllowedTeamSize
}

export type Contest = SoloContest | TeamContest
