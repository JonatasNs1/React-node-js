/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Intes', 'sans-serif']
      },
      backgroundImage:{
        galaxy:"url('/backgroundgalaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FFC 27.08%, #43E7AD 33.94%, #EAD55D 48.57%)',
      'game-gradient': 'linear-gradient(180deg, rgba(0,0,0) 8%, rgba(0,0,0,0.9) 67.88%)',
      }
    },
  },
  plugins: [],
}
