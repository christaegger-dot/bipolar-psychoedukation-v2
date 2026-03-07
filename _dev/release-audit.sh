#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# RELEASE AUDIT — Bipolare Störung Website
# Konsolidiertes Audit-Skript für Go-Live / Deployment-Gating
#
# Prüft alle 9 Bereiche aus PRE-PUBLICATION-AUDIT.md:
#   A — Strukturelle Integrität
#   B — Inhalte und Links
#   C — Visuelle Konsistenz
#   D — Funktionalität
#   E — Accessibility
#   F — Performance / Deployment
#   G — SEO und Meta
#   H — Sicherheit / Datenschutz
#   I — Verifizierung früherer Fixes
#
# Exit-Code: Anzahl ERRORS. Muss 0 sein vor Deploy.
# Usage: ./release-audit.sh [--verbose]
# ═══════════════════════════════════════════════════════════════════
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ── Config ────────────────────────────────────────────────────────
DOMAIN="bipolare-erkrankung-angehoerige.netlify.app"
EXPECTED_HTML=(
  index.html
  404.html
  modul/1/index.html
  modul/2/index.html
  modul/3/index.html
  modul/4/index.html
  modul/5/index.html
  modul/6/index.html
  modul/7/index.html
  handouts/index.html
  handouts/notfall/index.html
  handouts/ressourcen/index.html
  handouts/impressum/index.html
)
EXPECTED_ASSETS=(
  shared.css
  main.js
  search.js
  search-index.js
  sw.js
  manifest.json
  sitemap.xml
  robots.txt
  _redirects
  netlify.toml
)
EXPECTED_FONTS=(
  fonts/lora-v37-latin-regular.woff2
  fonts/lora-v37-latin-600.woff2
  fonts/source-sans-3-v19-latin-regular.woff2
  fonts/source-sans-3-v19-latin-600.woff2
)
EXPECTED_ICONS=(
  images/icon-192.png
  images/icon-512.png
)

VERBOSE=false
[[ "${1:-}" == "--verbose" ]] && VERBOSE=true

# ── Counters & Helpers ────────────────────────────────────────────
ERRORS=0
WARNINGS=0
PASS=0

red()    { printf '\033[0;31m%s\033[0m\n' "$*"; }
yellow() { printf '\033[0;33m%s\033[0m\n' "$*"; }
green()  { printf '\033[0;32m%s\033[0m\n' "$*"; }
bold()   { printf '\033[1m%s\033[0m\n' "$*"; }

err() {
  red "  ✗ [$1] $2"
  ERRORS=$((ERRORS + 1))
}

wrn() {
  yellow "  ⚠ [$1] $2"
  WARNINGS=$((WARNINGS + 1))
}

ok() {
  PASS=$((PASS + 1))
  $VERBOSE && green "  ✓ [$1] $2" || true
}

section() {
  echo ""
  bold "═══ $1 ═══"
}

# ═══════════════════════════════════════════════════════════════════
# A — STRUKTURELLE INTEGRITÄT
# ═══════════════════════════════════════════════════════════════════
section "A — Strukturelle Integrität"

# A1: All expected HTML files exist
for f in "${EXPECTED_HTML[@]}"; do
  if [[ -f "$f" ]]; then
    ok "A1" "$f exists"
  else
    err "A1" "Missing HTML file: $f"
  fi
done

# A2: All expected assets exist
for f in "${EXPECTED_ASSETS[@]}"; do
  if [[ -f "$f" ]]; then
    ok "A2" "$f exists"
  else
    err "A2" "Missing asset: $f"
  fi
done

# A3: HTML tag balance (div, section, nav, main, header, footer)
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  for tag in div section nav main header footer; do
    open=$(grep -o "<${tag}[> ]" "$f" 2>/dev/null | wc -l)
    close=$(grep -o "</${tag}>" "$f" 2>/dev/null | wc -l)
    if [[ "$open" -ne "$close" ]]; then
      err "A3" "$f: <$tag> balance mismatch (open=$open close=$close)"
    fi
  done
