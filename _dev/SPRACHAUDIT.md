# Sprachkonsistenz-Audit

**Datum:** 2026-03-08
**Geprüfte Dateien:** Alle 13 HTML-Dateien im Projekt
**Methode:** Systematische Suche mit grep/ripgrep, manuelle Prüfung der Ergebnisse

---

## 1. Schweizer Rechtschreibung (ß → ss)

**Ergebnis: BESTANDEN — keine Probleme gefunden.**

Kein einziges `ß` in allen HTML-Dateien vorhanden. Schweizer Rechtschreibung wird durchgehend korrekt verwendet (`ss` statt `ß`).

---

## 2. Anrede-Konsistenz (Sie vs. du)

**Ergebnis: BESTANDEN — alle du-Verwendungen sind korrekte Ausnahmen.**

Alle gefundenen `du/dir/dich/dein`-Vorkommen befinden sich in erlaubten Kontexten:

### Zitate und Ich-Botschaft-Beispiele (korrekt)

| Datei | Zeile | Kontext |
|-------|-------|---------|
| `modul/5/index.html` | 440 | «Du bist unmöglich, wenn du so schreist!» (Negativbeispiel) |
| `modul/5/index.html` | 444 | «Ich liebe dich, aber…» (Positivbeispiel) |
| `modul/5/index.html` | 452 | «Wenn du so weitermachst…» (Negativbeispiel) |
| `modul/5/index.html` | 468 | «Was brauchst du, um dran zu bleiben?» (Positivbeispiel) |
| `modul/5/index.html` | 510 | «Ich verstehe, dass du wütend bist.» (Kommunikationsbeispiel) |
| `modul/5/index.html` | 618 | «…dass du nicht schläfst.» (Ich-Botschaft) |
| `modul/4/index.html` | 440–443 | Du-Botschaft-Negativbeispiele (Kommunikationsübung) |
| `modul/4/index.html` | 451 | «…dass du seit drei Nächten kaum schläfst» (Beobachtung) |
| `modul/4/index.html` | 524–538 | Kommunikationskompass: Du-Botschaft vs. Ich-Botschaft (didaktisch) |
| `modul/4/index.html` | 583–607 | Quiz-Daten mit Beispielsätzen |
| `modul/4/index.html` | 739, 753 | Mikro-Aufgaben mit Beispielsätzen |
| `modul/6/index.html` | 204–258 | Kommunikations-Slider: Vorher/Nachher-Beispiele |
| `modul/6/index.html` | 505, 509 | Zitate erkrankter Personen |
| `modul/6/index.html` | 783, 799–801, 832 | Krisenplan-Kurzanleitungen (Gesprächsbeispiele) |
| `modul/3/index.html` | 260 | «Ich halte zu dir» (Zitat) |
| `modul/3/index.html` | 499 | «…nicht wegen dir.» (Kinderbeispiel) |
| `modul/3/index.html` | 538 | Erfahrungsbericht (Zitat) |
| `modul/1/index.html` | 480 | «Ich mache mir Sorgen um dich.» (Handlungsempfehlung) |
| `handouts/notfall/index.html` | 121–197 | Krisenanleitungen (Gesprächsvorschläge) |
| `handouts/ressourcen/index.html` | 293, 308 | FAQ-Antworten mit Beispielsätzen |

**Empfehlung:** Keine Änderungen nötig. Alle du-Formen stehen in Anführungszeichen oder sind Teil von didaktischen Beispielen.

---

## 3. Gender-inklusive Sprache (Stern-Notation)

**Ergebnis: ÜBERWIEGEND KONSISTENT — kleinere Inkonsistenzen.**

### Stern-Notation korrekt verwendet (Auswahl)

`Partner*in`, `Angehörige*r`, `Aufpasser*in`, `Ihr*e Partner*in`, `mein*e Partner*in` — durchgängig in allen Modulen und Handouts.

### Stellen OHNE Stern (zu prüfen)

