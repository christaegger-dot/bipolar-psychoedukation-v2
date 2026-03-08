# Kontaktdaten-Check — Vollständige Extraktion

> **Datum:** 2026-03-08
> **Zweck:** Alle Kontaktinformationen aus HTML- und JS-Dateien zur manuellen Überprüfung durch die Autorin.
> **Hinweis:** NUR die E-Mail `angehoerige@pukzh.ch` → `angehoerigenarbeit@pukzh.ch` wurde korrigiert (in `main.js`). Alles andere ist UNVERÄNDERT und muss manuell geprüft werden.

---

## 1. E-Mail-Adressen

| E-Mail | Datei | Anmerkung |
|--------|-------|-----------|
| `angehoerigenarbeit@pukzh.ch` | `main.js:380` | Footer (Anti-Scrape JS, `#footer-email`) — **KORRIGIERT** (war: `angehoerige@pukzh.ch`) |
| `angehoerigenarbeit@pukzh.ch` | `main.js:382` | Modul 7 Ressourcen-Karte (Anti-Scrape JS, `#m7-email`) — **KORRIGIERT** (war: `angehoerige@pukzh.ch`) |

> Keine weiteren E-Mail-Adressen in HTML-Dateien gefunden. Die E-Mail erscheint nur per JavaScript.

---

## 2. Telefonnummern

### Fachstelle Angehörigenarbeit PUK
| Nummer | Format | Dateien |
|--------|--------|---------|
| +41 58 384 38 00 | `tel:+41583843800` | Alle Footer, `impressum/index.html:75`, `ressourcen/index.html:80`, `modul/7/index.html:382`, `modul/3/index.html:515`, `modul/2/index.html:527`, `modul/6/index.html:767` |

### PUK Zürich — Psychiatrische Notaufnahme (KIZ)
| Nummer | Format | Dateien |
|--------|--------|---------|
| 058 384 65 00 | `tel:+41583846500` | `notfall/index.html:92`, `modul/6/index.html:764`, `modul/1/index.html:446`, `modul/1/index.html:507`, `modul/1/index.html:519` |

### Psychiatrischer Notfalldienst Zürich
| Nummer | Format | Dateien |
|--------|--------|---------|
| 0800 33 66 55 | `tel:0800336655` | `notfall/index.html:72`, `notfall/index.html:153`, `notfall/index.html:193`, `ressourcen/index.html:137,282`, `modul/1/index.html:298,446,507,517`, `modul/4/index.html:711`, `modul/5/index.html:692`, `modul/6/index.html:763,833` |

### Sanität
| Nummer | Format | Dateien |
|--------|--------|---------|
| 144 | `tel:144` | `notfall/index.html:77,128,197`, `ressourcen/index.html:282`, `modul/1/index.html:507,521`, `modul/5/index.html:692`, `modul/6/index.html:761,785,833` |

### Polizei
| Nummer | Format | Dateien |
|--------|--------|---------|
| 117 | `tel:117` | `notfall/index.html:82,128,177`, `modul/1/index.html:507`, `modul/2/index.html:528`, `modul/5/index.html:692`, `modul/6/index.html:760,785` |

### Dargebotene Hand
| Nummer | Format | Dateien |
|--------|--------|---------|
| 143 | `tel:143` | `notfall/index.html:87`, `ressourcen/index.html:95`, `modul/1/index.html:298,446,521`, `modul/6/index.html:766` |

### Pro Mente Sana
| Nummer | Format | Dateien |
|--------|--------|---------|
| 0848 800 858 | `tel:0848800858` | `modul/7/index.html:396`, `modul/2/index.html:493`, `modul/5/index.html:382,640` |

### Pro Juventute
| Nummer | Format | Dateien |
|--------|--------|---------|
| 147 | `tel:147` | `ressourcen/index.html:103` |

### Selbsthilfe Zürich
| Nummer | Format | Dateien |
|--------|--------|---------|
| 043 288 88 88 | `tel:0432888888` | `modul/7/index.html:408` |