done
ok "A3" "HTML tag balance checked across all files"

# A4: DOCTYPE, lang, charset, viewport, title, h1
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  content=$(cat "$f")
  [[ "$content" == *'<!DOCTYPE html>'* ]] || err "A4" "$f: Missing <!DOCTYPE html>"
  [[ "$content" == *'lang="de-CH"'* ]]    || err "A4" "$f: Missing lang=\"de-CH\""
  echo "$content" | grep -qi 'charset="UTF-8"\|charset="utf-8"' || err "A4" "$f: Missing charset UTF-8"
  [[ "$content" == *'name="viewport"'* ]]  || err "A4" "$f: Missing viewport meta"
  [[ "$content" == *'<title>'* ]]          || err "A4" "$f: Missing <title>"

  h1_count=$(grep -o '<h1' "$f" 2>/dev/null | wc -l)
  if [[ "$h1_count" -ne 1 ]]; then
    err "A4" "$f: Expected exactly 1 <h1>, found $h1_count"
  fi
done
ok "A4" "HTML grundstruktur checked"

# A5: CSS bracket balance
if [[ -f shared.css ]]; then
  open_braces=$(tr -cd '{' < shared.css | wc -c)
  close_braces=$(tr -cd '}' < shared.css | wc -c)
  if [[ "$open_braces" -ne "$close_braces" ]]; then
    err "A5" "shared.css bracket mismatch: { =$open_braces } =$close_braces"
  else
    ok "A5" "shared.css brackets balanced ($open_braces/$close_braces)"
  fi
fi

# A6: JS files referenced in HTML exist
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  for js in $(grep -oP 'src="/?([^"]+\.js)"' "$f" | sed 's/src="//;s/"//' | sed 's|^/||'); do
    if [[ ! -f "$js" ]]; then
      err "A6" "$f: Referenced JS file not found: $js"
    fi
  done
done
ok "A6" "JS references checked"

# A7: No console.log/debug/error in production JS
for js in main.js search.js sw.js; do
  [[ -f "$js" ]] || continue
  if grep -qE 'console\.(log|debug|error|warn)\(' "$js" 2>/dev/null; then
    count=$(grep -cE 'console\.(log|debug|error|warn)\(' "$js" 2>/dev/null || echo 0)
    wrn "A7" "$js: $count console.* statement(s) found"
  else
    ok "A7" "$js: No console statements"
  fi
done

# A8: No TODO/FIXME/HACK in code files
for f in main.js search.js sw.js shared.css "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  if grep -qiE '\b(TODO|FIXME|HACK|XXX)\b' "$f" 2>/dev/null; then
    matches=$(grep -ciE '\b(TODO|FIXME|HACK|XXX)\b' "$f" 2>/dev/null || echo 0)
    wrn "A8" "$f: $matches TODO/FIXME/HACK marker(s)"
  fi
done
ok "A8" "Code markers checked"

# ═══════════════════════════════════════════════════════════════════
# B — INHALTE UND LINKS
# ═══════════════════════════════════════════════════════════════════
section "B — Inhalte und Links"

# B1: Internal module links — all 7 module dirs exist
for i in $(seq 1 7); do
  if [[ -d "modul/$i" ]]; then
    ok "B1" "modul/$i/ exists"
  else
    err "B1" "Module directory missing: modul/$i/"
  fi
done

# B2: Handout directories exist
for d in handouts handouts/notfall handouts/ressourcen handouts/impressum; do
  if [[ -d "$d" ]]; then
    ok "B2" "$d/ exists"
  else
    err "B2" "Handout directory missing: $d/"
  fi
done

# B3: _redirects shortcuts
if [[ -f _redirects ]]; then
  for i in $(seq 1 7); do
    if grep -q "^/m${i} " _redirects; then
      ok "B3" "Redirect /m$i defined"
    else
      err "B3" "Missing redirect for /m$i"
    fi
  done
  for path in notfall impressum ressourcen; do
    if grep -q "/${path}" _redirects; then
      ok "B3" "Redirect /$path defined"
    else
      err "B3" "Missing redirect for /$path"
    fi
  done
