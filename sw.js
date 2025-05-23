const CACHE_NAME = 'flowdiary-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
<<<<<<< HEAD
=======
  '/icon-192.png',
  '/icon-512.png',
>>>>>>> 13b4e65f1a3a18537c9ec382c528cbaa7d603f8a
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