### VASK Zürich
| Nummer | Format | Dateien |
|--------|--------|---------|
| 044 240 48 68 | `tel:+41442404868` | `modul/6/index.html:719` |

### Opferhilfe Kanton Zürich
| Nummer | Format | Dateien |
|--------|--------|---------|
| 044 446 15 50 | `tel:+41444461550` | `modul/2/index.html:529` |

---

## 3. Postanschriften

| Adresse | Dateien |
|---------|---------|
| Psychiatrische Universitätsklinik Zürich (PUK), Fachstelle Angehörigenarbeit, Lenggstrasse 31, 8032 Zürich, Schweiz | `impressum/index.html:70-74`, alle Footer (`Lenggstrasse 31, 8032 Zürich`), `ressourcen/index.html:81`, `index.html:46-49` (schema.org JSON-LD) |

---

## 4. URLs zu externen Websites

### Kliniken / Hauptherausgeberin
| URL | Organisation | Dateien |
|-----|-------------|---------|
| https://www.pukzh.ch | PUK Zürich | `index.html:43` (schema.org), `modul/3/index.html:515` |

### Beratung & Selbsthilfe
| URL | Organisation | Dateien |
|-----|-------------|---------|
| https://www.vaskzuerich.ch | VASK Zürich | `ressourcen/index.html:91,292`, `modul/7/index.html:403` |
| https://www.promentesana.ch | Pro Mente Sana | `ressourcen/index.html:92`, `modul/7/index.html:398`, `modul/5/index.html:382,640` |
| https://www.selbsthilfezuerich.ch | Selbsthilfe Zürich | `ressourcen/index.html:93,292`, `modul/7/index.html:410` |
| https://www.selbsthilfeschweiz.ch | Selbsthilfe Schweiz | `ressourcen/index.html:94` |
| https://www.143.ch | Dargebotene Hand | `ressourcen/index.html:95`, `modul/7/index.html:391` |

### Kinder & Familie
| URL | Organisation | Dateien |
|-----|-------------|---------|
| https://www.kinderseele.ch | Kinderseele Schweiz | `ressourcen/index.html:102`, `modul/3/index.html:515` |
| https://www.projuventute.ch | Pro Juventute | `ressourcen/index.html:103` |
| https://www.kjz.zh.ch | kjz Kanton Zürich | `ressourcen/index.html:104` |
| https://www.postpartale-depression.ch | Postpartale Depression | `ressourcen/index.html:105` |

### Arbeit, Finanzen & Recht
| URL | Organisation | Dateien |
|-----|-------------|---------|
| https://www.svazurich.ch | SVA Zürich (IV) | `ressourcen/index.html:113` |
| https://www.proinfirmis.ch | Pro Infirmis | `ressourcen/index.html:114` |
| https://schulden.ch | Schuldenberatung CH | `ressourcen/index.html:115` |
| https://www.kesb-zh.ch | KESB Kanton Zürich | `ressourcen/index.html:116` |
| https://www.beobachter.ch/beratung | Beobachter Beratung | `ressourcen/index.html:117` |
| https://www.fmh.ch/dienstleistungen/recht/patientenverfuegung.cfm | FMH Patientenverfügung | `ressourcen/index.html:118` |

### Weitere
| URL | Organisation | Dateien |
|-----|-------------|---------|
| https://www.bipolar-forum.de | bipolar-forum.de (deutschsprachig) | `modul/3/index.html:587` |
| https://vfrp.ch | VASK (Verweis) | `modul/2/index.html:366` |

### Eigene Website
| URL | Dateien |
|-----|---------|
| https://bipolare-erkrankung-angehoerige.netlify.app/ | Canonical-Tags und OG-Metas in allen 13 HTML-Dateien |

---

## 5. Personennamen

