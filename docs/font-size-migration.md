# Font-Size Migrationsliste

**Datei:** shared.css
**Variablen-Skala (bestehend):**

| Variable | Wert |
|---|---|
| --fs-xs | 0.75rem |
| --fs-sm | 0.9rem |
| --fs-base | 1rem |
| --fs-lg | 1.1rem |
| --fs-h3 | 1.25rem |
| --fs-h2 | 1.6rem |
| --fs-h1 | 1.9rem |

**Vorgeschlagene neue Variablen:**

| Variable | Wert | Abdeckt |
|---|---|---|
| --fs-2xs | 0.7rem | SVG-Labels, Mikro-Text, Step-Nums |
| --fs-md | 0.95rem | Zwischen --fs-sm und --fs-base |
| --fs-xl | 1.5rem | Zwischen --fs-h3 und --fs-h2 |

---

## Kategorie A: Direkte Migration (Differenz < 0.05rem)

| Zeile | Selektor | Aktuell | Empfohlene Variable | Diff | Risiko |
|---|---|---|---|---|---|
| 206 | #settings-toggle | 0.85rem | --fs-sm (0.9) | -0.05 | niedrig |
| 208 | .nav-bookmark | 0.85rem | --fs-sm (0.9) | -0.05 | niedrig |
| 3553 | .res-urgent-card h3 | 1rem | --fs-base (1.0) | 0 | null |
| 3555 | .res-urgent-tel | 1.1rem | --fs-lg (1.1) | 0 | null |
| 3560 | .res-card h3 | 1rem | --fs-base (1.0) | 0 | null |
| 3579 | .res-grid-header | 1rem | --fs-base (1.0) | 0 | null |
| 3673 | .note-btn | 0.9rem | --fs-sm (0.9) | 0 | null |
| 3757 | .hv-detail .hv-d-title | 1rem | --fs-base (1.0) | 0 | null |
| 3854 | .sl-header h3 | 1.25rem | --fs-h3 (1.25) | 0 | null |
| 3918 | .pdf-lb-dl | 0.85rem | --fs-sm (0.9) | -0.05 | niedrig |
| 3863 | .sl-pillar .sl-num | 0.85rem | --fs-sm (0.9) | -0.05 | niedrig |
| 4198 | .barr-card-marker | 0.75rem | --fs-xs (0.75) | 0 | null |
| 4292 | .ee-center-label | 0.75rem | --fs-xs (0.75) | 0 | null |
| 4714 | .notfall-fab-icon (mobile) | 1rem | --fs-base (1.0) | 0 | null |
| 4722 | #back-to-top (mobile) | 0.85rem | --fs-sm (0.9) | -0.05 | niedrig |
| 4789 | .nav-logo-text (mobile) | 0.85rem | --fs-sm (0.9) | -0.05 | niedrig |
| 4881 | .sources-accordion ::before | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3599 | .text-xs-muted | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3741 | .hv-center-label | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3753 | .hv-note | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3759 | .hv-detail .hv-d-sign | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3815 | .kk-gradient .left | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3816 | .kk-gradient .right | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3819 | .kk-detail .kk-verdict | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3820 | .kk-detail .kk-situation | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3823 | .kk-detail .kk-why | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3891 | .sl-fundament .sl-f-sub | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3770 | .hv-pill (mobile) | 0.75rem | --fs-xs (0.75) | 0 | null |
| 4422 | .ee-pill (mobile) | 0.75rem | --fs-xs (0.75) | 0 | null |
| 3920 | .pdf-lb-close | 1.5rem | --fs-xl (1.5) | 0 | null |
| 3503 | .acc-icon | 1.5rem | --fs-xl (1.5) | 0 | null |
| 3552 | .res-urgent-icon | 1.5rem | --fs-xl (1.5) | 0 | null |
| 3862 | .sl-pillar .sl-icon | 1.5rem | --fs-xl (1.5) | 0 | null |
| 4451 | .eisberg-v2-above-title | 1.5rem | --fs-xl (1.5) | 0 | null |
| 4463 | .eisberg-v2-below-title | 1.5rem | --fs-xl (1.5) | 0 | null |

**Total: 35 Stellen, davon 27 exakt (0 diff), 8 mit -0.05rem**

---

## Kategorie B: Nahe Migration (Differenz 0.05-0.1rem)

