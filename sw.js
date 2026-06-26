/**
 * Antigravity Engineering - PWA Cache Service Worker
 */

const CACHE_NAME = 'jay-cyber-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/experience.html',
  '/cyberlab.html',
  '/writeups.html',
  '/contact.html',
  '/resume.html',
  '/404.html',
  '/assets/css/variables.css',
  '/assets/css/main.css',
  '/assets/css/components.css',
  '/assets/css/animations.css',
  '/assets/css/terminal.css',
  '/assets/css/pages.css',
  '/assets/css/responsive.css',
  '/assets/js/utils.js',
  '/assets/js/loader.js',
  '/assets/js/particles.js',
  '/assets/js/cursor.js',
  '/assets/js/theme.js',
  '/assets/js/scroll.js',
  '/assets/js/terminal.js',
  '/assets/js/projects.js',
  '/assets/js/main.js',
  '/assets/js/animations.js',
  '/assets/data/projects.json',
  '/assets/data/skills.json',
  '/assets/data/experience.json',
  '/assets/data/blog.json',
  '/manifest.json'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching Application Shell...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Expired Cache Key:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event (Cache First, Network Fallback)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        // Fallback for document pages if offline
        if (e.request.mode === 'navigate') {
          return caches.match('/404.html');
        }
      });
    })
  );
});
