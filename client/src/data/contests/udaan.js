const malhar = [
  {
    id: 15,
    slug: 'battle-of-bands',
    name: 'Battle of Bands',
    club: 'malhar',
    subtitle: 'Malhar',
    type: ['team'],
    allowedTeamSize: { min: 3, max: null },
    image: {
      sources: [
        { srcSet: '/images/contests/malhar/battle-of-bands/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/contests/malhar/battle-of-bands/poster-512x512.jpeg', type: 'image/jpeg' },
        { srcSet: '/images/contests/malhar/battle-of-bands/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/contests/malhar/battle-of-bands/poster-1024x1024.jpeg 2x', type: 'image/jpeg' },
      ],
      src: '/images/contests/malhar/battle-of-bands/poster-512x512.jpeg',
    },
    description: [
      {
        p: 'Harmonious Collision! Battle of the Beats! Get ready to witness an electrifying showdown of campus melodies as top musical bands clash in a symphonic spectacle. The stage is set, the amps are buzzing, and the atmosphere is charged with musical magic. Who will strike the perfect chord and claim the title of ultimate campus conqueror? Join us at Moksha for a night of rhythmic rivalry that will leave you dancing to the pulsating cadence of creativity!',
      },
    ],
  },
]

const fineArts = [
  {
    id: 2,
    slug: 'art-competition',
    name: 'Art Competition',
    club: 'fine-arts',
    subtitle: 'Fine Arts',
    type: ['solo'],
    image: {
      sources: [
        { srcSet: '/images/contests/fine-arts/art-competition/poster-512x512.webp', type: 'image/webp' },
        { srcSet: '/images/contests/fine-arts/art-competition/poster-512x512.jpeg', type: 'image/jpeg' },
        { srcSet: '/images/contests/fine-arts/art-competition/poster-1024x1024.webp 2x', type: 'image/webp' },
        { srcSet: '/images/contests/fine-arts/art-competition/poster-1024x1024.jpeg 2x', type: 'image/jpeg' },
      ],
      src: '/images/contests/fine-arts/art-competition/poster-512x512.jpeg',
    },
    description: [
      {
        p: "Unleash your creativity and paint your path to glory at the most vibrant canvas of our college fest - the Art Competition! 🎨 Ignite your imagination, wield your brushes, and let your artistic spirit soar as you compete with fellow visionaries in a battle of colors and concepts. From stunning strokes to mind-bending masterpieces, this is your chance to showcase your unique artistic voice and leave an indelible mark on our festival. Whether you're a seasoned artist or a doodler with dreams, the stage is set for you to shine. So dip into your palette of ideas, sketch your dreams, and let the strokes of your brilliance make this event an artistic sensation for all to admire!",
      },
    ],
  },
]

const udaanContests = [...malhar, ...fineArts]

export default udaanContests
