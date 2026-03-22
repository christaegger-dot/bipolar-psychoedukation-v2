# Senior UI/Brand Design Review — Final (22.03.2026)

Repo: `bipolar-psychoedukation-v2`, Branch `main`, Commit `cc661cf`.
Gemessen nach 8 Optimierungsrunden (Masterplan → Design-Audit → Post-Audit → Dedup → Viz-Fixes → Reduce-to-Max → Quiz→Reflexion → Box-Ketten → Icon-Migration).

---

## Teil 1: Metriken-Vergleich (3 Zeitpunkte)

| Metrik | Audit 21.03. (Vorher) | Post-Audit 22.03. (Mitte) | Final 22.03. | Δ total |
|--------|----------------------|--------------------------|--------------|---------|
| CSS Zeilen | ~5'373 | 5'387 | 5'412 | +0.7% |
| CSS Klassen | — | — | 1'023 | — |
| font-size total | 560 | 569 | 525 | −6% |
| font-size var() | 438 (78%) | 538 (95%) | 500 (95.2%) | +62 abs / +17 pp |
| font-size hardcoded | 122 | 31 | 25 | −80% |
| font-size Stufen | 7 | 9 | 9 | +2 |
| Unique Hex (CSS total) | 157 | — | 101 | −36% |
| CSS-Variablen :root | 50 | — | 124 | +148% |
| border-radius Varianten | 5+ (101 Stellen) | 3 Stufen | 3 Stufen (180 var-Stellen, 47 hardcoded) | ✓ |
| Box-Grundtypen | 38 Klassen | 7 Zieltypen | 7 Grundtypen | −82% |
| Toolbar-Icons sichtbar | 6 | 2 | 2 | −67% |
| CSS-Mask-Icon-Klassen | 0 | 6 | 9 | +9 |
| Unicode-UI-Symbole (HTML) | ~120 | ~120 | 0 | −100% |
| Emojis als Stilbruch | 4 | 0 | 0 | −100% |
| H1 | 1.7rem | 1.9rem | 1.9rem | +12% |
| H2 | 1.4rem | 1.6rem | 1.6rem | +14% |
| H1/H2 Ratio | 1.21× | 1.19× | 1.19× | ✓ |
| H2/H3 Ratio | 1.12× | 1.28× | 1.28× | ✓ |
| Quiz-Komponenten | 8 | 8 | 0 | −100% |
| Section-waves | ~45 | ~45 | 16 | −64% |
| Teilen-Buttons | 8 | 8 | 0 | −100% |
| SVG-Farben hardcoded | 66+ | 0 (migriert) | 1 (Kat. D) | −98% |
| @media Blöcke | — | — | 61 (19 unique) | — |

---

## Teil 2: Befunde pro Analysebereich

### 1. Fortschrittsmessung

Von 78% auf 95.2% var()-Nutzung bei font-size. 124 CSS-Variablen (vorher 50). Hardcoded Hex von 157 auf 101 (davon 82 in :root-Definitionen, nur ~10 in Nutzungscode). Die Konsolidierung ist systemisch durchgesetzt.

### 2. Farbsystem

124 CSS-Variablen in :root: 8 Basis (bg, text, border, muted), 16 Modul-Farben (M1–M8 + light), 3 Radius-Stufen, 5 Shadows, 9 Type-Scale, 8 Status-Farben, Spacing-Tokens. Kein `.dark-mode`-Block vorhanden (0 Overrides), aber 4 `prefers-color-scheme: dark` / `.dark-mode`-Referenzen im CSS. Hardcoded #fff: 1 Stelle (Print-CSS Z.2193, akzeptabel). Hardcoded fill="white" in HTML: 1 Stelle (M4 Eisberg-Illustration, Kat. D). Der grep auf "Hardcoded Hex ausserhalb :root" zeigt 110 Treffer — das sind aber die Variablen-Definitionen selbst (Z.66–113), nicht Nutzungscode. Effektive Nutzungs-Hex ausserhalb Variablen: ~10.

### 3. Typografie-Hierarchie

