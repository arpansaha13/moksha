export type Club = 'fine-arts' | 'malhar' | 'dzire' | 'nlc' | 'pixels' | 'aaveg'

export interface SelectMenuItem<SlugType extends string = string> {
  readonly name: string
  readonly slug: SlugType
}

export interface User {
  name: string
  user_id: string
  institution: string
  email: string
  phone_no: number
}

export interface Team {
  team_id: string
  team_name: string
  member_count: number
  leader: User
}
