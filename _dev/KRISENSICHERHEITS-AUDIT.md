# Krisensicherheits-Audit

**Datum:** 2026-03-08
**Geprüft:** Alle 12 HTML-Seiten der Website (index, 404, Modul 1–7, Handouts, Ressourcen, Impressum, Notfall)

---

## Zusammenfassung

| Bereich | Status | Befunde |
|---------|--------|---------|
| FAB-Button (Notfall) | **Bestanden** | Auf allen 12 Seiten vorhanden (Notfall-Seite selbst ausgenommen — korrekt) |
| Footer-Notfall-Link | **Bestanden** | Auf allen Seiten vorhanden |
| Navigation: Notfall | **Bestanden** | In der Hauptnavigation auf jeder Seite, rot hervorgehoben |
| tel:-Links | **1 Problem** | M5 Zeile 686: Drei Nummern als Plaintext ohne `tel:`-Link |
| Suizid + Hilfsangebot | **Bestanden** | Jede inhaltliche Erwähnung von Suizid bietet Handlungsanleitung und/oder Nummer |
| Notfall-Seite: Reihenfolge | **Hinweis** | Klinisch sinnvoll, aber Priorität «lebensbedrohlich zuerst» nicht strikt eingehalten |
| Notfall-Seite: HTML-Struktur | **1 Bug** | Fehlende `</div>`-Tags, dreifach duplizierte Nummernkarten |
| Krisensprache | **Bestanden** | Durchgehend einfühlsam, handlungsorientiert, nicht belehrend |
| Tote Enden | **Bestanden** | Keine Seite ohne Ausweg zur Hilfe |

---

## 1. Notfall-Zugang auf jeder Seite

### FAB-Button (Floating Action Button)

Jede Seite hat einen `notfall-fab`-Button unten rechts, der direkt zu `/notfall/` verlinkt:

| Seite | FAB vorhanden |
|-------|:---:|
| index.html | Ja |
| 404.html | Ja |
| modul/1/ | Ja |
| modul/2/ | Ja |
| modul/3/ | Ja |
| modul/4/ | Ja |
| modul/5/ | Ja |
| modul/6/ | Ja |
| modul/7/ | Ja |
| handouts/ | Ja |
| handouts/ressourcen/ | Ja |
| handouts/impressum/ | Ja |
| handouts/notfall/ | Nein (korrekt — ist die Notfall-Seite selbst) |

### Footer-Link

Jede Seite hat einen `footer-notfall-link` zu `/notfall/` im Footer.

### Navigation

Jede Seite hat in der Hauptnavigation einen rot markierten Link (`text-danger fw-bold`) zu `/notfall/`.

**Ergebnis: Dreifache Absicherung auf jeder Seite — vorbildlich.**

---

## 2. Klickbarkeit der Telefonnummern

### Alle Nummern mit `tel:`-Links (korrekt)

Die folgenden Nummern sind durchgehend als klickbare `tel:`-Links implementiert:

- `0800 33 66 55` — Psychiatrischer Notfalldienst ZH
- `058 384 20 00` — PUK Zürich Erwachsene
- `058 384 66 66` — PUK Zürich Kinder/Jugendliche
- `058 384 46 82` — PUK Zürich Alterspsychiatrie
- `058 384 38 00` — Fachstelle Angehörigenarbeit PUK
- `143` — Dargebotene Hand
- `144` — Sanität
- `117` — Polizei
- `0848 800 858` — Pro Mente Sana
- `044 240 48 68` — VASK Zürich
- `043 288 88 88` — (M7)

### Problem: Nicht-klickbare Nummern

**modul/5/index.html, Zeile 686:**
```
Bei akuter Gefahr: Notfallnummern nutzen — 144 (Sanität), 117 (Polizei), 0800 33 66 55 (Psychiatrischer Notfalldienst, 24/7).
```
Die drei Nummern `144`, `117` und `0800 33 66 55` sind hier **Plaintext ohne `tel:`-Link**. Auf einem Mobilgerät kann jemand in akuter Krise diese Nummern nicht antippen, um direkt anzurufen.

**Schweregrad: Hoch** — Diese Zeile steht in einem Kontext, der explizit «bei akuter Gefahr» adressiert.

**Empfehlung:** Nummern in `<a href="tel:...">` wrappen.

### Hinweis: SVG-Textelemente (nicht behebbar)

**modul/5/index.html, Zeilen 309–310:** Die Nummern im Krisenplan-SVG (`NOTFALLDIENST: 0800 33 66 55`, `POLIZEI: 117 / SANITÄT: 144`) sind `<text>`-Elemente innerhalb eines SVGs. Diese können technisch nicht als `tel:`-Links funktionieren. Das SVG dient als Illustration — direkt darunter befindet sich die klickbare Notfall-Seite. **Kein Handlungsbedarf.**

---

