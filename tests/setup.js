/**
 * Test Setup — loads main.js and search.js into jsdom global scope.
 *
 * Since the project uses vanilla JS with global functions (no ES modules),
 * we eval the scripts in the jsdom window context so all functions
 * are available as globals during tests.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// Provide a minimal localStorage / sessionStorage mock (jsdom provides these,
// but we ensure they're clean before each suite)
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});