| Datei | Zeile | Text | Bewertung |
|-------|-------|------|-----------|
| `modul/7/index.html` | 154 | «— Partnerin, 55 Jahre (anonymisiert)» | **OK** — Vignetten-Quellenangabe, beschreibt eine konkrete Person |
| `modul/3/index.html` | 154 | «— Partnerin, 38 Jahre (anonymisiert)» | **OK** — dito |
| `modul/6/index.html` | 155 | «— Partnerin, 49 Jahre (anonymisiert)» | **OK** — dito |
| `modul/2/index.html` | 155 | «— Partnerin, 41 Jahre (anonymisiert)» | **OK** — dito |
| `modul/5/index.html` | 153 | «…wieder seine Partnerin.»» | **OK** — Zitat einer konkreten Person |
| `modul/2/index.html` | 154 | «…nicht mehr seine Partnerin…» | **OK** — Zitat |
| `modul/2/index.html` | 286 | «Maria, 42, Partnerin eines Menschen…» | **OK** — Erfahrungsbericht, konkrete Person |
| `modul/4/index.html` | 308 | «Susanne, 44 — Partnerin» | **OK** — Erfahrungsbericht |
| `modul/4/index.html` | 716 | «Sie sind seine Partnerin.» | **OK** — Therapeuten-Zitat |
| `modul/1/index.html` | 805 | «Miriam, 47 — Mutter und Partnerin» | **OK** — Erfahrungsbericht |
| `modul/3/index.html` | 656 | «Ihres Partners oder Ihrer Partnerin» | **OK** — paarweise Nennung |

**Empfehlung:** Keine Änderungen nötig. Alle Stellen ohne Stern beziehen sich auf konkrete (anonymisierte) Personen oder verwenden die Paarform (Partner/Partnerin). Die Stern-Notation wird konsistent in generischen Kontexten verwendet.

---

## 4. Tonalität der Modul-Einstiege

**Ergebnis: BESTANDEN — alle Module beginnen empathisch und validierend.**

| Modul | Vignette (Zitat) | Intro-Text | Bewertung |
|-------|-------------------|------------|-----------|
| **M1** | «Was mich am meisten erschöpft, ist nicht die Manie…» | «Weder Sie noch Ihr Partner sind schuld — es ist eine neurobiologische Erkrankung, die behandelbar ist.» | Validierend + entlastend |
| **M2** | «Ich merkte irgendwann, dass ich nicht mehr seine Partnerin war…» | «Es sind nicht einzelne Konflikte, sondern strukturelle Veränderungen…» | Empathisch, beschreibend |
| **M3** | «Ich sage allen, es geht mir gut. Aber nachts liege ich wach…» | «Solidarität verschwindet nicht über Nacht. Das ist kein Zeichen von Schwäche…» | Stark validierend |
| **M4** | «Ich darf ihn nicht im Stich lassen — aber ich verliere mich dabei selbst.» | «Keines davon ist Ihr Versagen: Es sind strukturelle Muster, die durch Überlastung entstehen.» | Validierend + entlastend |
| **M5** | «Ich habe jahrelang funktioniert, bis ich nicht mehr konnte.» | «In diesem Modul geht es um Sie: Wie Sie Ihre eigene Energie erhalten…» | Empathisch, direkt |
| **M6** | «Wir haben gelernt, als Team zu funktionieren.» | «Hier geht es nicht um Probleme, sondern um das, was trotz allem wächst.» | Hoffnungsvoll, validierend |
| **M7** | «Der wichtigste Moment war, als ich verstanden habe: Ich darf mir Hilfe holen.» | «Sie sind nicht allein. Es gibt ein dichtes Netz an Unterstützung…» | Ermutigend, direkt |

**Empfehlung:** Keine Änderungen nötig. Kein Modul beginnt akademisch/belehrend. Alle verwenden Vignetten-Zitate als Einstieg und anschliessend validierende, direkte Sprache.

---

## 5. Fachbegriff-Erklärungen (Tooltips)

**Ergebnis: TEILWEISE — einige Begriffe ohne Tooltip bei erster Verwendung.**

### Begriffe MIT Tooltip bei erster Verwendung (korrekt)

| Begriff | Datei | Zeile | Tooltip |
|---------|-------|-------|---------|
| **Euthymie** | `modul/1/index.html` | 240 | `class="tt"` mit Erklärung |
| **Rapid Cycling** | `modul/1/index.html` | 454 | `class="tt"` mit Erklärung |
| **Expressed Emotion** | `modul/4/index.html` | 242 | `class="tt"` mit Erklärung |
| **Anosognosie** | `modul/4/index.html` | 657 | `class="tt"` mit Erklärung |
| **Co-Isolation** | `modul/3/index.html` | 372 | `class="tt"` mit Erklärung |
| **Heritabilität** | `modul/3/index.html` | 507 | `class="tt"` mit Erklärung |
| **FFT** | `modul/4/index.html` | 435 | `class="tt"` mit Erklärung |

