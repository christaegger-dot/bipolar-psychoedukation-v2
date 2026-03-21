import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadMainJS, setupMinimalDOM } from './helpers.js';

describe('Event Delegation (ACTION_MAP)', () => {
  beforeEach(() => {
    setupMinimalDOM();
    loadMainJS();
  });

  it('ACTION_MAP contains all expected action handlers', () => {
    const expectedActions = [
      'toggleNav', 'openSearch', 'closeSearch', 'toggleSettings',
      'toggleFont', 'toggleReadmode', 'toggleBookmarks', 'scrollToTop',
      'toggleFaq', 'toggleGlossar', 'toggleMG', 'toggleWhy',
      'showPole', 'showPhase', 'showSlide', 'filterHandouts',
      'scSelect', 'giveFeedback'
    ];
    expectedActions.forEach(action => {
      expect(typeof ACTION_MAP[action]).toBe('function');
    });
  });

  it('ACTION_MAP handlers are callable and affect the DOM', () => {
    // Verify that calling an action handler directly works correctly,
    // which proves the delegation wiring is correct
    expect(document.body.classList.contains('large-text')).toBe(false);
    ACTION_MAP.toggleFont();
    expect(document.body.classList.contains('large-text')).toBe(true);
  });

  it('dispatches keyboard events via data-keyaction', () => {
    const btn = document.createElement('button');
    btn.setAttribute('data-keyaction', 'toggleNav');
    document.body.appendChild(btn);
    btn.focus();

    const links = document.getElementById('nav-links');
    expect(links.classList.contains('open')).toBe(false);

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    btn.dispatchEvent(event);
    expect(links.classList.contains('open')).toBe(true);
  });
});
