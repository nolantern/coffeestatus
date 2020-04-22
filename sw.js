/*
To limit number of dynamic cached files change cacheDynSize
-1 to disable limitation
*/
const cacheDynSize = -1;

/*
To update service worker and refreshe cache increase ...CacheName version
*/
const staticCacheName = 'site-static-v5';
const dynamicCacheName = 'site-dynamic-v5';

// static cached assets
// todo assets anpassen
// cache external content
const assets = [
    '.',
    './index.html',
    './manifest.json',
    './js/app.js',
    './js/ui.js',
    './css/styles.css',
    // TODO '/pages/fallback.html',
    // external resources
    // materil icon css and icons
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    // material components
    'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css',
    'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js',
    // materialize
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
];

/*
cache size limit funcition
    if cache.keys.lenght > size delete oldest and check again
*/
const limitCacheSize = (name, size) => {
    if (size !== -1) {
        caches.open(name).then(cache => {
            cache.keys().then(keys => {
                if (keys.length > size) {
                    cache.delete(keys[0]).then(limitCacheSize(name, size))
                }
            })
        })
    }
};

// install service worker
self.addEventListener('install', evt => {
    //console.log('service worker as been installed')

    /* 
    caching static assets everytime a new service worker installes 
    wait for the caching to finish before stopping the install event
    */
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// listen activate event
self.addEventListener('activate', evt => {
    //console.log('serviceworker has been activated')

    /*
    Cache versioning - remove old cache versions
    */
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            // only return when all (sub)promises returned (keep alive)
            return Promise.all(keys
                // create a array of old caches
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                // delete old caches and return (sub)promises
                .map(key => caches.delete(key))
            );
        })
    );
});

// listen for fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt)

    // only cache if it's no firebase request
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {


        /*
        Use cached assets
        1. check if asset is cached
        2. if is cached return it else start the fetch request to server and cache this page.
        3. show fallback 
        */

        evt.respondWith(
            // if asset is cached respond it else fetch it ...
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    //...  cache it it in dynamicCacheName and respond it
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, cacheDynSize)
                        return fetchRes;
                    })
                });
            })
                // if cache and fetching fails, return 'fallback' assets
                .catch(() => {
                    // fallback.html
                    if (evt.request.url.indexOf('.html') > -1) {
                        return caches.match('/pages/fallback.html');
                    }
                    /* example for further usage
                    // fallback.png
                        if (evt.request.url.indexOf('.png') > -1) {
                        return caches.match('/images/fallback.png');
                    }
                     */
                })
        );
    }
});
