# Design-Audit: Bipolare Psychoedukation v2

**Datum:** 2026-03-21
**Scope:** shared.css + alle HTML-Dateien (13 Seiten + 404)
**Gesamturteil:** Professionell mit Optimierungspotential -- zu viele Varianten in Box-Typen, Schriftgroessen und Farbwerten.

---

## A. Box-/Card-Typen

**Befund: 38 distinct Box-/Card-Klassen**

Reduzierbar auf ca. 7 Grundtypen:

| Grundtyp | Beispiel-Klassen | Visuelles Muster |
|---|---|---|
| **Standard-Card** | `.module-card`, `.resource-card`, `.res-card`, `.nn-card` | white bg, border-radius, shadow, farbiger border-top |
| **Content-Card** | `.symptom-card`, `.rec-card`, `.erosion-card`, `.silent-mech-card`, `.children-col` | white bg, shadow-md, border-left oder border-top |
| **Interactive-Card** | `.decision-card`, `.ee-node`, `.loyalty-item`, `.sh-card` | white bg, hover-Effekte, border/shadow-Wechsel |
| **Detail-Panel** | `.hv-detail`, `.kk-detail`, `.sl-detail` | bg2/light bg, 1.5px border, 14px radius |
| **Info-Box** | `.vignette`, `.source-box`, `.notes-list`, `.lernziele` | bg2/light bg, kein shadow, oft border-left |
| **Highlight-Box** | `.quote-card`, `.manie-komm-card`, `.ee-exit-box`, `.hv-takeaway` | farbiger Hintergrund, border-left, thematisch |
| **Layout-Container** | `.selfcare-col`, `.coping-col`, `.ambiguous-loss-card` | white bg, overflow hidden, Kinder-Layout |

**Inkonsistenzen:**
- `border-radius` variiert: `var(--radius)` vs `8px` vs `10px` vs `12px` vs `14px`
- `padding` variiert stark: `0.5rem` bis `2.5rem`
- `box-shadow` teils `var(--shadow-sm)`, teils `var(--shadow-md)`, teils hardcoded

---

## B. Schriftgroessen

**Befund: 83 hardcoded font-size Deklarationen neben 438 variablen-basierten (84% var-Nutzung)**

### Definierte CSS-Variablen (7 Stufen)

| Variable | Wert |
|---|---|
| `--fs-xs` | 0.75rem |
| `--fs-sm` | 0.9rem |
| `--fs-base` | 1rem |
| `--fs-lg` | 1.1rem |
| `--fs-h3` | 1.25rem |
| `--fs-h2` | 1.6rem |
| `--fs-h1` | 1.7rem |

### Hardcoded Werte (Auswahl der haeufigsten)

- `0.85rem` (3x) -- koennte `--fs-sm` sein
- `0.75rem` (6x) -- koennte `--fs-xs` sein
- `1rem` (5x) -- koennte `--fs-base` sein
- `0.875rem` (3x) -- kein Variablen-Equivalent
- `0.7rem` (4x) -- kein Variablen-Equivalent
- `1.5rem` (3x) -- kein Variablen-Equivalent
- Pixel-Werte: `15px`, `17px`, `13px`, `11pt` -- Mischung von Einheiten

### Empfehlung
- 3 neue Variablen: `--fs-2xs: 0.7rem`, `--fs-md: 0.95rem`, `--fs-xl: 1.5rem`
- Damit 10 Stufen total, die ~80% der hardcoded Werte abdecken

---

## C. Farben

**Befund: 157 unique hardcoded Farbwerte + 50 CSS Custom Properties**

### Farbsystem (gut organisiert)

| Kategorie | Properties | Beispiele |
|---|---|---|
| **Basis** | 8 | `--bg`, `--bg2`, `--text`, `--white`, `--border`, `--muted` |
| **Modul-Farben** | 16 | `--m1` bis `--m8` + jeweils `-light` |
| **Status** | 8 | `--danger`, `--success`, `--warn` + Varianten |
| **Spezial** | 6 | `--anger-orange`, `--depress-text`, `--manie-bg/text`, `--schwei-blue/light` |
| **HV-Farben** | 12+ | `--hv-observe`, `--hv-tension`, `--hv-exhaust`, `--hv-recover` + Varianten |

### Hardcoded-Probleme

| Haeufigkeit | Wert | Empfehlung |
|---|---|---|
| 9x | `#bac` | Variable definieren |
| 7x | `#fff` | `var(--white)` verwenden |
| 5x | `rgba(0,0,0,0.2)` | `var(--shadow-color)` |
| 5x | `rgba(0,0,0,0.1)` | `var(--shadow-color-light)` |
| 4x | `rgba(255,255,255,0.6)` | `var(--overlay-light)` |
| 3x | `#ccc` | `var(--border)` pruefen |
| 117x | Einzelvorkommen | Einzelfallpruefung |

