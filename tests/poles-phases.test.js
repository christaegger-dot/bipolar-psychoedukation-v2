import { describe, it, expect, beforeEach } from 'vitest';
import { loadMainJS } from './helpers.js';

describe('Poles & Phases (Modul 1)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="progress-bar"></div>
      <span id="font-state">A+</span>
      <span id="rm-state">Lesen</span>
      <div id="continue-reading" style="display:none"></div>
      <button class="pole-tab active" data-pole="manie" aria-selected="true">Manie</button>
      <button class="pole-tab" data-pole="stabil" aria-selected="false">Stabil</button>
      <button class="pole-tab" data-pole="depression" aria-selected="false">Depression</button>
      <div class="pole-panel" id="pole-manie">Manie content</div>
      <div class="pole-panel hidden" id="pole-stabil">Stabil content</div>
      <div class="pole-panel hidden" id="pole-depression">Depression content</div>

      <div class="phase-model-wrap">
        <button class="phase-tab active" data-phase="1">Phase 1</button>
        <button class="phase-tab" data-phase="2">Phase 2</button>
        <div class="phase-content" id="phase-1">Phase 1 content</div>
        <div class="phase-content hidden" id="phase-2">Phase 2 content</div>
      </div>

      <div class="slide-wrap" id="slide-0">Slide 0</div>
      <div class="slide-wrap hidden" id="slide-1">Slide 1</div>
      <button class="slider-tab active" aria-selected="true">Tab 0</button>
      <button class="slider-tab" aria-selected="false">Tab 1</button>
    `;
    loadMainJS();
  });

  describe('showPole()', () => {
    it('switches to stabil pole', () => {
      showPole('stabil');
      expect(document.getElementById('pole-manie').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('pole-stabil').classList.contains('hidden')).toBe(false);
      expect(document.getElementById('pole-depression').classList.contains('hidden')).toBe(true);
    });

    it('updates tab aria-selected', () => {
      showPole('depression');
      const tabs = document.querySelectorAll('.pole-tab');
      expect(tabs[0].getAttribute('aria-selected')).toBe('false');
      expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    });

    it('activates the correct tab', () => {
      showPole('stabil');
      const tabs = document.querySelectorAll('.pole-tab');
      expect(tabs[0].classList.contains('active')).toBe(false);
      expect(tabs[1].classList.contains('active')).toBe(true);
    });
  });

  describe('showPhase()', () => {
    it('switches to phase 2', () => {
      showPhase(2);
      expect(document.getElementById('phase-1').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('phase-2').classList.contains('hidden')).toBe(false);
    });

    it('updates phase tab active state', () => {
      showPhase(2);
      const tabs = document.querySelectorAll('.phase-tab');
      expect(tabs[0].classList.contains('active')).toBe(false);
      expect(tabs[1].classList.contains('active')).toBe(true);
    });
  });

  describe('showSlide()', () => {
    it('switches to slide 1', () => {
      showSlide(1);
      expect(document.getElementById('slide-0').classList.contains('hidden')).toBe(true);
      expect(document.getElementById('slide-1').classList.contains('hidden')).toBe(false);
    });

    it('updates slider tab aria-selected', () => {
      showSlide(1);
      const tabs = document.querySelectorAll('.slider-tab');
      expect(tabs[0].getAttribute('aria-selected')).toBe('false');
      expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    });
  });
});
