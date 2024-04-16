/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amsterdam': ['Amsterdam', 'sans-serif'],
        'montserrat': ['Montserrat Thin', 'sans-serif'],
        'italina': ['Italina', 'sans-serif'],
      },
    },
  },
  plugins: [],
}