import getDateFromIST from '~/utils/getDateFromIST'
import type { Contest } from '~/types'

export const aaveg: Contest[] = [
  {
    id: 20,
    type: 'solo',
    slug: 'parichay',
    name: 'Parichay',
    subtitle: 'Mono Act Competition',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'To all the drama actors out there, this is your best chance to hog the limelight and own the stage!! This will be your moment of glory and your chance to steal the show, so prepare yourself and dazzle the audience with your talent and show yourself to be a master of impromptu action.',
      },
    ],

    instructions: [
      {
        heading: 'Rules',
      },
      {
        ul: [
          'This is an individual event with a minimum age of 14 year and will take place in 2 rounds.',
          'The participants have to clear prelims before 1 week online or offline mode.',
          'There can be 1 person to assist with sounds only 1 can help the participant from backstage.',
          'Language of the act can be English/Hindi.',
          'Stage specification - According to the venue and will be informed through mail 1 week prior to the competition for online registration, the link will be on our fest website.',
          'Total time allotted for every performance is 4 minutes (empty stage to empty stage).',
          'If a participant exceeds the stipulated time, 15% of the total marks obtained will be deducted. If he/she exceeds 6 min, he/she stands to be debarred from the event.',
          'After clearing the prelims, final will be held in campus during MOKSHA.',
          'Participants can bring their own music set for the act in a pen drive but it should be recorded previously; vocals are not allowed in the pre-recorded audio.',
          'Instrumental music is allowed but the participants must bring their own instruments.',
          'All clothes and accessories are to be arranged by the participants. The organizing committee is responsible for the infrastructural facilities only and shall not be responsible for the security of items left behind in green rooms or on stage.',
          'No naked flames, live animals,fire, water, are allowed on stage.',
          'The participants are requested to ensure that their presentation is in keeping with the dignity of the fest.',
        ],
      },
      {
        heading: 'Judging Criteria',
      },
      {
        ul: ['Content - 40%', 'Acting/Expression - 30%', 'Direction - 20%', 'Miscellaneous Effects - 10%'],
      },
    ],
  },
  {
    id: 21,
    type: 'team',
    slug: 'hallabol',
    name: 'Hallabol',
    subtitle: 'Group Act Competition',
    badges: ['team'],
    allowedTeamSize: { min: 5, max: 10 },
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'To all the drama actors out there, this is your best chance to hog the limelight and own the stage!! This will be your moment of glory and your chance to steal the show, so prepare yourself and dazzle the audience with your talent and show yourself to be a master of impromptu action.',
      },
    ],

    instructions: [
      {
        heading: 'Rules',
      },
      {
        ul: [
          'This is a team event with a minimum age of 14 years and will take place in 2 rounds.',
          'The teams have to clear prelims before 1 week online or offline mode.',
          'Minimum 5 members and maximum 10 members allowed in a team.',
          'Language of the act can be English/Hindi.',
          'Stage specification - According to the venue and will be informed through mail 1 week prior to the competition for online registration, the link will be on our fest website.',
          'Total time allotted for every performance is 15 minutes (empty stage to empty stage).',
          'If a team exceeds the stipulated time, 15% of the total marks obtained will be deducted. If team exceeds 18 min, team stands to be debarred from the event.',
          'After clearing the prelims, final will be held in campus during MOKSHA.',
          'Teams can bring their own music for the act in a pen drive.',
          'Instrumental music is allowed but the participants must bring their own instruments.',
          'All clothes and accessories are to be arranged by the participants. The organising committee is responsible for the infrastructural facilities only and shall not be responsible for the security of items left behind in green rooms or on stage.',
          'No naked flames, live animals,fire, water, are allowed on stage.',
          'The participants are requested to ensure that their presentation is in keeping with the dignity of the fest.',
        ],
      },
      {
        heading: 'Judging Criteria',
      },
      {
        ul: ['Content - 40%', 'Acting/Expression - 30%', 'Direction - 20%', 'Miscellaneous Effects - 10%'],
      },
    ],
  },
  {
    id: 22,
    type: 'team',
    slug: 'ad-mockery-matchup',
    name: 'Ad Mockery Matchup',
    subtitle: 'Mimicry Game',
    badges: ['open'],
    allowedTeamSize: { min: 1, max: 6 },
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'Step into the limelight and unleash your inner actor in our Ad Mockery Matchup! This event is a rollercoaster of wit and creativity, where contestants transform into marketing maestros. From iconic jingles to memorable slogans, participants recreate it all with a twist of humor. Get ready for a showdown of comedic charisma and persuasive prowess. Join us for a day of ad-spun amusement that will leave you laughing and longing for more!',
      },
    ],

    instructions: [
      {
        heading: 'Rules',
      },
      {
        ul: [
          'This game requires a single participant or a group (2 or more than 2 but not more than 6 people).',
          'The game shall be held offline.',
          'No naked flames, fire, water or animals are allowed in the set.',
        ],
      },
      {
        heading: 'Judging Criteria',
      },
      {
        ul: [
          'Humor - 30%',
          'Facial Expressions - 20%',
          'Dialogue Delivery - 20%',
          'The idea chosen for Advertising - 30%',
        ],
      },
    ],
  },
]
