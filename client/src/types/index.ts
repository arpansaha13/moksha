export type HTMLElementTagNames = keyof HTMLElementTagNameMap

export interface User {
  avatar_idx: number
  name: string
  user_id: string
  username: string
  email: string
  institution: string
  phone_no: number
}

// # Contest and Event types

export type ClubSlug = 'fine-arts' | 'malhar' | 'dzire' | 'aaveg' | 'nlc' | 'collabs'

type Heading = Record<'heading', string>
type UnorderedList = Record<'ul', string[]>

type Para = {
  p: string
  bold?: boolean
}

export type ProseElement = Heading | Para | UnorderedList

interface ImageSource {
  srcSet: string
  media?: string
  type?: string
}

export interface Image {
  sources?: ImageSource[]
  src: string
}

// # EVENT

export interface Event {
  id: number
  slug: string
  name: string
  club: string
  image: Image
  description: ProseElement[]
  instructions?: ProseElement[]
}

// # CONTEST

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
