import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const swContent = readFileSync(resolve(ROOT, 'sw.js'), 'utf-8');

describe('Service Worker (sw.js)', () => {
  describe('CORE_ASSETS', () => {
    it('includes homepage', () => {
      expect(swContent).toContain("'/'");
    });

    it('includes all 8 modules', () => {
      for (let i = 1; i <= 8; i++) {
        expect(swContent).toContain(`'/modul/${i}/'`);
      }
    });

    it('includes shared CSS and JS', () => {
      expect(swContent).toMatch(/shared\.css/);
      expect(swContent).toMatch(/main\.js/);
      expect(swContent).toMatch(/search\.js/);
    });

    it('includes fonts', () => {
      expect(swContent).toMatch(/lora.*\.woff2/);
      expect(swContent).toMatch(/source-sans.*\.woff2/);
    });

    it('includes special pages', () => {
      expect(swContent).toContain('/handouts/');
      expect(swContent).toContain('/handouts/notfall/');
      expect(swContent).toContain('/handouts/ressourcen/');
      expect(swContent).toContain('/404.html');
    });
  });

  describe('REDIRECT_MAP', () => {
    it('maps /notfall/ to /handouts/notfall/', () => {
      expect(swContent).toMatch(/['"]\/notfall\/['"].*['"]\/handouts\/notfall\/['"]/s);
    });

    it('maps /impressum/ to /handouts/impressum/', () => {
      expect(swContent).toMatch(/['"]\/impressum\/['"].*['"]\/handouts\/impressum\/['"]/s);
    });

    it('maps /ressourcen/ to /handouts/ressourcen/', () => {
      expect(swContent).toMatch(/['"]\/ressourcen\/['"].*['"]\/handouts\/ressourcen\/['"]/s);
    });
  });

  describe('Lifecycle events', () => {
    it('calls skipWaiting on install', () => {
      expect(swContent).toContain('skipWaiting');
    });

    it('calls clients.claim on activate', () => {
      expect(swContent).toContain('clients.claim');
    });

    it('cleans old caches on activate', () => {
      expect(swContent).toContain('caches.delete');
    });

    it('only handles GET requests', () => {
      expect(swContent).toContain("e.request.method !== 'GET'");
    });

    it('provides offline 503 fallback', () => {
      expect(swContent).toContain('503');
      expect(swContent).toContain('Offline');
    });
  });

  describe('Cache versioning', () => {
    it('uses a versioned cache name', () => {
      const match = swContent.match(/CACHE_NAME\s*=\s*'([^']+)'/);
      expect(match).not.toBeNull();
      expect(match[1]).toMatch(/^bipolar-puk-v\d+$/);
    });
  });
});