fi

# B4: No old domain references
OLD_DOMAINS=("bipolar-angehoerige01" "bipolar-psychoedukation-puk")
for domain in "${OLD_DOMAINS[@]}"; do
  for f in "${EXPECTED_HTML[@]}" main.js search.js sitemap.xml robots.txt; do
    [[ -f "$f" ]] || continue
    if grep -q "$domain" "$f" 2>/dev/null; then
      err "B4" "$f: Contains old domain reference '$domain'"
    fi
  done
done
ok "B4" "No old domain references"

# B5: No Eszett (ß) — Swiss German uses "ss"
for f in "${EXPECTED_HTML[@]}" main.js search.js search-index.js shared.css; do
  [[ -f "$f" ]] || continue
  if grep -qP 'ß' "$f" 2>/dev/null; then
    count=$(grep -cP 'ß' "$f" 2>/dev/null || echo 0)
    err "B5" "$f: Contains $count line(s) with Eszett (ß) — use 'ss'"
  fi
done
ok "B5" "Eszett check done"

# B6: No Lorem ipsum / placeholder text
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  if grep -qi 'lorem ipsum' "$f" 2>/dev/null; then
    err "B6" "$f: Contains 'Lorem ipsum' placeholder"
  fi
done
ok "B6" "No placeholder text"

# B7: All tel: links have valid format
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  while IFS= read -r tel; do
    # Accept Swiss short numbers (3 digits), 0800/0848 numbers, +41 format, local numbers
    if [[ ! "$tel" =~ ^tel:((\+41[0-9\ ]+)|([0-9]{3,10})|([0-9]{4}\ [0-9]{2}\ [0-9]{2}\ [0-9]{2}))$ ]]; then
      wrn "B7" "$f: Unusual tel: format — $tel"
    fi
  done < <(grep -oP 'href="(tel:[^"]+)"' "$f" 2>/dev/null | sed 's/href="//;s/"$//' || true)
done
ok "B7" "Tel links checked"

# ═══════════════════════════════════════════════════════════════════
# C — VISUELLE KONSISTENZ
# ═══════════════════════════════════════════════════════════════════
section "C — Visuelle Konsistenz"

# C1: Font files exist
for f in "${EXPECTED_FONTS[@]}"; do
  if [[ -f "$f" ]]; then
    ok "C1" "$f exists"
  else
    err "C1" "Missing font: $f"
  fi
done

# C2: font-display: swap in HTML (inline @font-face) or CSS
swap_found=false
for f in index.html shared.css; do
  [[ -f "$f" ]] || continue
  if grep -q 'font-display:swap\|font-display: swap' "$f" 2>/dev/null; then
    swap_found=true
  fi
done
if $swap_found; then
  ok "C2" "font-display: swap present"
else
  wrn "C2" "font-display: swap not found"
fi

# C3: CSS custom properties for module colors (--m1 through --m7)
if [[ -f shared.css ]]; then
  for i in $(seq 1 7); do
    if grep -q "\-\-m${i}" shared.css 2>/dev/null; then
      ok "C3" "CSS variable --m$i defined"
    else
      err "C3" "CSS variable --m$i missing from shared.css"
    fi
  done
fi

# C4: Dark mode block exists
if [[ -f shared.css ]]; then
  if grep -q 'prefers-color-scheme:\s*dark' shared.css 2>/dev/null; then
    ok "C4" "Dark mode media query present"
  else
    err "C4" "No dark mode (prefers-color-scheme: dark) in shared.css"
  fi
fi

# C5: Reduced motion support
if [[ -f shared.css ]]; then
  if grep -q 'prefers-reduced-motion' shared.css 2>/dev/null; then
    ok "C5" "prefers-reduced-motion media query present"
  else
    wrn "C5" "No prefers-reduced-motion in shared.css"
  fi
