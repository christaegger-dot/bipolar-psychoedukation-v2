# Visuelles Konsistenz-Audit

**Datum:** 2026-03-08
**Scope:** `shared.css` (5929 Zeilen), alle HTML-Module (M1–M7), Notfall-Seite, Startseite
**Methode:** Automatisierte Extraktion + manuelle Prüfung

---

## 1. Farbkonsistenz

### 1.1 CSS-Variablen (`:root`)

**51 Farb-Variablen** definiert in `:root` (Zeilen 5–107):

| Kategorie | Variablen | Beispiel |
|---|---|---|
| Basis-UI | `--bg`, `--bg2`, `--bg-alt`, `--bg3`, `--border`, `--text`, `--muted`, `--white` | `#f7f5f2` |
| Modulfarben | `--m1` bis `--m7` + je `*-light` | `--m1: #4a7fa5` |
| Gefahrfarben | `--danger`, `--danger-dark`, `--danger-light`, `--danger-hover` | `#b03030` |
| Erfolg | `--success`, `--success-dark`, `--success-light`, `--success-bg` | `#2D6A4F` |
| Krise | `--crisis`, `--crisis-hover`, `--crisis-light` | `#a02015` |
| Bereichsspezifisch | `--manie-bg`, `--manie-text`, `--schwei-blue`, `--stigma-brown`, etc. | 12 Variablen |
| Sonstiges | `--mark-bg`, `--indigo`, `--text-head` | 3 Variablen |

