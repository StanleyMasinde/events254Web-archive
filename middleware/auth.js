export default defineNuxtRouteMiddleware((to, from) => {
    if(process.server) {
        return;
    }

    const authState = useAuth();
    localStorage.setItem('lastPath', to.path);
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
        authState.isAuthenticated = true;
        authState.name = localStorage.getItem('name');
        authState.email = localStorage.getItem('email');
        return;
    }
    if (to.path === '/login' || to.path === '/register') {
        return;
    }
    return navigateTo('/login');
})