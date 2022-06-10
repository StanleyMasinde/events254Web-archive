import axxios from 'axios'
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const axios = axxios.create({
    baseURL: config.public.apiUrl,
    withCredentials: true
  })
  axios.defaults.headers.common['x-api-key'] = config.public.apiKey
  return {
    provide: {
      axios: axios
    }
  }
})