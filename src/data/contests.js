const fineArts = [
  {
    slug: 'open-canvas',
    name: 'Open canvas',
    type: ['unspecified'],
    image: '', // Image link
    description: [
      {
        p: 'Open Canvas is a Graphic Editor that has an analog-like quality and a simple or easy user interface. It is extensively suitable to beginners to advanced users. Addition to the basic performances, openCanvas has its unique "Event function" that records and replays a drawing procedure.',
      },
    ],
  },
  {
    slug: 'magic-of-fingers',
    name: 'Magic of fingers',
    type: ['unspecified'],
    image: '', // Image link
    description: [
      {
        p: 'Who says a painter needs brush to unleash his imagination. All that was needed in this event were         some water colours on one’s fingers and that’s how we crowned the Leonardo of finger painting.',
      },
    ],
  },
  {
    slug: 'art-exhibition',
    name: 'Art exhibition',
    type: ['unspecified'],
    image: '', // Image link
    description: [
      {
        p: 'An art exhibition is traditionally the space in which art objects (in the most general sense) meet an audience. The exhibit is universally understood to be for some temporary period unless, as is rarely true, it they may be called "exhibit", "exposition" (the French word) or "show".',
      },
    ],
  },
  {
    slug: 'instant-portrait',
    name: 'Instant portrait',
    type: ['unspecified'],
    image: '', // Image link
    description: [
      {
        p: 'A portrait is a painting, photograph, sculpture, or other artistic representation of a person, in which the face and its expressions are predominant. The intent is to display the likeness, personality, and even the mood of the person.',
      },
    ],
  },
  {
    slug: 'digital-illustration',
    name: 'Digital illustration',
    type: ['unspecified'],
    image: '', // Image link
    description: [
      {
        p: 'Digital illustration or computer illustration is the use of digital tools to produce images under the direct manipulation of the artist, usually through a pointing device such as a graphics tablet or, less commonly, a mouse. It is distinguished from computer-generated art, which is produced by a computer using mathematical models created by the artist. It is also distinct from digital manipulation of photographs, in that it is an original construction "from scratch". Photographic elements such as background or texture may be incorporated into such works, but they are not necessarily the primary basis.',
      },
    ],
  },
]

