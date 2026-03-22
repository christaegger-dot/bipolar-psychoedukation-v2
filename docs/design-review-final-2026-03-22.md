# Design Review Final — 2026-03-22

## Teil 1: Metriken-Vergleich

| Metrik | Audit 21.03 (Vorher) | Post-Audit (Mitte) | Jetzt (Final) | Δ total |
|--------|----------------------|--------------------|---------------|---------|
| font-size total | 521 | — | 525 | +4 |
| font-size var() | 438 (84%) | ~495 (94.8%) | 497 (94.6%) | +59 |
| font-size hardcoded | 83 | ~26 | 28 | −55 |
| Unique Hex in CSS | 157 | — | 101 | −56 |
| border-radius unique | 15+ | 3 Stufen | 31 Werte (3 var + Sonderfälle) | systematisiert |
| var(--radius) Nutzung | ~0 | — | 180 | +180 |
| @media Blöcke | — | — | 61 | — |
| CSS Zeilen | — | — | 5400 | — |
| CSS Klassen | — | — | 1020 | — |
| Box-Typen | 38 | 7 Grundtypen | 7 Grundtypen | −31 |
| Section-Wave SVGs | ~45 | — | 16 | −29 |
| Quiz-Komponenten | 8 Module | — | 0 | −8 |
| Teilen-Buttons | 8 | — | 0 | −8 |
| Dark-Mode Variablen | ~50 | — | 81 | +31 |

## Teil 2: Befunde pro Bereich

| # | Bereich | Status | Beleg |
|---|---------|--------|-------|
| 1 | Fortschrittsmessung | ✅ | 94.6% var-font-size, 101 Hex (von 157), 180× var(--radius) |
| 2 | Farbsystem | ✅ mit Resten | 81 Dark-Mode-Vars, alle Inline-SVGs auf var(). 18 hardcoded Hex in CSS (Print-Styles + Fallbacks). 39 hardcoded Farbrefs in HTML (M4 Eisberg `fill="white"` + Inline-Styles) |
| 3 | Typografie | ✅ | H1=1.9rem, H2=1.6rem (1.19×), H3=1.25rem (1.28×). letter-spacing −0.02em auf Hero. quote-card: var(--fs-lg). 28 hardcoded font-size (Dekorativ/Responsive-Sonder) |
| 4 | Box-System | ✅ | 7 Grundtypen. .reflexion: bg-info, 4px border-left, var(--radius). Zusammengeführte Boxen M6/M7/M8 mit Unterüberschriften korrekt. Keine 3+ konsekutiven Boxen ohne Fliesstext |
| 5 | Visualisierungen | ✅ | 12 Viz total. M1 behandlung: HTML-Karten. M2 Eisberg: Bézierkurven + var(). M3: 2 Linien + Direct Labeling. M6 Sauerstoffmaske: Text-Insight. Kompass: SVG interaktiv. Alle 5 Interaktive auto-open |
| 6 | Icon-System | ⚠️ | 11 CSS-Mask-Icons. 95+ Unicode-Symbole verbleiben (◈✓✕◎⌕ in allen Modulen). Migration unvollständig |
| 7 | Informationsdichte | ✅ | Quiz: 0. Waves: 16 (−64%). Teilen: 0. Hope-Banner: entfernt. M8 Handout-Gallery: display:none default |
| 8 | Dark Mode | ✅ mit Resten | 81 Vars in prefers-color-scheme:dark. 1× hardcoded #fff in Print-CSS. 1× fill="white" in M4 SVG |
| 9 | Startseite | ✅ | Hero + 4 Situations-Karten + Modul-Grid. Kein Hope-Banner, keine Erkennungskarten, kein Teilen-Button. Klare Trennung Einstieg/Module |
| 10 | Reflexionsfragen | ⚠️ | 2 Formate: div.reflexion (8×, neue offene Fragen) + details.reflexion (6×, ältere klappbare). Styling konsistent, aber HTML-Struktur gemischt |
| 11 | Vertrauensmarker | ✅ | PUK-Footer: alle 12 Seiten. Quellen-Akkordeons: alle 8 Module. Schema.org MedicalWebPage: ✓. Canonical: alle auf netlify.app. Impressum/Datenschutz im Footer: ✓ |

## Teil 3: Verbleibende Schwächen

| Rang | Schwäche | Schwere | Empfehlung |
|------|----------|---------|------------|
| 1 | Lesezeiten unterschätzen real um 30–60% (M3: 8 angegeben, 14 real; M4: 9→14; M6: 8→13) | Mittel | Lesezeiten auf 180 W/Min-Basis korrigieren |
| 2 | 95+ Unicode-UI-Symbole (◈✓✕◎⌕) nicht auf CSS-Mask migriert | Niedrig | Batch-Migration der 6 häufigsten Symbole |
| 3 | border-radius: 31 unique Werte trotz 3 Variablen (6px, 7px, 4px, 24px neben var) | Niedrig | Restliche ~25 Sonderwerte auf var(--radius-sm/radius/radius-lg) mappen |
| 4 | 28 hardcoded font-size (Responsive-Breakpoints, Dekorativ-Elemente) | Niedrig | 15 davon in @media — akzeptabel. 13 migrierbar |
| 5 | Reflexionsfragen: div vs details gemischt | Niedrig | Einheitlich auf div.reflexion (offen) standardisieren |
| 6 | M4 Eisberg-SVG: fill="white" hardcoded | Niedrig | Durch var(--white) ersetzen |
| 7 | Print-CSS: #000/#fff/#ccc hardcoded (5 Stellen) | Akzeptabel | Print braucht keine Variablen |

## Teil 4: Gesamturteil

**Professionell mit Feinschliff-Potential.** 8 Optimierungsrunden haben aus einer inhaltlich starken, aber gestalterisch uneinheitlichen Seite ein konsistentes Design-System gemacht: 7 Box-Typen, 3-Stufen-Radius, 94.6% variable Typografie, 81 Dark-Mode-Variablen, alle SVGs auf CSS-Variablen. Die verbleibenden Schwächen (Lesezeiten, Unicode-Reste, border-radius-Ausreisser) sind kosmetisch und beeinträchtigen weder UX noch Glaubwürdigkeit.

## Teil 5: Designerin-Urteil

- **Positiv:** Farbsystem mit 8 Modul-Farben + Light-Varianten ist editorial stark; die Situations-Karten auf der Startseite sind empathisch und funktional zugleich
- **Sofort-Kritik:** Lesezeiten lügen — 8 Minuten versprechen und 14 liefern untergräbt Vertrauen bei einer Zielgruppe, die ohnehin erschöpft ist
- **Nicht Profi-Niveau:** Unicode-Symbole (◈◎✓) als Icons wirken wie Platzhalter; die gemischten Reflexions-Formate (offen vs. klappbar) brechen das Pattern
- **Überraschend gut:** Die Informationsdichte-Reduktion (Waves −64%, Quiz entfernt, Boxen zusammengeführt) bei null Inhaltsverlust ist ungewöhnlich diszipliniert für eine klinische Website
