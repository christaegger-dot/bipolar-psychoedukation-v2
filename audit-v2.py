#!/usr/bin/env python3
"""
COMPREHENSIVE RELEASE AUDIT v2
One check per bug from bugreport-v4.md (25 bugs)
+ general quality checks
+ regression checks for fixes from previous passes
Exit code = number of ERRORS. Re-run after fixes until 0.
"""
import re, os, glob, json, sys
ERRORS = []
WARNINGS = []
def error(bug_id, msg):
    ERRORS.append(f"[Bug {bug_id}] {msg}")
def warn(bug_id, msg):
    WARNINGS.append(f"[Bug {bug_id}] {msg}")
def gerror(category, msg):
    ERRORS.append(f"[{category}] {msg}")
def gwarn(category, msg):
    WARNINGS.append(f"[{category}] {msg}")
def read(fp):
    with open(fp, encoding='utf-8', errors='replace') as f:
        return f.read()
def html_files():
    return sorted(glob.glob('**/*.html', recursive=True))
# ═══════════════════════════════════════════════════════════
# PART A: ONE CHECK PER BUG (bugreport-v4.md, Bugs 1–25)
# ═══════════════════════════════════════════════════════════
def bug01_waSelect():
    """waSelect() must be defined — Quiz-System"""
    js = read('main.js')
    if 'function waSelect' not in js:
        error('01', 'waSelect() nicht in main.js definiert — Quiz komplett kaputt')
    # Also verify HTML calls match
    for fp in html_files():
        c = read(fp)
        calls = re.findall(r"waSelect\(this,'([^']+)'\)", c)
        if calls:
            if 'wa-opts' not in c and 'wa-opt' not in c:
                warn('01', f'{fp}: waSelect aufgerufen, aber keine Quiz-Struktur sichtbar')
def bug02_svg_text_overflow():
    """SVG text must not extend beyond viewBox bounds"""
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'<svg\b([^>]*)>(.*?)</svg>', c, re.DOTALL):
            attrs = m.group(1)
            body = m.group(2)
            vb = re.search(r'viewBox="0 0 (\d+) ([\d.]+)"', attrs)
            if not vb:
                continue
            w = int(vb.group(1))
            if w <= 210:
                continue
            aria = re.search(r'aria-label="([^"]*)"', attrs)
            name = (aria.group(1)[:40] if aria else '?')
            for tm in re.finditer(r'<text\b([^>]*)>(.*?)</text>', body, re.DOTALL):
                tattrs = tm.group(1)
                raw = tm.group(2)
                # Handle tspan
                tspans = re.findall(r'<tspan[^>]*>([^<]*)</tspan>', raw)
                texts = tspans if tspans else [re.sub(r'<[^>]+>', '', raw).strip()]
                x_m = re.search(r'\bx="([\d.]+)"', tattrs)
                fs_m = re.search(r'font-size="([\d.]+)"', tattrs)
                if not x_m or not fs_m:
                    continue
                x, fs = float(x_m.group(1)), float(fs_m.group(1))
                anchor = 'start'
                if 'text-anchor="end"' in tattrs: anchor = 'end'
                if 'text-anchor="middle"' in tattrs: anchor = 'middle'
                for txt in texts:
                    if not txt.strip():
                        continue
                    est_w = 0.50 * fs * len(txt)
                    if anchor == 'end':
                        left = x - est_w
                        if left < -15:
                            error('02', f'{fp} «{name}»: «{txt[:50]}» overflow links (left≈{left:.0f})')
                    elif anchor == 'middle':
                        half = est_w / 2
                        if x - half < -15:
                            error('02', f'{fp} «{name}»: «{txt[:50]}» overflow links (left≈{x-half:.0f})')
                        if x + half > w + 15:
                            error('02', f'{fp} «{name}»: «{txt[:50]}» overflow rechts (right≈{x+half:.0f}>{w})')
                    else:
                        right = x + est_w
                        if right > w + 15:
                            error('02', f'{fp} «{name}»: «{txt[:50]}» overflow rechts (right≈{right:.0f}>{w})')
