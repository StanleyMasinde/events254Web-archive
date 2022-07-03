export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) {
        return;
    }

    const authState = useAuth()
    localStorage.setItem('lastPath', to.path);
    const token = localStorage.getItem('auth.token');
    const authToken = token
    if (authToken) {
        return;
    }
    if (to.path === '/login' || to.path === '/register') {
        return;
    }
    return navigateTo('/login');
})