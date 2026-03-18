
/* Escape HTML to prevent XSS when inserting dynamic text via innerHTML */
function escHtml(str) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// ═══════════════════════════════════════════════════════
// EVENT DELEGATION — ersetzt alle inline onclick/onkeydown
// ═══════════════════════════════════════════════════════

// Action dispatch map: action name → handler function
// Functions that need 'this' (the clicked element) receive it as first arg
// Functions that need a parameter get it from data-param
var ACTION_MAP = {
  // Nav & Global
  toggleNav: function() { toggleNav(); },
  openSearch: function() { openSearch(); },
  closeSearch: function() { closeSearch(); },
  closeSearchOverlay: function(el, e) { if (e.target === el) closeSearch(); },
  toggleSettings: function() { toggleSettings(); },
  toggleFont: function() { toggleFont(); },
  toggleReadmode: function() { toggleReadmode(); },
  toggleBookmarks: function() { toggleBookmarks(); },
  scrollToTop: function() { scrollToTop(); },

  // this-delegated
  toggleFaq: function(el) { toggleFaq(el); },
  toggleGlossar: function(el) { toggleGlossar(el); },
  toggleMG: function(el) { toggleMG(el); },
  toggleWhy: function(el) { toggleWhy(el); },
  toggleLoyalty: function(el) { toggleLoyalty(el); },
  togglePD: function(el) { togglePD(el); },
  toggleAllPhases: function(el) { toggleAllPhases(el); },

  // Parameterized
  showPole: function(el) { showPole(el.dataset.param); },
  showPhase: function(el) { showPhase(Number(el.dataset.param)); },
  showSlide: function(el) { showSlide(Number(el.dataset.param)); },
  setRoleStage: function(el) { setRoleStage(Number(el.dataset.param)); },
  highlightEE: function(el) { highlightEE(Number(el.dataset.param)); },
  hvToggle: function(el) { hvToggle(el.dataset.param); },
  kkToggle: function(el) { kkToggle(el.dataset.param); },
  slToggle: function(el) { slToggle(el.dataset.param); },
  filterHandouts: function(el) { filterHandouts(el.dataset.param); },
  shareSection: function(el) { shareSection(el.dataset.param, el); },
  copyNum: function(el) { copyNum(el.dataset.param, el); },

  // Multi-param
  scSelect: function(el) { scSelect(el, Number(el.dataset.q), el.dataset.val); },
  giveFeedback: function(el) { giveFeedback(el, el.dataset.param, el.dataset.val); },
  waSelect: function(el) { waSelect(el, el.dataset.param); }
};

// Click delegation
document.addEventListener('click', function(e) {
  var el = e.target.closest('[data-action]');
  if (!el) return;
  var handler = ACTION_MAP[el.dataset.action];
  if (handler) handler(el, e);
});

// Keyboard delegation (Enter/Space on interactive elements)
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  var el = e.target.closest('[data-keyaction]');
  if (!el) return;
  e.preventDefault();
  var handler = ACTION_MAP[el.dataset.keyaction];
  if (handler) handler(el, e);
});

// Search input delegation (replaces oninput="doSearch(this.value)")
(function() {
  var si = document.getElementById('search-input');
  if (si) si.addEventListener('input', function() { doSearch(this.value); });
})();


/* Tooltip keyboard accessibility: Escape to dismiss */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var focused = document.activeElement;
    if (focused && focused.classList.contains('tt')) {
      focused.blur();
    }
  }
});

// ═══════════════════════════════════════════════════════
// UX OPTIMIERUNGEN
// ═══════════════════════════════════════════════════════

// #1 Progress Bar
function updateProgress() {
  var winH = window.innerHeight;
  var docH = document.documentElement.scrollHeight - winH;
  var scrolled = window.scrollY;
  var pct = docH > 0 ? Math.min(100, (scrolled / docH) * 100) : 0;
  var bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = pct + '%';
  var rbar = document.querySelector('.reading-progress');
  if (rbar) rbar.style.width = pct + '%';
}

// #2 Scroll-Spy — multi-page aware
function updateScrollSpy() {
  var path = window.location.pathname;
  document.querySelectorAll('.nav-btn').forEach(function(btn) {
    var href = btn.getAttribute('href');
    var isActive = (href === path) || (href === path + '/') || (path === href + '/');
    // Also handle landing page module sections
    if (path === '/' || path === '/index.html') {
      var sections = document.querySelectorAll('section[id]');
      var scrollY = window.scrollY + 80;
      var current = '';
      sections.forEach(function(s) {
        if (s.offsetTop <= scrollY) current = s.id;
      });
      isActive = (href === '#' + current);
    }
    btn.classList.toggle('active', isActive);
  });
}

// #3 Back-to-top visibility
function updateBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Scroll-Event
window.addEventListener('scroll', function() {
  updateProgress();
  updateScrollSpy();
  updateBackToTop();
  saveContinuePosition();
}, { passive: true });

// #6 Keyboard-Navigation für Pole-Tabs
document.addEventListener('keydown', function(e) {
  var active = document.querySelector('.pole-tab.active');
  if (!active) return;
  var poles = ['manie','stabil','depression'];
  var current = active.getAttribute('data-pole');
  var idx = poles.indexOf(current);
  if (e.key === 'ArrowRight' && idx < poles.length - 1) {
    showPole(poles[idx + 1]);
  } else if (e.key === 'ArrowLeft' && idx > 0) {
    showPole(poles[idx - 1]);
  }
});

// showSlide must be defined before initSwipe so the wrapper can capture it
function showSlide(n) {
  document.querySelectorAll('.slide-wrap').forEach(function(s) { s.classList.add('hidden'); });
  var slide = document.getElementById('slide-' + n);
  if (slide) slide.classList.remove('hidden');
  document.querySelectorAll('.slider-tab').forEach(function(t, i) {
    t.classList.toggle('active', i === n);
  });
}

// #7 Swipe-Geste für Slider
function initSwipe() {
  var sliderEl = document.querySelector('.slider-examples');
  if (!sliderEl) return;
  var startX = 0;
  var currentSlide = 0;
  sliderEl.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  sliderEl.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      var total = document.querySelectorAll('.slide-wrap').length;
      if (diff > 0 && currentSlide < total - 1) currentSlide++;
      else if (diff < 0 && currentSlide > 0) currentSlide--;
      showSlide(currentSlide);
    }
  }, { passive: true });
  if (!window._origShowSlide) {
    window._origShowSlide = window.showSlide;
    window.showSlide = function(n) { currentSlide = n; window._origShowSlide(n); };
  }
}

// #9 Alle Phasen anzeigen/verbergen
function toggleAllPhases(btn) {
  var wrap = document.querySelector('.phase-model-wrap');
  if (!wrap) return;
  var isAll = wrap.classList.toggle('phase-all-wrap');
  btn.textContent = isAll ? '✕ Einzeln anzeigen' : '☰ Alle Phasen anzeigen';
  if (isAll) {
    document.querySelectorAll('.phase-content').forEach(function(p) {
      p.classList.remove('hidden');
    });
  } else {
    document.querySelectorAll('.phase-content').forEach(function(p, i) {
      p.classList.toggle('hidden', i !== 0);
    });
    showPhase(1);
  }
}

