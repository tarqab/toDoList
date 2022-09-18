/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': { 'max': '400px' },
      'sm': { 'max': '640px' },
    },
    extend: {},
  },
  plugins: [],
}
