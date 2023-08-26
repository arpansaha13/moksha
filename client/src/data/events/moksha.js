const dzire = [
  {
    id: 5,
    slug: 'chakra-clash',
    name: 'Chakra Clash',
    club: 'dzire',
    image: {
      src: '/images/contests/malhar/solo_singing/poster-1-1024x1024.jfif',
    },
    description: [
      {
        p: "It's a dance event, where we'll be showcasing different forms of dance.",
      },
    ],
  },
]

const pixel = [
  {
    id: 6,
    slug: 'let-me-shoot-you',
    name: 'Let Me Shoot You',
    club: 'pixel',
    image: {
      src: '/images/contests/malhar/solo_singing/poster-1-1024x1024.jfif',
    },
    description: [
      {
        p: '',
      },
    ],
  },
]

const fineArts = [
  {
    id: 7,
    slug: 'art-exhibition',
    name: 'Art exhibition',
    club: 'fine-arts',
    image: {
      src: '/images/contests/fine-arts/magic-of-fingers/poster-1164x1164.jpeg',
    },
    description: [
      {
        p: 'An art exhibition is traditionally the space in which art objects (in the most general sense) meet an audience. The exhibit is universally understood to be for some temporary period unless, as is rarely true, it they may be called "exhibit", "exposition" (the French word) or "show".',
      },
    ],
  },
  {
    id: 7,
    slug: 'open-canvas',
    name: 'Open canvas',
    club: 'fine-arts',
    image: {
      src: '/images/contests/fine-arts/magic-of-fingers/poster-1164x1164.jpeg',
    },
    description: [
      {
        p: 'Open Canvas is a Graphic Editor that has an analog-like quality and a simple or easy user interface. It is extensively suitable to beginners to advanced users. Addition to the basic performances, openCanvas has its unique "Event function" that records and replays a drawing procedure.',
      },
    ],
  },
]

const dcc = [
  {
    id: 8,
    slug: 'incredible-roll',
    name: 'Incredible Roll',
    club: 'dcc',
    image: {
      src: '/images/contests/malhar/solo_singing/poster-1-1024x1024.jfif',
    },
    description: [
      {
        p: 'The INCREDIBLE ROLL is a fun-game similar to the usual game of Ludo we play. In this game, 4 people can play at a time individually and no teams are allowed. Each participant will start from position Zero and can move to the next positions by answering simple tech-related or comic-related questions. The number of places a player can move depends on the number of points of the questions asked to each player. The one to reach the finishing point,i.e, the centre of the board first wins.',
      },
    ],
    instructions: [
      { heading: 'Stages & timelines' },
      {
        ul: [
          'Mode: Offline (Onsite)',
          'The game will be open to all on the 1st or 2nd day of Moksha (date) from 11:00 AM onwards',
        ],
      },
      { heading: 'Rules' },
      {
        ul: [
          'Each player will start from position Zero of the game-board . There will be colored boxes for each player position wise. One player can move forward to the next position only by answering the simple short answer question based on technology/comics/Dance/Music/famous personalities.',
          'Partially correct answers might be accepted based on situation',
          'If a player gives the wrong answer he/she will have to go back to the previous position . Incase of no answer, the position remains unchanged.',
          'A player cannot take more than 1-2 minute to answer a question.',
        ],
      },
    ],
  },
]

const mokshaEvents = [...dzire, ...dcc, ...pixel, ...fineArts]

export default mokshaEvents
