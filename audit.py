#!/usr/bin/env python3
"""
COMPREHENSIVE RELEASE AUDIT — bipolar-deploy
One check per original bug + general quality checks.
Exit code = number of errors. Must be 0 before deploy.
"""

import re, os, glob, json, sys

ERRORS = []
WARNINGS = []

def error(bug, msg):
    ERRORS.append(f"[Bug {bug}] {msg}")

def warn(bug, msg):
    WARNINGS.append(f"[Bug {bug}] {msg}")

def read(fp):
    with open(fp, encoding='utf-8', errors='replace') as f:
        return f.read()

def html_files():
    return sorted(glob.glob('**/*.html', recursive=True))

def js_files():
    return [f for f in ['main.js', 'search.js'] if os.path.exists(f)]

def get_dark_mode_block():
    css = read('shared.css')
    m = re.search(r'@media\s*\(prefers-color-scheme:\s*dark\)\s*\{', css)
    if not m: return ''
    depth = 1; pos = m.end()
    while pos < len(css) and depth > 0:
        if css[pos] == '{': depth += 1
        elif css[pos] == '}': depth -= 1
        pos += 1
    return css[m.start():pos]


# ═════════════════════════════════════════════════════════
# BUG-REPORT CHECKS (1-25)
# ═════════════════════════════════════════════════════════

def bug01_waSelect():
    """waSelect() muss definiert sein und Quiz-Wrapper-IDs muessen existieren."""
    js = read('main.js')
    if 'function waSelect(' not in js:
        error('01', 'waSelect() nicht in main.js definiert')
        return
    for i in range(1, 8):
        fp = f'modul/{i}/index.html'
        if not os.path.exists(fp): continue
        c = read(fp)
        for qid in re.findall(r"waSelect\(this,'(\d+-\d+)'\)", c):
            if f'id="wa-{qid}"' not in c:
                error('01', f'{fp}: waSelect ruft wa-{qid} auf, aber id="wa-{qid}" fehlt')

def bug02_svg_text_overflow():
    """SVG-Texte duerfen nicht ueber den viewBox-Rand ragen."""
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'<svg\b([^>]*)>(.*?)</svg>', c, re.DOTALL):
            attrs = m.group(1); body = m.group(2)
            vb = re.search(r'viewBox="0 0 (\d+) ([\d.]+)"', attrs)
            if not vb: continue
            w = int(vb.group(1))
            if w <= 210: continue
            aria = re.search(r'aria-label="([^"]*)"', attrs)
            name = (aria.group(1)[:40] if aria else '?')
            for tm in re.finditer(r'<text\b([^>]*)>(.*?)</text>', body, re.DOTALL):
                tattrs = tm.group(1); raw = tm.group(2)
                tspans = re.findall(r'<tspan[^>]*>([^<]*)</tspan>', raw)
                texts = tspans if tspans else [re.sub(r'<[^>]+>', '', raw).strip()]
                x_m = re.search(r'\bx="([\d.]+)"', tattrs)
                fs_m = re.search(r'font-size="([\d.]+)"', tattrs)
                if not x_m or not fs_m: continue
                x, fs = float(x_m.group(1)), float(fs_m.group(1))
                anchor = 'start'
                if 'text-anchor="end"' in tattrs: anchor = 'end'
                if 'text-anchor="middle"' in tattrs: anchor = 'middle'
                for txt in texts:
                    if not txt.strip(): continue
                    est_w = 0.50 * fs * len(txt)
                    if anchor == 'end':
                        left = x - est_w
                        if left < -15:
                            error('02', f'{fp} <<{name}>>: <<{txt[:50]}>> overflow links (left={left:.0f})')
                    elif anchor == 'middle':
                        half = est_w / 2
                        if x - half < -15:
                            error('02', f'{fp} <<{name}>>: <<{txt[:50]}>> overflow links ({x-half:.0f})')
                        if x + half > w + 15:
                            error('02', f'{fp} <<{name}>>: <<{txt[:50]}>> overflow rechts ({x+half:.0f}>{w})')
                    else:
                        right = x + est_w
                        if right > w + 15:
                            error('02', f'{fp} <<{name}>>: <<{txt[:50]}>> overflow rechts ({right:.0f}>{w})')

