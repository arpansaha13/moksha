import udaanContestsList from '~/data/contests/udaan'

export function getUdaanContest(contestSlug) {
  const contest = udaanContestsList.find(contest => contest.slug === contestSlug)

  return contest ?? null
}