// #11 Boundary why toggle
function toggleWhy(btn) {
  var row = btn.closest('.boundary-row');
  var why = row.querySelector('.boundary-why');
  if (!why) return;
  var open = why.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  btn.textContent = open ? '✕ Schliessen' : '💡 Warum ist das besser?';
}

// #12 Schriftgrösse
function toggleFont() {
  var large = document.body.classList.toggle('large-text');
  var state = document.getElementById('font-state');
  if (state) state.textContent = large ? 'A−' : 'A+';
  try { localStorage.setItem('bipolar-font', large ? 'large' : 'normal'); } catch(e) {}
}

// #13 Lesemodus
function toggleReadmode() {
  var rm = document.body.classList.toggle('readmode');
  var state = document.getElementById('rm-state');
  if (state) state.textContent = rm ? 'Normal' : 'Lesen';
}

// #15 Nummer kopieren
function copyNum(num, btn) {
  function onCopied() {
    btn.textContent = '✓ Kopiert';
    btn.classList.add('copied');
    setTimeout(function() {
      btn.textContent = '📋 Kopieren';
      btn.classList.remove('copied');
    }, 2000);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(num).then(onCopied).catch(function() {
      fallbackCopy(num, onCopied);
    });
  } else {
    fallbackCopy(num, onCopied);
  }
}

// #16 Weiter-lesen — multi-page aware
var _saveTimer = null;
function saveContinuePosition() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(function() {
    try {
      sessionStorage.setItem('bipolar-continue', JSON.stringify({
        url: window.location.pathname,
        scroll: Math.round(window.scrollY),
        title: document.title.split('|')[0].trim()
      }));
    } catch(e) {}
  }, 500);
}

function initContinue() {
  try {
    var raw = sessionStorage.getItem('bipolar-continue');
    if (!raw) return;
    var saved = JSON.parse(raw);
    if (!saved.url || saved.url === window.location.pathname) {
      // Same page: scroll to position if > 400
      if (saved.scroll > 400 && saved.url === window.location.pathname) {
        var btn = document.getElementById('continue-reading');
        if (btn) {
          btn.style.display = 'block';
          btn.innerHTML = '<span class="cr-label">Weiter lesen</span>→ ' + escHtml(saved.title) + '…';
          btn.onclick = function() {
            window.scrollTo({ top: saved.scroll, behavior: 'smooth' });
            btn.style.display = 'none';
          };
          // Hide after user scrolls past threshold instead of fixed timeout
          var _crScrollHide = function() {
            if (window.scrollY > 200) {
              btn.style.display = 'none';
              window.removeEventListener('scroll', _crScrollHide);
            }
          };
          window.addEventListener('scroll', _crScrollHide, { passive: true });
        }
      }
    } else {
      // Different page: show link to that page
      var btn = document.getElementById('continue-reading');
      if (btn) {
        btn.style.display = 'block';
        btn.innerHTML = '<span class="cr-label">Weiter lesen</span>→ ' + escHtml(saved.title) + '…';
        btn.onclick = function() {
          window.location.href = saved.url;
        };
        var _crScrollHide2 = function() {
          if (window.scrollY > 200) {
            btn.style.display = 'none';
            window.removeEventListener('scroll', _crScrollHide2);
          }
        };
        window.addEventListener('scroll', _crScrollHide2, { passive: true });
      }
    }
  } catch(e) {}
}

