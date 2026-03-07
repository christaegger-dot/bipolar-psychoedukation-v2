# Pre-Publication Audit — Bipolare Störung Website

**Datum:** 2026-03-02
**Projekt:** bipolare-erkrankung-angehoerige.netlify.app
**Scope:** 13 HTML-Dateien, 1 CSS, 4 JS, Sitemap, robots.txt, manifest.json, SW
**Commit:** Nach URL-Migration (642c7df)

---

## Scorecard

| Bereich | Status | Blocker |
|---------|--------|---------|
| A — Strukturelle Integrität | ✅ OK | 0 |
| B — Inhalte und Links | ✅ OK | 0 |
| C — Visuelle Konsistenz | ✅ OK | 0 |
| D — Funktionalität | ✅ OK | 0 |
| E — Accessibility | ✅ OK | 0 |
| F — Performance / Deployment | ✅ OK | 0 |
| G — SEO und Meta | ✅ OK | 0 |
| H — Sicherheit / Datenschutz | ✅ OK | 0 |
| I — Verifizierung früherer Fixes | ✅ OK | 0 |

**Gesamtergebnis: BEREIT — Keine Go-Live-Blocker gefunden.**

---

## A — Strukturelle Integrität

### A1 — HTML

| Prüfung | Ergebnis |
|---------|----------|
| A1.1 Tag-Balance (div, section, nav, main, header, footer) | ✅ Alle 13 Dateien balanciert |
| A1.2 Duplicate Attributes | ✅ Keine gefunden |
| A1.3 Grundstruktur (DOCTYPE, lang, title, viewport, h1) | ✅ Alle 13 Dateien korrekt |

- Alle Dateien: `<!DOCTYPE html>`, `<html lang="de-CH">`, `<meta charset="UTF-8">`, `<meta name="viewport">`, je 1x `<h1>`

### A2 — CSS

| Prüfung | Ergebnis |
|---------|----------|
| A2.1 Klammer-Balance `shared.css` | ✅ 1272 öffnend / 1272 schliessend |
| A2.2 Klassen-Referenzen | ✅ Stichproben OK (nav-btn, module-card, notfall-*, skip-link etc.) |

### A3 — JavaScript

| Prüfung | Ergebnis |
|---------|----------|
| A3.1 Referenzierte JS-Dateien existieren | ✅ main.js, search.js, search-index.js, sw.js |
| A3.2 console.log / console.error / console.warn | ✅ Keine gefunden |
| A3.3 TODO / FIXME / HACK | ✅ Keine gefunden |
| A3.4 onclick-Funktionen definiert | ✅ Alle (toggleNotfall, toggleNav, toggleFont, toggleReadmode, scrollToTop, doSearch, closeSearch, openSearch, toggleBookmarks, etc.) |

---

## B — Inhalte und Links

### B1 — Interne Links

| Prüfung | Ergebnis |
|---------|----------|
| B1.1 Modullinks /modul/1-7/ | ✅ Alle 7 Verzeichnisse existieren |
| B1.2 Handout-Links /handouts/, /handouts/notfall/ etc. | ✅ Alle 4 Verzeichnisse existieren |
| B1.3 Shortcut-Pfade /notfall/, /ressourcen/, /impressum/ | ✅ Via `_redirects` (301) auf /handouts/... umgeleitet |
| B1.4 Modul-Shortcuts /m1 bis /m7 | ✅ Via `_redirects` (301) umgeleitet |
| B1.5 Hash-Redirect für alte Anker /#m1..#m7 | ✅ JS-Redirect in index.html:68-80 |

### B2 — Externe Links

| Prüfung | Ergebnis |
|---------|----------|
| B2.1 Alte URLs (bipolar-angehoerige01 / bipolar-psychoedukation-puk) | ✅ 0 Referenzen in Code-Dateien |
| B2.2 Externe HTTPS-Links | ✅ 16 externe Domains, alle plausibel (pukzh.ch, promentesana.ch, vaskzuerich.ch, etc.) |
| B2.3 tel:-Links Format | ✅ 11 Nummern korrekt (Kurznummern 117/143/144/147, +41-Format für Langwahl) |

