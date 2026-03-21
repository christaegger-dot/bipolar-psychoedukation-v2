#!/usr/bin/env node
/**
 * build-search-index.js
 *
 * Generiert search-index.js automatisch aus den HTML-Dateien.
 * Ersetzt den bisherigen manuellen Prozess.
 *
 * Usage:
 *   node scripts/build-search-index.js           # generiert search-index.js
 *   node scripts/build-search-index.js --check   # prüft ob Index aktuell ist (exit 1 wenn veraltet)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'search-index.js');
const MAX_TEXT = 200;

// ── Seitenstruktur ──────────────────────────────────────

const PAGES = [
  ...Array.from({ length: 8 }, (_, i) => ({
    file: `modul/${i + 1}/index.html`,
    url: `/modul/${i + 1}/`,
    m: i + 1,
    type: 'module',
  })),
  { file: 'handouts/index.html',           url: '/handouts/',              m: 9, type: 'handouts' },
  { file: 'handouts/notfall/index.html',    url: '/handouts/notfall/',     m: 9, type: 'special' },
  { file: 'handouts/ressourcen/index.html', url: '/handouts/ressourcen/',  m: 9, type: 'special' },
];

// ── Hilfsfunktionen ─────────────────────────────────────

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\u202f/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text) {
  if (text.length <= MAX_TEXT) return text;
  return text.substring(0, MAX_TEXT - 1) + '…';
}

function extractAll(html, regex) {
  const results = [];
  const re = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
  let match;
  while ((match = re.exec(html)) !== null) {
    const text = stripHtml(match[1]);
    if (text.length >= 3) results.push(text);
  }
  return results;
}

function extractFirst(html, regex) {
  const match = html.match(regex);
  return match ? stripHtml(match[1]) : null;
}

/**
 * Removes non-content areas (nav, footer, scripts, head, comments).
 */
