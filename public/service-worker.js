const CACHE_NAME = 'offline-chache';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];


// Install event: digunakan untuk menyimpan aset ke cache saat Service Worker diinstal
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker installing and caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: digunakan untuk menghapus cache lama saat Service Worker diaktifkan
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: mengatur bagaimana permintaan akan ditangani (misalnya, dari cache atau dari jaringan)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});

// 🔔 Handle push notification
self.addEventListener('push', (event) => {
  let data = {};

  try {
    data = event.data.json();
  } catch (e) {
    console.error("Push data parse error:", e);
  }

  const title = data.title || "New Notification";
  const options = {
    body: data.body || "",
    icon: data.icon || "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/profile_pict.jpg",
    badge: data.badge || "https://cdn-icons-png.flaticon.com/64/545/545826.png",
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

navigator.serviceWorker?.getRegistrations().then(r => {
 r.forEach(reg => reg.unregister())
})

// 🎯 Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});