### B3 — Orthografie

| Prüfung | Ergebnis |
|---------|----------|
| B3.1 Eszett (ß) | ✅ 0 Vorkommen in HTML/JS/CSS |
| B3.2 Platzhalter (Lorem ipsum, TODO, XXX) | ✅ 0 Vorkommen |

⚠️ **Hinweis:** `index.html:145` enthält redaktionellen Kommentar: `<!-- REDAKTIONELL: Öffnungszeiten Pro Mente Sana periodisch prüfen -->` — Dies ist ein gewollter Wartungshinweis, kein Fehler.

---

## C — Visuelle Konsistenz

### C1 — Typografie

| Prüfung | Ergebnis |
|---------|----------|
| Font-Deklaration | ✅ Lora (serif, 400/600) + Source Sans 3 (sans, 400/600) |
| Font-Loading | ✅ Self-hosted WOFF2, `font-display: swap` |
| Preloading | ✅ 2 kritische Fonts per `<link rel="preload">` |
| Skala | ✅ Konsistente CSS Custom Properties (--fs-xs bis --fs-h1) |

### C2 — Farben

| Prüfung | Ergebnis |
|---------|----------|
| CSS Custom Properties | ✅ 7 Modul-Farben (--m1 bis --m7), Danger-System, Hintergrund-System |
| Kontrast | ✅ Text #282420 auf #f7f5f2 = hoher Kontrast |
| Semantische Farben | ✅ --danger, --danger-dark, --danger-light konsistent |

### C3 — SVG

| Prüfung | Ergebnis |
|---------|----------|
| SVG-Accessibility | ✅ Interactive SVGs in modul/4 haben aria-label und role="button" |

---

## D — Funktionalität

### D1 — Notfall-Button

| Prüfung | Ergebnis |
|---------|----------|
| Vorhanden auf allen Seiten | ✅ 13/13 Dateien |
| Notfallnummern korrekt | ✅ 117 (Polizei), 144 (Sanität), 143 (Dargebotene Hand), 0800 33 66 55 (Psych. Notfall ZH) |
| JS-Toggle funktional | ✅ toggleNotfall() mit aria-expanded |
| Schliessen-Button | ✅ Vorhanden |

### D2 — Navigation

| Prüfung | Ergebnis |
|---------|----------|
| Hamburger-Menu | ✅ toggleNav(), CSS-Transition |
| Mobile-Breakpoint | ✅ @media (max-width: 768px) |
| Scroll-Spy | ✅ updateScrollSpy() mit .active Klasse |
| Lesezeichen-Panel | ✅ toggleBookmarks() mit localStorage |

### D3 — Suche

| Prüfung | Ergebnis |
|---------|----------|
| Suchfunktion | ✅ Ctrl/Cmd+K, Volltext über SEARCH_INDEX |
| search-index.js | ✅ Korrekt aufgebaut (m, mt, s, t, u Felder) |
| Escape-Handler | ✅ Schliesst Such-Overlay |

### D4 — Lightbox

| Prüfung | Ergebnis |
|---------|----------|
| Handout-Lightbox | ✅ openHandoutLightbox() / closeHandoutLightbox() |
| Schliessen-Button | ✅ Vorhanden |
| Escape-Key | ✅ Handler in main.js:444-448 |
| Overlay-Click-to-Close | ✅ main.js:413 |

### D5 — Service Worker / PWA

| Prüfung | Ergebnis |
|---------|----------|
| SW-Registrierung | ✅ Auf allen Seiten |
| sw.js | ✅ Cache-First mit Network-Update, 24 Core-Assets |
| manifest.json | ✅ Name, Icons (192+512), display: standalone, lang: de-CH |

---

## E — Accessibility

### E1 — Heading-Hierarchie

| Prüfung | Ergebnis |
|---------|----------|
| Genau 1x h1 pro Seite | ✅ 13/13 Dateien |
| Hierarchie korrekt (h1 → h2 → h3) | ✅ Keine Sprünge gefunden |

