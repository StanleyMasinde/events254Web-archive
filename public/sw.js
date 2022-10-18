/*
* ---------------------------------------------------------------------------------------------------
* Service worker stub for PWA. 
* This file contains the Service worker for the application.
* It handles GET request by serving them from cache while proxying POST Requests to the API server
* ---------------------------------------------------------------------------------------------------
* Generated on // Wed Sep 28 2022 13:57:48 GMT+0300 (East Africa Time)
*/
'use strict';
const generatedAssets = ["/_nuxt/_id_.92a5b26b.js","/_nuxt/_id_.9d7d7bd8.js","/_nuxt/_slug_.e252bcd4.js","/_nuxt/asyncData.2549b203.js","/_nuxt/auth.8471dc9c.js","/_nuxt/auth.c27a7404.js","/_nuxt/create.969d1e1b.js","/_nuxt/createevent.866e7000.js","/_nuxt/default.c26db2d9.js","/_nuxt/entry.7534f953.css","/_nuxt/entry.a3cc3b27.js","/_nuxt/error-404.18ced855.css","/_nuxt/error-404.9b7e48f9.js","/_nuxt/error-500.8a72e68f.js","/_nuxt/error-500.e60962de.css","/_nuxt/error-component.bb3c50ab.js","/_nuxt/event.6145f1c0.js","/_nuxt/guest.f3fe7102.js","/_nuxt/home.ae780c61.js","/_nuxt/index.00322a60.js","/_nuxt/index.3a951f55.js","/_nuxt/index.4d3cd7f5.js","/_nuxt/index.89014a0a.js","/_nuxt/index.a113218d.js","/_nuxt/index.c97f21aa.js","/_nuxt/index.e2248c8c.js","/_nuxt/index.feeb274c.js","/_nuxt/login.e4e5e6f5.js","/_nuxt/manage.3dd6bd1e.js","/_nuxt/matomo.47c78e21.js","/_nuxt/register.d7e9ac6f.js","/_nuxt/request.fcbc896d.js","/_nuxt/rsvps.1ecd7e43.js","/_nuxt/ticket.e24d1a68.js","/_nuxt/tickets.2ba39864.js","/_nuxt/update.ee57527e.js","/_nuxt/vee-validate.esm.1fcb2c0e.js"];
const cacheName = 'dvAILyYhJg';
const cacheAssets = [
    '/',
    '/fallback.html',
    ...generatedAssets];


const addResourcesToCache = async (resources) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
};

const deleteCache = async key => {
    await caches.delete(key)
}

const deleteOldCaches = async () => {
    const cacheKeepList = [cacheName];
    const keyList = await caches.keys()
    const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
    await Promise.all(cachesToDelete.map(deleteCache));
}

const handleResponse = async (event) => {
    try {
        const { method, url } = event.request
        if (method !== 'GET') return await fetch(event.request);
        const responseFromCache = await caches.match(event.request);
        if (responseFromCache) {
            return responseFromCache;
        }
        const getFromServer = await fetch(event.request)
        const cache = await caches.open(cacheName)
        const clone = getFromServer.clone()
        await cache.put(event.request, getFromServer)
        console.log(clone, getFromServer);
        return clone
    } catch (e) {
        console.log(e);
        return await caches.match(new Request('/fallback.html'));
    }
};

self.addEventListener('install', async (event) => {
    event.waitUntil(addResourcesToCache(cacheAssets));
})

self.addEventListener('activate', async (event) => {
    event.waitUntil(deleteOldCaches());
})

self.addEventListener('fetch', async (event) => {
    event.respondWith(handleResponse(event));
})
