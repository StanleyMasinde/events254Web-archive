export default defineNuxtPlugin(nuxtApp => {
    setTimeout(async () => {
        try {
            const { data } = await nuxtApp.vueApp.$nuxt.$axios.get('/auth/user')
            localStorage.setItem('auth', true)
            localStorage.setItem('name', JSON.stringify(data.user.name))
            localStorage.setItem('email', JSON.stringify(data.user.email))
            localStorage.setItem('username', JSON.stringify(data.user.username))
        } catch (e) {
            console.log(e.response);
            localStorage.setItem('auth', false)
        }
    }, 500)
})