const CACHE_NAME = 'bipolar-puk-v5';
const CORE_ASSETS = [
  '/',
  '/shared.css',
  '/main.js',
  '/search.js',
  '/search-index.js',
  '/fonts/lora-v37-latin-regular.woff2',
  '/fonts/lora-v37-latin-600.woff2',
  '/fonts/source-sans-3-v19-latin-regular.woff2',
  '/fonts/source-sans-3-v19-latin-600.woff2',
  '/modul/1/',
  '/modul/2/',
  '/modul/3/',
  '/modul/4/',
  '/modul/5/',
  '/modul/6/',
  '/modul/7/',
  '/handouts/',
  '/handouts/notfall/',
  '/handouts/ressourcen/',
  '/handouts/impressum/',
  '/404.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
