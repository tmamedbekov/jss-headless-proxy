//Cache first Strategy

const cacheName = 'cache-jss';
const resourcesToPrecache = [
    '/',
    'index.html'
];

self.addEventListener('install', event => {
    console.log('Service Worker Install Event!');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activate Event!');
});
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
    })
    );
    // console.log('Fetch Intercepted:', event.request.url);
});

