/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3A00B0",
          300: "#29007D",
          900: "#120037",
        },
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      }
    }
  },
  plugins: []
}
