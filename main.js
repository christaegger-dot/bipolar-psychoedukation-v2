
/* Escape HTML to prevent XSS when inserting dynamic text via innerHTML */
function escHtml(str) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

/* Tooltip keyboard accessibility: Escape to dismiss */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var focused = document.activeElement;
    if (focused && focused.classList.contains('tt')) {
      focused.blur();
    }
  }
});

// Notfall-Banner
function toggleNotfall(triggerBtn) {
  var banner = document.getElementById('notfall-banner');
  if (!banner) return;
  var isOpen = banner.classList.contains('open');
  banner.classList.toggle('open', !isOpen);
  triggerBtn.classList.toggle('open', !isOpen);
  triggerBtn.setAttribute('aria-expanded', String(!isOpen));
}

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
function scrollToPos(top) {
  window.scrollTo({ top: top, behavior: 'smooth' });
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
  var _origShow = window.showSlide;
  window.showSlide = function(n) { currentSlide = n; _origShow(n); };
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
          setTimeout(function() { btn.style.display = 'none'; }, 8000);
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
        setTimeout(function() { btn.style.display = 'none'; }, 8000);
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
    msg = '<div class="sc-result-title" style="color:var(--m3)">Sie sind gut aufgestellt</div>Sie scheinen Grenzen zu kennen und sich zu schützen. Nutzen Sie die Ressourcen hier, um das zu festigen — besonders <a href="/modul/6/">Modul 6 (Resilienz)</a>.';
  } else if (yesCount <= 3) {
    msg = '<div class="sc-result-title" style="color:var(--m4)">Sie befinden sich in der Mitte</div>Einige Warnsignale sind vorhanden. <a href="/modul/5/">Modul 5 (Selbstfürsorge und Handeln)</a> ist besonders relevant für Sie — und <a href="/modul/7/">Modul 7</a> zeigt Ihnen, wo Sie Unterstützung finden.';
  } else {
    msg = '<div class="sc-result-title" style="color:var(--danger)">Handlungsbedarf erkennbar</div>Mehrere Warnsignale deuten darauf hin, dass Sie sich stark verausgaben. Bitte nehmen Sie sich <a href="/modul/5/">Modul 5</a> zu Herzen und überlegen Sie, ob eine Beratung bei der <a href="/modul/7/">Fachstelle Angehörigenarbeit</a> hilfreich wäre.<br><strong>Psychiatrischer Notfalldienst ZH:</strong> <a href="tel:0800336655" style="color:var(--danger);font-weight:700;">0800 33 66 55</a> (24/7, kostenlos)';
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
function toggleBookmarkItem(id, title) {
  if (bookmarks[id]) { delete bookmarks[id]; }
  else { bookmarks[id] = title; }
  try { localStorage.setItem('bipolar-bookmarks', JSON.stringify(bookmarks)); } catch(e) {}
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
      var moduleNum = k.replace(/[^\d]/g, '').charAt(0);
      return '<div class="bp-item"><a href="/modul/' + moduleNum + '/">' + escHtml(bookmarks[k]) + '</a></div>';
    }
  }).join('');
}

function toggleBookmarks() {
  var panel = document.getElementById('bookmarks-panel') || document.getElementById('bookmark-panel');
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
  var e2 = document.getElementById('m7-email');
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
  initReadingProgress();
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
    '<a class="handout-lb-download" href="' + escHtml(href) + '" download>⬇ PDF herunterladen</a>' +
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
    tip: 'Ausweg: Selbstfürsorge ist keine Option, sondern Pflicht. Wenn Sie leer sind, können Sie nicht geben. <a href="/modul/5/">Modul 5</a> zeigt konkrete Strategien.'
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

// Accordion
function toggleAcc(btn) {
  var item = btn.closest('.acc-item');
  if (!item) return;
  var body = item.querySelector('.acc-body');
  var isOpen = item.classList.contains('open');
  var siblings = item.parentElement.querySelectorAll('.acc-item.open');
  siblings.forEach(function(s) {
    if (s !== item) {
      s.classList.remove('open');
      s.querySelector('.acc-body').classList.remove('open');
      s.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
    }
  });
  item.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  if (!isOpen) {
    setTimeout(function() {
      item.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }, 50);
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
    (wrap || card).style.display = show ? '' : 'none';
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
    this.setAttribute('aria-expanded', !expanded);
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

// Feature 1: Reading Progress Bar (Modulseiten)
function initReadingProgress() {
  var bar = document.querySelector('.reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0) bar.style.width = (window.scrollY / h * 100) + '%';
  }, { passive: true });
}

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
  var hint = '';
  if (hour >= 22 || hour < 6) {
    hint = '\uD83C\uDF19 Gerade nachts hier? Sie sind nicht allein. Die Dargebotene Hand ist 24/7 erreichbar: <a href="tel:143" style="font-weight:700;">143</a>';
  } else if (hour >= 6 && hour < 9) {
    hint = '\u2600\uFE0F Ein neuer Tag. Auch kleine Schritte z\u00E4hlen.';
  }
  // Feiertage: Dezember
  var month = new Date().getMonth();
  if (month === 11) {
    hint = '\uD83D\uDD6F Feiertage k\u00F6nnen besonders belastend sein. Unterst\u00FCtzung finden Sie jederzeit: <a href="/notfall/">Notfall &amp; Krisenhilfe</a>';
  }

  if (hint) {
    var div = document.createElement('div');
    div.className = 'situational-hint';
    div.innerHTML = hint;
    container.parentNode.insertBefore(div, container);
  }
}