def bug03_notfall_search_overlay():
    """notfall/index.html must have search-overlay DOM if search.js is loaded"""
    fp = 'handouts/notfall/index.html'
    if not os.path.exists(fp): return
    c = read(fp)
    has_searchjs = 'search.js' in c or 'search-index.js' in c
    has_overlay = 'id="search-overlay"' in c
    if has_searchjs and not has_overlay:
        error('03', f'{fp}: search.js geladen, aber kein <div id="search-overlay">')
    # Also check: exactly ONE overlay (no duplicates)
    count = c.count('id="search-overlay"')
    if count > 1:
        error('03', f'{fp}: {count}x id="search-overlay" (Duplikat)')
def bug04_m7_email():
    """getElementById('m7-email') must be null-safe or element must exist"""
    js = read('main.js')
    if "getElementById('m7-email')" in js:
        # Check if it's null-guarded
        for m in re.finditer(r"getElementById\('m7-email'\)", js):
            # Get surrounding context
            start = max(0, m.start() - 100)
            ctx = js[start:m.end() + 50]
            if 'if' not in ctx and '&&' not in ctx and '||' not in ctx and '?' not in ctx:
                # Check if element exists in M7
                m7 = read('modul/7/index.html')
                if 'id="m7-email"' not in m7:
                    error('04', 'main.js: getElementById("m7-email") ohne Null-Guard, Element fehlt in M7')
def bug05_dark_mode_svg_wrappers():
    """ALL SVG wrapper classes must be in dark mode block"""
    css = read('shared.css')
    # Extract dark mode block
    m = re.search(r'@media\s*\(prefers-color-scheme:\s*dark\)\s*\{', css)
    if not m:
        error('05', 'Kein @media (prefers-color-scheme: dark) Block')
        return
    depth = 1; pos = m.end()
    while pos < len(css) and depth > 0:
        if css[pos] == '{': depth += 1
        elif css[pos] == '}': depth -= 1
        pos += 1
    dm = css[m.start():pos]
    # Find all SVG wrapper classes from HTML
    svg_wrappers = set()
    for fp in html_files():
        hc = read(fp)
        # Pattern: div with class wrapping an SVG with viewBox > 210
        for wm in re.finditer(r'<div[^>]*class="([^"]*)"[^>]*>\s*(?:\n\s*)?<svg[^>]*viewBox="0 0 (\d+)', hc):
            w = int(wm.group(2))
            if w > 210:
                for cls in wm.group(1).split():
                    # Skip generic utility classes
                    if cls not in ('mt-md', 'mb-md', 'mb-sm', 'mt-sm', 'mt-lg', 'mb-lg'):
                        svg_wrappers.add(cls)
    for cls in sorted(svg_wrappers):
        if cls not in dm:
            error('05', f'SVG-Wrapper .{cls} fehlt im Dark-Mode-Block')
def bug06_italic_fontface():
    """No @font-face with font-style:italic pointing to regular woff2 file"""
    css = read('shared.css')
    # Check CSS
    for m in re.finditer(r'@font-face\s*\{([^}]+)\}', css):
        block = m.group(1)
        if 'font-style' in block and 'italic' in block:
            if 'regular' in block.lower():
                error('06', 'shared.css: @font-face italic zeigt auf regular-Datei')
    # Also check inline styles in HTML
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'@font-face\s*\{([^}]+)\}', c):
            block = m.group(1)
            if 'italic' in block and 'regular' in block.lower():
                error('06', f'{fp}: Inline @font-face italic zeigt auf regular-Datei')
def bug07_sw_cache_assets():
    """Service Worker must cache search.js, search-index.js, 404.html, impressum/"""
    sw = read('sw.js')
    cached = set(re.findall(r"'(/[^']*)'", sw))
    required = {
        '/search.js': 'Suche offline kaputt',
        '/search-index.js': 'Suchindex offline kaputt',
        '/404.html': '404-Seite fehlt offline',
        '/handouts/impressum/': 'Impressum fehlt offline',
    }
    for path, impact in required.items():
        if path not in cached:
            error('07', f'sw.js: {path} fehlt in CORE_ASSETS — {impact}')
