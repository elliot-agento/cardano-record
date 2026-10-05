/* The Cardano Record — nav behaviour (2026-10-05): theme toggle + phone menu.
   The theme is applied before paint by the inline snippet in each page's <head>;
   this file only wires the button. Modes cycle auto -> light -> dark. */
(function () {
  var KEY = "cr-theme", root = document.documentElement;
  function get() { try { var t = localStorage.getItem(KEY); return t === "light" || t === "dark" ? t : "auto"; } catch (e) { return "auto"; } }
  function set(m) {
    try { m === "auto" ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, m); } catch (e) {}
    if (m === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", m);
    paint(m);
  }
  var NAMES = { auto: "Theme: match device", light: "Theme: light", dark: "Theme: dark" };
  function paint(m) {
    document.querySelectorAll(".themebtn").forEach(function (b) {
      b.dataset.mode = m; b.setAttribute("aria-label", NAMES[m] + " (click to change)"); b.title = NAMES[m];
    });
  }
  var NEXT = { auto: "light", light: "dark", dark: "auto" };
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest(".themebtn");
    if (t) { set(NEXT[get()]); return; }
    var mb = ev.target.closest(".menubtn");
    var nav = document.querySelector(".nav");
    if (mb && nav) { var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); return; }
    document.querySelectorAll(".nav .dd[open]").forEach(function (d) { if (!d.contains(ev.target)) d.removeAttribute("open"); });
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    document.querySelectorAll(".nav .dd[open]").forEach(function (d) { d.removeAttribute("open"); });
    var nav = document.querySelector(".nav.open"); if (nav) nav.classList.remove("open");
  });
  paint(get());
})();
