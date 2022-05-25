export default defineNuxtRouteMiddleware((to, from) => {
    if(process.server) {
        return;
    }
    
    localStorage.setItem('lastPath', to.path);
    const auth = localStorage.getItem('auth');
    console.log(`auth: ${auth}`);
    if (auth === 'true') {
        console.log('auth: true');
        navigateTo('/');
    }
    return
})