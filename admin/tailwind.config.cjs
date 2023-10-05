/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,ts,vue,css}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