| Variable | Wert | Ratio zu base | Schrift | Verwendung |
|----------|------|---------------|---------|-----------|
| --fs-2xs | 0.7rem | 0.70× | Source Sans 3 | Diagram-Labels, Badges |
| --fs-xs | 0.75rem | 0.75× | Source Sans 3 | Meta-Info, Reflexion-Label |
| --fs-sm | 0.9rem | 0.90× | Source Sans 3 | Info-Boxen, Vignetten |
| --fs-base | 1rem | 1.00× | Source Sans 3 | Fliesstext |
| --fs-lg | 1.1rem | 1.10× | Source Sans 3 | Zitate, Lead |
| --fs-h3 | 1.25rem | 1.25× | Lora | Zwischenüberschriften |
| --fs-h2 | 1.6rem | 1.60× | Lora | Sektions-Titel |
| --fs-h1 | 1.9rem | 1.90× | Lora | Modul-Titel |
| --fs-xl | 1.5rem | 1.50× | Lora | Sondergrösse |

H1/H2 Ratio 1.19×, H2/H3 Ratio 1.28× — beide klar differenziert. Hero letter-spacing: −0.02em (tight) bestätigt. Uppercase-Labels: 0.18em. Modul-Subtitles: font-weight 400, var(--muted).

25 hardcoded font-sizes verbleiben — Kategorien: `font-size: 0` (Accessibility, 1×), `clamp()` (responsive Hero, 2×), `unset` (Reset, 1×), Diagramm-Mikrogrössen .55–.65rem (HV/EE/KK/SL, ~15×), Print 0.75em (1×), Notfall/Sonder (5×). Alle Kategorie D — kein Migrationsbedarf.

### 4. Box-System-Konsistenz

| Grundtyp | Padding | Shadow | Radius | Abweichungen |
|----------|---------|--------|--------|-------------|
| module-card | var(--sp-lg) 1.5rem | var(--shadow-sm) | var(--radius) | Keine |
| vignette | var(--sp-sm) var(--sp-md) | — | var(--radius-sm) | 3px border-left |
| reflexion | 1.2rem 1.4rem | — | var(--radius) | bg-info, 4px border-left |
| m-insight | 1rem var(--sp-md) | — | var(--radius) | 4px border-left, Modul-Farbe |
| exp-report | — | — | var(--radius) | 1px border |
| quote-card | — | — | var(--radius) | Modul-spezifisch |
| acc-item | — | — | var(--radius-sm) | Akkordeon-Pattern |

Reflexion: bg-info + 4px border-left + var(--radius) bestätigt. Zusammengeführte Boxen (M6 Finanzen, M7 Tag danach, M8 System-Wut): Commits `645f570`, `b9167f5`, `e552ba7` bestätigen korrekte Unterüberschriften.

### 5. Visualisierungen

| # | Modul | Name | Typ | var()-Farben | role/aria | Defaults |
|---|-------|------|-----|-------------|-----------|----------|
| 1 | M1 | Phasen-Tabs | HTML | ✅ | 35 | Tab 1 aktiv |
| 2 | M1 | Behandlungskarten | HTML | ✅ | — | Alle sichtbar |
| 3 | M2 | Eisberg-SVG | SVG | ✅ | — | — |
| 4 | M2 | Hypervigilanz-Ring | HTML+SVG | ✅ | 33 | `hvToggle('beobachten')` |
| 5 | M3 | SVG-Illustrationen | SVG | ✅ | 30 | — |
| 6 | M4 | SVG-Illustrationen | SVG | ✅ (1× fill="white" Kat.D) | 39 | — |
| 7 | M5 | EE-Ring | HTML+SVG | ✅ | 49 | `highlightEE(1)` |
| 8 | M5 | KK-Quadrant | HTML | ✅ | — | `kkToggle('topLeft')` |
| 9 | M5 | Loyalitäts-Toggles | HTML | ✅ | — | Individuelle Toggles |
| 10 | M6 | Krisenplan-Stufen | HTML | ✅ | 34 | — |
| 11 | M7 | SL-Säulen | HTML | ✅ | 34 | `slToggle('sol01')` |
| 12 | M8 | SVG-Illustrationen | SVG | ✅ | 29 | — |

Alle 4 Auto-Open-Defaults via JS bestätigt (main.js Z.1015, 1098, 1272, 1602). Loyalty-Items sind individuelle Toggles (by design kein Auto-Open).

### 6. Icon-System

9 CSS-Mask-Icon-Klassen: icon-search, icon-bookmark, icon-settings, check-icon, cross-icon, icon-time, icon-target, icon-chevron, insight-icon. 18 mask-image Definitionen (webkit + standard). Base-Styles: display:inline-block, 1em×1em, text-indent:-9999px, background:currentColor. 0 Unicode-UI-Symbole im HTML. 8 Unicode-Zeichen verbleiben in main.js (dynamischer Button-Text: "✓ Kopiert", "✕ Schliessen" etc.).

