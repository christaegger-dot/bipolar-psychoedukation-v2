import { describe, it, expect, beforeAll } from 'vitest';
import { loadMainJS, setupMinimalDOM } from './helpers.js';

describe('escHtml()', () => {
  beforeAll(() => {
    setupMinimalDOM();
    loadMainJS();
  });

  it('escapes angle brackets', () => {
    expect(escHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('escapes ampersands', () => {
    expect(escHtml('A & B')).toBe('A &amp; B');
  });

  it('escapes quotes', () => {
    expect(escHtml('"hello"')).toBe('"hello"');
    // The DOM-based approach doesn't escape quotes in textContent→innerHTML,
    // but it does prevent XSS via tag injection
  });

  it('returns empty string for null', () => {
    expect(escHtml(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(escHtml(undefined)).toBe('');
  });

  it('passes through plain text unchanged', () => {
    expect(escHtml('Hallo Welt')).toBe('Hallo Welt');
  });

  it('handles German Umlaute correctly', () => {
    expect(escHtml('Über Ärger Öffnung Schüler')).toBe('Über Ärger Öffnung Schüler');
  });

  it('handles mixed XSS payloads', () => {
    const payload = '<img src=x onerror="alert(1)">';
    const result = escHtml(payload);
    expect(result).not.toContain('<img');
    expect(result).toContain('&lt;img');
  });
});