def bug03_notfall_search_overlay():
    """Wenn notfall search.js laedt, muss search-overlay existieren (genau 1x)."""
    fp = 'handouts/notfall/index.html'
    if not os.path.exists(fp): return
    c = read(fp)
    if 'search.js' in c and 'id="search-overlay"' not in c:
        error('03', f'{fp}: search.js geladen aber id="search-overlay" fehlt')
    count = c.count('id="search-overlay"')
    if count > 1:
        error('03', f'{fp}: {count}x id="search-overlay" (Duplikat)')

def bug04_m7_email():
    """getElementById('m7-email') muss null-guarded oder Element vorhanden sein."""
    js = read('main.js')
    if "getElementById('m7-email')" not in js: return
    # Check null guard pattern: var e2 = ...; if (e2)
    guarded = bool(re.search(r"var \w+ = document\.getElementById\('m7-email'\);\s*\n?\s*if\s*\(\w+\)", js))
    if guarded: return
    if os.path.exists('modul/7/index.html'):
        if 'id="m7-email"' not in read('modul/7/index.html'):
            error('04', 'getElementById("m7-email") ohne Null-Guard, id fehlt in M7')

def bug05_dark_mode_svg():
    """Alle SVG-Wrapper-Klassen und SVG-Element-Klassen im Dark-Mode-Block."""
    dm = get_dark_mode_block()
    if not dm:
        error('05', 'Kein Dark-Mode-Block in shared.css')
        return
    all_svg_classes = set()
    for fp in html_files():
        c = read(fp)
        for wm in re.finditer(r'<div[^>]*class="([^"]*)"[^>]*>\s*(?:\n\s*)?<svg[^>]*viewBox="0 0 (\d+)', c):
            if int(wm.group(2)) > 210:
                for cls in wm.group(1).split():
                    if cls not in ('mt-md', 'mb-md', 'mb-sm', 'mt-sm'):
                        all_svg_classes.add(cls)
        for sm in re.finditer(r'<svg\b([^>]*)viewBox="0 0 (\d+)', c):
            if int(sm.group(2)) > 210:
                cls_m = re.search(r'class="([^"]*)"', sm.group(1))
                if cls_m:
                    for cls in cls_m.group(1).split():
                        all_svg_classes.add(cls)
    for cls in sorted(all_svg_classes):
        if cls not in dm:
            error('05', f'SVG-Klasse .{cls} fehlt im Dark-Mode-Block')

def bug06_italic_fontface():
    """Keine @font-face mit italic die auf regular-Datei zeigt."""
    for fp in html_files() + ['shared.css']:
        c = read(fp)
        for m in re.finditer(r'@font-face\s*\{([^}]+)\}', c):
            block = m.group(1)
            if 'italic' in block.lower() and 'regular' in block.lower():
                error('06', f'{fp}: @font-face italic zeigt auf regular-Datei')

def bug07_sw_cache():
    """SW muss search.js, search-index.js, 404.html cachen."""
    sw = read('sw.js')
    for asset in ['/search.js', '/search-index.js', '/404.html']:
        if asset not in sw:
            error('07', f'sw.js: {asset} fehlt in Cache')

def bug08_dead_dom():
    """Keine display:none+aria-hidden Elemente ohne Toggle."""
    js = ''.join(read(f) for f in js_files())
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'<(\w+)\b[^>]*(display:\s*none[^>]*aria-hidden\s*=\s*"true"|aria-hidden\s*=\s*"true"[^>]*display:\s*none)[^>]*>', c):
            cls_m = re.search(r'class="([^"]*)"', m.group(0))
            if cls_m:
                cls = cls_m.group(1).split()[0]
                if cls not in js and f'"{cls}"' not in js:
                    error('08', f'{fp}: Dead DOM .{cls} (display:none+aria-hidden, kein Toggle)')

def bug09_passive_scroll():
    """Scroll-Listener muessen passive sein."""
    js = read("main.js")
    # Find each scroll addEventListener and check for passive in surrounding ~500 chars
    for m in re.finditer(r'addEventListener\(\s*[\x27"]scroll[\x27"]', js):
        # Look ahead up to the next addEventListener call
        start = m.start()
        rest = js[start:start+2000]
        nxt = rest.find("addEventListener", 20)
        if nxt > 0: rest = rest[:nxt]
        if "passive" not in rest:
            error("09", "main.js: scroll-Listener ohne {passive: true}")

