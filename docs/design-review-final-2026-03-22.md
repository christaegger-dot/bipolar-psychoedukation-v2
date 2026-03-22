# Senior UI/Brand Design Review — Final (22.03.2026)

Repo: `bipolar-psychoedukation-v2`, Branch `main`, Commit `82f8546`.
Gemessen nach 10 Optimierungsrunden (Masterplan → Design-Audit → Post-Audit → Dedup → Viz-Fixes → Reduce-to-Max → Quiz→Reflexion → Box-Ketten → Icon-Migration → Content-Optimierung → A11y/SVG/Perf).

---

## Teil 1: Metriken-Vergleich (3 Zeitpunkte)

| Metrik | Audit 21.03. (Vorher) | Post-Audit 22.03. (Mitte) | Final 22.03. | Δ total |
|--------|----------------------|--------------------------|--------------|---------|
| CSS Zeilen | ~5'373 | 5'387 | 5'424 | +0.9% |
| font-size total | 560 | 569 | 527 | −6% |
| font-size var() | 438 (78%) | 538 (95%) | 502 (95.2%) | +64 abs / +17 pp |
| font-size hardcoded | 122 | 31 | 25 | −80% |
| font-size Stufen | 7 | 9 | 9 | +2 |
| Unique Hex (CSS) | 157 | — | 103 | −34% |
| CSS-Variablen :root | 50 | — | 124 | +148% |
| border-radius var() | — | 178 | 215 | — |
| border-radius unique | 11 | ~8 | 8 (34 Varianten inkl. var) | ✓ |
| Box-Grundtypen | 38 Klassen | 7 Zieltypen | 7 Grundtypen | −82% |
| Toolbar-Icons sichtbar | 6 | 2 | 2 | −67% |
| CSS-Mask-Icon-Klassen | 0 | 6 | 9 (19 mask-image) | +9 |
| Unicode-UI-Symbole (HTML) | ~120 | ~120 | 0 | −100% |
| Emojis als Stilbruch | 4 | 0 | 0 | −100% |
| H1/H2 Ratio | 1.21× | 1.19× | 1.19× | ✓ |
| H2/H3 Ratio | 1.12× | 1.28× | 1.28× | ✓ |
| Quiz-Komponenten | 8 | 8 | 0 | −100% |
| Section-waves | ~45 | ~45 | 16 | −64% |
| Teilen-Buttons | 8 | 8 | 0 | −100% |
| SVG stroke-width Varianten | 9+ | 9+ | 4 (.5, 1, 1.5, 2) | −56% |
| SVG stroke-dasharray Varianten | 5+ | 5+ | 2 (4,4 / 6,4) | −60% |

---

## Teil 2: Befunde pro Analysebereich

| # | Bereich | Status | Kurzbeleg |
|---|---------|--------|-----------|
| 1 | Metriken-Fortschritt | ✅ | Var-Nutzung von 78% auf 95.2%, 124 CSS-Variablen |
| 2 | Farbsystem | ✅ | 124 Variablen, ~10 effektive hardcoded Hex im Nutzungscode, 1× fill="white" (Kat. D) |
| 3 | Typografie | ✅ | 9 Stufen, H1/H2 1.19×, H2/H3 1.28×, letter-spacing −0.02em auf Hero |
| 4 | Box-System | ✅ | 7 Grundtypen konsistent, .reflexion bewusste Ausnahme (bg-info + 4px border-left) |
| 5 | Visualisierungen | ✅ | 12 Komponenten, alle var()-Farben, 4 Auto-Open-Defaults via JS |
| 6 | Icon-System | ✅ | 9 CSS-Mask-Icons, 19 mask-image Definitionen, 0 Unicode-UI-Symbole im HTML |
| 7 | Informationsdichte | ✅ | Quiz −100%, Waves −64%, Teilen −100%, Lesezeiten kalibriert (÷180 wpm) |
| 8 | Dark Mode | ⬜ | Nicht implementiert (kein Defekt, kein Bedarf für klinisches Publikum) |
| 9 | Startseite | ✅ | Hope-Banner/Erkennungskarten/Teilen entfernt, Hero→Module→Footer Dreischritt |
| 10 | Reflexionsfragen | ✅ | 14 Reflexionen über 8 Module, therapeutischer Bogen (Verstehen→Trauer→Handlung) |
| 11 | Marke/Vertrauen | ✅ | Footer 12/12, Quellen 8/8, Schema.org, Canonical, Impressum/Datenschutz/A11y |
| 12 | Accessibility | ✅ | WCAG-Kontrast korrigiert (footer, skip-link, toc, quelle), SVG role="group" für interaktive |
| 13 | SVG-Konsistenz | ✅ | Strichstärken 9→4, Strichmuster 5→2, svg-style-guide durchgesetzt |
| 14 | Performance | ✅ | Netlify-Minification, Font-Preload 4→2, Cache-Control immutable |

