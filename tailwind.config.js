module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        'screen-minus': 'calc(100vh)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
