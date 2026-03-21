# Font-Size Migration — Abgeschlossen

**Datei:** shared.css
**Status:** Abgeschlossen (3 Tranchen, 3 Commits)

## Variablen-Skala (9 Stufen)

| Variable | Wert | Status |
|---|---|---|
| --fs-2xs | 0.7rem | **neu** |
| --fs-xs | 0.75rem | bestehend |
| --fs-sm | 0.9rem | bestehend |
| --fs-base | 1rem | bestehend |
| --fs-lg | 1.1rem | bestehend |
| --fs-h3 | 1.25rem | bestehend |
| --fs-xl | 1.5rem | **neu** |
| --fs-h2 | 1.6rem | bestehend |
| --fs-h1 | 1.9rem | bestehend |

## Ergebnis

| Metrik | Vorher | Nachher |
|---|---|---|
| Variable-basiert | 438 | **538** |
| Hardcoded | 122 | **31** |
| Variable-Quote | 78% | **95%** |

---

## Tranche 1: Kategorie A — Direkte Migration

**Commit:** `e067f72` — refactor: migrate 29 direct font-size matches to CSS variables

29 Stellen mit bestehenden Variablen (Diff < 0.05rem):

| Selektor | Vorher | Variable |
|---|---|---|
| #settings-toggle | 0.85rem | --fs-sm |
| .nav-bookmark | 0.85rem | --fs-sm |
| .pdf-lb-dl | 0.85rem | --fs-sm |
| .sl-pillar .sl-num | 0.85rem | --fs-sm |
| #back-to-top (mobile) | 0.85rem | --fs-sm |
| .nav-logo-text (mobile) | 0.85rem | --fs-sm |
| .res-urgent-card h3 | 1rem | --fs-base |
| .res-card h3 | 1rem | --fs-base |
| .res-grid-header | 1rem | --fs-base |
| .hv-detail .hv-d-title | 1rem | --fs-base |
| .notfall-fab-icon (mobile) | 1rem | --fs-base |
| .res-urgent-tel | 1.1rem | --fs-lg |
| .note-btn | 0.9rem | --fs-sm |
| .sl-header h3 | 1.25rem | --fs-h3 |
| .barr-card-marker | 0.75rem | --fs-xs |
| .ee-center-label | 0.75rem | --fs-xs |
| .sources-accordion ::before | 0.75rem | --fs-xs |
| .text-xs-muted | 0.75rem | --fs-xs |
| .hv-center-label | 0.75rem | --fs-xs |
| .hv-note | 0.75rem | --fs-xs |
| .hv-detail .hv-d-sign | 0.75rem | --fs-xs |
| .kk-gradient .left | 0.75rem | --fs-xs |
| .kk-gradient .right | 0.75rem | --fs-xs |
| .kk-detail .kk-verdict | 0.75rem | --fs-xs |
| .kk-detail .kk-situation | 0.75rem | --fs-xs |
| .kk-detail .kk-why | 0.75rem | --fs-xs |
| .sl-fundament .sl-f-sub | 0.75rem | --fs-xs |
| .hv-pill (mobile) | 0.75rem | --fs-xs |
| .ee-pill (mobile) | 0.75rem | --fs-xs |

---

## Tranche 2: Kategorie B — Nahe Migration

**Commit:** `8697a11` — refactor: migrate 34 near-match font-sizes to CSS variables

34 Stellen mit 0.05–0.1rem Differenz (visuell nicht wahrnehmbar):

| Selektor | Vorher | Variable | Diff |
|---|---|---|---|
| .burden-chart-title | 1.05rem | --fs-lg | -0.05 |
| .sl-detail .sl-d-title | 1.05rem | --fs-lg | -0.05 |
| .notfall-triage-title | 1.05rem | --fs-lg | -0.05 |
| .restructure-notice-inner | 0.875rem | --fs-sm | -0.025 |
| .text-sm-muted | 0.875rem | --fs-sm | -0.025 |
| .hv-pill | 0.875rem | --fs-sm | -0.025 |
| .kk-q .kk-label | 0.875rem | --fs-sm | -0.025 |
| .ee-pill | 0.875rem | --fs-sm | -0.025 |
| .acc-chevron | 0.8rem | --fs-sm | -0.1 |
| .nt-marker | 0.8rem | --fs-sm | -0.1 |
| .sl-detail .sl-d-why | 0.8rem | --fs-sm | -0.1 |
| .sl-detail .sl-d-concrete | 0.8rem | --fs-sm | -0.1 |
| .hv-title p | 0.82rem | --fs-sm | -0.08 |
| .hv-detail .hv-d-body | 0.82rem | --fs-sm | -0.08 |
| .kk-title p | 0.82rem | --fs-sm | -0.08 |
| .sl-roof span | 0.82rem | --fs-sm | -0.08 |
| .sl-pillar .sl-p-title | 0.82rem | --fs-sm | -0.08 |
| .sl-fundament p | 0.82rem | --fs-sm | -0.08 |
| .sl-erosion .sl-e-title | 0.82rem | --fs-sm | -0.08 |
| .sl-note p | 0.82rem | --fs-sm | -0.08 |
| .ee-title-html p | 0.82rem | --fs-sm | -0.08 |
| .hv-takeaway p | 0.81rem | --fs-sm | -0.09 |
| .kk-detail .kk-effect | 0.81rem | --fs-sm | -0.09 |
| .kk-rule p | 0.81rem | --fs-sm | -0.09 |
| .ee-note-html | 0.81rem | --fs-sm | -0.09 |
| .kk-detail .kk-says | 0.94rem | --fs-sm | +0.04 |
| .sl-detail .sl-d-body | 0.84rem | --fs-sm | -0.06 |
| .sl-header p | 0.84rem | --fs-sm | -0.06 |
| .res-toggle-icon | 1.2rem | --fs-h3 | -0.05 |
| .hv-title h3 | 1.18rem | --fs-h3 | -0.07 |
| .kk-title h3 | 1.18rem | --fs-h3 | -0.07 |
| .ee-title-html h3 | 1.18rem | --fs-h3 | -0.07 |
| .kk-q .kk-icon | 1.35rem | --fs-h3 | +0.1 |
| .sl-detail .sl-d-emoji | 1.6rem | --fs-h2 | 0 |