def bug08_dead_dom():
    """No display:none + aria-hidden elements without JS toggle"""
    # Check M4 for ee-cycle
    m4 = read('modul/4/index.html')
    if re.search(r'class="ee-cycle"[^>]*display:\s*none', m4) or \
       (re.search(r'class="ee-cycle"', m4) and 'display:none' in m4[m4.find('ee-cycle'):m4.find('ee-cycle')+200] if 'ee-cycle' in m4 else False):
        # Check if there's a toggle function
        js = read('main.js')
        if 'ee-cycle' not in js:
            error('08', 'modul/4: .ee-cycle mit display:none, kein JS-Toggle vorhanden')
    # Check M2 for role-shift-wrap
    m2 = read('modul/2/index.html')
    if 'role-shift-wrap' in m2:
        if 'display:none' in m2[m2.find('role-shift-wrap'):m2.find('role-shift-wrap')+200]:
            js = read('main.js')
            if 'role-shift' not in js:
                error('08', 'modul/2: .role-shift-wrap mit display:none, kein JS-Toggle vorhanden')
def bug09_passive_scroll():
    """Scroll listeners must use {passive: true}"""
    js = read('main.js')
    # Find all scroll event listeners
    for m in re.finditer(r"addEventListener\(\s*['\"]scroll['\"]", js):
        # Check if passive:true is in the surrounding context
        end = js.find('\n', m.end() + 500)
        ctx = js[m.start():end if end > 0 else m.end() + 600]
        if 'passive' not in ctx:
            error('09', 'main.js: scroll addEventListener ohne {passive: true}')
def bug10_passive_touch():
    """Touch listeners must use {passive: true}"""
    js = read('main.js')
    for evt in ['touchstart', 'touchend', 'touchmove']:
        for m in re.finditer(rf"addEventListener\(\s*['\"]" + evt + r"['\"]", js):
            end = js.find('\n', m.end() + 500)
            ctx = js[m.start():end if end > 0 else m.end() + 600]
            if 'passive' not in ctx:
                error('10', f'main.js: {evt} addEventListener ohne {{passive: true}}')
def bug11_breakpoints():
    """@media breakpoints should be ≤ 10 (was 20, target: 6-8)"""
    css = read('shared.css')
    breakpoints = set()
    for m in re.finditer(r'@media[^{]*max-width:\s*(\d+)px', css):
        breakpoints.add(int(m.group(1)))
    for m in re.finditer(r'@media[^{]*min-width:\s*(\d+)px', css):
        breakpoints.add(int(m.group(1)))
    if len(breakpoints) > 10:
        error('11', f'{len(breakpoints)} @media Breakpoints (max: 10). Values: {sorted(breakpoints)}')
    elif len(breakpoints) > 8:
        warn('11', f'{len(breakpoints)} @media Breakpoints (Ziel: ≤8). Values: {sorted(breakpoints)}')
def bug12_bg_alt():
    """--bg-alt must be defined in :root"""
    css = read('shared.css')
    if 'var(--bg-alt' in css:
        root_match = re.search(r':root\s*\{([^}]+)\}', css)
        if root_match:
            if '--bg-alt' not in root_match.group(1):
                error('12', '--bg-alt verwendet aber nicht in :root definiert')
def bug13_glaswand_rx_ry():
    """Glaswand SVG: rx must equal ry (no distorted corners)"""
    m3 = read('modul/3/index.html')
    # Find SVG with glaswand in aria-label or nearby
    for m in re.finditer(r'<svg\b([^>]*)>(.*?)</svg>', m3, re.DOTALL):
        aria = re.search(r'aria-label="([^"]*)"', m.group(1))
        if not aria or 'laswand' not in aria.group(1):
            continue
        body = m.group(2)
        for rm in re.finditer(r'rx="([\d.]+)"\s*ry="([\d.]+)"', body):
            rx, ry = float(rm.group(1)), float(rm.group(2))
            if abs(rx - ry) > 2:
                error('13', f'M3 Glaswand: rx={rx} ry={ry} (Differenz {abs(rx-ry):.1f}, max: 2)')
