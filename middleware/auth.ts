export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) {
        return;
    }

    const authState = useAuth()
    localStorage.setItem('lastPath', to.path);
    const token = useCookie('Authorization').value
    const authToken = token
    if (authToken) {
        return;
    }
    if (to.path === '/login?next=' || to.path === '/register') {
        return;
    }
    return navigateTo(`/login/?next=${to.path}`);
})