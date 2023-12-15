import type { User } from './user'

export interface Team {
  team_id: string
  team_name: string
  member_count: number
  leader: User
}
