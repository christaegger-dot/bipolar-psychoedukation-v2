/**
 * Helper to load project scripts into the jsdom global scope.
 * Call loadMainJS() or loadSearchJS() in beforeAll/beforeEach.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';

const ROOT = resolve(import.meta.dirname, '..');

/**
 * Evaluate a JS file in the current global (window) scope.
 * Uses indirect eval so declarations land on the global scope.
 */
function evalScript(filename) {
  let code = readFileSync(resolve(ROOT, filename), 'utf-8');
  // Strip service-worker registration (won't work in jsdom)
  code = code.replace(
    "if ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js').catch(function(e) { console.warn('SW:', e); });\n}",
    '/* SW stripped */'
  );
  // Strip scrollIntoView calls (not supported in jsdom)
  code = code.replace(/\.scrollIntoView\([^)]*\)/g, '/* scrollIntoView stripped */');
  // Use indirect eval to keep vars in global scope
  const indirectEval = eval;
  indirectEval(code);
}

export function loadMainJS() {
  evalScript('main.js');
}

export function loadSearchJS() {
  // Provide a minimal SEARCH_INDEX global for search tests
  if (typeof globalThis.SEARCH_INDEX === 'undefined') {
    globalThis.SEARCH_INDEX = [];
  }
  evalScript('search.js');
}

/**
 * Build a minimal HTML page with common elements that main.js expects.
 */
export function setupMinimalDOM() {
  document.body.innerHTML = `
    <div id="progress-bar"></div>
    <div class="reading-progress"></div>
    <button id="back-to-top"></button>
    <div id="nav-links"></div>
    <button id="hamburger" aria-expanded="false" aria-label="Menü öffnen"></button>
    <div id="settings-panel"></div>
    <button id="settings-toggle" aria-expanded="false"></button>
    <div id="bookmark-panel"></div>
    <button id="nav-bookmark" aria-expanded="false"></button>
    <div id="bp-items"></div>
    <span id="font-state">A+</span>
    <span id="rm-state">Lesen</span>
    <div id="search-overlay">
      <input id="search-input" type="text">
      <div id="search-results"></div>
    </div>
    <div id="a11y-status" role="status" aria-live="polite" class="sr-only"></div>
    <div id="continue-reading" style="display:none"></div>
  `;
}
