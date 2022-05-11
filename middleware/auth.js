export default defineNuxtRouteMiddleware((to, from) => {
    console.log('auth middleware');
    console.log(`auth middleware: to: ${to.path} from: ${from.path}`);
    const cookie = useCookie('token');
    if (cookie) {
        console.log('auth middleware: cookie found');
        console.log(`auth middleware: cookie: ${cookie.value}`);
        return;
    }
    console.log('auth middleware: cookie not found');
})