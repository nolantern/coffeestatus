/*
check for service worker support
start service worker if supported
log results
*/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/coffeestatus/sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.log('service worker not registered', err));
}
