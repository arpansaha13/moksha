import { Contest } from '~/types'
import getDateFromIST from '~/utils/getDateFromIST'

export const wecan: Contest[] = [
  {
    id: 25,
    type: 'team',
    slug: 'dumb-charades',
    name: 'Dumb Charades',
    badges: ['team'],
    allowedTeamSize: { min: 3, max: 4 },
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'Have you ever heard of a person who never watches any movies or TV shows ? Now What are you thinking about !? About the person or the movies!',
      },
      {
        p: 'Besides being out in the fresh air. One theory says all the jeers, taunts, calls, rhymes and teasing that go on actually brings in joy and fun.',
      },
      {
        p: 'Dumb Charades involves explaining the phrases or the name of the movie, a TV show, etc. through acting. A person is not allowed to talk and is required to act out the name by using different gestures, facial expressions, and body language.',
      },
      {
        p: 'Dates and venue will be announced later.',
      },
    ],
  },
  {
    id: 26,
    type: 'team',
    slug: 'nita-got-talent',
    name: 'NIT-A’s Got talent',
    badges: ['solo', 'team'],
    allowedTeamSize: { min: 3, max: null },
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'It is your stage. A set up where a person or group of people can showcase their unusual talents—dancing, singing, acting, comedy, etc.—to the judge and audience in the hopes of winning a sizable reward. Indeed, there is a golden buzzer!',
      },
    ],
  },
]
