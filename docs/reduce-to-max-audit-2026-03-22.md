# Reduce to the Max — Audit 2026-03-22

Leitfrage: *«Hilft dieses Element einer erschöpften Partnerin nachts um 2 Uhr in den nächsten 30 Sekunden?»*

## 1. Elementdichte pro Modul

| Modul | H2+H3 | Vignetten | Info-Boxen | Akkordeons | Waves | Handouts | Elemente total | Bewertung |
|-------|--------|-----------|------------|------------|-------|----------|----------------|-----------|
| M1 | 7 | 1 | 1 | 9 | 3 | 4 | ~25 | ⚠️ grenzwertig |
| M2 | 7 | 0 | 2 | 5 | 5 | 3 | ~22 | ⚠️ grenzwertig |
| M3 | 8 | 0 | 0 | 5 | 7 | 2 | ~22 | ✅ ok |
| M4 | 11 | 1 | 4 | 5 | 6 | 6 | ~33 | 🔴 überladen |
| M5 | 15 | 1 | 3 | 17 | 10 | 6 | ~52 | 🔴 überladen |
| M6 | 4 | 1 | 5 | 19 | 2 | 8 | ~39 | 🔴 überladen |
| M7 | 12 | 1 | 3 | 5 | 8 | 4 | ~33 | ⚠️ grenzwertig |
| M8 | 7 | 1 | 3 | 11 | 4 | 27 | ~53 | 🔴 überladen |

Benchmark: Max 8–10 sichtbare Elemente (ohne Akkordeon-Inhalte). M4, M5, M6, M8 liegen deutlich darüber.

## 2. Top-10 Entfernungs-Kandidaten

| Rang | Was entfernen/verstecken | Wo | Warum | Risiko |
|------|--------------------------|-----|-------|--------|
| 1 | **24 Handout-Gallery-Items** → 1 Link «Alle Handouts» | M8 | Grösste Einzelquelle kognitiver Überflutung. 24 PDFs in einem Grid erschlagen jeden. | Gering — Handout-Übersicht existiert bereits unter `/handouts/` |
| 2 | **Leere Default-Zustände** («Wählen Sie einen Knoten») → ersten Knoten auto-öffnen | M2, M5, M6, M7 | 5 interaktive Komponenten zeigen im Default NICHTS. Erschöpfte klicken nicht. | Keins — verbessert UX für alle |
| 3 | **Dekorative Wellen-SVGs** (45 total) → auf max 2 pro Modul reduzieren | Alle Module | Visueller Lärm. M5 hat 10, M7 hat 8. Addieren null Information. | Keins — rein dekorativ |
| 4 | **3 konsekutive Info-Boxen** ohne Fliesstext dazwischen | M4 (Z.660–679), M6 (Z.840–879), M7 (Z.661–676) | Box-Fatigue: 3 farbige Boxen direkt nacheinander wirken wie ein Formular. | Gering — Inhalt zusammenführen oder 1 Box streichen |
| 5 | **Wissens-Anker (Quiz)** → durch Reflexionsfrage ohne richtig/falsch ersetzen | M1, M2, M8 | Erschöpfte wollen nicht getestet werden. «Was ist die bipolare Störung?» als Quiz wirkt schulmeisterlich. | Mittel — Quiz hat Lerneffekt, aber Tonalität passt nicht zur Zielgruppe |
| 6 | **Teilen-Button** im Modul-Header | Alle 8 Module | Kein Angehöriger teilt «Mein Partner hat bipolare Störung» auf Social Media. Web-Standard-Reflex. | Keins |
| 7 | **Hope-Banner** auf Startseite | Startseite | «Wir sind stärker geworden» — nachts um 2 Uhr klingt das wie Hohn. Verschieben ans Ende von M7/M8. | Gering — motivierend, aber falscher Ort |
| 8 | **3 Erkennungskarten** auf Startseite | Startseite | Emotionale Resonanz ist wertvoll, aber 3 Karten + 4 Einstiegskarten + 8 Modulkarten = 15 Karten above-the-fold. Die 4 Einstiegskarten allein reichen. | Mittel — schaffen Identifikation |
| 9 | **«Aktualisiert: März 2026»** im Header | Alle 8 Module | Kein Nutzer in der Krise prüft das Aktualisierungsdatum. Vertrauen entsteht durch Inhalt, nicht durch Datums-Label. | Gering — kann in Footer oder Impressum |
| 10 | **6–8 Handout-Items pro Modul** → auf 2–3 Kern-Handouts reduzieren, Rest nach M8 | M4 (6), M5 (6), M6 (8) | Am Ende eines emotional dichten Moduls noch 6–8 PDFs = Abbruch. 2–3 relevanteste reichen. | Mittel — Nutzer finden Rest über Handout-Seite |

## 3. Lesezeit vs. Wörter

| Modul | Angegeben | Wörter | Realistisch (à 200 W/Min) | Differenz |
|-------|-----------|--------|---------------------------|-----------|
| M1 | 8–10 Min | 2'227 | ~11 Min | +1 Min |
| M2 | 8–10 Min | 1'789 | ~9 Min | ✅ passt |
| M3 | 8 Min | 2'631 | ~13 Min | **+5 Min** |
| M4 | 9 Min | 2'700 | ~14 Min | **+5 Min** |
| M5 | 14 Min | 3'546 | ~18 Min | **+4 Min** |
| M6 | 8 Min | 2'501 | ~13 Min | **+5 Min** |
| M7 | 12 Min | 2'923 | ~15 Min | +3 Min |
| M8 | 7 Min | 2'127 | ~11 Min | **+4 Min** |

M3, M4, M6 unterschätzen die Lesezeit massiv (~60% länger als angegeben). Bei gestressten Lesern (150 W/Min) wären alle Module noch länger.