fi

# C6: Font preloading in HTML
for f in index.html; do
  [[ -f "$f" ]] || continue
  if grep -q 'rel="preload"' "$f" 2>/dev/null && grep -q 'as="font"' "$f" 2>/dev/null; then
    ok "C6" "Font preloading found in $f"
  else
    wrn "C6" "$f: No font preload links found"
  fi
done

# ═══════════════════════════════════════════════════════════════════
# D — FUNKTIONALITÄT
# ═══════════════════════════════════════════════════════════════════
section "D — Funktionalität"

# D1: Notfall button on all pages
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  if grep -q 'notfall' "$f" 2>/dev/null; then
    ok "D1" "$f: Notfall element present"
  else
    err "D1" "$f: No Notfall element found"
  fi
done

# D2: Emergency numbers present (117, 143, 144)
EMERGENCY_NUMBERS=("117" "143" "144")
for f in handouts/notfall/index.html; do
  [[ -f "$f" ]] || continue
  for num in "${EMERGENCY_NUMBERS[@]}"; do
    if grep -q "$num" "$f" 2>/dev/null; then
      ok "D2" "$f: Emergency number $num present"
    else
      err "D2" "$f: Missing emergency number $num"
    fi
  done
done

# D3: Key JS functions defined in main.js
KEY_FUNCTIONS=(
  "toggleNotfall"
  "toggleNav"
  "waSelect"
  "toggleBookmarks"
)
if [[ -f main.js ]]; then
  for fn in "${KEY_FUNCTIONS[@]}"; do
    if grep -q "function ${fn}\b\|function ${fn}(" main.js 2>/dev/null; then
      ok "D3" "Function $fn() defined"
    else
      err "D3" "Function $fn() NOT found in main.js"
    fi
  done
fi

# D4: Search functionality
if [[ -f search.js ]]; then
  ok "D4" "search.js exists"
else
  err "D4" "search.js missing"
fi
if [[ -f search-index.js ]]; then
  size=$(wc -c < search-index.js)
  if [[ "$size" -gt 1000 ]]; then
    ok "D4" "search-index.js has content ($size bytes)"
  else
    err "D4" "search-index.js seems too small ($size bytes)"
  fi
else
  err "D4" "search-index.js missing"
fi

# D5: Service Worker
if [[ -f sw.js ]]; then
  ok "D5" "sw.js exists"
  # Check SW registration in HTML
  sw_registered=false
  for f in "${EXPECTED_HTML[@]}"; do
    [[ -f "$f" ]] || continue
    if grep -q "serviceWorker" "$f" 2>/dev/null || grep -q "sw.js" "$f" 2>/dev/null; then
      sw_registered=true
      break
    fi
  done
  if $sw_registered; then
    ok "D5" "SW registration found in HTML"
  else
    # Check main.js for SW registration
    if grep -q "serviceWorker" main.js 2>/dev/null; then
      ok "D5" "SW registration found in main.js"
    else
      wrn "D5" "No SW registration found"
    fi
  fi
else
  err "D5" "sw.js missing"
fi

# D6: manifest.json valid JSON
if [[ -f manifest.json ]]; then
  if python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null; then
    ok "D6" "manifest.json is valid JSON"
  else
    err "D6" "manifest.json is not valid JSON"
  fi
fi

# ═══════════════════════════════════════════════════════════════════
# E — ACCESSIBILITY
# ═══════════════════════════════════════════════════════════════════
section "E — Accessibility"

# E1: Skip links present
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  if grep -qi 'skip' "$f" 2>/dev/null && grep -q 'class="skip' "$f" 2>/dev/null; then
    ok "E1" "$f: Skip link present"
  else
    wrn "E1" "$f: No skip link found"
  fi
done

# E2: ARIA attributes on interactive elements
if [[ -f main.js ]]; then
  if grep -q 'aria-expanded' main.js 2>/dev/null; then
    ok "E2" "aria-expanded toggling in main.js"
  else
    wrn "E2" "No aria-expanded toggling found in main.js"
  fi
