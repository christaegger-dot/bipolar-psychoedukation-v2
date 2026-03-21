# SVG Style Guide

Standard fuer alle inline SVGs im Projekt. Gilt fuer neue SVGs und bei Ueberarbeitung bestehender.

---

## 1. Farben

**Immer CSS-Variablen verwenden.** Keine hardcoded Hex-Werte.

```html
<!-- Richtig -->
<rect fill="var(--bg)" />
<text fill="var(--svg-label)">Achse</text>
<path stroke="var(--m7)" />

<!-- Falsch -->
<rect fill="#fafaf6" />
<text fill="#8a8070">Achse</text>
```

### Verfuegbare Variablen fuer SVGs

| Zweck | Variable |
|---|---|
| Hintergrund | `var(--bg)`, `var(--bg2)` |
| Achsen-Labels, Legende | `var(--svg-label)` |
| Linien, Achsen | `var(--border)` |
| Text (Titel) | `var(--text)` |
| Text (gedaempft) | `var(--muted)` |
| Modul-Farben | `var(--m1)` bis `var(--m8)` |
| Modul-Farben hell | `var(--m1-light)` bis `var(--m8-light)` |
| Phasen-Hintergrund | `var(--manie-bg)`, `var(--m6-light)`, `var(--m7-light)` |
| Spezial (HV) | `var(--hv-center-border)`, `var(--hv-center-sub)` |
| Danger/Success | `var(--danger)`, `var(--success)`, `var(--warn)` |

### Ausnahmen

Hardcoded Farben sind erlaubt fuer:
- Illustrative Elemente mit einmaligen Farbnuancen (z.B. Sauerstoffmaske)
- Opacity-Variationen innerhalb einer Illustration
- Farben, die keiner bestehenden Variable entsprechen

---

## 2. Stroke-Dasharray

Maximal 2 Muster verwenden:

| Muster | Verwendung |
|---|---|
| `4,4` | Standard-Strichlinie (Achsen, Trennlinien) |
| `6,4` | Betonte Strichlinie (Pfade, Verbindungen) |

```html
<!-- Standard -->
<line stroke-dasharray="4,4" />

<!-- Betont -->
<path stroke-dasharray="6,4" />
```

---

## 3. Stroke-Width

| Breite | Verwendung |
|---|---|
| `0.5` - `1` | Achsen, Hilfslinien, Raster |
| `1.5` - `2` | Datenlinien, Pfade, Verbindungen |

```html
<line stroke-width="1" />   <!-- Achse -->
<path stroke-width="2" />   <!-- Datenlinie -->
```

---

## 4. Schrift

| Eigenschaft | Wert |
|---|---|
| Font-Family | `Source Sans 3, sans-serif` |
| Labels/Legende | `var(--fs-2xs)` oder `var(--fs-xs)` via CSS |
| Titel | `var(--fs-sm)` oder `var(--fs-base)` via CSS |
| Achsen-Text | `var(--svg-label)` als fill |

**Hinweis:** font-size in SVG-Attributen kann CSS-Variablen verwenden, wenn das SVG inline ist. Fuer Mobile-Overrides die Groessen in shared.css per Media Query steuern (siehe `.viz-svg text`).

---

## 5. Accessibility

Jedes SVG muss folgende Attribute haben:

```html
<svg role="img" aria-label="Beschreibung des Diagramms" viewBox="...">
```

### Checkliste

- [ ] `role="img"` gesetzt
- [ ] `aria-label` mit praegnanter Beschreibung (1-2 Saetze)
- [ ] Kein wichtiger Text nur als SVG-Text (Screenreader lesen `aria-label`, nicht den SVG-Inhalt)
- [ ] Ausreichender Farbkontrast (min. 3:1 fuer grafische Elemente)
- [ ] Responsive: viewBox statt feste width/height

### Beispiel

```html
<svg class="viz-svg" role="img"
     aria-label="Wellenfoermiger Verlauf der Belastung ueber 5 Jahre mit normalisierten Rueckschlaegen"
     viewBox="0 0 600 250">
  <rect fill="var(--bg)" width="600" height="250" rx="8" />
  <text fill="var(--svg-label)" font-family="Source Sans 3, sans-serif"
        font-size="18" x="7" y="50">Besser</text>
  <line stroke="var(--border)" stroke-width="1" x1="42" x2="575" y1="203" y2="203" />
  <path stroke="var(--m7)" stroke-width="2" stroke-dasharray="6,4" fill="none"
        d="M60 180 Q150 60 250 140 Q350 200 450 100 Q550 40 575 80" />
</svg>
```

---

## 6. ViewBox-Konventionen

| Typ | ViewBox | Hinweis |
|---|---|---|
| Daten-Visualisierung | `0 0 600 [hoehe]` | 600px Breite als Standard |
| Zyklus-Diagramm | `0 0 420 420` | Quadratisch |
| Dekorative Welle | `0 0 200 8` | Flach, wird per CSS skaliert |

Kein negatives Padding im ViewBox (`-10 0 ...`) verwenden — stattdessen Elemente innerhalb des ViewBox positionieren.
