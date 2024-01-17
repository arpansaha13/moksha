import getDateFromIST from '~/utils/getDateFromIST'
import { Contest } from '~/types'

export const fineArts: Contest[] = [
  {
    id: 2,
    type: 'solo',
    slug: 'kalakriti',
    name: 'KalaKriti',
    subtitle: 'Painting Competition',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'It is an event to provide a platform for students to showcase their talent, express their creativity and develop their artistic skills.',
      },
      {
        bold: true,
        p: 'Theme',
      },
      {
        p: 'Comics (Super hero or Super villain)',
      },
      {
        bold: true,
        p: 'Event Managers',
      },
      {
        ul: ['Hrishikesh Munde (72492 70240)', 'Prathamesh Shitre (87677 14582)'],
      },
    ],
    instructions: [
      { heading: 'Rules' },
      {
        ul: [
          'Sketches can be only a pencil sketch or coloured.',
          'Drawing sheets will be provided on site by the organizers.',
          'Every participant should bring their own pencil, rubber, board, colors during the contest day. Nothing related to them will be provided on site.',
          'Duration of the competition will be 2 hours.',
          'Participants must look after their own items carefully by themselves.',
          'Participants have to bring their school Id card.',
          'If any unfair means are found with the participant, his/her artwork will be canceled.',
        ],
      },
    ],
  },
  {
    id: 3,
    type: 'solo',
    subtitle: 'Artwork',
    slug: 'comiquest',
    name: 'Comiquest',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'Comic characters or themes (All forms of art such as Digital, Traditional, Vector, etc are allowed) (All entries will be accepted online. No artwork will be accepted offline).',
      },
      {
        bold: true,
        p: 'Event Managers',
      },
      {
        ul: [
          'Soumyadeep Shome : +91 96120 52905',
          'Soumyadeep Bhowmik : +91 93629 49590',
          'Anamika Debnath : +91 60091 55970',
          'Nabadiganta Acharjee: 60094 08045',
        ],
      },
    ],
    instructions: [
      { heading: 'Rules' },
      {
        ul: [
          'Maximum two entries are allowed for each contestant.',
          'Both digital artwork and hand drawn artwork can be submitted.',
          'There will be two groups one for Digital work and the other is for Hand drawn art work ,so that the judgement can be fair.',
          'Winners will be selected from each group.',
          'Artworks will be uploaded to fine-arts club’s Instagram page.',
          'The winners art works will be printed out and showcased in Fine arts club exhibition.',
          'The best works will be showcased in our insta page.',
          'The submission of artworks will be closed on the 1st day of Moksha',
          'Results will be announced on the last day of Moksha.',
        ],
      },
    ],
  },
]
