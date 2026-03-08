#!/usr/bin/env bash
# release-audit.sh — Prüft ob alle Fixes auf der deployed Seite angekommen sind.
# Kann gegen lokale Dateien (default) oder eine Live-URL laufen.
#
# Usage:
#   ./scripts/release-audit.sh              # prüft lokale Dateien
#   ./scripts/release-audit.sh --live URL   # prüft Live-Seite via curl

set -uo pipefail

PASS=0
FAIL=0
WARN=0
TOTAL=12

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m'

ok()   { echo -e "${GREEN}✅ CHECK $1: $2${NC}"; ((PASS++)); }
fail() { echo -e "${RED}❌ CHECK $1: $2${NC}"; ((FAIL++)); }
warn() { echo -e "${YELLOW}⚠️  CHECK $1: $2${NC}"; ((WARN++)); }
info() { echo -e "   $1"; }

# Extract text between <tag ...> and </tag> for a given tag
extract_tag() {
  local tag="$1"
  sed -n "s/.*<${tag}[^>]*>\([^<]*\)<\/${tag}>.*/\1/p" | head -1
}

# Extract attribute value: extract_attr "data-module"
extract_attr() {
  local attr="$1"
  sed -n "s/.*${attr}=\"\([^\"]*\)\".*/\1/p" | head -1
}

# Determine source: local files or live URL
MODE="local"
BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [[ "${1:-}" == "--live" ]] && [[ -n "${2:-}" ]]; then
  MODE="live"
  BASE_URL="${2%/}"
  echo -e "${BOLD}Release Audit — Live: $BASE_URL${NC}"
  echo ""
  fetch() { curl -sL -A "Mozilla/5.0" "$BASE_URL$1" 2>/dev/null; }
else
  echo -e "${BOLD}Release Audit — Lokal: $BASE_DIR${NC}"
  echo ""
  fetch() { cat "$BASE_DIR$1" 2>/dev/null || echo ""; }
fi

# ── CHECK 1: Toter PDF-Link M5 ──
content=$(fetch "/modul/5/index.html")
if echo "$content" | grep -q 'krisenplan-vorlage-bipolare-stoerung-puk-zuerich\.pdf'; then
  if echo "$content" | grep -q 'krisenplan-vorlage-puk\.pdf'; then
    fail 1 "Neuer PDF-Name vorhanden, aber ALTER Name auch noch da"
  else
    ok 1 "PDF-Link M5 korrekt (neuer Name)"
  fi
else
  fail 1 "krisenplan-vorlage-bipolare-stoerung-puk-zuerich.pdf NICHT gefunden"
  if echo "$content" | grep -q 'krisenplan-vorlage-puk\.pdf'; then
    info "Stattdessen: krisenplan-vorlage-puk.pdf (alter Name)"
  fi
fi

# ── CHECK 2: Handout-Zuordnungen ──
content=$(fetch "/handouts/index.html")
c2_ok=true
a4_mod=$(echo "$content" | grep 'a4_ambiguous_loss' | extract_attr 'data-module')
a5_mod=$(echo "$content" | grep 'a5_affiliate_stigma' | extract_attr 'data-module')
b10_mod=$(echo "$content" | grep 'b10_trennung_scheidung' | extract_attr 'data-module')

[[ "$a4_mod" != "m3" ]]  && c2_ok=false && info "a4_ambiguous_loss: data-module=$a4_mod (SOLL: m3)"
[[ "$a5_mod" != "m4" ]]  && c2_ok=false && info "a5_affiliate_stigma: data-module=$a5_mod (SOLL: m4)"
[[ "$b10_mod" != "m2" ]] && c2_ok=false && info "b10_trennung_scheidung: data-module=$b10_mod (SOLL: m2)"

if $c2_ok; then ok 2 "Handout-Zuordnungen korrekt"; else fail 2 "Handout-Zuordnungen falsch"; fi

# ── CHECK 3: Notfallnummern ──
content=$(fetch "/handouts/notfall/index.html")
c3_ok=true
echo "$content" | grep -qE '058 384 20 00|\+41583842000' || { c3_ok=false; info "058 384 20 00 (PUK Notfall Erwachsene) NICHT auf Notfall-Seite"; }
echo "$content" | grep -qE '058 384 38 00|\+41583843800' || { c3_ok=false; info "058 384 38 00 (Fachstelle) NICHT auf Notfall-Seite"; }

