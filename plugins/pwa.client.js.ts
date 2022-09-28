interface ServiceWorkerMessage {
    type: string,
    title: string,
    content?: string
}
export default defineNuxtPlugin((nuxtApp) => {
    /**
     * Register service worker
     */
     if ('serviceWorker' in navigator) {
        if (process.env.NODE_ENV === 'production') {
            navigator.serviceWorker.register('/sw.js')
                .then(function (registration) {
                    registration.onupdatefound = (e) => {
                        console.log(e);
                        // TODO: How do we show this to the user?
                    }
                    console.log('Service worker for scope: ', registration.scope);
                })
                .catch(function (error) {
                    console.log('Service worker registration failed: ', error);
                });

            navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
                const message: ServiceWorkerMessage = event.data
                console.log(message);
            });
        }
    }
})
