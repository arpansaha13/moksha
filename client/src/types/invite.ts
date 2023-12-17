import type { Team } from './team'
import { User } from './user'

interface Invite {
  id: number
}

export interface TeamPendingInvite extends Invite {
  team: Team['team_id']
  user: User
}

export interface UserReceivedInvite extends Invite {
  team: Team
  user: User['id']
}
