/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        darkBrown: '#241711', // background
        brown: '#34190d', // auth background
        ochre: '#ffbd59', // navbar items
        "prime-yell": "#6B3600",
        "sec-yell": "#8A6524",
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'MyFont': ['"My Font"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
