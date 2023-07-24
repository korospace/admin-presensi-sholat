/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '28.1': '7.1rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '99rem',
        '10xl': '110rem',
      },
    },
  },
  plugins: [],
}
