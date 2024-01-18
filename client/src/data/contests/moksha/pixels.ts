import type { Contest } from '~/types'
import getDateFromIST from '~/utils/getDateFromIST'

export const pixels: Contest[] = [
  {
    id: 23,
    type: 'solo',
    slug: 'shoot-your-shot',
    name: 'Shoot Your Shot',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        bold: true,
        p: 'Capture the Spirit of Moksha!',
      },
      {
        p: 'Calling all shutterbugs! Unleash your photographic vision and capture the essence of Moksha Fest 2024 in this thrilling contest.',
      },
      {
        bold: true,
        p: 'Summary',
      },
      {
        p: 'The lens opens on 2nd February 2024 and closes on 4th February 2024, capturing any of the magical moments from the three days of Moksha. The final date of submission is 5th February 2024 by 12 Noon.',
      },
      {
        bold: true,
        p: 'Theme',
      },
      {
        p: `"Unleashing Moksha" - We're searching for photos that resonate Moksha, and provides us with the best cumulative experience of the 3 days of NIT Agartala’s Socio-Cultural Fest.`,
      },
      {
        bold: true,
        p: 'Eligibility',
      },
      {
        ul: [
          'Open to all photographic enthusiasts, but must be attending Moksha.',
          'Each participant can submit a maximum of 5 entries for this contest.',
        ],
      },
    ],
    instructions: [
      { heading: 'Important Dates' },
      {
        ul: [
          'Submission between 2nd and 5th February 2024.',
          'Winners Announced: Celebrate the champions on 6th February 2024.',
        ],
      },
      { heading: 'Contest Guidelines' },
      {
        ul: [
          'Unleash your digital shots through our online portal (link will be shared soon!).',
          'Each entry deserves a voice: add a title (5 words max) describing your photo and its connection to the theme.',
          'Keep your masterpieces light and shareable: JPEG or PNG format, no larger than 25 MB.',
          'Artistic expressions are encouraged, but excessive manipulation that distorts reality is a no-go.',
          'Plagiarism is not acceptable under any circumstances.',
        ],
      },
      { heading: 'Judging' },
      {
        ul: [
          'A discerning panel of photography experts from Pixels Club and Moksha organizers will be the judges.',
          'Creativity, composition, technical quality, and thematic relevance will be their guiding stars.',
          'Top 10 posts will be shared on Pixels Club Instagram page with proper credit to the photographers.',
          'The best photograph as per decided by the judges will be given the special prize!',
        ],
      },
      { heading: 'General Rules' },
      {
        ul: [
          'By participating, you agree to play by the rules set forth here.',
          'We celebrate your art, not ownership: copyright remains with you, but Moksha organizers may showcase your entries for promotional purposes, always with proper credit.',
          'Sensitivity and respect are key: photos deemed offensive, discriminatory, or violating the contest rules will be disqualified.',
        ],
      },
    ],
  },
  {
    id: 24,
    type: 'solo',
    slug: 'highlight-heist',
    name: 'Highlight Heist',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        bold: true,
        p: 'Dive into the cinematic underworld, where every frame is a steal!',
      },
      {
        p: 'The Heist opens on 2nd February 2024 and closes on 5th February 2024, capturing any of the magical moments from the three days of Moksha. The final date of submission is 6th February 2024 by 12 Noon.',
      },
      {
        bold: true,
        p: 'Theme',
      },
      {
        p: `"Unleashing Moksha" - We're searching for photos that resonate Moksha, and provides us with the best
        cumulative experience of the 3 days of NIT Agartala’s Socio-Cultural Fest.`,
      },
      {
        bold: true,
        p: 'Eligibility',
      },
      {
        ul: [
          'Open to all photographic enthusiasts, but must be attending Moksha.',
          'Each participant can submit a maximum of 1 entry for this contest.',
          "Participants must be registered for Moksha's Pixels Club events.",
        ],
      },
    ],
    instructions: [
      { heading: 'Important Dates' },
      {
        ul: [
          'All entries must be submitted by the specified deadline, that is 6th February 11:59 PM.',
          'Winners will be announced on 7th February. The decision of the judges will be final and binding.',
        ],
      },
      { heading: 'Contest Guidelines' },
      {
        ul: [
          "Submissions must be original and entirely created by the participant or the participant's team.",
          'Submit your digital reels through our online portal (link will be shared soon!).',
          'Each entry deserves a voice: add a title (5 words max) describing your photo and its connection to the theme.',
          'Reels should not exceed a maximum duration of 60 seconds.',
        ],
      },
      { heading: 'Judging' },
      {
        ul: [
          'A discerning panel of photography experts from Pixels Club and Moksha organizers will be the judges.',
          'Creativity, composition, technical quality, and thematic relevance will be their guiding stars.',
          'Top 3 posts will be shared on Pixels Club Instagram page with proper credit to the photographers.',
          'The best reels as per decided by the judges will be given the special prize!',
        ],
      },
      { heading: 'General Rules' },
      {
        ul: [
          'By participating, you agree to play by the rules set forth here.',
          'We celebrate your art, not ownership: copyright remains with you, but Moksha organizers may showcase your entries for promotional purposes, always with proper credit.',
          'Sensitivity and respect are key: photos deemed offensive, discriminatory, or violating the contest rules will be disqualified.',
        ],
      },
    ],
  },
]
