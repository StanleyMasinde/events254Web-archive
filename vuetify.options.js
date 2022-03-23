const colors = require('vuetify/lib/util/colors').default

export default function () {
  const getPreferedTheme = () => {
    if (process.server) {
      return 'light'
    }
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'light'
      }
      return 'light'
    }
  }

  return {
    theme: {
      dark: getPreferedTheme() === 'dark',
      themes: {
        light: {
          primary: '#ff6601',
          accent: '#01FF86',
          secondary: '#8601FF',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: '#5D3000',
          accent: '#005D30',
          secondary: '#30005D',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: {
      font: {
        family: 'Montserrat'
      },
      icons: 'mdi'
    }
  }
}
