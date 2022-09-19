export default defineNuxtRouteMiddleware((to, from) => {
    if(process.server) {
        return;
    }

    const authState = useAuth().value
    localStorage.setItem('lastPath', to.path);
    const auth = localStorage.getItem('auth.token');
    if (auth) {
        authState.name = localStorage.getItem('auth.name');
        authState.email = localStorage.getItem('auth.email');
        authState.username = localStorage.getItem('auth.username')
        authState.bio = localStorage.getItem('auth.bio')
        return;
    }
    return
})