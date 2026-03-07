# SVG-Diagramm-Audit Report (v2)

**Projekt:** Psychoedukation Bipolare Störung (PUK Zürich)
**Datum:** 1. März 2026
**Viewport-Referenz:** iPhone 390px
**Mindest-Schriftgrösse Mobile:** 11px
**Formel:** `font-size × (390 / viewBox-Breite)`
**Kontext:** Zweiter Audit-Durchlauf. Der erste Durchlauf (v1) hat 134 Textelemente von font-size 16 auf 17 korrigiert sowie tspan-Umbrüche, viewBox-Anpassungen und Dark-Mode-Lücken geschlossen.

---

## Übersicht

| # | Datei | Zeile | Beschreibung | viewBox | Klasse | Skalierungsfaktor (390px) |
|---|-------|-------|-------------|---------|--------|--------------------------|
| 1 | modul/1/index.html | 373 | Wellendiagramm bipolarer Verlauf | 0 0 600 237 | wave-chart | ×0.65 |
| 2 | modul/1/index.html | 451 | Belastungs-Eisberg | 0 0 600 337 | viz-svg | ×0.65 |
| 3 | modul/1/index.html | 604 | Hypervigilanz-Kreislauf | 0 0 600 303 | viz-svg | ×0.65 |
| 4 | modul/2/index.html | 306 | Vier Dimensionen der Beziehung | 0 0 600 283 | viz-svg | ×0.65 |
| 5 | modul/2/index.html | 409 | Erosion von Vertrauen/Nähe | 0 0 600 260 | viz-svg | ×0.65 |
| 6 | modul/3/index.html | 386 | Solidaritätserosion | 0 0 600 283 | burden-accumulation-svg | ×0.65 |
| 7 | modul/3/index.html | 473 | Glaswand-Illustration | 0 0 400 228 | glasswand-svg | ×0.975 |
| 8 | modul/4/index.html | 323 | EE-Teufelskreis | 0 0 340 402 | ee-flow-svg | ×1.147 |
| 9 | modul/4/index.html | 394 | Vier Barrieren der Grenzsetzung | 0 0 600 245 | viz-svg | ×0.65 |
| 10 | modul/4/index.html | 530 | Kommunikations-Kompass | 0 0 600 269 | viz-svg | ×0.65 |
| 11 | modul/5/index.html | 288 | Sauerstoffmaske | 0 0 120 90 | oxygen-svg | ×1.0 (feste CSS-Grösse) |
| 12 | modul/5/index.html | 359 | Krisenplan-Ampel (3 Stufen) | 0 0 600 226 | viz-svg | ×0.65 |
| 13 | modul/5/index.html | 551 | Grenzsetzungs-Spektrum | 0 0 600 205 | viz-svg | ×0.65 |
| 14 | modul/6/index.html | 344 | Fünf Säulen der Beziehung | 0 0 600 317 | viz-svg | ×0.65 |
| 15 | modul/6/index.html | 499 | Erwartung vs. Realität (Resilienz) | 0 0 600 299 | viz-svg | ×0.65 |

---

## Schriftgrössen-Inventar

| font-size | Anzahl | Mobile-Rendering (600er viewBox) | Mobile-Rendering (andere) | Status |
|-----------|--------|----------------------------------|---------------------------|--------|
| 30 | 9 | 19.5px | — | ✅ Sicher |
| 27 | 2 | 17.55px | — | ✅ Sicher |
| 24 | 2 | 15.6px | — | ✅ Sicher |
| 22 | 5 | 14.3px | — | ✅ Sicher |
| 21 | 6 | 13.65px | — | ✅ Sicher |
| 20 | 7 | 13.0px | — | ✅ Sicher |
| 19 | 12 | 12.35px | — | ✅ Sicher |
| 18 | 31 | 11.7px | — | ✅ Sicher |
| **17** | **150** | **11.05px** | — | ⚠️ Grenzwert |
| 15.5 | 8 | — | 17.8px (viewBox 340) | ✅ Sicher |
| 15 | 3 | — | 14.6px (vB 400), 17.2px (vB 340) | ✅ Sicher |
| 12 | 1 | — | 12.0px (oxygen, CSS 120px) | ✅ Sicher |
| 11 | 2 | — | 11.0px (oxygen, CSS 120px) | ⚠️ Grenzwert |