**Reduktionspotential:** 157 → ~40 durch Variablen-Nutzung und Deduplizierung

---

## D. SVG-Konsistenz

**Befund: 11+ inline SVGs ueber 10 Dateien, keine einheitliche Konvention**

### Gefundene SVG-Typen

| Typ | Anzahl | Beispiel |
|---|---|---|
| Dekorative Wellen | ~8 | `.section-wave`, viewBox `0 0 200 8` |
| Daten-Visualisierungen | 5 | Wave-Chart, Timeline, Trust-Chart |
| Zyklus-Diagramme | 2 | Hypervigilanz-Ring, EE-Ring |
| Illustrationen | 2 | Glaswand, Sauerstoffmaske |

### Inkonsistenzen

1. **Farb-Spezifikation:** Mischung aus `var(--m1)` und hardcoded `#c4a882` innerhalb desselben SVGs
2. **ViewBox:** Inkonsistente Padding-Konventionen (`0 0`, `-10 0`, `-15 0`)
3. **Stroke-Dasharray:** 5 verschiedene Muster (`4,4`, `5,3`, `5,4`, `6,4`, `4,2`)
4. **Stroke-Width:** Variiert von `.5` bis `2.5` ohne System
5. **Font-Family:** Nur 2 von 11 SVGs deklarieren Schrift explizit
6. **Accessibility:** Teilweise `aria-label` + `role="img"`, teilweise fehlend
7. **Styling-Strategie:** Inline-Attribute vs CSS-Klassen vs Hybrid -- kein einheitlicher Ansatz

### Empfehlung
SVG-Template-Standard definieren:
- Farben immer via CSS-Variablen
- Einheitliche Dasharray-Muster (2 Varianten max)
- viewBox-Konventionen festlegen
- Accessibility-Checklist pro SVG-Typ

---

## E. Toolbar / Navigation

**Befund (vor Fix):** 6 sichtbare Elemente in `.nav-controls`
**Nach Fix 2:** 2 sichtbare Icons (Suche + Settings), Lesezeichen ins Settings-Panel verschoben

---

## F. Typografie-Hierarchie

**Befund (vor Fix):** H2/H3-Ratio nur 1.12x (1.4/1.25), kaum unterscheidbar
**Nach Fix 3:** H2 = 1.6rem, Ratio jetzt 1.28x

### Verbleibendes Problem
- H1 (1.7rem) zu H2 (1.6rem) Ratio: nur 1.06x -- ebenfalls eng
- Empfehlung: H1 auf 1.9rem oder 2rem erhoehen (separater Fix)

---

## G. Dark-Mode-Kompatibilitaet

**Befund:** Gutes Dual-Mode-System mit `:root` und `.dark-mode` Selektoren.

Probleme:
- Hardcoded `#fff` und `#000` statt Variablen brechen im Dark Mode
- SVG-hardcoded Farben (z.B. `fill="#faf8f5"`) passen sich nicht an
- Einige Box-Shadows mit hardcoded rgba-Werten

---

## Priorisierte Fixes

### P1 -- Impact (sofort umsetzbar)

| # | Fix | Aufwand | Dateien |
|---|---|---|---|
| 1 | ~~Emojis entfernen (4 Stellen)~~ | done | 2 |
| 2 | ~~Toolbar konsolidieren (6 → 2)~~ | done | 13 + CSS |
| 3 | ~~H2-Schriftgroesse erhoehen~~ | done | CSS |
| 4 | ~~H1-Schriftgroesse erhoehen (1.7 → 1.9rem)~~ | done | CSS |
| 5 | ~~`#fff` → `var(--white)` (3 Fallbacks)~~ | done | CSS |

### P2 -- Konsistenz (mittel)

| # | Fix | Aufwand | Dateien |
|---|---|---|---|
| 6 | ~~2 neue `--fs-*` Variablen + Migration (89 Stellen, 78%→95%)~~ | done | CSS |
| 7 | `border-radius` auf 2 Werte standardisieren: `var(--radius)` + `var(--radius-lg)` | mittel | CSS |
| 8 | 38 Box-Typen auf 7 Grund-Mixins reduzieren | gross | CSS + HTML |
| 9 | SVG-Farben auf CSS-Variablen migrieren | mittel | HTML |

### P3 -- Feinschliff (spaeter)

| # | Fix | Aufwand | Dateien |
|---|---|---|---|
| 10 | Hardcoded Farben deduplizieren (157 → ~40) | gross | CSS |
| 11 | SVG-Template-Standard + Accessibility-Audit | mittel | HTML |
| 12 | Pixel/pt-Einheiten eliminieren (5 Stellen) | klein | CSS |
| 13 | Shadow-Farben als Variablen | klein | CSS |
