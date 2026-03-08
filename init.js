// ═══════════════════════════════════════════════════════════
// INIT — shared initialization logic across all pages
// ═══════════════════════════════════════════════════════════

// Service Worker registration (PWA)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function() {});
}

// Auto-open <details> elements linked via URL hash
if (location.hash) {
  var target = document.querySelector(location.hash);
  if (target && target.tagName === 'DETAILS') {
    target.open = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Redirect old /#m1..#m7 anchor links to new module pages
(function() {
  var h = window.location.hash;
  var m = h && h.match(/^#m(\d)$/);
  if (m) { window.location.replace('/modul/' + m[1] + '/'); return; }
  var ms = h && h.match(/^#(m\d-.+)$/);
  if (ms) {
    var num = ms[1].charAt(1);
    var anchor = ms[1].substring(3);
    window.location.replace('/modul/' + num + '/#' + anchor);
  }
})();
