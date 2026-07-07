/* WB Hub · Service Worker — cache เปลือกแอป, ไม่ยุ่งกับ API (/exec) */
var CACHE = 'wbhub-v1';
var SHELL = ['./', './index.html', './manifest.json',
             './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = req.url;
  // ── ห้าม cache: เรียก backend Apps Script (ข้อมูลสด) → ไป network ตรงๆ ──
  if (url.indexOf('script.google.com') > -1 || url.indexOf('/macros/') > -1 || url.indexOf('/exec') > -1) {
    return; // ปล่อยให้ browser จัดการปกติ
  }
  if (req.method !== 'GET') return;
  // ── navigation (เปิดแอป) → network ก่อน, ออฟไลน์ค่อยใช้ index.html ที่ cache ──
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  // ── static อื่นๆ → cache ก่อน, ไม่มีค่อย network ──
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) {
      if (res && res.status === 200 && res.type === 'basic') {
        var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function(){ return hit; });
  }));
});