### Reale Person (inhaltliche Verantwortung)
| Name | Rolle | Dateien |
|------|-------|---------|
| Ch. Egger | Fachstelle Angehörigenarbeit, inhaltliche Verantwortung | Alle Footer, `impressum/index.html:80` |

### Fiktiver Name (Beispiel im Krisenplan)
| Name | Kontext | Datei |
|------|---------|-------|
| Dr. Müller | Beispiel-Arzt im Krisenplan-Mockup ("Termin bei Dr. Müller vorziehen") | `modul/5/index.html:332` |

### Anonymisierte Erfahrungsberichte (fiktiv / pseudonymisiert)
| Name | Beschreibung | Datei |
|------|-------------|-------|
| Thomas, 52 | Partner seit 18 Jahren | `modul/1/index.html:842` |
| Miriam, 47 | Mutter und Partnerin | `modul/1/index.html:837` |
| Maria, 42 | Partnerin eines Menschen mit bipolarer Störung | `modul/2/index.html:292` |
| Susanne, 39 | Partnerin | `modul/2/index.html:369` |
| Sabine, 44 | Partnerin seit 9 Jahren | `modul/2/index.html:506` |
| Marco, 48 | Ehemann seit 14 Jahren | `modul/2/index.html:511` |
| Thomas, 51 | Ehemann, 8 Jahre Begleitung | `modul/3/index.html:521` |
| Elena, 34 | Tochter einer betroffenen Mutter | `modul/3/index.html:542` |
| Lukas, 28 | Sohn eines betroffenen Vaters | `modul/3/index.html:547` |
| Susanne, 44 | Partnerin | `modul/4/index.html:313` |
| Claudia, 44 | Partnerin seit 12 Jahren | `modul/4/index.html:715` |
| Asel, 52 | Ehefrau, seit 9 Jahren | `modul/4/index.html:778` |
| Nadja, 36 | Partnerin, 4 Jahre nach Diagnose | `modul/4/index.html:783` |
| Ruth, 58 | Ehefrau, 12 Jahre Begleitung | `modul/4/index.html:788` |
| Sandra, 44 | Ehefrau, seit 6 Jahren | `modul/5/index.html:654` |
| Daniel, 45 | Ehemann, 7 Jahre nach Diagnose | `modul/6/index.html:683` |
| Leila, 53 | Partnerin, 15 Jahre Begleitung | `modul/6/index.html:688` |
| Brigitte, 56 | Ehefrau seit 22 Jahren | `modul/6/index.html:693` |
| Claudia, 38 | Schwester, VASK-Mitglied | `modul/7/index.html:296` |
| Peter, 61 | Vater eines betroffenen Sohnes | `modul/7/index.html:304` |

### Anonyme Vignetten (nur Rolle, kein Name)
| Beschreibung | Datei |
|-------------|-------|
| Partnerin, 38 Jahre | `modul/3/index.html:160` |
| Ehemann, 46 Jahre | `modul/1/index.html:160` |
| Partnerin, 41 Jahre | `modul/2/index.html:161` |
| Partnerin, 55 Jahre | `modul/7/index.html:208` |
| Ehefrau, 44 Jahre | `modul/5/index.html:160` |
| Partnerin, 49 Jahre | `modul/6/index.html:161` |

---

## 6. Wissenschaftliche Referenzen (in Fliesstext)

| Referenz | Datei |
|----------|-------|
| Craddock & Sklar (2013) | `modul/3/index.html:512`, `ressourcen/index.html:267` |
| Dazzi et al. (2014) | `modul/4/index.html:711` |

---

## Zusammenfassung der Korrektur

| Was | Alt | Neu | Dateien |
|-----|-----|-----|---------|
| E-Mail Fachstelle | `angehoerige@pukzh.ch` | `angehoerigenarbeit@pukzh.ch` | `main.js:380,382`, `_dev/PRE-PUBLICATION-AUDIT.md:304` |

**Alle anderen Kontaktdaten sind UNVERÄNDERT und müssen von der Autorin einzeln geprüft werden.**
