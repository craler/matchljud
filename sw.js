// Matchljud service worker.
// The app opens instantly from the cache, even on bad sports-hall Wi-Fi, and fetches the
// newest version in the background. When the page itself has changed, a time-stamped note
// is left in the cache; the app reads it and offers a reload.
const CACHE = 'matchljud-app';
const FILES = ['./', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const stamp = r => (r ? (r.headers.get('etag') || r.headers.get('last-modified') || r.headers.get('content-length') || '') : '');

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  let key = url.origin + url.pathname.replace(/index\.html$/, '');   // one entry per file: ignore ?code=… from the Spotify login
  const isPage = key.endsWith('/');
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(key);
    const fresh = fetch(e.request, { cache: 'no-cache' }).then(async r => {
      if (!r || !r.ok) return r;
      await cache.put(key, r.clone());
      // The page that is open right now came from the old copy. Leave a note it can find.
      if (isPage && hit && stamp(hit) && stamp(hit) !== stamp(r)) await cache.put(self.registration.scope + '__update', new Response(String(Date.now())));
      return r;
    }).catch(() => null);
    if (hit) { e.waitUntil(fresh); return hit; }
    return (await fresh) || new Response('Offline', { status: 503, statusText: 'Offline' });
  })());
});