function stripChrome(html) {
  return html
    .replace(/<nav\s+aria-label="Hauptnavigation"[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

// ── Modul-Extraktor ─────────────────────────────────────

function extractModuleIndex(html, moduleTitle, url, m) {
  const entries = [];
  const seen = new Set();

  function add(text, section) {
    const t = truncate(text);
    const key = t.substring(0, 80);
    if (seen.has(key) || t.length < 8) return;
    seen.add(key);
    entries.push({ m, mt: moduleTitle, s: section || moduleTitle, t, u: url });
  }

  // Parse into sections by h2/h3
  let currentSection = moduleTitle;
  const parts = html.split(/(?=<h[23][^>]*>)/i);

  for (const part of parts) {
    const h2 = part.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const h3 = part.match(/^<h3[^>]*>([\s\S]*?)<\/h3>/i);
    if (h2) currentSection = stripHtml(h2[1]);
    if (h3) currentSection = stripHtml(h3[1]);

    // ── Überschriften ──
    extractAll(part, /<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi).forEach(t => add(t, currentSection));

    // ── Summary/Details (progressive disclosure) ──
    extractAll(part, /<summary[^>]*>([\s\S]*?)<\/summary>/gi).forEach(t => add(t, currentSection));

    // ── Vignettes ──
    extractAll(part, /<p[^>]*class="[^"]*vignette-(?:text|source)[^"]*"[^>]*>([\s\S]*?)<\/p>/gi).forEach(t => add(t, currentSection));

    // ── Key content paragraphs ──
    extractAll(part, /<p[^>]*class="[^"]*(?:m-intro|m-subtext)[^"]*"[^>]*>([\s\S]*?)<\/p>/gi).forEach(t => add(t, currentSection));

    // ── Generic paragraphs ──
    extractAll(part, /<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi).forEach(t => {
      if (t.length >= 20) add(t, currentSection);
    });

    // ── List items (including short TOC entries) ──
    extractAll(part, /<li[^>]*>([\s\S]*?)<\/li>/gi).forEach(t => {
      if (t.length >= 10) add(t, currentSection);
    });

    // ── Strong/bold standalone labels (card titles etc.) ──
    extractAll(part, /<strong[^>]*>([\s\S]*?)<\/strong>/gi).forEach(t => {
      if (t.length >= 10 && t.length <= 120) add(t, currentSection);
    });

    // ── Divs with content classes ──
    const contentClasses = [
      'm-insight', 'key-msg', 'info-box', 'behandlung-box',
      'symptom-card', 'manie-komm-card', 'barr-card', 'stigma-card',
      'ee-detail-box', 'ee-exit-box', 'pole-note',
      'acc-title', 'acc-subtitle', 'mk-title', 'mk-text',
      'boundary-do', 'boundary-dont', 'sc-result-title',
      'eisberg-label', 'eisberg-sub',
      'exp-who', 'exp-body', 'exp-text',
      'lernziele-label', 'quote-text', 'quote-source',
    ];
    for (const cls of contentClasses) {
      const re = new RegExp('<div[^>]*class="[^"]*' + cls + '[^"]*"[^>]*>([\\s\\S]*?)</div>', 'gi');
      extractAll(part, re).forEach(t => {
        if (t.length >= 8) add(t, currentSection);
      });
    }

    // ── Span-based content (icon-con labels etc.) ──
    const spanClasses = ['icon-con', 'acc-title', 'acc-subtitle'];
    for (const cls of spanClasses) {
      const re = new RegExp('<span[^>]*class="[^"]*' + cls + '[^"]*"[^>]*>([\\s\\S]*?)</span>', 'gi');
      extractAll(part, re).forEach(t => {
        if (t.length >= 8) add(t, currentSection);
      });
    }

    // ── FAQ questions ──
    extractAll(part, /<(?:button|div)[^>]*class="[^"]*faq-q[^"]*"[^>]*>([\s\S]*?)<\/(?:button|div)>/gi).forEach(t => add(t, currentSection));

    // ── Data-viz text (hv-station, kk, ee, sl labels) ──
    extractAll(part, /<div[^>]*class="[^"]*(?:hv-station|kk-q|ee-station|sl-pillar)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi).forEach(t => {
      if (t.length >= 10) add(t, currentSection);
    });
  }

  return entries;
}

// ── Handout-Extraktor ───────────────────────────────────

function extractHandoutIndex(html, moduleTitle, url, m) {
  const entries = [];
  const seen = new Set();

  function add(text, section) {
    const t = truncate(text);
    const key = t.substring(0, 80);
    if (seen.has(key) || t.length < 8) return;
    seen.add(key);
    entries.push({ m, mt: moduleTitle, s: section || moduleTitle, t, u: url });
  }

  let currentSection = moduleTitle;

  // h2 section headings
  extractAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi).forEach(t => {
    currentSection = t;
    add(t, moduleTitle);
  });

  // PDF card: h3 title + p description combined
  const cardRegex = /<(?:a|div)[^>]*class="[^"]*pdf-card[^"]*"[\s\S]*?<\/(?:a|div)>/gi;
  let match;
  while ((match = cardRegex.exec(html)) !== null) {
    const card = match[0];
    const title = extractFirst(card, /<h3[^>]*>([\s\S]*?)<\/h3>/i);
    const desc = extractFirst(card, /<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/i);
    if (title) add(title + (desc ? ' — ' + desc : ''), 'Downloads');
  }

  return entries;
}

// ── Spezialseiten-Extraktor (Notfall, Ressourcen) ───────

function extractSpecialIndex(html, moduleTitle, url, m) {
  const entries = [];
  const seen = new Set();

  function add(text, section) {
    const t = truncate(text);
    const key = t.substring(0, 80);
    if (seen.has(key) || t.length < 8) return;
    seen.add(key);
    entries.push({ m, mt: moduleTitle, s: section || moduleTitle, t, u: url });
  }

  let currentSection = moduleTitle;

  // Headings
  extractAll(html, /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi).forEach(t => {
    if (t.length > 5) {
      currentSection = t;
      add(t, moduleTitle);
    }
  });

  // Mini-guide headers
  extractAll(html, /<(?:button|summary)[^>]*class="[^"]*mg-header[^"]*"[^>]*>([\s\S]*?)<\/(?:button|summary)>/gi).forEach(t => add(t, currentSection));

  // Glossar terms
  extractAll(html, /<(?:button|dt)[^>]*class="[^"]*glossar-term[^"]*"[^>]*>([\s\S]*?)<\/(?:button|dt)>/gi).forEach(t => add(t, currentSection));

  // Paragraphs
  extractAll(html, /<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi).forEach(t => {
    if (t.length >= 30) add(t, currentSection);
  });

  // List items
  extractAll(html, /<li[^>]*>([\s\S]*?)<\/li>/gi).forEach(t => {
    if (t.length >= 20) add(t, currentSection);
  });

  return entries;
}

// ── Hauptlogik ──────────────────────────────────────────

function buildIndex() {
  let allEntries = [];

  for (const page of PAGES) {
    const filePath = path.join(ROOT, page.file);
    if (!fs.existsSync(filePath)) {
      console.warn('  ⚠ Datei nicht gefunden:', page.file);
      continue;
    }

    const rawHtml = fs.readFileSync(filePath, 'utf-8');
    const html = stripChrome(rawHtml);

    // Modul-Titel aus h1
    const h1 = extractFirst(rawHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const moduleTitle = h1 || page.file;

    let entries;
    switch (page.type) {
      case 'module':
        entries = extractModuleIndex(html, moduleTitle, page.url, page.m);
        break;
      case 'handouts':
        entries = extractHandoutIndex(html, moduleTitle, page.url, page.m);
        break;
      case 'special':
        entries = extractSpecialIndex(html, moduleTitle, page.url, page.m);
        break;
    }

    console.log('  ' + page.file + ': ' + entries.length + ' Einträge');
    allEntries = allEntries.concat(entries);
  }

  return allEntries;
}

// ── Ausgabe ─────────────────────────────────────────────

function formatIndex(index) {
  const entries = index.map(e => {
    const mt = e.mt.replace(/'/g, "\\'");
    const s = e.s.replace(/'/g, "\\'");
    const t = e.t.replace(/'/g, "\\'");
    return `{m:${e.m},mt:'${mt}',s:'${s}',t:'${t}',u:'${e.u}'}`;
  });
  return 'var SEARCH_INDEX=[' + entries.join(',') + '];';
}

// ── CLI ─────────────────────────────────────────────────

const args = process.argv.slice(2);
const checkMode = args.includes('--check');

console.log('Generiere Suchindex...');
const index = buildIndex();
const output = formatIndex(index);

if (checkMode) {
  if (!fs.existsSync(OUTPUT)) {
    console.error('❌ search-index.js existiert nicht. Bitte generieren: npm run build:search');
    process.exit(1);
  }
  const existing = fs.readFileSync(OUTPUT, 'utf-8').trim();
  if (existing === output) {
    console.log('✅ search-index.js ist aktuell (' + index.length + ' Einträge)');
    process.exit(0);
  } else {
    console.error('❌ search-index.js ist veraltet! Bitte neu generieren: npm run build:search');
    const existingCount = (existing.match(/\{m:/g) || []).length;
    console.error('   Aktuell: ' + existingCount + ' Einträge → Neu: ' + index.length + ' Einträge');
    process.exit(1);
  }
} else {
  fs.writeFileSync(OUTPUT, output, 'utf-8');
  console.log('✅ search-index.js generiert: ' + index.length + ' Einträge (' + (output.length / 1024).toFixed(1) + ' KB)');
}