| Zeile | Selektor | Aktuell | Empfohlene Variable | Diff | Risiko |
|---|---|---|---|---|---|
| 600 | .burden-chart-title | 1.05rem | --fs-lg (1.1) | -0.05 | niedrig |
| 3896 | .sl-detail .sl-d-title | 1.05rem | --fs-lg (1.1) | -0.05 | niedrig |
| 4549 | .notfall-triage-title | 1.05rem | --fs-lg (1.1) | -0.05 | niedrig |
| 2108 | .restructure-notice-inner | 0.875rem | --fs-sm (0.9) | -0.025 | niedrig |
| 3597 | .text-sm-muted | 0.875rem | --fs-sm (0.9) | -0.025 | niedrig |
| 3713 | .hv-pill | 0.875rem | --fs-sm (0.9) | -0.025 | niedrig |
| 3811 | .kk-q .kk-label | 0.875rem | --fs-sm (0.9) | -0.025 | niedrig |
| 4362 | .ee-pill | 0.875rem | --fs-sm (0.9) | -0.025 | niedrig |
| 3508 | .acc-chevron | 0.8rem | --fs-sm (0.9) | -0.1 | mittel |
| 4526 | .nt-marker | 0.8rem | --fs-sm (0.9) | -0.1 | mittel |
| 3897 | .sl-detail .sl-d-why | 0.8rem | --fs-sm (0.9) | -0.1 | mittel |
| 3899 | .sl-detail .sl-d-concrete | 0.8rem | --fs-sm (0.9) | -0.1 | mittel |
| 3706 | .hv-title p | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3758 | .hv-detail .hv-d-body | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3792 | .kk-title p | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3857 | .sl-roof span | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3866 | .sl-pillar .sl-p-title | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3890 | .sl-fundament p | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3906 | .sl-erosion .sl-e-title | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3910 | .sl-note p | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 4253 | .ee-title-html p | 0.82rem | --fs-sm (0.9) | -0.08 | niedrig |
| 3766 | .hv-takeaway p | 0.81rem | --fs-sm (0.9) | -0.09 | niedrig |
| 3822 | .kk-detail .kk-effect | 0.81rem | --fs-sm (0.9) | -0.09 | niedrig |
| 3828 | .kk-rule p | 0.81rem | --fs-sm (0.9) | -0.09 | niedrig |
| 4415 | .ee-note-html | 0.81rem | --fs-sm (0.9) | -0.09 | niedrig |
| 3821 | .kk-detail .kk-says | 0.94rem | --fs-sm (0.9) | +0.04 | niedrig |
| 3898 | .sl-detail .sl-d-body | 0.84rem | --fs-sm (0.9) | -0.06 | niedrig |
| 3854 | .sl-header p | 0.84rem | --fs-sm (0.9) | -0.06 | niedrig |
| 1370 | .resource-num | 2.1rem | --fs-h1 (1.9) | +0.2 | hoch |
| 3588 | .res-toggle-icon | 1.2rem | --fs-h3 (1.25) | -0.05 | niedrig |
| 3705 | .hv-title h3 | 1.18rem | --fs-h3 (1.25) | -0.07 | niedrig |
| 3791 | .kk-title h3 | 1.18rem | --fs-h3 (1.25) | -0.07 | niedrig |
| 4246 | .ee-title-html h3 | 1.18rem | --fs-h3 (1.25) | -0.07 | niedrig |
| 3806 | .kk-q .kk-icon | 1.35rem | --fs-h3 (1.25) | +0.1 | mittel |
| 3591 | .resource-num (mobile) | 1.4rem | --fs-xl (1.5) | -0.1 | mittel |
| 4999 | .wb-icon | 1.4rem | --fs-xl (1.5) | -0.1 | mittel |
| 3895 | .sl-detail .sl-d-emoji | 1.6rem | --fs-h2 (1.6) | 0 | null |

**Total: 37 Stellen**

---

## Kategorie C: Neue Variable noetig

Diese Werte werden durch die 3 neuen Variablen abgedeckt:

### --fs-2xs (0.7rem)

| Zeile | Selektor | Aktuell | Diff zu 0.7rem | Risiko |
|---|---|---|---|---|
| 3479 | .card-asset-id | 0.7rem | 0 | null |
| 3714 | .hv-step-num | 0.7rem | 0 | null |
| 4354 | .ee-step-num | 0.7rem | 0 | null |
| 3756 | .hv-detail .hv-d-step | 0.7rem | 0 | null |
| 4703 | .notfall-fab (mobile) | 0.7rem | 0 | null |
| 4829 | .kk-axis-label (mobile) | 0.7rem | 0 | null |
| 3715 | .hv-station .hv-sub | 0.69rem | +0.01 | null |
| 3812 | .kk-q .kk-sub | 0.69rem | +0.01 | null |
| 4372 | .ee-station .ee-sub | 0.69rem | +0.01 | null |
| 5054 | .quick-exit-btn | 0.68rem | +0.02 | null |
| 5302 | .mc-badge | 0.68rem | +0.02 | null |
| 5151 | .quick-exit-btn (mobile) | 0.68rem | +0.02 | null |
| 5265 | .viz-source | 0.72rem | -0.02 | null |
| 4832 | .kk-q .kk-label (mobile) | 0.72rem | -0.02 | null |
| 5229 | .reading-time, .m-meta | 0.78rem | -0.08 | niedrig |
| 5241 | .sources-accordion summary | 0.78rem | -0.08 | niedrig |
| 3907 | .sl-erosion .sl-e-list | 0.78rem | -0.08 | niedrig |
| 3844 | .kk-q .kk-label (mobile) | 0.78rem | -0.08 | niedrig |
| 4806 | .burden-chart-title (mobile) | 0.95rem | → --fs-md | null |

