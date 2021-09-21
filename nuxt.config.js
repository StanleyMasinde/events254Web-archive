/* eslint-disable nuxt/no-cjs-in-config */
const colors = require('vuetify/lib/util/colors').default
module.exports = {
  // Nuxt server
  server: {
    port: process.env.PORT || 3000,
    host: 'localhost',
    timing: false
  },

  generate: {
    fallback: true
  },

  // disable ssr
  // ssr: false,

  // target: 'static',

  // Vue router
  router: {
    middleware: ['auth']
  },

  /**
   * The loading indicator
   */
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#3B8070',
    background: 'white'
  },

  /**
   * modern property
   */
  modern: true,

  /** Page transition */
  pageTransition: 'page',

  /** Allow auto component imports */
  components: true,

  /** Application mode */
  // ssr: false,

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: null,
    title: 'Events254',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@events254ke' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://res.cloudinary.com/streetcoder/image/upload/v1622115318/events254/icon_v52vzr.png'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#49c5b6' },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    '~/plugins/veevalidate.js',
    '~/plugins/moment.js',
    { src: '~/plugins/matomo.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // PWA
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Auth
    '@nuxtjs/auth-next',
    // Site maps module
    '@nuxtjs/sitemap',
    // HTTP module
    '@nuxt/http',
    // Sentry https://sentry.nuxtjs.org/
    '@nuxtjs/sentry'
  ],
  // Vuetify config
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#ff8601',
          accent: '#49c5b6',
          secondary: colors.blue.accent1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: {
      font: {
        family: 'Poppins'
      },
      icons: 'mdi'
    }
  },

  /*
  * Sentry config
  */
  sentry: {
    dsn: 'https://6aaa64b176a0433da7cb306409587b56@o954334.ingest.sentry.io/5903368',
    release: 'v1.0.0',
    environment: 'production',
    ignoreErrors: []
  },

  /**
   * PWA options
   *
   */
  pwa: {
    meta: {
      name: 'Events254',
      theme_color: '#49c5b6',
      ogDescription: 'Events254 is an application for event organisers and anyone who is looking for something to do',
      ogHost: 'events.opensource254.co.ke',
      twitterCard: 'summary',
      twitterSite: '@stanleymasinde_'
    },
    manifest: {
      name: 'Events254'
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '/events/.*',
          strategyOptions: {
            cacheName: 'events-cache'
          },
          strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 100,
              maxAgeSeconds: 300
            }
          }]
        }
      ]
    }
  },
  /**
   * Sitemap
   * https://sitemap.nuxtjs.org/guide/configuration
   */
  sitemap: {
    hostname: 'https://events254.co.ke'
  },
  /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
  axios: {},

  /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
  auth: {
    strategies: {
      cookie: {
        user: {
          property: 'user'
        },
        cookie: {
          options: {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            expires: 365 * 24 * 60 * 60 * 1000
          }
        },
        endpoints: {
          login: { url: '/auth/login', method: 'POST' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' }
        }
      }
    }
  },
  /*
     ** Build configuration
     */
  build: {
    transpile: ['vee-validate', 'moment-timezone']
    /*
       ** You can extend webpack config here
       */
  }
}
