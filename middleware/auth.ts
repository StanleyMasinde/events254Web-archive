export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) {
        return;
    }

    const authState = useAuth();
    localStorage.setItem('lastPath', to.path);
    const token = localStorage.getItem('auth.token');
    const authToken = token
    if (authToken) {
        authState.value.token = token
        authState.value.name = localStorage.getItem('auth.name');
        authState.value.email = localStorage.getItem('auth.email');
        authState.value.username = localStorage.getItem('auth.username');
        authState.value.bio = localStorage.getItem('auth.auth.bio');
        return;
    }
    if (to.path === '/login' || to.path === '/register') {
        return;
    }
    return navigateTo('/login');
})