import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Events254 - Events and meetups near you',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Find activities, meetups, and more in your city. Sell your tickets, or buy them for free. Find a local event, or create a new one. Find people, or create a new event. The possibilities are endless!' }
            ]
        }
    },

    modules: [
        '@nuxtjs/tailwindcss',
    ],

    css: [
        '~/assets/tailwind.css',
    ],

})
