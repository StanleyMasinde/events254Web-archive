export const useAuth = () => {
    return useState('auth',() => {
        const auth = localStorage.getItem('auth');
        const user = {
            isAuthenticated: auth === 'true',
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
        }

        return user;
    });
}