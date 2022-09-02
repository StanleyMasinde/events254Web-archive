export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) {
        return;
    }

    localStorage.setItem('lastPath', to.path);
    const token = useCookie('Authorization').value.split(' ')[1]
    if (token) {
        navigateTo('/');
    }
    return
})