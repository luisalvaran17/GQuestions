module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        danger: '#ff5f40',
        yellowlight: '#FFE3C1',
        yellowmain: '#FE9A22',
        yellowBackground: '#FF9B23',
        purplelight: '#EEEFF4',
        cyanlight: '#D5FAFC',
        cyanmain: '#2EC5CE',
        blueFooter: "#000817",
        darkColor: '#18191F',
        darkGrayColor: '#474A57',
      },
      fontFamily: {
        manrope: ['Manrope',],
        asap:['Asap']
      },
      backgroundImage: theme => ({
        'hero-dark': "url('../images/background_home_2x_dark.png')",
        'hero-light': "url('../images/background_home_2x.png')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
