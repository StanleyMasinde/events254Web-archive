/* eslint-disable nuxt/no-cjs-in-config */
const colors = require('vuetify/lib/util/colors').default
const axios = require('axios').default
module.exports = {
  // Nuxt server
  server: {
    port: process.env.PORT || 3000,
    host: 'localhost',
    timing: true
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
      { name: 'twitter:creator', content: '@events254ke' },
      { name: 'twitter:title', content: 'Events254' },
      { hid: 'description', name: 'description', content: 'Find activities, meetups, and more in your city. Sell your tickets, or buy them for free. Find a local event, or create a new one. Find people, or create a new event. The possibilities are endless!' },
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
          accent: '#01FF86',
          secondary: '#8601FF',
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
      ogHost: 'events254.co.ke',
      twitterSite: '@events254ke',
      twitterCreator: '@events254ke'
    },
    manifest: {
      name: 'Events254',
      short_name: 'Events254',
      lang: 'en',
      display: 'standalone',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#49c5b6'
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
        },
        {
          urlPattern: 'https://res.cloudinary.com/.*',
          strategyOptions: {
            cacheName: 'cloudinary-cache'
          },
          strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 100,
              maxAgeSeconds: 3600
            }
          }]
        },
        {
          urlPattern: 'https://api.events254.co.ke/.*',
          strategyOptions: {
            cacheName: 'api-cache'
          },
          strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 100,
              maxAgeSeconds: 3600
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
    hostname: 'https://events254.co.ke',
    gzip: true,
    exclude: [],
    routes: async () => {
      try {
        const { data } = await axios.get(process.env.API_URL + '/events')
        const users = await axios.get(process.env.API_URL + '/users')
        const groups = await axios.get(process.env.API_URL + '/groups')

        const usersArray = users.data.data.map((user) => {
          return {
            url: `/u/${user.id}`,
            changefreq: 'daily',
            priority: 0.8
          }
        })

        const groupsArray = groups.data.data.map((group) => {
          return {
            url: `/${group.slug}`,
            changefreq: 'daily',
            priority: 0.8
          }
        })
        const routes = data.map((event) => {
          return {
            url: `/events/${event.id}`,
            changefreq: 'daily',
            priority: 0.8
          }
        })
        return routes.concat(usersArray).concat(groupsArray)
      } catch (error) {
        console.log(error)
      }
    }
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
          logout: { url: '/auth/logout', method: 'POST' },
          user: { url: '/auth/user', method: 'GET' }
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
