# Pre-Publication Audit Report

**Datum:** 2. März 2026
**Commit:** 083276d
**Branch:** claude/add-release-audit-script-ObnOa
**Umfang:** 13 HTML, 1 CSS, 4 JS, 51 PDFs, 27 Thumbnails, 4 Fonts

---

## Ergebnis: 🔴 NICHT BEREIT

**5 Blocker müssen vor Go-Live behoben werden.**

---

### Blocker (müssen vor Go-Live behoben werden)

| # | Prüfung | Befund | Datei:Zeile |
|---|---------|--------|-------------|
| 1 | G2.1 | **Zwei verschiedene Canonical-Domains**: `bipolar-angehoerige01.netlify.app` (index + 7 Module) vs. `bipolar-psychoedukation-puk.netlify.app` (404 + 4 Handout-Seiten). Suchmaschinen behandeln dies als zwei getrennte Websites. | index.html:9, modul/1-7/index.html:9, 404.html:9, handouts/*/index.html:9-10 |
| 2 | H2.1 | **Falscher Datenschutz-Hinweis**: Impressum behauptet «Externe Schriftarten werden über Google Fonts geladen» — Fonts sind aber lokal unter /fonts/ gehostet. Kein einziger Aufruf an fonts.googleapis.com im Code. | handouts/impressum/index.html:125 |
| 3 | B5 | **Schweizer Orthografie: ß statt ss** in «Reiß dich zusammen». Für de-CH muss es «Reiss» heissen. | handouts/index.html:139, handouts/notfall/index.html:138, modul/6/index.html:739 |
| 4 | B4 | **handouts/index.html zeigt falschen Inhalt**: Statt Handouts-Übersicht wird die Notfall-Seite angezeigt. Nutzer die «Alle Handouts» klicken, landen auf der Notfall-Seite. Datei enthält redaktionellen Kommentar der das Problem bestätigt. | handouts/index.html:1 (Kommentar), :7 (Title = «Notfall»), :10 (Canonical = /notfall/) |
| 5 | G3.1 | **Fehlende OG-Images**: `images/og-default.png` und `images/og-ressourcen.png` existieren nicht. Social-Media-Previews für 404 und Ressourcen-Seite werden kein Bild zeigen. | 404.html:26, handouts/ressourcen/index.html:23 |

---

### Warnungen (sollten behoben werden, kein Blocker)

| # | Prüfung | Befund | Datei:Zeile |
|---|---------|--------|-------------|
| 1 | E2.1 | **aria-expanded fehlt** auf 8 mg-header Accordion-Buttons. Screen-Reader melden keinen Status. | handouts/index.html:104,130,155,180; handouts/notfall/index.html:103,129,154,179 |
| 2 | E2.1 | **aria-expanded wird nicht aktualisiert** — toggleAcc() und toggleMG() in main.js setzen aria-expanded nie um. Attribut bleibt nach Interaktion stale. | main.js (toggleAcc, toggleMG Funktionen) |
| 3 | I6 | **Legacy `<div class="sc-title">`** noch vorhanden statt `<h3>`. | modul/3/index.html:262 |
| 4 | D1.1 | **notfall-close Button fehlt** auf Impressum und Ressourcen. Notfall-Banner kann nicht über dedizierten Schliessen-Button geschlossen werden. | handouts/impressum/index.html:41-55, handouts/ressourcen/index.html:41-55 |
| 5 | C1.2 | **SVG Text eng am Rand**: 66 Fälle mit Padding < 5px (engster: 0.3px bei «!!!» im Krisenplan-Ampel). Kein Overflow, aber könnte bei Zoom/Rendering abgeschnitten werden. | modul/3-6/index.html (diverse SVGs) |
| 6 | C1.3 | **SVG Text nah am viewBox-Rand**: 2 Texte < 3px vom rechten viewBox-Rand. | modul/1/index.html:373 («→ Zeit (Jahre)» 1.8px), modul/1/index.html:605 («wiederholt sich» 2.5px) |
| 7 | G1.1 | **Doppelte Titles**: handouts/index.html und handouts/notfall/index.html haben identischen Title «Notfall – Bipolare Störung | PUK Zürich». | handouts/index.html:7, handouts/notfall/index.html:6 |
| 8 | G3.3 | **OG-Tags gemischte Domains**: og:url und og:image verwenden die zwei verschiedenen Domains (gleiche Ursache wie Blocker #1). | Alle Dateien mit og:url und og:image |
| 9 | F5.2 | **Sitemap Redirect-Pfade**: 3 URLs in sitemap.xml verwenden Redirect-Pfade (/notfall/, /ressourcen/, /impressum/) statt finale Pfade. | sitemap.xml |
| 10 | D5.2 | **SW Cache unvollständig**: Service Worker cached keine Bilder, PDFs oder manifest.json in CORE_ASSETS. Erst nach Erstbesuch offline verfügbar. | sw.js |
| 11 | D3.2 | **Search-Overlay inkonsistent**: 3 ältere Seiten (404, Impressum, Ressourcen) haben keinen Backdrop-Click-to-Close und anderen Placeholder-Text als die neueren Seiten. | 404.html:154, handouts/impressum/index.html:169, handouts/ressourcen/index.html:378 |

---

### Hinweise (optional, Verbesserungspotential)

| # | Prüfung | Befund |
|---|---------|--------|
| 1 | F1 | CSS 166 KB unminifiziert — könnte für Produktion minimiert werden. |
| 2 | C2.2 | 16 Kleintext-Elemente haben line-height 1.4-1.45 (unter 1.5), aber nur Labels/Badges, kein Fliesstext. |
| 3 | D2.1 | Modul 7 «Weiter» verlinkt auf /ressourcen/ — funktioniert nur mit Netlify-Redirect, nicht lokal. |
| 4 | E4 | Notfall-Banner und Mobile-Navigation fehlt Escape-to-Close Handler. |
| 5 | D5.2 | SW Cache-Version «bipolar-puk-v5» muss bei jedem Deploy hochgezählt werden. |
| 6 | G4 | 5 Utility-/Handout-Seiten ohne JSON-LD Structured Data (8 Seiten haben es). |
| 7 | A2.2 | CSS-Klasse .lightbox-overlay hat 0 Definitionen — wird aber auch nie im HTML verwendet (phantom class). |

---

### Scorecard

| Bereich | Status | Blocker | Warnungen |
|---------|--------|---------|-----------|
| A: Strukturelle Integrität | 🟢 | 0 | 0 |
| B: Inhalte und Links | 🔴 | 2 | 0 |
| C: Visuelle Konsistenz | 🟢 | 0 | 2 |
| D: Funktionalität | 🟡 | 0 | 3 |
| E: Accessibility | 🟡 | 0 | 2 |
| F: Performance/Deploy | 🟡 | 0 | 1 |
| G: SEO und Meta | 🔴 | 2 | 3 |
| H: Sicherheit/Datenschutz | 🔴 | 1 | 0 |
| I: Frühere Fixes | 🔴 | 0 | 0 |

---

### Fix-Verifizierung

| # | Früherer Fix | Status |
|---|-------------|--------|
| 1 | VASK-Nummer korrigiert (044 240 12 00 entfernt) | ✅ 0 Dateien |
| 2 | ß → ss | ❌ 3 Dateien: «Reiß» in handouts/index:139, handouts/notfall:138, modul/6:739 |
| 3 | lang="de-CH" überall | ✅ 0 Verstösse |
| 4 | Footer-Nummern klickbar (fc-num = `<a>`) | ✅ Alle `<a href="tel:...">` |
| 5 | Modul-Nummern klickbar (sue-num = `<a>`) | ✅ Alle `<a href="tel:...">` |
| 6 | sc-title → h3 | ❌ 1 Datei: modul/3/index.html:262 hat noch `<div class="sc-title">` |
| 7 | Defekte Links ersetzt | ✅ 0 Dateien |
| 8 | Inline toggle entfernt | ✅ 0 Dateien |
| 9 | Google Fonts Impressum korrigiert | ❌ Falscher Hinweis noch in handouts/impressum/index.html:125 |
| 10 | Duplicate Attributes entfernt | ✅ 0 Dateien |
| 11 | Handouts ≠ Notfall | ❌ Inhaltlich fast identisch (handouts/index.html zeigt Notfall-Inhalt statt Handouts-Übersicht) |
| 12 | Canonical einheitlich | ❌ 2 verschiedene Domains (12 verschiedene Base-URLs statt 1) |

---

## Priorisierte Fix-Liste

### Priorität 1: Canonical-Domain vereinheitlichen (Blocker #1)

Alle 13 HTML-Dateien + sitemap.xml auf **eine** Domain umstellen:
- `index.html:9` — canonical href ändern
- `modul/1-7/index.html:9` — canonical href ändern (7 Dateien)
- `404.html:9` — canonical href ändern
- `handouts/*/index.html:9-10` — canonical href ändern (4 Dateien)
- Alle og:url und og:image Tags in denselben Dateien
- `sitemap.xml` — alle URLs auf dieselbe Domain
- **Entscheidung nötig**: Welche Domain ist die finale? `bipolar-angehoerige01` oder `bipolar-psychoedukation-puk`?

### Priorität 2: Impressum Datenschutz-Hinweis korrigieren (Blocker #2)

`handouts/impressum/index.html:125` — Den Absatz über Google Fonts entfernen oder ersetzen durch:
> «Alle Schriftarten werden lokal gehostet. Es werden keine externen Schriftarten-Dienste eingebunden.»

### Priorität 3: ß → ss (Blocker #3)

3 Stellen: `Reiß` → `Reiss` in:
- `handouts/index.html:139`
- `handouts/notfall/index.html:138`
- `modul/6/index.html:739`

### Priorität 4: Handouts-Übersicht erstellen (Blocker #4)

`handouts/index.html` enthält aktuell Notfall-Inhalte statt Handout-Übersicht. Optionen:
- a) Eigene Handouts-Übersichtsseite mit Download-Links zu allen 24 Infografiken + 24 Textversionen erstellen
- b) Redirect `/handouts/` → `/handouts/ressourcen/` in `_redirects` einrichten und handouts/index.html als echte Übersichtsseite ersetzen

### Priorität 5: Fehlende OG-Images erstellen (Blocker #5)

- `images/og-default.png` (1200×630px) — generisches Fallback-Bild
- `images/og-ressourcen.png` (1200×630px) — Bild für Ressourcen-Seite

---

## Detailbefunde pro Prüfung

### A: Strukturelle Integrität ✅

- **A1.1 Tag-Balance**: ✅ Alle 13 Dateien balanciert (verifiziert mit Python regex)
- **A1.2 Duplicate Attributes**: ✅ Keine echten Duplikate (stroke-width/width false positives in SVGs)
- **A1.3 Seitenstruktur**: ✅ Alle Seiten haben DOCTYPE, lang="de-CH", title, charset, viewport, main, genau 1× h1
- **A2.1 CSS Klammern**: ✅ { 1272 / } 1272 — balanciert
- **A2.2 CSS-Klassen**: ✅ Alle referenzierten Klassen existieren (notfall-banner via ID-Selektor, lightbox-overlay phantom)
- **A2.3 CSS Imports**: ✅ Keine verwaisten Imports
- **A3.1 JS-Funktionen**: ✅ Alle 26 onclick-Handler haben Funktionsdefinitionen (in main.js oder search.js)
- **A3.2 Console**: ✅ Keine console.log/error/warn/debug (ausser sw.js)
- **A3.3 TODO/FIXME**: ✅ Keine gefunden

### B: Inhalte und Links

- **B1.1 Interne Links**: ✅ Alle Pfade existieren direkt oder via _redirects
- **B1.2 Anker-Links**: ✅ Alle 11 #-Anker haben passende IDs
- **B1.3 Sackgassen**: ✅ Alle Seiten haben Navigation + Krisennummern
- **B2.1 Defekte Links**: ✅ Keine bekannten defekten Domains gefunden
- **B2.2 Externe Links**: ✅ Alle haben target="_blank" und rel="noopener"
- **B3.1 Telefonnummern**: ✅ Alle als `<a href="tel:...">` klickbar
- **B3.2 Falsche Nummern**: ✅ Alte VASK-Nummer nicht gefunden
- **B4 Duplikate**: ❌ BLOCKER — handouts/index.html ≈ handouts/notfall/index.html
- **B5 Orthografie**: ❌ BLOCKER — 3× ß in «Reiß dich zusammen»

### C: Visuelle Konsistenz

- **C1.1 SVG Accessibility**: ✅ 15/15 Content-SVGs mit role="img" + aria-label
- **C1.2 Text-in-Box**: ⚠️ 0 Overflows, 66 Warnungen (Padding < 5px)
- **C1.3 Text ausserhalb viewBox**: ⚠️ 2 Texte < 3px vom Rand
- **C1.4 SVG responsiv**: ✅ Alle Content-SVGs width:100% via CSS
- **C2.1 Schriftgrössen**: ✅ --fs-base=0.92rem, --fs-sm=0.85rem
- **C2.2 line-height**: ✅ Body 1.6; kleine Elemente 1.4-1.45 (akzeptabel)
- **C3.1 Dark Mode**: ✅ Vollständig mit 23 Custom Properties
- **C3.2 Kontrast**: ✅ --muted 5.16:1 (light) / 6.14:1 (dark) — WCAG AA

### D: Funktionalität

- **D1.1 Notfall-Button**: ⚠️ handouts/index.html + handouts/notfall/index.html ohne Trigger (= Notfall-Seite selbst); Impressum + Ressourcen ohne Close-Button
- **D1.2 Toggle konsistent**: ✅ Alle via toggleNotfall()
- **D2.1 Prev/Next**: ✅ M1=Weiter, M2-M6=Zurück+Weiter, M7=Zurück+Weiter(→Ressourcen)
- **D2.2 Navigation**: ✅ Konsistent auf allen Seiten
- **D3.1 Search-Index**: ✅ 227 Einträge, 22-47 pro Modul (alle >15)
- **D3.2 Search-Funktion**: ⚠️ 3 Seiten mit inkonsistentem Search-Overlay
- **D4 Lightbox**: ✅ Vorhanden, Escape-Handler funktioniert
- **D5.1 Service Worker**: ✅ Registrierung auf allen 13 Seiten
- **D5.2 Cache**: ⚠️ Nur HTML/CSS/JS/Fonts gecacht, keine Bilder/PDFs

### E: Accessibility

- **E1 Heading-Hierarchie**: ✅ Alle Seiten h1→h2→h3, keine Sprünge
- **E2.1 aria-expanded**: ⚠️ 8 mg-header ohne Attribut; toggleAcc/toggleMG aktualisieren nie
- **E2.2 Notfall ARIA**: ✅ role="region" + aria-label auf allen Bannern
- **E2.3 Tooltips**: ✅ Alle mit tabindex="0" + Escape-Handler
- **E3 Skip-Link**: ✅ Auf allen 13 Seiten vorhanden
- **E4 Tastatur**: ✅ Escape für Tooltips, Lightbox, Search
- **E5 Reduced Motion**: ✅ 2 @media-Blöcke

### F: Performance und Deployment

- **F1 Dateigrössen**: ✅ HTML 464KB, CSS 166KB, JS 89KB, Fonts 74KB, Images 843KB, Total 28MB
- **F1.1 Grosse Dateien**: ✅ Keine >5MB
- **F2.1 Referenzierte Dateien**: ✅ Alle vorhanden (direkt oder via Redirect)
- **F2.2 PDFs**: ✅ 24 Infografiken + 24 Textversionen + 3 Downloads
- **F2.3 Thumbnails**: ✅ 27 WebP
- **F3 Fonts**: ✅ 4 woff2 (74KB total)
- **F4 Redirects**: ✅ 16 Regeln in _redirects
- **F5 robots.txt + sitemap**: ⚠️ Vorhanden, aber Sitemap hat Redirect-Pfade + gemischte Domains

### G: SEO und Meta

- **G1 Titles**: ⚠️ Doppelter Title auf handouts/index + handouts/notfall
- **G2 Canonical**: ❌ BLOCKER — 2 verschiedene Domains
- **G3 OG-Tags**: ❌ BLOCKER — 2 fehlende OG-Images; gemischte Domains in og:url
- **G4 Structured Data**: ✅ 8 Seiten mit JSON-LD (index + Module)

### H: Sicherheit und Datenschutz

- **H1 Externe Ressourcen**: ✅ Keine CDN-Abhängigkeiten
- **H2 Impressum**: ❌ BLOCKER — Falscher Google-Fonts-Hinweis
- **H3 Sensible Daten**: ✅ Keine API-Keys, Passwörter etc.

### I: Frühere Fixes

- 8 von 12 Fixes intakt ✅
- 4 Fixes rückfällig oder unvollständig ❌ (ß, sc-title, Google Fonts, Canonical)
