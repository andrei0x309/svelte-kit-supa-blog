const CACHE_NAME = 'blog-flashsoft-eu-cache-v1';

const ASSETS_TO_CACHE = [
  '/',
  // Add other critical static assets if needed, or let runtime caching handle it
];

// Install event - caching base assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network-first strategy with cache fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests or browser extensions
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        // Clone and cache the fresh response if valid
        if (response?.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          
          try {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(event.request, responseToCache);
          } catch (err) {
            console.warn('Caching failed:', err);
          }
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails (offline mode)
        return caches.match(event.request);
      })
  );
});