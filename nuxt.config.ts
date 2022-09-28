import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Evensts254 - Your one stop shop for all things events',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Find activities, meetups, and more in your city. Sell your tickets, or buy them for free. Find a local event, or create a new one. Find people, or create a new event. The possibilities are endless!' },
                { hid: 'theme-color', property: 'theme-color', content: '#ff8601' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'manifest', href: '/manifest.json'}
            ],
            script: [
                { src: `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&libraries=places` }
            ]
        }
    },

    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            apiKey: process.env.API_KEY,
            release: process.env.npm_package_version,
            environment: process.env.NODE_ENV
        }
    },

    modules: [
        '@nuxtjs/tailwindcss',
    ],
})
