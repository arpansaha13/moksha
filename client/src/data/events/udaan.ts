import type { Event } from '~/types'

const dzire: Event[] = [
  {
    id: 1,
    slug: 'flash-mob',
    name: 'Flash Mob',
    club: 'dzire',
    subtitle: 'Dzire',
    image: {
      sources: [
        { srcSet: '/images/events/dzire/flash-mob/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/events/dzire/flash-mob/poster-512x512.png', type: 'image/png' },
        { srcSet: '/images/events/dzire/flash-mob/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/events/dzire/flash-mob/poster-1024x1024.png 2x', type: 'image/png' },
      ],
      src: '/images/events/dzire/flash-mob/poster-512x512.png',
    },
    description: [
      {
        p: 'Step into the rhythm of the night and let your senses come alive at our electrifying dance extravaganza! Join us for a pulsating fusion of music, movement, and magic as we ignite the dance floor with unparalleled energy. So mark your calendars and join us when we bring down the house with a night of rhythm, unity, and pure collegiate energy!',
      },
    ],
  },
]

const malhar: Event[] = [
  {
    id: 2,
    slug: 'street-jam',
    name: 'Street Jam',
    club: 'malhar',
    subtitle: 'Malhar',
    image: {
      sources: [
        { srcSet: '/images/events/malhar/street-jam/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/events/malhar/street-jam/poster-512x512.png', type: 'image/png' },
        { srcSet: '/images/events/malhar/street-jam/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/events/malhar/street-jam/poster-1024x1024.png 2x', type: 'image/png' },
      ],
      src: '/images/events/malhar/street-jam/poster-512x512.png',
    },
    description: [
      {
        p: "Elevate your campus experience with a night that hits all the right notes – our sensational college singing event is here! 🎤 Get ready to be swept away by the melodious talents of your fellow students as they take center stage and captivate hearts with their incredible voices. From soulful ballads to high-energy anthems, this event celebrates the diverse musical talents that make our college community shine. Whether you're a shower-singer extraordinaire or a die-hard music lover, this is your chance to soak in the enchanting atmosphere, cheer for your favorites, and discover the next big vocal sensation. Join us for a harmonious evening that will leave you humming and applauding for more!",
      },
    ],
  },
]

const aaveg: Event[] = [
  {
    id: 3,
    slug: 'nukkad',
    name: 'Nukkad',
    club: 'aaveg',
    subtitle: 'Aaveg',
    image: {
      sources: [
        { srcSet: '/images/events/aaveg/nukkad/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/events/aaveg/nukkad/poster-512x512.png', type: 'image/png' },
        { srcSet: '/images/events/aaveg/nukkad/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/events/aaveg/nukkad/poster-1024x1024.png 2x', type: 'image/png' },
      ],
      src: '/images/events/aaveg/nukkad/poster-512x512.png',
    },
    description: [
      {
        p: "Step into the heart of human emotions as the curtains rise on Nukkad at this year's Udaan college fest! Aaveg is proud to present an unforgettable performance that will make you laugh, cry, and reflect on the tapestry of life itself.",
      },
    ],
  },
]

const phewsion: Event[] = [
  {
    id: 4,
    slug: 'fun-games',
    name: 'Fun Games',
    club: 'phewsion',
    subtitle: 'Phewsion',
    image: {
      sources: [
        { srcSet: '/images/events/phewsion/fun-games/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/events/phewsion/fun-games/poster-512x512.png', type: 'image/png' },
        { srcSet: '/images/events/phewsion/fun-games/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/events/phewsion/fun-games/poster-1024x1024.png 2x', type: 'image/png' },
      ],
      src: '/images/events/phewsion/fun-games/poster-512x512.png',
    },
    description: [
      {
        p: 'Step into a world of instant fun and friendly games at our college fest. From nailing a slam dunk at Basketball Hoop to hitting the bullseye at Dart Board, and showcasing your soccer freestyle at Football Kickups.',
      },
      { heading: 'Basketball Hoops' },
      {
        p: 'Pick up the ball and toss it in the basket. Can you beat the challenge and make that slam dunk?',
      },
      { heading: 'Dart Board' },
      {
        p: 'Precision and focus are your best friends at Bullseye Bonanza. Grab a dart, take a deep breath, and aim for that elusive bullseye.',
      },
      { heading: 'Football Kickups' },
      {
        p: "Fancy some footwork? It's not just about goals; it's about the rhythm.",
      },
    ],
  },
]

const udaanEvents = Object.freeze([...dzire, ...malhar, ...aaveg, ...phewsion])

export default udaanEvents
