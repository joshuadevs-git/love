/* ===== EDIT THESE ===== */
const CONFIG = {
  eyebrow: "Hi my fiancée! I have a little message for you",
  name: "Happy 2nd Anniversary",
  message: "Hi langga, Happy Anniversary! First time mag-celebrate nga di ta upod, wala dinner, wala lagaw, kay layo kana. But I made this virtual flowers and message, love, to make our anniversary extra special.\n\nHalong kada wala koda sa tupad mo wala koda kong mag lain matyag mo di kagd mag pang luya love ha amogd na ang gina worry ko, hidlaw hidlaw nako simo, love. Kong pwde lang mag-lupad, ging ubra kona malagpasan.\n\nTagd ni, love, pakabakod lang ta asta matapos ni ang LDR. Asta ma-upod tanaka liwat, dasig lang ni. See you very soon, langga, kay dasun ta nga kitaay di tanaka fiance-wife tanaka.\n\nThank you for your love, your patience, and for staying strong with me even when we're far apart. Salamat gid, langga, sa tanan. I wish I could hug and kiss you right now.\n\nI love you always, palangga ko. Happy 2nd Anniversary.",
  // Your uploaded song: put the file next to index.html and match the name here.
  music: "music.mp3",
  // Slideshow photos: put them in an "images" folder next to index.html.
  // Add or remove lines freely. Optional caption shows under the photo.
  photos: [
    { src: "1.jpg", caption: "" },
    { src: "2.jpg", caption: "" },
    { src: "3.jpg", caption: "" },
    { src: "4.jpg", caption: "" },
    { src: "5.jpg", caption: "" },
    { src: "6.jpg", caption: "" },
    { src: "7.jpg", caption: "" },
    { src: "8.jpg", caption: "" },
    { src: "9.jpg", caption: "" },
    { src: "10.jpg", caption: "" },
    { src: "11.jpg", caption: "" },
    { src: "12.jpg", caption: "" },
    { src: "13.jpg", caption: "" },
    { src: "14.jpg", caption: "" },
    { src: "15.jpg", caption: "" },
    { src: "16.jpg", caption: "" },
    { src: "17.jpg", caption: "" },
    { src: "18.jpg", caption: "" },
    { src: "19.jpg", caption: "" },
    { src: "20.jpg", caption: "" },
    { src: "21.jpg", caption: "" },
    { src: "22.jpg", caption: "" },
    { src: "23.jpg", caption: "" },
    { src: "24.jpg", caption: "" },
    { src: "25.jpg", caption: "" },

  ],
  slideSeconds: 4,
};
/* ====================== */

const $ = (id) => document.getElementById(id);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

/* ---------- Scene (same markup as before, generated) ---------- */
const div = (cls, inner = "", style = "") =>
  `<div class="${cls}"${style ? ` style="${style}"` : ""}>${inner}</div>`;
const rep = (n, fn) => Array.from({ length: n }, (_, i) => fn(i + 1)).join("");

function flower(n, leafsVariant, lineLeaves) {
  const leafs =
    rep(4, (i) => div(`flower__leaf flower__leaf--${i}`)) +
    div("flower__white-circle") +
    rep(8, (i) => div(`flower__light flower__light--${i}`));
  const line = rep(lineLeaves, (i) => div(`flower__line__leaf flower__line__leaf--${i}`));
  return div(`flower flower--${n}`,
    div(`flower__leafs flower__leafs--${leafsVariant}`, leafs) + div("flower__line", line));
}

const grass = (n) => div("growing-grass", div(`flower__grass flower__grass--${n}`,
  div("flower__grass--top") + div("flower__grass--bottom") +
  rep(8, (i) => div(`flower__grass__leaf flower__grass__leaf--${i}`)) +
  div("flower__grass__overlay")));

const grow = (d, inner) => div("grow-ans", inner, `--d:${d}s`);
const longDelays = [
  [3, 2.2, 3.4, 3.6], [3.6, 3.8, 4, 4.2], [4, 4.2, 4.4, 4.6], [4, 4.2, 3, 3.6],
  [4, 4.2, 3, 3.6], [4, 4.2, 3, 3.6], [4.2, 4.4, 4.6, 4.8], [3, 3.2, 3.5, 3.6],
];

$("flowers").innerHTML =
  flower(1, 1, 6) + flower(2, 2, 4) + flower(3, 3, 4) + flower(4, 3, 4) +
  grow(1.2, div("flower__g-long", div("flower__g-long__top") + div("flower__g-long__bottom"))) +
  grass(1) + grass(2) +
  grow(2.4, div("flower__g-right flower__g-right--1", div("leaf"))) +
  grow(2.8, div("flower__g-right flower__g-right--2", div("leaf"))) +
  grow(2.8, div("flower__g-front",
    rep(8, (i) => div(`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i}`, div("flower__g-front__leaf"))) +
    div("flower__g-front__line"))) +
  grow(3.2, div("flower__g-fr",
    div("leaf") + rep(8, (i) => div(`flower__g-fr__leaf flower__g-fr__leaf--${i}`)))) +
  longDelays.map((ds, i) =>
    div(`long-g long-g--${i}`, ds.map((d, j) => grow(d, div(`leaf leaf--${j}`))).join(""))).join("");

