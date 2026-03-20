// ═══════════════════════════════════════════════════════════
// SEARCH — uses pre-built SEARCH_INDEX from search-index.js
// Lazy-loads search-index.js on first search open
//
// Features:
//   - Synonym-Expansion (alltagsnahe → Fachbegriffe)
//   - Krisen-Banner bei sicherheitsrelevanten Suchbegriffen
//   - Einfaches Relevanz-Ranking (Wortfrequenz + Position)
// ═══════════════════════════════════════════════════════════

var searchIndexLoaded = false;
function loadSearchIndex() {
  if (searchIndexLoaded) return;
  var script = document.createElement('script');
  script.src = '/search-index.js?v=399e4eb';
  script.onload = function() { searchIndexLoaded = true; };
  script.onerror = function() {
    var c = document.getElementById('search-results');
    if (c) c.innerHTML = '<div class="sr-empty">Suchindex konnte nicht geladen werden. Bitte Seite neu laden.</div>';
  };
  document.head.appendChild(script);
}

// ── Synonym-Mapping ──────────────────────────────────────────
// Alltagsbegriffe → Fachbegriffe, die im Index vorkommen.
// Beide Varianten werden gesucht (OR-Logik pro Wort).
var SYNONYMS = {
  'selbstmord':     ['suizid'],
  'selbsttötung':   ['suizid'],
  'umbringen':      ['suizid'],
  'töten':          ['suizid'],
  'hilfe':          ['notfall', 'krise', 'beratung'],
  'panik':          ['angst', 'krise'],
  'wut':            ['aggression', 'reizbarkeit', 'manie'],
  'ärger':          ['aggression', 'reizbarkeit'],
  'traurig':        ['depression', 'depressiv'],
  'traurigkeit':    ['depression'],
  'hoffnungslos':   ['depression', 'suizid'],
  'hoffnungslosigkeit': ['depression', 'suizid'],
  'überfordert':    ['erschöpfung', 'belastung'],
  'überlastet':     ['erschöpfung', 'belastung'],
  'burnout':        ['erschöpfung', 'selbstfürsorge'],
  'schuldgefühle':  ['schuld', 'loyalität'],
  'schuld':         ['schuld', 'loyalität'],
  'medikamente':    ['medikation', 'lithium', 'behandlung'],
  'tabletten':      ['medikation', 'lithium', 'behandlung'],
  'therapie':       ['behandlung', 'psychotherapie'],
  'arzt':           ['behandlung', 'psychiater', 'fachperson'],
  'streit':         ['kommunikation', 'konflikt', 'expressed emotion'],
  'scheidung':      ['trennung'],
  'telefonhilfe':   ['dargebotene hand', 'notfall', '143'],
  'notruf':         ['notfall', '144', '117'],
  'high':           ['manie', 'hypomanie'],
  'manisch':        ['manie'],
  'euphorisch':     ['manie', 'hypomanie']
};

// ── Krisen-Erkennung ─────────────────────────────────────────
// Diese Begriffe lösen ein Krisen-Banner über den Ergebnissen aus.
var CRISIS_TERMS = ['suizid', 'selbstmord', 'selbsttötung', 'umbringen', 'töten', 'notfall', 'notruf', 'krise', 'hoffnungslos', 'hoffnungslosigkeit'];

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
  if (results) results.innerHTML = '<div class="sr-hint">Geben Sie einen Begriff ein — z.\u202fB. «Krisenplan», «Trennung» oder «Suizid»</div>';
  document.body.style.overflow = '';
}