**Gesamt: 238 Textelemente in 15 SVGs**

---

## Detailanalyse pro SVG

---

### SVG #1 — modul/1/index.html:373 — Wellendiagramm bipolarer Verlauf

- viewBox: `0 0 600 237` | width/height: keine (CSS `width:100%`)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt (`viewBox`)
- Dark Mode Wrapper: ✅ CSS-basiert (`.wave-chart` → `background: rgba(255,255,255,0.95)`)
- Hart kodierte Farben: ✅ keine problematischen
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto` + Horizontal-Scroll <400px (`min-width: 420px`)
- **Probleme**: Keine
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #2 — modul/1/index.html:451 — Belastungs-Eisberg

- viewBox: `0 0 600 337` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17, 20 Elemente) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert (`.viz-svg`)
- Hart kodierte Farben: ✅ keine problematischen
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Titel bei y=16.5 — Oberlängen erreichen ~y=3, knapp am oberen viewBox-Rand
- **Fix-Vorschlag**: Niedrig — kosmetisch, kein Clipping

---

### SVG #3 — modul/1/index.html:604 — Hypervigilanz-Kreislauf

- viewBox: `0 0 600 303` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ⚠️ Annotation bei x=540 ("Körper in Alarmbereitschaft", 28 Zeichen) — rechter Rand bei ~x=586
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `#fafaf6` Hintergrund-Rect (durch CSS Dark-Mode-Schutz abgedeckt)
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Annotation-Block bei x=540 nahe am rechten Rand (~14px Abstand). Kein tatsächliches Clipping, da SVG-Container Padding hat.
- **Fix-Vorschlag**: Niedrig — kosmetisch

---

### SVG #4 — modul/2/index.html:306 — Vier Dimensionen der Beziehung

- viewBox: `0 0 600 283` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17, 16 Elemente) → ✅ ≥11px
- Text-Overflow: ✅ kein (x=590 mit `text-anchor="end"` → Text geht nach links)
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `#fafaf6` Hintergrund-Rect
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Keine
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #5 — modul/2/index.html:409 — Erosion von Vertrauen, Nähe und Leichtigkeit

- viewBox: `0 0 600 260` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein (x=595 mit `text-anchor="end"`)
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `#fafaf6`, `#fde8e0` Hintergründe
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: "Leichtigkeit & Spontanität" (x=310, ~27 Zeichen) — rechter Rand bei ~x=553, innerhalb viewBox
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #6 — modul/3/index.html:386 — Solidaritätserosion

- viewBox: `0 0 600 283` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert (`.burden-accumulation-svg`)
- Hart kodierte Farben: ⚠️ `#faf8f5` Hintergrund-Rect
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto` + Horizontal-Scroll <400px
- **Probleme**: Keine
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #7 — modul/3/index.html:473 — Glaswand-Illustration

- viewBox: `0 0 400 228` | width/height: keine (CSS `max-width:400px; width:100%`)
- Kleinste Textgrösse (Mobile 390px): **14.6px** (font-size 15) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert (`.glasswand-svg`)
- Hart kodierte Farben: ⚠️ `fill="white"` auf Gedankenblase (Zeile 502)
- Kontrast-Probleme: ✅ keine (weiss auf Hintergrund, durch CSS Dark-Mode-Schutz abgedeckt)
- Responsive: ✅ CSS `max-width:400px; width:100%`
- **Probleme**: Keine
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #8 — modul/4/index.html:323 — EE-Teufelskreis

- viewBox: `0 0 340 402` | width/height: keine (CSS `max-width:340px; width:100%`)
- Kleinste Textgrösse (Mobile 390px): **17.2px** (font-size 15, Skalierung ×1.147) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert (`.ee-flow-svg`)
- Hart kodierte Farben: ⚠️ `fill="white"` auf 4 Kreis-Nodes (Zeilen 346, 351, 356, 361)
- Kontrast-Probleme: ✅ keine (weisse Kreise mit farbigem Rand + Text darauf)
- Responsive: ✅ CSS `max-width:340px; width:100%`
- **Probleme**: Keine
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #9 — modul/4/index.html:394 — Vier Barrieren der Grenzsetzung

- viewBox: `0 0 600 245` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein (CTA-Text mit tspan-Umbruch aus v1-Fix)
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `#fafaf6` Hintergrund-Rect
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Unterer tspan bei y≈230, viewBox-Höhe 245 → 15px Abstand. Knapp aber OK.
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #10 — modul/4/index.html:530 — Kommunikations-Kompass