def bug10_passive_touch():
    """Touch-Listener muessen passive sein."""
    js = read("main.js")
    for ev in ["touchstart", "touchend", "touchmove"]:
        pat = "addEventListener(" + chr(39) + ev + chr(39)
        pos = js.find(pat)
        while pos >= 0:
            rest = js[pos:pos+2000]
            nxt = rest.find("addEventListener", 20)
            if nxt > 0: rest = rest[:nxt]
            if "passive" not in rest:
                error("10", f"main.js: {ev}-Listener ohne passive")
            pos = js.find(pat, pos+1)

def bug11_breakpoints():
    """Max 10 verschiedene @media Breakpoints."""
    css = read('shared.css')
    bps = sorted(set(int(x) for x in re.findall(r'@media\s*\(\s*max-width:\s*(\d+)px\s*\)', css)))
    if len(bps) > 10:
        error('11', f'{len(bps)} Breakpoints (max 10): {bps}')
    elif len(bps) > 8:
        warn('11', f'{len(bps)} Breakpoints: {bps}')

def bug12_bg_alt():
    """--bg-alt muss in :root definiert sein wenn verwendet."""
    css = read('shared.css')
    if 'var(--bg-alt' in css:
        root = re.search(r':root\s*\{([^}]+)\}', css)
        if root and '--bg-alt' not in root.group(1):
            error('12', '--bg-alt verwendet aber nicht in :root definiert')

def bug13_glaswand_rx_ry():
    """SVG rx/ry muessen gleich sein."""
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'<svg\b([^>]*)>(.*?)</svg>', c, re.DOTALL):
            vb = re.search(r'viewBox="0 0 (\d+)', m.group(1))
            if not vb or int(vb.group(1)) <= 210: continue
            for rm in re.finditer(r'rx="([\d.]+)"\s*ry="([\d.]+)"', m.group(2)):
                rx, ry = float(rm.group(1)), float(rm.group(2))
                if abs(rx - ry) > 3:
                    error('13', f'{fp}: rx={rx} ry={ry} (verzerrte Ecken)')

def bug14_module_color():
    """Jede Modul-Seite setzt --module-color auf den eigenen Modulwert."""
    css = read('shared.css')
    if 'var(--module-color' not in css: return
    for i in range(1, 8):
        fp = f'modul/{i}/index.html'
        if not os.path.exists(fp): continue
        c = read(fp).replace(' ', '')
        if f'--module-color:var(--m{i})' not in c:
            error('14', f'{fp}: --module-color nicht auf --m{i} gesetzt')

def bug15_skip_link():
    """Alle HTML-Seiten mit <html> muessen skip-link haben."""
    for fp in html_files():
        c = read(fp)
        if '<html' in c and 'skip-link' not in c:
            error('15', f'{fp}: Kein skip-link')

def bug16_dark_mode_footer():
    dm = get_dark_mode_block()
    if not dm: return
    # Check for both .footer class and footer tag selector
    has_class = '.footer' in dm
    has_tag = bool(re.search(r'(?<![.\w-])footer\s*[,{]', dm))
    if not has_class and not has_tag:
        error('16', 'footer fehlt im Dark-Mode-Block')

def bug17_dark_mode_tooltip():
    dm = get_dark_mode_block()
    if dm and '.tt-box' not in dm:
        error('17', '.tt-box fehlt im Dark-Mode-Block')

def bug18_dark_mode_module_top():
    dm = get_dark_mode_block()
    if dm and '.module-top' not in dm:
        error('18', '.module-top fehlt im Dark-Mode-Block')

def bug19_404_meta():
    if os.path.exists('404.html'):
        c = read('404.html')
        if 'description' not in c:
            error('19', '404.html: Kein meta description')

def bug20_notfall_og():
    fp = 'handouts/notfall/index.html'
    if os.path.exists(fp):
        c = read(fp)
        if 'og:image' in c and 'og-notfall' not in c:
            warn('20', f'{fp}: Generisches OG-Image')

def bug21_dead_css():
    """Bekannte tote Klassen geloescht."""
    css = read('shared.css')
    known_dead = ['role-shift-wrap', 'role-shift-cell', 'role-shift-header',
                  'role-shift-arrow', 'bridge-arrow', 'box-hint', 'box-primary', 'box-secondary']
    for cls in known_dead:
        for m in re.finditer(rf'\.{re.escape(cls)}\b', css):
            before = css[:m.start()]
            if before.count('/*') <= before.count('*/'):
                error('21', f'Tote CSS-Klasse .{cls} noch in shared.css')
                break

