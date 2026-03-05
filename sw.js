/* ═══════════════════════════════════════════════════════════════
   SUPERSTAR OS — SERVICE WORKER v5.0
   Hollywood Superstar Protocol · PWA Offline Engine
   Strategy: Cache-First for assets, Network-First for HTML
   ═══════════════════════════════════════════════════════════════ */

const CACHE_NAME      = 'superstar-os-v5';
const STATIC_CACHE    = 'superstar-static-v5';
const RUNTIME_CACHE   = 'superstar-runtime-v5';

/* Assets to pre-cache on install */
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
];

/* CDN resources to cache at runtime */
const CDN_ORIGINS = [
  'cdnjs.cloudflare.com',
];

/* ── INSTALL ─────────────────────────────────────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return Promise.allSettled(
          PRECACHE_URLS.map(url =>
            cache.add(url).catch(err => {
              console.warn('[SW] Pre-cache failed for:', url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE ────────────────────────────────────────────────────────────── */
self.addEventListener('activate', event => {
  const validCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => !validCaches.includes(key))
            .map(key => {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

/* ── FETCH ───────────────────────────────────────────────────────────────── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* Skip non-GET, chrome-extension, and data URIs */
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;
  if (url.protocol === 'data:') return;

  /* CDN resources — Cache First, then network */
  if (CDN_ORIGINS.some(origin => url.hostname.includes(origin))) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  /* Same-origin HTML — Network First (keeps app up to date) */
  if (url.origin === self.location.origin && request.destination === 'document') {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  /* Same-origin assets — Cache First */
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
});

/* ── STRATEGIES ──────────────────────────────────────────────────────────── */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] Cache-first network fail:', request.url);
    return new Response('Offline — resource unavailable', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    console.warn('[SW] Network-first full fail:', request.url);
    return new Response('Offline — check your connection', { status: 503 });
  }
}

/* ── MESSAGE HANDLER ─────────────────────────────────────────────────────── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
