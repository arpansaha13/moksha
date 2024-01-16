import type { Club, SelectMenuItem } from '~/types'

type ContestTypeSlug = 'solo' | 'team'

export const contestTypes: SelectMenuItem<ContestTypeSlug>[] = [
  { name: 'Solo', slug: 'solo' },
  { name: 'Duo or Team', slug: 'team' },
]

export const clubs: SelectMenuItem<Club>[] = [
  { name: 'NLC', slug: 'nlc' },
  { name: 'Malhar', slug: 'malhar' },
  { name: 'Dzire', slug: 'dzire' },
  { name: 'Aaveg', slug: 'aaveg' },
  { name: 'Fine Arts', slug: 'fine-arts' },
  { name: 'Collab', slug: 'collab' },
]

export const contests = Object.freeze<Record<Club, Record<ContestTypeSlug, SelectMenuItem[]>>>({
  nlc: {
    solo: [
      { name: 'Open mic', slug: 'open-mic' },
      { name: 'Plot twist', slug: 'plot-twist' },
    ],
    team: [
      { name: 'Oxford union debate', slug: 'oxford-union-debate' },
      { name: 'Treasure hunt', slug: 'treasure-hunt' },
    ],
  },
  malhar: {
    solo: [
      { name: 'Moksha maestro', slug: 'moksha-maestro' },
      { name: 'Harmony hunt', slug: 'harmony-hunt' },
      { name: 'Beatnik', slug: 'beatnik' },
    ],
    team: [
      { name: 'Melody mania', slug: 'melody-mania' },
      { name: 'Folklore fiesta', slug: 'folklore-fiesta' },
      { name: 'Muzic Madness', slug: 'muzic-madness' },
    ],
  },
  dzire: {
    solo: [{ name: 'Shinigami showdown', slug: 'shinigami-showdown' }],
    team: [
      { name: 'Dragon Ballroom', slug: 'dragon-ballroom' },
      { name: 'Hunter × Hunter Showdown', slug: 'hunter-x-hunter-showdown' },
    ],
  },
  aaveg: {
    solo: [{ name: 'Parichay', slug: 'parichay' }],
    team: [{ name: 'Hallabol', slug: 'hallabol' }],
  },
  'fine-arts': {
    solo: [
      { name: 'Kalakriti', slug: 'kalakriti' },
      { name: 'Comiquest', slug: 'comiquest' },
    ],
    team: [],
  },
  collab: {
    solo: [
      { name: 'Kaun banega comedian', slug: 'kbc' },
      { name: 'Cosmania', slug: 'cosmania' },
    ],
    team: [],
  },
})