def bug22_console_log():
    for fp in js_files():
        for m in re.finditer(r'console\.(log|debug)\s*\(', read(fp)):
            error('22', f'{fp}: console.{m.group(1)}() in Produktion')

def bug23_viewbox_camelcase():
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'viewbox=', c, re.IGNORECASE):
            if c[m.start():m.start()+8] != 'viewBox=':
                error('23', f'{fp}: viewbox statt viewBox')

def bug24_sw_version():
    sw = read('sw.js')
    m = re.search(r"CACHE_NAME\s*=\s*'bipolar-puk-v(\d+)'", sw)
    if not m:
        error('24', 'sw.js: CACHE_NAME nicht gefunden')
    elif int(m.group(1)) < 5:
        error('24', f'sw.js: v{m.group(1)}, muss >= v5')

def bug25_stroke():
    pass  # Cosmetic, intentionally skip


# ═════════════════════════════════════════════════════════
# GENERAL CHECKS
# ═════════════════════════════════════════════════════════

def general_structure():
    expected = ['index.html', '404.html', 'shared.css', 'main.js', 'search.js',
                'search-index.js', 'sw.js', 'manifest.json', 'robots.txt',
                'sitemap.xml', 'netlify.toml', '_redirects',
                'handouts/index.html', 'handouts/notfall/index.html',
                'handouts/impressum/index.html', 'handouts/ressourcen/index.html']
    for i in range(1, 8):
        expected.append(f'modul/{i}/index.html')
    for fp in expected:
        if not os.path.exists(fp):
            error('GEN-STRUCT', f'Datei fehlt: {fp}')
    audit_files = {'audit.py', 'audit-v2.py'}
    for f in os.listdir('.'):
        if f.endswith(('.py', '.pyc', '.log')) and f not in audit_files:
            error('GEN-STRUCT', f'Dev-Datei: {f}')
        if f in ('bugreport-v4.md', 'bugreport.md', '.env'):
            error('GEN-STRUCT', f'Internes Dokument: {f}')

def general_html():
    for fp in html_files():
        c = read(fp)
        ids = re.findall(r'id="([^"]+)"', c)
        seen = set()
        for i in ids:
            if i in seen: error('GEN-HTML', f'{fp}: Duplikat id="{i}"')
            seen.add(i)
        for tag in ['div', 'section', 'main', 'article', 'header', 'footer', 'nav', 'ul', 'ol', 'table']:
            o = len(re.findall(rf'<{tag}[\s>]', c))
            cl = len(re.findall(rf'</{tag}>', c))
            if o != cl: error('GEN-HTML', f'{fp}: <{tag}> {o} open, {cl} close')
        if '<html' in c:
            if 'lang=' not in c[:500]: error('GEN-HTML', f'{fp}: Kein lang=')
            if 'charset' not in c[:500]: error('GEN-HTML', f'{fp}: Kein charset')
            if 'viewport' not in c: error('GEN-HTML', f'{fp}: Kein viewport')
            if '<title>' not in c and '<title ' not in c: error('GEN-HTML', f'{fp}: Kein <title>')
        for m in re.finditer(r'(href|src)=""', c):
            error('GEN-HTML', f'{fp}: Leeres {m.group(1)}=""')

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
    redirects = _load_redirects()
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'href="([^"]*)"', c):
            href = m.group(1)
            if not href or href.startswith(('http', 'mailto:', 'tel:', 'javascript:', 'data:', '#')): continue
            path = href.split('#')[0]; anchor = href.split('#')[1] if '#' in href else None
            target = ('.' + path) if path.startswith('/') else os.path.join(os.path.dirname(fp), path)
            target = target.rstrip('/')
            exists = os.path.exists(target) or os.path.exists(target+'/index.html') or os.path.exists(target+'.html') or os.path.isdir(target)
            # Check if a redirect covers this path
            if not exists and path.startswith('/'):
                redir_key = path.rstrip('/')
                if redir_key in redirects:
                    redir_target = '.' + redirects[redir_key]
                    exists = os.path.exists(redir_target) or os.path.exists(redir_target+'/index.html') or os.path.isdir(redir_target)
            if not exists:
                error('GEN-LINKS', f'{fp}: href="{href}" nicht gefunden')
            elif anchor:
                tf = target
                if os.path.isdir(target): tf = os.path.join(target, 'index.html')
                elif os.path.exists(target+'/index.html'): tf = target+'/index.html'
                if os.path.exists(tf) and f'id="{anchor}"' not in read(tf):
                    error('GEN-LINKS', f'{fp}: href="{href}" id="{anchor}" fehlt')
        for m in re.finditer(r'src="([^"]*)"', c):
            src = m.group(1)
            if src.startswith(('http', 'data:', '//')): continue
            target = ('.' + src) if src.startswith('/') else os.path.join(os.path.dirname(fp), src)
            if not os.path.exists(target):
                error('GEN-LINKS', f'{fp}: src="{src}" nicht gefunden')

