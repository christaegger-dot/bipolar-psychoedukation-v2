// ═══════════════════════════════════════════════════════════
// SEARCH — uses pre-built SEARCH_INDEX from search-index.js
// Lazy-loads search-index.js on first search open
// ═══════════════════════════════════════════════════════════

var searchIndexLoaded = false;
function loadSearchIndex() {
  if (searchIndexLoaded) return;
  var script = document.createElement('script');
  script.src = '/search-index.js?v=72e5485';
  script.onload = function() { searchIndexLoaded = true; };
  script.onerror = function() {
    var c = document.getElementById('search-results');
    if (c) c.innerHTML = '<div class="sr-empty">Suchindex konnte nicht geladen werden. Bitte Seite neu laden.</div>';
  };
  document.head.appendChild(script);
}

function openSearch() {
  var overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  loadSearchIndex();
  overlay.classList.add('active');
  setTimeout(function() {
    var input = document.getElementById('search-input');
    if (input) input.focus();
  }, 100);
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  var overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.remove('active');
  var input = document.getElementById('search-input');
  if (input) input.value = '';
  var results = document.getElementById('search-results');
  if (results) results.innerHTML = '<div class="sr-hint">Geben Sie einen Begriff ein — z.B. «Krisenplan», «Trennung» oder «Suizid»</div>';
  document.body.style.overflow = '';
}

function doSearch(q) {
  var container = document.getElementById('search-results');
  if (!container) return;
  q = q.trim();
  if (q.length < 2) {
    container.innerHTML = '<div class="sr-hint">Geben Sie einen Begriff ein — z.B. «Krisenplan», «Trennung» oder «Suizid»</div>';
    return;
  }
  if (typeof SEARCH_INDEX === 'undefined') {
    container.innerHTML = '<div class="sr-empty">Suchindex wird geladen…</div>';
    return;
  }
  var words = q.toLowerCase().split(/\s+/);
  var results = [];
  SEARCH_INDEX.forEach(function(entry) {
    var lower = entry.t.toLowerCase();
    var allMatch = words.every(function(w) { return lower.indexOf(w) !== -1; });
    if (allMatch) results.push(entry);
  });
  if (results.length === 0) {
    container.innerHTML = '<div class="sr-empty">Keine Treffer für «' + q.replace(/</g,'&lt;') + '»</div>';
    return;
  }
  var seen = {};
  var unique = [];
  results.forEach(function(r) {
    var key = r.t.substring(0, 80);
    if (!seen[key]) { seen[key] = true; unique.push(r); }
  });
  unique = unique.slice(0, 12);
  var html = '';
  unique.forEach(function(r) {
    var snippet = r.t;
    if (snippet.length > 180) {
      var idx = snippet.toLowerCase().indexOf(words[0]);
      var start = Math.max(0, idx - 60);
      var end = Math.min(snippet.length, idx + 120);
      snippet = (start > 0 ? '…' : '') + snippet.substring(start, end) + (end < r.t.length ? '…' : '');
    }
    words.forEach(function(w) {
      var re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      snippet = snippet.replace(re, '<mark>$1</mark>');
    });
    var moduleLabel = r.m <= 8 ? ('Modul ' + r.m + ': ' + r.mt.replace(/</g,'&lt;').replace(/>/g,'&gt;')) : r.mt.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    html += '<a class="sr-item" href="' + r.u + '" onclick="closeSearch()">' +
      '<div class="sr-module">' + moduleLabel + '</div>' +
      '<div class="sr-text">' + snippet + '</div></a>';
  });
  if (results.length > 12) {
    html += '<div class="sr-empty">' + (results.length - 12) + ' weitere Treffer</div>';
  }
  container.innerHTML = html;
}

document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
  if (e.key === 'Escape' && document.getElementById('search-overlay') && document.getElementById('search-overlay').classList.contains('active')) {
    closeSearch();
  }
});
