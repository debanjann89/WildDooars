/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#112615',
          900: '#1b3b22',
          800: '#2d5a37',
        },
        amber: {
          400: '#d49b35',
          500: '#b88224',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