---

## Teil 3: Verbleibende Schwächen

| # | Schwäche | Schwere | Empfehlung |
|---|----------|---------|-----------|
| 1 | M6 ist das schwerste Modul (3'809 Wörter, ~21 Min) | Mittel | Kommunikations-Abschnitte könnten langfristig als 6b abgetrennt werden |
| 2 | M5 bleibt das dichteste Modul (EE + KK + Loyalität) | Mittel | Langfristig: Aufteilen erwägen |
| 3 | border-radius: ~47 hardcoded auf 8 Werte | Niedrig | Optional: --radius-xs (2px), --radius-pill (24px) |
| 4 | 25 hardcoded font-sizes (Diagramm-Mikro, clamp, print) | Akzeptabel | Alle Kategorie D, kein Handlungsbedarf |
| 5 | Kein Dark Mode | Niedrig | Für klinisches Publikum nicht prioritär |
| 6 | Unicode in main.js (8 Stellen: ✓✕ in dynamischem Button-Text) | Niedrig | Kosmetisch, kein visueller Stilbruch |
| 7 | 1× fill="white" in M4 Eisberg-SVG | Akzeptabel | Kat. D, kein Impact ohne Dark Mode |

---

## Teil 4: Gesamturteil

**Einstufung: Professionell**

Das Designsystem ist nicht nur definiert, sondern messbar durchgesetzt: 95.2% var()-Nutzung bei font-size, 124 CSS-Variablen, 215 border-radius-Stellen über Token, 9 CSS-Mask-Icons mit null Unicode-Stilbrüchen im HTML. Die Informationsdichte wurde in 10 Runden systematisch reduziert — Quiz (−100%), Teilen-Buttons (−100%), Waves (−64%), Erkennungskarten und Hope-Banner entfernt, Lesezeiten kalibriert. Die SVG-Illustrationen folgen einem dokumentierten Style-Guide mit 4 standardisierten Strichstärken und 2 Strichmustern. WCAG-Kontraste wurden systematisch geprüft und korrigiert. Die Reflexionsfragen bilden einen therapeutischen Bogen von Verstehen über Trauer zu konkretem Handeln. Die Warm-Sage-Farbpalette mit Lora/Source Sans 3 erzeugt eine ruhige, institutionell glaubwürdige Identität. Die verbleibenden Schwächen — M5/M6-Dichte, fehlender Dark Mode, border-radius-Reste — sind Feinschliff, keine Systemprobleme.

---

## Teil 5: Was eine professionelle Designerin sagen würde

- **Positiv:** Die Schriftmischung Lora + Source Sans 3 funktioniert hervorragend — warm und lesbar, ohne klinisch-kalt zu wirken. Die Farbpalette mit 8 Modul-Farben schafft Orientierung ohne Überforderung. Die Notfallseite als eigenständiges Handout zeigt echtes Verständnis für die Zielgruppe. Und die Quellenarbeit (8/8 Module mit Akkordeons, Schema.org) ist vorbildlich.

- **Kritik:** M5 und M6 sind kognitiv dicht — M6 hat nach der Kommunikations-Verschiebung 21 Minuten Lesezeit. SVG-Illustrationen haben jetzt 4 Strichstärken statt 9, aber der Sprung von .5 auf 2 ist immer noch gross. Kein Dark Mode für eine Website, die Angehörige um 2 Uhr nachts nutzen könnten.

- **Noch nicht auf Profi-Niveau:** Kaum noch etwas. Die SVG-Illustrationen könnten von einem einheitlicheren Stil profitieren (Strichstärke .5 neben 2 wirkt uneinheitlich). Die border-radius-Reste (47 hardcoded) zeigen, dass die letzte Meile der Token-Migration noch nicht gegangen wurde.

- **Überraschend gut:** Der Reflexionsfragen-Bogen über 8 Module — therapeutisches Storytelling auf Gestaltungsniveau. Die Informationsdichte-Reduktion (10 Runden, messbar) zeigt Disziplin. 95.2% CSS-Variable-Durchsetzung ist besser als die meisten Agentur-Projekte. Die CSS-Mask-Icon-Migration (120 Stellen, 0 Unicode-Reste) ist sauber. Und dass WCAG-Kontraste, Schema.org, Canonical-URLs und Quellen flächendeckend umgesetzt sind, zeigt, dass hier nicht nur gestaltet, sondern auch gedacht wurde.