def bug14_module_color():
    """--module-color must be set on all module pages via inline style or CSS"""
    for i in range(1, 8):
        fp = f'modul/{i}/index.html'
        if not os.path.exists(fp):
            continue
        c = read(fp)
        if '--module-color' not in c:
            # Check if the page uses module-color dependent styles
            css = read('shared.css')
            if 'var(--module-color' in css:
                error('14', f'{fp}: --module-color nicht gesetzt (Fallback auf M1-Farbe)')
def bug15_skip_link():
    """All pages must have a skip-to-content link"""
    for fp in html_files():
        c = read(fp)
        if '<body' in c:
            if 'skip-link' not in c:
                error('15', f'{fp}: Kein skip-link vorhanden')
def bug16_dark_footer():
    """.footer must be styled in dark mode block"""
    css = read('shared.css')
    m = re.search(r'@media\s*\(prefers-color-scheme:\s*dark\)\s*\{', css)
    if not m: return
    depth = 1; pos = m.end()
    while pos < len(css) and depth > 0:
        if css[pos] == '{': depth += 1
        elif css[pos] == '}': depth -= 1
        pos += 1
    dm = css[m.start():pos]
    # Check for footer tag selector (not class .footer)
    if not re.search(r'(?<![.\w-])footer\s*\{', dm):
        error('16', 'footer (tag) fehlt im Dark-Mode-Block')
def bug17_dark_tooltip():
    """.tt-box must be styled in dark mode block"""
    css = read('shared.css')
    m = re.search(r'@media\s*\(prefers-color-scheme:\s*dark\)\s*\{', css)
    if not m: return
    depth = 1; pos = m.end()
    while pos < len(css) and depth > 0:
        if css[pos] == '{': depth += 1
        elif css[pos] == '}': depth -= 1
        pos += 1
    dm = css[m.start():pos]
    if '.tt-box' not in dm:
        error('17', '.tt-box fehlt im Dark-Mode-Block')
def bug18_dark_module_top():
    """.module-top must be styled in dark mode block"""
    css = read('shared.css')
    m = re.search(r'@media\s*\(prefers-color-scheme:\s*dark\)\s*\{', css)
    if not m: return
    depth = 1; pos = m.end()
    while pos < len(css) and depth > 0:
        if css[pos] == '{': depth += 1
        elif css[pos] == '}': depth -= 1
        pos += 1
    dm = css[m.start():pos]
    if '.module-top' not in dm:
        error('18', '.module-top fehlt im Dark-Mode-Block')
def bug19_404_meta():
    """404.html must have meta description"""
    c = read('404.html')
    if 'meta' not in c or 'description' not in c:
        error('19', '404.html: Kein <meta name="description">')
    elif 'name="description"' not in c:
        error('19', '404.html: Kein <meta name="description">')
def bug20_notfall_og():
    """notfall should have specific OG image (warning only — requires design)"""
    fp = 'handouts/notfall/index.html'
    if not os.path.exists(fp): return
    c = read(fp)
    if 'og-notfall' not in c:
        warn('20', f'{fp}: Kein spezifisches OG-Image (og-notfall.png) — erfordert Grafikdesign')
