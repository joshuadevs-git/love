/* ===== EDIT THESE ===== */
const CONFIG = {
  eyebrow: "Hi my fiancée! I have a little message for you",
  name: "Happy 2nd Anniversary",
  message: "Hi langga, Happy Anniversary! First time mag-celebrate nga di ta upod, wala dinner, wala lagaw, kay layo kana. But I made this virtual flowers and message, love, to make our anniversary extra special.\n\nHalong kada wala koda sa tupad mo, hidlaw-hidlaw lang nako simo, love. Kong pwde lang mag-lupad, ging ubra kona. Hidlaw-hidlaw nagd ko malagpasan.\n\nTagd ni, love, pakabakod lang ta asta matapos ni ang LDR. Asta ma-upod tanaka liwat, dasig lang ni. See you very soon, langga, kay dasun ta nga kitaay di tanaka fiance-wife tanaka.\n\nThank you for your love, your patience, and for staying strong with me even when we're far apart. Salamat gid, langga, sa tanan. I wish I could hug and kiss you right now.\n\nI love you always, palangga ko. Happy 2nd Anniversary.",
  // Your uploaded song: put the file next to index.html and match the name here.
  music: "music.mp3",
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

const modal = $("modal");
const setModal = (open) => {
  modal.classList.toggle("is-open", open);
  modal.setAttribute("aria-hidden", String(!open));
  if (open) $("close-msg").focus(); else $("open-msg").focus();
};

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

$("open-msg").addEventListener("click", () => setModal(true));
$("close-msg").addEventListener("click", () => setModal(false));
modal.addEventListener("click", (e) => { if (e.target === modal) setModal(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setModal(false); });

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