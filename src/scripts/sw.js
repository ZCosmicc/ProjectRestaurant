import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/icon-144x144.png',
  './icons/icon-150x150.png',
  './icons/icon-192x192.png',
  './icons/icon-200x200.png',
  './icons/icon-300x300.png',
  './icons/icon-400x400.png',
  './icons/icon-512x512.png',
  './icons/icon-600x600.png',
  './index.html',
  './krustyKrab.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