const malhar = [
  {
    slug: 'solo-singing',
    name: 'Solo singing',
    type: ['solo'],
    image: '', // Image link
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
    ],
    instructions: [
      { heading: 'Venue - Prelims' },
      {
        p: 'Contestants will have to submit videos of a maximum of five (05) minutes of their performance to the official email id of Malhar.',
      },
      { heading: 'Venue - Finals' },
      { p: 'Auditorium or stage provided.' },
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
    slug: 'melody-mania',
    name: 'Melody mania',
    subtitle: 'Group singing',
    type: ['team'],
    image: '', // Image link
    description: [
      {
        p: 'Have you been into group singing recently? Then Melody mania is the perfect platform to showcase your vocal talents The competition invites some of the best musicians from across India to blend their voices at the auditorium stage. This competition consists of two rounds: a preliminary round (online) from which a chosen group of contestants will advance to the final round(Auditorium).',
      },
      {
        bold: true,
        p: 'Classical , Folk and western music will be judged separately, and the winner will be announced respectively.',
      },
      {
        p: "VISION: Malhar's mission has always been to provide a platform for talented singers to showcase their musical abilities. The competition can provide a way for these singers to gain exposure and recognition, and potentially even launch a career in the music industry. In addition, this competition will help to develop important teamwork skills, such as communication, collaboration, and respect for each other. As icing on the cake, this will promote cultural diversity by featuring groups with different backgrounds, musical traditions, and styles of music.",
      },
    ],
    instructions: [
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
    slug: 'harmony-hunt',
    name: 'Harmony hunt',
    subtitle: 'Solo instrumental',
    type: ['solo'],
    image: '', // Image link
    description: [
      {
        p: 'This solo instrumental competition will be held in 2 stages: a preliminary round, from which selected contestants will advance to the final round and compete in the main event of ‘MOKSHA’, which will take place in the Auditorium.',
      },
      { p: 'Winners will be awarded some exciting prizes.' },
      {
        p: 'VISION: The main motive of this solo instrumental competition is to discover the untapped talented instrumentalists and give them the platform to showcase their talent and perform their heart out. ‘Malhar’s’ vision is to encourage all the instrumentalists out there to express themselves in front of such a huge crowd and to push them towards active participation in club and college events in the future and outshine their cultural horizons.',
      },
    ],
    instructions: [
      { heading: 'Venue - Prelims' },
      { p: 'Online' },
      { heading: 'Venue - Finals' },
      { p: 'Auditorium or stage provided.' },
      { heading: 'Duration' },
      { p: '1 hour.' },
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
    slug: 'rap-battle',
    name: 'Rap battle',
    type: ['solo'],
    image: '', // Image link
    description: [
      {
        p: 'This rap battle competition will be held in two stages: a preliminary round, from which a chosen group of contestants will advance to the final round, which will take place in the auditorium.',
      },
      { p: 'Winners will be awarded some exciting prizes which will be revealed later' },
      {
        p: 'VISION: Finding undiscovered talent on campus and providing students with a stage to perform in addition to their academic obligations have always been the goals of Malhar. In addition, as a part of our musical endeavour, we will provide the perfect stage for all participants to broaden their perspectives beyond academics and exhibit their musical prowess.',
      },
    ],
    instructions: [
      { heading: 'Venue' },
      {
        ul: ['Prelims: Offline', 'Finals: Auditorium or stage provided.'],
      },
      { heading: 'Rules - Prelims' },
      {
        bold: true,
        p: 'It will take place before cultural fest',
      },
      {
        ul: [
          'The participants have to perform any one rap of his or her choice. Gform will be circulated for participation.',
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
    ],
  },
  {
    slug: 'beatnik',
    name: 'Beatnik',
    subtitle: 'Beatboxing',
    type: ['solo'],
    image: '', // Image link
    description: [
      {
        p: 'Gear up! Beatboxers release your adrenalines to insane limits. Showcase your mini orchestra living in your throats by creating a wide range of sounds.',
      },
      {
        p: "VISION: Malhar always tries to bring something new, innovative events on the table that breaks the trend of orthodox ,monotonous music life .Beatnik is a way to celebrate the art and sport of beatboxing, bring together a diverse community of performers and fans, and push the boundaries of what's possible with just your voice and some creative imagination.",
      },
    ],
    instructions: [
      { heading: 'Rules' },
      {
        ul: [
          'This is a solo beatboxing competition. This will be held in two levels - Prelims and Finals.',
          'Prelims will be held online wherein top 4-6 will be selected and called up for finals in NIT ,Agartala during the fest.',
          'In case a finalist is unable to attend the finale then the next finalist will be approached.',
          'Decision of the judges will be final and binding. No changes will be made once the judges have announced the results.',
          'No foul language is allowed. In case they use foul languages they will be disqualified.',
        ],
      },
      { heading: 'Rules - Prelims' },
      {
        ul: [
          'The participants will be required to send a video of not more than 1.5 minutes performing their piece to the official mail id of malhar club.',
          'No musical instruments will be allowed. In case it is found, the participant will be disqualified.',
        ],
      },
      { heading: 'Rules - Finals' },
      {
        ul: [
          'This will be a 1vs1 battle rounds among the top 4-6 participants wherein each beatboxer would be given 2 minutes each and the winners will be decided by the judges.',
          'The winner from each battle will be promoted to the next battle and the opponents will be decided by the judges whichever way they seem fit.',
          'No musical instruments will be allowed. In case it is found, the participant will be disqualified.',
        ],
      },
    ],
  },
]

const dzire = [
  {
    slug: 'shinigami-showdown',
    name: 'Shinigami Showdown',
    subtitle: 'Solo dance competition',
    type: ['solo'],
    image: '', // Image link
    description: [
      {
        p: 'It is a solo dance competition, any form of dance can be performed.',
      },
      {
        ul: ['Prelims will be online.', 'Finals will be offline.', 'Venue will be updated later on.'],
      },
    ],
    instructions: [
      { heading: 'Rules for prelims and finals.' },
      {
        ul: [
          "Song shouldn't exceed 3 mins, from playing on to off. After 15 secs points shall be deducted , on crossing 30 secs further participant shall be disqualified.",
          'The choice of costume and song must be decent. Use of vulgarity is strictly prohibited and subjected to disqualification.',
          "The act shouldn't promote any sort of violence or cruelty. Use of props such as fire or any sharp objects is prohibited.",
        ],
      },
    ],
  },
  {
    slug: 'dragon-ballroom',
    name: 'Dragon Ballroom',
    subtitle: 'Duet competition',
    type: ['duet'],
    image: '', // Image link
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
    slug: 'hunter-x-hunter-hoedown',
    name: 'Hunter x Hunter Hoedown',
    subtitle: 'Group competition',
    type: ['team'],
    image: '', // Image link
    description: [
      {
        p: 'It is a group dance competition where  any form of dance can be performed.',
      },
    ],
    instructions: [
      { heading: 'Rules for prelims and finals.' },
      {
        ul: [
          "Song shouldn't exceed 3 mins, from playing on to off. After 15 secs points shall be deducted , on crossing 30 secs further participant shall be disqualified.",
          'The choice of costume and song must be decent. Use of vulgarity is strictly prohibited and subjected to disqualification.',
          "The act shouldn't promote any sort of violence or cruelty. Use of props such as fire or any sharp objects is prohibited.",
          'Min no of participants are 4 and max no of participants are 15.',
          'Participants should arrange their own costumes and props.',
          'Prelims will be before MOKSHA and Finals will take place during MOKSHA.',
        ],
      },
    ],
  },
  {
    slug: 'bob-till-you-drop',
    name: "Bob 'Till you Drop'",
    subtitle: 'Open dance competition',
    type: ['open'],
    image: '', // Image link
    description: [
      {
        p: "It's a dance competition which is open for all, any form of dance can be performed.",
      },
      { p: 'Anybody from the crowd can come up and dance on any song.' },
      { p: 'Time limit - 1 to 2 mins.' },
    ],
  },
]

const pixel = [
  {
    slug: 'the-sunday-mystery',
    name: 'The Sunday Mystery',
    image: '', // Image link
    type: ['solo', 'duo'],
    description: [
      {
        p: 'Similar to the Treasure hunt done this Aayam, In this event, The participants have to find clues in a room/event place for solving a murder mystery and help the Superhero get out of the jail which he/she has been wrongly accused of. The person has to find clues in single/multiple location depending on the size of the team management.',
      },
      { p: 'Fastest recorded team to solve the mystery wins.' },
    ],
    instructions: [
      { heading: 'What do the participants have to do?' },
      { p: 'Solve riddles/find clues depending on the main story line.' },
      { heading: 'What will the club provide to the participants?' },
      { p: 'Pen and paper to solve the mystery.' },
    ],
  },
  {
    slug: 'let-me-out-escape-room',
    name: 'LetMeOut (Escape Room)',
    image: '', // Image link
    type: ['duo', 'squad'],
    description: [{ p: 'Escape from the room. Quickest runner wins.' }],
    instructions: [
      { heading: 'What do the participants have to do?' },
      { p: 'Find clues and unlock the room.' },
      { heading: 'What will the club provide to the participants?' },
      { p: 'A Mystery Room.' },
      { heading: 'What should be the size of the team?' },
      { p: 'It may be a duo or a squad of 4.' },
    ],
  },
  {
    slug: 'click-a-story',
    name: 'Click a Story',
    image: '', // Image link
    type: ['solo', 'any'],
    description: [
      {
        p: 'Click multiple pictures that make a short story (Maximum 10 Pictures).',
      },
    ],
    instructions: [
      { heading: 'What do the participants have to do?' },
      { p: 'Upload on instagram, tag & follow @pixels.nita.' },
      { heading: 'What will the club provide to the participants?' },
      { p: 'An online platform.' },
      { heading: 'What should be the size of the team?' },
      { p: 'No restrictions. But winner will be the account where the post has been posted on.' },
    ],
  },
]

const contests = {
  'fine-arts-club': fineArts,
  malhar: malhar,
  dzire: dzire,
  pixel: pixel,
}

export function getContestData(clubName, contestSlug) {
  return contests[clubName].find(contest => contest.slug === contestSlug)
}

export default contests
