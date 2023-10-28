import type { Image, ProseElement } from './common'

export interface Event {
  id: number
  slug: string
  name: string
  /** club slug */
  club: string
  subtitle?: string
  image: Image
  description: ProseElement[]
  instructions?: ProseElement[]
}
