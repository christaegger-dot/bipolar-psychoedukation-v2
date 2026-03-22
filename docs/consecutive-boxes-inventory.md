# Inventar: Konsekutive Info-Boxen

Stand: 2026-03-22

Kriterium: Zwei oder mehr Box-Elemente direkt hintereinander, ohne `<p>`-Fliesstext dazwischen.
`<details>`-Akkordeons, `<h2>`/`<h3>`, `viz-source` und leere Absätze zählen nicht als Trennung.

Box-Klassen: `.info-box`, `.warn-box`, `.success-box`, `.m-insight`, `.reflexion`, `.vignette`, `.quote-card`

---

## Fundstellen

| # | Modul | Zeile | Box 1 (Klasse → erster Satz) | Box 2 (Klasse → erster Satz) | Box 3? | Box 4? |
|---|-------|-------|------------------------------|------------------------------|--------|--------|
| 1 | M4 | 652 | `.vignette` — «Ein Sohn (28) erinnert sich: Ich habe als Kind immer zuerst geschaut…» | `.info-box.success-box` — «Was Sie tun können» | — | — |
| 2 | M5 | 800 | `.vignette` — «Eine Partnerin beschreibt es: Ich habe manchmal im Auto gesessen…» | `.info-box` — «Was diese Gedanken brauchen» | — | — |
| 3 | M6 | 774 | `.info-box.warn-box` — «Was in einer manischen Episode finanziell passieren kann» | `.info-box` — «Was Sie präventiv tun können (in stabilen Phasen)» | `.info-box` — «Was Sie akut tun können (während einer Episode)» | — |
| 4 | M6 | 813 | `.info-box` — «Was hilft — und was nicht» | `.vignette` — «Eine Mutter berichtet: Mein Sohn hat mich in einer Manie beschuldigt…» | — | — |
| 5 | M7 | 627 | `.reflexion.mc-m7` — «Zum Nachdenken» (Reflexionsliste) | `.reflexion` — «Reflexion: Was hat Sie bis hierher getragen?» | — | — |
| 6 | M7 | 648 | `.info-box` — «Was Angehörige nach einer Krise erleben» | `.info-box.warn-box` — «Die unsichtbare Nachkrise der Angehörigen» | `.info-box.success-box` — «Was Sie nach einer Krise brauchen dürfen» | `.vignette` — «Ein Partner beschreibt es: Alle haben gefragt…» |
| 7 | M8 | 680 | `.info-box.warn-box` — «Diese Wut ist keine Undankbarkeit» | `.info-box` — «Was Angehörige häufig erleben» | `.info-box.success-box` — «Was Sie tun können» | `.vignette` — «Eine Schwester berichtet: Ich habe meinen Bruder dreimal…» |

---

## Zusammenfassung

- **7 Fundstellen** in 5 Modulen (M4, M5, M6, M7, M8)
- **M1, M2, M3**: keine konsekutiven Boxen
- Grösste Ketten: M7 #6 und M8 #7 mit je **4 Boxen** hintereinander
- Häufigstes Muster: `info-box` → `info-box` (inhaltliche Trias: Problem → Prävention → Akut)
- Zweithäufigstes: `vignette` + `info-box` (Erfahrungsbericht → Handlungsanweisung)

### Grenzfälle (nicht aufgeführt)

- **M7 L605 + L613**: `.m-insight` + `.m-insight` — getrennt durch `<h3>Merken Sie sich</h3>` (thematische Trennung, aber kein `<p>`)
- **M6 L679 + L707**: `.m-insight` + `.reflexion` — getrennt durch `.exp-report`-Block (nicht in Box-Klassen)
- Alle `<details class="reflexion">` nach Boxen: nicht gezählt (Akkordeon-Ausnahme)