fi

# E3: No positive tabindex values (accessibility anti-pattern)
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  if grep -qP 'tabindex="[1-9]' "$f" 2>/dev/null; then
    err "E3" "$f: Positive tabindex found (anti-pattern)"
  fi
done
ok "E3" "No positive tabindex values"

# E4: Images have alt attributes
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  # Find <img> tags without alt
  img_total=$(grep -o '<img[^>]*>' "$f" 2>/dev/null | wc -l)
  img_with_alt=$(grep -o '<img[^>]*alt=' "$f" 2>/dev/null | wc -l)
  img_no_alt=$((img_total - img_with_alt))
  if [[ "$img_no_alt" -gt 0 ]]; then
    err "E4" "$f: $img_no_alt <img> tag(s) without alt attribute"
  fi
done
ok "E4" "Image alt attributes checked"

# E5: Heading hierarchy — no jumps (h1→h3 without h2)
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  headings=$(grep -oP '<h[1-6]' "$f" 2>/dev/null | sed 's/<h//' | tr '\n' ' ')
  prev=0
  skip=false
  for h in $headings; do
    if [[ $h -gt $((prev + 1)) ]] && [[ $prev -gt 0 ]]; then
      wrn "E5" "$f: Heading jump h$prev → h$h"
      skip=true
    fi
    prev=$h
  done
done
$skip || ok "E5" "Heading hierarchy OK"

# ═══════════════════════════════════════════════════════════════════
# F — PERFORMANCE / DEPLOYMENT
# ═══════════════════════════════════════════════════════════════════
section "F — Performance / Deployment"

# F1: shared.css size check (warn if > 200KB)
if [[ -f shared.css ]]; then
  css_size=$(wc -c < shared.css)
  css_kb=$((css_size / 1024))
  if [[ $css_kb -gt 200 ]]; then
    wrn "F1" "shared.css is ${css_kb}KB (consider optimizing)"
  else
    ok "F1" "shared.css size OK (${css_kb}KB)"
  fi
fi

# F2: Icons for PWA
for f in "${EXPECTED_ICONS[@]}"; do
  if [[ -f "$f" ]]; then
    ok "F2" "$f exists"
  else
    err "F2" "Missing PWA icon: $f"
  fi
done

# F3: OG images exist
og_images_found=0
og_images_missing=0
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  while IFS= read -r img; do
    img_path=$(echo "$img" | sed "s|https://${DOMAIN}/||;s|^/||")
    if [[ -f "$img_path" ]]; then
      og_images_found=$((og_images_found + 1))
    else
      err "F3" "$f: OG image not found locally: $img_path"
      og_images_missing=$((og_images_missing + 1))
    fi
  done < <(grep -oP 'property="og:image"\s+content="[^"]*"' "$f" 2>/dev/null | grep -oP 'content="\K[^"]+' || true)
done
if [[ $og_images_missing -eq 0 ]]; then
  ok "F3" "All OG images present ($og_images_found found)"
fi

# F4: netlify.toml has security headers
if [[ -f netlify.toml ]]; then
  for header in "X-Frame-Options" "X-Content-Type-Options" "Content-Security-Policy"; do
    if grep -q "$header" netlify.toml 2>/dev/null; then
      ok "F4" "Security header $header configured"
    else
      err "F4" "Missing security header: $header in netlify.toml"
    fi
  done
fi

# F5: 404 page configured
if [[ -f 404.html ]]; then
  ok "F5" "Custom 404 page exists"
else
  err "F5" "Missing 404.html"
fi

# ═══════════════════════════════════════════════════════════════════
# G — SEO UND META
# ═══════════════════════════════════════════════════════════════════
section "G — SEO und Meta"

# G1: All pages have title and meta description
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  if ! grep -q '<title>' "$f" 2>/dev/null; then
    err "G1" "$f: Missing <title>"
  fi
  if ! grep -q 'name="description"' "$f" 2>/dev/null; then
    err "G1" "$f: Missing meta description"
  fi
