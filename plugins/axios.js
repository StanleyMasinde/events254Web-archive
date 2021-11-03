export default function ({ $axios, redirect, store, route }, inject) {
  $axios.defaults.baseURL = process.env.API_URL
  $axios.defaults.headers.common.Accept = 'application/json'
  $axios.defaults.withCredentials = true
  $axios.defaults.headers.common['X-Api-Key'] = process.env.API_KEY
  $axios.onRequest((config) => {
    store.commit('setLoading', true)
  })
  $axios.onResponse((response) => {
    store.commit('setLoading', false)
  })

  // TODO enable these interceptors later
  //   $axios.onRequest(() => {
  //     store.commit('loading', true)
  //   })

  //   $axios.onResponse(() => {
  //     store.commit('loading', false)
  //   })

//   $axios.onError(() => {
//     store.commit('loading', false)
//   })
}
