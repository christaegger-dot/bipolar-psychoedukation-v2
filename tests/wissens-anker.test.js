import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS } from './helpers.js';

describe('Wissens-Anker Quiz (waSelect / waCheck)', () => {
  describe('waSelect (with ID system)', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="progress-bar"></div>
        <span id="font-state">A+</span>
        <span id="rm-state">Lesen</span>
        <div id="continue-reading" style="display:none"></div>
        <div id="a11y-status" role="status" aria-live="polite" class="sr-only"></div>
        <div id="wa-q1" class="wissens-anker">
          <button class="wa-opt" data-correct="false" data-fb="Falsch, weil...">Option A</button>
          <button class="wa-opt" data-correct="true" data-fb="Richtig!">Option B</button>
          <div class="wa-feedback"></div>
        </div>
      `;
      loadMainJS();
    });

    it('marks correct answer with .correct class', () => {
      const btn = document.querySelectorAll('#wa-q1 .wa-opt')[1]; // correct one
      waSelect(btn, 'q1');
      expect(btn.classList.contains('correct')).toBe(true);
    });

    it('marks wrong answer with .wrong class', () => {
      const btn = document.querySelectorAll('#wa-q1 .wa-opt')[0]; // wrong one
      waSelect(btn, 'q1');
      expect(btn.classList.contains('wrong')).toBe(true);
    });

    it('always highlights the correct answer', () => {
      const btns = document.querySelectorAll('#wa-q1 .wa-opt');
      waSelect(btns[0], 'q1'); // pick wrong
      expect(btns[1].classList.contains('correct')).toBe(true);
    });

    it('disables all buttons after selection', () => {
      const btns = document.querySelectorAll('#wa-q1 .wa-opt');
      waSelect(btns[0], 'q1');
      btns.forEach(b => expect(b.disabled).toBe(true));
    });

    it('shows feedback text', () => {
      const btn = document.querySelectorAll('#wa-q1 .wa-opt')[1];
      waSelect(btn, 'q1');
      const fb = document.querySelector('#wa-q1 .wa-feedback');
      expect(fb.textContent).toBe('Richtig!');
      expect(fb.classList.contains('show')).toBe(true);
      expect(fb.classList.contains('correct')).toBe(true);
    });
  });

  describe('waCheck (Modul 7 simple system)', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="progress-bar"></div>
        <span id="font-state">A+</span>
        <span id="rm-state">Lesen</span>
        <div id="continue-reading" style="display:none"></div>
        <div id="a11y-status" role="status" aria-live="polite" class="sr-only"></div>
        <div class="wissens-anker">
          <button class="wa-opt" data-correct="false">Wrong</button>
          <button class="wa-opt" data-correct="true">Correct</button>
          <div class="wa-feedback"></div>
        </div>
      `;
      loadMainJS();
    });

    it('shows correct feedback for right answer', () => {
      const btn = document.querySelectorAll('.wa-opt')[1];
      waCheck(btn);
      const fb = document.querySelector('.wa-feedback');
      expect(fb.classList.contains('correct')).toBe(true);
      expect(fb.textContent).toContain('Richtig');
    });

    it('shows incorrect feedback for wrong answer', () => {
      const btn = document.querySelectorAll('.wa-opt')[0];
      waCheck(btn);
      const fb = document.querySelector('.wa-feedback');
      expect(fb.classList.contains('wrong')).toBe(true);
      expect(fb.textContent).toContain('Nicht ganz');
    });

    it('disables all buttons and marks them', () => {
      const btns = document.querySelectorAll('.wa-opt');
      waCheck(btns[0]);
      btns.forEach(b => {
        expect(b.disabled).toBe(true);
        expect(b.classList.contains('disabled')).toBe(true);
      });
    });
  });
});
