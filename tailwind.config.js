/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['VT323', 'monospace'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        retro: {
          bg: '#F2F0E9',
          border: '#1A1A1A',
          text: '#1A1A1A',
          gray: '#8A8A8A',
          blue: '#3A6EA5',
          green: '#4A7C59',
          orange: '#D47A43',
          red: '#C13030',
          yellow: '#E6C229'
        }
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px #1A1A1A',
        'retro-sm': '2px 2px 0px 0px #1A1A1A',
        'retro-hover': '2px 2px 0px 0px #1A1A1A',
        'retro-active': '0px 0px 0px 0px #1A1A1A',
      }
    },
  },
  plugins: [],
}
