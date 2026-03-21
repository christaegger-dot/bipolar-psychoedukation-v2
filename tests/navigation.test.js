import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS, setupMinimalDOM } from './helpers.js';

describe('Navigation & UI', () => {
  beforeEach(() => {
    setupMinimalDOM();
    loadMainJS();
  });

  describe('toggleNav()', () => {
    it('toggles .open class on nav-links', () => {
      const links = document.getElementById('nav-links');
      expect(links.classList.contains('open')).toBe(false);

      toggleNav();
      expect(links.classList.contains('open')).toBe(true);

      toggleNav();
      expect(links.classList.contains('open')).toBe(false);
    });

    it('updates hamburger aria-expanded', () => {
      const btn = document.getElementById('hamburger');
      expect(btn.getAttribute('aria-expanded')).toBe('false');

      toggleNav();
      expect(btn.getAttribute('aria-expanded')).toBe('true');
      expect(btn.getAttribute('aria-label')).toBe('Menü schliessen');

      toggleNav();
      expect(btn.getAttribute('aria-expanded')).toBe('false');
      expect(btn.getAttribute('aria-label')).toBe('Menü öffnen');
    });
  });

  describe('toggleSettings()', () => {
    it('toggles settings panel', () => {
      const panel = document.getElementById('settings-panel');
      expect(panel.classList.contains('open')).toBe(false);

      toggleSettings();
      expect(panel.classList.contains('open')).toBe(true);

      toggleSettings();
      expect(panel.classList.contains('open')).toBe(false);
    });

    it('updates aria-expanded on toggle', () => {
      const toggle = document.getElementById('settings-toggle');
      toggleSettings();
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });

    it('closes bookmark panel when opening settings', () => {
      const bp = document.getElementById('bookmark-panel');
      bp.classList.add('open');

      toggleSettings();
      expect(bp.classList.contains('open')).toBe(false);
    });
  });

  describe('toggleBookmarks()', () => {
    it('toggles bookmark panel', () => {
      const panel = document.getElementById('bookmark-panel');
      toggleBookmarks();
      expect(panel.classList.contains('open')).toBe(true);

      toggleBookmarks();
      expect(panel.classList.contains('open')).toBe(false);
    });
  });

  describe('toggleFont()', () => {
    it('toggles large-text class on body', () => {
      expect(document.body.classList.contains('large-text')).toBe(false);

      toggleFont();
      expect(document.body.classList.contains('large-text')).toBe(true);
      expect(document.getElementById('font-state').textContent).toBe('A−');

      toggleFont();
      expect(document.body.classList.contains('large-text')).toBe(false);
      expect(document.getElementById('font-state').textContent).toBe('A+');
    });

    it('persists font preference to localStorage', () => {
      toggleFont();
      expect(localStorage.getItem('bipolar-font')).toBe('large');

      toggleFont();
      expect(localStorage.getItem('bipolar-font')).toBe('normal');
    });
  });

  describe('toggleReadmode()', () => {
    it('toggles readmode class on body', () => {
      toggleReadmode();
      expect(document.body.classList.contains('readmode')).toBe(true);

      toggleReadmode();
      expect(document.body.classList.contains('readmode')).toBe(false);
    });
  });
});
