export type Club = 'fine-arts' | 'malhar' | 'dzire' | 'nlc' | 'collabs' | 'aaveg' | 'pixels' | 'wecan'

export interface SelectMenuItem<SlugType extends string = string> {
  readonly name: string
  readonly slug: SlugType
}

export interface User {
  id: number
  tag: string
  avatar_idx: number
  first_name: string
  last_name: string
  username: string
  email: string
  institution: string
  phone_no: string
}
export interface Team {
  team_id: string
  team_name: string
  member_count: number
  leader: User
}
