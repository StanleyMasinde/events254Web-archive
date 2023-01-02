import fs from "node:fs"
import childProcess from "node:child_process"
import crypto from "node:crypto"
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
    async setup(_moduleOptions, nuxt) {
        nuxt.hook('build:done', () => {
            const { buildDir, rootDir } = nuxt.options
            // Build the sync script
            if (nuxt.options.dev) {
                return
            }


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
            console.log('build done');
        })
    }
})
