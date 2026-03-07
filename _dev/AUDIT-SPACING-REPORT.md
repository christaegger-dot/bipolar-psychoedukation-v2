================================================================================
  SPACING & VISUAL-BALANCE AUDIT
  Bipolare-Erkrankung — Psychoedukations-Website
================================================================================

## TEIL 1: SVG-interne Abstände
================================================================================


### Datei: index.html (1 SVGs)
------------------------------------------------------------

#### SVG #1: index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

### Datei: modul/1/index.html (8 SVGs)
------------------------------------------------------------

#### SVG #1: modul/1/index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

#### SVG #2: modul/1/index.html:373 — «Wellenförmiger Verlauf der bipolaren Störung über die Zeit, mit Angehörigen-Belastungslinie»
  viewBox: 0 0 600 237, Elemente: 6 text, 3 rect, 0 circle
  🔴 Text "Depres­sion" überlappt mit "Stimmung Partner" (53×10px)
  🔴 Text "Stimmung Partner" überlappt mit "Grundbelastung Angehörige (ste" (13×18px)
  🔴 Text "Grundbelastung Angehörige (ste" überlappt mit "→ Zeit (Jahre)" (141×18px)
  🟡 Text "→ Zeit (Jahre)" nur -11.2px zum viewBox-Rand (rechts)
  🟡 Text "Grundbelastung Angehörige (ste" nur -1.2px zum viewBox-Rand (rechts)
  🟡 Text "Manie" asymmetrisches Padding: links=8px rechts=538px
  🟡 Text "Stabil" asymmetrisches Padding: links=8px rechts=527px
  🟡 Text "Depres­sion" asymmetrisches Padding: links=8px rechts=473px
  🟡 rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  🟡 rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  Vertikaler Rhythmus: Median 62.5px, StdDev 35.3px (56%) — unruhig

#### SVG #3: modul/1/index.html:400 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #4: modul/1/index.html:452 — «Eisberg-Metapher: Sichtbare Belastungen über der Wasserlinie, unsichtbare darunter — das meiste ist unsichtbar»
  viewBox: 0 0 600 337, Elemente: 23 text, 1 rect, 0 circle
  🔴 Text "Wasserlinie" überlappt mit "das Umfeld" (108×9px)
  🔴 Text "Hypervigilanz" überlappt mit "Schlafstörungen" (11×18px)
  🔴 Text "Schuldgefühle" überlappt mit "Einsamkeit" (4×18px)
  🔴 Text "nächsten Rückfall" überlappt mit "«normale» Leben" (13×18px)
  🔴 Text "Trauer um das" überlappt mit "auch für Sie selbst" (30×18px)
  🔴 Text "unsichtbar —" überlappt mit "auch für Sie selbst" (130×5px)
  🟡 Text "auch für Sie selbst" nur -25.2px zum viewBox-Rand (rechts)
  🟡 Text "sichtbar für" nur -9.6px zum viewBox-Rand (rechts)
  🟡 Text "unsichtbar —" nur -9.6px zum viewBox-Rand (rechts)
  🟡 Text "Der Belastungs-Eisberg: Was an" nur -2.4px zum viewBox-Rand (links)
  🟡 Text "Der Belastungs-Eisberg: Was an" nur -2.4px zum viewBox-Rand (rechts)
  🟡 Text "Der Belastungs-Eisberg: Was an" nur -1.5px zum viewBox-Rand (oben)
  🟡 Text "Hypervigilanz" asymmetrisches Padding: links=160px rechts=300px
  🟡 Text "Schlafstörungen" asymmetrisches Padding: links=289px rechts=149px
  🟡 Text "Schuldgefühle" asymmetrisches Padding: links=170px rechts=290px
  🟡 Text "Einsamkeit" asymmetrisches Padding: links=306px rechts=186px
  🟡 Text "Angst vor dem" asymmetrisches Padding: links=150px rechts=310px
  🟡 Text "nächsten Rückfall" asymmetrisches Padding: links=128px rechts=288px
  🟡 Text "Trauer um das" asymmetrisches Padding: links=310px rechts=150px
  🟡 Text "«normale» Leben" asymmetrisches Padding: links=299px rechts=139px
  🟡 Text "~80%" asymmetrisches Padding: links=480px rechts=77px
  🟡 Text "Arzttermine begleiten" und "Wasserlinie" nur 0.6px vertikaler Abstand (< 4px)
  🟡 Text "«Müde aussehen»" und "Arzttermine begleiten" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "sichtbar für" und "das Umfeld" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Arzttermine begleiten" und "Medikamente managen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Angst vor dem" und "nächsten Rückfall" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Angst vor dem" und "«normale» Leben" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Trauer um das" und "nächsten Rückfall" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Trauer um das" und "«normale» Leben" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "auch für Sie selbst" und "nächsten Rückfall" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "auch für Sie selbst" und "«normale» Leben" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Sichtbar" und "«Müde aussehen»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "~80%" und "unsichtbar —" nur 1.6px vertikaler Abstand (< 4px)
  🟡 Text "~20%" und "sichtbar für" nur 1.6px vertikaler Abstand (< 4px)
  🟡 Text "Hypervigilanz" und "Schuldgefühle" nur 2.1px vertikaler Abstand (< 4px)
  🟡 Text "Hypervigilanz" und "Einsamkeit" nur 2.1px vertikaler Abstand (< 4px)
  🟡 Text "Schlafstörungen" und "Schuldgefühle" nur 2.1px vertikaler Abstand (< 4px)
  🟡 Text "Schlafstörungen" und "Einsamkeit" nur 2.1px vertikaler Abstand (< 4px)
  Vertikaler Rhythmus: Median 12.7px, StdDev 10.8px (85%) — unruhig

#### SVG #5: modul/1/index.html:492 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #6: modul/1/index.html:605 — «Kreislauf der Hypervigilanz: Beobachten, Anspannung, Erschöpfung, kurze Erholung — und wieder von vorn»
  viewBox: 0 0 600 303, Elemente: 15 text, 5 rect, 1 circle
  🔴 Text "anspannung" überlappt mit "Körper in Alarmbereitschaft" (40×15px)
  🔴 Text "anspannung" überlappt mit "Kurz — nie vollständig" (13×15px)
  🔴 Text "⚡ Anspannung" überlappt mit "unbewusst" (37×8px)
  🟡 Text "wiederholt sich" nur -21.0px zum viewBox-Rand (rechts)
  🟡 Text "Der Kreislauf" nur -10.2px zum viewBox-Rand (rechts)
  🟡 Text "täglich — oft" nur -10.2px zum viewBox-Rand (rechts)
  🟡 Text "Körper in Alarmbereitschaft" nur -5.8px zum viewBox-Rand (rechts)
  🟡 Text "⚡ Anspannung" asymmetrisches Padding: links=392px rechts=72px
  🟡 Text "🌿 Erholung" asymmetrisches Padding: links=83px rechts=403px
  🟡 Text "Kurz — nie vollständig" asymmetrisches Padding: links=21px rechts=341px
  🟡 Text "unbewusst" asymmetrisches Padding: links=491px rechts=11px
  🟡 Text "Schlaf, Konzentration ↓" nur 0.9px zum rect-Rand (unten)
  🟡 Text "Der Kreislauf" und "wiederholt sich" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "wiederholt sich" und "täglich — oft" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "täglich — oft" und "unbewusst" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Dauer-" und "anspannung" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "😮‍💨 Erschöpfung" und "Schlaf, Konzentration ↓" nur 1.5px vertikaler Abstand (< 4px)
  🟡 Text "Der Hypervigilanz-Kreislauf" nur 1.6px zum rect-Rand (oben)
  🟡 Text "Der Hypervigilanz-Kreislauf" nur 1.6px zum viewBox-Rand (oben)
  🟡 Text "🌿 Erholung" und "Kurz — nie vollständig" nur 1.9px vertikaler Abstand (< 4px)
  🟡 Text "⚡ Anspannung" und "Körper in Alarmbereitschaft" nur 1.9px vertikaler Abstand (< 4px)
  🟡 Text "🔍 Beobachten" und "Stimmung scannen" nur 1.9px vertikaler Abstand (< 4px)
  🟡 Text "Dauer-" und "Kurz — nie vollständig" nur 4.0px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Dauer-" und "Körper in Alarmbereitschaft" nur 4.0px Abstand (< 30% von fontSize 18.0)
  Vertikaler Rhythmus: Median 17.9px, StdDev 18.2px (102%) — unruhig

#### SVG #7: modul/1/index.html:718 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #8: modul/1/index.html:779 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

### Datei: modul/2/index.html (9 SVGs)
------------------------------------------------------------

#### SVG #1: modul/2/index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

#### SVG #2: modul/2/index.html:306 — «Zeitachse: Vier Dimensionen der Beziehung verschieben sich von Partnerschaft zu Betreuung über die Jahre»
  viewBox: 0 0 600 283, Elemente: 17 text, 5 rect, 4 circle
  🔴 Text "Augenhöhe" überlappt mit "Emotionale Nähe" (17×18px)
  🔴 Text "Emotionale Nähe" überlappt mit "Intimität" (62×12px)
  🔴 Text "Intimität" überlappt mit "Gemeinsame Pläne" (17×12px)
  🟡 Text "Augenhöhe" asymmetrisches Padding: links=8px rechts=495px
  🟡 Text "Gefälle" asymmetrisches Padding: links=514px rechts=10px
  🟡 Text "Nähe" asymmetrisches Padding: links=8px rechts=549px
  🟡 Text "Distanz" asymmetrisches Padding: links=514px rechts=10px
  🟡 Text "Intimität" asymmetrisches Padding: links=8px rechts=495px
  🟡 Text "Koexistenz" asymmetrisches Padding: links=482px rechts=10px
  🟡 Text "Pläne" asymmetrisches Padding: links=8px rechts=538px
  🟡 Text "Verwaltung" asymmetrisches Padding: links=482px rechts=10px
  🟡 Text "Augenhöhe" asymmetrisches Padding: links=112px rechts=391px
  🟡 Text "Gemeinsame Pläne" asymmetrisches Padding: links=372px rechts=55px
  🟡 Text "Was sich verschiebt — vier Dim" und "Intimität" nur 2.8px vertikaler Abstand (< 4px)
  🟡 Text "Was sich verschiebt — vier Dim" nur 5.0px zum rect-Rand (oben)
  🟡 Text "Koexistenz" und "Verwaltung" nur 5.2px Abstand (< 30% von fontSize 18.0)
  Vertikaler Rhythmus: Median 23.6px, StdDev 10.5px (45%) — unruhig

#### SVG #3: modul/2/index.html:350 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #4: modul/2/index.html:388 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #5: modul/2/index.html:409 — «Diagramm: Vertrauen, Nähe und Leichtigkeit sinken nach jeder Episode, Episoden sind als vertikale Markierungen dargestellt»
  viewBox: 0 0 600 260, Elemente: 11 text, 5 rect, 0 circle
  🔴 Text "Episode 3" überlappt mit "Episode 4" (7×18px)
  🔴 Text "Vertrauen" überlappt mit "Nähe & Intimität" (7×18px)
  🔴 Text "Nähe & Intimität" überlappt mit "Leichtigkeit & Spontanität" (53×18px)
  🔴 Text "Leichtigkeit & Spontanität" überlappt mit "→ Zeit" (61×18px)
  🟡 Text "Episode 1" und "Vertrauen" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 1" und "Nähe & Intimität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 2" und "Vertrauen" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 2" und "Nähe & Intimität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 2" und "Leichtigkeit & Spontanität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 3" und "Nähe & Intimität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 3" und "Leichtigkeit & Spontanität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 3" und "→ Zeit" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 4" und "Leichtigkeit & Spontanität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  🟡 Text "Episode 4" und "→ Zeit" nur 4.7px Abstand (< 30% von fontSize 18.0)
  Vertikaler Rhythmus: Median 22.7px, StdDev 7.7px (34%) — OK

#### SVG #6: modul/2/index.html:451 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #7: modul/2/index.html:469 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #8: modul/2/index.html:525 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #9: modul/2/index.html:585 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

### Datei: modul/3/index.html (9 SVGs)
------------------------------------------------------------

#### SVG #1: modul/3/index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