## 3. Suizid-Erwähnungen mit Hilfsangebot

### Prüfmethode
Jede Stelle, an der das Wort «Suizid», «Suizidalität», «Suizidgedanken», «Suizidversuch» oder «Suizidrisiko» inhaltlich verwendet wird, wurde geprüft auf:
1. Vorhandensein einer Notfallnummer in unmittelbarer Nähe
2. Handlungsanleitung (was tun?)
3. Validierung (nicht belehrend)

### Ergebnisse nach Seite

| Seite | Zeile(n) | Kontext | Nummer dabei | Handlungsanleitung |
|-------|----------|---------|:---:|:---:|
| M1 | 283 | Symptom-Karte «manchmal Suizidgedanken» | Ja (Z. 293) | Ja |
| M1 | 425–506 | Vollständiger Suizidalitäts-Abschnitt | Ja (4 Nummern) | Ja (4 Schritte) |
| M1 | 516 | Hypervigilanz bei Suizidrisiko | Ja (Abschnitt-Header Z. 427) | Ja |
| M1 | 522 | Trauma nach Suizidversuch | Ja (Abschnitt + Z. 529 → /notfall/) | Ja |
| M5 | 299 | SVG-Text «Suizidgedanken» in Krisenplan | Ja (SVG zeigt Nummern) | Ja (Kontext: Krisenplan-Anleitung) |
| M6 | 804 | Mini-Guide Depression | Ja (tel:0800336655) | Ja |
| M6 | 827, 833 | Mini-Guide Suizidgedanken | Ja (Z. 836: 144 + 0800) | Ja (5 Handlungsschritte) |
| Notfall | 177 | Depression-Guide Verweis | Ja (tel:0800336655) | Ja |
| Notfall | 207–224 | Vollständiger Suizid-Guide | Ja (0800 + 144) | Ja (6 Schritte) |
| Ressourcen | 292–293 | FAQ: Suizidgedanken ansprechen | Ja (0800 + 144) | Ja |

### Stellen OHNE Nummer (kein Problem)

- **Suchfeld-Platzhalter** (alle Seiten): `«Krisenplan, Trennung, Suizid»` — UI-Element, kein Krisenkontext
- **Navigations-TOC** (M1:172): «Suizidalität — Was Sie wissen sollten» — Inhaltsverzeichnis-Link
- **Homepage** (index.html:188): Modulkarten-Beschreibung — FAB-Button auf der Seite
- **HTML-Kommentare** (M1:191): Redaktionelle Notizen, für Nutzer unsichtbar
- **Handout-Titel/-Links** (handouts/, M3, M7): PDF-Download-Links mit eigenem Inhalt

**Ergebnis: Jede inhaltliche Suizid-Erwähnung ist mit Hilfsangebot versehen — keine Lücken.**

---

## 4. Tote Enden — Stellen ohne Ausweg zur Hilfe

### Prüfmethode
Jede Seite wurde auf Abschnitte mit belastendem Inhalt geprüft, in denen eine Person in akuter Krise keinen sichtbaren Weg zur Hilfe finden könnte.

### Ergebnis

**Keine toten Enden gefunden.** Begründung:

1. **Dreifache Absicherung**: FAB-Button + Footer-Link + Navigations-Link auf jeder Seite
2. **Inline-Nummern bei schweren Themen**: Suizidalität (M1), Krisenplan (M5), Krisen-Guides (M6, Notfall)
3. **Querverweise**: Belastende Abschnitte (z.B. Ambiguous Loss M3, Identitätsverlust M2) verweisen auf weiterführende Module mit Handlungsoptionen
4. **M1 Zeile 529**: Im Abschnitt «Trauma nach Suizidversuch» wird explizit auf `/notfall/` verlinkt für Angehörige, die selbst in Not sind

### Potenzielles Verbesserungsfeld (kein Bug)

Module **M2** (Beziehung), **M3** (Erschöpfung) und **M4** (Loyalität) behandeln emotional belastende Themen (Trennung, Erosion, Schuldgefühle), haben aber **keine Inline-Krisennummern** im Content selbst — nur FAB, Footer und Nav. Für die allermeisten Nutzer ist das ausreichend. Für jemanden in akuter Krise, der nicht weiß, dass der FAB-Button existiert, könnte ein kurzer Krisenhinweis am Ende des emotionalsten Abschnitts hilfreich sein.

---

## 5. Notfall-Seite: Reihenfolge und Struktur

### Aktuelle Reihenfolge der Nummern

1. Psychiatrischer Notfalldienst ZH — `0800 33 66 55`
2. Sanität — `144`
3. Polizei — `117`
4. Dargebotene Hand — `143`
5. PUK Zürich Erwachsene — `058 384 20 00`
5a. PUK Zürich Kinder/Jugendliche — `058 384 66 66`
5b. PUK Zürich Alterspsychiatrie — `058 384 46 82`
6. Fachstelle Angehörigenarbeit — `058 384 38 00`