const HEART = `<svg class="heart" viewBox="0 0 32 32"><path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"/></svg>`;
$("bubbles").innerHTML = rep(20, () => div("bubble", HEART));


/* ---------- Message ---------- */
$("eyebrow").textContent = CONFIG.eyebrow;
$("name").textContent = CONFIG.name;
$("message").textContent = CONFIG.message;

const modal = $("modal"), photoModal = $("photo-modal");
function setOpen(m, open, focusEl) {
  m.classList.toggle("is-open", open);
  m.setAttribute("aria-hidden", String(!open));
  if (focusEl) focusEl.focus();
}
const setModal = (open) => { setOpen(modal, open, open ? $("close-msg") : $("open-msg")); };

/* ---------- Music ---------- */
const audio = $("audio"), musicBtn = $("music-btn"), picker = $("music-file");
if (CONFIG.music) audio.src = CONFIG.music;

const setPlaying = (on) => {
  musicBtn.classList.toggle("is-playing", on);
  musicBtn.setAttribute("aria-pressed", String(on));
  musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
};
async function play() {
  if (!audio.src) { picker.click(); return; }
  try { await audio.play(); setPlaying(true); } catch { setPlaying(false); }
}
musicBtn.addEventListener("click", () => {
  if (audio.paused) play(); else { audio.pause(); setPlaying(false); }
});
picker.addEventListener("change", () => {
  const f = picker.files[0];
  if (!f) return;
  audio.src = URL.createObjectURL(f);
  play();
});

$("open-msg").addEventListener("click", () => { setPhotos(false); setModal(true); });
$("close-msg").addEventListener("click", () => setModal(false));
modal.addEventListener("click", (e) => { if (e.target === modal) setModal(false); });

/* ---------- Photo slideshow ---------- */
const stage = $("stage"), dots = $("dots"), caption = $("caption");
let slides = [], cur = 0, timer = null;

function show(i) {
  if (!slides.length) return;
  cur = (i + slides.length) % slides.length;
  stage.querySelectorAll("img").forEach((im, k) => im.classList.toggle("is-active", k === cur));
  dots.querySelectorAll("button").forEach((d, k) => d.classList.toggle("is-active", k === cur));
  caption.textContent = slides[cur].caption || "";
}
function restart() {
  clearInterval(timer);
  if (slides.length > 1 && photoModal.classList.contains("is-open"))
    timer = setInterval(() => show(cur + 1), (CONFIG.slideSeconds || 4) * 1000);
}
function setPhotos(open) {
  setOpen(photoModal, open, open ? $("close-photos") : $("open-photos"));
  if (open) show(0);
  restart();
}

// Only keep photos that actually load, so a missing file never shows a broken image.
Promise.all(CONFIG.photos.map((p) => new Promise((res) => {
  const im = new Image();
  im.onload = () => res({ ...p, im });
  im.onerror = () => res(null);
  im.src = p.src; im.alt = p.caption || "Our photo";
}))).then((list) => {
  slides = list.filter(Boolean);
  if (!slides.length) {
    stage.innerHTML = '<div class="slides__empty">Add your photos to an <b>images</b> folder<br>(1.jpg, 2.jpg, ...) and list them in script.js</div>';
    $("prev").hidden = $("next").hidden = true;
    return;
  }
  slides.forEach((s, k) => {
    stage.appendChild(s.im);
    const d = document.createElement("button");
    d.type = "button"; d.setAttribute("aria-label", "Photo " + (k + 1));
    d.addEventListener("click", () => { show(k); restart(); });
    dots.appendChild(d);
  });
  show(0);
});

$("open-photos").addEventListener("click", () => { setModal(false); setPhotos(true); });
$("close-photos").addEventListener("click", () => setPhotos(false));
photoModal.addEventListener("click", (e) => { if (e.target === photoModal) setPhotos(false); });
$("prev").addEventListener("click", () => { show(cur - 1); restart(); });
$("next").addEventListener("click", () => { show(cur + 1); restart(); });

let x0 = null;
stage.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
stage.addEventListener("touchend", (e) => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0; x0 = null;
  if (Math.abs(dx) > 40) { show(cur + (dx < 0 ? 1 : -1)); restart(); }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { setModal(false); setPhotos(false); }
  if (photoModal.classList.contains("is-open")) {
    if (e.key === "ArrowRight") { show(cur + 1); restart(); }
    if (e.key === "ArrowLeft") { show(cur - 1); restart(); }
  }
});

/* ---------- Auto start ---------- */
const intro = $("intro");
let began = false;
function begin() {
  if (began) return;
  began = true;
  intro.classList.add("is-hidden");
  document.body.classList.remove("container"); // start flower animations
}

// 1) Try to autoplay right away (works in some browsers/settings).
// 2) Otherwise the intro screen waits for one tap, which unlocks sound.
window.addEventListener("load", async () => {
  if (!audio.src) return;
  try { await audio.play(); setPlaying(true); begin(); } catch { /* wait for tap */ }
});
$("start").addEventListener("click", async () => {
  if (audio.src) { try { await audio.play(); setPlaying(true); } catch {} }
  begin();
});