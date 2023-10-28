import type { Team, TeamContest, User } from '~/types'

export interface TeamRegisterProps {
  contest: TeamContest
  team: Team
  members: User[]
  alreadyRegisteredMemberIds: Set<string>
  setRegistration: React.Dispatch<React.SetStateAction<any>> // FIXME: fix types
}
