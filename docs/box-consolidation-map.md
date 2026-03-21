# Box-Typen Konsolidierung: Mapping

**Status:** Phase A (Analyse) — NICHT umsetzen ohne Freigabe

---

## Ziel-Grundtypen (7)

| # | Typ | bg | padding | shadow | radius | border |
|---|---|---|---|---|---|---|
| 1 | **Standard-Card** | var(--white) | var(--sp-lg) 1.5rem | var(--shadow-sm) | var(--radius) | border-top: 4px solid Modulfarbe |
| 2 | **Content-Card** | var(--white) | 1.2rem var(--sp-md) | var(--shadow-md) | var(--radius) | border-left: 3px solid Modulfarbe |
| 3 | **Interactive-Card** | var(--white) | 1.2rem var(--sp-md) | var(--shadow-md) | var(--radius) | border-left: 3px solid Modulfarbe + hover: shadow-lg, translateY(-2px) |
| 4 | **Detail-Panel** | var(--bg2) | var(--sp-md) | none | var(--radius-lg) | 1.5px solid var(--border) |
| 5 | **Info-Box** | var(--bg2) | var(--sp-sm) var(--sp-md) | none | var(--radius-sm) | border-left: 3px solid Modulfarbe |
| 6 | **Highlight-Box** | Modul-light | 1rem var(--sp-md) | none | var(--radius) | border-left: 4px solid Modulfarbe |
| 7 | **Layout-Container** | var(--white) | 0 | none | var(--radius) | none, overflow: hidden |

---

## Mapping: 38 Klassen → 7 Grundtypen

### 1. Standard-Card (4 Klassen)

| Klasse | Aktuell | Aenderungen | Diff |
|---|---|---|---|
| **.module-card** | bg: white, shadow: shadow-sm, radius: radius, border-top: 4px | padding: nicht gesetzt → var(--sp-lg) 1.5rem | minimal (Kinder haben eigenes Padding) |
| **.resource-card** | bg: white, p: 1.2rem, shadow: shadow-md, radius: radius, border-top: 3px m8 | padding: 1.2→1.5rem, shadow: md→sm, border-top: 3→4px | minimal |
| **.erosion-card** | bg: white, p: 1.2rem, shadow: shadow-md, radius: radius, border-top: 3px m3 | padding: 1.2→1.5rem, shadow: md→sm, border-top: 3→4px | minimal |
| **.comm-card** | bg: white, p: 0.8rem 1rem, shadow: shadow-sm, radius: radius, kein border | padding: 0.8rem 1rem→1.5rem, border-top: 0→4px | **spuerbar** (braucht Modulfarbe) |

### 2. Content-Card (5 Klassen)

| Klasse | Aktuell | Aenderungen | Diff |
|---|---|---|---|
| **.rec-card** | bg: white, p: 1.2rem sp-md, shadow: shadow-md, radius: radius, border-left: 3px | — | **keine** (exakt Ziel) |
| **.symptom-card** | bg: white, p: 0.8rem 1rem, shadow: shadow-md, radius: radius | padding: 0.8rem 1rem→1.2rem sp-md, border-left: 0→3px | spuerbar |
| **.silent-mech-card** | bg: white, p: 1.2rem, shadow: shadow-md, radius: radius | padding: 1.2rem→1.2rem sp-md, border-left: 0→3px | minimal |
| **.children-col** | bg: white, p: 1.2rem, shadow: shadow-md, radius: radius | padding: 1.2rem→1.2rem sp-md, border-left: 0→3px | minimal |
| **.nn-card** | bg: white, p: 1rem sp-md, shadow: shadow, border-left: 4px danger | shadow: shadow→shadow-md, border-left: 4→3px | minimal |

### 3. Interactive-Card (5 Klassen)

