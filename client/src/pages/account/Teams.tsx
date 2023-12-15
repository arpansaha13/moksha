import { Link, useLoaderData } from 'react-router-dom'
import accountMultipleIcon from '@iconify-icons/mdi/account-multiple-remove-outline'
import { classNames, isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import DLink from '~common/Links/DLink'
import EmptyState from '~common/EmptyState'
import MLink from '~common/Links/MLink'
import { memo } from 'react'
import { getAuthUserTeams } from '~loaders/account.loader'

// FIXME: fix types

interface LoaderData {
  createdTeam: any
  joinedTeams: any[]
}

interface CreatedTeamProps {
  team: any
}

interface TeamCardProps {
  team: any
}

export const loader = getAuthUserTeams

export function Component() {
  const { createdTeam, joinedTeams } = useLoaderData() as LoaderData

  return (
    <main
      className={classNames(
        'flex gap-y-8',
        isNullOrUndefined(createdTeam) && joinedTeams.length > 0 ? 'flex-col-reverse' : 'flex-col'
      )}
    >
      <section id='created-team'>
        <h2 className='mb-6 text-xl sm:text-2xl font-bold text-gray-50'>Team created by me</h2>

        <CreatedTeam team={createdTeam} />
      </section>

      {joinedTeams.length > 0 && (
        <section id='joined-teams'>
          <h2 className='mb-6 text-xl sm:text-2xl font-bold text-gray-50'>Teams that I have joined</h2>

          <div className='space-y-6'>
            {joinedTeams.map(({ team }) => (
              <TeamCard key={team.team_id} team={team} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

Component.displayName = 'Teams'

function CreatedTeam({ team }: CreatedTeamProps) {
  if (!isNullOrUndefined(team)) {
    return <TeamCard key={team.team_id} team={team} />
  }

  return (
    <>
      <EmptyState icon={accountMultipleIcon} title='You have not created any team yet' />

      <div className='mt-1 text-center text-sm text-gray-400'>
        <p>
          You can create a team{' '}
          <Link to='/teams/create' className='text-amber-600 hover:text-amber-500 font-medium transition-colors'>
            here
          </Link>
          .
        </p>
      </div>
    </>
  )
}

const TeamCard = memo(
  ({ team }: TeamCardProps) => (
    <MLink as='div' to={`/teams/${team.team_id}`} className='block'>
      <Sheet className='px-6 py-4 overflow-hidden space-y-3'>
        <h3 className='text-lg font-semibold text-amber-500'>
          <DLink to={`/teams/${team.team_id}`} className='lg:hover:underline'>
            {team.team_name}
          </DLink>
        </h3>

        <div className='grid grid-cols-1 2xs:grid-cols-2 gap-3 text-sm'>
          <div>
            <p className='font-semibold text-gray-400'>Leader</p>
            <p className='text-gray-100'>{`${team.leader.first_name} ${team.leader.last_name}`}</p>
          </div>
          <div>
            <p className='font-semibold text-gray-400'>Member count</p>
            <p className='text-gray-100'>{team.member_count}</p>
          </div>
        </div>
      </Sheet>
    </MLink>
  ),
  (prev, next) => prev.team.team_id === next.team.team_id
)
