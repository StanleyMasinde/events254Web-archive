export const useAuth = () => {


    interface AuthUser {
        id: number,
        name: string,
        email: string,
        username: string,
        token: string,
        bio?: string
    }
    return useState('auth', (): AuthUser => {
        if (process.client) {
            const user: AuthUser = {
                id: +localStorage.getItem('auth.id'),
                name: localStorage.getItem('auth.name'),
                email: localStorage.getItem('auth.email'),
                username: localStorage.getItem('auth.username'),
                token: useCookie('Authorization').value || null,
                bio: localStorage.getItem('auth.bio')
            }

            return user;
        }

        return {
            id: null,
            name: null,
            email: null,
            token: null,
            username: null
        }
    });
}

export const useLogout = () => {
    return () => {
        if (process.client) {
            useCookie('Authorization').value = null
            localStorage.removeItem('auth.name')
            localStorage.removeItem('auth.email')
            localStorage.removeItem('auth.username')
            location.reload();
        }
    }
}