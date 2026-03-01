# Psychoedukation Bipolare Störung — für Angehörige

Interaktive Website der **Fachstelle Angehörigenarbeit**, Psychiatrische Universitätsklinik Zürich (PUK).

## Inhalt

Evidenzbasierte Psychoedukation für Angehörige und Partner\*innen von Menschen mit bipolarer Störung — in 7 Modulen:

| Modul | Thema | Farbe |
|-------|-------|-------|
| 1 | Verstehen — Was ist eine bipolare Störung? | 🔵 |
| 2 | Beziehung — Was macht die Krankheit mit uns? | 🟢 |
| 3 | Erschöpfung — Wenn die Kraft nicht mehr reicht | 🟠 |
| 4 | Loyalität — Zwischen Bleiben und Gehen | 🟤 |
| 5 | Krisenmanagement — Handeln, wenn es ernst wird | 🔴 |
| 6 | Selbstfürsorge — Sich selbst nicht verlieren | 🟣 |
| 7 | Zukunft — Wie es weitergehen kann | 🟡 |

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
├── modul/1–7/index.html    # 7 Modulseiten
├── notfall/index.html      # Notfallseite
├── handouts/index.html     # PDF-Übersicht
├── ressourcen/index.html   # Externe Ressourcen & Glossar
├── impressum/index.html    # Impressum
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
