import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS } from './helpers.js';

describe('Self-Check Quiz (scSelect / showScResult)', () => {
  beforeEach(() => {
    // Build quiz DOM
    document.body.innerHTML = `
      <div id="sc-result"></div>
      ${[1,2,3,4,5].map(q => `
        <div class="sc-q" data-q="${q}">
          <button class="sc-opt" data-action="scSelect" data-q="${q}" data-val="ja">Ja</button>
          <button class="sc-opt" data-action="scSelect" data-q="${q}" data-val="nein">Nein</button>
        </div>
      `).join('')}
    `;

    loadMainJS();
    // Reset answers
    if (typeof scAnswers !== 'undefined') {
      Object.keys(scAnswers).forEach(k => delete scAnswers[k]);
    }
  });

  function answerAll(yesCount) {
    for (let q = 1; q <= 5; q++) {
      const val = q <= yesCount ? 'ja' : 'nein';
      const btns = document.querySelectorAll(`.sc-q[data-q="${q}"] .sc-opt`);
      const btn = val === 'ja' ? btns[0] : btns[1];
      scSelect(btn, q, val);
    }
  }

  it('shows green result for 0-1 "ja" answers', () => {
    answerAll(1);
    const result = document.getElementById('sc-result');
    expect(result.innerHTML).toContain('gut aufgestellt');
    expect(result.classList.contains('visible')).toBe(true);
  });

  it('shows yellow result for 2-3 "ja" answers', () => {
    answerAll(3);
    const result = document.getElementById('sc-result');
    expect(result.innerHTML).toContain('Belastungszeichen');
  });

  it('shows red result for 4-5 "ja" answers', () => {
    answerAll(5);
    const result = document.getElementById('sc-result');
    expect(result.innerHTML).toContain('Handlungsbedarf');
    expect(result.innerHTML).toContain('0800 33 66 55');
  });

  it('marks selected button with .selected class', () => {
    const btn = document.querySelector('.sc-q[data-q="1"] .sc-opt');
    scSelect(btn, 1, 'ja');
    expect(btn.classList.contains('selected')).toBe(true);
  });

  it('deselects previous choice when re-selecting', () => {
    const btns = document.querySelectorAll('.sc-q[data-q="1"] .sc-opt');
    scSelect(btns[0], 1, 'ja');
    expect(btns[0].classList.contains('selected')).toBe(true);

    scSelect(btns[1], 1, 'nein');
    expect(btns[0].classList.contains('selected')).toBe(false);
    expect(btns[1].classList.contains('selected')).toBe(true);
  });

  it('does not show result until all 5 questions answered', () => {
    for (let q = 1; q <= 4; q++) {
      const btn = document.querySelector(`.sc-q[data-q="${q}"] .sc-opt`);
      scSelect(btn, q, 'ja');
    }
    const result = document.getElementById('sc-result');
    expect(result.classList.contains('visible')).toBe(false);
  });

  it('sets ARIA attributes on result', () => {
    answerAll(0);
    const result = document.getElementById('sc-result');
    expect(result.getAttribute('role')).toBe('status');
    expect(result.getAttribute('aria-live')).toBe('polite');
  });
});