- viewBox: `0 0 600 269` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `fill="white"` (Zentral-Kreis, Zeile 534), `#fafaf6` Hintergrund
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Titel bei y=21.2 mit font-size 24 — Oberlängen bei ~y=3. Knapp.
- **Fix-Vorschlag**: Niedrig — kosmetisch

---

### SVG #11 — modul/5/index.html:288 — Sauerstoffmaske

- viewBox: `0 0 120 90` | width/height: CSS `120×90px` (fix, nicht responsive)
- Kleinste Textgrösse (Mobile): **11.0px** (font-size 11 bei CSS 120px) → ⚠️ Grenzwert
- Text-Overflow: ⚠️ "dann anderen" bei x=98 — rechter Rand bei ~x=140, ragt über viewBox (120)
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert (`.oxygen-svg` in Dark-Mode-Block, Zeile 4632)
- Hart kodierte Farben: ⚠️ `fill="white"` auf O₂-Text (Zeile 298)
- Kontrast-Probleme: ✅ keine (weiss auf farbigem Kreis)
- Responsive: ⚠️ Fixe CSS-Grösse 120×90px — nicht responsive, aber bewusst klein als Illustration
- **Probleme**:
  - font-size="11" (Zeilen 301, 309) → exakt 11.0px auf Mobile — Grenzwert
  - "dann anderen" bei x=98 mit `text-anchor="middle"` — Text ragt ~10px über rechte viewBox-Grenze
- **Fix-Vorschlag**: Niedrig — Illustration ist bewusst kompakt, Text ist Begleittext. Kein Handlungsbedarf.

---

### SVG #12 — modul/5/index.html:359 — Krisenplan-Ampel (3 Stufen)

- viewBox: `0 0 600 226` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein (v1-Fix hat tspan-Umbrüche für lange Texte eingebaut)
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `fill="white"` auf 3 Warnsymbole (!, !!, !!!), `#fafaf6` Hintergrund
- Kontrast-Probleme: ✅ keine (weiss auf farbigen Kreisen — rot/orange/gelb)
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Keine — v1-Fixes haben die kritischen font-size 13/14 auf 17 korrigiert
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #13 — modul/5/index.html:551 — Grenzsetzungs-Spektrum

- viewBox: `0 0 600 205` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `#fafaf6` Hintergrund-Rect
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Zitate bei x=80 und x=520 mit `text-anchor="middle"` — jeweiliger Rand ~5-10px vom viewBox-Edge. Kein Clipping.
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #14 — modul/6/index.html:344 — Fünf Säulen der Beziehung

- viewBox: `0 0 600 317` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17, 20 Elemente) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ✅ keine problematischen
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Keine
- **Fix-Vorschlag**: Keiner nötig

---

### SVG #15 — modul/6/index.html:499 — Erwartung vs. Realität (Resilienz-Welle)

- viewBox: `0 0 600 299` | width/height: keine (CSS)
- Kleinste Textgrösse (Mobile 390px): **11.05px** (font-size 17) → ✅ ≥11px
- Text-Overflow: ✅ kein
- viewBox-Schreibweise: ✅ korrekt
- Dark Mode Wrapper: ✅ CSS-basiert
- Hart kodierte Farben: ⚠️ `#fafaf6` Hintergrund-Rect
- Kontrast-Probleme: ✅ keine
- Responsive: ✅ CSS `width:100%; height:auto`
- **Probleme**: Y-Achsen-Labels "Besser"/"Belastet" bei x=5 — 5px vom linken Rand, `text-anchor="start"`. Knapp.
- **Fix-Vorschlag**: Niedrig — kosmetisch

---

## Zusammenfassung

### Geprüfte SVGs: 15

### Probleme pro Kategorie (aktueller Stand nach v1-Fixes)

