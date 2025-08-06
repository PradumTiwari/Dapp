// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
   theme: {
    extend: {
      colors: {
        jade: {
          100: '#DAF1DE',
          500: '#4E8D6B',
          600: '#235347',
          700: '#163832',
          800: '#0E2B26',
          900: '#051F20',
        },
      },
      backgroundImage: {
        'jade-gradient': 'linear-gradient(to bottom, #DAF1DE, #4E8D6B, #235347, #163832, #0E2B26, #051F20)',
      },
    },
  },
  plugins: [],
}