#### SVG #2: modul/3/index.html:382 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #3: modul/3/index.html:386 — «Solidaritätserosion: Die Fähigkeit zur Solidarität sinkt mit jeder Krise»
  viewBox: 0 0 600 283, Elemente: 12 text, 4 rect, 0 circle
  🔴 Text "Depression" überlappt mit "1. Krise" (34×8px)
  🔴 Text "1. Krise" überlappt mit "Diagnose" (25×6px)
  🔴 Text "Stimmung des Partners" überlappt mit "Solidarität (erodierend)" (57×18px)
  🟡 Text "Manie" asymmetrisches Padding: links=48px rechts=498px
  🟡 Text "Stabil" asymmetrisches Padding: links=48px rechts=487px
  🟡 Text "Depression" asymmetrisches Padding: links=48px rechts=444px
  🟡 Text "1. Krise" asymmetrisches Padding: links=122px rechts=392px
  🟡 Text "2. Krise" asymmetrisches Padding: links=317px rechts=197px
  🟡 Text "3. Krise" asymmetrisches Padding: links=499px rechts=15px
  🟡 Text "Diagnose" asymmetrisches Padding: links=60px rechts=454px
  🟡 Text "Jahre" asymmetrisches Padding: links=430px rechts=116px
  🟡 Text "→" asymmetrisches Padding: links=550px rechts=39px
  🟡 rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  🟡 rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  🟡 Text "→" nur 0.6px zum rect-Rand (unten)
  🟡 Text "2. Krise" und "→" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "3. Krise" und "→" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Diagnose" und "Stimmung des Partners" nur 1.6px vertikaler Abstand (< 4px)
  🟡 Text "Diagnose" und "Solidarität (erodierend)" nur 1.6px vertikaler Abstand (< 4px)
  🟡 Text "Monate" und "Stimmung des Partners" nur 1.6px vertikaler Abstand (< 4px)
  🟡 Text "Monate" und "Solidarität (erodierend)" nur 1.6px vertikaler Abstand (< 4px)
  🟡 Text "Jahre" und "Solidarität (erodierend)" nur 1.6px vertikaler Abstand (< 4px)
  🟡 Text "Depression" und "Diagnose" nur 3.5px vertikaler Abstand (< 4px)
  🟡 Text "Depression" und "Monate" nur 3.5px vertikaler Abstand (< 4px)
  Vertikaler Rhythmus: Median 12.2px, StdDev 35.7px (292%) — unruhig

#### SVG #4: modul/3/index.html:430 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #5: modul/3/index.html:460 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #6: modul/3/index.html:473 — «Zwei Menschen, zwischen ihnen eine unsichtbare Glaswand»
  viewBox: 0 0 400 228, Elemente: 5 text, 5 rect, 8 circle
  🔴 Text "Ich bin" überlappt mit "allein" (54×4px)
  🟡 Text "Ich bin" asymmetrisches Padding: links=44px rechts=292px
  🟡 Text "allein" asymmetrisches Padding: links=49px rechts=297px
  🟡 circle und circle nur 4.2px horizontaler Abstand
  🟡 circle und circle nur 5.2px horizontaler Abstand

#### SVG #7: modul/3/index.html:556 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #8: modul/3/index.html:615 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #9: modul/3/index.html:676 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

### Datei: modul/4/index.html (13 SVGs)
------------------------------------------------------------

#### SVG #1: modul/4/index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

#### SVG #2: modul/4/index.html:316 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #3: modul/4/index.html:323 — «EE Teufelskreis mit vier Stationen»
  viewBox: 0 0 340 402, Elemente: 15 text, 0 rect, 6 circle
  🔴 Text "Teufels-" überlappt mit "kreis" (57×2px)
  🟡 Text "😤" und "kreis" nur 0.9px vertikaler Abstand (< 4px)
  🟡 Text "🔍" und "kreis" nur 0.9px vertikaler Abstand (< 4px)
  🟡 Text "😮‍💨" und "Erschöp-" nur 1.4px vertikaler Abstand (< 4px)
  🟡 Text "Erschöp-" und "fung" nur 2.4px vertikaler Abstand (< 4px)
  🟡 Text "involvement" nur 3.9px zum viewBox-Rand (rechts)
  🟡 Text "Kritik &" und "anklicken" nur 4.5px Abstand (< 30% von fontSize 15.5)
  🟡 Text "Über-" und "anklicken" nur 4.5px Abstand (< 30% von fontSize 15.5)
  Vertikaler Rhythmus: Median 13.0px, StdDev 5.8px (45%) — unruhig

#### SVG #4: modul/4/index.html:379 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #5: modul/4/index.html:389 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #6: modul/4/index.html:394 — «Vier Barrieren zwischen Ihnen und gesunden Grenzen: Angst, Schuld, gesellschaftlicher Druck, Gewohnheit»
  viewBox: 0 0 600 245, Elemente: 22 text, 7 rect, 0 circle
  🔴 Text "«Ich sollte…»" überlappt mit "«Wenn etwas" (33×17px)
  🔴 Text "Gesunde" überlappt mit "Gewohnheit" (4×19px)
  🔴 Text "«Wenn etwas" überlappt mit "«Er/sie ist" (24×18px)
  🔴 Text "passiert…»" überlappt mit "doch krank…»" (24×18px)
  🔴 Text "«Er/sie ist" überlappt mit "«Man lässt" (18×18px)
  🔴 Text "doch krank…»" überlappt mit "nicht im Stich»" (51×18px)
  🔴 Text "«Man lässt" überlappt mit "«So war es" (13×18px)
  🔴 Text "nicht im Stich»" überlappt mit "schon immer»" (51×18px)
  🟡 Text "→ Der erste Schritt: eine Barr" nur -105.0px zum viewBox-Rand (links)
  🟡 Text "→ Der erste Schritt: eine Barr" nur -105.0px zum viewBox-Rand (rechts)
  🟡 Text "«Ich sollte…»" nur -10.2px zum viewBox-Rand (links)
  🟡 Text "Sie" asymmetrisches Padding: links=42px rechts=522px
  🟡 Text "Gesunde" asymmetrisches Padding: links=498px rechts=18px
  🟡 Text "Grenzen" asymmetrisches Padding: links=502px rechts=22px
  🟡 Text "😰" asymmetrisches Padding: links=148px rechts=434px
  🟡 Text "Angst" asymmetrisches Padding: links=127px rechts=413px
  🟡 Text "«Wenn etwas" asymmetrisches Padding: links=98px rechts=384px
  🟡 Text "passiert…»" asymmetrisches Padding: links=103px rechts=389px
  🟡 Text "doch krank…»" asymmetrisches Padding: links=187px rechts=283px
  🟡 Text "nicht im Stich»" asymmetrisches Padding: links=266px rechts=172px
  🟡 Text "🔄" asymmetrisches Padding: links=433px rechts=149px
  🟡 Text "Gewohnheit" asymmetrisches Padding: links=382px rechts=98px
  🟡 Text "«So war es" asymmetrisches Padding: links=388px rechts=104px
  🟡 Text "schon immer»" asymmetrisches Padding: links=377px rechts=93px
  🟡 Text "«Wenn etwas" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Wenn etwas" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Er/sie ist" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Er/sie ist" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Er/sie ist" und "nicht im Stich»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Man lässt" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Man lässt" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Man lässt" und "nicht im Stich»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Man lässt" und "schon immer»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«So war es" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«So war es" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«So war es" und "nicht im Stich»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«So war es" und "schon immer»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Angst" und "«Ich sollte…»" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Schuld" und "«Ich sollte…»" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Schuld" und "Grenzen" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Druck" und "«Ich sollte…»" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Druck" und "Grenzen" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Gewohnheit" und "Grenzen" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Jede Barriere ist verständlich" nur 2.2px zum rect-Rand (unten)
  🟡 Text "Schuld" und "«Wenn etwas" nur 2.5px vertikaler Abstand (< 4px)
  🟡 Text "Druck" und "«Wenn etwas" nur 2.5px vertikaler Abstand (< 4px)
  🟡 Text "Druck" und "«Er/sie ist" nur 2.5px vertikaler Abstand (< 4px)
  🟡 Text "Gewohnheit" und "«Wenn etwas" nur 2.5px vertikaler Abstand (< 4px)
  🟡 Text "Gewohnheit" und "«Er/sie ist" nur 2.5px vertikaler Abstand (< 4px)
  🟡 Text "Gewohnheit" und "«Man lässt" nur 2.5px vertikaler Abstand (< 4px)
  Vertikaler Rhythmus: Median 20.1px, StdDev 16.8px (84%) — unruhig

#### SVG #7: modul/4/index.html:471 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #8: modul/4/index.html:506 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #9: modul/4/index.html:530 — «Kommunikations-Kompass: Vier Achsen zeigen hilfreiche Richtungen — Beobachtung, Ich-Botschaft, Timing und Kürze»
  viewBox: 0 0 600 269, Elemente: 14 text, 6 rect, 1 circle
  🔴 Text "❌ Bewertung" überlappt mit "«Du bist…» → «Mir fällt auf…»" (14×7px)
  🔴 Text "✓ Beobachtung" überlappt mit "«Du bist…» → «Mir fällt auf…»" (24×7px)
  🔴 Text "❌ Du-Botschaft" überlappt mit "«Du machst…» → «Ich fühle mich" (50×3px)
  🔴 Text "✓ Ich-Botschaft" überlappt mit "«Du machst…» → «Ich fühle mich" (51×3px)
  🔴 Text "✓ Ich-Botschaft" überlappt mit "Zielzone" (17×12px)
  🔴 Text "«Du machst…» → «Ich fühle mich" überlappt mit "Zielzone" (86×9px)
  🟡 Text "Kommunikations-Kompass: 4 Achs" nur -2.8px zum viewBox-Rand (oben)
  🟡 Text "❌ Bewertung" asymmetrisches Padding: links=32px rechts=442px
  🟡 Text "✓ Beobachtung" asymmetrisches Padding: links=433px rechts=19px
  🟡 Text "❌ Du-Botschaft" asymmetrisches Padding: links=17px rechts=423px
  🟡 Text "✓ Ich-Botschaft" asymmetrisches Padding: links=422px rechts=8px
  🟡 Text "❌ In der Krise" asymmetrisches Padding: links=114px rechts=334px
  🟡 Text "❌ Langer Monolog" asymmetrisches Padding: links=324px rechts=104px
  🟡 Text "Zielzone" asymmetrisches Padding: links=352px rechts=162px
  🟡 Text "Was sage" und "ich wie?" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "❌ In der Krise" und "«Du bist…» → «Mir fällt auf…»" nur 3.3px vertikaler Abstand (< 4px)
  🟡 Text "❌ Langer Monolog" und "«Du bist…» → «Mir fällt auf…»" nur 3.3px vertikaler Abstand (< 4px)
  Vertikaler Rhythmus: Median 21.3px, StdDev 13.6px (64%) — unruhig

#### SVG #10: modul/4/index.html:566 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #11: modul/4/index.html:575 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #12: modul/4/index.html:637 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #13: modul/4/index.html:698 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

### Datei: modul/5/index.html (5 SVGs)
------------------------------------------------------------

#### SVG #1: modul/5/index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

#### SVG #2: modul/5/index.html:288 — «Sauerstoffmaske zuerst anlegen»
  viewBox: 0 0 120 90, Elemente: 4 text, 0 rect, 7 circle
  🔴 Text "Sie zuerst" überlappt mit "dann anderen" (7×11px)
  🟡 Text "dann anderen" nur -17.6px zum viewBox-Rand (rechts)
  🟡 Text "Sie zuerst" nur -1.0px zum viewBox-Rand (links)
  🟡 circle und circle nur 2.0px vertikaler Abstand
  🟡 circle und circle nur 2.0px vertikaler Abstand
  🟡 circle und circle nur 2.0px vertikaler Abstand
  🟡 circle und circle nur 2.0px vertikaler Abstand
  🟡 circle und circle nur 6.0px horizontaler Abstand

