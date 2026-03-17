const CACHE_NAME = 'bipolar-puk-v14';
const CORE_ASSETS = [
  '/',
  '/shared.css',
  '/main.js',
  '/init.js',
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
  '/modul/8/',
  '/handouts/',
  '/handouts/notfall/',
  '/handouts/ressourcen/',
  '/handouts/impressum/',
  '/404.html'
];

// Netlify redirects these shortcut URLs (301) to /handouts/... paths.
// Offline the redirect doesn't work, so we resolve them in the SW.
const REDIRECT_MAP = {
  '/notfall/':    '/handouts/notfall/',
  '/notfall':     '/handouts/notfall/',
  '/impressum/':  '/handouts/impressum/',
  '/impressum':   '/handouts/impressum/',
  '/ressourcen/': '/handouts/ressourcen/',
  '/ressourcen':  '/handouts/ressourcen/'
};

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

  const offline503 = () => new Response('Offline – bitte später erneut versuchen.', {
    status: 503, headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
  });

  // Resolve shortcut URLs that Netlify normally redirects
  const url = new URL(e.request.url);
  const target = REDIRECT_MAP[url.pathname];
  if (target) {
    const redirected = new Request(new URL(target, url.origin));
    e.respondWith(
      caches.match(redirected).then(cached => {
        const fetchPromise = fetch(e.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(redirected, clone));
          }
          return response;
        }).catch(() => cached || offline503());
        return cached || fetchPromise;
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => cached || offline503());
      return cached || fetchPromise;
    })
  );
});