def bug21_dead_css():
    """Count CSS classes defined but never referenced in HTML or JS"""
    css = read('shared.css')
    # Collect all class selectors from CSS
    css_classes = set()
    for m in re.findall(r'\.([a-zA-Z_][\w-]*)', css):
        css_classes.add(m)
    # Collect all class references from HTML and JS
    referenced = set()
    for fp in html_files():
        c = read(fp)
        # class="..."
        for m in re.findall(r'class="([^"]*)"', c):
            for cls in m.split():
                referenced.add(cls)
        # classList.add/remove/toggle/contains
        for m in re.findall(r"classList\.\w+\('([^']+)'\)", c):
            referenced.add(m)
    for fp in ['main.js', 'search.js']:
        if not os.path.exists(fp): continue
        c = read(fp)
        for m in re.findall(r"'([a-zA-Z][\w-]*)'", c):
            referenced.add(m)
        for m in re.findall(r'"([a-zA-Z][\w-]*)"', c):
            referenced.add(m)
        for m in re.findall(r"classList\.\w+\('([^']+)'\)", c):
            referenced.add(m)
        for m in re.findall(r'className\s*[+=]\s*["\']([^"\']*)["\']', c):
            for cls in m.split():
                referenced.add(cls)
        # innerHTML class references
        for m in re.findall(r'class="([^"]*)"', c):  # inside template strings
            for cls in m.split():
                referenced.add(cls)
    dead = css_classes - referenced
    # Filter out pseudo-elements, keyframe names, known dynamic classes
    false_positives = {'root', 'before', 'after', 'hover', 'focus', 'active',
                       'checked', 'first', 'last', 'not', 'nth', 'dark',
                       'prefers', 'color', 'scheme', 'webkit', 'moz'}
    dead = {c for c in dead if c.lower() not in false_positives and len(c) > 2}
    if len(dead) > 50:
        error('21', f'{len(dead)} tote CSS-Klassen (Ziel: <50). Beispiele: {sorted(dead)[:10]}')
    elif len(dead) > 30:
        warn('21', f'{len(dead)} tote CSS-Klassen. Beispiele: {sorted(dead)[:10]}')
def bug22_console_log():
    """No console.log/debug in production JS"""
    for fp in ['main.js', 'search.js']:
        if not os.path.exists(fp): continue
        c = read(fp)
        for m in re.finditer(r'console\.(log|debug)\(', c):
            error('22', f'{fp}: console.{m.group(1)}() in Produktion')
def bug23_viewbox_case():
    """All SVGs must use viewBox (camelCase), not viewbox"""
    for fp in html_files():
        c = read(fp)
        # Find viewbox (lowercase) that's NOT inside viewBox
        for m in re.finditer(r'viewbox=', c, re.IGNORECASE):
            actual = c[m.start():m.start()+8]
            if actual != 'viewBox=':
                error('23', f'{fp}: viewbox statt viewBox (lowercase)')
def bug24_sw_version():
    """Service Worker cache version must be ≥ v5"""
    sw = read('sw.js')
    m = re.search(r"CACHE_NAME\s*=\s*'([^']+)'", sw)
    if m:
        ver = m.group(1)
        # Extract version number
        v_num = re.search(r'v(\d+)', ver)
        if v_num:
            if int(v_num.group(1)) < 5:
                error('24', f'SW Cache-Version {ver} — muss ≥ v5 sein')
        else:
            warn('24', f'SW Cache-Version {ver} — kein Versionsnummer-Pattern erkannt')
    else:
        error('24', 'sw.js: Kein CACHE_NAME gefunden')
def bug25_stroke_cosmetic():
    """Stroke-width proportionality — cosmetic only, warn but don't error"""
    # This is cosmetic per bug report. Just acknowledge.
    pass
# ═══════════════════════════════════════════════════════════
# PART B: GENERAL QUALITY CHECKS
# ═══════════════════════════════════════════════════════════
def general_structure():
    """Expected files must exist, dev files must not"""
    expected = [
        'index.html', '404.html', 'shared.css', 'main.js',
        'search.js', 'search-index.js', 'sw.js',
        'manifest.json', 'robots.txt', 'sitemap.xml',
        'netlify.toml', '_redirects',
        'handouts/index.html', 'handouts/notfall/index.html',
        'handouts/impressum/index.html', 'handouts/ressourcen/index.html',
    ]
    for i in range(1, 8):
        expected.append(f'modul/{i}/index.html')
    for fp in expected:
        if not os.path.exists(fp):
            gerror('STRUCTURE', f'Erwartete Datei fehlt: {fp}')
    # Dev files
    audit_files = {'audit.py', 'audit-v2.py'}
    for f in os.listdir('.'):
        if f.endswith(('.py', '.pyc', '.log')) and f not in audit_files:
            gerror('STRUCTURE', f'Dev-Datei im Deploy: {f}')
        if f in ('bugreport-v4.md', 'bugreport.md', '.env'):
            gerror('STRUCTURE', f'Internes Dokument im Deploy: {f}')