| Klasse | Aktuell | Aenderungen | Diff |
|---|---|---|---|
| **.res-card** | bg: white, p: 1.2rem, shadow-sm, radius, border: 1px solid, hover: shadow-md | padding: 1.2→1.2rem sp-md, shadow: sm→md, border: 1px solid→border-left 3px, hover: shadow-md→shadow-lg+translateY | spuerbar |
| **.ee-node** | bg: white, p: sp-sm 1rem, shadow-md, radius, border: 2px solid, hover: translateY(-1px) | padding: sp-sm 1rem→1.2rem sp-md, border: 2px solid→border-left 3px, hover: +shadow-lg | spuerbar |
| **.sh-card** | bg: white, p: sp-sm 1rem, shadow: hardcoded, radius, border-left: 3px transparent, hover: translateY(-1px) | padding: sp-sm 1rem→1.2rem sp-md, shadow: hardcoded→shadow-md, hover: +shadow-lg | minimal |
| **.mc-link** | bg: white, p: sp-md 1.4rem, shadow: hardcoded, radius, border-left: 4px, hover: shadow-lg+translateY(-2px) | padding: sp-md 1.4→1.2rem sp-md, shadow: hardcoded→shadow-md, border-left: 4→3px | minimal |
| **.loyalty-item** | bg: white, p: 0.5rem sp-sm, shadow-sm, radius-sm, border: 2px transparent, hover: bg2 | padding: 0.5rem sp-sm→1.2rem sp-md, shadow: sm→md, radius: sm→radius, border→border-left 3px, hover: +shadow-lg+translateY | **spuerbar** |

### 4. Detail-Panel (3 Klassen)

| Klasse | Aktuell | Aenderungen | Diff |
|---|---|---|---|
| **.hv-detail** | bg: hv-panel-bg, p: 16px 14px, radius-lg, border: 1.5px hv-panel-border | padding: 16px 14px→sp-md (1.2rem), bg: hv-panel-bg→bg2 | minimal (hv-panel-bg ist bg2-Variante) |
| **.kk-detail** | bg: bg2, p: 16px 14px, radius-lg, border: 1.5px border | padding: 16px 14px→sp-md | **keine** (fast exakt) |
| **.sl-detail** | bg: bg2, p: 20px 18px, radius-lg, border: 1.5px border | padding: 20px 18px→sp-md (1.2rem = 19.2px) | minimal |

### 5. Info-Box (7 Klassen)

| Klasse | Aktuell | Aenderungen | Diff |
|---|---|---|---|
| **.vignette** | bg: bg2, p: 1.2rem 1.5rem, radius, border-left: 4px | padding: 1.2rem 1.5→sp-sm sp-md, radius: radius→radius-sm, border-left: 4→3px | minimal |
| **.source-box** | bg: bg2, p: sp-md, radius | padding: sp-md→sp-sm sp-md, radius: radius→radius-sm, border-left: 0→3px | minimal |
| **.notes-list** | bg: bg2, p: 0.8rem, radius | padding: 0.8→sp-sm sp-md, radius: radius→radius-sm, border-left: 0→3px | minimal |
| **.lernziele** | bg: bg, p: 0.6rem 1rem, radius, border: 1px solid | padding: 0.6rem 1→sp-sm sp-md, bg: bg→bg2, border: 1px→border-left 3px, radius→radius-sm | spuerbar |
| **.reflexion** | bg: bg-info, p: 1.2rem 1.4rem, radius, border-left: 4px | padding→sp-sm sp-md, bg: bg-info→bg2, border-left: 4→3px, radius→radius-sm | spuerbar (bg-Farbe aendert sich) |
| **.notfall-reassure** | bg: bg, p: 0.8rem 1.2rem, radius, border-left: 3px m8 | padding→sp-sm sp-md, bg: bg→bg2, radius→radius-sm | minimal |
| **.notfall-disclaimer** | bg: bg2, p: 1.2rem, radius | padding→sp-sm sp-md, radius→radius-sm, border-left: 0→3px | minimal |

### 6. Highlight-Box (8 Klassen)