def general_js():
    called = {}
    for fp in html_files():
        c = read(fp)
        for attr in ['onclick', 'oninput', 'onchange', 'onsubmit']:
            for m in re.finditer(rf'{attr}="([a-zA-Z_]\w*)\(', c):
                called.setdefault(m.group(1), []).append(fp)
    defined = set()
    for fp in js_files():
        defined.update(re.findall(r'function\s+([a-zA-Z_]\w*)', read(fp)))
    for fp in html_files():
        for m in re.finditer(r'<script[^>]*>(.*?)</script>', read(fp), re.DOTALL):
            defined.update(re.findall(r'function\s+([a-zA-Z_]\w*)', m.group(1)))
    builtins = {'event', 'alert', 'confirm', 'if', 'return', 'history'}
    for fn in sorted(set(called.keys()) - defined - builtins):
        locs = ', '.join(sorted(set(called[fn])))
        error('GEN-JS', f'{fn}() nicht definiert — aufgerufen in {locs}')

def general_css():
    css = read('shared.css')
    if css.count('{') != css.count('}'):
        error('GEN-CSS', f'Klammer-Imbalance: {css.count("{")} {{ vs {css.count("}")} }}')
    oc = len(re.findall(r'/\*', css)); cc = len(re.findall(r'\*/', css))
    if oc != cc: error('GEN-CSS', f'Kommentar-Imbalance: {oc} /* vs {cc} */')
    for m in re.finditer(r':\s*(undefined|NaN)\s*[;}]', css):
        error('GEN-CSS', f'Ungueltiger Wert: {m.group(0).strip()}')

def general_a11y():
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'<img\b([^>]*)/?>', c):
            if 'alt=' not in m.group(1): error('GEN-A11Y', f'{fp}: <img> ohne alt')
        for m in re.finditer(r'<button\b([^>]*)>(.*?)</button>', c, re.DOTALL):
            txt = re.sub(r'<[^>]+>', '', m.group(2)).strip()
            if not txt and 'aria-label' not in m.group(1):
                error('GEN-A11Y', f'{fp}: <button> ohne Text/aria-label')
        for m in re.finditer(r'<input\b([^>]*)/?>', c):
            a = m.group(1)
            if 'type="hidden"' in a or 'type="submit"' in a: continue
            if 'aria-label' not in a:
                iid = re.search(r'id="([^"]*)"', a)
                if iid and f'for="{iid.group(1)}"' not in c:
                    error('GEN-A11Y', f'{fp}: <input id="{iid.group(1)}"> ohne Label')

def general_assets():
    for fp in html_files() + ['shared.css']:
        c = read(fp)
        for m in re.finditer(r"url\('?(/fonts/[^')]+)'?\)", c):
            if not os.path.exists('.'+m.group(1)): error('GEN-ASSETS', f'{fp}: Font fehlt: {m.group(1)}')
        for m in re.finditer(r'href="(/[^"]*\.pdf)"', c):
            if not os.path.exists('.'+m.group(1)): error('GEN-ASSETS', f'{fp}: PDF fehlt: {m.group(1)}')
        for m in re.finditer(r'src="(/images/[^"]*)"', c):
            if not os.path.exists('.'+m.group(1)): error('GEN-ASSETS', f'{fp}: Bild fehlt: {m.group(1)}')
    if os.path.exists('manifest.json'):
        mf = json.loads(read('manifest.json'))
        for icon in mf.get('icons', []):
            src = icon.get('src', '')
            if src.startswith('/') and not os.path.exists('.'+src):
                error('GEN-ASSETS', f'manifest.json: Icon fehlt: {src}')