### E2 — ARIA

| Prüfung | Ergebnis |
|---------|----------|
| aria-expanded auf Toggles | ✅ Notfall-Button, Akkordeons, FAQ |
| aria-controls | ✅ notfall-trigger → notfall-banner |
| aria-label auf Buttons | ✅ Menü, Suche, Schliessen-Buttons |
| role="region" | ✅ Notfall-Banner |
| role="button" + tabindex="0" | ✅ Interaktive Elemente (Modul 2/4) |

### E3 — Skip-Links

| Prüfung | Ergebnis |
|---------|----------|
| Skip-to-content | ✅ Auf allen 13 Seiten |
| Ziel-IDs vorhanden | ✅ #module-overview, #module-content, #main-content, #main |

### E4 — Tastatur

| Prüfung | Ergebnis |
|---------|----------|
| Positive tabindex-Werte | ✅ Keine (nur tabindex="0") |
| Keyboard-Handler (onkeydown) | ✅ Enter/Space auf interaktiven Elementen |
| Escape-Handler | ✅ Tooltips, Suche, Lightbox |

### E5 — Reduced Motion

| Prüfung | Ergebnis |
|---------|----------|
| prefers-reduced-motion | ✅ 2 Media-Query-Blöcke in shared.css |

---

## F — Performance / Deployment

### F1 — Dateigrössen

| Datei | Grösse | Status |
|-------|--------|--------|
| shared.css | 162 KB | ✅ Akzeptabel (Netlify GZIP: ~30 KB) |
| search-index.js | 62 KB | ✅ |
| Grösste HTML (modul/6) | 61 KB | ✅ |
| Grösste PDF (b7_behandlung_ambivalenz) | 1.6 MB | ✅ Download-Datei |

### F2 — Assets

| Prüfung | Ergebnis |
|---------|----------|
| OG-Images (og-index, og-m1..m7, og-impressum) | ✅ Alle vorhanden |
| Handout-Thumbnails (WebP) | ✅ Vorhanden in /images/thumbs/ |
| Icons (192, 512) | ✅ Vorhanden in /images/ |
| Fonts (4x WOFF2) | ✅ Vorhanden in /fonts/ |

### F3 — Fonts

| Prüfung | Ergebnis |
|---------|----------|
| Self-hosted (kein Google Fonts CDN) | ✅ |
| font-display: swap | ✅ |
| Preload kritischer Fonts | ✅ |

### F4 — Deployment-Dateien

| Prüfung | Ergebnis |
|---------|----------|
| robots.txt | ✅ Allow: /, Disallow: /handouts-legacy/, /reports/ |
| sitemap.xml | ✅ 12 URLs, alle auf korrekte Domain |
| _redirects | ✅ 12 Redirect-Regeln (Shortcuts + alte Pfade) |
| 404.html | ✅ Custom Error-Page mit Navigation |

---

## G — SEO und Meta

### G1 — Title und Description

| Seite | Title | Description |
|-------|-------|-------------|
| index.html | ✅ 62 Zeichen | ✅ 155 Zeichen |
| modul/1-7 | ✅ Eindeutig je Modul | ✅ Eindeutig je Modul |
| handouts/ | ✅ | ✅ |
| handouts/notfall/ | ✅ | ✅ |
| handouts/ressourcen/ | ✅ | ✅ |
| handouts/impressum/ | ✅ | ✅ |
| 404.html | ✅ | ✅ (noindex) |

### G2 — Canonical URLs

| Prüfung | Ergebnis |
|---------|----------|
| Alle 13 Seiten | ✅ Canonical auf bipolare-erkrankung-angehoerige.netlify.app |
| Konsistenz | ✅ 80 URL-Referenzen auf korrekte Domain |

### G3 — Open Graph / Twitter Cards

| Prüfung | Ergebnis |
|---------|----------|
| og:title | ✅ 13/13 |
| og:description | ✅ 13/13 |
| og:url | ✅ 13/13 |
| og:image + Dimensionen | ✅ 13/13 (1200x630) |
| twitter:card | ✅ 13/13 (summary_large_image) |
| twitter:image | ✅ 13/13 |

