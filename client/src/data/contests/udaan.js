const malhar = [
  {
    id: 17,
    slug: 'battle-of-bands',
    name: 'Battle of Bands',
    type: ['solo'],
    image: {
      src: '/images/contests/fine_arts/magic_of_fingers/poster-1164x1164.jpeg',
    },
    description: [{ p: '' }],
  },
]

const fineArts = [
  {
    id: 2,
    slug: 'art-competition',
    name: 'Art Competition',
    type: ['solo'],
    image: {
      src: '/images/contests/malhar/solo_singing/poster-1-1024x1024.jfif',
    },
    description: [
      {
        p: "Unleash your creativity and paint your path to glory at the most vibrant canvas of our college fest - the Art Competition! 🎨 Ignite your imagination, wield your brushes, and let your artistic spirit soar as you compete with fellow visionaries in a battle of colors and concepts. From stunning strokes to mind-bending masterpieces, this is your chance to showcase your unique artistic voice and leave an indelible mark on our festival. Whether you're a seasoned artist or a doodler with dreams, the stage is set for you to shine. So dip into your palette of ideas, sketch your dreams, and let the strokes of your brilliance make this event an artistic sensation for all to admire!",
      },
    ],
  },
]

const udaanContests = [...fineArts, ...malhar]

export default udaanContests
