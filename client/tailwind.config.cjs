/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      screens: {
        '2xs': '360px',
        xs: '420px',
      },
      colors: {
        darkBrown: '#241711', // background
        brown: '#34190d', // auth background
        ochre: '#ffbd59', // navbar items
      },
      containers: {
        '2xs': '16rem',
      },
      spacing: {
        cover: 'calc(100vh - 100px)',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
