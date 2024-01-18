import type { Event } from '~/types'

export const dzire: Event[] = [
  {
    id: 1,
    slug: 'chakra-clash',
    name: 'Chakra Clash',
    club: 'dzire',
    subtitle: 'Dzire',
    image: {
      src: '/images/events/generic-poster.png',
    },
    description: [
      {
        p: "It's a dance event, where we'll be showcasing different forms of dance.",
      },
    ],
  },
  {
    id: 2,
    slug: 'bop-till-you-drop',
    name: 'Bop Till You Drop',
    club: 'dzire',
    subtitle: 'Dzire',
    image: {
      src: '/images/contests/generic-poster.png',
    },
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