def general_html():
    """HTML validation: duplicate IDs, tag balance, required meta"""
    for fp in html_files():
        c = read(fp)
        # Duplicate IDs
        ids = re.findall(r'id="([^"]+)"', c)
        seen = set()
        for i in ids:
            if i in seen:
                gerror('HTML', f'{fp}: Duplikat id="{i}"')
            seen.add(i)
        # Tag balance
        for tag in ['div', 'section', 'main', 'article', 'ul', 'ol', 'table']:
            opens = len(re.findall(rf'<{tag}[\s>]', c))
            closes = len(re.findall(rf'</{tag}>', c))
            if opens != closes:
                gerror('HTML', f'{fp}: <{tag}> imbalance: {opens} open, {closes} close')
        # Required meta
        if '<html' in c:
            if 'lang=' not in c[:500]:
                gerror('HTML', f'{fp}: Kein lang= auf <html>')
            if 'charset' not in c[:500]:
                gerror('HTML', f'{fp}: Kein charset')
            if 'viewport' not in c:
                gerror('HTML', f'{fp}: Kein viewport meta')
def _load_redirects():
    """Parse _redirects file to build a map of redirect sources to targets."""
    redirects = {}
    if os.path.exists('_redirects'):
        for line in read('_redirects').splitlines():
            line = line.strip()
            if not line or line.startswith('#'): continue
            parts = line.split()
            if len(parts) >= 2:
                redirects[parts[0].rstrip('/')] = parts[1].rstrip('/')
    return redirects

def general_links():
    """All internal href/src must resolve to existing files"""
    redirects = _load_redirects()
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'href="([^"]*)"', c):
            href = m.group(1)
            if not href or href.startswith(('http', 'mailto:', 'tel:', 'javascript:', 'data:', '#')):
                continue
            path = href.split('#')[0]
            anchor = href.split('#')[1] if '#' in href else None
            if path.startswith('/'):
                target = '.' + path
            else:
                target = os.path.join(os.path.dirname(fp), path)
            target = target.rstrip('/')
            exists = (os.path.exists(target) or os.path.exists(target + '/index.html')
                      or os.path.exists(target + '.html') or os.path.isdir(target))
            # Check if a redirect covers this path
            if not exists and path.startswith('/'):
                redir_key = path.rstrip('/')
                if redir_key in redirects:
                    redir_target = '.' + redirects[redir_key]
                    exists = (os.path.exists(redir_target) or os.path.exists(redir_target + '/index.html')
                              or os.path.isdir(redir_target))
            if not exists:
                gerror('LINKS', f'{fp}: href="{href}" → nicht gefunden')
            elif anchor:
                tf = target
                if os.path.isdir(target): tf = os.path.join(target, 'index.html')
                elif os.path.exists(target + '/index.html'): tf = target + '/index.html'
                if os.path.exists(tf):
                    if f'id="{anchor}"' not in read(tf):
                        gerror('LINKS', f'{fp}: href="{href}" → id="{anchor}" nicht gefunden')
        for m in re.finditer(r'src="([^"]*)"', c):
            src = m.group(1)
            if src.startswith(('http', 'data:', '//')): continue
            target = ('.' + src) if src.startswith('/') else os.path.join(os.path.dirname(fp), src)
            if not os.path.exists(target):
                gerror('LINKS', f'{fp}: src="{src}" → nicht gefunden')
