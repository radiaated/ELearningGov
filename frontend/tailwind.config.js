/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#1a6985",
          main: "#2596be",
          light: "#51abcb"
        }
      },
      fontFamily: {
        // 'Roboto': ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
}