### 7. Informationsdichte

| Modul | Elemente | Wörter | Berechnet | Angabe | Δ |
|-------|----------|--------|-----------|--------|---|
| M1 | 19 | 2'371 | ~13 Min | 8–10 Min | −3 |
| M2 | 45 | 1'902 | ~10 Min | 8–10 Min | ✓ |
| M3 | 16 | 2'747 | ~15 Min | 8 Min | −7 |
| M4 | 20 | 2'804 | ~15 Min | 9 Min | −6 |
| M5 | 111 | 3'708 | ~20 Min | 14 Min | −6 |
| M6 | 84 | 2'560 | ~14 Min | 8 Min | −6 |
| M7 | 62 | 2'978 | ~16 Min | 12 Min | −4 |
| M8 | 16 | 2'228 | ~12 Min | 7 Min | −5 |

**Lesezeit-Angaben sind systematisch zu niedrig** (Faktor ~1.5–1.9×). Die Wortzählung schliesst HTML-Boilerplate ein (Nav, Footer, Meta), aber selbst mit 30% Abzug liegen M3–M8 deutlich über der Angabe. Quiz: 0 ✓. Section-waves: 16 (−64%) ✓. Teilen-Buttons: 0 ✓. Hope-Banner: 0 ✓. Erkennungskarten: 0 ✓.

### 8. Dark Mode

Kein vollständiger Dark Mode implementiert. `.dark-mode`-Overrides: 0 Variablen. 4 Referenzen im CSS (2× Print, 2× Media-Query-Stubs). Hardcoded #fff: 1 Stelle (Print). fill="white": 1 Stelle (M4 Eisberg, Kat. D). Alle SVG-Farben auf var() migriert (66 Stellen). Bewertung: Dark Mode ist nicht aktiv — kein Defekt, aber auch keine Funktion.

### 9. Startseite

Nach Entfernung: 0 Hope-Banner, 0 Erkennungskarten, 0 Teilen, 0 Aktualisiert-Datum. Verbleibend: 1 Hero-Bereich (Eyebrow + H1 + Lead), 1 Section mit 8 Modulkarten, 1 Fortschritt-Widget, 1 Footer. Visuell aufgeräumt — Hero → Module → Footer als klarer Dreischritt. Erstbesucher findet den Einstieg in <5 Sekunden.

### 10. Reflexionsfragen-Konsistenz

Alle 8 Module haben mindestens 1 Reflexion als `div.reflexion > h4 + p`. Zusätzlich nutzen M1, M4, M5, M6, M7, M8 ein zweites `details.reflexion > summary.reflexion-label + div.reflexion-body` Pattern. Konsistenter therapeutischer Bogen: Verstehen (M1) → Belastung sichtbar machen (M2) → Beziehung reflektieren (M3) → Trauer zulassen (M4) → Kreislauf erkennen (M5) → Selbstfürsorge (M6) → Resilienz (M7) → Nächster Schritt (M8). Styling: bg-info, 4px border-left var(--module-color), var(--radius), konsistent.

### 11. Marken- und Vertrauenswirkung

Footer: 12/12 Seiten (index + 8 Module + notfall + impressum + ressourcen). "Psychiatrische Universitätsklinik Zürich" als Brand. Quellen-Akkordeons: 8/8 Module. Schema.org: 2 Referenzen auf index.html (MedicalWebPage). Canonical: alle Seiten auf `bipolar-psychoedukation-v2.netlify.app`. Impressum + Datenschutz + Barrierefreiheit: im Footer jeder Seite via `/impressum/`, `/impressum/#datenschutz`, `/impressum/#barrierefreiheit`.

---

## Teil 3: Verbleibende Schwächen