done
ok "G1" "Title and description checked"

# G2: Canonical URLs on correct domain
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  canonical=$(grep -oP 'rel="canonical"\s+href="\K[^"]+' "$f" 2>/dev/null || true)
  if [[ -n "$canonical" ]]; then
    if [[ "$canonical" != *"$DOMAIN"* ]]; then
      err "G2" "$f: Canonical URL not on $DOMAIN: $canonical"
    else
      ok "G2" "$f: Canonical OK"
    fi
  else
    wrn "G2" "$f: No canonical URL"
  fi
done

# G3: OG tags present
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  for tag in "og:title" "og:description" "og:url" "og:image"; do
    if ! grep -q "property=\"${tag}\"" "$f" 2>/dev/null; then
      err "G3" "$f: Missing $tag"
    fi
  done
done
ok "G3" "OG tags checked"

# G4: Twitter cards
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  if ! grep -q 'twitter:card' "$f" 2>/dev/null; then
    wrn "G4" "$f: Missing twitter:card meta"
  fi
done
ok "G4" "Twitter cards checked"

# G5: sitemap.xml references correct domain
if [[ -f sitemap.xml ]]; then
  if grep -q "$DOMAIN" sitemap.xml; then
    ok "G5" "sitemap.xml references correct domain"
  else
    err "G5" "sitemap.xml does not reference $DOMAIN"
  fi
  # Count URLs in sitemap
  url_count=$(grep -c '<loc>' sitemap.xml 2>/dev/null || echo 0)
  if [[ "$url_count" -lt 10 ]]; then
    wrn "G5" "sitemap.xml has only $url_count URLs (expected ~12)"
  else
    ok "G5" "sitemap.xml has $url_count URLs"
  fi
fi

# G6: robots.txt references correct sitemap
if [[ -f robots.txt ]]; then
  if grep -q "$DOMAIN/sitemap.xml" robots.txt; then
    ok "G6" "robots.txt sitemap URL correct"
  else
    err "G6" "robots.txt sitemap URL missing or incorrect"
  fi
fi

# G7: JSON-LD structured data on key pages
for f in index.html modul/1/index.html; do
  [[ -f "$f" ]] || continue
  if grep -q 'application/ld+json' "$f" 2>/dev/null; then
    ok "G7" "$f: JSON-LD present"
  else
    wrn "G7" "$f: No JSON-LD structured data"
  fi
done

# ═══════════════════════════════════════════════════════════════════
# H — SICHERHEIT / DATENSCHUTZ
# ═══════════════════════════════════════════════════════════════════
section "H — Sicherheit / Datenschutz"

# H1: No external scripts (CDN)
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  ext_scripts=$(grep -oP '<script[^>]+src="https?://[^"]*"' "$f" 2>/dev/null | wc -l)
  if [[ "$ext_scripts" -gt 0 ]]; then
    err "H1" "$f: $ext_scripts external script(s) found"
  fi
done
ok "H1" "No external scripts"

# H2: No external stylesheets
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  ext_css=$(grep -oP '<link[^>]+href="https?://[^"]*\.css"' "$f" 2>/dev/null | wc -l)
  if [[ "$ext_css" -gt 0 ]]; then
    err "H2" "$f: $ext_css external stylesheet(s) found"
  fi
done
ok "H2" "No external stylesheets"

# H3: No tracking / analytics scripts
for f in "${EXPECTED_HTML[@]}" main.js; do
  [[ -f "$f" ]] || continue
  for tracker in "google-analytics" "gtag(" "fbq(" "analytics.js" "_paq" "hotjar" "mixpanel"; do
    if grep -qi "$tracker" "$f" 2>/dev/null; then
      err "H3" "$f: Tracking reference found: $tracker"
    fi
  done
done
ok "H3" "No tracking scripts"

