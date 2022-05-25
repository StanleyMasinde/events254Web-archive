export default defineNuxtRouteMiddleware((to, from) => {
    console.log('auth middleware');
    console.log(`auth middleware: to: ${to.path} from: ${from.path}`);

    if(process.server) {
        return;
    }
    
    localStorage.setItem('lastPath', to.path);
    const auth = localStorage.getItem('auth');
    if (auth === 'true') {
        return;
    }
    if (to.path === '/login' || to.path === '/register') {
        return;
    }
    return navigateTo('/login');
})