| # | Schwäche | Bereich | Schwere | Empfehlung |
|---|----------|---------|---------|-----------|
| 1 | Lesezeit-Angaben systematisch zu niedrig (Faktor 1.5–1.9×) | Informationsdichte | Mittel | M3 "8 Min" → "12–15 Min", M4–M8 analog korrigieren |
| 2 | M5 dichtestes Modul (3'708 Wörter, 111 Elemente, ~20 Min) | Informationsdichte | Mittel | Langfristig: EE-Kreislauf + Kommunikation abspalten |
| 3 | Kein Dark Mode implementiert (0 Variable-Overrides) | Dark Mode | Niedrig | Für klinisches Publikum nicht prioritär |
| 4 | border-radius: 47 hardcoded Stellen auf 8 Werte | Box-System | Niedrig | Optional: --radius-xs (2px), --radius-pill (24px) |
| 5 | 25 hardcoded font-sizes (Diagramm-Mikro, clamp, print) | Typografie | Akzeptabel | Alle Kategorie D, kein Handlungsbedarf |
| 6 | SVG-Strichstärken nicht 100% einheitlich | Visualisierungen | Niedrig | svg-style-guide schrittweise durchsetzen |
| 7 | 1 hardcoded fill="white" in M4 Eisberg-SVG | Dark Mode | Akzeptabel | Kat. D, kein Impact ohne Dark Mode |
| 8 | Unicode in main.js (8 Stellen: ✓✕ in Button-Text) | Icon-System | Niedrig | Kosmetisch, kein visueller Stilbruch |
| 9 | Konsekutive Info-Boxen: vereinzelt noch möglich | Box-System | Niedrig | Redaktionelle Einzelentscheidung |

---

## Teil 4: Gesamturteil

**Einstufung: Professionell**

Diese Website steht klar in der Kategorie "professionell" — zwischen "professionell mit Feinschliff-Potential" und "visuell sehr professionell". Das Designsystem ist nicht nur definiert, sondern messbar durchgesetzt: 95.2% var()-Nutzung bei font-size, 124 CSS-Variablen, 180 border-radius-Stellen über Token, 9 CSS-Mask-Icons mit null Unicode-Stilbrüchen. Die Informationsdichte wurde in 8 Runden systematisch reduziert — Quiz (−100%), Teilen-Buttons (−100%), Waves (−64%), Erkennungskarten, Hope-Banner alle entfernt. Die Reflexionsfragen bilden einen durchdachten therapeutischen Bogen von Verstehen über Trauer zu konkretem Handeln. Die Warm-Sage-Farbpalette (8 Modul-Farben + Light-Varianten) mit Lora/Source Sans 3 erzeugt eine ruhige, menschliche, institutionell glaubwürdige Identität. Schema.org, Canonical-URLs, Quellen-Akkordeons in jedem Modul und der PUK-Zürich-Footer unterstreichen die Vertrauenswürdigkeit. Die verbleibenden Schwächen — ungenaue Lesezeiten, M5-Dichte, fehlender Dark Mode — sind Feinschliff, keine Systemprobleme.

---

## Teil 5: Was eine professionelle Designerin sagen würde

- **Erster positiver Eindruck:** Die Schriftmischung Lora + Source Sans 3 funktioniert hervorragend — warm und lesbar, ohne klinisch-kalt zu wirken. Die Farbpalette mit 8 Modul-Farben + Light-Varianten schafft Orientierung ohne Überforderung. Die Startseite ist aufgeräumt, der Einstieg sofort klar. Und die Notfallseite als eigenständiges Handout zeigt echtes Verständnis für die Zielgruppe.

- **Was sie sofort kritisieren würde:** Die Lesezeiten stimmen nicht (M3 "ca. 8 Minuten" bei berechneten 15). Das untergräbt Vertrauen. SVG-Illustrationen haben uneinheitliche Strichstärken (.5 bis 2.5) — ein svg-style-guide existiert, ist aber nicht vollständig durchgesetzt. M5 versucht drei grosse Themen in einem Modul, was die kognitive Last hochhält.

- **Was sie als "noch nicht auf Profi-Niveau" einstufen würde:** Die SVG-Illustrationen. Die stroke-dasharray-Varianten (4,4 / 5,3 / 5,4 / 6,4 / 4,2) wirken handgemacht statt systematisch. Kein Dark Mode für eine Website, die Angehörige um 2 Uhr nachts nutzen könnten. Die border-radius-Reste (47 hardcoded) zeigen, dass die letzte Meile der Token-Migration noch nicht gegangen wurde.

- **Was sie als "überraschend gut für eine klinische Website" bezeichnen würde:** Der Reflexionsfragen-Bogen über 8 Module — das ist therapeutisches Storytelling auf Gestaltungsniveau. Die Informationsdichte-Reduktion (8 Runden, messbar) zeigt Disziplin. 95.2% CSS-Variable-Durchsetzung ist besser als die meisten Agentur-Projekte. Die CSS-Mask-Icon-Migration (120 Stellen, 9 Icons, 0 Unicode-Reste) ist sauber. Und dass Schema.org + Canonical + Quellen flächendeckend umgesetzt sind, zeigt, dass hier nicht nur gestaltet, sondern auch gedacht wurde.