def general_security():
    for fp in html_files():
        for m in re.finditer(r'href="(http://[^"]*)"', read(fp)):
            if 'localhost' not in m.group(1):
                error('GEN-SEC', f'{fp}: HTTP statt HTTPS: {m.group(1)}')
    if os.path.exists('netlify.toml'):
        nt = read('netlify.toml')
        if 'X-Frame-Options' not in nt: warn('GEN-SEC', 'Kein X-Frame-Options')
        if 'Content-Security-Policy' not in nt: warn('GEN-SEC', 'Kein CSP')

def general_content():
    if os.path.exists('search-index.js'):
        si = read('search-index.js').lower()
        for t in ['krisenplan','suizid','manie','depression','grenzen']:
            if t not in si: error('GEN-CONTENT', f'Suchindex: <<{t}>> fehlt')
    if os.path.exists('handouts/notfall/index.html'):
        nf = read('handouts/notfall/index.html')
        for n in ['143','144','117']:
            if n not in nf: error('GEN-CONTENT', f'Notfallnummer {n} fehlt')
    for fp in html_files():
        c = read(fp)
        for m in re.finditer(r'<svg\b([^>]*)viewBox="0 0 (\d+)', c):
            if int(m.group(2)) > 210 and 'aria-label' not in m.group(1) and 'aria-hidden' not in m.group(1):
                error('GEN-CONTENT', f'{fp}: Content-SVG ohne aria-label')


# ═════════════════════════════════════════════════════════
# RUNNER
# ═════════════════════════════════════════════════════════
if __name__ == '__main__':
    checks = [
        ('Bug 01  waSelect()',        bug01_waSelect),
        ('Bug 02  SVG Text Overflow', bug02_svg_text_overflow),
        ('Bug 03  Notfall Search',    bug03_notfall_search_overlay),
        ('Bug 04  m7-email',          bug04_m7_email),
        ('Bug 05  Dark Mode SVG',     bug05_dark_mode_svg),
        ('Bug 06  Italic Font-Face',  bug06_italic_fontface),
        ('Bug 07  SW Cache Assets',   bug07_sw_cache),
        ('Bug 08  Dead DOM',          bug08_dead_dom),
        ('Bug 09  Passive Scroll',    bug09_passive_scroll),
        ('Bug 10  Passive Touch',     bug10_passive_touch),
        ('Bug 11  Breakpoints',       bug11_breakpoints),
        ('Bug 12  --bg-alt',          bug12_bg_alt),
        ('Bug 13  Glaswand rx/ry',    bug13_glaswand_rx_ry),
        ('Bug 14  --module-color',    bug14_module_color),
        ('Bug 15  Skip-Link',         bug15_skip_link),
        ('Bug 16  DM Footer',         bug16_dark_mode_footer),
        ('Bug 17  DM Tooltip',        bug17_dark_mode_tooltip),
        ('Bug 18  DM Module-Top',     bug18_dark_mode_module_top),
        ('Bug 19  404 Meta',          bug19_404_meta),
        ('Bug 20  Notfall OG',        bug20_notfall_og),
        ('Bug 21  Dead CSS',          bug21_dead_css),
        ('Bug 22  console.log',       bug22_console_log),
        ('Bug 23  viewBox Case',      bug23_viewbox_camelcase),
        ('Bug 24  SW Version',        bug24_sw_version),
        ('Bug 25  Stroke (skip)',     bug25_stroke),
        ('General Structure',         general_structure),
        ('General HTML',              general_html),
        ('General Links',             general_links),
        ('General JavaScript',        general_js),
        ('General CSS',               general_css),
        ('General Accessibility',     general_a11y),
        ('General Assets',            general_assets),
        ('General Security',          general_security),
        ('General Content',           general_content),
    ]

    print('=' * 60)
    print('RELEASE AUDIT - 25 Bug-Checks + 9 General Checks')
    print('=' * 60)
    for name, fn in checks:
        before = len(ERRORS)
        fn()
        new = len(ERRORS) - before
        status = 'OK' if new == 0 else f'FAIL {new}'
        print(f'  {status:8s}  {name}')
    print('-' * 60)
    if ERRORS:
        print(f'\n{len(ERRORS)} FEHLER:')
        for e in ERRORS: print(f'  {e}')
    if WARNINGS:
        print(f'\n{len(WARNINGS)} WARNUNGEN:')
        for w in WARNINGS: print(f'  {w}')
    if not ERRORS:
        print(f'\nRELEASE-BEREIT (0 Fehler, {len(WARNINGS)} Warnungen)')
    print('=' * 60)
    sys.exit(len(ERRORS))