### --fs-md (0.95rem)

| Zeile | Selektor | Aktuell | Diff zu 0.95rem | Risiko |
|---|---|---|---|---|
| 4806 | .burden-chart-title (mobile) | 0.95rem | 0 | null |

### --fs-xl (1.5rem)

Bereits in Kategorie A erfasst (6 Stellen mit exakt 1.5rem).

---

## Kategorie D: Ausnahmen (nicht migrieren)

| Zeile | Selektor | Aktuell | Grund |
|---|---|---|---|
| 366 | .hero-title | clamp(1.9rem, 5vw, 2.9rem) | Responsive clamp(), kein fixer Wert |
| 5212 | .m-title | clamp(1.5rem, 3vw, 2rem) | Responsive clamp(), kein fixer Wert |
| 2132 | body (@media print) | 11pt | Print-Stylesheet, pt ist Standard |
| 2136 | a[href]::after (@media print) | 0.75em | Print, em-relativ zum Parent |
| 4754 | .viz-svg text (mobile) | 15px | SVG-Text, px noetig |
| 4760 | .viz-svg text[bold] (mobile) | 17px | SVG-Text, px noetig |
| 4773 | .viz-svg text (360px) | 13px | SVG-Text, px noetig |
| 4778 | .viz-svg text[bold] (360px) | 15px | SVG-Text, px noetig |
| 1142 | .exp-report::before | 6rem | Dekoratives Anfuehrungszeichen, einmalig |
| 647 | .quote-card::before | 3.5rem | Dekoratives Anfuehrungszeichen, einmalig |
| 668 | .sep-number | 3.4rem | Statistik-Grosszahl, einmalig |
| 3213 | .error-code | 4rem | 404-Fehlercode, einmalig |
| 2980 | .handout-lb-close | 2rem | Close-Button, einmalig |
| 1174 | .exp-3col (font-size:unset) | unset | Reset-Wert, keine Groesse |
| 2090 | body.large-text | 1.125rem | Accessibility-Feature, bewusst abweichend |
| 4625 | .notfall-krisenplan p:first | 1rem | Mobile Override, bereits --fs-base |
| 1370 | .resource-num | 2.1rem | Telefonnummer-Groesse, zwischen Stufen |
| 3813 | .kk-badge | 0.56rem | Extrem klein, Badge-Micro-Text |
| 3742 | .hv-center-sub | 0.6rem | Extrem klein, Diagramm-Mikro |
| 4298 | .ee-center-sub | 0.6rem | Extrem klein, Diagramm-Mikro |
| 3865 | .sl-pillar .sl-p-num | 0.6rem | Extrem klein, Pillar-Mikro |
| 3797 | .kk-axis-label | 0.625rem | Achsen-Label, zwischen Stufen |
| 3801 | .kk-side | 0.625rem | Achsen-Label, zwischen Stufen |
| 3771 | .hv-station .hv-sub (mobile) | 0.62rem | Mobile Diagramm-Mikro |
| 3845 | .kk-q .kk-sub (mobile) | 0.62rem | Mobile Diagramm-Mikro |
| 4423 | .ee-station .ee-sub (mobile) | 0.62rem | Mobile Diagramm-Mikro |
| 3773 | .hv-center-label (mobile) | 0.65rem | Mobile Diagramm-Mikro |
| 4425 | .ee-center-label (mobile) | 0.65rem | Mobile Diagramm-Mikro |
| 3774 | .hv-center-sub (mobile) | 0.55rem | Mobile Diagramm-Mikro |
| 4426 | .ee-center-sub (mobile) | 0.55rem | Mobile Diagramm-Mikro |
| 4835 | .kk-q .kk-sub (mobile) | 0.58rem | Mobile Diagramm-Mikro |

**Total: 31 Ausnahmen**

---

## Zusammenfassung

| Kategorie | Stellen | Aktion |
|---|---|---|
| A: Direkte Migration | 35 | Sofort migrierbar, null/minimales Risiko |
| B: Nahe Migration | 37 | Visuell kaum merkbar, einzeln pruefen |
| C: Neue Variable | 19 | --fs-2xs (18) + --fs-md (1) definieren |
| D: Ausnahme | 31 | Belassen |
| **Total** | **122** | |

## Reichen die 3 neuen Variablen?

**Ja, mit Einschraenkung:**

- **--fs-2xs (0.7rem):** Deckt 18 Stellen ab. Gut.
- **--fs-md (0.95rem):** Deckt nur 1 Stelle ab. Fraglich ob lohnenswert.
- **--fs-xl (1.5rem):** Deckt 6 Stellen ab (in Kat. A). Gut.
- **Kein 4. noetig:** Die Diagramm-Mikro-Werte (0.55-0.65rem) sind zu spezifisch und gehoeren in Kat. D.

**Empfehlung:** --fs-md weglassen (nur 1 Stelle), also **2 neue Variablen** statt 3.
