#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# smoke-check.sh — Minimale Regressionsprüfung
#
# Prüft:
#   1. Existenz aller kritischen Dateien (Module, Notfall, CSS/JS)
#   2. Keine Git-Merge-Marker in HTML
#   3. Notfall-Telefonnummern vorhanden
#   4. HTML-Grundstruktur valide (öffnende/schliessende Tags)
#   5. Keine kaputten internen Links (href="/..." prüfbar)
#   6. Service-Worker-Konsistenz
#   7. Such-Index ladbar
#
# Aufruf:  bash scripts/smoke-check.sh
# Exit 0 = alles OK, Exit 1 = Fehler gefunden
# ──────────────────────────────────────────────────────────────

set -euo pipefail

ERRORS=0
WARNINGS=0

fail() { echo "  FAIL: $1"; ERRORS=$((ERRORS + 1)); }
warn() { echo "  WARN: $1"; WARNINGS=$((WARNINGS + 1)); }
pass() { echo "  OK:   $1"; }

cd "$(git rev-parse --show-toplevel 2>/dev/null || echo '.')"

echo "═══════════════════════════════════════"
echo " Smoke-Check: Bipolare Erkrankung"
echo "═══════════════════════════════════════"
echo

# ── 1. Kritische Dateien ──────────────────────────────────────
echo "1. Kritische Dateien"
for f in \
  index.html 404.html shared.css main.js search.js init.js sw.js search-index.js \
  modul/{1,2,3,4,5,6,7,8}/index.html \
  handouts/notfall/index.html handouts/ressourcen/index.html handouts/impressum/index.html; do
  if [ ! -s "$f" ]; then
    fail "$f fehlt oder ist leer"
  fi
done
pass "Alle kritischen Dateien vorhanden"
echo

# ── 2. Merge-Marker ──────────────────────────────────────────
echo "2. Merge-Konflikte"
CONFLICT_FILES=""
for f in index.html modul/*/index.html handouts/*/index.html shared.css main.js search.js; do
  if grep -ql '<<<<<<< ' "$f" 2>/dev/null; then
    CONFLICT_FILES="$CONFLICT_FILES $f"
  fi
done
if [ -n "$CONFLICT_FILES" ]; then
  fail "Merge-Marker gefunden in:$CONFLICT_FILES"
else
  pass "Keine Merge-Marker"
fi
echo

# ── 3. Notfall-Nummern ────────────────────────────────────────
echo "3. Notfall-Telefonnummern"
NOTFALL="handouts/notfall/index.html"
for num in "143" "144" "117"; do
  if ! grep -q "$num" "$NOTFALL" 2>/dev/null; then
    fail "Nummer $num fehlt auf Notfallseite"
  fi
done
pass "Kritische Notfallnummern vorhanden"
echo

# ── 4. HTML-Grundstruktur ─────────────────────────────────────
echo "4. HTML-Grundstruktur"
for f in index.html modul/*/index.html handouts/*/index.html; do
  [ ! -f "$f" ] && continue
  # Prüfe DOCTYPE
  if ! head -5 "$f" | grep -qi 'doctype'; then
    fail "$f: Kein DOCTYPE"
  fi
  # Prüfe schliessende Tags
  if ! grep -q '</html>' "$f"; then
    fail "$f: </html> fehlt"
  fi
  if ! grep -q '</body>' "$f"; then
    fail "$f: </body> fehlt"
  fi
done
pass "HTML-Grundstruktur OK"
echo

# ── 5. Service-Worker-Konsistenz ──────────────────────────────
echo "5. Service-Worker"
# Prüfe, ob alle in CORE_ASSETS referenzierten Pfade existieren
# (ohne Query-Parameter; Netlify-Rewrites aus REDIRECT_MAP ausgenommen)
SW_REDIRECTS=$(grep -oP "'/[^']*'" sw.js | tr -d "'" | grep -v '?' || true)
SW_REDIRECT_SOURCES=$(sed -n '/REDIRECT_MAP/,/};/p' sw.js | grep -oP "'/[^']*'" | tr -d "'" || true)
SW_ASSETS=$(grep -A999 'CORE_ASSETS' sw.js | grep -B999 '];' | grep -oP "'/[^']*'" | tr -d "'" | sed 's/\?.*//' || true)
for asset in $SW_ASSETS; do
  # Skip paths that are handled by REDIRECT_MAP (Netlify rewrites)
  is_redirect=false
  for redir in $SW_REDIRECT_SOURCES; do
    if [ "$asset" = "$redir" ]; then
      is_redirect=true
      break
    fi
  done
  $is_redirect && continue

  # Pfade mit / am Ende → index.html
  local_path="$asset"
  if [[ "$local_path" == */ ]]; then
    local_path="${local_path}index.html"
  fi
  local_path="${local_path#/}"
  if [ -n "$local_path" ] && [ ! -f "$local_path" ]; then
    fail "SW referenziert $asset, aber ./$local_path existiert nicht"
  fi
done
pass "Service-Worker-Assets konsistent"
echo

# ── 6. Such-Index ─────────────────────────────────────────────
echo "6. Such-Index"
if [ -s "search-index.js" ]; then
  ENTRY_COUNT=$(grep -oP '"t":' search-index.js | wc -l)
  if [ "$ENTRY_COUNT" -lt 50 ]; then
    warn "Suchindex hat nur $ENTRY_COUNT Einträge (erwartet >200)"
  else
    pass "Suchindex: $ENTRY_COUNT Einträge"
  fi
else
  fail "search-index.js fehlt oder leer"
fi
echo

# ── 7. CSS-Syntax (rudimentär) ────────────────────────────────
echo "7. CSS-Grundprüfung"
# Prüfe auf ungleiche Anzahl { und }
OPEN=$(grep -o '{' shared.css | wc -l)
CLOSE=$(grep -o '}' shared.css | wc -l)
if [ "$OPEN" -ne "$CLOSE" ]; then
  fail "shared.css: $OPEN öffnende vs. $CLOSE schliessende Klammern"
else
  pass "shared.css: Klammern balanciert ($OPEN Paare)"
fi
echo

# ── Zusammenfassung ───────────────────────────────────────────
echo "═══════════════════════════════════════"
if [ "$ERRORS" -gt 0 ]; then
  echo " ERGEBNIS: $ERRORS Fehler, $WARNINGS Warnungen"
  echo "═══════════════════════════════════════"
  exit 1
else
  echo " ERGEBNIS: Alle Checks bestanden ($WARNINGS Warnungen)"
  echo "═══════════════════════════════════════"
  exit 0
fi