if $c3_ok; then ok 3 "Notfallnummern vorhanden"; else fail 3 "Notfallnummern fehlen auf /notfall/"; fi

# ── CHECK 4: Titel-Konsistenz ──
c4_ok=true
for check in "2|Wie Beziehungen unter Druck geraten" "5|Was hilft: Selbstfürsorge und Handeln" "6|Zusammen stark: Resilienz und Paardynamik"; do
  mod="${check%%|*}"
  expected="${check#*|}"
  content=$(fetch "/modul/$mod/index.html")
  h1=$(echo "$content" | extract_tag 'h1')
  if [[ "$h1" != "$expected" ]]; then
    c4_ok=false
    info "M$mod h1=\"$h1\" (SOLL: \"$expected\")"
  fi
done
if $c4_ok; then ok 4 "Titel-Konsistenz korrekt"; else fail 4 "h1-Titel stimmen nicht"; fi

# ── CHECK 5: M5 Merken-Kasten ──
content=$(fetch "/modul/5/index.html")
c5_ok=true
echo "$content" | grep -q 'Merken Sie sich' || { c5_ok=false; info "\"Merken Sie sich\" NICHT gefunden"; }
echo "$content" | grep -q 'Weiter zu Modul 6' || { c5_ok=false; info "\"Weiter zu Modul 6\" NICHT gefunden"; }
if $c5_ok; then ok 5 "M5 Merken-Kasten vorhanden"; else fail 5 "M5 Merken-Kasten fehlt"; fi

# ── CHECK 6: Glossar ──
content=$(fetch "/handouts/ressourcen/index.html")
count=$(echo "$content" | grep -c 'glossar-item' || true)
c6_ok=true
[[ "$count" -ne 21 ]] && { c6_ok=false; info "glossar-item Anzahl: $count (SOLL: 21)"; }
echo "$content" | grep -q 'Anosognosie' || { c6_ok=false; info "Anosognosie NICHT gefunden"; }
echo "$content" | grep -q 'Schweigepflichtentbindung' || { c6_ok=false; info "Schweigepflichtentbindung NICHT gefunden"; }
echo "$content" | grep -q 'Lithium' || { c6_ok=false; info "Lithium NICHT gefunden"; }
if $c6_ok; then ok 6 "Glossar vollständig (21 Einträge)"; else fail 6 "Glossar unvollständig"; fi

# ── CHECK 7: OG-Images ──
c7_ok=true
for img in og-handouts.png og-notfall.png og-ressourcen.png; do
  if [[ "$MODE" == "local" ]]; then
    [[ ! -f "$BASE_DIR/images/$img" ]] && { c7_ok=false; info "$img NICHT vorhanden"; }
  else
    status=$(curl -sL -o /dev/null -w "%{http_code}" "$BASE_URL/images/$img" 2>/dev/null)
    [[ "$status" != "200" ]] && { c7_ok=false; info "$img → HTTP $status"; }
  fi
done
if $c7_ok; then ok 7 "OG-Images vorhanden"; else fail 7 "OG-Images fehlen"; fi

# ── CHECK 8: Search-Index ──
c8_ok=true
si_file="$BASE_DIR/search-index.js"
if [[ "$MODE" == "live" ]]; then
  si_file=$(mktemp); curl -sL -A "Mozilla/5.0" "$BASE_URL/search-index.js" > "$si_file" 2>/dev/null
fi
grep -q 'Loyalitätskonflikte und Expressed Emotion' "$si_file" && { c8_ok=false; info "ALTER M4-Titel noch im Index"; }
grep -q 'Loyalitätskonflikte und Beziehungsstress' "$si_file" || { c8_ok=false; info "NEUER M4-Titel NICHT im Index"; }

# Count "Beobachten, begleiten, loslassen" in non-M1 entries
non_m1=$(grep -o '"m":[2-7][^}]*Beobachten, begleiten, loslassen' "$si_file" | wc -l || true)
[[ "$non_m1" -gt 0 ]] && { c8_ok=false; info "\"Beobachten, begleiten, loslassen\" in $non_m1 Nicht-M1-Einträgen"; }