// #17 Self-Check
var scAnswers = {};
function scSelect(btn, q, val) {
  var row = btn.closest('.sc-q');
  row.querySelectorAll('.sc-opt').forEach(function(b) { b.classList.remove('selected'); });
  btn.classList.add('selected');
  scAnswers[q] = val;
  if (Object.keys(scAnswers).length >= 5) showScResult();
}
function showScResult() {
  var yesCount = Object.values(scAnswers).filter(function(v) { return v === 'ja'; }).length;
  var result = document.getElementById('sc-result');
  if (!result) return;
  var msg = '';
  if (yesCount <= 1) {
    msg = '<div class="sc-result-title" style="color:var(--m3)">Sie sind gut aufgestellt</div>Sie scheinen Grenzen zu kennen und sich zu schützen. Nutzen Sie die Ressourcen hier, um das zu festigen — besonders <a href="/modul/7/">Modul 7 (Resilienz)</a>.';
  } else if (yesCount <= 3) {
    msg = '<div class="sc-result-title" style="color:var(--m4)">Sie befinden sich in der Mitte</div>Einige Warnsignale sind vorhanden. <a href="/modul/6/">Modul 6 (Selbstfürsorge und Handeln)</a> ist besonders relevant für Sie — und <a href="/modul/8/">Modul 8</a> zeigt Ihnen, wo Sie Unterstützung finden.';
  } else {
    msg = '<div class="sc-result-title" style="color:var(--danger)">Handlungsbedarf erkennbar</div>Mehrere Warnsignale deuten darauf hin, dass Sie sich stark verausgaben. Bitte nehmen Sie sich <a href="/modul/6/">Modul 6</a> zu Herzen und überlegen Sie, ob eine Beratung bei der <a href="/modul/8/">Fachstelle Angehörigenarbeit</a> hilfreich wäre.<br><strong>Psychiatrischer Notfalldienst ZH:</strong> <a href="tel:0800336655" style="color:var(--danger);font-weight:700;">0800 33 66 55</a> (24/7, kostenlos)';
  }
  result.innerHTML = msg;
  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// #18 Bookmarks
var bookmarks = {};
function initBookmarks() {
  try { bookmarks = JSON.parse(localStorage.getItem('bipolar-bookmarks') || '{}'); } catch(e) {}
  renderBookmarksList();
}
function renderBookmarksList() {
  var container = document.getElementById('bp-items') || document.getElementById('bookmark-list');
  if (!container) return;
  var keys = Object.keys(bookmarks);
  if (keys.length === 0) {
    container.innerHTML = '<div class="bp-empty">Noch keine Lesezeichen gesetzt.</div>';
    return;
  }
  container.innerHTML = keys.map(function(k) {
    var el = document.querySelector('[data-bmid="' + k + '"]');
    if (el) {
      var top = el.getBoundingClientRect().top + window.scrollY - 70;
      return '<div class="bp-item"><a href="#" onclick="window.scrollTo({top:' + top + ',behavior:\'smooth\'});toggleBookmarks();return false">' + escHtml(bookmarks[k]) + '</a></div>';
    } else {
      // Cross-page bookmark: link to module page
      var moduleMatch = k.match(/^m(\d+)/);
      var moduleNum = moduleMatch ? moduleMatch[1] : '1';
      return '<div class="bp-item"><a href="/modul/' + moduleNum + '/">' + escHtml(bookmarks[k]) + '</a></div>';
    }
  }).join('');
}

function toggleBookmarks() {
  var panel = document.getElementById('bookmark-panel');
  if (panel) panel.classList.toggle('open');
}

// Settings panel toggle
function toggleSettings() {
  var panel = document.getElementById('settings-panel');
  if (!panel) return;
  panel.classList.toggle('open');
  // Close bookmarks if open
  var bp = document.getElementById('bookmark-panel');
  if (bp && bp.classList.contains('open')) bp.classList.remove('open');
}
// Close settings panel on outside click
document.addEventListener('click', function(e) {
  var panel = document.getElementById('settings-panel');
  var toggle = document.getElementById('settings-toggle');
  if (panel && panel.classList.contains('open') && !panel.contains(e.target) && e.target !== toggle) {
    panel.classList.remove('open');
  }
});

// #19 Feedback
// #19b Wissens-Anker Quiz
function waSelect(btn, qId) {
  var wrap = document.getElementById('wa-' + qId);
  if (!wrap) return;
  var opts = wrap.querySelectorAll('.wa-opt');
  var isCorrect = btn.dataset.correct === 'true';
  var fbText = btn.dataset.fb || '';
  // Disable all buttons
  opts.forEach(function(b) {
    b.disabled = true;
    b.style.pointerEvents = 'none';
    if (b.dataset.correct === 'true') {
      b.classList.add('correct');
    } else if (b === btn && !isCorrect) {
      b.classList.add('wrong');
    } else {
      b.style.opacity = '0.4';
    }
  });
  // Show feedback
  var fbEl = wrap.querySelector('.wa-feedback');
  if (fbEl) {
    fbEl.textContent = fbText;
    fbEl.classList.add('show', isCorrect ? 'correct' : 'wrong');
  }
}

function giveFeedback(btn, module, val) {
  var wrap = btn.closest('.module-feedback');
  wrap.querySelectorAll('.feedback-btn').forEach(function(b) { b.disabled = true; b.style.opacity = '0.4'; });
  btn.classList.add('voted');
  btn.style.opacity = '1';
  var thanks = document.getElementById('fb-' + module);
  if (thanks) thanks.classList.add('show');
  try { localStorage.setItem('bipolar-fb-' + module, val); } catch(e) {}
}

// #20 Teilen
function shareSection(id, btn) {
  var url = window.location.href.split('#')[0] + '#' + id;
  function onCopied() {
    btn.textContent = '✓ Link kopiert';
    btn.classList.add('copied');
    setTimeout(function() {
      btn.textContent = '🔗 Teilen';
      btn.classList.remove('copied');
    }, 2500);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(onCopied).catch(function() {
      fallbackCopy(url, onCopied);
    });
  } else {
    fallbackCopy(url, onCopied);
  }
}
function fallbackCopy(text, cb) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

// Nav toggle (hamburger)
function toggleNav() {
  var links = document.getElementById('nav-links');
  var btn = document.getElementById('hamburger');
  if (links) links.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}

// Init on load
document.addEventListener('DOMContentLoaded', function() {
  updateProgress();
  updateScrollSpy();
  initBookmarks();
  initSwipe();
  initContinue();
  // footer email (anti-scrape)
  var e = document.getElementById('footer-email');
  if (e) { var a = document.createElement('a'); a.href = 'mai'+'lto:'+'angehoerigenarbeit'+'@'+'pukzh'+'.ch'; a.textContent = 'angehoerigenarbeit'+'@'+'pukzh'+'.ch'; e.appendChild(a); }
  var e2 = document.getElementById('m8-email');
  if (e2) { var a2 = document.createElement('a'); a2.href = 'mai'+'lto:'+'angehoerigenarbeit'+'@'+'pukzh'+'.ch'; a2.textContent = 'angehoerigenarbeit'+'@'+'pukzh'+'.ch'; e2.appendChild(a2); }
  // restore large-text
  try {
    if (localStorage.getItem('bipolar-font') === 'large') {
      document.body.classList.add('large-text');
      var fs = document.getElementById('font-state');
      if (fs) fs.textContent = 'A−';
    }
    // restore feedback states
    ['m1','m2','m3','m4','m5','m6','m7','m8'].forEach(function(m) {
      var val = localStorage.getItem('bipolar-fb-' + m);
      if (val) {
        var thanks = document.getElementById('fb-' + m);
        if (thanks) thanks.classList.add('show');
      }
    });
  } catch(e) {}
  // Wire tooltip ARIA: add role="tooltip" + aria-describedby
  document.querySelectorAll('.tt').forEach(function(tt, i) {
    var box = tt.querySelector('.tt-box');
    if (box) {
      var id = 'tt-' + i;
      box.id = id;
      box.setAttribute('role', 'tooltip');
      tt.setAttribute('aria-describedby', id);
    }
  });
  // Init rgt-marker animation (Rollengrammatik)
  var marker = document.getElementById('rgt-marker');
  if (marker) {
    marker.style.left = '8%';
    setTimeout(function() {
      marker.style.transition = 'left 1.8s cubic-bezier(0.4,0,0.2,1)';
      marker.style.left = '92%';
    }, 600);
  }
  // UX Verbesserungen
  initReadTracking();
  initNotes();
  showNotesOnHomepage();
  showSituationalHint();
  initCollapsibleLists();
});

function showPole(pole) {
  document.querySelectorAll('.pole-panel').forEach(function(p) { p.classList.add('hidden'); });
  var panel = document.getElementById('pole-' + pole);
  if (panel) panel.classList.remove('hidden');
  document.querySelectorAll('.pole-tab').forEach(function(t) {
    var isActive = t.getAttribute('data-pole') === pole;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', String(isActive));
  });
}

function showPhase(n) {
  document.querySelectorAll('.phase-content').forEach(function(p) { p.classList.add('hidden'); });
  var panel = document.getElementById('phase-' + n);
  if (panel) panel.classList.remove('hidden');
  document.querySelectorAll('.phase-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.phase-tab[data-phase="' + n + '"]').forEach(function(t) { t.classList.add('active'); });
}

function toggleLoyalty(el) {
  el.classList.toggle('active');
}

// ═══════════════════════════════════════════════════════
// HANDOUT LIGHTBOX
// ═══════════════════════════════════════════════════════

function openHandoutLightbox(href, title) {
  var filename = href.split('/').pop().replace('.pdf', '.webp');
  var thumbSrc = '/images/thumbs/' + filename;
  var overlay = document.createElement('div');
  overlay.className = 'handout-lightbox';
  overlay.onclick = function(e) { if (e.target === overlay) closeHandoutLightbox(); };
  overlay.innerHTML =
    '<div class="handout-lb-inner">' +
    '<button class="handout-lb-close" aria-label="Schliessen">✕</button>' +
    '<img class="handout-lb-img" src="' + escHtml(thumbSrc) + '" alt="' + escHtml(title) + '">' +
    '<div class="handout-lb-title">' + escHtml(title) + '</div>' +
    '<a class="handout-lb-download" href="' + encodeURI(href) + '" download>⬇ PDF herunterladen</a>' +
    '</div>';
  overlay.querySelector('.handout-lb-close').onclick = closeHandoutLightbox;
  document.body.appendChild(overlay);
  requestAnimationFrame(function() { overlay.classList.add('open'); });
  document.body.style.overflow = 'hidden';
}

function closeHandoutLightbox() {
  var lb = document.querySelector('.handout-lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  setTimeout(function() { lb.remove(); }, 250);
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e) {
  var item = e.target.closest('.handout-item');
  if (!item) return;
  e.preventDefault();
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    window.open(item.getAttribute('href'), '_blank');
    return;
  }
  var label = item.querySelector('.handout-label');
  var title = label ? label.textContent : 'Handout';
  openHandoutLightbox(item.getAttribute('href'), title);
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.querySelector('.handout-lightbox')) {
    closeHandoutLightbox();
  }
});

