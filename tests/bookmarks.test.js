import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS } from './helpers.js';

describe('Bookmarks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="bookmark-panel"></div>
      <button id="nav-bookmark" aria-expanded="false"></button>
      <div id="bp-items"></div>
      <div id="progress-bar"></div>
      <span id="font-state">A+</span>
      <span id="rm-state">Lesen</span>
      <div id="continue-reading" style="display:none"></div>
    `;
    loadMainJS();
  });

  describe('initBookmarks()', () => {
    it('loads bookmarks from localStorage', () => {
      localStorage.setItem('bipolar-bookmarks', JSON.stringify({ 'm1-intro': 'Einleitung Modul 1' }));
      initBookmarks();
      expect(Object.keys(bookmarks)).toContain('m1-intro');
    });

    it('handles empty localStorage gracefully', () => {
      initBookmarks();
      expect(Object.keys(bookmarks).length).toBe(0);
    });

    it('handles invalid JSON in localStorage', () => {
      localStorage.setItem('bipolar-bookmarks', 'not-json');
      initBookmarks();
      // Should not throw, bookmarks should be empty
      expect(typeof bookmarks).toBe('object');
    });

    it('shows empty message when no bookmarks exist', () => {
      initBookmarks();
      const container = document.getElementById('bp-items');
      expect(container.innerHTML).toContain('bp-empty');
      expect(container.innerHTML).toContain('Lesezeichen werden hier angezeigt');
    });
  });

  describe('renderBookmarksList()', () => {
    it('renders cross-page bookmarks with module links', () => {
      bookmarks['m3-ee-zyklus'] = 'EE-Zyklus';
      renderBookmarksList();
      const container = document.getElementById('bp-items');
      expect(container.innerHTML).toContain('/modul/3/');
      expect(container.innerHTML).toContain('EE-Zyklus');
    });

    it('escapes bookmark titles to prevent XSS', () => {
      bookmarks['m1-test'] = '<img src=x onerror=alert(1)>';
      renderBookmarksList();
      const container = document.getElementById('bp-items');
      expect(container.innerHTML).not.toContain('<img src=x');
      expect(container.innerHTML).toContain('&lt;img');
    });
  });
});
