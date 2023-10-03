import type { Contest } from '~/types'

// This is old data

export const pixel: Contest[] = [
  {
    id: 14,
    slug: 'snap-quest',
    name: 'Snap Quest',
    subtitle: 'Treasure Hunt',
    image: {
      src: '/images/contests/fine-arts/magic-of-fingers/poster-1164x1164.jpeg',
    },
    type: ['team'],
    allowedTeamSize: 4, // needs verification
    description: [
      {
        p: 'Teams must solve the puzzles in order to find the next clue. Teams must take a selfie with the said thing in the puzzle.',
      },
    ],
    instructions: [
      { heading: 'Puzzle Stations' },
      {
        p: 'The college campus is divided into several zones, each containing a puzzle station. At each station, teams solve a puzzle to unveil a clue that hints at the location of an item on campus.',
      },
      { heading: 'Clue Solving' },
      {
        p: 'Teams decipher the puzzles to reveal clues. Puzzles can involve riddles, anagrams, wordplay, or visual challenges. Successfully solving a puzzle leads the team to the next station.',
      },
      { heading: 'Selfie Challenge' },
      {
        p: "Upon reaching a station, teams must locate the specific item hinted at in the previous puzzle's clue. Teams creatively stage a selfie with the item that aligns with the theme or hint provided. Selfies should be fun, imaginative, and showcase the team's creativity.",
      },
      { heading: 'Submission and Validation' },
      {
        p: "Teams submit their selfie via a designated event app or platform. A panel of judges reviews the submitted selfies to ensure they meet the challenge's criteria.",
      },
    ],
  },
]
