import getDateFromIST from '~/utils/getDateFromIST'
import type { Contest } from '~/types'

export const malhar: Contest[] = [
  {
    id: 4,
    type: 'solo',
    slug: 'moksha-maestro',
    name: 'Moksha Maestro',
    subtitle: 'Solo Singing Competition',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'This solo singing competition will be held in two stages: the preliminary round the and final round, contestants will have to submit their video of a maximum of 5 minutes for the preliminary round. selected candidates from the preliminary round will be competing in the Finals.',
      },
      {
        bold: true,
        p: 'Acoustic and classical music will be judged separately, and the winner will be announced respectively.',
      },
      {
        p: 'VISION: Malhar has always been one of the most active cultures of NIT Agartala. Its mission has always been to discover musical talents throughout the campus and to provide them with a favorable atmosphere to nurture their talents. Additionally, as a part of our musical endeavor, we will offer an ideal platform for everyone to showcase their singing skills and expand their horizons beyond academics.',
      },
      {
        bold: true,
        p: 'Contest Managers',
      },
      {
        ul: ['Agrani (69099 17823)', 'Sudib (94364 74865)', 'Chandrayee (60331 95685)'],
      },
    ],
    instructions: [
      { heading: 'Venue' },
      {
        ul: [
          'Prelims: Contestants will have to submit videos of a maximum of five (05) minutes of their performance to the official email id of Malhar.',
          'Finals: Auditorium or stage provided.',
        ],
      },
      { heading: 'Malhar official mail' },
      { p: 'malhar.music.nita@gmail.com' },
      { heading: 'Rules - Prelims' },
      {
        ul: [
          'The participants will be allowed to send a video of his/her performance of a maximum of five (05) minutes to the official email ID of Malhar.',
          'The song must only be in Hindi or English.',
          'Contestants can use a backing track, Tanpura, or live instruments.',
          'Judgement will be strictly made based on vocals (sur, taal, pronunciation, overall impact).',
          'Top 8-10 candidates will be allowed to participate in the finals.',
        ],
      },
      { heading: 'Rules - Finals' },
      {
        ul: [
          'Time limit will be 5 minutes. After which 20% of marks will be deducted for every 10 seconds and disqualification may occur after 20 seconds.',
          'Participants can perform with one instrumental accompaniment or with a backing track but the judging will be done solely based on vocal performance.',
          'Performers can be disqualified on the spot for misconduct, obscenity, or foul language. Judging will be done solely based on vocal performance.',
          'Decision of the judges will be final and binding.',
        ],
      },
    ],
  },
  {
    id: 5,
    type: 'team',
    slug: 'melody-mania',
    name: 'Melody Mania',
    subtitle: 'Group Singing Competition',
    badges: ['team'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    allowedTeamSize: { min: 3, max: 6 },
    description: [
      {
        p: 'Have you been into group singing recently? Then Melody mania is the perfect platform to showcase your vocal talents The competition invites some of the best musicians from across India to blend their voices at the auditorium stage. This competition consists of two rounds: a preliminary round (online) from which a chosen group of contestants will advance to the final round(Auditorium).',
      },
      {
        bold: true,
        p: 'Classical, Folk and western music will be judged separately, and the winner will be announced respectively.',
      },
      {
        p: "VISION: Malhar's mission has always been to provide a platform for talented singers to showcase their musical abilities. The competition can provide a way for these singers to gain exposure and recognition, and potentially even launch a career in the music industry. In addition, this competition will help to develop important teamwork skills, such as communication, collaboration, and respect for each other. As icing on the cake, this will promote cultural diversity by featuring groups with different backgrounds, musical traditions, and styles of music.",
      },
      {
        bold: true,
        p: 'Contest Managers',
      },
      {
        ul: ['Bishmoy (76290 97157)', 'Atriman (98633 07628)', 'Diganta (84139 75143)'],
      },
    ],
    instructions: [
      { heading: 'Malhar official mail' },
      { p: 'malhar.music.nita@gmail.com' },
      { heading: 'Rules - Prelims' },
      {
        ul: [
          'The participants have to perform one or more songs of their choice and have to send the video in MP4 format to the official mail id of Malhar.',
          'Group will comprise members a maximum of 6 and a minimum of 3 which includes a minimum of 2 vocalists and at least 1 instrumentalist.',
          'The songs must be in Hindi or English.',
          'Participants will be given a maximum of 7 minutes and a minimum of 5 minutes to complete their performance.',
          'Exceeding the time limit will deduct marks.',
          'Judgment will be strictly based on vocals: Sur, Taal, Lay, Pronunciation and overall impact.',
          'Top 7 to 8 teams from this round will be qualified for finals.',
        ],
      },
      { heading: 'Rules - Finals' },
      {
        ul: [
          'Participants have to perform one or more songs of their choice in the auditorium of NIT Agartala.',
          'Participants will be given a maximum of 7 minutes and a minimum of 5 minutes to complete their performance.',
          'Exceeding the time limit will deduct marks.',
          'Participant will carry their instruments (only a harmonium will be provided by the club).',
          'Electrical guitars (without amplifiers) and bass guitars (without any processors) are allowed. One synthesizer will be allowed per entry.',
          'The following equipment will be provided by us: Power supply for synthesizer, microphones and sounds',
          'Patch Change for the synthesizer is not allowed in the middle of the song.',
          'Judgment will be strictly based on vocals: Sur, Taal, Lay, Pronunciation and overall impact.',
          'The decision of the judges will be final and binding.',
        ],
      },
    ],
  },
  {
    id: 6,
    type: 'solo',
    slug: 'harmony-hunt',
    name: 'Harmony Hunt',
    subtitle: 'Solo Instrumental Competition',
    badges: ['solo'],
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'This solo instrumental competition will be held in 2 stages: a preliminary round, from which selected contestants will advance to the final round and compete in the main event of ‘Moksha’, which will take place in the Auditorium.',
      },
      {
        bold: true,
        p: 'Winners will be awarded some exciting prizes!',
      },
      {
        p: 'VISION: The main motive of this solo instrumental competition is to discover the untapped talented instrumentalists and give them the platform to showcase their talent and perform their heart out. ‘Malhar’s’ vision is to encourage all the instrumentalists out there to express themselves in front of such a huge crowd and to push them towards active participation in club and college events in the future and outshine their cultural horizons.',
      },
      {
        bold: true,
        p: 'Contest Managers',
      },
      {
        ul: ['Papu (69098 24602)', 'Pradeepta (96125 71637)', 'Pallab (87320 70871)'],
      },
    ],
    instructions: [
      { heading: 'Venue' },
      { ul: ['Prelims: Online', 'Finals: Auditorium or stage provided.', 'Duration: 1 hour'] },
      { heading: 'Malhar official mail' },
      { p: 'malhar.music.nita@gmail.com' },
      { heading: 'Rules - Prelims' },
      {
        ul: [
          'The participants can perform any song of their choice. Participants have to send their videos to the official email id of Malhar.',
          'Students have to submit a recorded video of their performance in the G form (time limit: 2-4 mins).',
          'The audio quality should be good enough.',
          'You have to upload the performance in the raw version, without any sound processing and use of any added amplifiers.',
          'Judgement would be done based on the playing skills of the individuals, not based on backing tracks or backing vocals used in the video.',
          'You can use backing tracks and Tanpura for your comfort.',
          'Top 8-10 participants would be selected from the prelims and would advance to the final round.',
        ],
      },
      { heading: 'Rules - Finals' },
      {
        ul: [
          'Time Limit for the performances would be 5-7 mins.',
          'The participants can perform any song of their choice.',
          'Participants can carry at most 1 backing instrumentalist for their performance (Tanpura is also allowed as backing tracks).',
          'Judgement will purely be based on the playing skills of the participant and not on the backing tracks or backing instrumentals.',
        ],
      },
    ],
  },
  {
    id: 7,
    type: 'solo',
    slug: 'beatnik',
    name: 'Beatnik',
    badges: ['solo'],
    subtitle: 'Rap Battle',
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'This rap battle competition will be held in two stages: a preliminary round, from which a chosen group of contestants will advance to the final round, which will take place in the auditorium.',
      },
      {
        bold: true,
        p: 'Winners will be awarded some exciting prizes which will be revealed later!',
      },
      {
        p: 'VISION: Finding undiscovered talent on campus and providing students with a stage to perform in addition to their academic obligations have always been the goals of Malhar. In addition, as a part of our musical endeavour, we will provide the perfect stage for all participants to broaden their perspectives beyond academics and exhibit their musical prowess.',
      },
      {
        bold: true,
        p: 'Contest Managers',
      },
      {
        ul: ['Sayandip (79083 90658)', 'Deepratip (70059 02255)'],
      },
    ],
    instructions: [
      { heading: 'Venue' },
      {
        ul: ['Prelims: Online', 'Finals: Auditorium or stage provided.', 'Duration: 1 hour'],
      },
      { heading: 'Malhar official mail' },
      { p: 'malhar.music.nita@gmail.com' },
      { heading: 'Rules - Prelims' },
      {
        bold: true,
        p: 'It will take place before cultural fest.',
      },
      {
        ul: [
          'The participants have to perform any one rap of his or her choice and has to send it to the official mail id of Malhar in mp4 format.',
          'The rap must only be in Hindi or English.',
          'Time limit for performance will be 2-4 mins.',
          'Judgment will be strictly based on beats, pronunciations, and speed.',
          'Top 8-10 candidates from this round will be qualified for the finals.',
        ],
      },
      { heading: 'Rules - Finals' },
      {
        ul: [
          'Time limit for performance will be 3-5 minutes.',
          'Top three participants will be awarded 1st, 2nd, and 3rd runner-up prizes.',
          'The participants have to perform any one rap of his or her choice. The rap must only be in Hindi or English. Participants are allowed to do originals.',
          'Judgment will be strictly based on beats, pronunciations, and speed.',
        ],
      },
      {
        bold: true,
        p: 'Winners will be awarded some exciting prizes which will be revealed later.',
      },
    ],
  },
  {
    id: 8,
    type: 'team',
    slug: 'folklore-fiesta',
    name: 'Folklore Fiesta',
    badges: ['team'],
    allowedTeamSize: { min: 3, max: 7 },
    subtitle: 'Group Singing Competition',
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'India is a land of diverse culture and heritage. Folklore fiesta is a competition to celebrate the varied cultural heritage of different parts of India. This is the perfect platform to showcase your vocal talents.In this competition a group of performers have to choose any regional folk theme to perform, For example - Gujrati folk, Rajasthani folk, Assamese folk etc.This competition consists of two rounds: a preliminary round(online) from which a chosen group of contestants will advance to the final round. the winner will be announced respectively.',
      },
      {
        bold: true,
        p: 'Winners will be awarded some exciting prizes which will be revealed later!',
      },
      {
        p: "VISION: Malhar's mission has always been to provide a platform for talented singers to showcase their musical abilities. The competition can provide a way for these singers to gain exposure and recognition, and potentially even launch a career in the music industry. In addition, this competition will help to develop important teamwork skills, such as communication, collaboration, and respect for each other. As icing on the cake, this will promote cultural diversity by featuring groups with different backgrounds, musical traditions, and styles of music.",
      },
      {
        bold: true,
        p: 'Contest Managers',
      },
      {
        ul: ['Pallab (87320 70871)', 'Deepayan (60099 36598)', 'Bipasha (84658 50314)'],
      },
    ],
    instructions: [
      { heading: 'Venue' },
      {
        ul: ['Prelims: Online', 'Finals: Auditorium or stage provided.', 'Duration: 1 hour'],
      },
      { heading: 'Malhar official mail' },
      { p: 'malhar.music.nita@gmail.com' },
      { heading: 'Rules - Prelims' },
      {
        ul: [
          'The participants have to perform one or more songs of one regional folk of their choice and have to send the video in MP4 format to the official mail id of Malhar.',
          'Group will comprise members a maximum of 7 and a minimum of 3 which includes a minimum of 2 vocalists and at least 1 instrumentalist.',
          'Time limit for performance will be 2-4 mins.',
          'Participants will be given a maximum of 7 minutes and a minimum of 5 minutes to complete their performance. Extra time will deduct marks.',
          'Judgment will be based on vocals and cultural representation: Sur, Taal, Lay, Pronunciation, Overall Impact.',
          'Top 7 to 8 teams from this round will be qualified for finals.',
        ],
      },
      { heading: 'Rules - Finals' },
      {
        ul: [
          'Participants have to perform one or more songs of their choice in the auditorium of NIT, Agartala.',
          'Participants will be given a maximum of 7 minutes and a minimum of 5 minutes to complete their performance. Extra time will deduct marks.',
          'Participants will carry their instruments (only a harmonium will be provided by the club).',
          'Electrical guitars ( without amplifiers)and bass guitars (without any processors) are allowed. One synthesizer will be allowed per entry.',
          'The following equipment will be provided by us: Power supply for synthesizer & Microphones and sounds.',
          'Patch Change for the synthesizer is not allowed in the middle of the song.',
          'Judgment will be based on vocals and cultural representation: Sur, Taal, Lay, Pronounciation, Overall Impact.',
          'The decision of the judges will be final and binding.',
        ],
      },
    ],
  },
  {
    id: 9,
    type: 'team',
    slug: 'muzic-madness',
    name: 'Muzic Madness',
    badges: ['team'],
    allowedTeamSize: { min: 5, max: 6 },
    subtitle: 'Antakshari Game',
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    description: [
      {
        p: 'Antakshari is that game that has been played since Ramayana days of Hindu culture. We all are well known for it . Boredom pacifies its medicinal way out to such interesting games!!',
      },
      {
        p: 'Musical games are very fun to play ,very much hyping and just changes the atmosphere of a place drastically,ex: from a very serious one to a very relaxing one.',
      },
      {
        bold: true,
        p: 'This game is also one kinda ANTAKSHARI only.',
      },
      {
        bold: true,
        p: 'Contest Managers',
      },
      {
        ul: ['Prerna (91302 24569)', 'Bipasha (84658 50314)'],
      },
    ],
    instructions: [
      { heading: 'Venue' },
      {
        ul: ['Prelims: Visveswaraya Auditorium', 'Finals: Visveswaraya Auditorium'],
      },
      {
        bold: true,
        p: 'One selection round will also be there to select the groups for further steps.',
      },
      { heading: 'Rules' },
      {
        ul: [
          'This game will consist of two rounds- Preliminary and Finals.',
          'Group will comprise members a maximum of 7 and a minimum of 3 which includes a minimum of 2 vocalists and at least 1 instrumentalist.',
          'Time limit for performance will be 2-4 mins.',
          'No elimination will be there for these two rounds.',
          'Winner will be decided on the verse of Sur,Lyrics,Time obviously.',
          'First round will be like Antakshari only..I.e, starting the next song with the end most letter,the next group has to sing the song with that letter within a fixed time limit.',
          'Second round will be a quiz round related to music.',
          'Venue for both the rounds will be Auditorium.',
        ],
      },
      {
        bold: true,
        p: 'The winner will be awarded with exciting prizes!!',
      },
    ],
  },
]