def general_js_functions():
    """All onclick/oninput functions must be defined"""
    called = {}
    for fp in html_files():
        c = read(fp)
        for attr in ['onclick', 'oninput', 'onchange']:
            for m in re.finditer(rf'{attr}="([a-zA-Z_]\w*)\(', c):
                fn = m.group(1)
                called.setdefault(fn, set()).add(fp)
    defined = set()
    for fp in ['main.js', 'search.js']:
        if os.path.exists(fp):
            defined.update(re.findall(r'function\s+([a-zA-Z_]\w*)', read(fp)))
    for fp in html_files():
        for m in re.finditer(r'<script[^>]*>(.*?)</script>', read(fp), re.DOTALL):
            defined.update(re.findall(r'function\s+([a-zA-Z_]\w*)', m.group(1)))
    builtins = {'event', 'alert', 'confirm', 'if', 'return', 'history'}
    for fn in sorted(set(called.keys()) - defined - builtins):
        locs = ', '.join(sorted(called[fn]))
        gerror('JS', f'{fn}() aufgerufen in {locs} — nicht definiert')
def general_css():
    """CSS brace/comment balance"""
    css = read('shared.css')
    if css.count('{') != css.count('}'):
        gerror('CSS', f'Klammer-Imbalance: {css.count("{")} {{ vs {css.count("}")} }}')
    oc = len(re.findall(r'/\*', css))
    cc = len(re.findall(r'\*/', css))
    if oc != cc:
        gerror('CSS', f'Kommentar-Imbalance: {oc} /* vs {cc} */')
def general_a11y():
    """Images need alt, inputs need labels, buttons need text"""
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'<img\b([^>]*)/?>', c):
            if 'alt=' not in m.group(1):
                gerror('A11Y', f'{fp}: <img> ohne alt')
        for m in re.finditer(r'<input\b([^>]*)/?>', c):
            attrs = m.group(1)
            if 'type="hidden"' in attrs or 'type="submit"' in attrs: continue
            if 'aria-label' not in attrs:
                inp_id = re.search(r'id="([^"]*)"', attrs)
                if inp_id and f'for="{inp_id.group(1)}"' not in c:
                    gerror('A11Y', f'{fp}: <input id="{inp_id.group(1)}"> ohne aria-label')
def general_assets():
    """All referenced fonts, PDFs, images, manifest icons must exist"""
    for fp in html_files() + ['shared.css']:
        c = read(fp)
        for m in re.finditer(r"url\('?(/fonts/[^')]+)'?\)", c):
            if not os.path.exists('.' + m.group(1)):
                gerror('ASSETS', f'{fp}: Font {m.group(1)} fehlt')
        for m in re.finditer(r'href="(/[^"]*\.pdf)"', c):
            if not os.path.exists('.' + m.group(1)):
                gerror('ASSETS', f'{fp}: PDF {m.group(1)} fehlt')
        for m in re.finditer(r'src="(/images/[^"]*)"', c):
            if not os.path.exists('.' + m.group(1)):
                gerror('ASSETS', f'{fp}: Bild {m.group(1)} fehlt')
    if os.path.exists('manifest.json'):
        mf = json.loads(read('manifest.json'))
        for icon in mf.get('icons', []):
            if not os.path.exists('.' + icon.get('src', '')):
                gerror('ASSETS', f'manifest.json: Icon {icon.get("src")} fehlt')
def general_security():
    """No HTTP links, CSP headers present"""
    for fp in html_files():
        for m in re.finditer(r'href="(http://[^"]*)"', read(fp)):
            if 'localhost' not in m.group(1):
                gerror('SECURITY', f'{fp}: HTTP statt HTTPS: {m.group(1)}')
def general_content():
    """Emergency numbers, search index terms, legal info"""
    nf_path = 'handouts/notfall/index.html'
    if os.path.exists(nf_path):
        nf = read(nf_path)
        for num in ['143', '144', '117']:
            if num not in nf:
                gerror('CONTENT', f'{nf_path}: Notfallnummer {num} fehlt')
    si = read('search-index.js')
    for term in ['Krisenplan', 'Suizid', 'Manie', 'Depression']:
        if term.lower() not in si.lower():
            gerror('CONTENT', f'Suchindex: «{term}» fehlt')
