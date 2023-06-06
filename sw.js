// cache logic to run the app offline

const cacheName = "cache-v1";
const resourcesToPrecache = [
    "./",
    "./index.html",
    "./js/mainPage.js",
    "./js/minesweeperLogic.js",
    "./js/minesweeperUi.js",
    "./css/mainPage.css",
    "./css/minesweeperPage.css",
    "./images/1.png",
    "./images/2.png",
    "./images/3.png",
    "./images/4.png",
    "./images/5.png",
    "./images/6.png",
    "./images/7.png",
    "./images/8.png",
    "./images/emptyTile.png",
    "./images/flag.png",
    "./images/mine.png",
    "./images/poster.png",
    "./images/explosion.mp3",
    "./images/miss.mp3",
    "./images/minesweeperGameplay.mp4",
    "./images/nuclear-explosion-svgrepo-com.svg"
];

self.addEventListener("install", event => {
    console.log("Service worker install event!");
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});