### G4 — JSON-LD Structured Data

| Prüfung | Ergebnis |
|---------|----------|
| index.html | ✅ MedicalWebPage, Hospital publisher, PeopleAudience |
| modul/1-7 | ✅ Vorhanden (8 Dateien) |
| Handout-Seiten | ⚠️ Kein JSON-LD (nicht kritisch) |

---

## H — Sicherheit und Datenschutz

### H1 — Externe Ressourcen

| Prüfung | Ergebnis |
|---------|----------|
| Externe Scripts | ✅ 0 (kein Analytics, kein CDN) |
| Externe Stylesheets | ✅ 0 (Fonts self-hosted) |
| Externe iframes | ✅ 0 |
| Tracking | ✅ Keines |

### H2 — Impressum / Datenschutz

| Prüfung | Ergebnis |
|---------|----------|
| Herausgeberin (PUK ZH) | ✅ |
| Adresse | ✅ Lenggstrasse 31, 8032 Zürich |
| Telefon | ✅ +41 58 384 38 00 |
| E-Mail | ✅ Anti-Scrape JS (angehoerige@pukzh.ch) |
| Inhaltliche Verantwortung | ✅ Ch. Egger |
| Haftungsausschluss | ✅ |
| Datenschutz | ✅ |
| Urheberrecht | ✅ |

### H3 — Sensible Daten

| Prüfung | Ergebnis |
|---------|----------|
| API-Keys / Tokens | ✅ Keine |
| Hartcodierte E-Mails | ✅ Nur via JS-Anti-Scrape |
| .gitignore | ✅ Vorhanden |
| Sensible Kommentare | ✅ Keine |

---

## I — Verifizierung früherer Fixes

| # | Prüfung | Ergebnis |
|---|---------|----------|
| I1 | Kein Eszett (ß) → "ss" | ✅ 0 Vorkommen in Code |
| I2 | Canonical URLs auf korrekte Domain | ✅ 13/13 Seiten |
| I3 | og:url auf korrekte Domain | ✅ 13/13 |
| I4 | og:image auf korrekte Domain | ✅ 13/13 |
| I5 | sitemap.xml korrekte URLs | ✅ 12 URLs |
| I6 | robots.txt → korrekte Sitemap-URL | ✅ |
| I7 | Keine Referenzen zu bipolar-angehoerige01 | ✅ 0 in Code-Dateien |
| I8 | Keine Referenzen zu bipolar-psychoedukation-puk | ✅ 0 in Code-Dateien |
| I9 | search-index.js: "ss" statt "ß" | ✅ |
| I10 | Print-Stylesheet | ✅ @media print in shared.css:3385 |
| I11 | JSON-LD korrekte URL | ✅ |
| I12 | Twitter Card URLs korrekt | ✅ 13/13 |

---

## Empfehlungen (nicht-blockierend)

1. **JSON-LD für Handout-Seiten** — Handouts, Notfall, Ressourcen, Impressum haben kein JSON-LD. Für SEO empfehlenswert aber nicht zwingend.
2. **CSS-Optimierung** — shared.css (162 KB) könnte bei Bedarf minifiziert werden. Netlify GZIP reduziert auf ~30 KB.
3. **Redaktioneller Kommentar** — `index.html:145`: Pro Mente Sana Öffnungszeiten periodisch prüfen (gewollter Wartungshinweis).
4. **Alte Audit-Reports** — `WEBSITE-ANALYSE-REPORT.md`, `SVG-AUDIT-REPORT.md`, `AUDIT-SPACING-REPORT.md` enthalten noch alte URLs. Bereinigen oder in `/reports/` verschieben (bereits in robots.txt blockiert).

---

**Ergebnis: ✅ BEREIT FÜR PUBLIKATION**

Alle 9 Prüfbereiche bestanden. 0 Blocker, 0 kritische Fehler. Die Website kann veröffentlicht werden.
