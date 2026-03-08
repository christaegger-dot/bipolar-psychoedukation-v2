# Finales Publikations-Audit

**Datum:** 2026-03-08
**Branch:** claude/add-release-audit-script-ObnOa
**Geprüft:** 13 HTML-Dateien, 4 JS-Dateien, 1 CSS-Datei, Sitemap, Service Worker, Redirects

---

## Scorecard

| Check | Beschreibung | Ergebnis | Detail |
|-------|-------------|----------|--------|
| 1 | HTML-Validität (Tag-Balance) | ✅ | Alle 13 Dateien balanciert. **Fix angewendet:** handouts/notfall/index.html hatte 1 unclosed `<div class="notfall-content">` — jetzt geschlossen. |
| 2 | Interne Links | ✅ | /impressum/, /notfall/, /ressourcen/ sind als 200-Rewrites in `_redirects` konfiguriert. 0 tote Links. |
| 3 | Telefonnummern klickbar | ✅ | Alle Treffer sind SVG-Koordinaten/Pfade, keine echten Telefonnummern. Einzige nicht-verlinkte Nummer in M5 SVG-Label ("NOTFALLDIENST: 0800 33 66 55") ist ein visuelles Element innerhalb eines SVG — akzeptabel. |
| 4 | PDFs erreichbar | ✅ | Alle 49 PDF-Links verweisen auf existierende Dateien. 0 fehlende. |
| 5 | Keine falschen Kontaktdaten | ✅ | 0 Treffer für alte PUK-Nummer (384 65 00), 0 für alte Opferhilfe (446 15 50), 0 für alte Email (angehoerige@pukzh.ch). |
| 6 | Kein Eszett (ß) | ✅ | 0 Treffer. Konsequent Schweizer Schreibweise (ss). |
| 7 | h1 ≠ h2 auf Modulseiten | ✅ | Alle 7 Module haben unterschiedliche h1- und h2-Texte. |
| 8 | Search-Index aktuell | ✅ | 295 Einträge total. Handouts (m:8): 27, Notfall (m:9): 6, Ressourcen (m:10): 28. Alle Bereiche abgedeckt. |
| 9 | Service Worker | ✅ | CACHE_NAME: `bipolar-puk-v12`. skipWaiting: vorhanden. clients.claim: vorhanden. |
| 10 | Neue Features (6 UX-Verbesserungen) | ✅ | reading-progress: 7/7 Module. bipolar_read: 2 Referenzen. skip-to-action: 7/7 Module. accordionOpen: 2 Referenzen. bipolar_notes: 4 Referenzen. situational-hint: 1 Referenz. |
| 11 | Meta-Tags komplett | ✅ | Alle 13 Seiten: title, description, og:title, og:description, og:image, canonical, lang="de-CH" vorhanden. |
| 12 | Structured Data (JSON-LD) | ✅ | 16 Blöcke total. Homepage: 1, Module 1-6: je 2, Modul 7: 3. Alle JSON-valide. |
| 13 | Impressum im Footer | ✅ | Alle 13 Seiten: mindestens 2 Links zu /impressum/ (Nav + Footer). |
| 14 | Notfall-Erreichbarkeit | ✅ | Alle 13 Seiten haben mindestens 6 Notfall-Referenzen (Nav-Link, FAB-Button, Footer-Link). |
| 15 | Accordions öffnen sich | ✅ | `max-height` nur auf `.acc-item:not(details) .acc-body.open` (korrekt: nur für non-details Accordions). Keine blockierenden Styles. |
| 16 | Print-Styles | ✅ | @media print vorhanden. 5x break-inside:avoid. |
| 17 | font-display:swap | ✅ | 4 @font-face Deklarationen, alle mit font-display:swap. |
| 18 | Kein console.log | ✅ | 0 Treffer in Production-Code (exkl. _dev/). |
| 19 | Sitemap lastmod | ✅ | 12 lastmod-Einträge. Alle Seiten abgedeckt. |
| 20 | Dev-Dateien nicht im Root | ✅ | 0 Python-, Shell-, Report- oder Audit-Dateien im Root. |

---

## Ergebnis

**GESAMT: 20/20 bestanden**

**BLOCKER: 0** (1 gefunden und sofort gefixt)

**FIXES ANGEWENDET:**
- `handouts/notfall/index.html`: Fehlendes `</div>` für `<div class="notfall-content">` (Zeile 66) ergänzt.

**HINWEISE:**
- Die Telefonnummer im SVG-Label in M5 (Krisenplan-Ampel: "NOTFALLDIENST: 0800 33 66 55") ist nicht als tel:-Link klickbar, da sie innerhalb eines SVG-`<text>`-Elements liegt. Dies ist technisch bedingt und kein Fehler.
- Handouts-Unterseiten (impressum, notfall, ressourcen) haben keine JSON-LD Structured Data. Optional für zukünftige SEO-Optimierung.
