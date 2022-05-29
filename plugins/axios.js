import axxios from 'axios'
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const axios = axxios.create({
    baseURL: config.public.apiUrl,
    withCredentials: true
  })
  return {
    provide: {
      axios: axios
    }
  }
})