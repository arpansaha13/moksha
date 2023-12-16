import type { LoaderFunctionArgs } from 'react-router-dom'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useStore } from '~/store'
import { getMokshaContest } from '~/utils/getMokshaContest'
import { getUdaanContest } from '~/utils/getUdaanContest'
import fetchWithCredentials from '~/utils/fetchWithCredentials'
import udaanContestsList from '~/data/contests/udaan'
import mokshaContestsMap from '~/data/contests/moksha'
import loaderWrapper from './loaderWrapper'
import { ClubSlug } from '~/types'

export const getContestInLayout = loaderWrapper({
  meta: {
    type: 'layout',
  },
  fn: ({ request }) => {
    return getContest(request.url)
  },
})

export const getContestInPage = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: ({ request }) => {
    return getContest(request.url)
  },
})

export const registerPanelLoader = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    const contest = getContest(request.url)
    const authState = useStore.getState().authState

    // For solo contest
    if (contest.type === 'solo') {
      if (!authState.authenticated) return { type: 'solo', contest }

      const params = new URLSearchParams({ contest_id: contest.id.toString() })
      const soloRegistration = await fetchWithCredentials(`contests/solo/registration?${params.toString()}`)

      return {
        type: 'solo',
        contest,
        registrationId: soloRegistration?.id,
      }
    }

    // For team contest
    if (!authState.authenticated) return { type: 'team', contest }

    const createdTeam = await fetchCreatedTeam()
    if (isNullOrUndefined(createdTeam)) return { type: 'team', contest }

    const registration = await fetchRegistration(createdTeam.team_id, contest.id)
    let teamMembers
    let alreadyRegisteredMemberIds

    if (isNullOrUndefined(registration)) {
      const res = await Promise.all([
        fetchTeamMembers(createdTeam.team_id),
        fetchAlreadyRegisteredMembers(createdTeam.team_id, contest.id),
      ])
      teamMembers = res[0]
      alreadyRegisteredMemberIds = new Set(res[1])
    }

    return { type: 'team', contest, createdTeam, registration, teamMembers, alreadyRegisteredMemberIds }
  },
})

export const registrationsPanelLoader = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    const contest = getContest(request.url)

    const res = await Promise.all([fetchAuthUserReg(contest.id), fetchCreatedTeamReg(contest.id)])

    const authUserReg = res[0]
    const hasCreatedTeam = res[1].hasCreatedTeam

    if (!hasCreatedTeam) return { contest, authUserReg, hasCreatedTeam }

    const createdTeamReg = res[1].createdTeamReg
    const fromCreatedTeam =
      !isNullOrUndefined(authUserReg) && !isNullOrUndefined(createdTeamReg) && authUserReg.id === createdTeamReg.id

    return { contest, authUserReg, hasCreatedTeam, createdTeamReg, fromCreatedTeam }
  },
})

export const getContests = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: () => ({ mokshaContestsMap, udaanContestsList }),
})

function getContest(url: LoaderFunctionArgs['request']['url']) {
  const { clubSlug, contestSlug } = getClubAndContestSlugs(url)

  let contest = getMokshaContest(clubSlug, contestSlug)
  if (isNullOrUndefined(contest)) contest = getUdaanContest(contestSlug)
  if (isNullOrUndefined(contest)) throw new Error('Invalid url')

  return contest
}

function getClubAndContestSlugs(url: LoaderFunctionArgs['request']['url']) {
  const pathSegments = new URL(url).pathname.split('/')

  if (['register', 'registrations'].includes(pathSegments.at(-1)!)) pathSegments.pop()

  const clubSlug = pathSegments.at(-2) as ClubSlug
  const contestSlug = pathSegments.at(-1)!

  return { clubSlug, contestSlug }
}

async function fetchCreatedTeam() {
  return fetchWithCredentials('users/me/created-team')
}

async function fetchRegistration(teamId: string, contestId: number) {
  const params = new URLSearchParams({
    team_id: teamId,
    contest_id: contestId.toString(),
  })

  return fetchWithCredentials(`contests/team/registration?${params.toString()}`)
}

async function fetchTeamMembers(teamId: string) {
  return fetchWithCredentials(`teams/${teamId}/members`)
}

async function fetchAlreadyRegisteredMembers(teamId: string, contestId: number) {
  return fetchWithCredentials(`teams/${teamId}/members/${contestId}`)
}

async function fetchAuthUserReg(contestId: number) {
  const params = new URLSearchParams({ contest_id: contestId.toString() }).toString()
  const res = await fetchWithCredentials(`users/me/registered-team-contests?${params}`)
  return res?.team_contest_registration
}

async function fetchCreatedTeamReg(contestId: number) {
  const team = await fetchWithCredentials('users/me/created-team')

  if (isNullOrUndefined(team)) return { hasCreatedTeam: false }

  const params = new URLSearchParams({ contest_id: contestId.toString() }).toString()
  const createdTeamReg = await fetchWithCredentials(`teams/${team.team_id}/registered-contests?${params}`)
  return { hasCreatedTeam: true, createdTeamReg }
}