# H4: No API keys / tokens in code
for f in "${EXPECTED_HTML[@]}" main.js search.js sw.js; do
  [[ -f "$f" ]] || continue
  if grep -qiE '(api[_-]?key|secret[_-]?key|access[_-]?token|bearer)\s*[:=]' "$f" 2>/dev/null; then
    err "H4" "$f: Potential API key/token found"
  fi
done
ok "H4" "No API keys in code"

# H5: Email anti-scrape (no plaintext email in HTML)
email_exposed=false
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  # Check for plaintext email in href="mailto:" (should use JS obfuscation)
  if grep -qP 'href="mailto:[^"]+@[^"]+"' "$f" 2>/dev/null; then
    wrn "H5" "$f: Plaintext mailto: link found (consider JS obfuscation)"
    email_exposed=true
  fi
done
$email_exposed || ok "H5" "Email addresses protected"

# H6: Impressum page exists
if [[ -f handouts/impressum/index.html ]]; then
  ok "H6" "Impressum page exists"
else
  err "H6" "Impressum page missing"
fi

# ═══════════════════════════════════════════════════════════════════
# I — VERIFIZIERUNG FRÜHERER FIXES
# ═══════════════════════════════════════════════════════════════════
section "I — Verifizierung früherer Fixes"

# I1: No ß (duplicate of B5 but explicit regression check)
eszett_found=false
for f in "${EXPECTED_HTML[@]}" main.js search.js search-index.js shared.css; do
  [[ -f "$f" ]] || continue
  if grep -qP 'ß' "$f" 2>/dev/null; then
    err "I1" "$f: Regression — Eszett (ß) found"
    eszett_found=true
  fi
done
$eszett_found || ok "I1" "No Eszett regression"

# I2: All canonical/og/sitemap URLs on correct domain
bad_domain=false
for f in "${EXPECTED_HTML[@]}" sitemap.xml; do
  [[ -f "$f" ]] || continue
  for old in "bipolar-angehoerige01" "bipolar-psychoedukation-puk"; do
    if grep -q "$old" "$f" 2>/dev/null; then
      err "I2" "$f: Old domain reference '$old'"
      bad_domain=true
    fi
  done
done
$bad_domain || ok "I2" "No old domain regressions"

# I3: Print stylesheet exists
if [[ -f shared.css ]]; then
  if grep -q '@media print' shared.css 2>/dev/null; then
    ok "I3" "Print stylesheet present in shared.css"
  else
    wrn "I3" "No @media print block in shared.css"
  fi
fi

# I4: Twitter card URLs on correct domain
twitter_ok=true
for f in "${EXPECTED_HTML[@]}"; do
  [[ -f "$f" ]] || continue
  twitter_img=$(grep -oP 'name="twitter:image"\s+content="\K[^"]+' "$f" 2>/dev/null || true)
  if [[ -n "$twitter_img" ]] && [[ "$twitter_img" != *"$DOMAIN"* ]]; then
    err "I4" "$f: Twitter image URL not on $DOMAIN"
    twitter_ok=false
  fi
done
$twitter_ok && ok "I4" "Twitter card URLs correct"

# I5: search-index.js uses "ss" not "ß"
if [[ -f search-index.js ]]; then
  if grep -qP 'ß' search-index.js 2>/dev/null; then
    err "I5" "search-index.js: Contains ß (should use ss)"
  else
    ok "I5" "search-index.js: No ß"
  fi
fi

# ═══════════════════════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════════════════════
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
bold "  RELEASE AUDIT — ERGEBNIS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
green "  ✓ Bestanden: $PASS"
yellow "  ⚠ Warnungen: $WARNINGS"
if [[ $ERRORS -gt 0 ]]; then
  red "  ✗ Fehler:    $ERRORS"
  echo ""
  red "  NICHT BEREIT — $ERRORS Fehler müssen behoben werden."
else
  echo "  ✗ Fehler:    0"
  echo ""
  green "  ✅ BEREIT FÜR DEPLOYMENT"
fi
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit $ERRORS