var eeData = {
  1: {
    title: 'Schuldgefühle',
    text: 'Angehörige fühlen sich schuldig — sie hätten mehr tun müssen, früher eingreifen sollen, eine Episode verhindern können. Diese Schuldgefühle sind verständlich, aber oft irrational.',
    tip: 'Ausweg: Erinnern Sie sich — Sie können die Erkrankung nicht verursachen oder heilen. Selbstmitgefühl (<a href="/modul/6/">Modul 6</a>) hilft, diesen Kreislauf zu unterbrechen.'
  },
  2: {
    title: 'Überinvolvement',
    text: 'Aus Schuldgefühlen entsteht übermässiges Engagement: ständig Medikamente kontrollieren, dreimal täglich nach der Stimmung fragen, alle Entscheidungen übernehmen. Das erhöht unbeabsichtigt den Druck auf die erkrankte Person.',
    tip: 'Ausweg: Klare Grenzen setzen — nicht als Strafe, sondern als Schutzraum für beide. «Ich bin für dich da, aber nicht für deine Entscheidungen verantwortlich.»'
  },
  3: {
    title: 'Erschöpfung',
    text: 'Das Überinvolvement zehrt die eigene Kraft auf. Schlafmangel, körperliche Symptome, emotionale Taubheit. Die Toleranzschwelle sinkt — jede Kleinigkeit kann zur Belastung werden.',
    tip: 'Ausweg: Selbstfürsorge ist keine Option, sondern Pflicht. Wenn Sie leer sind, können Sie nicht geben. <a href="/modul/6/">Modul 6</a> zeigt konkrete Strategien.'
  },
  4: {
    title: 'Kritik &amp; Hostilität',
    text: 'Aus Erschöpfung und Frustration entstehen negative Kommentare, Kritik oder Gereiztheit. Das ist keine Bosheit — es ist eine menschliche Reaktion auf Überlastung. Aber: Hohe Kritik erhöht das Rückfallrisiko erheblich — bei depressiven Episoden wurde ein fünffach erhöhtes Rückfallrisiko nachgewiesen (Yan et al., 2004).',
    tip: 'Ausweg: EE lässt sich verändern. Kommunikationstraining und Psychoedukation senken das EE-Niveau nachweislich — und damit das Rückfallrisiko Ihres Partners.'
  }
};

function setRoleStage(stage) {
  var stages = document.querySelectorAll('.role-stage');
  stages.forEach(function(s, i) {
    s.classList.toggle('active', i === stage);
  });
  var positions = ['8%', '36%', '64%', '92%'];
  var marker = document.getElementById('rgt-marker');
  if (marker) marker.style.left = positions[stage];
}


function highlightEE(n) {
  document.querySelectorAll('.ee-flow-svg circle.pointer').forEach(function(node) {
    node.classList.remove('active');
  });
  var node = document.getElementById('ee-svg-' + n);
  if (node) node.classList.add('active');
  var detail = document.getElementById('ee-detail');
  var d = eeData[n];
  if (d && detail) {
    detail.classList.add('active');
    detail.innerHTML =
      '<div class="ee-detail-title">' + d.title + '</div>' +
      '<div class="ee-detail-text">' + d.text + '</div>' +
      '<div class="ee-detail-tip">💡 ' + d.tip + '</div>';
  }
}

// Handout-Filter
function filterHandouts(category) {
  document.querySelectorAll('.filter-chip').forEach(function(c) {
    c.classList.toggle('active', c.dataset.filter === category);
  });
  document.querySelectorAll('.pdf-card').forEach(function(card) {
    var show = category === 'alle' || card.dataset.category === category;
    var wrap = card.closest('.card-wrap');
    (wrap || card).classList.toggle('filter-hidden', !show);
  });
}

