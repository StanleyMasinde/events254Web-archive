export default defineNuxtPlugin(nuxtApp => {
    setTimeout(async () => {
        try {
            const { data } = await nuxtApp.vueApp.$nuxt.$axios.get('/auth/user')
            localStorage.setItem('auth', true)
            localStorage.setItem('name', data.user.name)
            localStorage.setItem('email', data.user.email)
            localStorage.setItem('username', data.user.username)
        } catch (e) {
            console.log(e.response);
            localStorage.setItem('auth', false)
            localStorage.setItem('name', '')
            localStorage.setItem('email', '')
            localStorage.setItem('username', '')
        }
    }, 500)
})