### Begriffe OHNE Tooltip bei weiterer Verwendung (zu prüfen)

| Begriff | Datei | Zeile | Text | Empfehlung |
|---------|-------|-------|------|------------|
| **Psychoedukation** | `modul/1/index.html` | 785 | «…und Psychoedukation — alle drei sind evidenzbasiert.» | Tooltip bei erster Verwendung in M1 fehlt. Erst in M4:300 mit Tooltip. |
| **Psychoedukation** | `modul/5/index.html` | 553 | «Informationen einholen (Psychoedukation)» | Kein Tooltip — OK, da in M4 bereits erklärt |
| **Psychoedukation** | `modul/4/index.html` | 689 | «Psychoedukation» (Stigma-Abschnitt) | Kein Tooltip — OK, auf gleicher Seite weiter oben erklärt |
| **FFT** | `modul/4/index.html` | 760 | «familienorientierter Therapie (FFT)» | Kein Tooltip — OK, Inline-Erklärung vorhanden |
| **FFT** | `modul/2/index.html` | 476 | «FFT (Family-Focused Therapy)» | Kein Tooltip — aber Inline-Erklärung vorhanden |
| **FFT** | `modul/4/index.html` | 884 | «Familienorientierte Therapie (FFT)» | Kein Tooltip — OK, Inline-Erklärung |
| **Heritabilität** | `handouts/ressourcen/index.html` | 278 | «Die Heritabilität der bipolaren Störung…» | Kein Tooltip — FAQ-Kontext erklärt es inline |

### Empfehlungen

| Priorität | Aktion |
|-----------|--------|
| **MITTEL** | `modul/1/index.html:785` — Psychoedukation: Tooltip bei erster Verwendung in Modul 1 ergänzen. Dies ist das erste Modul, das Nutzer lesen, und der Begriff wird ohne Erklärung eingeführt. |
| Niedrig | Weitere Verwendungen ohne Tooltip sind akzeptabel, da der Begriff entweder auf der gleichen Seite oder in früheren Modulen bereits erklärt wurde. |

---

## 6. Wörtliche Wiederholungen (Cross-Modul-Duplikate)

**Ergebnis: EINIGE DUPLIKATE — meist gewollt (Templates), eines inhaltlich zu prüfen.**

### Template-Duplikate (gewollt, alle 13 Dateien)

- Suchfeld-Platzhalter: `«Geben Sie einen Begriff ein — z.B. «Krisenplan», «Trennung» oder «Suizid»»`
- Footer-Text: `für Angehörige und Partner*innen`
- Copyright-Zeile: `© 2026 Psychiatrische Universitätsklinik Zürich`

### Erfahrungsbericht-Disclaimer (4 Module)

| Datei | Zeile | Text |
|-------|-------|------|
| `modul/1/index.html` | 812 | «Anonymisiert · Typische Erfahrung, berichtet der Fachstelle Angehörigenarbeit PUK Zürich» |
| `modul/4/index.html` | 310, 717, 722 | (identisch) |
| `modul/6/index.html` | 692, 697 | (identisch) |
| `modul/7/index.html` | 253 | (identisch) |

**Empfehlung:** Bewusste Konsistenz, kein Problem.

### Varianten desselben Disclaimers (3 Module)

| Datei | Zeile | Text |
|-------|-------|------|
| `modul/3/index.html` | 534 | «Erfahrungsberichte sind anonymisiert und spiegeln typische Verläufe wider, wie sie der Fachstelle Angehörigenarbeit der PUK Zürich berichtet werden.» |
| `modul/5/index.html` | 661 | (identisch) |
| `modul/7/index.html` | 248 | (identisch) |

**Empfehlung:** Konsistenz OK, aber es gibt zwei Disclaimer-Varianten (kurz und lang). Ggf. auf eine vereinheitlichen.

### Inhaltliches Duplikat (prüfenswert)

| Phrase | Dateien |
|--------|---------|
| «Mir fällt auf, dass du seit drei Nächten kaum schläfst.» | `handouts/notfall/index.html:121`, `modul/4/index.html:591`, `modul/6/index.html:783` |

**Empfehlung:** In Ordnung — es ist ein zentrales Lehrbeispiel, das bewusst wiederholt wird (Wiedererkennung). Keine Änderung nötig.

---

## 7. Konsistente Begriffswahl

### 7a. «Erkrankung» vs. «Krankheit» vs. «Störung»

