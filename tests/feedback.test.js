import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS } from './helpers.js';

describe('Module Feedback (giveFeedback)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="progress-bar"></div>
      <span id="font-state">A+</span>
      <span id="rm-state">Lesen</span>
      <div id="continue-reading" style="display:none"></div>
      <div class="module-feedback">
        <button class="feedback-btn" data-action="giveFeedback" data-param="m1" data-val="helpful">Hilfreich</button>
        <button class="feedback-btn" data-action="giveFeedback" data-param="m1" data-val="not-helpful">Nicht hilfreich</button>
        <div id="fb-m1"></div>
      </div>
    `;
    loadMainJS();
  });

  it('disables all buttons after feedback', () => {
    const btn = document.querySelector('.feedback-btn');
    giveFeedback(btn, 'm1', 'helpful');
    const buttons = document.querySelectorAll('.feedback-btn');
    buttons.forEach(b => {
      expect(b.disabled).toBe(true);
    });
  });

  it('marks clicked button with .voted class', () => {
    const btn = document.querySelector('.feedback-btn');
    giveFeedback(btn, 'm1', 'helpful');
    expect(btn.classList.contains('voted')).toBe(true);
  });

  it('shows thanks message', () => {
    const btn = document.querySelector('.feedback-btn');
    giveFeedback(btn, 'm1', 'helpful');
    const thanks = document.getElementById('fb-m1');
    expect(thanks.classList.contains('show')).toBe(true);
  });

  it('persists feedback to localStorage', () => {
    const btn = document.querySelector('.feedback-btn');
    giveFeedback(btn, 'm1', 'helpful');
    expect(localStorage.getItem('bipolar-fb-m1')).toBe('helpful');
  });
});