// FAQ-Akkordeon
function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  if (!item) return;
  var wasOpen = item.classList.contains('open');
  item.parentElement.querySelectorAll('.faq-item.open').forEach(function(i) {
    i.classList.remove('open');
    i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// Glossar-Akkordeon
function toggleGlossar(btn) {
  var item = btn.closest('.glossar-item');
  if (!item) return;
  var wasOpen = item.classList.contains('open');
  item.parentElement.querySelectorAll('.glossar-item.open').forEach(function(i) {
    i.classList.remove('open');
    i.querySelector('.glossar-term').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// Ressourcen-Seite: Glossar + FAQ Section Toggles
document.querySelectorAll('.res-glossar-toggle, .res-faq-toggle').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    var target = document.getElementById(this.getAttribute('aria-controls'));
    this.setAttribute('aria-expanded', String(!expanded));
    target.hidden = expanded;
  });
});

// Notfall Mini-Guide Akkordeon
function toggleMG(btn) {
  var guide = btn.closest('.mini-guide');
  if (!guide) return;
  var wasOpen = guide.classList.contains('open');
  guide.parentElement.querySelectorAll('.mini-guide.open').forEach(function(g) {
    g.classList.remove('open');
    g.querySelector('.mg-header').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    guide.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// Auto-collapse long lists to reduce cognitive load
// Shows first 3 items and hides the rest behind a "Mehr anzeigen" button
function initCollapsibleLists() {
  var VISIBLE_COUNT = 3;
  var wraps = document.querySelectorAll('.manie-komm-wrap');
  wraps.forEach(function(wrap) {
    var cards = wrap.querySelectorAll('.manie-komm-card');
    if (cards.length <= VISIBLE_COUNT) return;
    var hiddenCards = [];
    for (var i = VISIBLE_COUNT; i < cards.length; i++) {
      cards[i].style.display = 'none';
      hiddenCards.push(cards[i]);
    }
    var btn = document.createElement('button');
    btn.className = 'show-more-btn';
    btn.setAttribute('aria-expanded', 'false');
    var remaining = cards.length - VISIBLE_COUNT;
    btn.innerHTML = '▼ ' + remaining + ' weitere Punkte anzeigen';
    btn.addEventListener('click', function() {
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      hiddenCards.forEach(function(c) {
        c.style.display = isExpanded ? 'none' : '';
      });
      btn.setAttribute('aria-expanded', String(!isExpanded));
      btn.innerHTML = isExpanded
        ? '▼ ' + remaining + ' weitere Punkte anzeigen'
        : '▲ Weniger anzeigen';
    });
    wrap.appendChild(btn);
  });
}

// Progressive Disclosure
function togglePD(btn) {
  var full = document.getElementById(btn.dataset.target);
  if (!full) return;
  var isOpen = full.classList.contains('open');
  full.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  var chevron = btn.querySelector('.pd-chevron');
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  if (!isOpen) {
    setTimeout(function() {
      full.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }, 100);
  }
}

// ═══════════════════════════════════════════════════════
// UX VERBESSERUNGEN — 6 Features
// ═══════════════════════════════════════════════════════

// Feature 2: Persönlicher Lesefortschritt
function initReadTracking() {
  // On module pages: track scroll progress
  var bar = document.querySelector('.reading-progress');
  if (bar) {
    var moduleMatch = window.location.pathname.match(/\/modul\/(\d)\//);
    if (moduleMatch) {
      var mod = 'm' + moduleMatch[1];
      var tracked = false;
      window.addEventListener('scroll', function() {
        if (tracked) return;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        if (h > 0 && (window.scrollY / h) >= 0.8) {
          tracked = true;
          try { localStorage.setItem('bipolar_read_' + mod, 'true'); } catch(e) {}
        }
      }, { passive: true });
    }
  }
  // On homepage: show badges
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    document.querySelectorAll('.mc-link').forEach(function(card) {
      var mod = card.dataset.module;
      if (!mod) return;
      try {
        if (localStorage.getItem('bipolar_read_' + mod)) {
          var badge = document.createElement('span');
          badge.className = 'read-badge';
          badge.textContent = '\u2713 gelesen';
          card.appendChild(badge);
        }
      } catch(e) {}
    });
  }
}

// Feature 5: "Notiz an mich selbst"
function initNotes() {
  // Skip on Notfall page
  if (window.location.pathname.indexOf('/notfall') === 0) return;
  document.querySelectorAll('.m-insight, .m-subtext, .key-msg').forEach(function(el) {
    var btn = document.createElement('button');
    btn.className = 'note-btn';
    btn.setAttribute('aria-label', 'Als Notiz speichern');
    btn.textContent = '\uD83D\uDCCC';
    btn.onclick = function() {
      try {
        var notes = JSON.parse(localStorage.getItem('bipolar_notes') || '[]');
        var text = el.textContent.trim().substring(0, 200);
        var url = location.pathname;
        if (!notes.some(function(n) { return n.text === text; })) {
          notes.push({ text: text, url: url, date: new Date().toLocaleDateString('de-CH') });
          localStorage.setItem('bipolar_notes', JSON.stringify(notes));
          btn.textContent = '\u2705';
          setTimeout(function() { btn.textContent = '\uD83D\uDCCC'; }, 2000);
        }
      } catch(e) {}
    };
    el.style.position = 'relative';
    el.appendChild(btn);
  });
}

function showNotesOnHomepage() {
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;
  try {
    var notes = JSON.parse(localStorage.getItem('bipolar_notes') || '[]');
    if (notes.length === 0) return;
    var container = document.querySelector('.sh-label');
    if (!container) return;
    var link = document.createElement('details');
    link.className = 'notes-panel';
    var listHtml = notes.map(function(n) {
      return '<div class="note-item"><a href="' + escHtml(n.url) + '">' + escHtml(n.text) + '</a><small>' + escHtml(n.date) + '</small></div>';
    }).join('');
    link.innerHTML = '<summary class="notes-toggle">\uD83D\uDCCC Ihre Notizen (' + notes.length + ')</summary>' +
      '<div class="notes-list">' + listHtml + '<button class="notes-clear-btn" style="margin-top:0.5rem;font-size:var(--fs-sm);cursor:pointer;">Alle Notizen l\u00F6schen</button></div>';
    container.parentNode.insertBefore(link, container);
    link.querySelector('.notes-clear-btn').addEventListener('click', function() {
      try { localStorage.removeItem('bipolar_notes'); } catch(e) {}
      location.reload();
    });
  } catch(e) {}
}

// Feature 6: Situativer Hinweis auf der Homepage
function showSituationalHint() {
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;
  var container = document.querySelector('.sh-label');
  if (!container || !document.querySelector('.hero')) return;

  var hour = new Date().getHours();
  var month = new Date().getMonth();
  var hint = '';
  // Nacht-Hinweis hat höchste Priorität (Krisenrelevanz)
  if (hour >= 22 || hour < 6) {
    hint = '\uD83C\uDF19 Gerade nachts hier? Sie sind nicht allein. Die Dargebotene Hand ist 24/7 erreichbar: <a href="tel:143" style="font-weight:700;">143</a>';
  } else if (month === 11) {
    // Feiertage: Dezember (nur tagsüber)
    hint = '\uD83D\uDD6F Feiertage k\u00F6nnen besonders belastend sein. Unterst\u00FCtzung finden Sie jederzeit: <a href="/notfall/">Notfall &amp; Krisenhilfe</a>';
  } else if (hour >= 6 && hour < 9) {
    hint = '\u2600\uFE0F Ein neuer Tag. Auch kleine Schritte z\u00E4hlen.';
  }

  if (hint) {
    var div = document.createElement('div');
    div.className = 'situational-hint';
    div.innerHTML = hint;
    container.parentNode.insertBefore(div, container);
  }
}


// ═══════════════════════════════════════════════════════
// Modul 2: Hypervigilanz-Kreislauf (hvToggle)
// ═══════════════════════════════════════════════════════
if (document.querySelector('.hv-wrap')) {
(function(){
  var data = {
    beobachten: {
      step: "Schritt 1",
      stepColor: "#8a6d00", stepBg: "#fef9ec",
      color: "#8a6d00", bg: "#fef9ec", border: "#d4a843",
      signBorder: "#d4a843",
      title: "🔍 Beobachten — Stimmung scannen",
      body: "Sie haben gelernt, Ihren Partner ständig zu «lesen»: Wie ist die Stimme heute? Schläft er genug? Gibt sie zu viel aus? Diese Wachsamkeit war anfangs hilfreich — aber sie ist zum Dauerzustand geworden. Ihr Gehirn sucht permanent nach Warnsignalen, auch wenn es gerade ruhig ist.",
      sign: "<strong>Kennen Sie das?</strong> Sie betreten einen Raum und checken als Erstes die Stimmung Ihres Partners — bevor Sie überhaupt «Hallo» sagen."
    },
    anspannung: {
      step: "Schritt 2",
      stepColor: "#bf5b00", stepBg: "#fff3e0",
      color: "#bf5b00", bg: "#fff3e0", border: "#e67e22",
      signBorder: "#e67e22",
      title: "⚡ Anspannung — Körper in Alarmbereitschaft",
      body: "Das ständige Beobachten aktiviert Ihr Stresssystem. Cortisol steigt, Muskeln spannen sich an, das Herz schlägt schneller. Ihr Körper reagiert, als wäre permanent Gefahr — auch wenn Ihr Partner gerade stabil ist. Das ist keine Einbildung, sondern Neurobiologie.",
      sign: "<strong>Kennen Sie das?</strong> Ihr Partner lacht laut am Telefon — und Sie denken sofort: Ist das schon Manie? Ihr Körper reagiert mit einem Adrenalinstoss, bevor Ihr Verstand überhaupt einschätzen kann."
    },
    erschoepfung: {
      step: "Schritt 3",
      stepColor: "#a02015", stepBg: "#fdf0ed",
      color: "#a02015", bg: "#fdf0ed", border: "#c0392b",
      signBorder: "#c0392b",
      title: "😢 Erschöpfung — Schlaf und Konzentration sinken",
      body: "Die Daueranspannung fordert ihren Preis: Sie schlafen schlecht, können sich kaum konzentrieren, vergessen Dinge. Ihre eigenen Ressourcen schrumpfen — aber die Anforderungen bleiben gleich. Sie funktionieren auf Reserve.",
      sign: "<strong>Kennen Sie das?</strong> Sie liegen nachts wach und hören, ob Ihr Partner noch atmet, ob er aufsteht, ob das Licht angeht. Am nächsten Morgen sind Sie erschöpfter als am Abend."
    },
    erholung: {
      step: "Schritt 4",
      stepColor: "#2d6a4f", stepBg: "#edf5f0",
      color: "#2d6a4f", bg: "#edf5f0", border: "#6b9e7e",
      signBorder: "#6b9e7e",
      title: "🌿 Erholung — kurz und nie vollständig",
      body: "Wenn eine Krise überstanden ist, erholen Sie sich — aber nicht ganz. Ein Rest Anspannung bleibt. Mit jeder Episode wird die Erholungsphase kürzer und unvollständiger. Wie eine Batterie, die nie mehr ganz auflädt.",
      sign: "<strong>Kennen Sie das?</strong> Der Urlaub beginnt — und statt sich zu entspannen, warten Sie innerlich darauf, dass das Telefon klingelt. «Richtige» Erholung fühlt sich fast bedrohlich an."
    }
  };
  var order = ['beobachten','anspannung','erschoepfung','erholung'];
  var active = null;
  var stations = document.querySelectorAll('.hv-station');
  var dots = document.querySelectorAll('.hv-step-dot');
  var panel = document.getElementById('hv-detail');
  window.hvToggle = function(id) {
    if (active === id) { active = null; } else { active = id; }
    // Update stations
    stations.forEach(function(s) {
      var sId = s.getAttribute('data-id');
      if (sId === active) {
        s.classList.add('active');
        s.setAttribute('aria-expanded', 'true');
      } else {
        s.classList.remove('active');
        s.setAttribute('aria-expanded', 'false');
      }
    });
    // Update dots
    dots.forEach(function(d, i) {
      d.className = 'hv-step-dot';
      if (order[i] === active) {
        d.classList.add('active-' + active);
      }
    });
    // Update panel
    if (!active) {
      panel.style.background = '#f8f6f4';
      panel.style.borderColor = '#e8e2dc';
      panel.innerHTML =
        '<div class="hv-empty">' +
        '<p class="text-sm-muted">Klicken Sie auf eine Station im Kreislauf.</p>' +
        '<p class="text-xs-muted">Erkennen Sie sich? Das ist kein Versagen — es ist ein automatisierter Schutzmechanismus.</p></div>';
      return;
    }
    var d = data[active];
    panel.style.background = d.bg;
    panel.style.borderColor = d.border;
    panel.innerHTML =
      '<span class="hv-d-step" style="color:' + d.stepColor + ';background:' + d.stepBg + '">' + d.step + '</span>' +
      '<p class="hv-d-title" style="color:' + d.color + '">' + d.title + '</p>' +
      '<p class="hv-d-body">' + d.body + '</p>' +
      '<div class="hv-d-sign" style="border-left-color:' + d.signBorder + '">' + d.sign + '</div>';
  };
  // Keyboard support
  stations.forEach(function(s) {
  });
})();

}

// ═══════════════════════════════════════════════════════
// Modul 5: Kommunikationsquadrant (kkToggle)
// ═══════════════════════════════════════════════════════
if (document.querySelector('.kk-wrap')) {
(function(){
  var data = {
    topLeft: {
      marker: "❌", verdict: "Grösster Schaden",
      color: "#c0392b", bg: "#fdf0ed", bgActive: "#fbe3dd", border: "#e6b8af",
      situation: "Ihr Partner hat seit Tagen nicht geschlafen und gibt unkontrolliert Geld aus.",
      says: "«Du bist total verantwortungslos! Du ruinierst uns!»",
      effect: "Eskalation. Ihr Partner fühlt sich angegriffen, reagiert mit Abwehr oder Gegenangriff. Die Manie verstärkt die Reaktion.",
      why: "Bewertung + Krise = maximaler Schaden. In der Manie fehlt die Fähigkeit zur Selbstreflexion. Jede Kritik wird als Angriff verarbeitet."
    },
    topRight: {
      marker: "⚠️", verdict: "Richtige Worte, falscher Zeitpunkt",
      color: "#b8860b", bg: "#fef9ec", bgActive: "#fdf0d0", border: "#e6d5a0",
      situation: "Ihr Partner hat seit Tagen nicht geschlafen und gibt unkontrolliert Geld aus.",
      says: "«Mir fällt auf, dass du seit drei Nächten kaum geschlafen hast.»",
      effect: "Besser formuliert — aber der Zeitpunkt ist schlecht. In der akuten Manie kann Ihr Partner diese Information nicht verarbeiten.",
      why: "Die Beobachtung ist richtig, aber die Krise ist der falsche Moment. Besser: Sicherheit gewährleisten, Gespräch auf stabile Phase verschieben."
    },
    bottomLeft: {
      marker: "⚠️", verdict: "Richtiger Zeitpunkt, falsche Worte",
      color: "#b8860b", bg: "#fef9ec", bgActive: "#fdf0d0", border: "#e6d5a0",
      situation: "Stabile Phase. Sie möchten über die letzte Episode sprechen.",
      says: "«Du machst mich wahnsinnig mit deinen Stimmungsschwankungen.»",
      effect: "Der Zeitpunkt stimmt — aber die Formulierung verletzt. Ihr Partner hört einen Vorwurf statt eines Gesprächsangebots.",
      why: "«Du machst…» erzeugt Schuld und Abwehr. Der richtige Zeitpunkt wird durch die falsche Sprache verschenkt."
    },
    bottomRight: {
      marker: "✅", verdict: "✓ Zielzone",
      color: "#2d6a4f", bg: "#edf5f0", bgActive: "#d4edda", border: "#a8d5ba",
      situation: "Stabile Phase. Sie möchten über die letzte Episode sprechen.",
      says: "«Ich mache mir Sorgen, wenn du nicht schläfst. Können wir darüber reden, was mir helfen würde?»",
      effect: "Ihr Partner fühlt sich respektiert, nicht angegriffen. Ein Gespräch auf Augenhöhe wird möglich.",
      why: "1 Satz, 1 Thema, Ich-Perspektive. Keine Schuldzuweisung. Der richtige Moment für die richtige Sprache — das öffnet Türen."
    }
  };
  var active = null;
  var btns = document.querySelectorAll('.kk-q');
  var panel = document.getElementById('kk-detail');
  window.kkToggle = function(id) {
    // Toggle
    if (active === id) { active = null; } else { active = id; }
    // Update buttons
    btns.forEach(function(b) {
      var bId = b.getAttribute('data-id');
      if (bId === active) {
        b.classList.add('active');
        b.setAttribute('aria-expanded', 'true');
      } else {
        b.classList.remove('active');
        b.setAttribute('aria-expanded', 'false');
      }
    });
    // Update detail panel
    if (!active) {
      panel.style.background = '#f8f6f4';
      panel.style.borderColor = '#e8e2dc';
      panel.innerHTML =
        '<div class="kk-empty">' +
        '<p class="text-sm-muted">Klicken Sie auf ein Feld.</p>' +
        '<p class="text-xs-muted">Dieselbe Situation — vier verschiedene Reaktionen.<br>' +
        'Was verändert sich, wenn Sie den Zeitpunkt oder die Worte ändern?</p></div>';
      return;
    }
    var d = data[active];
    panel.style.background = d.bg;
    panel.style.borderColor = d.border;
    panel.innerHTML =
      '<div class="kk-verdict" style="color:' + d.color + ';background:' + d.bgActive + '">' + d.marker + ' ' + d.verdict + '</div>' +
      '<p class="kk-situation">Situation: ' + d.situation + '</p>' +
      '<p class="kk-says" style="color:' + d.color + ';border-left-color:' + d.color + '">' + d.says + '</p>' +
      '<p class="kk-effect"><strong>Wirkung:</strong> ' + d.effect + '</p>' +
      '<p class="kk-why">💡 ' + d.why + '</p>';
  };
})();

}

// ═══════════════════════════════════════════════════════
// Modul 7: Solidaritäts-Säulen (slToggle)
// ═══════════════════════════════════════════════════════
if (document.querySelector('.sl-wrap')) {
(function(){
  var data = {
    sol01: {
      emoji: "🧠",
      title: "Gemeinsames Krankheitsverständnis",
      color: "#2d6a4f", bg: "#f5faf7", border: "#c2dece", signBorder: "#6b9e7e",
      why: "Solidarität bleibt stabiler, wenn Angehörige und Betroffene dieselbe Landkarte haben: Was ist Symptom, was ist Persönlichkeit? Was hilft, was schadet?",
      body: "«Wir gegen die Episode — nicht gegeneinander.» Beide Partner verstehen die Erkrankung als <em>Dritten im Bunde</em>, nicht als Charakterfehler. Dazu gehört: ein gemeinsames Episoden-Profil (Frühwarnzeichen, Trigger), Kommunikations-Grundregeln und ein kurzes Debrief nach jeder Krise.",
      concrete: "<strong>Konkret:</strong> Erstellen Sie zusammen ein 1-Seiten-Episoden-Profil: Frühwarnzeichen Manie (z.B. weniger Schlaf, Gereiztheit), Frühwarnzeichen Depression (z.B. Rückzug, Hoffnungslosigkeit), persönliche Trigger. Regel: keine Grundsatzdebatten in der Krise — nur Handlungsfragen."
    },
    sol02: {
      emoji: "🏝️",
      title: "Krankheitsfreie Inseln + Wertschätzung",
      color: "#7a6000", bg: "#fefcf5", border: "#e6d5a0", signBorder: "#d4a843",
      why: "Solidarität erodiert besonders, wenn die Beziehung nur noch um Symptome, Kontrolle und Reparatur kreist. «Inseln» sind nicht Verdrängung — sondern Beziehungsnahrung.",
      body: "Bewusste Zeiten ohne Therapie-Talk, ohne Symptom-Analyse, ohne Konflikt-Rehash. <strong>Mikro-Insel</strong> (täglich 5–10 Min): Tee, kurzer Walk, Musik. <strong>Mini-Insel</strong> (2×/Woche 30–90 Min): Kochen, Ausflug, Kino. <strong>Makro-Insel</strong> (alle 2–4 Wochen): halber/ganzer Tag — auch getrennt möglich. <em class='quelle'>(Zeitangaben: Empfehlung der Fachstelle Angehörigenarbeit PUK Zürich)</em>",
      concrete: "<strong>Konkret:</strong> Bestimmen Sie einen festen Abend pro Woche als «krankheitsfreie Zone». Und: 1× pro Woche fragen Sie sich gegenseitig: «Was war diese Woche gut zwischen uns — trotz Erkrankung?»"
    },
    sol03: {
      emoji: "🛡️",
      title: "Grenzen + faire Lastverteilung",
      color: "#5b3e8a", bg: "#f7f4fb", border: "#c8bade", signBorder: "#8a70b8",
      why: "Solidarität zerbricht selten an «zu wenig Liebe», sondern an zu viel Übernahme und zu wenig Schutz. Ohne klare Grenzen entstehen Akkommodations-Spiralen — kurzfristig beruhigend, langfristig erschöpfend.",
      body: "«Ich bleibe in Beziehung — aber nicht in Eskalation.» Dazu: ein Codewort «Pause» für sofortigen Themenstopp, eine <strong>Lasten-Matrix</strong> (wer ist wofür zuständig — und wofür nicht), schriftliche Grenzen, und eine Reparatur-Regel nach Grenzbruch: Anerkennen → Verantwortung → Wiedergutmachung → Prävention.",
      concrete: "<strong>Konkret:</strong> Schreiben Sie eine «No-List»: Was übernehme ich nicht mehr? Z.B. nächtliche Dauertelefonate, impulsive Geldrettung, Konflikt-Schiedsrichter:in. Grenzregel: «Wenn geschrien wird, gehe ich aus dem Raum. Ich komme zurück, wenn es ruhig ist.»"
    },
    sol04: {
      emoji: "📋",
      title: "Gemeinsamer Krisenplan",
      color: "#a02015", bg: "#fef7f5", border: "#e6b8af", signBorder: "#c0392b",
      why: "Wiederholte Krisen ohne Plan sind wie wiederholte Brände ohne Rauchmelder: Jede Episode hinterlässt Beziehungsschäden. Ein Krisenplan macht Krisen kürzer, klarer, weniger traumatisierend.",
      body: "Ein 1-Seiter, erstellt in stabiler Phase: <strong>Ampel</strong> (Grün/Gelb/Rot), <strong>Gelb-Massnahmen</strong> (Schlafschutz, Reizreduktion), <strong>No-Gos</strong> (Diskutieren, Drohen, Moralpredigten), <strong>Kontaktkette</strong> (Behandler:in → Krisendienst → Notruf), <strong>Rollen</strong> (wer telefoniert, wer fährt, wer bleibt bei Kindern).",
      concrete: "<strong>Konkret:</strong> Der Plan schützt Sie vor dem «Retter-Reflex». Er legitimiert: «Ich helfe — aber nicht allein und nicht grenzenlos.» Dokumente griffbereit: am Kühlschrank, im Handy, bei der Therapeutin."
    },
    sol05: {
      emoji: "💚",
      title: "Eigene Entlastung + Peer-Support",
      color: "#7a5200", bg: "#fffaf2", border: "#e6c9a0", signBorder: "#d4a050",
      why: "Solidarität kann nur stabil bleiben, wenn Angehörige nicht ausbrennen. Entlastung ist kein Luxus, sondern Voraussetzung.",
      body: "<strong>Fixe Entlastungszeiten</strong> (nicht verhandelbar): 2× pro Woche 60–90 Minuten «frei», 1× pro Monat halber Tag. <em class='quelle'>(Zeitangaben: Empfehlung der Fachstelle Angehörigenarbeit PUK Zürich)</em> <strong>Peer-Kontakt</strong>: Selbsthilfe-/Angehörigengruppe — normalisiert, reduziert Isolation. <strong>Eigene therapeutische Unterstützung</strong> bei Warnsignalen: Schlafstörung, Angst, Übererregung, «emotionale Taubheit», Schuld/Scham.",
      concrete: "<strong>Konkret:</strong> Benennen Sie 2–3 Menschen, die Sie in einer Krise anrufen können. Melden Sie sich bei einer Angehörigen-Gruppe an (z.B. <a href='/notfall/' style='color:inherit;font-weight:600'>Fachstelle Angehörigenarbeit PUK</a>). Warnsignal: «Ist mir egal» — das ist oft Schutz vor Überlastung, nicht Gleichgültigkeit."
    }
  };
  var active = null;
  var pillars = document.querySelectorAll('.sl-pillar');
  var panel = document.getElementById('sl-detail');
  window.slToggle = function(id) {
    if (active === id) { active = null; } else { active = id; }
    pillars.forEach(function(p) {
      var pId = p.getAttribute('data-id');
      if (pId === active) {
        p.classList.add('active');
        p.setAttribute('aria-expanded', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-expanded', 'false');
      }
    });
    if (!active) {
      panel.style.background = '#f8f6f4';
      panel.style.borderColor = '#e8e2dc';
      panel.innerHTML =
        '<div class="sl-empty">' +
        '<p style="font-size:.88rem;color:var(--muted)">Klicken Sie auf eine Säule.</p>' +
        '<p style="font-size:.78rem;color:#8a7e76">Solidarität zerbricht selten an zu wenig Liebe — sondern an Erschöpfung, fehlenden Grenzen und Isolation.</p></div>';
      return;
    }
    var d = data[active];
    panel.style.background = d.bg;
    panel.style.borderColor = d.border;
    panel.innerHTML =
      '<div class="sl-d-head">' +
        '<span class="sl-d-emoji">' + d.emoji + '</span>' +
        '<p class="sl-d-title" style="color:' + d.color + '">' + d.title + '</p>' +
      '</div>' +
      '<p class="sl-d-why">' + d.why + '</p>' +
      '<p class="sl-d-body">' + d.body + '</p>' +
      '<div class="sl-d-concrete" style="border-left-color:' + d.signBorder + '">' + d.concrete + '</div>';
    panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  };
})();

}

// ═══════════════════════════════════════════════════════
// Handouts: PDF-Lightbox
// ═══════════════════════════════════════════════════════
if (document.querySelector('.pdf-card.has-thumb')) {
/* PDF Lightbox — single consolidated implementation */
(function(){
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  document.querySelectorAll('.pdf-card.has-thumb').forEach(function(card){
    var pdfHref = card.getAttribute('href');
    if(!pdfHref) return;
    card.setAttribute('data-pdf', pdfHref);
    card.removeAttribute('href');
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', function(e){
      e.preventDefault();
      if(isMobile){ window.open(pdfHref, '_blank'); return; }
      openPdfLightbox(pdfHref);
    });
    card.addEventListener('keydown', function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); card.click(); }
    });
  });

  function closeLightbox(){
    var lb = document.getElementById('pdf-lightbox');
    if(lb){ lb.remove(); document.body.style.overflow=''; }
  }

  function openPdfLightbox(url){
    closeLightbox();
    var ov = document.createElement('div');
    ov.id = 'pdf-lightbox';
    ov.setAttribute('role','dialog');
    ov.setAttribute('aria-modal','true');
    ov.setAttribute('aria-label','PDF-Vorschau');

    var panel = document.createElement('div');
    panel.className = 'pdf-lb-panel';

    var bar = document.createElement('div');
    bar.className = 'pdf-lb-bar';

    var dl = document.createElement('a');
    dl.className = 'pdf-lb-dl';
    dl.href = url;
    dl.download = '';
    dl.textContent = '\u2B07 PDF herunterladen';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'pdf-lb-close';
    closeBtn.setAttribute('aria-label','Schliessen');
    closeBtn.textContent = '\u2715';
    closeBtn.addEventListener('click', closeLightbox);

    bar.appendChild(dl);
    bar.appendChild(closeBtn);

    var iframe = document.createElement('iframe');
    iframe.className = 'pdf-lb-iframe';
    iframe.src = url;
    iframe.title = 'PDF-Vorschau';

    panel.appendChild(bar);
    panel.appendChild(iframe);
    ov.appendChild(panel);

    ov.addEventListener('click', function(e){
      if(e.target === ov) closeLightbox();
    });

    document.body.appendChild(ov);
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  document.addEventListener('keydown', function(e){
    if(e.key==='Escape') closeLightbox();
  });
})();

}

// ═══════════════════════════════════════════════════════
// Handouts: Asset-Map (Version-Labels)
// ═══════════════════════════════════════════════════════
if (document.querySelector('.asset-meta')) {
(function(){
  var assetMap={
    'krisenplan-vorlage':'TPL-01 · v02 · 2026-02',
    'kurzblatt-was-stabilisiert':'TPL-02 · v01 · 2026-02',
    'notfallkarte-kanton':'TPL-03 · v01 · 2026-02',
    'a8_warnsignale':'INF-01 · v01 · 2026-02',
    'b1_18_belastungen':'INF-02 · v01 · 2026-02',
    'a4_ambiguous_loss':'INF-03 · v01 · 2026-02',
    'a5_affiliate_stigma':'INF-04 · v01 · 2026-02',
    'b9_depression_partner':'INF-05 · v01 · 2026-02',
    'b2_erosion_solidaritaet':'INF-06 · v01 · 2026-02',
    'b3_kritische_zeitpunkte':'INF-07 · v01 · 2026-02',
    'b4_mechanismen_erosion':'INF-08 · v01 · 2026-02',
    'b6_geschlechtsspezifisch':'INF-09 · v01 · 2026-02',
    'a3_ambivalente_loyalitaet':'INF-10 · v01 · 2026-02',
    'b5_loyalitaetskonflikte':'INF-11 · v01 · 2026-02',
    'expressed_emotions':'INF-12 · v01 · 2026-02',
    'b7_behandlung_ambivalenz':'INF-13 · v01 · 2026-02',
    'c1_krisenplan':'INF-14 · v01 · 2026-02',
    'c2_suizidgedanken':'INF-15 · v01 · 2026-02',
    'c3_psychose_wahn':'INF-16 · v01 · 2026-02',
    'c4_manie':'INF-17 · v01 · 2026-02',
    'c5_depression':'INF-18 · v01 · 2026-02',
    'c6_selbstfuersorge':'INF-19 · v01 · 2026-02',
    'grenzsetzung':'INF-20 · v01 · 2026-02',
    'd4_solidaritaet_wellen':'INF-21 · v01 · 2026-02',
    'b10_trennung_scheidung':'INF-22 · v01 · 2026-02',
    'transformationsreise':'INF-23 · v01 · 2026-02',
    'trialog':'INF-24 · v01 · 2026-02'
  };
  document.querySelectorAll('.pdf-card.has-thumb').forEach(function(card){
    var href=card.getAttribute('data-pdf')||'';
    var badge=card.querySelector('.card-badge');
    if(!badge)return;
    for(var key in assetMap){
      if(href.indexOf(key)!==-1){
        var span=document.createElement('span');
        span.className='card-asset-id';
        span.textContent=assetMap[key];
        badge.parentNode.appendChild(span);
        break;
      }
    }
  });
})();

}
