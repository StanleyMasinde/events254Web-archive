/*
* ---------------------------------------------------------------------------------------------------
* Service worker stub for PWA. 
* This file contains the Service worker for the application.
* It handles GET request by serving them from cache while proxying POST Requests to the API server
* ---------------------------------------------------------------------------------------------------
* Generated on // #{date}
*/
'use strict';
const generatedAssets = ['<--cacheAssets-->'];
const cacheName = 'cache-v1';
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
