import getDateFromIST from '~/utils/getDateFromIST'
import type { Contest } from '~/types'

const nlc: Contest[] = [
  {
    type: 'team',
    id: 1,
    slug: 'quiz-competition',
    name: 'Quiz Competition',
    club: 'nlc',
    subtitle: 'NLC',
    badges: ['duo'],
    allowedTeamSize: 2,
    image: {
      sources: [
        { srcSet: '/images/contests/nlc/quiz-competition/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/contests/nlc/quiz-competition/poster-512x512.png', type: 'image/png' },
        { srcSet: '/images/contests/nlc/quiz-competition/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/contests/nlc/quiz-competition/poster-1024x1024.png 2x', type: 'image/png' },
      ],
      src: '/images/contests/nlc/quiz-competition/poster-512x512.png',
    },
    deadline: getDateFromIST('2023-09-26', '23:59:00'),
    description: [
      {
        p: 'Get ready to test your knowledge, quick thinking, and teamwork! This thrilling quiz competition, organized for NITA students, is set to take center stage during the grand release event of Udaan.',
      },
      {
        ul: [
          'Theme: Comic',
          'Venue: Visvesvaraya Auditorium, NIT Agartala',
          'Date: To be announced',
          'Time: To be announced',
        ],
      },
    ],
  },
]

const udaanContests = Object.freeze<Contest[]>([...nlc])

export default udaanContests