#### SVG #3: modul/5/index.html:359 — «Krisenplan-Ampel mit drei Stufen: Gelb für Frühwarnzeichen, Orange für akute Krise, Rot für Notfall»
  viewBox: 0 0 600 226, Elemente: 22 text, 4 rect, 3 circle
  🔴 Text "!" überlappt mit "Frühwarnzeichen" (13×15px)
  🔴 Text "Schlaf ↓ · Reizbarkeit ↑" überlappt mit "→" (16×18px)
  🔴 Text "Schlaf ↓ · Reizbarkeit ↑" überlappt mit "Realitätsverlust · Impulsivitä" (107×18px)
  🔴 Text "Geld ausgeben · Schnell reden" überlappt mit "→" (16×8px)
  🔴 Text "Geld ausgeben · Schnell reden" überlappt mit "Medikamente abgesetzt" (80×18px)
  🔴 Text "→ Behandlungsteam informieren" überlappt mit "→ Kontaktperson anrufen" (91×18px)
  🔴 Text "→ Krisenplan hervornehmen" überlappt mit "→ Kinder versorgen lassen" (80×18px)
  🔴 Text "→" überlappt mit "Realitätsverlust · Impulsivitä" (16×18px)
  🔴 Text "→" überlappt mit "Medikamente abgesetzt" (16×8px)
  🔴 Text "!!" überlappt mit "Akute Krise" (26×15px)
  🔴 Text "Realitätsverlust · Impulsivitä" überlappt mit "→" (16×18px)
  🔴 Text "Realitätsverlust · Impulsivitä" überlappt mit "Selbst-/Fremdgefährdung" (102×18px)
  🔴 Text "Medikamente abgesetzt" überlappt mit "→" (16×8px)
  🔴 Text "Medikamente abgesetzt" überlappt mit "Suizidgedanken · Aggression" (69×18px)
  🔴 Text "→ Kontaktperson anrufen" überlappt mit "→ 144 (Sanität)oder 117 (Poliz" (112×18px)
  🔴 Text "→" überlappt mit "Selbst-/Fremdgefährdung" (16×18px)
  🔴 Text "→" überlappt mit "Suizidgedanken · Aggression" (16×8px)
  🔴 Text "!!!" überlappt mit "Notfall" (9×15px)
  🟡 Text "Erstellt in einer stabilen Pha" nur -94.2px zum viewBox-Rand (rechts)
  🟡 Text "Erstellt in einer stabilen Pha" nur -94.2px zum viewBox-Rand (links)
  🟡 Text "→ 144 (Sanität)oder 117 (Poliz" nur -68.2px zum viewBox-Rand (rechts)
  🟡 Text "Geld ausgeben · Schnell reden" nur -46.6px zum viewBox-Rand (links)
  🟡 Text "→ Behandlungsteam informieren" nur -46.6px zum viewBox-Rand (links)
  🟡 Text "→ PUK Notfall: 058 384 21 11" nur -41.2px zum viewBox-Rand (rechts)
  🟡 Text "Suizidgedanken · Aggression" nur -35.8px zum viewBox-Rand (rechts)
  🟡 Text "→ Krisenplan hervornehmen" nur -25.0px zum viewBox-Rand (links)
  🟡 Text "Schlaf ↓ · Reizbarkeit ↑" nur -19.6px zum viewBox-Rand (links)
  🟡 Text "Selbst-/Fremdgefährdung" nur -14.2px zum viewBox-Rand (rechts)
  🟡 Text "Der Krisenplan — 3 Stufen" nur -0.8px zum rect-Rand (oben)
  🟡 Text "Der Krisenplan — 3 Stufen" nur -0.8px zum viewBox-Rand (oben)
  🟡 Text "!" asymmetrisches Padding: links=48px rechts=538px
  🟡 Text "Frühwarnzeichen" asymmetrisches Padding: links=16px rechts=396px
  🟡 Text "→" asymmetrisches Padding: links=205px rechts=379px
  🟡 Text "→" asymmetrisches Padding: links=395px rechts=189px
  🟡 Text "!!!" asymmetrisches Padding: links=415px rechts=145px
  🟡 Text "Notfall" asymmetrisches Padding: links=446px rechts=66px
  🟡 Text "Schlaf ↓ · Reizbarkeit ↑" und "Geld ausgeben · Schnell reden" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Realitätsverlust · Impulsivitä" und "Geld ausgeben · Schnell reden" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Realitätsverlust · Impulsivitä" und "Medikamente abgesetzt" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Selbst-/Fremdgefährdung" und "Medikamente abgesetzt" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Selbst-/Fremdgefährdung" und "Suizidgedanken · Aggression" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Geld ausgeben · Schnell reden" und "→ Behandlungsteam informieren" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Geld ausgeben · Schnell reden" und "→ Kontaktperson anrufen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Medikamente abgesetzt" und "→ Behandlungsteam informieren" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Medikamente abgesetzt" und "→ Kontaktperson anrufen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Medikamente abgesetzt" und "→ 144 (Sanität)oder 117 (Poliz" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Suizidgedanken · Aggression" und "→ Kontaktperson anrufen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Suizidgedanken · Aggression" und "→ 144 (Sanität)oder 117 (Poliz" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "→ Behandlungsteam informieren" und "→ Krisenplan hervornehmen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "→ Behandlungsteam informieren" und "→ Kinder versorgen lassen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "→ Kontaktperson anrufen" und "→ Krisenplan hervornehmen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "→ Kontaktperson anrufen" und "→ Kinder versorgen lassen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "→ 144 (Sanität)oder 117 (Poliz" und "→ Kinder versorgen lassen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Akute Krise" und "Schlaf ↓ · Reizbarkeit ↑" nur 2.2px vertikaler Abstand (< 4px)
  🟡 Text "Notfall" und "Realitätsverlust · Impulsivitä" nur 2.2px vertikaler Abstand (< 4px)
  🟡 Text "→" und "→ Behandlungsteam informieren" nur 2.4px vertikaler Abstand (< 4px)
  🟡 Text "→" und "→ Behandlungsteam informieren" nur 2.4px vertikaler Abstand (< 4px)
  🟡 Text "→" und "→ Kontaktperson anrufen" nur 2.4px vertikaler Abstand (< 4px)
  🟡 Text "!!" und "→" nur 2.7px vertikaler Abstand (< 4px)
  🟡 Text "!!!" und "→" nur 2.7px vertikaler Abstand (< 4px)
  🟡 Text "!!!" und "→" nur 2.7px vertikaler Abstand (< 4px)
  Vertikaler Rhythmus: Median 17.0px, StdDev 11.0px (65%) — unruhig

#### SVG #4: modul/5/index.html:551 — «Spektrum der Grenzsetzung: von zu weich über gesund bis zu hart, mit einer grünen Zielzone in der Mitte»
  viewBox: 0 0 600 205, Elemente: 20 text, 3 rect, 0 circle
  🔴 Text "Klar · Liebevoll · Konsequent" überlappt mit "Alles mitmachen" (18×17px)
  🔴 Text "Klar · Liebevoll · Konsequent" überlappt mit "Ultimaten stellen" (28×17px)
  🔴 Text "«Ich mache alles," überlappt mit "«Ich liebe dich," (48×18px)
  🔴 Text "damit kein Streit" überlappt mit "und ich brauche" (43×18px)
  🔴 Text "entsteht.»" überlappt mit "heute Abend Ruhe.»" (21×18px)
  🔴 Text "und ich brauche" überlappt mit "deine Verantwortung." (9×18px)
  🔴 Text "heute Abend Ruhe.»" überlappt mit "Ich erinnere dich gern.»" (47×18px)
  🔴 Text "«Medikamente sind" überlappt mit "«Wenn du nicht zum" (59×18px)
  🔴 Text "deine Verantwortung." überlappt mit "Arzt gehst, gehe" (64×18px)
  🔴 Text "Ich erinnere dich gern.»" überlappt mit "ich für immer.»" (81×18px)
  🟡 Text "Die meisten Angehörigen pendel" nur -272.4px zum viewBox-Rand (links)
  🟡 Text "Die meisten Angehörigen pendel" nur -272.4px zum viewBox-Rand (rechts)
  🟡 Text "«Wenn du nicht zum" nur -17.2px zum viewBox-Rand (rechts)
  🟡 Text "«Ich mache alles," nur -11.8px zum viewBox-Rand (links)
  🟡 Text "damit kein Streit" nur -11.8px zum viewBox-Rand (links)
  🟡 Text "Ultimaten stellen" nur -11.8px zum viewBox-Rand (rechts)
  🟡 Text "Arzt gehst, gehe" nur -6.4px zum viewBox-Rand (rechts)
  🟡 Text "Grenzsetzungs-Spektrum: Wo ste" nur -2.8px zum viewBox-Rand (oben)
  🟡 Text "Alles mitmachen" nur -1.0px zum rect-Rand (links)
  🟡 Text "ich für immer.»" nur -1.0px zum rect-Rand (rechts)
  🟡 Text "Alles mitmachen" nur -1.0px zum viewBox-Rand (links)
  🟡 Text "ich für immer.»" nur -1.0px zum viewBox-Rand (rechts)
  🟡 Text "Zu weich" asymmetrisches Padding: links=34px rechts=474px
  🟡 Text "Zu hart" asymmetrisches Padding: links=480px rechts=40px
  🟡 Text "entsteht.»" asymmetrisches Padding: links=26px rechts=466px
  🟡 Text "«Ich liebe dich," asymmetrisches Padding: links=124px rechts=304px
  🟡 Text "und ich brauche" asymmetrisches Padding: links=129px rechts=309px
  🟡 Text "heute Abend Ruhe.»" asymmetrisches Padding: links=113px rechts=293px
  🟡 Text "«Medikamente sind" asymmetrisches Padding: links=298px rechts=118px
  🟡 Text "deine Verantwortung." asymmetrisches Padding: links=282px rechts=102px
  🟡 Text "Ich erinnere dich gern.»" asymmetrisches Padding: links=260px rechts=80px
  🟡 Text "«Ich mache alles," und "damit kein Streit" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Ich mache alles," und "und ich brauche" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Ich liebe dich," und "damit kein Streit" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Ich liebe dich," und "und ich brauche" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Ich liebe dich," und "deine Verantwortung." nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Medikamente sind" und "und ich brauche" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Medikamente sind" und "deine Verantwortung." nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Medikamente sind" und "Arzt gehst, gehe" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Wenn du nicht zum" und "deine Verantwortung." nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "«Wenn du nicht zum" und "Arzt gehst, gehe" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "damit kein Streit" und "entsteht.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "damit kein Streit" und "heute Abend Ruhe.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "und ich brauche" und "entsteht.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "und ich brauche" und "heute Abend Ruhe.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "und ich brauche" und "Ich erinnere dich gern.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "deine Verantwortung." und "heute Abend Ruhe.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "deine Verantwortung." und "Ich erinnere dich gern.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "deine Verantwortung." und "ich für immer.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Arzt gehst, gehe" und "Ich erinnere dich gern.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Arzt gehst, gehe" und "ich für immer.»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Gesunde Zone" und "Alles mitmachen" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Gesunde Zone" und "Ultimaten stellen" nur 1.3px vertikaler Abstand (< 4px)
  🟡 Text "Klar · Liebevoll · Konsequent" und "«Ich mache alles," nur 1.9px vertikaler Abstand (< 4px)
  🟡 Text "Klar · Liebevoll · Konsequent" und "«Ich liebe dich," nur 1.9px vertikaler Abstand (< 4px)
  🟡 Text "Klar · Liebevoll · Konsequent" und "«Medikamente sind" nur 1.9px vertikaler Abstand (< 4px)
  🟡 Text "Klar · Liebevoll · Konsequent" und "«Wenn du nicht zum" nur 1.9px vertikaler Abstand (< 4px)
  🟡 Text "Zu weich" und "Alles mitmachen" nur 2.3px vertikaler Abstand (< 4px)
  🟡 Text "Zu hart" und "Ultimaten stellen" nur 2.3px vertikaler Abstand (< 4px)
  🟡 Text "Gesunde Zone" und "Klar · Liebevoll · Konsequent" nur 2.5px vertikaler Abstand (< 4px)
  🟡 Text "Alles mitmachen" und "«Ich mache alles," nur 3.1px vertikaler Abstand (< 4px)
  🟡 Text "Alles mitmachen" und "«Ich liebe dich," nur 3.1px vertikaler Abstand (< 4px)
  🟡 Text "Ultimaten stellen" und "«Medikamente sind" nur 3.1px vertikaler Abstand (< 4px)
  🟡 Text "Ultimaten stellen" und "«Wenn du nicht zum" nur 3.1px vertikaler Abstand (< 4px)
  🟡 Text "Zu weich" und "Klar · Liebevoll · Konsequent" nur 3.5px vertikaler Abstand (< 4px)
  🟡 Text "Zu hart" und "Klar · Liebevoll · Konsequent" nur 3.5px vertikaler Abstand (< 4px)
  Vertikaler Rhythmus: Median 19.9px, StdDev 10.6px (53%) — unruhig

#### SVG #5: modul/5/index.html:925 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

### Datei: modul/6/index.html (13 SVGs)
------------------------------------------------------------

#### SVG #1: modul/6/index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

#### SVG #2: modul/6/index.html:339 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #3: modul/6/index.html:344 — «Architektonische Darstellung: Fünf Säulen tragen das Dach einer stabilen Beziehung, gegründet auf dem Fundament stabiler Phasen»
  viewBox: 0 0 600 317, Elemente: 37 text, 7 rect, 0 circle
  🔴 Text "Wissen" überlappt mit "Erkrankung" (65×2px)
  🔴 Text "Wissen" überlappt mit "Kommunikation" (7×18px)
  🔴 Text "Erkrankung" überlappt mit "Kommunikation" (28×2px)
  🔴 Text "Erkrankung" überlappt mit "Ängste und" (12×18px)
  🔴 Text "als «Dritten" überlappt mit "ehrlich" (7×18px)
  🔴 Text "im Bunde»" überlappt mit "aussprechen" (12×18px)
  🔴 Text "Kommunikation" überlappt mit "Ängste und" (108×2px)
  🔴 Text "Kommunikation" überlappt mit "freie Inseln" (39×18px)
  🔴 Text "Kommunikation" überlappt mit "Bewusste" (17×2px)
  🔴 Text "Ängste und" überlappt mit "freie Inseln" (23×2px)
  🔴 Text "Krankheits-" überlappt mit "Gemeinsamer" (23×18px)
  🔴 Text "freie Inseln" überlappt mit "Bewusste" (86×2px)
  🔴 Text "freie Inseln" überlappt mit "Krisenplan" (23×18px)
  🔴 Text "freie Inseln" überlappt mit "Schriftliche" (34×2px)
  🔴 Text "Bewusste" überlappt mit "Schriftliche" (12×18px)
  🔴 Text "Zeiten ohne" überlappt mit "Vereinbarung:" (34×18px)
  🔴 Text "Gemeinsamer" überlappt mit "Netzwerk" (7×18px)
  🔴 Text "Krisenplan" überlappt mit "Schriftliche" (108×2px)
  🔴 Text "Schriftliche" überlappt mit "aufbauen" (12×2px)
  🔴 Text "Schriftliche" überlappt mit "Last auf" (12×18px)
  🔴 Text "Vereinbarung:" überlappt mit "mehrere" (12×18px)
  🔴 Text "aufbauen" überlappt mit "Last auf" (86×2px)
  🟡 Text "Erkrankung" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Ängste und" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Ängste und" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Bewusste" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Bewusste" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Bewusste" und "Zeiten ohne" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schriftliche" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schriftliche" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schriftliche" und "Zeiten ohne" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schriftliche" und "Vereinbarung:" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Last auf" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Last auf" und "Zeiten ohne" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Last auf" und "Vereinbarung:" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Last auf" und "mehrere" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "verstehen" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Grenzen" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Grenzen" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Zeiten ohne" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Zeiten ohne" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Zeiten ohne" und "Therapie-" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Vereinbarung:" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Vereinbarung:" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Vereinbarung:" und "Therapie-" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Vereinbarung:" und "Wer macht" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "mehrere" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "mehrere" und "Therapie-" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "mehrere" und "Wer macht" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "mehrere" und "Schultern" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "als «Dritten" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "ehrlich" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "ehrlich" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Therapie-" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Therapie-" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Therapie-" und "Themen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Wer macht" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Wer macht" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Wer macht" und "Themen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Wer macht" und "was, wann" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schultern" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schultern" und "Themen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schultern" und "was, wann" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Schultern" und "verteilen" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Wissen" nur 1.6px zum rect-Rand (rechts)
  🟡 Text "Offene" nur 1.6px zum rect-Rand (links)
  🟡 Text "Themen" nur 1.6px zum rect-Rand (links)
  🟡 Text "Wissen" nur 1.6px zum rect-Rand (links)
  🟡 Text "Offene" nur 1.6px zum rect-Rand (rechts)
  🟡 Text "Themen" nur 1.6px zum rect-Rand (rechts)
  🟡 Text "Gemeinsames" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Offene" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Offene" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Krankheits-" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Krankheits-" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Krankheits-" und "freie Inseln" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Gemeinsamer" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Gemeinsamer" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Gemeinsamer" und "freie Inseln" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Gemeinsamer" und "Krisenplan" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Netzwerk" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Netzwerk" und "freie Inseln" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Netzwerk" und "Krisenplan" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Netzwerk" und "aufbauen" nur 1.8px vertikaler Abstand (< 4px)
  🟡 Text "Fundament: Stabile Phasen nutz" nur 2.3px zum rect-Rand (unten)
  🟡 rect und rect nur 2.4px vertikaler Abstand
  🟡 rect und rect nur 2.4px vertikaler Abstand
  🟡 rect und rect nur 2.4px vertikaler Abstand
  🟡 rect und rect nur 2.4px vertikaler Abstand
  🟡 rect und rect nur 2.4px vertikaler Abstand
  🟡 Text "Themen" nur 5.6px zum rect-Rand (unten)
  Vertikaler Rhythmus: Median 19.8px, StdDev 12.1px (61%) — unruhig

#### SVG #4: modul/6/index.html:436 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #5: modul/6/index.html:463 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #6: modul/6/index.html:489 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #7: modul/6/index.html:499 — «Diagramm: Zwei Linien zeigen den Unterschied zwischen erwartetem linearem und tatsächlichem wellenförmigem Fortschritt über die Zeit»
  viewBox: 0 0 600 299, Elemente: 15 text, 1 rect, 4 circle
  🔴 Text "Monate" überlappt mit "Erwartung (linear)" (50×8px)
  🔴 Text "1–2 Jahre" überlappt mit "Erwartung (linear)" (25×8px)
  🔴 Text "1–2 Jahre" überlappt mit "Tatsächlicher Verlauf (wellenf" (97×8px)
  🔴 Text "3–5 Jahre" überlappt mit "Tatsächlicher Verlauf (wellenf" (97×8px)
  🔴 Text "3–5 Jahre" überlappt mit "Rückschläge (normal)" (97×8px)
  🔴 Text "Erwartung (linear)" überlappt mit "Tatsächlicher Verlauf (wellenf" (54×18px)
  🔴 Text "Tatsächlicher Verlauf (wellenf" überlappt mit "Rückschläge (normal)" (201×18px)
  🟡 Text "Rückschläge (normal)" nur -26.0px zum viewBox-Rand (rechts)
  🟡 Text "Tatsächlicher Verlauf (wellenf" nur -10.8px zum viewBox-Rand (rechts)
  🟡 Text "Erwartung vs. Realität: Wie Fo" nur -7.8px zum viewBox-Rand (links)
  🟡 Text "Erwartung vs. Realität: Wie Fo" nur -7.8px zum viewBox-Rand (rechts)
  🟡 Text "Besser" asymmetrisches Padding: links=5px rechts=530px
  🟡 Text "Belastet" asymmetrisches Padding: links=5px rechts=509px
  🟡 Text "«So sollte es laufen»" asymmetrisches Padding: links=363px rechts=10px
  🟡 Text "Rückschlag" asymmetrisches Padding: links=101px rechts=391px
  🟡 Text "Krise" asymmetrisches Padding: links=448px rechts=98px
  🟡 Text "Richtung" asymmetrisches Padding: links=504px rechts=10px
  🟡 Text "stimmt" asymmetrisches Padding: links=525px rechts=10px
  🟡 Text "Erwartung (linear)" asymmetrisches Padding: links=82px rechts=324px
  🟡 Text "Richtung" und "stimmt" nur 1.0px vertikaler Abstand (< 4px)
  🟡 Text "Erwartung (linear)" nur 1.9px zum rect-Rand (unten)
  🟡 Text "Belastet" und "Erwartung (linear)" nur 3.0px vertikaler Abstand (< 4px)
  🟡 Text "Belastet" und "Tatsächlicher Verlauf (wellenf" nur 3.0px vertikaler Abstand (< 4px)
  🟡 Text "Krise" und "Richtung" nur 3.2px vertikaler Abstand (< 4px)
  🟡 Text "Besser" nur 5.0px zum rect-Rand (links)
  🟡 Text "Belastet" nur 5.0px zum rect-Rand (links)
  Vertikaler Rhythmus: Median 21.0px, StdDev 16.1px (77%) — unruhig

#### SVG #8: modul/6/index.html:547 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #9: modul/6/index.html:639 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #10: modul/6/index.html:686 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #11: modul/6/index.html:697 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #12: modul/6/index.html:712 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #13: modul/6/index.html:800 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

### Datei: modul/7/index.html (5 SVGs)
------------------------------------------------------------

#### SVG #1: modul/7/index.html:18 — «(kein Label)»
  viewBox: 0 0 100 100, Elemente: 1 text, 0 rect, 0 circle
  🟡 Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  🟡 Text "🤝" nur 0.0px zum viewBox-Rand (links)

#### SVG #2: modul/7/index.html:331 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #3: modul/7/index.html:383 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #4: modul/7/index.html:395 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden

#### SVG #5: modul/7/index.html:436 — «(kein Label)»
  viewBox: 0 0 200 8, Elemente: 0 text, 0 rect, 0 circle
  ✅ Keine Engstellen oder Überlappungen gefunden


## TEIL 2: CSS-Abstände
================================================================================

### 2.1 SVG-Container-Margins
  Keine dedizierten SVG-Wrapper-Klassen mit margin gefunden

### 2.2 Sektions-Abstände
  Keine .section/.sc-wrap rules mit margin gefunden

### 2.3 Card-Grid-Abstände
  .handout-grid → gap: 0.6rem (Zeile 3899)
  .card-grid → gap: 1rem (Zeile 5234)
  .card-grid → margin: 1.5rem 0 (Zeile 5234)

### 2.4 Accordion-Padding
  Keine acc-content rules gefunden

### CSS-Befunde:
  🟡 .handout-grid → gap: 0.6rem (10px < 16px)


## TEIL 3: Vertikaler Rhythmus — Konsistenz
================================================================================

### 3.1 Pro SVG:
  modul/1/index.html:373 «Wellenförmiger Verlauf der bipolaren Stö» — Median 62.5px, StdDev 35.3px (56%) — unruhig ⚠️
  modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Belastungen » — Median 12.7px, StdDev 10.8px (85%) — unruhig ⚠️
  modul/1/index.html:605 «Kreislauf der Hypervigilanz: Beobachten,» — Median 17.9px, StdDev 18.2px (102%) — unruhig ⚠️
  modul/2/index.html:306 «Zeitachse: Vier Dimensionen der Beziehun» — Median 23.6px, StdDev 10.5px (45%) — unruhig ⚠️
  modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und Leichtigke» — Median 22.7px, StdDev 7.7px (34%) — OK
  modul/3/index.html:386 «Solidaritätserosion: Die Fähigkeit zur S» — Median 12.2px, StdDev 35.7px (292%) — unruhig ⚠️
  modul/4/index.html:323 «EE Teufelskreis mit vier Stationen» — Median 13.0px, StdDev 5.8px (45%) — unruhig ⚠️
  modul/4/index.html:394 «Vier Barrieren zwischen Ihnen und gesund» — Median 20.1px, StdDev 16.8px (84%) — unruhig ⚠️
  modul/4/index.html:530 «Kommunikations-Kompass: Vier Achsen zeig» — Median 21.3px, StdDev 13.6px (64%) — unruhig ⚠️
  modul/5/index.html:359 «Krisenplan-Ampel mit drei Stufen: Gelb f» — Median 17.0px, StdDev 11.0px (65%) — unruhig ⚠️
  modul/5/index.html:551 «Spektrum der Grenzsetzung: von zu weich » — Median 19.9px, StdDev 10.6px (53%) — unruhig ⚠️
  modul/6/index.html:344 «Architektonische Darstellung: Fünf Säule» — Median 19.8px, StdDev 12.1px (61%) — unruhig ⚠️
  modul/6/index.html:499 «Diagramm: Zwei Linien zeigen den Untersc» — Median 21.0px, StdDev 16.1px (77%) — unruhig ⚠️

### 3.2 Konsistenz zwischen SVGs:
  ⚠️ modul/1/index.html:373 «Wellenförmiger Verlauf der bipolaren Stö» Median 62.5px weicht 186% vom Durchschnitt (21.8px) ab
  Durchschnittlicher Median: 21.8px


## ZUSAMMENFASSUNG
================================================================================

| SVG                                 | Datei                     | Überlapp.  | Engstellen  | Rhythmus   |
|-------------------------------------|---------------------------|------------|-------------|------------|
| (kein Label)                        | index.html:18             | 0          | 2           | zu wenig Daten |
| (kein Label)                        | modul/1/index.html:18     | 0          | 2           | zu wenig Daten |
| Wellenförmiger Verlauf der bipola   | modul/1/index.html:373    | 3 🔴        | 7           | unruhig    |
| (kein Label)                        | modul/1/index.html:400    | 0          | 0           | zu wenig Daten |
| Eisberg-Metapher: Sichtbare Belas   | modul/1/index.html:452    | 6 🔴        | 32          | unruhig    |
| (kein Label)                        | modul/1/index.html:492    | 0          | 0           | zu wenig Daten |
| Kreislauf der Hypervigilanz: Beob   | modul/1/index.html:605    | 3 🔴        | 21          | unruhig    |
| (kein Label)                        | modul/1/index.html:718    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/1/index.html:779    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/2/index.html:18     | 0          | 2           | zu wenig Daten |
| Zeitachse: Vier Dimensionen der B   | modul/2/index.html:306    | 3 🔴        | 13          | unruhig    |
| (kein Label)                        | modul/2/index.html:350    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/2/index.html:388    | 0          | 0           | zu wenig Daten |
| Diagramm: Vertrauen, Nähe und Lei   | modul/2/index.html:409    | 4 🔴        | 10          | OK         |
| (kein Label)                        | modul/2/index.html:451    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/2/index.html:469    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/2/index.html:525    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/2/index.html:585    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/3/index.html:18     | 0          | 2           | zu wenig Daten |
| (kein Label)                        | modul/3/index.html:382    | 0          | 0           | zu wenig Daten |
| Solidaritätserosion: Die Fähigkei   | modul/3/index.html:386    | 3 🔴        | 21          | unruhig    |
| (kein Label)                        | modul/3/index.html:430    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/3/index.html:460    | 0          | 0           | zu wenig Daten |
| Zwei Menschen, zwischen ihnen ein   | modul/3/index.html:473    | 1 🔴        | 4           | zu wenig Daten |
| (kein Label)                        | modul/3/index.html:556    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/3/index.html:615    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/3/index.html:676    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/4/index.html:18     | 0          | 2           | zu wenig Daten |
| (kein Label)                        | modul/4/index.html:316    | 0          | 0           | zu wenig Daten |
| EE Teufelskreis mit vier Statione   | modul/4/index.html:323    | 1 🔴        | 7           | unruhig    |
| (kein Label)                        | modul/4/index.html:379    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/4/index.html:389    | 0          | 0           | zu wenig Daten |
| Vier Barrieren zwischen Ihnen und   | modul/4/index.html:394    | 8 🔴        | 42          | unruhig    |
| (kein Label)                        | modul/4/index.html:471    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/4/index.html:506    | 0          | 0           | zu wenig Daten |
| Kommunikations-Kompass: Vier Achs   | modul/4/index.html:530    | 6 🔴        | 11          | unruhig    |
| (kein Label)                        | modul/4/index.html:566    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/4/index.html:575    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/4/index.html:637    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/4/index.html:698    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/5/index.html:18     | 0          | 2           | zu wenig Daten |
| Sauerstoffmaske zuerst anlegen      | modul/5/index.html:288    | 1 🔴        | 7           | zu wenig Daten |
| Krisenplan-Ampel mit drei Stufen:   | modul/5/index.html:359    | 18 🔴       | 43          | unruhig    |
| Spektrum der Grenzsetzung: von zu   | modul/5/index.html:551    | 10 🔴       | 56          | unruhig    |
| (kein Label)                        | modul/5/index.html:925    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:18     | 0          | 2           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:339    | 0          | 0           | zu wenig Daten |
| Architektonische Darstellung: Fün   | modul/6/index.html:344    | 22 🔴       | 69          | unruhig    |
| (kein Label)                        | modul/6/index.html:436    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:463    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:489    | 0          | 0           | zu wenig Daten |
| Diagramm: Zwei Linien zeigen den    | modul/6/index.html:499    | 7 🔴        | 19          | unruhig    |
| (kein Label)                        | modul/6/index.html:547    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:639    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:686    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:697    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:712    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/6/index.html:800    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/7/index.html:18     | 0          | 2           | zu wenig Daten |
| (kein Label)                        | modul/7/index.html:331    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/7/index.html:383    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/7/index.html:395    | 0          | 0           | zu wenig Daten |
| (kein Label)                        | modul/7/index.html:436    | 0          | 0           | zu wenig Daten |

**Gesamt:** 96 Überlappungen (🔴), 378 Engstellen (🟡), 12 unruhige Rhythmen


## PRIORISIERTE FIX-LISTE
================================================================================

### Priorität 1: Überlappungen (96 Befunde)
  1. 🔴 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "Depres­sion" überlappt mit "Stimmung Partner" (53×10px)
  2. 🔴 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "Stimmung Partner" überlappt mit "Grundbelastung Angehörige (ste" (13×18px)
  3. 🔴 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "Grundbelastung Angehörige (ste" überlappt mit "→ Zeit (Jahre)" (141×18px)
  4. 🔴 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Wasserlinie" überlappt mit "das Umfeld" (108×9px)
  5. 🔴 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Hypervigilanz" überlappt mit "Schlafstörungen" (11×18px)
  6. 🔴 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Schuldgefühle" überlappt mit "Einsamkeit" (4×18px)
  7. 🔴 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "nächsten Rückfall" überlappt mit "«normale» Leben" (13×18px)
  8. 🔴 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Trauer um das" überlappt mit "auch für Sie selbst" (30×18px)
  9. 🔴 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "unsichtbar —" überlappt mit "auch für Sie selbst" (130×5px)
  10. 🔴 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "anspannung" überlappt mit "Körper in Alarmbereitschaft" (40×15px)
  11. 🔴 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "anspannung" überlappt mit "Kurz — nie vollständig" (13×15px)
  12. 🔴 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "⚡ Anspannung" überlappt mit "unbewusst" (37×8px)
  13. 🔴 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Augenhöhe" überlappt mit "Emotionale Nähe" (17×18px)
  14. 🔴 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Emotionale Nähe" überlappt mit "Intimität" (62×12px)
  15. 🔴 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Intimität" überlappt mit "Gemeinsame Pläne" (17×12px)
  16. 🔴 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 3" überlappt mit "Episode 4" (7×18px)
  17. 🔴 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Vertrauen" überlappt mit "Nähe & Intimität" (7×18px)
  18. 🔴 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Nähe & Intimität" überlappt mit "Leichtigkeit & Spontanität" (53×18px)
  19. 🔴 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Leichtigkeit & Spontanität" überlappt mit "→ Zeit" (61×18px)
  20. 🔴 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Depression" überlappt mit "1. Krise" (34×8px)
  21. 🔴 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "1. Krise" überlappt mit "Diagnose" (25×6px)
  22. 🔴 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Stimmung des Partners" überlappt mit "Solidarität (erodierend)" (57×18px)
  23. 🔴 modul/3/index.html:473 «Zwei Menschen, zwischen ihnen » — Text "Ich bin" überlappt mit "allein" (54×4px)
  24. 🔴 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "Teufels-" überlappt mit "kreis" (57×2px)
  25. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Ich sollte…»" überlappt mit "«Wenn etwas" (33×17px)
  26. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Gesunde" überlappt mit "Gewohnheit" (4×19px)
  27. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Wenn etwas" überlappt mit "«Er/sie ist" (24×18px)
  28. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "passiert…»" überlappt mit "doch krank…»" (24×18px)
  29. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Er/sie ist" überlappt mit "«Man lässt" (18×18px)
  30. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "doch krank…»" überlappt mit "nicht im Stich»" (51×18px)
  31. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Man lässt" überlappt mit "«So war es" (13×18px)
  32. 🔴 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "nicht im Stich»" überlappt mit "schon immer»" (51×18px)
  33. 🔴 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ Bewertung" überlappt mit "«Du bist…» → «Mir fällt auf…»" (14×7px)
  34. 🔴 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "✓ Beobachtung" überlappt mit "«Du bist…» → «Mir fällt auf…»" (24×7px)
  35. 🔴 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ Du-Botschaft" überlappt mit "«Du machst…» → «Ich fühle mich" (50×3px)
  36. 🔴 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "✓ Ich-Botschaft" überlappt mit "«Du machst…» → «Ich fühle mich" (51×3px)
  37. 🔴 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "✓ Ich-Botschaft" überlappt mit "Zielzone" (17×12px)
  38. 🔴 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "«Du machst…» → «Ich fühle mich" überlappt mit "Zielzone" (86×9px)
  39. 🔴 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — Text "Sie zuerst" überlappt mit "dann anderen" (7×11px)
  40. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!" überlappt mit "Frühwarnzeichen" (13×15px)
  41. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Schlaf ↓ · Reizbarkeit ↑" überlappt mit "→" (16×18px)
  42. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Schlaf ↓ · Reizbarkeit ↑" überlappt mit "Realitätsverlust · Impulsivitä" (107×18px)
  43. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Geld ausgeben · Schnell reden" überlappt mit "→" (16×8px)
  44. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Geld ausgeben · Schnell reden" überlappt mit "Medikamente abgesetzt" (80×18px)
  45. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Behandlungsteam informieren" überlappt mit "→ Kontaktperson anrufen" (91×18px)
  46. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Krisenplan hervornehmen" überlappt mit "→ Kinder versorgen lassen" (80×18px)
  47. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" überlappt mit "Realitätsverlust · Impulsivitä" (16×18px)
  48. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" überlappt mit "Medikamente abgesetzt" (16×8px)
  49. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!!" überlappt mit "Akute Krise" (26×15px)
  50. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Realitätsverlust · Impulsivitä" überlappt mit "→" (16×18px)
  51. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Realitätsverlust · Impulsivitä" überlappt mit "Selbst-/Fremdgefährdung" (102×18px)
  52. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Medikamente abgesetzt" überlappt mit "→" (16×8px)
  53. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Medikamente abgesetzt" überlappt mit "Suizidgedanken · Aggression" (69×18px)
  54. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Kontaktperson anrufen" überlappt mit "→ 144 (Sanität)oder 117 (Poliz" (112×18px)
  55. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" überlappt mit "Selbst-/Fremdgefährdung" (16×18px)
  56. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" überlappt mit "Suizidgedanken · Aggression" (16×8px)
  57. 🔴 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!!!" überlappt mit "Notfall" (9×15px)
  58. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Klar · Liebevoll · Konsequent" überlappt mit "Alles mitmachen" (18×17px)
  59. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Klar · Liebevoll · Konsequent" überlappt mit "Ultimaten stellen" (28×17px)
  60. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich mache alles," überlappt mit "«Ich liebe dich," (48×18px)
  61. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "damit kein Streit" überlappt mit "und ich brauche" (43×18px)
  62. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "entsteht.»" überlappt mit "heute Abend Ruhe.»" (21×18px)
  63. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "und ich brauche" überlappt mit "deine Verantwortung." (9×18px)
  64. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "heute Abend Ruhe.»" überlappt mit "Ich erinnere dich gern.»" (47×18px)
  65. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Medikamente sind" überlappt mit "«Wenn du nicht zum" (59×18px)
  66. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "deine Verantwortung." überlappt mit "Arzt gehst, gehe" (64×18px)
  67. 🔴 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Ich erinnere dich gern.»" überlappt mit "ich für immer.»" (81×18px)
  68. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wissen" überlappt mit "Erkrankung" (65×2px)
  69. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wissen" überlappt mit "Kommunikation" (7×18px)
  70. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Erkrankung" überlappt mit "Kommunikation" (28×2px)
  71. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Erkrankung" überlappt mit "Ängste und" (12×18px)
  72. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "als «Dritten" überlappt mit "ehrlich" (7×18px)
  73. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "im Bunde»" überlappt mit "aussprechen" (12×18px)
  74. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Kommunikation" überlappt mit "Ängste und" (108×2px)
  75. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Kommunikation" überlappt mit "freie Inseln" (39×18px)
  76. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Kommunikation" überlappt mit "Bewusste" (17×2px)
  77. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Ängste und" überlappt mit "freie Inseln" (23×2px)
  78. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Krankheits-" überlappt mit "Gemeinsamer" (23×18px)
  79. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "freie Inseln" überlappt mit "Bewusste" (86×2px)
  80. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "freie Inseln" überlappt mit "Krisenplan" (23×18px)
  81. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "freie Inseln" überlappt mit "Schriftliche" (34×2px)
  82. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Bewusste" überlappt mit "Schriftliche" (12×18px)
  83. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Zeiten ohne" überlappt mit "Vereinbarung:" (34×18px)
  84. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Gemeinsamer" überlappt mit "Netzwerk" (7×18px)
  85. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Krisenplan" überlappt mit "Schriftliche" (108×2px)
  86. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schriftliche" überlappt mit "aufbauen" (12×2px)
  87. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schriftliche" überlappt mit "Last auf" (12×18px)
  88. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Vereinbarung:" überlappt mit "mehrere" (12×18px)
  89. 🔴 modul/6/index.html:344 «Architektonische Darstellung: » — Text "aufbauen" überlappt mit "Last auf" (86×2px)
  90. 🔴 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Monate" überlappt mit "Erwartung (linear)" (50×8px)
  91. 🔴 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "1–2 Jahre" überlappt mit "Erwartung (linear)" (25×8px)
  92. 🔴 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "1–2 Jahre" überlappt mit "Tatsächlicher Verlauf (wellenf" (97×8px)
  93. 🔴 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "3–5 Jahre" überlappt mit "Tatsächlicher Verlauf (wellenf" (97×8px)
  94. 🔴 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "3–5 Jahre" überlappt mit "Rückschläge (normal)" (97×8px)
  95. 🔴 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Erwartung (linear)" überlappt mit "Tatsächlicher Verlauf (wellenf" (54×18px)
  96. 🔴 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Tatsächlicher Verlauf (wellenf" überlappt mit "Rückschläge (normal)" (201×18px)

### Priorität 2: Kritische Engstellen < 4px (302 Befunde)
  1. 🟡 index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)
  2. 🟡 modul/1/index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)
  3. 🟡 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "Manie" asymmetrisches Padding: links=8px rechts=538px
  4. 🟡 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "Stabil" asymmetrisches Padding: links=8px rechts=527px
  5. 🟡 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "Depres­sion" asymmetrisches Padding: links=8px rechts=473px
  6. 🟡 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  7. 🟡 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  8. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Hypervigilanz" asymmetrisches Padding: links=160px rechts=300px
  9. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Schlafstörungen" asymmetrisches Padding: links=289px rechts=149px
  10. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Schuldgefühle" asymmetrisches Padding: links=170px rechts=290px
  11. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Einsamkeit" asymmetrisches Padding: links=306px rechts=186px
  12. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Angst vor dem" asymmetrisches Padding: links=150px rechts=310px
  13. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "nächsten Rückfall" asymmetrisches Padding: links=128px rechts=288px
  14. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Trauer um das" asymmetrisches Padding: links=310px rechts=150px
  15. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "«normale» Leben" asymmetrisches Padding: links=299px rechts=139px
  16. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "~80%" asymmetrisches Padding: links=480px rechts=77px
  17. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Arzttermine begleiten" und "Wasserlinie" nur 0.6px vertikaler Abstand (< 4px)
  18. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "«Müde aussehen»" und "Arzttermine begleiten" nur 1.0px vertikaler Abstand (< 4px)
  19. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "sichtbar für" und "das Umfeld" nur 1.0px vertikaler Abstand (< 4px)
  20. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Arzttermine begleiten" und "Medikamente managen" nur 1.0px vertikaler Abstand (< 4px)
  21. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Angst vor dem" und "nächsten Rückfall" nur 1.0px vertikaler Abstand (< 4px)
  22. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Angst vor dem" und "«normale» Leben" nur 1.0px vertikaler Abstand (< 4px)
  23. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Trauer um das" und "nächsten Rückfall" nur 1.0px vertikaler Abstand (< 4px)
  24. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Trauer um das" und "«normale» Leben" nur 1.0px vertikaler Abstand (< 4px)
  25. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "auch für Sie selbst" und "nächsten Rückfall" nur 1.0px vertikaler Abstand (< 4px)
  26. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "auch für Sie selbst" und "«normale» Leben" nur 1.0px vertikaler Abstand (< 4px)
  27. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Sichtbar" und "«Müde aussehen»" nur 1.0px vertikaler Abstand (< 4px)
  28. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "~80%" und "unsichtbar —" nur 1.6px vertikaler Abstand (< 4px)
  29. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "~20%" und "sichtbar für" nur 1.6px vertikaler Abstand (< 4px)
  30. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Hypervigilanz" und "Schuldgefühle" nur 2.1px vertikaler Abstand (< 4px)
  31. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Hypervigilanz" und "Einsamkeit" nur 2.1px vertikaler Abstand (< 4px)
  32. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Schlafstörungen" und "Schuldgefühle" nur 2.1px vertikaler Abstand (< 4px)
  33. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Schlafstörungen" und "Einsamkeit" nur 2.1px vertikaler Abstand (< 4px)
  34. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "⚡ Anspannung" asymmetrisches Padding: links=392px rechts=72px
  35. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "🌿 Erholung" asymmetrisches Padding: links=83px rechts=403px
  36. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Kurz — nie vollständig" asymmetrisches Padding: links=21px rechts=341px
  37. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "unbewusst" asymmetrisches Padding: links=491px rechts=11px
  38. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Schlaf, Konzentration ↓" nur 0.9px zum rect-Rand (unten)
  39. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Der Kreislauf" und "wiederholt sich" nur 1.0px vertikaler Abstand (< 4px)
  40. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "wiederholt sich" und "täglich — oft" nur 1.0px vertikaler Abstand (< 4px)
  41. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "täglich — oft" und "unbewusst" nur 1.0px vertikaler Abstand (< 4px)
  42. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Dauer-" und "anspannung" nur 1.0px vertikaler Abstand (< 4px)
  43. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "😮‍💨 Erschöpfung" und "Schlaf, Konzentration ↓" nur 1.5px vertikaler Abstand (< 4px)
  44. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Der Hypervigilanz-Kreislauf" nur 1.6px zum rect-Rand (oben)
  45. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Der Hypervigilanz-Kreislauf" nur 1.6px zum viewBox-Rand (oben)
  46. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "🌿 Erholung" und "Kurz — nie vollständig" nur 1.9px vertikaler Abstand (< 4px)
  47. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "⚡ Anspannung" und "Körper in Alarmbereitschaft" nur 1.9px vertikaler Abstand (< 4px)
  48. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "🔍 Beobachten" und "Stimmung scannen" nur 1.9px vertikaler Abstand (< 4px)
  49. 🟡 modul/2/index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)
  50. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Augenhöhe" asymmetrisches Padding: links=8px rechts=495px
  51. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Gefälle" asymmetrisches Padding: links=514px rechts=10px
  52. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Nähe" asymmetrisches Padding: links=8px rechts=549px
  53. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Distanz" asymmetrisches Padding: links=514px rechts=10px
  54. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Intimität" asymmetrisches Padding: links=8px rechts=495px
  55. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Koexistenz" asymmetrisches Padding: links=482px rechts=10px
  56. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Pläne" asymmetrisches Padding: links=8px rechts=538px
  57. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Verwaltung" asymmetrisches Padding: links=482px rechts=10px
  58. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Augenhöhe" asymmetrisches Padding: links=112px rechts=391px
  59. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Gemeinsame Pläne" asymmetrisches Padding: links=372px rechts=55px
  60. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Was sich verschiebt — vier Dim" und "Intimität" nur 2.8px vertikaler Abstand (< 4px)
  61. 🟡 modul/3/index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)
  62. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Manie" asymmetrisches Padding: links=48px rechts=498px
  63. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Stabil" asymmetrisches Padding: links=48px rechts=487px
  64. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Depression" asymmetrisches Padding: links=48px rechts=444px
  65. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "1. Krise" asymmetrisches Padding: links=122px rechts=392px
  66. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "2. Krise" asymmetrisches Padding: links=317px rechts=197px
  67. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "3. Krise" asymmetrisches Padding: links=499px rechts=15px
  68. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Diagnose" asymmetrisches Padding: links=60px rechts=454px
  69. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Jahre" asymmetrisches Padding: links=430px rechts=116px
  70. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "→" asymmetrisches Padding: links=550px rechts=39px
  71. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  72. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — rect und rect nur 0.0px vertikaler Abstand (berühren sich!)
  73. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "→" nur 0.6px zum rect-Rand (unten)
  74. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "2. Krise" und "→" nur 1.0px vertikaler Abstand (< 4px)
  75. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "3. Krise" und "→" nur 1.0px vertikaler Abstand (< 4px)
  76. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Diagnose" und "Stimmung des Partners" nur 1.6px vertikaler Abstand (< 4px)
  77. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Diagnose" und "Solidarität (erodierend)" nur 1.6px vertikaler Abstand (< 4px)
  78. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Monate" und "Stimmung des Partners" nur 1.6px vertikaler Abstand (< 4px)
  79. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Monate" und "Solidarität (erodierend)" nur 1.6px vertikaler Abstand (< 4px)
  80. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Jahre" und "Solidarität (erodierend)" nur 1.6px vertikaler Abstand (< 4px)
  81. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Depression" und "Diagnose" nur 3.5px vertikaler Abstand (< 4px)
  82. 🟡 modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — Text "Depression" und "Monate" nur 3.5px vertikaler Abstand (< 4px)
  83. 🟡 modul/3/index.html:473 «Zwei Menschen, zwischen ihnen » — Text "Ich bin" asymmetrisches Padding: links=44px rechts=292px
  84. 🟡 modul/3/index.html:473 «Zwei Menschen, zwischen ihnen » — Text "allein" asymmetrisches Padding: links=49px rechts=297px
  85. 🟡 modul/4/index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)
  86. 🟡 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "😤" und "kreis" nur 0.9px vertikaler Abstand (< 4px)
  87. 🟡 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "🔍" und "kreis" nur 0.9px vertikaler Abstand (< 4px)
  88. 🟡 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "😮‍💨" und "Erschöp-" nur 1.4px vertikaler Abstand (< 4px)
  89. 🟡 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "Erschöp-" und "fung" nur 2.4px vertikaler Abstand (< 4px)
  90. 🟡 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "involvement" nur 3.9px zum viewBox-Rand (rechts)
  91. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Sie" asymmetrisches Padding: links=42px rechts=522px
  92. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Gesunde" asymmetrisches Padding: links=498px rechts=18px
  93. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Grenzen" asymmetrisches Padding: links=502px rechts=22px
  94. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "😰" asymmetrisches Padding: links=148px rechts=434px
  95. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Angst" asymmetrisches Padding: links=127px rechts=413px
  96. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Wenn etwas" asymmetrisches Padding: links=98px rechts=384px
  97. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "passiert…»" asymmetrisches Padding: links=103px rechts=389px
  98. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "doch krank…»" asymmetrisches Padding: links=187px rechts=283px
  99. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "nicht im Stich»" asymmetrisches Padding: links=266px rechts=172px
  100. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "🔄" asymmetrisches Padding: links=433px rechts=149px
  101. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Gewohnheit" asymmetrisches Padding: links=382px rechts=98px
  102. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«So war es" asymmetrisches Padding: links=388px rechts=104px
  103. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "schon immer»" asymmetrisches Padding: links=377px rechts=93px
  104. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Wenn etwas" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  105. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Wenn etwas" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  106. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Er/sie ist" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  107. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Er/sie ist" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  108. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Er/sie ist" und "nicht im Stich»" nur 1.0px vertikaler Abstand (< 4px)
  109. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Man lässt" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  110. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Man lässt" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  111. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Man lässt" und "nicht im Stich»" nur 1.0px vertikaler Abstand (< 4px)
  112. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Man lässt" und "schon immer»" nur 1.0px vertikaler Abstand (< 4px)
  113. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«So war es" und "passiert…»" nur 1.0px vertikaler Abstand (< 4px)
  114. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«So war es" und "doch krank…»" nur 1.0px vertikaler Abstand (< 4px)
  115. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«So war es" und "nicht im Stich»" nur 1.0px vertikaler Abstand (< 4px)
  116. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«So war es" und "schon immer»" nur 1.0px vertikaler Abstand (< 4px)
  117. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Angst" und "«Ich sollte…»" nur 1.3px vertikaler Abstand (< 4px)
  118. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Schuld" und "«Ich sollte…»" nur 1.3px vertikaler Abstand (< 4px)
  119. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Schuld" und "Grenzen" nur 1.3px vertikaler Abstand (< 4px)
  120. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Druck" und "«Ich sollte…»" nur 1.3px vertikaler Abstand (< 4px)
  121. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Druck" und "Grenzen" nur 1.3px vertikaler Abstand (< 4px)
  122. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Gewohnheit" und "Grenzen" nur 1.3px vertikaler Abstand (< 4px)
  123. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Jede Barriere ist verständlich" nur 2.2px zum rect-Rand (unten)
  124. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Schuld" und "«Wenn etwas" nur 2.5px vertikaler Abstand (< 4px)
  125. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Druck" und "«Wenn etwas" nur 2.5px vertikaler Abstand (< 4px)
  126. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Druck" und "«Er/sie ist" nur 2.5px vertikaler Abstand (< 4px)
  127. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Gewohnheit" und "«Wenn etwas" nur 2.5px vertikaler Abstand (< 4px)
  128. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Gewohnheit" und "«Er/sie ist" nur 2.5px vertikaler Abstand (< 4px)
  129. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "Gewohnheit" und "«Man lässt" nur 2.5px vertikaler Abstand (< 4px)
  130. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ Bewertung" asymmetrisches Padding: links=32px rechts=442px
  131. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "✓ Beobachtung" asymmetrisches Padding: links=433px rechts=19px
  132. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ Du-Botschaft" asymmetrisches Padding: links=17px rechts=423px
  133. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "✓ Ich-Botschaft" asymmetrisches Padding: links=422px rechts=8px
  134. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ In der Krise" asymmetrisches Padding: links=114px rechts=334px
  135. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ Langer Monolog" asymmetrisches Padding: links=324px rechts=104px
  136. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "Zielzone" asymmetrisches Padding: links=352px rechts=162px
  137. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "Was sage" und "ich wie?" nur 1.0px vertikaler Abstand (< 4px)
  138. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ In der Krise" und "«Du bist…» → «Mir fällt auf…»" nur 3.3px vertikaler Abstand (< 4px)
  139. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "❌ Langer Monolog" und "«Du bist…» → «Mir fällt auf…»" nur 3.3px vertikaler Abstand (< 4px)
  140. 🟡 modul/5/index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)
  141. 🟡 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — circle und circle nur 2.0px vertikaler Abstand
  142. 🟡 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — circle und circle nur 2.0px vertikaler Abstand
  143. 🟡 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — circle und circle nur 2.0px vertikaler Abstand
  144. 🟡 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — circle und circle nur 2.0px vertikaler Abstand
  145. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!" asymmetrisches Padding: links=48px rechts=538px
  146. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Frühwarnzeichen" asymmetrisches Padding: links=16px rechts=396px
  147. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" asymmetrisches Padding: links=205px rechts=379px
  148. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" asymmetrisches Padding: links=395px rechts=189px
  149. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!!!" asymmetrisches Padding: links=415px rechts=145px
  150. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Notfall" asymmetrisches Padding: links=446px rechts=66px
  151. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Schlaf ↓ · Reizbarkeit ↑" und "Geld ausgeben · Schnell reden" nur 1.0px vertikaler Abstand (< 4px)
  152. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Realitätsverlust · Impulsivitä" und "Geld ausgeben · Schnell reden" nur 1.0px vertikaler Abstand (< 4px)
  153. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Realitätsverlust · Impulsivitä" und "Medikamente abgesetzt" nur 1.0px vertikaler Abstand (< 4px)
  154. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Selbst-/Fremdgefährdung" und "Medikamente abgesetzt" nur 1.0px vertikaler Abstand (< 4px)
  155. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Selbst-/Fremdgefährdung" und "Suizidgedanken · Aggression" nur 1.0px vertikaler Abstand (< 4px)
  156. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Geld ausgeben · Schnell reden" und "→ Behandlungsteam informieren" nur 1.0px vertikaler Abstand (< 4px)
  157. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Geld ausgeben · Schnell reden" und "→ Kontaktperson anrufen" nur 1.0px vertikaler Abstand (< 4px)
  158. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Medikamente abgesetzt" und "→ Behandlungsteam informieren" nur 1.0px vertikaler Abstand (< 4px)
  159. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Medikamente abgesetzt" und "→ Kontaktperson anrufen" nur 1.0px vertikaler Abstand (< 4px)
  160. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Medikamente abgesetzt" und "→ 144 (Sanität)oder 117 (Poliz" nur 1.0px vertikaler Abstand (< 4px)
  161. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Suizidgedanken · Aggression" und "→ Kontaktperson anrufen" nur 1.0px vertikaler Abstand (< 4px)
  162. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Suizidgedanken · Aggression" und "→ 144 (Sanität)oder 117 (Poliz" nur 1.0px vertikaler Abstand (< 4px)
  163. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Behandlungsteam informieren" und "→ Krisenplan hervornehmen" nur 1.0px vertikaler Abstand (< 4px)
  164. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Behandlungsteam informieren" und "→ Kinder versorgen lassen" nur 1.0px vertikaler Abstand (< 4px)
  165. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Kontaktperson anrufen" und "→ Krisenplan hervornehmen" nur 1.0px vertikaler Abstand (< 4px)
  166. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Kontaktperson anrufen" und "→ Kinder versorgen lassen" nur 1.0px vertikaler Abstand (< 4px)
  167. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ 144 (Sanität)oder 117 (Poliz" und "→ Kinder versorgen lassen" nur 1.0px vertikaler Abstand (< 4px)
  168. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Akute Krise" und "Schlaf ↓ · Reizbarkeit ↑" nur 2.2px vertikaler Abstand (< 4px)
  169. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Notfall" und "Realitätsverlust · Impulsivitä" nur 2.2px vertikaler Abstand (< 4px)
  170. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" und "→ Behandlungsteam informieren" nur 2.4px vertikaler Abstand (< 4px)
  171. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" und "→ Behandlungsteam informieren" nur 2.4px vertikaler Abstand (< 4px)
  172. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→" und "→ Kontaktperson anrufen" nur 2.4px vertikaler Abstand (< 4px)
  173. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!!" und "→" nur 2.7px vertikaler Abstand (< 4px)
  174. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!!!" und "→" nur 2.7px vertikaler Abstand (< 4px)
  175. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "!!!" und "→" nur 2.7px vertikaler Abstand (< 4px)
  176. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Zu weich" asymmetrisches Padding: links=34px rechts=474px
  177. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Zu hart" asymmetrisches Padding: links=480px rechts=40px
  178. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "entsteht.»" asymmetrisches Padding: links=26px rechts=466px
  179. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich liebe dich," asymmetrisches Padding: links=124px rechts=304px
  180. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "und ich brauche" asymmetrisches Padding: links=129px rechts=309px
  181. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "heute Abend Ruhe.»" asymmetrisches Padding: links=113px rechts=293px
  182. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Medikamente sind" asymmetrisches Padding: links=298px rechts=118px
  183. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "deine Verantwortung." asymmetrisches Padding: links=282px rechts=102px
  184. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Ich erinnere dich gern.»" asymmetrisches Padding: links=260px rechts=80px
  185. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich mache alles," und "damit kein Streit" nur 1.0px vertikaler Abstand (< 4px)
  186. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich mache alles," und "und ich brauche" nur 1.0px vertikaler Abstand (< 4px)
  187. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich liebe dich," und "damit kein Streit" nur 1.0px vertikaler Abstand (< 4px)
  188. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich liebe dich," und "und ich brauche" nur 1.0px vertikaler Abstand (< 4px)
  189. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich liebe dich," und "deine Verantwortung." nur 1.0px vertikaler Abstand (< 4px)
  190. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Medikamente sind" und "und ich brauche" nur 1.0px vertikaler Abstand (< 4px)
  191. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Medikamente sind" und "deine Verantwortung." nur 1.0px vertikaler Abstand (< 4px)
  192. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Medikamente sind" und "Arzt gehst, gehe" nur 1.0px vertikaler Abstand (< 4px)
  193. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Wenn du nicht zum" und "deine Verantwortung." nur 1.0px vertikaler Abstand (< 4px)
  194. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Wenn du nicht zum" und "Arzt gehst, gehe" nur 1.0px vertikaler Abstand (< 4px)
  195. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "damit kein Streit" und "entsteht.»" nur 1.0px vertikaler Abstand (< 4px)
  196. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "damit kein Streit" und "heute Abend Ruhe.»" nur 1.0px vertikaler Abstand (< 4px)
  197. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "und ich brauche" und "entsteht.»" nur 1.0px vertikaler Abstand (< 4px)
  198. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "und ich brauche" und "heute Abend Ruhe.»" nur 1.0px vertikaler Abstand (< 4px)
  199. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "und ich brauche" und "Ich erinnere dich gern.»" nur 1.0px vertikaler Abstand (< 4px)
  200. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "deine Verantwortung." und "heute Abend Ruhe.»" nur 1.0px vertikaler Abstand (< 4px)
  201. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "deine Verantwortung." und "Ich erinnere dich gern.»" nur 1.0px vertikaler Abstand (< 4px)
  202. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "deine Verantwortung." und "ich für immer.»" nur 1.0px vertikaler Abstand (< 4px)
  203. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Arzt gehst, gehe" und "Ich erinnere dich gern.»" nur 1.0px vertikaler Abstand (< 4px)
  204. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Arzt gehst, gehe" und "ich für immer.»" nur 1.0px vertikaler Abstand (< 4px)
  205. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Gesunde Zone" und "Alles mitmachen" nur 1.3px vertikaler Abstand (< 4px)
  206. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Gesunde Zone" und "Ultimaten stellen" nur 1.3px vertikaler Abstand (< 4px)
  207. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Klar · Liebevoll · Konsequent" und "«Ich mache alles," nur 1.9px vertikaler Abstand (< 4px)
  208. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Klar · Liebevoll · Konsequent" und "«Ich liebe dich," nur 1.9px vertikaler Abstand (< 4px)
  209. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Klar · Liebevoll · Konsequent" und "«Medikamente sind" nur 1.9px vertikaler Abstand (< 4px)
  210. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Klar · Liebevoll · Konsequent" und "«Wenn du nicht zum" nur 1.9px vertikaler Abstand (< 4px)
  211. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Zu weich" und "Alles mitmachen" nur 2.3px vertikaler Abstand (< 4px)
  212. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Zu hart" und "Ultimaten stellen" nur 2.3px vertikaler Abstand (< 4px)
  213. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Gesunde Zone" und "Klar · Liebevoll · Konsequent" nur 2.5px vertikaler Abstand (< 4px)
  214. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Alles mitmachen" und "«Ich mache alles," nur 3.1px vertikaler Abstand (< 4px)
  215. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Alles mitmachen" und "«Ich liebe dich," nur 3.1px vertikaler Abstand (< 4px)
  216. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Ultimaten stellen" und "«Medikamente sind" nur 3.1px vertikaler Abstand (< 4px)
  217. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Ultimaten stellen" und "«Wenn du nicht zum" nur 3.1px vertikaler Abstand (< 4px)
  218. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Zu weich" und "Klar · Liebevoll · Konsequent" nur 3.5px vertikaler Abstand (< 4px)
  219. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Zu hart" und "Klar · Liebevoll · Konsequent" nur 3.5px vertikaler Abstand (< 4px)
  220. 🟡 modul/6/index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)
  221. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Erkrankung" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  222. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Ängste und" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  223. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Ängste und" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  224. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Bewusste" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  225. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Bewusste" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  226. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Bewusste" und "Zeiten ohne" nur 1.0px vertikaler Abstand (< 4px)
  227. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schriftliche" und "verstehen" nur 1.0px vertikaler Abstand (< 4px)
  228. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schriftliche" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  229. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schriftliche" und "Zeiten ohne" nur 1.0px vertikaler Abstand (< 4px)
  230. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schriftliche" und "Vereinbarung:" nur 1.0px vertikaler Abstand (< 4px)
  231. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Last auf" und "Grenzen" nur 1.0px vertikaler Abstand (< 4px)
  232. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Last auf" und "Zeiten ohne" nur 1.0px vertikaler Abstand (< 4px)
  233. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Last auf" und "Vereinbarung:" nur 1.0px vertikaler Abstand (< 4px)
  234. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Last auf" und "mehrere" nur 1.0px vertikaler Abstand (< 4px)
  235. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "verstehen" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  236. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Grenzen" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  237. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Grenzen" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  238. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Zeiten ohne" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  239. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Zeiten ohne" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  240. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Zeiten ohne" und "Therapie-" nur 1.0px vertikaler Abstand (< 4px)
  241. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Vereinbarung:" und "als «Dritten" nur 1.0px vertikaler Abstand (< 4px)
  242. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Vereinbarung:" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  243. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Vereinbarung:" und "Therapie-" nur 1.0px vertikaler Abstand (< 4px)
  244. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Vereinbarung:" und "Wer macht" nur 1.0px vertikaler Abstand (< 4px)
  245. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "mehrere" und "ehrlich" nur 1.0px vertikaler Abstand (< 4px)
  246. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "mehrere" und "Therapie-" nur 1.0px vertikaler Abstand (< 4px)
  247. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "mehrere" und "Wer macht" nur 1.0px vertikaler Abstand (< 4px)
  248. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "mehrere" und "Schultern" nur 1.0px vertikaler Abstand (< 4px)
  249. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "als «Dritten" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  250. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "ehrlich" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  251. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "ehrlich" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  252. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Therapie-" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  253. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Therapie-" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  254. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Therapie-" und "Themen" nur 1.0px vertikaler Abstand (< 4px)
  255. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wer macht" und "im Bunde»" nur 1.0px vertikaler Abstand (< 4px)
  256. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wer macht" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  257. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wer macht" und "Themen" nur 1.0px vertikaler Abstand (< 4px)
  258. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wer macht" und "was, wann" nur 1.0px vertikaler Abstand (< 4px)
  259. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schultern" und "aussprechen" nur 1.0px vertikaler Abstand (< 4px)
  260. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schultern" und "Themen" nur 1.0px vertikaler Abstand (< 4px)
  261. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schultern" und "was, wann" nur 1.0px vertikaler Abstand (< 4px)
  262. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Schultern" und "verteilen" nur 1.0px vertikaler Abstand (< 4px)
  263. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wissen" nur 1.6px zum rect-Rand (rechts)
  264. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Offene" nur 1.6px zum rect-Rand (links)
  265. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Themen" nur 1.6px zum rect-Rand (links)
  266. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Wissen" nur 1.6px zum rect-Rand (links)
  267. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Offene" nur 1.6px zum rect-Rand (rechts)
  268. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Themen" nur 1.6px zum rect-Rand (rechts)
  269. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Gemeinsames" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  270. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Offene" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  271. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Offene" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  272. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Krankheits-" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  273. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Krankheits-" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  274. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Krankheits-" und "freie Inseln" nur 1.8px vertikaler Abstand (< 4px)
  275. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Gemeinsamer" und "Wissen" nur 1.8px vertikaler Abstand (< 4px)
  276. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Gemeinsamer" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  277. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Gemeinsamer" und "freie Inseln" nur 1.8px vertikaler Abstand (< 4px)
  278. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Gemeinsamer" und "Krisenplan" nur 1.8px vertikaler Abstand (< 4px)
  279. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Netzwerk" und "Kommunikation" nur 1.8px vertikaler Abstand (< 4px)
  280. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Netzwerk" und "freie Inseln" nur 1.8px vertikaler Abstand (< 4px)
  281. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Netzwerk" und "Krisenplan" nur 1.8px vertikaler Abstand (< 4px)
  282. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Netzwerk" und "aufbauen" nur 1.8px vertikaler Abstand (< 4px)
  283. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Fundament: Stabile Phasen nutz" nur 2.3px zum rect-Rand (unten)
  284. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — rect und rect nur 2.4px vertikaler Abstand
  285. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — rect und rect nur 2.4px vertikaler Abstand
  286. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — rect und rect nur 2.4px vertikaler Abstand
  287. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — rect und rect nur 2.4px vertikaler Abstand
  288. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — rect und rect nur 2.4px vertikaler Abstand
  289. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Besser" asymmetrisches Padding: links=5px rechts=530px
  290. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Belastet" asymmetrisches Padding: links=5px rechts=509px
  291. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "«So sollte es laufen»" asymmetrisches Padding: links=363px rechts=10px
  292. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Rückschlag" asymmetrisches Padding: links=101px rechts=391px
  293. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Krise" asymmetrisches Padding: links=448px rechts=98px
  294. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Richtung" asymmetrisches Padding: links=504px rechts=10px
  295. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "stimmt" asymmetrisches Padding: links=525px rechts=10px
  296. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Erwartung (linear)" asymmetrisches Padding: links=82px rechts=324px
  297. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Richtung" und "stimmt" nur 1.0px vertikaler Abstand (< 4px)
  298. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Erwartung (linear)" nur 1.9px zum rect-Rand (unten)
  299. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Belastet" und "Erwartung (linear)" nur 3.0px vertikaler Abstand (< 4px)
  300. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Belastet" und "Tatsächlicher Verlauf (wellenf" nur 3.0px vertikaler Abstand (< 4px)
  301. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Krise" und "Richtung" nur 3.2px vertikaler Abstand (< 4px)
  302. 🟡 modul/7/index.html:18 «(kein Label)» — Text "🤝" nur 0.0px zum viewBox-Rand (links)

### Priorität 3: Moderate Engstellen / Asymmetrien (76 Befunde)
  1. 🟡 index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  2. 🟡 modul/1/index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  3. 🟡 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "→ Zeit (Jahre)" nur -11.2px zum viewBox-Rand (rechts)
  4. 🟡 modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — Text "Grundbelastung Angehörige (ste" nur -1.2px zum viewBox-Rand (rechts)
  5. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "auch für Sie selbst" nur -25.2px zum viewBox-Rand (rechts)
  6. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "sichtbar für" nur -9.6px zum viewBox-Rand (rechts)
  7. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "unsichtbar —" nur -9.6px zum viewBox-Rand (rechts)
  8. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Der Belastungs-Eisberg: Was an" nur -2.4px zum viewBox-Rand (links)
  9. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Der Belastungs-Eisberg: Was an" nur -2.4px zum viewBox-Rand (rechts)
  10. 🟡 modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — Text "Der Belastungs-Eisberg: Was an" nur -1.5px zum viewBox-Rand (oben)
  11. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "wiederholt sich" nur -21.0px zum viewBox-Rand (rechts)
  12. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Der Kreislauf" nur -10.2px zum viewBox-Rand (rechts)
  13. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "täglich — oft" nur -10.2px zum viewBox-Rand (rechts)
  14. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Körper in Alarmbereitschaft" nur -5.8px zum viewBox-Rand (rechts)
  15. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Dauer-" und "Kurz — nie vollständig" nur 4.0px Abstand (< 30% von fontSize 18.0)
  16. 🟡 modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — Text "Dauer-" und "Körper in Alarmbereitschaft" nur 4.0px Abstand (< 30% von fontSize 18.0)
  17. 🟡 modul/2/index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  18. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Was sich verschiebt — vier Dim" nur 5.0px zum rect-Rand (oben)
  19. 🟡 modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — Text "Koexistenz" und "Verwaltung" nur 5.2px Abstand (< 30% von fontSize 18.0)
  20. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 1" und "Vertrauen" nur 4.7px Abstand (< 30% von fontSize 18.0)
  21. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 1" und "Nähe & Intimität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  22. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 2" und "Vertrauen" nur 4.7px Abstand (< 30% von fontSize 18.0)
  23. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 2" und "Nähe & Intimität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  24. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 2" und "Leichtigkeit & Spontanität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  25. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 3" und "Nähe & Intimität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  26. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 3" und "Leichtigkeit & Spontanität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  27. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 3" und "→ Zeit" nur 4.7px Abstand (< 30% von fontSize 18.0)
  28. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 4" und "Leichtigkeit & Spontanität" nur 4.7px Abstand (< 30% von fontSize 18.0)
  29. 🟡 modul/2/index.html:409 «Diagramm: Vertrauen, Nähe und » — Text "Episode 4" und "→ Zeit" nur 4.7px Abstand (< 30% von fontSize 18.0)
  30. 🟡 modul/3/index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  31. 🟡 modul/3/index.html:473 «Zwei Menschen, zwischen ihnen » — circle und circle nur 4.2px horizontaler Abstand
  32. 🟡 modul/3/index.html:473 «Zwei Menschen, zwischen ihnen » — circle und circle nur 5.2px horizontaler Abstand
  33. 🟡 modul/4/index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  34. 🟡 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "Kritik &" und "anklicken" nur 4.5px Abstand (< 30% von fontSize 15.5)
  35. 🟡 modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — Text "Über-" und "anklicken" nur 4.5px Abstand (< 30% von fontSize 15.5)
  36. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "→ Der erste Schritt: eine Barr" nur -105.0px zum viewBox-Rand (links)
  37. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "→ Der erste Schritt: eine Barr" nur -105.0px zum viewBox-Rand (rechts)
  38. 🟡 modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — Text "«Ich sollte…»" nur -10.2px zum viewBox-Rand (links)
  39. 🟡 modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — Text "Kommunikations-Kompass: 4 Achs" nur -2.8px zum viewBox-Rand (oben)
  40. 🟡 modul/5/index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  41. 🟡 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — Text "dann anderen" nur -17.6px zum viewBox-Rand (rechts)
  42. 🟡 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — Text "Sie zuerst" nur -1.0px zum viewBox-Rand (links)
  43. 🟡 modul/5/index.html:288 «Sauerstoffmaske zuerst anlegen» — circle und circle nur 6.0px horizontaler Abstand
  44. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Erstellt in einer stabilen Pha" nur -94.2px zum viewBox-Rand (rechts)
  45. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Erstellt in einer stabilen Pha" nur -94.2px zum viewBox-Rand (links)
  46. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ 144 (Sanität)oder 117 (Poliz" nur -68.2px zum viewBox-Rand (rechts)
  47. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Geld ausgeben · Schnell reden" nur -46.6px zum viewBox-Rand (links)
  48. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Behandlungsteam informieren" nur -46.6px zum viewBox-Rand (links)
  49. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ PUK Notfall: 058 384 21 11" nur -41.2px zum viewBox-Rand (rechts)
  50. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Suizidgedanken · Aggression" nur -35.8px zum viewBox-Rand (rechts)
  51. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "→ Krisenplan hervornehmen" nur -25.0px zum viewBox-Rand (links)
  52. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Schlaf ↓ · Reizbarkeit ↑" nur -19.6px zum viewBox-Rand (links)
  53. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Selbst-/Fremdgefährdung" nur -14.2px zum viewBox-Rand (rechts)
  54. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Der Krisenplan — 3 Stufen" nur -0.8px zum rect-Rand (oben)
  55. 🟡 modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — Text "Der Krisenplan — 3 Stufen" nur -0.8px zum viewBox-Rand (oben)
  56. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Die meisten Angehörigen pendel" nur -272.4px zum viewBox-Rand (links)
  57. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Die meisten Angehörigen pendel" nur -272.4px zum viewBox-Rand (rechts)
  58. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Wenn du nicht zum" nur -17.2px zum viewBox-Rand (rechts)
  59. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "«Ich mache alles," nur -11.8px zum viewBox-Rand (links)
  60. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "damit kein Streit" nur -11.8px zum viewBox-Rand (links)
  61. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Ultimaten stellen" nur -11.8px zum viewBox-Rand (rechts)
  62. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Arzt gehst, gehe" nur -6.4px zum viewBox-Rand (rechts)
  63. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Grenzsetzungs-Spektrum: Wo ste" nur -2.8px zum viewBox-Rand (oben)
  64. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Alles mitmachen" nur -1.0px zum rect-Rand (links)
  65. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "ich für immer.»" nur -1.0px zum rect-Rand (rechts)
  66. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "Alles mitmachen" nur -1.0px zum viewBox-Rand (links)
  67. 🟡 modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — Text "ich für immer.»" nur -1.0px zum viewBox-Rand (rechts)
  68. 🟡 modul/6/index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)
  69. 🟡 modul/6/index.html:344 «Architektonische Darstellung: » — Text "Themen" nur 5.6px zum rect-Rand (unten)
  70. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Rückschläge (normal)" nur -26.0px zum viewBox-Rand (rechts)
  71. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Tatsächlicher Verlauf (wellenf" nur -10.8px zum viewBox-Rand (rechts)
  72. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Erwartung vs. Realität: Wie Fo" nur -7.8px zum viewBox-Rand (links)
  73. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Erwartung vs. Realität: Wie Fo" nur -7.8px zum viewBox-Rand (rechts)
  74. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Besser" nur 5.0px zum rect-Rand (links)
  75. 🟡 modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — Text "Belastet" nur 5.0px zum rect-Rand (links)
  76. 🟡 modul/7/index.html:18 «(kein Label)» — Text "🤝" nur -90.0px zum viewBox-Rand (oben)

### Priorität 4: Unruhiger Rhythmus (12 SVGs)
  1. modul/1/index.html:373 «Wellenförmiger Verlauf der bip» — StdDev 35.3px (56% des Medians)
  2. modul/1/index.html:452 «Eisberg-Metapher: Sichtbare Be» — StdDev 10.8px (85% des Medians)
  3. modul/1/index.html:605 «Kreislauf der Hypervigilanz: B» — StdDev 18.2px (102% des Medians)
  4. modul/2/index.html:306 «Zeitachse: Vier Dimensionen de» — StdDev 10.5px (45% des Medians)
  5. modul/3/index.html:386 «Solidaritätserosion: Die Fähig» — StdDev 35.7px (292% des Medians)
  6. modul/4/index.html:323 «EE Teufelskreis mit vier Stati» — StdDev 5.8px (45% des Medians)
  7. modul/4/index.html:394 «Vier Barrieren zwischen Ihnen » — StdDev 16.8px (84% des Medians)
  8. modul/4/index.html:530 «Kommunikations-Kompass: Vier A» — StdDev 13.6px (64% des Medians)
  9. modul/5/index.html:359 «Krisenplan-Ampel mit drei Stuf» — StdDev 11.0px (65% des Medians)
  10. modul/5/index.html:551 «Spektrum der Grenzsetzung: von» — StdDev 10.6px (53% des Medians)
  11. modul/6/index.html:344 «Architektonische Darstellung: » — StdDev 12.1px (61% des Medians)
  12. modul/6/index.html:499 «Diagramm: Zwei Linien zeigen d» — StdDev 16.1px (77% des Medians)

### CSS-Befunde (1 Befunde)
  1. 🟡 shared.css:3899 — .handout-grid → gap: 0.6rem (10px < 16px)

================================================================================
  AUDIT ABGESCHLOSSEN
================================================================================