| Kategorie | Status | Details |
|-----------|--------|---------|
| Text unter 11px (Mobile) | ✅ **0 Elemente** | Alle Texte ≥11px bei 390px Viewport |
| Text bei exakt 11.0–11.05px | ⚠️ **152 Elemente** | 150× font-size 17 (11.05px), 2× font-size 11 in Oxygen (11.0px) |
| Text-Overflow / Clipping | ✅ **0 akut** | Oxygen "dann anderen" ragt leicht über, kein visueller Impact |
| viewBox-Schreibweise (viewbox) | ✅ **0 Fehler** | Alle korrekt `viewBox` |
| Dark Mode Schutz | ✅ **Vollständig** | Alle 15 SVG-Klassen im CSS Dark-Mode-Block |
| Hart kodierte `white` fills | ⚠️ **10 Stellen** | Intentional: weiss auf farbigen Kreisen/Pfaden. Durch CSS-Schutz abgedeckt. |
| Hart kodierte `#fafaf6` Rects | ⚠️ **8 SVGs** | Redundant mit CSS Dark-Mode-Schutz, harmlos |
| Kontrast-Probleme | ✅ **0** | |
| Nicht responsiv | ⚠️ **1** (Oxygen: fixe 120×90px) | Bewusst als kleine Illustration, kein Fix nötig |

### Bewertung: Hoch / Mittel / Niedrig

**Hoch (unlesbar/abgeschnitten): 0 Probleme** ✅

**Mittel (Dark Mode/Kontrast): 0 Probleme** ✅

**Niedrig (kosmetisch): 5 Punkte**

| # | SVG | Beschreibung | Handlungsbedarf |
|---|-----|-------------|-----------------|
| 1 | Alle 600er SVGs | font-size 17 → 11.05px: knapp über 11px, bei 375px (iPhone SE) → 10.62px | Optional: 17→18 für Sicherheitsmarge |
| 2 | Oxygen (#11) | font-size 11 → exakt 11.0px | Akzeptabel: bewusst kompakte Illustration |
| 3 | Oxygen (#11) | "dann anderen" ragt ~10px über viewBox rechts | Minimal, SVG hat overflow:visible |
| 4 | Hypervigilanz (#3) | Annotation bei x=540 nahe am rechten Rand | ~14px Abstand, kein Clipping |
| 5 | 8 SVGs | `#fafaf6` Hintergrund-Rects redundant mit CSS Dark-Mode | Harmlos, kein Fix nötig |

---

## v3-Fix: font-size 17 → 18 (Sicherheitsmarge für 375px)

### Durchgeführter Fix

| Fix | Dateien | Elemente |
|-----|---------|----------|
| font-size 17 → 18 (alle 600er-viewBox SVGs) | modul/1-6 | **150 Textelemente** |

### Ergebnis nach v3-Fix

| font-size | Anzahl | Mobile 390px | Mobile 375px (iPhone SE) | Status |
|-----------|--------|-------------|--------------------------|--------|
| **18** | **181** | **11.7px** | **11.25px** | ✅ Sicher |
| 15.5 | 8 | — (viewBox 340: 17.8px) | 17.1px | ✅ Sicher |
| 15 | 3 | — (viewBox 400: 14.6px / 340: 17.2px) | 14.1/16.5px | ✅ Sicher |
| 12 | 1 | 12.0px (Oxygen) | 12.0px | ✅ Sicher |
| 11 | 2 | 11.0px (Oxygen) | 11.0px | ⚠️ Grenzwert |

**Gesamtergebnis:**
- ✅ **0 Textelemente unter 11px** bei 390px Viewport
- ✅ **0 Textelemente unter 11px** bei 375px Viewport (neu!)
- ⚠️ **2 Textelemente** bei exakt 11.0px (Oxygen-Illustration, bewusst kompakt)
- Hoch: **0 Probleme**
- Mittel: **0 Probleme**
- Niedrig: **4 kosmetische Punkte** (Oxygen Overflow, Edge-Proximity, #fafaf6 Rects)

---

## Änderungshistorie

| Version | Datum | Änderungen |
|---------|-------|-----------|
| v1 | 2026-03-01 | Erstaudit: 134 Textelemente unter 11px gefunden, alle gefixt (16→17) |
| v2 | 2026-03-01 | Gegenprobe: 0 unter 11px, 152 grenzwertig bei 11.0–11.05px |
| v3 | 2026-03-01 | Sicherheitsmarge: 150 Elemente von 17→18 für 375px-Support |

---

*Analysiert mit Claude Code, 1. März 2026*
