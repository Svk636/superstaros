// Hollywood Superstar Protocol — Service Worker v1.0
const CACHE_NAME = 'superstar-os-v1.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js'
];

// Install — cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS.map(url => new Request(url, {cache: 'reload'}))))
      .catch(err => {
        // Partial failure is ok — cache what we can
        console.log('[SW] Partial cache fail:', err);
        return caches.open(CACHE_NAME).then(cache => 
          Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url).catch(() => {})))
        );
      })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first for app shell, network-first for CDN
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request).then(cached => {
      // Cache hit — return cached + update in background
      if (cached) {
        // Background revalidate
        fetch(event.request).then(resp => {
          if (resp && resp.ok && resp.type === 'basic') {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, resp.clone()));
          }
        }).catch(() => {});
        return cached;
      }
      
      // Not cached — fetch from network
      return fetch(event.request).then(resp => {
        if (!resp || !resp.ok) return resp;
        // Cache successful responses
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return resp;
      }).catch(() => {
        // Offline fallback
        return caches.match('./index.html');
      });
    })
  );
});

// Background sync for data (future use)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Background sync triggered');
  }
});
