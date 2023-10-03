import type { Contest } from '~/types'

export const dzire: Contest[] = [
  {
    id: 10,
    slug: 'shinigami-showdown',
    name: 'Shinigami Showdown',
    subtitle: 'Solo dance competition',
    type: ['solo'],
    image: {
      src: '/images/contests/fine-arts/magic-of-fingers/poster-1164x1164.jpeg',
    },
    description: [
      { p: 'It is a solo dance competition, any form of dance can be performed.' },
      { ul: ['Prelims will be online.', 'Finals will be offline.', 'Venue will be updated later on.'] },
    ],
    instructions: [
      { heading: 'Rules for prelims and finals.' },
      {
        ul: [
          "Song shouldn't exceed 3 mins, from playing on to off. After 15 secs points shall be deducted , on crossing 30 secs further participant shall be disqualified.",
          'The choice of costume and song must be decent. Use of vulgarity is strictly prohibited and subjected to disqualification.',
          "The act shouldn't promote any sort of violence or cruelty. Use of props such as fire or any sharp objects is prohibited.",
        ],
      },
    ],
  },
  {
    id: 11,
    slug: 'dragon-ballroom',
    name: 'Dragon Ballroom',
    subtitle: 'Duet competition',
    type: ['duet'],
    image: {
      src: '/images/contests/fine-arts/magic-of-fingers/poster-1164x1164.jpeg',
    },
    allowedTeamSize: 2,
    description: [
      {
        p: 'It is a duet dance competition, any form of dance can be performed, duet can be either of same sex or different sex.',
      },
    ],
    instructions: [
      { heading: 'Rules for prelims and finals.' },
      {
        ul: [
          "Song shouldn't exceed 3 mins, from playing on to off. After 15 secs points shall be deducted , on crossing 30 secs further participant shall be disqualified.",
          'The choice of costume and song must be decent. Use of vulgarity is strictly prohibited and subjected to disqualification.',
          "The act shouldn't promote any sort of violence or cruelty. Use of props such as fire or any sharp objects is prohibited.",
          'Two must have equal roles in the act.',
        ],
      },
    ],
  },
  {
    id: 12,
    slug: 'hunter-x-hunter-hoedown',
    name: 'Hunter x Hunter Hoedown',
    subtitle: 'Group competition',
    type: ['team'],
    image: {
      src: '/images/contests/fine-arts/magic-of-fingers/poster-1164x1164.jpeg',
    },
    allowedTeamSize: { min: 4, max: 15 },
    description: [{ p: 'It is a group dance competition where  any form of dance can be performed.' }],
    instructions: [
      { heading: 'Rules for prelims and finals.' },
      {
        ul: [
          "Song shouldn't exceed 3 mins, from playing on to off. After 15 secs points shall be deducted, on crossing 30 secs further participant shall be disqualified.",
          'The choice of costume and song must be decent. Use of vulgarity is strictly prohibited and subjected to disqualification.',
          "The act shouldn't promote any sort of violence or cruelty. Use of props such as fire or any sharp objects is prohibited.",
          'Min no of participants are 4 and max no of participants are 15.',
          'Participants should arrange their own costumes and props.',
          'Prelims will be before Moksha and Finals will take place during Moksha.',
        ],
      },
    ],
  },
]