function doSearch(q) {
  var container = document.getElementById('search-results');
  if (!container) return;
  q = q.trim();
  if (q.length < 2) {
    container.innerHTML = '<div class="sr-hint">Geben Sie einen Begriff ein — z.\u202fB. «Krisenplan», «Trennung» oder «Suizid»</div>';
    return;
  }
  if (typeof SEARCH_INDEX === 'undefined') {
    container.innerHTML = '<div class="sr-empty">Suchindex wird geladen…</div>';
    return;
  }

  var inputWords = q.toLowerCase().split(/\s+/);

  // ── Synonym-Expansion ──────────────────────────────────────
  // Für jedes Wort: [originalwort, synonym1, synonym2, ...]
  // Ein Treffer zählt, wenn MINDESTENS eine Variante pro Wort-Gruppe matched.
  var wordGroups = inputWords.map(function(w) {
    var group = [w];
    if (SYNONYMS[w]) {
      SYNONYMS[w].forEach(function(syn) {
        if (group.indexOf(syn) === -1) group.push(syn);
      });
    }
    return group;
  });

  // Flache Liste aller Suchbegriffe (für Highlighting)
  var allTerms = [];
  wordGroups.forEach(function(g) {
    g.forEach(function(w) {
      if (allTerms.indexOf(w) === -1) allTerms.push(w);
    });
  });

  // ── Krisen-Banner ──────────────────────────────────────────
  var isCrisis = inputWords.some(function(w) {
    return CRISIS_TERMS.indexOf(w) !== -1;
  });

  // ── Suche + Scoring ────────────────────────────────────────
  var scored = [];
  SEARCH_INDEX.forEach(function(entry) {
    var lower = entry.t.toLowerCase();
    // Jede Wort-Gruppe muss mindestens ein Match haben
    var allGroupsMatch = wordGroups.every(function(group) {
      return group.some(function(w) { return lower.indexOf(w) !== -1; });
    });
    if (!allGroupsMatch) return;

    // Relevanz-Score berechnen
    var score = 0;
    allTerms.forEach(function(w) {
      var idx = lower.indexOf(w);
      while (idx !== -1) {
        score += 10;
        // Bonus für Match am Anfang
        if (idx < 50) score += 5;
        idx = lower.indexOf(w, idx + w.length);
      }
    });

    // Bonus für Notfallseite bei Krisenbegriffen
    if (isCrisis && entry.u === '/notfall/') score += 100;
    // Bonus für Krisenplan-Inhalte
    if (isCrisis && lower.indexOf('krisenplan') !== -1) score += 50;

    scored.push({ entry: entry, score: score });
  });

  if (scored.length === 0) {
    container.innerHTML = '<div class="sr-empty">Keine Treffer für «' + q.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') + '»</div>';
    return;
  }

  // Sortiere nach Relevanz (höchster Score zuerst)
  scored.sort(function(a, b) { return b.score - a.score; });

  // Deduplizieren nach ersten 80 Zeichen
  var seen = {};
  var unique = [];
  scored.forEach(function(s) {
    var key = s.entry.t.substring(0, 80);
    if (!seen[key]) { seen[key] = true; unique.push(s.entry); }
  });
  var totalCount = unique.length;
  unique = unique.slice(0, 12);

  var html = '';

  // ── Krisen-Banner ausgeben ─────────────────────────────────
  if (isCrisis) {
    html += '<div class="sr-crisis">' +
      '<strong>Sofort Hilfe:</strong> ' +
      '<a href="tel:143">Dargebotene Hand: 143</a> · ' +
      '<a href="tel:144">Sanität: 144</a> · ' +
      '<a href="/notfall/">→ Notfallseite</a>' +
      '</div>';
  }

  unique.forEach(function(r) {
    var snippet = r.t;
    if (snippet.length > 180) {
      var idx = snippet.toLowerCase().indexOf(allTerms[0]);
      if (idx === -1) idx = 0;
      var start = Math.max(0, idx - 60);
      var end = Math.min(snippet.length, idx + 120);
      snippet = (start > 0 ? '…' : '') + snippet.substring(start, end) + (end < r.t.length ? '…' : '');
    }
    snippet = snippet.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    allTerms.forEach(function(w) {
      var re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      snippet = snippet.replace(re, '<mark>$1</mark>');
    });
    var moduleLabel = r.m <= 8 ? ('Modul ' + r.m + ': ' + r.mt.replace(/</g,'&lt;').replace(/>/g,'&gt;')) : r.mt.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    html += '<a class="sr-item" href="' + r.u + '" onclick="closeSearch()">' +
      '<div class="sr-module">' + moduleLabel + '</div>' +
      '<div class="sr-text">' + snippet + '</div></a>';
  });
  if (totalCount > 12) {
    html += '<div class="sr-empty">' + (totalCount - 12) + ' weitere Treffer</div>';
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
