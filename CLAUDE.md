# CLAUDE.md — bipolar-psychoedukation-v2

## Project
Static psychoeducation website (PUK Zürich). 8 modules + index + handouts + 404.
No build step. Single `shared.css`, single `main.js`, HTML in `modul/1-8/index.html`.

## Commands
- `npm run build:search` — regenerate `search-index.js` after any HTML content change
- `npm test` — vitest (unit tests in `tests/`)
- Preview: python3 http.server via launch.json config `bipolar-v2` on port 8090
- Deployed on Netlify with CSS/JS/HTML minification enabled (netlify.toml)
- Cache-bust: all HTML files reference `shared.css?v=HASH` and `main.js?v=HASH` — update hash after changes

## Git & Auth
- `gh` binary at `/tmp/gh/gh_2.88.1_macOS_amd64/bin/gh` (authenticated as christaegger-dot)
- Run `/tmp/gh/.../bin/gh auth setup-git` before first push if credentials fail
- Remote: github.com/christaegger-dot/bipolar-psychoedukation-v2
- Commit directly to main (no PR workflow for solo work)

## CSS Architecture
- 124 CSS variables in :root (colors, spacing, typography, shadows, radii)
- Font scale: --fs-2xs(0.7) through --fs-h1(1.9rem), 9 steps. Lora for headings, Source Sans 3 for body.
- Border-radius: 3 tokens (--radius-sm:8px, --radius:12px, --radius-lg:16px)
- 9 mask-icon classes (icon-search, icon-bookmark, icon-settings, check-icon, cross-icon, icon-time, icon-target, icon-chevron, insight-icon)
- Icon fallback pattern: `text-indent:-9999px` with Unicode inside spans
- SVG standards in docs/svg-style-guide.md: stroke-width .5/1/1.5/2, dasharray 4,4 or 6,4
- Interactive SVGs use `role="group"`, decorative use `role="img"` — never nest role="button" inside role="img"
- WCAG contrast: footer links opacity 0.75 (not 0.6), skip-link #5a5048, .quelle/.exp-note use hardcoded color without opacity

## JS Conventions
- Components init via `document.querySelector` — works regardless of which module page loads
- Action handlers use `data-action` attributes, dispatched in main.js actions object
- Interactive components auto-open first item via JS (hvToggle, highlightEE, kkToggle, slToggle)

## Content Conventions
- Reading times: extract text from `class="module-body"` to `<footer`, strip HTML, ÷180 wpm. Don't count full HTML.
- Box types: module-card, vignette, reflexion, m-insight, exp-report, quote-card, acc-item
- Reflexion pattern: `div.reflexion > h4 + p` or `details.reflexion > summary.reflexion-label`
- Sources: quellen-accordion in every module, Schema.org MedicalWebPage on index
- No emojis in UI. Arrows (→↓←↑) OK, but ⌕◈◎✕✓✗◷◉▸ must use CSS mask-icons

## Documentation
- docs/design-review-final-2026-03-22.md — current state, all metrics
- docs/svg-style-guide.md — SVG stroke/color/aria standards
- docs/box-consolidation-map.md — 7 box types and their properties
- docs/font-size-migration.md — var() migration decisions (Kat. A–D)

## Gotchas
- This is v2. The v1 repo (Bipolare-Erkrankung) is separate — don't confuse them
- Preview browser caches aggressively — use `?v=Date.now()` for cache-bust
- `search-index.js` must be regenerated after ANY HTML content edit
- Module TOCs are manually maintained — update after moving sections
- macOS grep has no `-P` (PCRE) flag — use `grep -E` or python3 for regex
