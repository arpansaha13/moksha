import type { ClubSlug, Image, ProseElement } from './common'

export interface Event {
  id: number
  slug: string
  name: string
  club: ClubSlug
  subtitle?: string
  image: Image
  description: ProseElement[]
  instructions?: ProseElement[]
}
