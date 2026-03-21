import { describe, it, expect, beforeEach } from 'vitest';
import { loadSearchJS, setupMinimalDOM } from './helpers.js';
import { loadMainJS } from './helpers.js';

describe('Search (search.js)', () => {
  beforeEach(() => {
    setupMinimalDOM();

    // Provide a realistic SEARCH_INDEX
    globalThis.SEARCH_INDEX = [
      { t: 'Krisenplan erstellen und Notfallkarte vorbereiten', u: '/modul/6/', m: 6, mt: 'Selbstfürsorge und Handeln' },
      { t: 'Suizidgedanken erkennen und Hilfe holen', u: '/notfall/', m: 9, mt: 'Notfall & Krisenhilfe' },
      { t: 'Depression verstehen und begleiten', u: '/modul/1/', m: 1, mt: 'Die bipolare Störung verstehen' },
      { t: 'Resilienz aufbauen und pflegen durch soziale Kontakte', u: '/modul/7/', m: 7, mt: 'Resilienz und Paardynamik' },
      { t: 'Expressed Emotion und Kommunikation in der Beziehung', u: '/modul/3/', m: 3, mt: 'Beziehungen unter Druck' },
      { t: 'Erschöpfung und Burnout bei Angehörigen erkennen', u: '/modul/4/', m: 4, mt: 'Loyalitätskonflikte' },
      { t: 'Lithium Medikation und Behandlung der bipolaren Störung', u: '/modul/1/', m: 1, mt: 'Die bipolare Störung verstehen' },
      { t: 'Trennung und Scheidung als letzter Ausweg', u: '/modul/2/', m: 2, mt: 'Beziehungen unter Druck' },
    ];

    loadMainJS();
    loadSearchJS();
  });

  describe('SYNONYMS', () => {
    it('maps crisis terms to professional equivalents', () => {
      expect(SYNONYMS['selbstmord']).toContain('suizid');
      expect(SYNONYMS['umbringen']).toContain('suizid');
    });

    it('maps everyday terms to clinical terms', () => {
      expect(SYNONYMS['burnout']).toContain('erschöpfung');
      expect(SYNONYMS['medikamente']).toContain('medikation');
      expect(SYNONYMS['tabletten']).toContain('lithium');
    });

    it('maps emotional terms', () => {
      expect(SYNONYMS['traurig']).toContain('depression');
      expect(SYNONYMS['wut']).toContain('aggression');
    });
  });

  describe('CRISIS_TERMS', () => {
    it('includes critical crisis keywords', () => {
      expect(CRISIS_TERMS).toContain('suizid');
      expect(CRISIS_TERMS).toContain('selbstmord');
      expect(CRISIS_TERMS).toContain('notfall');
      expect(CRISIS_TERMS).toContain('hoffnungslos');
    });

    it('has at least 10 crisis terms', () => {
      expect(CRISIS_TERMS.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('doSearch()', () => {
    it('shows hint for queries shorter than 2 characters', () => {
      doSearch('a');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).toContain('sr-hint');
      expect(results.innerHTML).toContain('Geben Sie einen Begriff ein');
    });

    it('shows hint for empty query', () => {
      doSearch('  ');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).toContain('sr-hint');
    });

    it('finds results for a direct keyword', () => {
      doSearch('Krisenplan');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).toContain('sr-item');
      expect(results.innerHTML).toContain('Krisenplan');
    });

    it('finds results via synonym expansion', () => {
      doSearch('tabletten');
      const results = document.getElementById('search-results');
      // Should find Lithium/Medikation entry via synonym mapping
      expect(results.innerHTML).toContain('sr-item');
    });

    it('shows crisis banner for crisis search terms', () => {
      doSearch('suizid');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).toContain('sr-crisis');
      expect(results.innerHTML).toContain('Dargebotene Hand');
      expect(results.innerHTML).toContain('143');
      expect(results.innerHTML).toContain('144');
    });

    it('shows crisis banner for synonym-mapped crisis terms', () => {
      doSearch('selbstmord');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).toContain('sr-crisis');
    });

    it('shows no-results message for gibberish', () => {
      doSearch('xyzzyplugh');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).toContain('sr-empty');
      expect(results.innerHTML).toContain('Keine Treffer');
    });

    it('escapes HTML in no-results message', () => {
      doSearch('<script>alert(1)</script>');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).not.toContain('<script>');
      expect(results.innerHTML).toContain('&lt;script&gt;');
    });

    it('prioritizes Notfall page for crisis searches', () => {
      doSearch('suizid');
      const results = document.getElementById('search-results');
      const items = results.querySelectorAll('.sr-item');
      // First non-crisis-banner result should link to /notfall/
      if (items.length > 0) {
        expect(items[0].getAttribute('href')).toBe('/notfall/');
      }
    });

    it('limits results to 12', () => {
      // Add many entries to the index
      for (let i = 0; i < 20; i++) {
        SEARCH_INDEX.push({ t: 'Test keyword entry ' + i, u: '/test/' + i, m: 1, mt: 'Test' });
      }
      doSearch('test keyword');
      const results = document.getElementById('search-results');
      const items = results.querySelectorAll('.sr-item');
      expect(items.length).toBeLessThanOrEqual(12);
    });

    it('highlights search terms in results', () => {
      doSearch('Resilienz');
      const results = document.getElementById('search-results');
      expect(results.innerHTML).toContain('<mark>');
    });
  });
});