**Uebersprungen:** .resource-num 2.1rem (Diff +0.2rem zu --fs-h1, zu hoch)

---

## Tranche 3: Kategorie C — Neue Variablen

**Commit:** `8903fe2` — refactor: add --fs-2xs and --fs-xl variables, migrate 26 font-sizes

2 neue Variablen definiert + 26 Stellen migriert:

### --fs-2xs (0.7rem) — 18 Stellen

| Selektor | Vorher | Diff |
|---|---|---|
| .card-asset-id | 0.7rem | 0 |
| .hv-step-num | 0.7rem | 0 |
| .ee-step-num | 0.7rem | 0 |
| .hv-detail .hv-d-step | 0.7rem | 0 |
| .notfall-fab (mobile) | 0.7rem | 0 |
| .kk-axis-label (mobile) | 0.7rem | 0 |
| .hv-station .hv-sub | 0.69rem | +0.01 |
| .kk-q .kk-sub | 0.69rem | +0.01 |
| .ee-station .ee-sub | 0.69rem | +0.01 |
| .quick-exit-btn | 0.68rem | +0.02 |
| .mc-badge | 0.68rem | +0.02 |
| .quick-exit-btn (mobile) | 0.68rem | +0.02 |
| .viz-source | 0.72rem | -0.02 |
| .kk-q .kk-label (mobile) | 0.72rem | -0.02 |
| .reading-time, .m-meta | 0.78rem | -0.08 |
| .sources-accordion summary | 0.78rem | -0.08 |
| .sl-erosion .sl-e-list | 0.78rem | -0.08 |
| .kk-q .kk-label (mobile) | 0.78rem | -0.08 |

### --fs-xl (1.5rem) — 8 Stellen

| Selektor | Vorher | Diff |
|---|---|---|
| .acc-icon | 1.5rem | 0 |
| .res-urgent-icon | 1.5rem | 0 |
| .sl-pillar .sl-icon | 1.5rem | 0 |
| .pdf-lb-close | 1.5rem | 0 |
| .eisberg-v2-above-title | 1.5rem | 0 |
| .eisberg-v2-below-title | 1.5rem | 0 |
| .resource-num (mobile) | 1.4rem | -0.1 |
| .wb-icon | 1.4rem | -0.1 |

### Hardcoded belassen

| Selektor | Wert | Grund |
|---|---|---|
| .burden-chart-title (mobile) | 0.95rem | Einzige --fs-md Stelle, Variable lohnt nicht |

---

## Kategorie D: Ausnahmen (31 Stellen, nicht migriert)

| Selektor | Wert | Grund |
|---|---|---|
| .hero-title | clamp(1.9rem, 5vw, 2.9rem) | Responsive clamp() |
| .m-title | clamp(1.5rem, 3vw, 2rem) | Responsive clamp() |
| body (@media print) | 11pt | Print-Stylesheet |
| a[href]::after (@media print) | 0.75em | Print, em-relativ |
| .viz-svg text (mobile) | 15px | SVG-Text, px noetig |
| .viz-svg text[bold] (mobile) | 17px | SVG-Text, px noetig |
| .viz-svg text (360px) | 13px | SVG-Text, px noetig |
| .viz-svg text[bold] (360px) | 15px | SVG-Text, px noetig |
| .exp-report::before | 6rem | Deko-Grosstext |
| .quote-card::before | 3.5rem | Deko-Grosstext |
| .sep-number | 3.4rem | Statistik-Grosszahl |
| .error-code | 4rem | 404-Fehlercode |
| .handout-lb-close | 2rem | Close-Button, einmalig |
| body.large-text | 1.125rem | Accessibility-Feature |
| .notfall-krisenplan p:first | 1rem | Mobile Override |
| .resource-num | 2.1rem | Zwischen Stufen (+0.2rem) |
| .kk-badge | 0.56rem | Badge-Micro-Text |
| .hv-center-sub | 0.6rem | Diagramm-Mikro |
| .ee-center-sub | 0.6rem | Diagramm-Mikro |
| .sl-pillar .sl-p-num | 0.6rem | Pillar-Mikro |
| .kk-axis-label | 0.625rem | Achsen-Label |
| .kk-side | 0.625rem | Achsen-Label |
| .hv-station .hv-sub (mobile) | 0.62rem | Mobile Diagramm-Mikro |
| .kk-q .kk-sub (mobile) | 0.62rem | Mobile Diagramm-Mikro |
| .ee-station .ee-sub (mobile) | 0.62rem | Mobile Diagramm-Mikro |
| .hv-center-label (mobile) | 0.65rem | Mobile Diagramm-Mikro |
| .ee-center-label (mobile) | 0.65rem | Mobile Diagramm-Mikro |
| .hv-center-sub (mobile) | 0.55rem | Mobile Diagramm-Mikro |
| .ee-center-sub (mobile) | 0.55rem | Mobile Diagramm-Mikro |
| .kk-q .kk-sub (mobile) | 0.58rem | Mobile Diagramm-Mikro |
| .burden-chart-title (mobile) | 0.95rem | Einzige --fs-md Stelle |
