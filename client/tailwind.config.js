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
      animation: {
        'border-slide': 'border-slide 5s infinite linear',
      },
      keyframes: {
        'border-slide': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
  },
  plugins: [],
}