import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS } from './helpers.js';

describe('Accordion (FAQ / Glossar / Mini-Guide)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="progress-bar"></div>
      <span id="font-state">A+</span>
      <span id="rm-state">Lesen</span>
      <div id="continue-reading" style="display:none"></div>
      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-q" aria-expanded="false">Frage 1</button>
          <div class="faq-a">Antwort 1</div>
        </div>
        <div class="faq-item">
          <button class="faq-q" aria-expanded="false">Frage 2</button>
          <div class="faq-a">Antwort 2</div>
        </div>
        <div class="faq-item">
          <button class="faq-q" aria-expanded="false">Frage 3</button>
          <div class="faq-a">Antwort 3</div>
        </div>
      </div>
    `;
    loadMainJS();
  });

  it('opens an accordion item on click', () => {
    const btn = document.querySelector('.faq-q');
    toggleFaq(btn);
    expect(btn.closest('.faq-item').classList.contains('open')).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes other items when opening a new one (mutual exclusion)', () => {
    const btns = document.querySelectorAll('.faq-q');

    toggleFaq(btns[0]);
    expect(btns[0].closest('.faq-item').classList.contains('open')).toBe(true);

    toggleFaq(btns[1]);
    expect(btns[0].closest('.faq-item').classList.contains('open')).toBe(false);
    expect(btns[0].getAttribute('aria-expanded')).toBe('false');
    expect(btns[1].closest('.faq-item').classList.contains('open')).toBe(true);
  });

  it('closes an item when clicking the same button again', () => {
    const btn = document.querySelector('.faq-q');
    toggleFaq(btn);
    expect(btn.closest('.faq-item').classList.contains('open')).toBe(true);

    toggleFaq(btn);
    expect(btn.closest('.faq-item').classList.contains('open')).toBe(false);
  });
});
