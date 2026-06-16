/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AMOLED pitch black and dark neutral shades
        black: "#000000",
        dark: {
          900: "#050505",
          800: "#0a0a0a",
          700: "#121212",
          600: "#1a1a1a",
          500: "#262626"
        },
        // Premium grey shades
        grey: {
          100: "#f5f5f7",
          200: "#e5e5ea",
          300: "#d1d1d6",
          400: "#aeaeb2",
          500: "#8e8e93",
          600: "#636366",
          700: "#48484a",
          800: "#3a3a3c",
          900: "#1c1c1e"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        wide: ".025em",
        wider: ".05em",
        widest: ".1em",
        cinematic: ".25em"
      },
      backgroundImage: {
        'noise': "url('/noise.png')", // optional CSS grain
      }
    },
  },
  plugins: [],
}