| Klasse | Aktuell | Aenderungen | Diff |
|---|---|---|---|
| **.quote-card** | bg: Modul-light, p: 1rem sp-md, radius, border-left: 3px | border-left: 3→4px | **keine** (fast exakt) |
| **.manie-komm-card** | bg: m5-light, p: 1rem sp-md, radius | border-left: 0→4px | minimal |
| **.ee-exit-box** | bg: m6-light, p: 1rem sp-md, radius, border-left: 4px m6 | — | **keine** (exakt Ziel) |
| **.hv-takeaway** | bg: m6-light, p: 12px 14px, radius, border: 1.5px m6 | padding: 12px 14px→1rem sp-md, border: 1.5px solid→border-left 4px | minimal |
| **.m-insight** | bg: m1-light, p: 1rem sp-md, radius, border-left: 4px m1 | — | **keine** (exakt Ziel) |
| **.decision-card** | bg: Modul-light, p: sp-md, shadow-md, radius, border-top: 3px | padding: sp-md→1rem sp-md, shadow: md→none, border: top 3px→left 4px | **spuerbar** (Layout aendert sich) |
| **.notfall-krisenplan-card** | bg: m6-light, p: 1rem 1.2rem, radius, border-left: 4px m6 | padding: 1rem 1.2→1rem sp-md | **keine** (sp-md = 1.2rem) |
| **.notfall-triage-box** | bg: danger-light, p: 1.2rem 1.4rem, radius, border: 2px danger | padding: 1.2rem 1.4→1rem sp-md, border: 2px solid→border-left 4px | spuerbar |

### 7. Layout-Container (4 Klassen)

| Klasse | Aktuell | Aenderungen | Diff |
|---|---|---|---|
| **.selfcare-col** | bg: white, shadow-md, radius, overflow: hidden | shadow: md→none | minimal |
| **.coping-col** | bg: white, shadow-md, radius, overflow: hidden | shadow: md→none | minimal |
| **.ambiguous-loss-card** | bg: white, shadow-md, radius, overflow: hidden | shadow: md→none | minimal |
| **.exp-report** | bg: white, shadow: hardcoded, radius-lg, overflow: hidden | shadow: hardcoded→none, radius: lg→radius | minimal |

---

## Sonderfaelle (NICHT zuordnen)

| Klasse | Grund |
|---|---|
| **.acc-item** | Accordion — eigene Logik (open/closed State, 2 Varianten). Nicht in Grundtyp pressbar. |
| **.glossar-item** | Liste, kein Box-Typ. Nur border-bottom. |
| **.mk-avoid** | Inline-Tag (0.25rem Padding, 6px radius). Kein Box. |
| **.barr-card** | Pro Variante eigene bg/border-Farbe. Mapping wuerde 6+ Overrides brauchen. Belassen. |
| **.sl-erosion** | Spezieller Warnhinweis (manie-bg + danger-border). Eigene Semantik. |
| **.res-urgent-card** | Notfall-Varianten mit eigener Farblogik (danger/m6). Belassen. |

---

## Zusammenfassung

| Grundtyp | Klassen | Keine Aenderung | Minimal | Spuerbar |
|---|---|---|---|---|
| Standard-Card | 4 | 0 | 3 | 1 (.comm-card) |
| Content-Card | 5 | 1 | 3 | 1 (.symptom-card) |
| Interactive-Card | 5 | 0 | 2 | 3 (.res-card, .ee-node, .loyalty-item) |
| Detail-Panel | 3 | 1 | 2 | 0 |
| Info-Box | 7 | 0 | 4 | 3 (.lernziele, .reflexion, .notfall-reassure*) |
| Highlight-Box | 8 | 3 | 2 | 3 (.decision-card, .notfall-triage-box, .hv-takeaway) |
| Layout-Container | 4 | 0 | 4 | 0 |
| **Total** | **36** | **5** | **20** | **11** |
| Sonderfaelle | 6 | — | — | — |

### Risiko-Einschaetzung

- **5 Klassen:** Null Aenderung noetig — bereits exakt am Ziel
- **20 Klassen:** Minimale Anpassung (Padding ±0.2rem, Shadow-Stufe, border-width ±1px)
- **11 Klassen:** Spuerbare Aenderung — hier visuell pruefen
  - .comm-card: bekommt border-top (hat keinen)
  - .symptom-card: bekommt border-left
  - .res-card: border 1px solid → border-left 3px
  - .ee-node: border 2px solid → border-left 3px
  - .loyalty-item: kompaktere Karte wird groesser
  - .decision-card: border-top → border-left, shadow verschwindet
  - .lernziele: bg und border aendern sich
  - .reflexion: bg-info → bg2
  - .notfall-triage-box: border all → border-left
  - .hv-takeaway: border all → border-left
  - .notfall-reassure: bg → bg2
