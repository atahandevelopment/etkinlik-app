module.exports = {
  content: [
    './screens/**/*.{html,js}',
    './components/**/*.{html,js}',
    './assets/**/*.{png,ttf}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