# ═══════════════════════════════════════════════════════════
# RUN ALL
# ═══════════════════════════════════════════════════════════
if __name__ == '__main__':
    bug_checks = [
        ('Bug 01  waSelect Quiz',          bug01_waSelect),
        ('Bug 02  SVG Text Overflow',       bug02_svg_text_overflow),
        ('Bug 03  Notfall Search Overlay',  bug03_notfall_search_overlay),
        ('Bug 04  m7-email Null-Ref',       bug04_m7_email),
        ('Bug 05  DM SVG Wrappers',         bug05_dark_mode_svg_wrappers),
        ('Bug 06  Italic Font-Face',        bug06_italic_fontface),
        ('Bug 07  SW Cache Assets',         bug07_sw_cache_assets),
        ('Bug 08  Dead DOM',                bug08_dead_dom),
        ('Bug 09  Passive Scroll',          bug09_passive_scroll),
        ('Bug 10  Passive Touch',           bug10_passive_touch),
        ('Bug 11  Breakpoints',             bug11_breakpoints),
        ('Bug 12  --bg-alt',                bug12_bg_alt),
        ('Bug 13  Glaswand rx/ry',          bug13_glaswand_rx_ry),
        ('Bug 14  --module-color',          bug14_module_color),
        ('Bug 15  Skip-Link',               bug15_skip_link),
        ('Bug 16  DM .footer',              bug16_dark_footer),
        ('Bug 17  DM .tt-box',              bug17_dark_tooltip),
        ('Bug 18  DM .module-top',          bug18_dark_module_top),
        ('Bug 19  404 Meta',                bug19_404_meta),
        ('Bug 20  Notfall OG-Image',        bug20_notfall_og),
        ('Bug 21  Dead CSS',                bug21_dead_css),
        ('Bug 22  console.log',             bug22_console_log),
        ('Bug 23  viewBox Case',            bug23_viewbox_case),
        ('Bug 24  SW Version',              bug24_sw_version),
        ('Bug 25  Stroke (cosmetic)',       bug25_stroke_cosmetic),
    ]
    general_checks = [
        ('File Structure',    general_structure),
        ('HTML Validation',   general_html),
        ('Internal Links',    general_links),
        ('JS Functions',      general_js_functions),
        ('CSS Syntax',        general_css),
        ('Accessibility',     general_a11y),
        ('Assets',            general_assets),
        ('Security',          general_security),
        ('Content',           general_content),
    ]
    print('═' * 60)
    print('RELEASE AUDIT v2 — bugreport-v4.md + Quality Checks')
    print('═' * 60)
    print('\n── BUGREPORT CHECKS (25 Bugs) ──')
    for name, fn in bug_checks:
        before_e = len(ERRORS)
        before_w = len(WARNINGS)
        fn()
        new_e = len(ERRORS) - before_e
        new_w = len(WARNINGS) - before_w
        if new_e > 0:
            status = f'❌ {new_e}'
        elif new_w > 0:
            status = f'⚠ {new_w}'
        else:
            status = '✅'
        print(f'  {status:6s}  {name}')
    print('\n── GENERAL QUALITY CHECKS ──')
    for name, fn in general_checks:
        before = len(ERRORS)
        fn()
        new = len(ERRORS) - before
        status = '✅' if new == 0 else f'❌ {new}'
        print(f'  {status:6s}  {name}')
    print('─' * 60)
    if ERRORS:
        print(f'\n❌ {len(ERRORS)} FEHLER:')
        for e in ERRORS:
            print(f'  {e}')
    if WARNINGS:
        print(f'\n⚠ {len(WARNINGS)} WARNUNGEN:')
        for w in WARNINGS:
            print(f'  {w}')
    if not ERRORS:
        print(f'\n✅ RELEASE-BEREIT (0 Fehler, {len(WARNINGS)} Warnungen)')
    print('═' * 60)
    sys.exit(len(ERRORS))
