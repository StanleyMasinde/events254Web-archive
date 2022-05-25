export const useAuth = () => {
    return useState('auth', () => {
        if (process.client) {
            const auth = localStorage.getItem('auth');
            const user = {
                isAuthenticated: auth === 'true',
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
            }

            return user;
        }

        return {
            isAuthenticated: false,
            name: '',
            email: '',
        }
    });
}

export const useLogout = () => {
    return () => {
        if (process.client) {
            const { $axios } = useNuxtApp()
            $axios.post('/auth/logout').then(() => {
                localStorage.setItem('auth', false);
                localStorage.removeItem('auth');
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                location.reload();
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}