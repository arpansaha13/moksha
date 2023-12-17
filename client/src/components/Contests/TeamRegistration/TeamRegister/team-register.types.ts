import type { Team, TeamContest, User } from '~/types'

export interface TeamRegisterProps {
  contest: TeamContest
  team: Team
  members: User[]
  alreadyRegisteredMemberIds: Set<User['id']>
  setRegistration: React.Dispatch<React.SetStateAction<any>> // FIXME: fix types
}