| Begriff | Gesamtvorkommen | Verwendungskontext |
|---------|----------------|--------------------|
| **Störung** | 88× | Hauptsächlich als Eigenname: «Bipolare Störung» (Titel, Meta-Tags, Schema.org, Fliesstext). Auch: «bipolarer Störungen» |
| **Erkrankung** | 59× | Im Fliesstext als allgemeiner Bezug: «die Erkrankung», «eine Erkrankung». Bevorzugte Form im Modultext. |
| **Krankheit** | 28× | Selten, kontextgebunden: «Krankheitseinsicht», «Krankheitsverlauf», «Krankenschwester» (Zitat), «eine Krankheit» (Kinderbeispiel) |

**Muster erkennbar:**
- «Bipolare **Störung**» = diagnostischer Fachbegriff (korrekt, da offizieller Name)
- «die **Erkrankung**» = neutrale Referenz im Fliesstext (bevorzugt)
- «**Krankheit**» = in Komposita (Krankheitseinsicht, -verlauf) oder vereinzelt in Zitaten

**Verteilung pro Datei:**

| Datei | Erkrankung | Krankheit | Störung |
|-------|-----------|-----------|---------|
| `modul/1/index.html` | 17 | 1 | 26 |
| `modul/2/index.html` | 15 | 3 | 7 |
| `modul/3/index.html` | 7 | 0 | 4 |
| `modul/4/index.html` | 3 | 8 | 5 |
| `modul/5/index.html` | 3 | 2 | 3 |
| `modul/6/index.html` | 6 | 11 | 3 |
| `modul/7/index.html` | 5 | 0 | 4 |

**Auffällig:** `modul/6/index.html` verwendet «Krankheit» deutlich häufiger als andere Module (11× vs. Durchschnitt 2×). `modul/4/index.html` ebenfalls überdurchschnittlich (8×).

**Empfehlung:**
| Priorität | Aktion |
|-----------|--------|
| **NIEDRIG** | In `modul/6/index.html` und `modul/4/index.html` prüfen, ob einzelne «Krankheit»-Verwendungen durch «Erkrankung» ersetzt werden können, um Konsistenz zu erhöhen. Komposita wie «Krankheitseinsicht» und «Krankheitsverlauf» beibehalten. |

### 7b. «Partner» vs. «Betroffene/r»

**Ergebnis:** Beide Begriffe werden bewusst unterschiedlich verwendet:
- «Partner» / «Partner*in» = Beziehungskontext (Perspektive der Angehörigen)
- «Betroffene/r» = klinischer/allgemeiner Kontext

Keine Inkonsistenz festgestellt.

### 7c. «Behandlungsteam» vs. «Fachpersonen»

| Begriff | Vorkommen |
|---------|-----------|
| **Behandlungsteam** | 24× (7 Dateien) |
| **Fachpersonen** | 10× (7 Dateien) |

**Muster:** «Behandlungsteam» = konkrete Handlungsanweisung («Sprechen Sie das Behandlungsteam an»). «Fachpersonen» = allgemeiner Kontext (z.B. Trialog). Bewusste Differenzierung, kein Problem.

---

## Zusammenfassung

| Bereich | Status | Handlungsbedarf |
|---------|--------|-----------------|
| 1. Schweizer Rechtschreibung (ß) | BESTANDEN | Keiner |
| 2. Anrede-Konsistenz (Sie/du) | BESTANDEN | Keiner |
| 3. Gender-inklusive Sprache | BESTANDEN | Keiner |
| 4. Tonalität Modul-Einstiege | BESTANDEN | Keiner |
| 5. Fachbegriff-Tooltips | TEILWEISE | Psychoedukation in M1 ohne Tooltip |
| 6. Wörtliche Wiederholungen | BESTANDEN | Zwei Disclaimer-Varianten vereinheitlichen (optional) |
| 7. Begriffskonsistenz | BESTANDEN | «Krankheit» in M4/M6 überdurchschnittlich häufig (optional angleichen) |

### Priorisierte Empfehlungen

1. **MITTEL:** `modul/1/index.html:785` — Tooltip für «Psychoedukation» bei erster Verwendung in Modul 1 ergänzen
2. **NIEDRIG:** Disclaimer-Varianten in Erfahrungsberichten auf ein einheitliches Format bringen
3. **NIEDRIG:** In Modul 4 und 6 prüfen, ob «Krankheit» stellenweise durch «Erkrankung» ersetzt werden kann
