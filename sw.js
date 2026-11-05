// offline: every file is cached on install; the game loads from the cache (network first for the page, so an update arrives when online)
const V = 'the-way-8b9eabb59a', FILES = ["./", "index.html", "fonts.css", "manifest.webmanifest", "icon-180.png", "icon-512.png", "vendor/three.core.js", "vendor/three.tsl.js", "vendor/three.webgpu.js", "fonts/e0b0cede1e7d.woff2", "fonts/60f4ce416b3e.woff2", "fonts/ac503cf0752e.woff2", "fonts/ca0155047a17.woff2", "fonts/60d1ee22a27c.woff2", "fonts/37dc60ed6fc7.woff2", "fonts/8d0aead6b2c4.woff2", "fonts/d7731959c422.woff2", "fonts/ac98b6aa13b2.woff2", "fonts/9994c10a22bc.woff2"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  if (r.mode === 'navigate') { e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(V).then(k => k.put('index.html', c)); return res; }).catch(() => caches.match('index.html'))); return; }
  e.respondWith(caches.match(r).then(m => m || fetch(r)));
});
