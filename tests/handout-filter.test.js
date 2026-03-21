import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS } from './helpers.js';

describe('Handout Filter (filterHandouts)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="progress-bar"></div>
      <span id="font-state">A+</span>
      <span id="rm-state">Lesen</span>
      <div id="continue-reading" style="display:none"></div>
      <div class="filter-bar">
        <button class="filter-chip active" data-filter="alle">Alle</button>
        <button class="filter-chip" data-filter="infografik">Infografik</button>
        <button class="filter-chip" data-filter="text">Text</button>
      </div>
      <div class="handout-grid">
        <div class="card-wrap"><a class="pdf-card" data-category="infografik">Infografik 1</a></div>
        <div class="card-wrap"><a class="pdf-card" data-category="text">Text 1</a></div>
        <div class="card-wrap"><a class="pdf-card" data-category="infografik">Infografik 2</a></div>
        <div class="card-wrap"><a class="pdf-card" data-category="text">Text 2</a></div>
      </div>
    `;
    loadMainJS();
  });

  it('shows all cards when filter is "alle"', () => {
    filterHandouts('alle');
    const hidden = document.querySelectorAll('.card-wrap.filter-hidden');
    expect(hidden.length).toBe(0);
  });

  it('filters to only infografik cards', () => {
    filterHandouts('infografik');
    const visible = document.querySelectorAll('.card-wrap:not(.filter-hidden)');
    const hidden = document.querySelectorAll('.card-wrap.filter-hidden');
    expect(visible.length).toBe(2);
    expect(hidden.length).toBe(2);
    visible.forEach(w => {
      expect(w.querySelector('.pdf-card').dataset.category).toBe('infografik');
    });
  });

  it('filters to only text cards', () => {
    filterHandouts('text');
    const visible = document.querySelectorAll('.card-wrap:not(.filter-hidden)');
    expect(visible.length).toBe(2);
    visible.forEach(w => {
      expect(w.querySelector('.pdf-card').dataset.category).toBe('text');
    });
  });

  it('updates active chip', () => {
    filterHandouts('infografik');
    const chips = document.querySelectorAll('.filter-chip');
    expect(chips[0].classList.contains('active')).toBe(false); // "alle"
    expect(chips[1].classList.contains('active')).toBe(true);  // "infografik"
  });
});