**Alle 7 Module haben eigene Farben:** ✅
- `--m1` (#4a7fa5) bis `--m7` (#4a6878) + jeweilige `--m1-light` bis `--m7-light`

### 1.2 Hardcoded Hex-Farben

**85 einzigartige Hex-Farben** insgesamt in `shared.css`. Davon:
- **51 in `:root`** als CSS-Variable definiert
- **~34 hardcoded** ausserhalb von `:root`

**Hardcoded Farben ausserhalb von `:root` (keine Variable):**

| Farbe | Kontext | Bewertung |
|---|---|---|
| `#2a3550`, `#1a2a40` | `.closing-banner` Gradient | ⚠️ Sollte Variable sein |
| `#3d3530` | `.ee-flow-svg circle` Focus-Ring | ⚠️ Hardcoded |
| `#8a6a3a`, `#fdf6e8` | `.ee-flow-svg circle.active` | ⚠️ Dupliziert `--m4` / `--m4-light` |
| `#666` | Print-Styles (Link-Suffix) | ✅ OK für Print |
| `#ccc` | Print-Styles (Borders) | ✅ OK für Print |
| `#ddd` | Nicht-kritisch | ⚠️ Minor |
| `#fff` | Shorthand für `#ffffff` | ✅ OK |
| ~20 Dark-Mode-Farben | `prefers-color-scheme: dark` Block | ✅ Korrekt dort definiert |

**44 einzigartige `rgba()`-Werte** im File, davon viele für:
- Schatten (shadows) — konsistentes Pattern
- Overlays und Transparenzen — erwartetes Verhalten
- Footer-Farben auf dunklem Hintergrund

### 1.3 Hardcoded Farben in HTML-Inline-Styles

**18 Inline-Style-Instanzen** mit hardcoded Farben in HTML-Dateien:

| Datei | Zeilen | Farben | Problem |
|---|---|---|---|
| `modul/1/index.html` | 687–688, 768–769 | `#5a504a`, `#8a7e76` | ⚠️ Interaktive SVG-Fallbacks |
| `modul/4/index.html` | 565–566, 635–636 | `#5a504a`, `#8a7e76` | ⚠️ Interaktive SVG-Fallbacks |
| `modul/6/index.html` | 390–391, 470–471 | `#5a504a`, `#8a7e76` | ⚠️ Interaktive SVG-Fallbacks |
| `modul/2/index.html` | 2 Instanzen | `var()` mit Fallback | ✅ Akzeptabel |
| `modul/7/index.html` | 2 Instanzen | `var()` mit Fallback | ✅ Akzeptabel |
| `handouts/notfall/index.html` | 2 Instanzen | `var()` mit Fallback | ✅ Akzeptabel |

**Hauptproblem:** Die Farben `#5a504a` und `#8a7e76` in den interaktiven SVG-Elementen (M1, M4, M6) sind nicht als CSS-Variablen definiert. Sie entsprechen ungefähr `--muted` (#605850) — könnten zu `var(--muted)` konsolidiert werden.

### 1.4 Eingebettete `<style>`-Blöcke in HTML (schwerwiegend)

Drei Module enthalten **eingebettete `<style>`-Blöcke** mit umfangreichen hardcoded Farben für interaktive SVG-Komponenten:

| Datei | Zeilen | Hardcoded Hex-Farben | Komponente |
|---|---|---|---|
| `modul/1/index.html` | 556–620 | ~120+ | Belastungskreislauf-Stationen |
| `modul/4/index.html` | 457–508 | ~70+ | EE-Quadranten |
| `modul/6/index.html` | 269–333 | ~90+ | Solidaritäts-Säulen |

**Beispiel-Farben:** `#d4a843`, `#e67e22`, `#c0392b`, `#6b9e7e`, `#c2dece`, `#c8bade`, `#e6b8af` — keine davon als CSS-Variable definiert.

**Zusätzlich: SVG-Attribute mit hardcoded Farben:**
- `modul/2/index.html`: `fill="#4a7fa5"`, `fill="#5a7a5a"`, `fill="#9a6a8a"`, `fill="#c07030"`, `fill="#94a3b8"`
- `modul/3/index.html`: `fill="#6a9abc"`

**Gesamtzahl hardcoded Farben in HTML: ~150+ einzigartige Hex-Werte** (weit mehr als die 18 Inline-Style-Instanzen allein).

### 1.5 Zusammenfassung Farben

| Metrik | Ist | Soll | Status |
|---|---|---|---|
| Einzigartige Hex-Farben in shared.css | 85 | ≤40–50 | ⚠️ Hoch |
| Davon als Variable definiert | 51 | Möglichst alle | ⚠️ ~34 hardcoded |
| Hardcoded in HTML-Inline-Styles | 6 unique Werte | 0 | ⚠️ |
| Hardcoded in HTML-`<style>`-Blöcken | ~150+ unique | 0 | 🔴 Kritisch |
| Hardcoded in SVG fill-Attributen | 6 Werte | 0 | ⚠️ |
| Modulfarben --m1 bis --m7 | 7/7 | 7/7 | ✅ |
| Semantische Gefahrfarben | Vorhanden | Vorhanden | ✅ |

**Empfehlungen:**
1. Die ~20 Dark-Mode-Farben sind korrekt und bleiben dort
2. Die ~14 verbleibenden hardcoded Farben in shared.css (Closing-Banner, EE-Flow-SVG, etc.) sollten als CSS-Variablen extrahiert werden
3. `#5a504a` und `#8a7e76` in HTML-Inline-Styles durch `var(--muted)` ersetzen
4. `#8a6a3a` und `#fdf6e8` im EE-Flow-SVG sind Duplikate von `--m4` / `--m4-light`
5. **Priorität:** Die eingebetteten `<style>`-Blöcke in M1, M4 und M6 enthalten die grösste Farb-Drift. Langfristig sollten diese Farben als CSS-Variablen in shared.css definiert und referenziert werden — kurzfristig ist das Dark-Mode-Risiko gering, da die SVGs bereits mit hellem Hintergrund geschützt werden

---

## 2. Typografie

### 2.1 Schriftarten

| Schriftart | Typ | Verwendung |
|---|---|---|
| `'Source Sans 3'` | Sans-Serif | Body, UI, Navigation, Beschreibungen |
| `'Lora'` | Serif | Überschriften, Zitate, Erfahrungsberichte, Zahlen |

**2 Familien (1 Serif + 1 Sans-Serif):** ✅ Perfekt

### 2.2 Font-Size-Stufen

**CSS-Variablen (8 Stufen, in `:root` definiert):**

| Variable | Wert | Verwendung |
|---|---|---|
| `--fs-xs` | 0.75rem (12px) | Labels, Quellen, Badges |
| `--fs-sm` | 0.9rem (14.4px) | Hilfstexte, Beschreibungen |
| `--fs-base` | 1rem (16px) | Fliesstext |
| `--fs-md` | 1rem (16px) | Haupttext (= `--fs-base`) |
| `--fs-lg` | 1.1rem (17.6px) | Abschnittstitel, Intro |
| `--fs-h3` | 1.25rem (20px) | Karten-Titel |
| `--fs-h2` | 1.4rem (22.4px) | Sektions-Überschriften |
| `--fs-h1` | 1.7rem (27.2px) | Seiten-Titel |

**Anmerkung:** `--fs-md` und `--fs-base` sind identisch (beide 1rem). Könnte zu einer Variable konsolidiert werden.

**Hardcoded Font-Sizes (ausserhalb des Systems):**

| Wert | Wo | Problem |
|---|---|---|
| `0.75em`, `0.7em`, `0.7rem` | Vereinzelt | ⚠️ Nahe an `--fs-xs`, aber nicht identisch |
| `0.8rem` | Vereinzelt | ⚠️ Zwischen `--fs-xs` und `--fs-sm` |
| `1.2rem` | Vereinzelt | ⚠️ Zwischen `--fs-lg` und `--fs-h3` |
| `1.5rem` | Vereinzelt | ⚠️ Zwischen `--fs-h3` und `--fs-h2` |
| `2.1rem`, `3.4rem`, `3.5rem`, `4rem`, `6rem` | Spezialzweck (grosse Zahlen, Zierzeichen) | ✅ OK |
| `clamp(1.9rem, 5vw, 2.9rem)` | Hero h1 | ✅ Responsive Skalierung |
| `0.75rem`, `0.78rem`, `0.875rem`, `0.88rem` | Inline-Styles in HTML | ⚠️ Nicht aus dem System |
| `18px` | SVG-Texte | ✅ OK (SVG-Kontext) |
| `11pt` | Print-Styles | ✅ OK (Print) |

**Fazit:** 8 definierte Stufen (Soll: 6–8) ✅, aber **~12 hardcoded Werte** ausserhalb des Systems.

### 2.3 Font-Weights

| Weight | Bedeutung | Status |
|---|---|---|
| `400` (normal) | Fliesstext | ✅ |
| `600` | Semi-Bold (Titel, Labels) | ✅ |
| `700` | Bold (Nummern, Buttons, Highlights) | ✅ |

**Exakt 3 Gewichte:** ✅ Perfekt

---

## 3. Abstände

### 3.1 Spacing-System

**7 Spacing-Variablen** definiert in `:root`:

| Variable | Wert |
|---|---|
| `--sp-2xs` | 0.25rem (4px) |
| `--sp-xs` | 0.4rem (6.4px) |
| `--sp-half` | 0.5rem (8px) |
| `--sp-sm` | 0.8rem (12.8px) |
| `--sp-1` | 1rem (16px) |
| `--sp-md` | 1.2rem (19.2px) |
| `--sp-ml` | 1.5rem (24px) |
| `--sp-lg` | 2rem (32px) |
| `--sp-xl` | 3rem (48px) |

### 3.2 Tatsächliche Nutzung

| Metrik | Anzahl |
|---|---|
| Einzigartige Margin-Werte | 62 |
| Einzigartige Padding-Werte | 104 |

**Die Spacing-Variablen werden verwendet**, aber die Mehrheit der Abstände ist **hardcoded** mit direkten rem/px-Werten. Häufigste hardcoded Werte:

- `0.25rem`, `0.4rem`, `0.5rem` — entsprechen `--sp-2xs`, `--sp-xs`, `--sp-half`
- `0.8rem`, `1rem`, `1.2rem`, `1.5rem`, `2rem` — entsprechen `--sp-sm` bis `--sp-lg`
- `0.75rem`, `1.4rem`, `1.6rem`, `2.5rem` — **ausserhalb** der definierten Skala

### 3.3 Auffällige Pixel-Werte

| Wert | Kontext | Bewertung |
|---|---|---|
| `17px` | Tooltip-System (padding/margin) | ⚠️ Ungewöhnlich, vermutlich bewusst (Kompensation) |
| `7px` | border-radius vereinzelt | ✅ OK |
| `5px` | border-radius | ✅ OK |
| `42px`, `56px` | UI-Elemente (Buttons, Icons) | ✅ Funktionale Werte |

**Fazit:** Die Pixel-Werte folgen grösstenteils gängigen Mustern. Einzig `17px` fällt als mathematisch ungewöhnlich auf (Zeilen 5615–5616, Tooltip-System).

### 3.4 Empfehlungen

1. **Spacing-Variablen konsequenter nutzen.** Von ~280 Spacing-Deklarationen nutzen nur ~67 (24%) CSS-Variablen. ~66% der Werte entsprechen zwar der Skala, verwenden aber hardcoded rem-Werte statt Variablen. Werte wie `0.5rem`, `0.8rem`, `1rem` könnten durch `var(--sp-half)`, `var(--sp-sm)`, `var(--sp-1)` ersetzt werden.
2. **Padding-Vielfalt reduzieren.** 104 einzigartige Padding-Werte ist sehr hoch. Viele sind Varianten wie `0.5rem 0.75rem` vs. `0.5rem 0.8rem` — könnten vereinheitlicht werden.
3. **Off-Scale-Werte konsolidieren.** 38 rem-Werte liegen ausserhalb der definierten Skala: `0.75rem` (8×), `1.4rem` (8×), `1.6rem` (5×) sind die häufigsten. `0.75rem` ist nahe genug an `--sp-sm` (0.8rem) um vereinheitlicht zu werden.

---

## 4. Komponentenkonsistenz

### 4.1 Karten-Vergleich

| Komponente | border-radius | box-shadow | padding |
|---|---|---|---|
| `.module-card` | `var(--radius)` (10px) | `var(--shadow-sm)` | *(via children)* |
| `.rec-card` | `12px` | `var(--shadow-md)` | `1.2rem var(--sp-md)` |
| `.erosion-card` | `12px` | `var(--shadow-md)` | `1.2rem` |
| `.symptom-card` | `10px` | `var(--shadow-md)` | `0.8rem 1rem` |
| `.stigma-card` | `12px` | `var(--shadow-md)` | `1rem` |
| `.resource-card` | `12px` | `var(--shadow-md)` | `1.2rem` |
| `.nn-card` | `var(--radius)` (10px) | `var(--shadow)` | `1rem var(--sp-md)` |
| `.selfcare-col` | `12px` | `var(--shadow-md)` | *(via children)* |
| `.coping-col` | `12px` | `var(--shadow-md)` | *(via children)* |

**Befunde:**
- ⚠️ **border-radius inkonsistent:** Manche verwenden `var(--radius)` (= 10px), andere hardcoded `12px`
- ✅ **box-shadow** ist grösstenteils konsistent (`--shadow-md`), ausser `.module-card` (`--shadow-sm`) und `.nn-card` (`--shadow`)
- ⚠️ **padding** variiert stark zwischen Karten-Typen

**Empfehlung:** `border-radius: 12px` durch `var(--radius)` ersetzen, oder `--radius: 12px` setzen für Einheitlichkeit.

### 4.2 Buttons

| Button | padding | font-size | border-radius |
|---|---|---|---|
| `.nav-btn` | `0.25rem 0.75rem` | `var(--fs-sm)` | `99px` |
| `.cta-btn` | *(nicht explizit)* | *(nicht explizit)* | *(nicht explizit)* |
| `.pole-tab` | `0.75rem 0.5rem` | `var(--fs-sm)` | — |
| `.phase-tab` | `0.75rem 0.5rem` | — | `10px` |
| `.slider-tab` | `0.75rem 0.5rem` | `var(--fs-sm)` | — |
| `.copy-btn` | `0.25rem 0.4rem` | `var(--fs-xs)` | `6px` |

**Befunde:**
- Tab-Buttons (pole-tab, phase-tab, slider-tab) sind untereinander im Padding konsistent (`0.75rem 0.5rem`)
- `.cta-btn` hat **keine Basis-Styles** — nur Hover-Effekt und Modul-Farbvarianten. Padding/Grösse fehlen
- 🔴 **Touch-Target-Problem:** `.phase-tab` und `.slider-tab` haben kein `min-height: 44px` auf Mobile. `.nav-btn` und `.pole-tab` haben Mobile-Overrides mit `min-height: 44px` — aber phase-tab und slider-tab nicht. Das ist eine **Accessibility-Lücke** (WCAG 2.5.5)

**Zusätzlich: Border-Behandlung der Karten inkonsistent:**

| Karte | Border | Breite |
|---|---|---|
| `.rec-card` | `border-left` | `3px` |
| `.erosion-card`, `.stigma-card`, `.resource-card` | `border-top` | `3px` |
| `.nn-card` | `border-left` | `4px` |
| `.module-card` | `border-top` | `4px` |

Kein einheitliches Pattern: mal links, mal oben, mal 3px, mal 4px.

### 4.3 Erfahrungsberichte

Die Erfahrungsberichte (`.exp-report`, `.exp-body`, `.exp-note`) sind **in einer einzigen CSS-Definition** (Zeilen 1618–1732) und werden in allen Modulen identisch verwendet.

- ✅ `.exp-report`: `border-radius: 16px`, `box-shadow: 0 4px 24px rgba(...)` — einheitlich
- ✅ `.exp-body`: `font-size: var(--fs-base)`, `line-height: 1.8`, `font-family: Lora` — einheitlich
- ✅ `.exp-note`: `font-size: var(--fs-xs)`, identisches Layout — einheitlich
- ✅ Varianten `.exp-report-m5` und `.exp-report-m7` für modulspezifische Farben

**Erfahrungsberichte sind vollständig konsistent.** ✅

---

## 5. Responsive Design

### 5.1 Breakpoints

| Breakpoint | Verwendung |
|---|---|
| `400px` | SVG-Skalierung für sehr kleine Screens |
| `480px` | Phase-Tabs → vertikal, Notfall-Nummern |
| `540px` | Manie-Kommunikation, Trialog |
| `600px` | SVG horizontal-scroll Trigger |
| `640px` | Erfahrungsberichte Phase-Grid, Schweigepflicht |
| `768px` | Navigation → Hamburger-Menü |

**6 Breakpoint-Breiten, 28 @media-Queries** insgesamt. Die Verteilung:
- `480px`: 10 Queries (häufigster Breakpoint)
- `600px`: 7 Queries
- `640px`: 4 Queries
- `768px`: 2 Queries
- `540px`: 2 Queries
- `400px`: 1 Query

Angemessen für die Komplexität. ⚠️ Hinweis: 3 leere @media-Blöcke (Zeilen 2155, 5523, 5750) können entfernt werden.

Zusätzlich:
- `@media (hover: none)` — Touch-Geräte
- `@media (prefers-reduced-motion: reduce)` — Barrierefreiheit

### 5.2 Fixe Breiten

| Element | Breite | Risiko |
|---|---|---|
| `.bookmark-panel` | `240px` | ✅ Fixiert, aber `position: fixed` |
| `.burden-label` | `240px` (160px mobil) | ✅ Responsive Anpassung vorhanden |
| `.oxygen-svg` | `120px` | ✅ Klein genug |
| Tooltip `.tt-box` | `220px` (180px mobil) | ✅ Responsive Anpassung vorhanden |
| SVG `.svg-scroll-mobile svg` | `min-width: 500px` | ✅ In scroll-Container |

**Keine problematischen fixen Breiten gefunden.** ✅

### 5.3 Bilder

**Keine `<img>`-Tags** in den HTML-Dateien gefunden. Alle Grafiken sind inline SVGs, die via CSS skaliert werden (`width: 100%`, `viewBox`). Print-Styles setzen `img { max-width: 100% !important; }` als Sicherheitsnetz.

**Kein Overflow-Risiko durch Bilder.** ✅

---

## 6. Dark Mode

### 6.1 Status: Vollständig implementiert ✅

`@media (prefers-color-scheme: dark)` Block ab Zeile 4322, **~112 Zeilen**.

**Abgedeckt:**
- ✅ Alle Basis-Variablen werden überschrieben (`--bg`, `--bg2`, `--text`, `--muted`, etc.)
- ✅ Alle `--m*-light`-Variablen werden für dunkle Hintergründe angepasst
- ✅ Schatten-Variablen (`--shadow-*`) werden verstärkt
- ✅ SVG-Diagramme erhalten hellen Hintergrund (schützt hardcoded SVG-Farben)
- ✅ Komponenten-spezifische Overrides (Nav, Cards, Tabs, Search, Modals)
- ✅ `color-scheme: dark` auf body
- ✅ Bilder leicht abgedunkelt (`opacity: 0.92`)

**Lücken:**
- ⚠️ Hardcoded Farben in HTML-Inline-Styles (`#5a504a`, `#8a7e76`) werden im Dark Mode nicht angepasst
- ⚠️ `.closing-banner` Gradient (`#2a3550` → `#1a2a40`) hat keinen Dark-Mode-Override (visuell vermutlich OK, da bereits dunkel)

---

## 7. Print-Styles

### 7.1 Status: Vorhanden ✅

`@media print` Block ab Zeile 3163, **~40 Zeilen**.

**Abgedeckt:**
- ✅ Nav, Back-to-Top, Buttons, FABs werden ausgeblendet
- ✅ `body { font-size: 11pt; background: white; color: black; }`
- ✅ Links werden mit URL-Suffix ergänzt (`a[href]::after`)
- ✅ Relative Links bekommen Domain-Prefix
- ✅ Cards: `box-shadow: none; border: 1px solid #ccc`
- ✅ Versteckte Panels (Akkordeons, Tabs) werden sichtbar (`display: block !important`)
- ✅ `break-inside: avoid` für Module, Insights, Reflexionen
- ✅ `@page { margin: 2cm 1.5cm; }`
- ✅ `img { max-width: 100% !important; }`

**Lücken:**
- ⚠️ Keine explizite Farbanpassung für Modul-Farben (bleiben bunt im Druck)
- ⚠️ SVG-Diagramme könnten im Druck unleserlich sein (keine Print-Optimierung für SVGs)
- ⚠️ Erfahrungsberichte haben keine `break-inside: avoid`

---

## 8. Gesamtübersicht

| Bereich | Bewertung | Details |
|---|---|---|
| **Farbsystem (shared.css)** | ⚠️ Gut, aber Drift | 51 Variablen, ~34 hardcoded in CSS |
| **Farbsystem (HTML)** | 🔴 Kritisch | ~150+ hardcoded Farben in `<style>`-Blöcken (M1, M4, M6) |
| **Typografie** | ✅ Sehr gut | 2 Familien, 8 Stufen, 3 Gewichte |
| **Abstände** | ⚠️ Variablen existieren, wenig genutzt | 9 Variablen, 24% Adoption, 104 unique Paddings |
| **Karten** | ⚠️ Leichte Inkonsistenzen | border-radius 10px vs 12px, Border-Position/Breite uneinheitlich |
| **Buttons** | ⚠️ Touch-Target-Lücke | `.phase-tab` und `.slider-tab` fehlt `min-height: 44px` auf Mobile |
| **Erfahrungsberichte** | ✅ Perfekt | Einheitliche CSS-Definition |
| **Responsive** | ✅ Sehr gut | 6 Breakpoint-Breiten, 28 Queries, keine Overflow-Risiken |
| **Dark Mode** | ✅ Vollständig | ~112 Zeilen, alle Variablen + Komponenten |
| **Print** | ✅ Gut | Grundlagen vorhanden, kleine Lücken |

### Priorisierte Empfehlungen

**Priorität 1 (Quick Wins):**
1. `min-height: 44px` für `.phase-tab` und `.slider-tab` auf Mobile-Breakpoints (Accessibility)
2. `border-radius: 12px` → `var(--radius)` in allen Karten (oder `--radius` auf 12px ändern)
3. `#8a6a3a` / `#fdf6e8` in `.ee-flow-svg` durch `var(--m4)` / `var(--m4-light)` ersetzen
4. `--fs-md` entfernen (= `--fs-base`), alle Referenzen konsolidieren
5. 3 leere @media-Blöcke entfernen (Zeilen 2155, 5523, 5750)

**Priorität 2 (Mittelfristig):**
6. Hardcoded Inline-Farben `#5a504a`, `#8a7e76` in M1/M4/M6 durch CSS-Klassen ersetzen
7. Spacing-Variablen konsequenter einsetzen (grösster ROI: Paddings, aktuell 24% Adoption)
8. `.closing-banner` Gradient als Variable definieren
9. `.cta-btn` Basis-Styles definieren (aktuell nur Hover + Modul-Farben)

**Priorität 3 (Langfristig):**
10. Eingebettete `<style>`-Blöcke in M1/M4/M6 (~150+ hardcoded Farben) nach shared.css extrahieren
11. Print: `break-inside: avoid` für `.exp-report`
12. Print: SVG-Diagramme optimieren oder ausblenden
13. Padding-Vielfalt von 104 auf ~30–40 reduzieren
14. Border-Behandlung der Karten vereinheitlichen (Position: top vs left, Breite: 3px vs 4px)
