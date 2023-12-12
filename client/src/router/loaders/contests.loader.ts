import type { LoaderFunctionArgs } from 'react-router-dom'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { getMokshaContest } from '~/utils/getMokshaContest'
import { getUdaanContest } from '~/utils/getUdaanContest'
import fetchWithCredentials from '~/utils/fetchWithCredentials'
import udaanContestsList from '~/data/contests/udaan'
import mokshaContestsMap from '~/data/contests/moksha'
import loaderWrapper from './loaderWrapper'

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

    // FIXME: return if solo contest

    const team = await fetchCreatedTeam()
    if (isNullOrUndefined(team)) return {}

    const registration = await fetchRegistration(team.team_id, contest.id)
    let teamMembers
    let alreadyRegisteredMemberIds

    if (isNullOrUndefined(registration)) {
      const res = await Promise.all([
        fetchTeamMembers(team.team_id),
        fetchAlreadyRegisteredMembers(team.team_id, contest.id),
      ])
      teamMembers = res[0].data
      alreadyRegisteredMemberIds = new Set(res[1].data)
    }

    return { contest, createdTeam: team, registration, teamMembers, alreadyRegisteredMemberIds }
  },
})

export const registrationsPanelLoader = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    const contest = getContest(request.url)

    const res = await Promise.all([fetchAuthUserReg(contest.id), fetchCreatedTeamReg(contest.id)])

    const registration = res[0]
    const hasCreatedTeam = res[1].hasCreatedTeam

    if (!res[1].hasCreatedTeam) return { contest, registration, hasCreatedTeam }

    const createdTeamReg = res[1].data
    const fromCreatedTeam =
      !isNullOrUndefined(registration) && !isNullOrUndefined(createdTeamReg) && registration.id === createdTeamReg.id

    return { contest, registration, hasCreatedTeam, createdTeamReg, fromCreatedTeam }
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

  const clubSlug = pathSegments.at(-2)!
  const contestSlug = pathSegments.at(-1)!

  return { clubSlug, contestSlug }
}

async function fetchCreatedTeam() {
  return fetchWithCredentials('users/me/created-team').then((r: any) => r.data)
}

async function fetchRegistration(teamId: string, contestId: number) {
  const params = new URLSearchParams({
    team_id: teamId,
    contest_id: contestId.toString(),
  })

  return fetchWithCredentials(`contests/team/registration?${params.toString()}`).then((r: any) => r.data)
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
  return res.data?.team_contest_registration
}

async function fetchCreatedTeamReg(contestId: number) {
  const { data: team } = await fetchWithCredentials('users/me/created-team')

  if (isNullOrUndefined(team)) return { hasCreatedTeam: false, data: null }

  const params = new URLSearchParams({ contest_id: contestId.toString() }).toString()
  const res = await fetchWithCredentials(`teams/${team.team_id}/registered-contests?${params}`)
  return { hasCreatedTeam: true, data: res.data }
}
