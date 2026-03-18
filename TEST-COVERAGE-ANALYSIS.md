# Test Coverage Analysis

## Current State

This project has **no automated test framework** (no Jest, Vitest, Mocha, Playwright, etc.). Quality assurance relies on:

- **Python audit scripts** (`_dev/audit.py`, `audit-v2.py`, etc.) — static HTML/CSS validation
- **Shell release audit** (`scripts/release-audit.sh`) — 12 checks for content correctness
- **Manual audit reports** — 13 markdown documents covering content, accessibility, and visual consistency

These are valuable for release validation but leave significant gaps: no JavaScript logic is tested, no user interactions are verified, and regressions can slip through undetected.

---

## Testable JavaScript Surface Area

The codebase has ~1,280 lines of JavaScript across 5 files with substantial testable logic:

| File | Lines | Key Functions | Risk Level |
|------|-------|---------------|------------|
| `main.js` | 843 | 30+ functions | **High** — core UX logic |
| `search.js` | 99 | 4 functions | **Medium** — search/filtering |
| `sw.js` | 94 | 3 event handlers | **Medium** — offline support |
| `init.js` | 35 | hash routing | **Low** — small, stable |

---

## Recommended Test Improvements (by priority)

### Priority 1: Unit Tests for Pure Logic (Jest/Vitest)

These functions contain extractable, testable logic with no DOM dependency (or easily mockable):

1. **`escHtml(str)`** — XSS prevention is security-critical. Test with `<script>`, `"quotes"`, `&`, unicode, empty strings, and nested HTML.

2. **`doSearch(q)`** — Search has complex matching/snippet/highlighting logic:
   - Empty and short queries (< 2 chars)
   - Multi-word matching
   - Deduplication (first 80 chars)
   - Result limit (max 12)
   - Snippet extraction with context window (60/120 chars)
   - Regex escaping in highlight (special chars like `.*+?`)
   - XSS in search query display (`q.replace(/</g,'&lt;')`)

3. **`scSelect()` / `showScResult()`** — Self-check quiz scoring:
   - 0-1 "ja" → green result
   - 2-3 "ja" → yellow result
   - 4-5 "ja" → red result with emergency number
   - Boundary cases (exactly 1, exactly 3)

4. **`saveContinuePosition()` / `initContinue()`** — Session persistence:
   - Correct JSON serialization to sessionStorage
   - Same-page vs. cross-page behavior
   - Scroll threshold (> 400)
   - Title extraction (`split('|')[0].trim()`)

5. **`bookmarks` CRUD** — `toggleBookmarkItem()`, `renderBookmarksList()`:
   - Add/remove toggle behavior
   - localStorage serialization
   - Cross-page bookmark link generation (module number extraction)
   - Empty state rendering

6. **`showSituationalHint()`** — Time-based logic:
   - Night (22:00–06:00) → crisis hint with phone number
   - Morning (06:00–09:00) → encouragement
   - December → holiday hint
   - Other times → no hint

### Priority 2: DOM Interaction Tests (Jest + jsdom or Vitest)

These test user-facing behavior that is currently untested:

7. **Accordion/toggle components** — `toggleAcc()`, `toggleFaq()`, `toggleGlossar()`, `toggleMG()`:
   - Only one item open at a time (mutual exclusion)
   - `aria-expanded` attribute updates correctly
   - Scroll-into-view on open

8. **Pole-tabs keyboard navigation**:
   - ArrowRight advances through `['manie','stabil','depression']`
   - ArrowLeft goes back
   - Boundary behavior (no wrap-around)
   - `aria-selected` updates

9. **`waSelect()` quiz interaction**:
   - Correct answer gets `.correct` class
   - Wrong answer gets `.wrong` class
   - All buttons disabled after selection
   - Feedback text displayed

10. **`toggleNotfall()` emergency banner**:
    - Toggle open/close state
    - `aria-expanded` updates
    - Idempotency (no banner element → no crash)

11. **`initCollapsibleLists()`**:
    - Lists ≤ 3 items: no button added
    - Lists > 3 items: overflow hidden, "show more" button
    - Toggle expand/collapse

12. **Lightbox** — `openHandoutLightbox()` / `closeHandoutLightbox()`:
    - Creates overlay element
    - Escape key closes it
    - Body scroll locked while open
    - Mobile detection (opens in new tab instead)

### Priority 3: Integration / E2E Tests (Playwright)

13. **Service Worker offline behavior**:
    - Core assets cached on install
    - Network-first with cache fallback
    - Redirect map resolution (`/notfall/` → `/handouts/notfall/`)
    - Old cache cleanup on activate
    - 503 fallback when offline and uncached

14. **Navigation flow**:
    - Hash-based deep linking (`init.js` — `#m1` → `/modul/1/`)
    - Scroll-spy active state on module pages
    - Progress bar accuracy
    - Continue-reading cross-page persistence

15. **Search end-to-end**:
    - Ctrl+K / Cmd+K opens search overlay
    - Escape closes it
    - Lazy loading of search-index.js
    - Full search → click result → navigation

16. **Accessibility compliance**:
    - All interactive elements keyboard-navigable
    - ARIA attributes correct after state changes
    - Tooltip `role="tooltip"` + `aria-describedby` wiring
    - Skip-link functionality
    - Focus management in lightbox/modals

### Priority 4: Regression Tests for Existing Audit Checks

17. **Port `release-audit.sh` to a proper test runner**:
    - The 12 shell checks would be more maintainable and faster as programmatic tests
    - Enables CI integration beyond the current auto-merge workflow
    - Can run on every commit, not just releases

---

## Suggested Implementation Approach

**Recommended stack**: Vitest (zero-config, fast, ESM-native) + jsdom + Playwright for E2E.

```
npm init -y
npm install -D vitest jsdom @playwright/test
```

**Suggested file structure**:
```
tests/
  unit/
    escHtml.test.js          # XSS prevention
    search.test.js            # Search logic
    selfCheck.test.js         # Quiz scoring
    bookmarks.test.js         # Bookmark CRUD
    situationalHint.test.js   # Time-based hints
  integration/
    accordion.test.js         # Toggle components
    poleTabs.test.js          # Keyboard nav
    quiz.test.js              # waSelect interaction
    lightbox.test.js          # Handout lightbox
    collapsible.test.js       # List collapse
  e2e/
    navigation.spec.js        # Page flow
    search.spec.js            # Search overlay
    serviceWorker.spec.js     # Offline behavior
    accessibility.spec.js     # a11y compliance
```

**Estimated impact**: Adding just Priority 1 tests (items 1–6) would cover the most critical logic paths with minimal setup effort. These are pure functions or near-pure functions that can be tested without a full DOM environment.

---

## Highest-Impact Quick Wins

If only 3 areas could be tested, these provide the most value:

1. **`escHtml()`** — Security function with zero current validation
2. **`doSearch()`** — Complex string processing with edge cases (regex, XSS, truncation)
3. **Self-check quiz scoring** — Health-related output shown to vulnerable users; correctness matters

These three alone would cover the security boundary, the most complex logic, and the most sensitive user-facing feature.