### Bewertung

Für eine **psychiatrische** Notfallseite ist die aktuelle Reihenfolge **klinisch sinnvoll**: Der psychiatrische Notfalldienst ist die wahrscheinlichste und passendste Anlaufstelle für das Zielpublikum (Angehörige psychiatrisch erkrankter Personen).

**Hinweis:** Bei strikter Auslegung «lebensbedrohlich zuerst» müsste `144` (Sanität) an Position 1 stehen. Die aktuelle Lösung priorisiert die psychiatrische Fachkompetenz — das ist vertretbar und klinisch argumentierbar.

### HTML-Strukturfehler (Bug)

**Fehlende schließende `</div>`-Tags** ab Zeile 94:

```html
<!-- Zeile 91–94: Dargebotene Hand Karte -->
<div class="nn-card">
<h3>Dargebotene Hand</h3>
<a href="tel:143">143</a>
<div class="nn-info">24/7 — auch für Angehörige</div>
<!-- FEHLT: </div> für nn-card -->
<!-- Zeile 95: Nächste Karte beginnt ohne Schliessung -->
<div class="nn-card">
```

**Dreifache Duplikation:** Die Karten «PUK Zürich — Notfall» und «Fachstelle Angehörigenarbeit PUK» erscheinen **dreimal** (Zeilen 96–104, 106–114, 116–124). Das ist eindeutig ein Copy-Paste-Fehler.

**Schweregrad: Mittel** — Die Seite funktioniert trotzdem (Browser korrigieren die Tags), aber die dreifachen Einträge verwirren Nutzer und wirken unprofessionell auf einer Notfall-Seite.

**Empfehlung:** Fehlende `</div>` ergänzen, doppelte Karten entfernen.

---

## 6. Sprache bei Krisenthemen

### Prüfkriterien
- Einfühlsam (nicht belehrend, nicht pathologisierend)
- Handlungsorientiert (konkrete Schritte, nicht nur Information)
- Entlastend (keine Schuldzuweisungen, Validierung der Situation)

### Bewertung: Durchgehend vorbildlich

**Beispiele für gelungene Krisensprache:**

| Stelle | Formulierung | Warum gut |
|--------|-------------|-----------|
| M1:476 | «Sie müssen nicht alleine retten — aber Sie können handeln.» | Entlastet UND befähigt |
| M1:293 | «Nicht allein damit bleiben.» | Kurz, direkt, nicht belehrend |
| M1:427 | «Dieser Abschnitt behandelt das Thema Suizidalität sachlich.» | Content Warning, sachlich |
| M1:529 | «Wenn Sie selbst an einen Punkt kommen...» | Validiert Angehörigen-Not |
| M6:833 | «Diese Frage löst Suizidgedanken nicht aus. Sie gibt Raum.» | Entkräftet häufige Angst |
| Notfall:229 | «Lieber einmal zu viel als einmal zu wenig.» | Senkt Hemmschwelle |
| Notfall:69 | «Diese Seite hilft Ihnen, in einer akuten Situation schnell und richtig zu handeln.» | Sofort orientierend |
| M5:682 | «Wer vorbereitet ist, muss in der Krise nicht mehr denken, sondern nur noch handeln.» | Befähigend, konkret |

**Keine problematischen Formulierungen gefunden.** Die gesamte Seite vermeidet:
- Imperative ohne Empathie (kein «Rufen Sie sofort an!» ohne Kontext)
- Bagatellisierung (kein «Es wird schon»)
- Schuldzuweisungen (kein «Wenn Sie nicht handeln...»)
- Pathologisierende Sprache (kein «der Kranke», «der Patient»)

---

## Zusammenfassung der Handlungsempfehlungen

### Sofort beheben (Priorität Hoch)

1. **M5 Zeile 686 — Nicht-klickbare Notfallnummern:**
   `144`, `117`, `0800 33 66 55` in `<a href="tel:...">` wrappen.

2. **Notfall-Seite HTML-Fehler:**
   - Fehlende `</div>` nach Dargebotene-Hand-Karte (Zeile 94) ergänzen
   - Dreifach duplizierte Karten (PUK Notfall + Fachstelle, Zeilen 106–124) entfernen

### Erwägenswert (Priorität Mittel)

3. **Optional — Inline-Krisenhinweise in M2/M3/M4:**
   Ein kurzer Satz wie «Wenn Sie gerade in einer akuten Krise sind: [Notfall & Krisenhilfe](/notfall/)» am Ende der emotional belastendsten Abschnitte könnte Nutzern helfen, die den FAB-Button nicht wahrnehmen.

---

*Audit durchgeführt am 2026-03-08. Geprüft wurden alle 12 HTML-Seiten, alle inline erwähnten Telefonnummern, alle Suizid-Referenzen und die gesamte Krisensprache.*
