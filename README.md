# Psychoedukation Bipolare Störung — für Angehörige

Interaktive Website der **Fachstelle Angehörigenarbeit**, Psychiatrische Universitätsklinik Zürich (PUK).

## Inhalt

Evidenzbasierte Psychoedukation für Angehörige und Partner\*innen von Menschen mit bipolarer Störung — in 8 Modulen:

| Modul | Thema |
|-------|-------|
| 1 | Verstehen — Was ist eine bipolare Störung? |
| 2 | Belastung — Was die Erkrankung mit Angehörigen macht |
| 3 | Beziehung — Was macht die Krankheit mit uns? |
| 4 | Erschöpfung — Wenn die Kraft nicht mehr reicht |
| 5 | Loyalität — Zwischen Bleiben und Gehen |
| 6 | Selbstfürsorge und Handeln — Sich selbst nicht verlieren |
| 7 | Resilienz — Widerstandskraft aufbauen |
| 8 | Ressourcen — Hilfe und Unterstützung finden |

Zusätzlich: Notfallseite, Handouts (24 PDFs), Ressourcen, Glossar, Impressum.

## Technologie

- Statisches HTML/CSS/JS (kein Build-Prozess nötig)
- `shared.css` — zentrale Stylesheet-Datei (695 Klassen, 100% Coverage)
- Gehostet via [Netlify](https://www.netlify.com)
- Responsive Design, Barrierefreiheit (ARIA, Skip-Links, Tastaturnavigation)
- Dark Mode, Lesezeichen, Suchfunktion

## Deployment

### Netlify (empfohlen)
1. Repository mit Netlify verbinden
2. Build command: *(leer lassen — kein Build nötig)*
3. Publish directory: `/`

### Lokal testen
```bash
# Einfacher HTTP-Server
python3 -m http.server 8000
# → http://localhost:8000
```

## Dateistruktur

```
├── index.html              # Startseite
├── shared.css              # Zentrale Styles
├── main.js                 # Hauptskript
├── search.js               # Suchfunktion
├── search-index.js         # Suchindex
├── modul/1–8/index.html    # 8 Modulseiten
├── handouts/notfall/       # Notfallseite (served at /notfall/)
├── handouts/ressourcen/    # Externe Ressourcen & Glossar (served at /ressourcen/)
├── handouts/impressum/     # Impressum (served at /impressum/)
├── handouts/index.html     # PDF-Übersicht
├── 404.html                # Fehlerseite
├── downloads/              # Krisenplan, Notfallkarte PDFs
├── handouts/               # 24 Handout-PDFs
├── handouts-text/          # Text-Versionen der PDFs
└── fonts/                  # Lora & Source Sans 3 (WOFF2)
```

## Inhaltliche Verantwortung

Ch. Egger, Fachstelle Angehörigenarbeit  
Psychiatrische Universitätsklinik Zürich  
Lenggstrasse 31, 8032 Zürich

## Lizenz

© 2026 Psychiatrische Universitätsklinik Zürich. Alle Rechte vorbehalten.
