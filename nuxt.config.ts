import fs from "node:fs"
import childProcess from "node:child_process"
import crypto from "node:crypto"

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


    // https://v3.nuxtjs.org/api/configuration/nuxt.config#hooks
    hooks: {
        "build:done": ((b: { nuxt: { options: { dev?: any; buildDir?: any; rootDir?: any } } }) => {
            if (b.nuxt.options.dev) {
                return
            }

            const { buildDir, rootDir } = b.nuxt.options
            childProcess.exec(`ls ${buildDir}/dist/client/_nuxt`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                }

                const assetsArry = stdout.split('\n')
                const unwanted = ['icons', 'images']
                const filteredAssets = assetsArry.filter((value, index) => {
                    return !unwanted.includes(value)
                })
                const assets = filteredAssets.splice(0, filteredAssets.length - 1)

                fs.readFile(`${rootDir}/assets/sw.stub.js`, (err, data) => {
                    if (err) {
                        console.error(err);
                    }

                    const sw = Buffer.from(data).toString()
                    const hash = crypto.randomBytes(7).toString("base64url")
                    const newSW = sw.replace("'<--cacheAssets-->'", assets.map((value) => {
                        return `"/_nuxt/${value}"`
                    })
                        .join())
                        .replace('cache-v1', hash)
                        .replace('#{date}', new Date().toString())

                    fs.writeFile(`${rootDir}/public/sw.js`, newSW, (err => {
                        if (err) {
                            console.error(err);
                        }
                    }))
                })

            })
        }),
    }
})
