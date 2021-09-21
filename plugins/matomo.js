import Vue from 'vue'
import Matomo from 'vue-matomo'

export default ({ app, store }) => {
  let email
  const user = store.state.auth.user
  if (user) {
    email = user.email
  } else {
    email = undefined
  }
  Vue.use(Matomo, {
    router: app.router,
    siteId: 1,
    host: 'https://analytics.opensource254.co.ke',
    userId: email,
    trackSiteSearch: false
  })
}
