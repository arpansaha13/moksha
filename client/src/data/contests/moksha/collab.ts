import getDateFromIST from '~/utils/getDateFromIST'
import { Contest } from '~/types'

export const collab: Contest[] = [
  {
    id: 14,
    type: 'solo',
    slug: 'kbc',
    name: 'Kaun Banega Comedian',
    subtitle: 'Comedy Contest',
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    badges: ['solo'],
    description: [
      {
        bold: true,
        p: 'MEME CELL in Collaboration with Pixels and FAC brings KBC (Kaun Banega Comedian)',
      },
      {
        p: 'It is a comedy contest where participants are encouraged to showcase their sense of humor in formats like:-',
      },
      {
        ul: [
          'Making punchlines (One liners).',
          'Making jokes on topics given to them and relating that topic to a plethora or weird images shown to them through PPT (Improv comedy).',
          'Stand Up round. (Topic- Your experience in College).',
        ],
      },
      {
        p: 'Amongst all these rounds there will be audience rounds where the hosts will interact with the audience, ask them questions from the recent meme trends, complete some punchlines and many more.',
      },
      {
        bold: true,
        p: 'There will be a short sketch comedy from TEAM GHONISTHO!!',
      },
      {
        p: 'At the end, there will be a very interesting ROAST ROUND which will not be a part of the competition. The roast jokes will be thoroughly revised by Meme Cell core members. Here, individuals will roast their own branch in a very creative way but THERE WILL BE CERTAIN RESTRICTIONS ON MAKING THESE JOKES.',
      },
    ],
    instructions: [
      { heading: 'Rules for the ROAST ROUND' },
      {
        ul: [
          'HE/SHE CANT GET PERSONAL.',
          'NOT TO TARGET ANY OF THE FACULTY MEMBERS.',
          'NOT WRITING JOKES THAT WILL TARNISH THE IMAGE OF THE INSTITUTION.',
        ],
      },
    ],
  },
  {
    id: 15,
    type: 'team',
    slug: 'cosmania',
    name: 'COSMANIA',
    subtitle: 'Cosplay Fest',
    image: {
      src: '/images/contests/generic-poster.png',
    },
    deadline: getDateFromIST('2024-02-01', '23:59:00'),
    badges: ['solo', 'team'],
    allowedTeamSize: { min: 1, max: 5 },
    description: [
      {
        bold: true,
        p: 'In collaboration with Aaveg, Malhar, NLC & Pixels, we bring COSMANIA for you guys!!',
      },
      {
        p: "The Cosplay Competition at our event promises a realm of imagination, where fantasy becomes reality. From galaxies far, far away to enchanted realms, bring your favorite characters to life with jaw-dropping precision and passion. Whether you're a master of makeup, a wizard with wigs, or a crafting virtuoso, this is your stage. Embrace the challenge, embody the essence, and let your creativity soar.",
      },
      {
        p: "Get ready to immerse yourself in a world of fantasy and creativity at Cosmania! This is the ultimate gathering for cosplay enthusiasts to bring their favorite characters to life and showcase their talents. Whether you're a seasoned cosplayer or just starting out, Cosmania is the stage for you to shine! ",
      },
    ],
    instructions: [
      { heading: 'Format' },
      {
        ul: ['Participation: Open to individuals and Cosplay groups', 'Venue: NIT Agartala Campus'],
      },
      { heading: 'Themes' },
      {
        ul: [
          'Comics (including DC, Marvel, Manga, etc.)',
          'Anime, TV Shows, Web Series & Games',
          'Movies (Both Bollywood and Hollywood)',
          'Historical figures',
          'Youtube but have to be renowned characters',
        ],
      },
      {
        heading: 'Rules',
      },
      {
        ul: [
          'It will be in offline mode on campus.',
          'You may portray 1 character or more than 1 but marks will be given for only one character portrayal for the whole team',
          'You may participate as solo or with a team. A maximum of 5 members are allowed in a team.',
        ],
      },

      {
        heading: 'Marking',
      },
      {
        ul: ['Costume & Makeup - 30%', 'Dressing Sense - 20%', 'Dialogue Delivery - 20%', 'The Character chosen - 30%'],
      },
      {
        heading: 'Rounds',
      },
      {
        bold: true,
        p: '1st Round:',
      },
      {
        ul: [
          'During the first round, participants step onto the stage for their introductions and present their costumes.',
          'This is their opportunity to display the meticulous craftsmanship of their costumes, emphasizing authenticity and attention to detail.',
          'Participants will engage the judges and the audience by embodying their chosen characters, setting a strong and captivating first impression for the competition.',
        ],
      },
      {
        bold: true,
        p: '2nd Round:',
      },
      {
        ul: [
          'Moving on to the second round, participants will perform a singing, dancing, mimicking or anything they are good at in character, captivating the audience with their creativity, acting skills, and stage presence.',
          'Judges will evaluate these performances.',
        ],
      },

      {
        heading: 'Guidelines',
      },
      {
        ul: [
          'Costume Representation: Participants must wear costumes that are inspired by fictional characters. The costumes should be eye-catching and comprehensible representations of the characters they are portraying.',
          'Decency and Modesty: Costumes should cover a reasonable amount of skin and not be overly revealing. Outfits should not contain explicit or offensive imagery, and participants should avoid attire that is excessively sexualized or indecent. Judges and event organizers will have the final say on costume appropriateness.',
          'Safe Props: Ensure that any props or weapons are safe for the event and comply with local laws and event guidelines.',
          'Respect and Decorum: Maintain appropriate behavior throughout the event, avoiding harassment, discrimination, or offensive conduct.',
          'Inclusivity: Costumes and behavior should not promote hate speech, discrimination, or offensive stereotypes. Respect cultural diversity.',
          'Consent and Boundaries: Be respectful, be nice, be cool, and be kind to each other. Please keep your hands to yourself. If you would like to take a picture with another attendee, then always ask their permission first, and respect that person’s right to say no.',
          'Event Compliance: Adhere to all event rules and guidelines provided by the organizers, including security, behavior, and prop policies. Failure to comply may result in disqualification or removal from the event.',
        ],
      },
      {
        heading: 'Judging Criteria',
      },
      {
        ul: [
          'Creativity and Faithfulness: How well your cosplay captures the essence of your chosen character or theme.',
          'Craftsmanship: The quality of your costume, props, and makeup, demonstrating attention to detail.',
          'Performance: Showcase your character on stage with confidence, charisma, and engaging performances.',
          'Audience Connection: Connect with the audience and convey your passion for your character/theme.',
        ],
      },
    ],
  },
]