if $c8_ok; then ok 8 "Search-Index korrekt"; else fail 8 "Search-Index fehlerhaft"; fi

# ── CHECK 9: CSS Cleanup ──
c9_ok=true
css_file="$BASE_DIR/shared.css"
if [[ "$MODE" == "live" ]]; then
  css_file=$(mktemp); curl -sL -A "Mozilla/5.0" "$BASE_URL/shared.css" > "$css_file" 2>/dev/null
fi
grep -q '\.cta-btn' "$css_file" && { c9_ok=false; info ".cta-btn noch vorhanden"; }
grep -q '\.module-number' "$css_file" && { c9_ok=false; info ".module-number noch vorhanden"; }
grep -q -- '--shadow-sm' "$css_file" || { c9_ok=false; info "--shadow-sm NICHT gefunden"; }
if $c9_ok; then ok 9 "CSS Cleanup korrekt"; else fail 9 "CSS Cleanup unvollständig"; fi

# ── CHECK 10: Service Worker ──
content=$(fetch "/sw.js")
c10_ok=true
echo "$content" | grep -q 'skipWaiting' || { c10_ok=false; info "skipWaiting NICHT gefunden"; }
echo "$content" | grep -q 'clients\.claim' || { c10_ok=false; info "clients.claim NICHT gefunden"; }
version=$(echo "$content" | sed -n "s/.*CACHE_NAME\s*=\s*'\([^']*\)'.*/\1/p" | head -1)
info "Cache-Version: $version"
if $c10_ok; then ok 10 "Service Worker korrekt"; else fail 10 "Service Worker fehlerhaft"; fi

# ── CHECK 11: Redirects ──
if [[ "$MODE" == "live" ]]; then
  status=$(curl -sL -o /dev/null -w "%{http_code}" "$BASE_URL/notfall/" 2>/dev/null)
  redir=$(curl -s -o /dev/null -w "%{redirect_url}" "$BASE_URL/notfall/" 2>/dev/null)
  if [[ "$status" == "200" ]] && [[ -z "$redir" ]]; then
    ok 11 "/notfall/ liefert 200 (Rewrite)"
  else
    fail 11 "/notfall/ liefert $status (SOLL: 200 Rewrite)"
    [[ -n "$redir" ]] && info "Redirect zu: $redir"
  fi
else
  redirects=$(cat "$BASE_DIR/_redirects" 2>/dev/null || echo "")
  if echo "$redirects" | grep -qE '/notfall/.*301'; then
    fail 11 "/notfall/ nutzt 301 Redirect (SOLL: 200 Rewrite)"
    info "$(echo "$redirects" | grep '/notfall/' | head -1)"
  elif echo "$redirects" | grep -qE '/notfall/.*200'; then
    ok 11 "/notfall/ nutzt 200 Rewrite"
  else
    warn 11 "Keine Redirect-Regel für /notfall/ gefunden"
  fi
fi

# ── CHECK 12: h1 ≠ h2 auf allen Modulen ──
c12_ok=true
for i in 1 2 3 4 5 6 7; do
  content=$(fetch "/modul/$i/index.html")
  h1=$(echo "$content" | extract_tag 'h1')
  h2=$(echo "$content" | extract_tag 'h2')
  if [[ -n "$h1" ]] && [[ "$h1" == "$h2" ]]; then
    c12_ok=false
    info "M$i: h1=h2=\"$h1\" (IDENTISCH)"
  fi
done
if $c12_ok; then ok 12 "h1≠h2 auf allen Modulen"; else fail 12 "h1=h2 auf einigen Modulen"; fi

# ── Summary ──
echo ""
echo -e "${BOLD}════════════════════════════════════════${NC}"
echo -e "${BOLD}GESAMT: ${GREEN}$PASS${NC}${BOLD}/$TOTAL bestanden${NC}"
[[ $FAIL -gt 0 ]] && echo -e "${RED}$FAIL fehlgeschlagen${NC}"
[[ $WARN -gt 0 ]] && echo -e "${YELLOW}$WARN Warnungen${NC}"
echo -e "${BOLD}════════════════════════════════════════${NC}"

exit $FAIL
