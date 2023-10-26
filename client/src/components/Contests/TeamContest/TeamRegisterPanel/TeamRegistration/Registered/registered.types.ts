import { Team } from '~/types'

// FIXME: fix types

export interface RegisteredProps {
  contestId: number
  team: Team
  registration: any
  setRegistration: React.Dispatch<React.SetStateAction<any>>
}
