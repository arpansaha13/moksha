import getDateFromIST from '~/utils/getDateFromIST'
import type { Contest } from '~/types'

export const aaveg: Contest[] = [
  {
    id: 20,
    slug: 'i-me-myself',
    name: 'I Me Myself',
    subtitle: 'Mono Act Competition',
    type: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
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
    slug: 'rangmanch',
    name: 'Rangmanch',
    subtitle: 'Group Act Competition',
    type: ['team'],
    allowedTeamSize: { min: 5, max: 10 },
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
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
    slug: 'showcase-showdown',
    name: 'Showcase Showdown',
    subtitle: 'Open Act Game',
    type: ['open'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
    description: [
      {
        p: 'Unleash Your Improvisation Skills! This fun event is for encouraging quick thinking and collaboration among participants, where every moment is a chance to shine!',
      },
    ],

    instructions: [
      {
        heading: 'Rules',
      },
      {
        ul: [
          'Participants will draw random chits from a jar of situations.',
          'They must instantly transform the given scenario into a compelling performance.',
          'From comedic sketches to dramatic scenes, anything goes!',
          'No scripts, no rehearsals - just pure, spontaneous acting.',
          'The ability to think on your feet and deliver a convincing portrayal.',
          'Each act is a surprise, keeping the audience engaged and entertained.',
          'Rewards for the most captivating and inventive performances.',
        ],
      },
    ],
  },

  {
    id: 23,
    slug: 'helium-highs',
    name: 'Helium Highs',
    subtitle: 'Helium Gas Game',
    type: ['open'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
    description: [
      {
        p: "Ladies and gentlemen, get ready to elevate your spirits and voices in our uproarious Helium Gas Challenge! Prepare for a day of high-pitched hilarity as we take on the lighter side of science. Remember, this contest isn't just about breath control, it's about who can bring the most laughs with a touch of helium magic! So, grab a balloon and let's turn this place into a symphony of giggles!",
      },
    ],

    instructions: [
      { heading: 'Special Guidelines' },
      {
        ul: [
          'Only participants above a certain age (usually 12 or older) should take part, as younger children may not fully understand the risks.',
          'Avoid inhaling helium too quickly or deeply, as this can lead to hypoxia.',
          'Competitions to see who can inhale the most helium is strongly discouraged. This can be dangerous and is not recommended.',
          'If anyone experiences dizziness, lightheadedness, or any discomfort, they should stop immediately.',
          'The time each participant spends inhaling helium is limited. Short bursts are recommended to avoid potential side effects.',
        ],
      },
      {
        heading: 'Rules',
      },
      {
        ul: [
          'The participants will go 1v1.',
          'After the inhalation of helium from balloons under supervision the participants are supposed to read out dialogues/sing songs as present in flashcards.',
          'If the opposing participant exhibits any sign of mirth, such as laughter or a smile, they shall stand defeated from that round.',
        ],
      },
    ],
  },

  {
    id: 24,
    slug: 'ad-mockery-matchup',
    name: 'Ad Mockery Matchup',
    subtitle: 'Mimicry Game',
    type: ['open'],
    allowedTeamSize: { min: 1, max: 6 },
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2023-10-10', '23:59:00'),
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
