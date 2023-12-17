import getDateFromIST from '~/utils/getDateFromIST'
import type { Contest } from '~/types'

export const dzire: Contest[] = [
  {
    id: 10,
    type: 'solo',
    slug: 'shinigami-showdown',
    name: 'Shinigami Showdown',
    subtitle: 'Solo Dance Competition',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
    description: [
      { p: 'It is a solo dance competition on classical and freestyle genres.' },
      { ul: ['Prelims will be online.', 'Finals will be offline.', 'Venue will be updated later on.'] },
    ],
    instructions: [
      { heading: 'Rules for prelims and finals.' },
      {
        ul: [
          "Song shouldn't exceed 3 mins, from playing on to off. After 15 secs points shall be deducted , on crossing 30 secs further participant shall be disqualified.",
          'The choice of costume and song must be decent. Use of vulgarity is strictly prohibited and subjected to disqualification.',
          "The act shouldn't promote any sort of violence or cruelty. Use of props such as fire or any sharp objects is prohibited.",
          'Candidates can register in only one genre for solo dance competition.',
        ],
      },
    ],
  },
  {
    id: 11,
    type: 'team',
    slug: 'dragon-ballroom',
    name: 'Dragon Ballroom',
    subtitle: 'Duet Competition',
    badges: ['duet'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
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
    type: 'team',
    slug: 'hunter-x-hunter-showdown',
    name: 'Hunter x Hunter Showdown',
    subtitle: 'Group Dance Competition',
    badges: ['team'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
    allowedTeamSize: { min: 4, max: 15 },
    description: [{ p: 'It is a group dance competition where  any form of dance can be performed.' }],
    instructions: [
      { heading: 'Rules for prelims and finals.' },
      {
        ul: [
          "Song shouldn't exceed 3:30 mins, from playing on to off. After 15 secs points shall be deducted , on crossing 30 secs further participants shall be disqualified.",
          'The choice of costume and song must be decent. Use of vulgarity is strictly prohibited and subjected to disqualification.',
          "The act shouldn't promote any sort of violence or cruelty. Use of props such as fire or any sharp objects is prohibited.",
          'Min no of participants are 4 and max no of participants are 15.',
          'Participants should arrange their own costumes and props.',
          'Prelims will be before Moksha and Finals will take place during Moksha.',
        ],
      },
    ],
  },

  {
    id: 13,
    type: 'solo',
    slug: 'bop-till-you-drop',
    name: 'Bop Till You Drop',
    subtitle: 'Open Dance Competition',
    badges: ['open'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
    description: [
      { p: "It's a dance competition which is open for all, any form of dance can be performed." },
      {
        p: 'Anybody from the crowd can come up and dance on any song.',
      },
      {
        bold: true,
        p: 'Time Limit: 1 to 2 mins.',
      },
    ],
  },
]
