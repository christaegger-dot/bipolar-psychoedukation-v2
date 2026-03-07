#!/usr/bin/env python3
"""
Spacing & Visual-Balance Audit für Bipolare-Erkrankung SVGs + CSS.
Prüft alle inline-SVGs und CSS-Abstände systematisch.
"""

import re, os, sys, math, json
from html.parser import HTMLParser
from collections import defaultdict
import xml.etree.ElementTree as ET

BASE = "/home/user/Bipolare-Erkrankung"
FILES = [
    "index.html",
    "modul/1/index.html",
    "modul/2/index.html",
    "modul/3/index.html",
    "modul/4/index.html",
    "modul/5/index.html",
    "modul/6/index.html",
    "modul/7/index.html",
]

CHAR_WIDTH_FACTOR = 0.6  # für deutsche Texte mit Umlauten

# ─── Helpers ───

def parse_transform(transform_str):
    """Extract translate(x,y) from transform attribute."""
    if not transform_str:
        return 0, 0
    m = re.search(r'translate\(\s*([^,\)]+)\s*,?\s*([^,\)]*)\s*\)', transform_str)
    if m:
        tx = float(m.group(1).strip())
        ty = float(m.group(2).strip()) if m.group(2).strip() else 0
        return tx, ty
    return 0, 0

def get_font_size(elem):
    """Get font-size from attribute or style."""
    # Direct attribute
    fs = elem.get('font-size')
    if fs:
        return float(re.sub(r'px$', '', str(fs)))
    # From style attribute
    style = elem.get('style', '')
    m = re.search(r'font-size:\s*(\d+(?:\.\d+)?)', style)
    if m:
        return float(m.group(1))
    return None

def get_text_content(elem):
    """Get all text content including tspan children."""
    parts = []
    if elem.text:
        parts.append(elem.text)
    for child in elem:
        tag = child.tag.split('}')[-1] if '}' in child.tag else child.tag
        if tag == 'tspan':
            if child.text:
                parts.append(child.text)
            if child.tail:
                parts.append(child.tail)
    return ''.join(parts).strip()

def estimate_text_width(text, font_size):
    return len(text) * font_size * CHAR_WIDTH_FACTOR

def safe_float(val, default=0):
    """Parse a numeric value, ignoring units like em, %, etc."""
    if val is None:
        return default
    val = str(val).strip()
    if not val:
        return default
    m = re.match(r'^([+-]?\d*\.?\d+)', val)
    if m:
        # Skip relative units that aren't px-based
        if 'em' in val or '%' in val:
            return default
        return float(m.group(1))
    return default

def get_absolute_pos(elem, parent_offsets):
    """Get absolute x, y considering parent transforms."""
    x = safe_float(elem.get('x', 0))
    y = safe_float(elem.get('y', 0))
    transform = elem.get('transform', '')
    tx, ty = parse_transform(transform)
    abs_x = x + tx + parent_offsets[0]
    abs_y = y + ty + parent_offsets[1]
    return abs_x, abs_y

def collect_transforms(elem, ns):
    """Walk up transform stack - returns cumulative (tx, ty) for a <g>."""
    tx, ty = parse_transform(elem.get('transform', ''))
    return tx, ty

def extract_svgs_from_html(filepath):
    """Extract all inline SVG blocks from an HTML file with line numbers."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    svgs = []
    # Find all <svg ...>...</svg> blocks
    pattern = re.compile(r'(<svg\b[^>]*>.*?</svg>)', re.DOTALL)
    for m in pattern.finditer(content):
        svg_text = m.group(1)
        # Calculate line number
        line_num = content[:m.start()].count('\n') + 1
        # Get aria-label
        aria_m = re.search(r'aria-label="([^"]*)"', svg_text)
        aria_label = aria_m.group(1) if aria_m else "(kein Label)"
        svgs.append({
            'text': svg_text,
            'line': line_num,
            'aria_label': aria_label,
        })
    return svgs

def parse_viewbox(svg_elem):
    """Parse viewBox attribute."""
    vb = svg_elem.get('viewBox', '')
    if not vb:
        return None
    parts = vb.split()
    if len(parts) == 4:
        return [float(p) for p in parts]
    return None

# ─── Element collection with transforms ───

def collect_elements(elem, parent_tx=0, parent_ty=0, default_fs=14):
    """Recursively collect text, rect, circle, ellipse, line elements with absolute positions."""
    tag = elem.tag.split('}')[-1] if '}' in elem.tag else elem.tag

    # Current element's transform
    tx, ty = parse_transform(elem.get('transform', ''))
    abs_tx = parent_tx + tx
    abs_ty = parent_ty + ty

    texts = []
    rects = []
    circles = []
    lines = []

    if tag == 'text':
        fs = get_font_size(elem) or default_fs
        x = safe_float(elem.get('x', 0))
        y = safe_float(elem.get('y', 0))
        content = get_text_content(elem)
        if content:
            texts.append({
                'x': x + abs_tx,
                'y': y + abs_ty,
                'font_size': fs,
                'content': content,
                'width': estimate_text_width(content, fs),
                'anchor': elem.get('text-anchor', 'start'),
            })
        # Also check for tspan with different positions
        for tspan in elem:
            tspan_tag = tspan.tag.split('}')[-1] if '}' in tspan.tag else tspan.tag
            if tspan_tag == 'tspan':
                tx2 = tspan.get('x')
                ty2 = tspan.get('y')
                if ty2:  # tspan with its own y = separate line
                    tfs = get_font_size(tspan) or fs
                    tc = tspan.text or ''
                    tc = tc.strip()
                    if tc:
                        texts.append({
                            'x': safe_float(tx2 or x) + abs_tx,
                            'y': safe_float(ty2) + abs_ty,
                            'font_size': tfs,
                            'content': tc,
                            'width': estimate_text_width(tc, tfs),
                            'anchor': tspan.get('text-anchor', elem.get('text-anchor', 'start')),
                        })

    elif tag == 'rect':
        x = safe_float(elem.get('x', 0))
        y = safe_float(elem.get('y', 0))
        w = safe_float(elem.get('width', 0))
        h = safe_float(elem.get('height', 0))
        rects.append({
            'x': x + abs_tx, 'y': y + abs_ty,
            'width': w, 'height': h,
        })

    elif tag == 'circle':
        cx = safe_float(elem.get('cx', 0))
        cy = safe_float(elem.get('cy', 0))
        r = safe_float(elem.get('r', 0))
        circles.append({
            'cx': cx + abs_tx, 'cy': cy + abs_ty,
            'r': r,
            'x': cx - r + abs_tx, 'y': cy - r + abs_ty,
            'width': 2*r, 'height': 2*r,
        })

    elif tag == 'ellipse':
        cx = safe_float(elem.get('cx', 0))
        cy = safe_float(elem.get('cy', 0))
        rx = safe_float(elem.get('rx', 0))
        ry = safe_float(elem.get('ry', 0))
        circles.append({
            'cx': cx + abs_tx, 'cy': cy + abs_ty,
            'r': max(rx, ry),
            'x': cx - rx + abs_tx, 'y': cy - ry + abs_ty,
            'width': 2*rx, 'height': 2*ry,
        })

    elif tag == 'line':
        x1 = safe_float(elem.get('x1', 0)) + abs_tx
        y1 = safe_float(elem.get('y1', 0)) + abs_ty
        x2 = safe_float(elem.get('x2', 0)) + abs_tx
        y2 = safe_float(elem.get('y2', 0)) + abs_ty
        lines.append({'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2})

    # Recurse into children
    for child in elem:
        ct, cr, cc, cl = collect_elements(child, abs_tx, abs_ty, default_fs)
        texts.extend(ct)
        rects.extend(cr)
        circles.extend(cc)
        lines.extend(cl)

    return texts, rects, circles, lines


# ─── Audit functions ───

def audit_text_to_text(texts):
    """1.1 Text-zu-Text-Abstand."""
    issues = []
    # Sort by y position
    sorted_texts = sorted(texts, key=lambda t: (t['y'], t['x']))

    for i in range(len(sorted_texts) - 1):
        t1 = sorted_texts[i]
        for j in range(i+1, min(i+6, len(sorted_texts))):  # check next 5
            t2 = sorted_texts[j]
            # Only check if in similar x range (within 200px)
            if abs(t1['x'] - t2['x']) > 300:
                continue
            vert_dist = t2['y'] - t1['y'] - t1['font_size']
            if vert_dist < 0:
                continue  # overlapping handled elsewhere
            if vert_dist >= 0 and vert_dist < 50:  # only close texts
                if vert_dist < 4:
                    issues.append({
                        'severity': '🟡',
                        'type': 'text-text-enge',
                        'msg': f'Text "{t1["content"][:30]}" und "{t2["content"][:30]}" nur {vert_dist:.1f}px vertikaler Abstand (< 4px)',
                        'dist': vert_dist,
                    })
                elif vert_dist < t1['font_size'] * 0.3:
                    issues.append({
                        'severity': '🟡',
                        'type': 'text-text-enge',
                        'msg': f'Text "{t1["content"][:30]}" und "{t2["content"][:30]}" nur {vert_dist:.1f}px Abstand (< 30% von fontSize {t1["font_size"]})',
                        'dist': vert_dist,
                    })
    return issues

def get_text_bbox(t):
    """Get bounding box of a text element."""
    x = t['x']
    w = t['width']
    anchor = t.get('anchor', 'start')
    if anchor == 'middle':
        x -= w / 2
    elif anchor == 'end':
        x -= w
    y_top = t['y'] - t['font_size']
    y_bottom = t['y']
    return x, y_top, x + w, y_bottom

def audit_text_to_rect(texts, rects):
    """1.2 Text-zu-Rand-Abstand."""
    issues = []
    for t in texts:
        tx, ty_top, tx_right, ty_bottom = get_text_bbox(t)
        for r in rects:
            # Is text inside this rect?
            if (tx >= r['x'] - 5 and ty_top >= r['y'] - 5 and
                tx_right <= r['x'] + r['width'] + 5 and
                ty_bottom <= r['y'] + r['height'] + 5):
                # Calculate padding
                pad_left = tx - r['x']
                pad_right = (r['x'] + r['width']) - tx_right
                pad_top = ty_top - r['y']
                pad_bottom = (r['y'] + r['height']) - ty_bottom

                for name, val in [('links', pad_left), ('rechts', pad_right), ('oben', pad_top), ('unten', pad_bottom)]:
                    if val < 6 and val >= -2:
                        issues.append({
                            'severity': '🟡',
                            'type': 'text-rect-enge',
                            'msg': f'Text "{t["content"][:30]}" nur {val:.1f}px zum rect-Rand ({name})',
                            'dist': val,
                        })

                # Asymmetry check
                if pad_left > 0 and pad_right > 0:
                    min_lr = min(pad_left, pad_right)
                    max_lr = max(pad_left, pad_right)
                    if min_lr > 0 and (max_lr - min_lr) / min_lr > 0.5:
                        if max_lr - min_lr > 10:  # only flag significant asymmetry
                            issues.append({
                                'severity': '🟡',
                                'type': 'text-rect-asymm',
                                'msg': f'Text "{t["content"][:30]}" asymmetrisches Padding: links={pad_left:.0f}px rechts={pad_right:.0f}px',
                                'dist': 0,
                            })
                break  # only match first (innermost) rect
    return issues

def audit_element_to_element(rects, circles):
    """1.3 Element-zu-Element-Abstand."""
    issues = []
    boxes = []
    for r in rects:
        boxes.append({'type': 'rect', 'x': r['x'], 'y': r['y'], 'w': r['width'], 'h': r['height']})
    for c in circles:
        boxes.append({'type': 'circle', 'x': c['x'], 'y': c['y'], 'w': c['width'], 'h': c['height']})

    for i in range(len(boxes)):
        for j in range(i+1, len(boxes)):
            b1, b2 = boxes[i], boxes[j]
            # Vertical distance
            if b1['y'] + b1['h'] <= b2['y']:
                vdist = b2['y'] - (b1['y'] + b1['h'])
            elif b2['y'] + b2['h'] <= b1['y']:
                vdist = b1['y'] - (b2['y'] + b2['h'])
            else:
                vdist = None  # overlapping vertically

            # Horizontal distance
            if b1['x'] + b1['w'] <= b2['x']:
                hdist = b2['x'] - (b1['x'] + b1['w'])
            elif b2['x'] + b2['w'] <= b1['x']:
                hdist = b1['x'] - (b2['x'] + b2['w'])
            else:
                hdist = None  # overlapping horizontally

            # Check if they're close neighbors
            if vdist is not None and hdist is None:
                # Vertically adjacent
                if 0 <= vdist < 8:
                    sev = '🟡'
                    msg = f'{b1["type"]} und {b2["type"]} nur {vdist:.1f}px vertikaler Abstand'
                    if vdist == 0:
                        msg += ' (berühren sich!)'
                    issues.append({'severity': sev, 'type': 'elem-elem-enge', 'msg': msg, 'dist': vdist})
            elif hdist is not None and vdist is None:
                if 0 <= hdist < 8:
                    sev = '🟡'
                    msg = f'{b1["type"]} und {b2["type"]} nur {hdist:.1f}px horizontaler Abstand'
                    if hdist == 0:
                        msg += ' (berühren sich!)'
                    issues.append({'severity': sev, 'type': 'elem-elem-enge', 'msg': msg, 'dist': hdist})
    return issues

def audit_text_to_viewbox(texts, viewbox):
    """1.4 Text-zu-viewBox-Rand."""
    issues = []
    if not viewbox:
        return issues
    vb_x, vb_y, vb_w, vb_h = viewbox
    for t in texts:
        tx, ty_top, tx_right, ty_bottom = get_text_bbox(t)

        pad_left = tx - vb_x
        pad_right = (vb_x + vb_w) - tx_right
        pad_top = ty_top - vb_y
        pad_bottom = (vb_y + vb_h) - ty_bottom

        for name, val in [('links', pad_left), ('rechts', pad_right), ('oben', pad_top), ('unten', pad_bottom)]:
            if val < 5:
                issues.append({
                    'severity': '🟡',
                    'type': 'text-viewbox',
                    'msg': f'Text "{t["content"][:30]}" nur {val:.1f}px zum viewBox-Rand ({name})',
                    'dist': val,
                })
    return issues

def audit_overlaps(texts, rects, circles):
    """1.5 Überlappungen."""
    issues = []

    # Build bounding boxes for all elements
    all_boxes = []
    for t in texts:
        x, y_top, x_right, y_bottom = get_text_bbox(t)
        all_boxes.append({
            'type': 'text',
            'label': t['content'][:30],
            'x1': x, 'y1': y_top, 'x2': x_right, 'y2': y_bottom,
        })
    for r in rects:
        all_boxes.append({
            'type': 'rect',
            'label': f'rect@({r["x"]:.0f},{r["y"]:.0f})',
            'x1': r['x'], 'y1': r['y'],
            'x2': r['x'] + r['width'], 'y2': r['y'] + r['height'],
        })

    # Check text-text overlaps
    text_boxes = [b for b in all_boxes if b['type'] == 'text']
    for i in range(len(text_boxes)):
        for j in range(i+1, len(text_boxes)):
            b1, b2 = text_boxes[i], text_boxes[j]
            # Check overlap
            if (b1['x1'] < b2['x2'] and b1['x2'] > b2['x1'] and
                b1['y1'] < b2['y2'] and b1['y2'] > b2['y1']):
                # Calculate overlap area
                ox = min(b1['x2'], b2['x2']) - max(b1['x1'], b2['x1'])
                oy = min(b1['y2'], b2['y2']) - max(b1['y1'], b2['y1'])
                if ox > 2 and oy > 2:  # significant overlap
                    issues.append({
                        'severity': '🔴',
                        'type': 'overlap',
                        'msg': f'Text "{b1["label"]}" überlappt mit "{b2["label"]}" ({ox:.0f}×{oy:.0f}px)',
                        'dist': -1,
                    })

    return issues

def audit_vertical_rhythm(texts):
    """Teil 3.1: Konsistenz der vertikalen Abstände."""
    sorted_texts = sorted(texts, key=lambda t: t['y'])
    distances = []
    for i in range(len(sorted_texts) - 1):
        t1, t2 = sorted_texts[i], sorted_texts[i+1]
        d = t2['y'] - t1['y']
        if 0 < d < 100:  # reasonable range
            distances.append(d)

    if len(distances) < 3:
        return {'median': 0, 'stddev': 0, 'ratio': 0, 'n': len(distances), 'status': 'zu wenig Daten'}

    distances.sort()
    median = distances[len(distances) // 2]
    mean = sum(distances) / len(distances)
    variance = sum((d - mean) ** 2 for d in distances) / len(distances)
    stddev = math.sqrt(variance)
    ratio = stddev / median if median > 0 else 0

    status = 'OK' if ratio < 0.4 else 'unruhig'
    return {
        'median': round(median, 1),
        'stddev': round(stddev, 1),
        'ratio': round(ratio * 100),
        'n': len(distances),
        'status': status,
    }


# ─── CSS Audit ───

def audit_css(css_path):
    """Teil 2: CSS-Abstände prüfen."""
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()

    issues = []

    # Helper: find property value in a rule block
    def find_rules(selector_pattern, properties):
        results = []
        # Find all rules matching selector
        pattern = re.compile(
            r'(' + selector_pattern + r')\s*\{([^}]*)\}',
            re.DOTALL
        )
        for m in pattern.finditer(css):
            selector = m.group(1).strip()
            block = m.group(2)
            for prop in properties:
                prop_pattern = re.compile(r'\b' + prop + r'\s*:\s*([^;]+)')
                pm = prop_pattern.search(block)
                if pm:
                    results.append({
                        'selector': selector,
                        'property': prop,
                        'value': pm.group(1).strip(),
                        'line': css[:m.start()].count('\n') + 1,
                    })
        return results

    # 2.1 SVG container margins
    svg_selectors = r'\.svg-wrap|\.diagram-wrap|\.info-svg|\.chart-wrap|\.fig-wrap|\.visual-wrap|\.svg-container|\.svg-box|\.dia-wrap|\.fig-box'
    svg_rules = find_rules(svg_selectors, ['margin', 'margin-top', 'margin-bottom', 'padding'])

    # 2.2 Section spacing
    section_selectors = r'\.section\b|\.sc-wrap|\.module-section|\.content-section'
    section_rules = find_rules(section_selectors, ['margin', 'margin-top', 'margin-bottom', 'padding', 'gap'])

    # 2.3 Card grids
    card_selectors = r'\.card-grid|\.handout-grid|\.module-cta-grid|\.cta-grid'
    card_rules = find_rules(card_selectors, ['gap', 'margin', 'padding'])

    # 2.4 Accordion
    acc_selectors = r'\.acc-content|\.mg-content|\.faq-content|\.accordion-content'
    acc_rules = find_rules(acc_selectors, ['padding', 'margin'])

    def parse_rem(val):
        """Parse rem/px value to px."""
        m = re.search(r'([\d.]+)\s*rem', val)
        if m:
            return float(m.group(1)) * 16
        m = re.search(r'([\d.]+)\s*px', val)
        if m:
            return float(m.group(1))
        return None

    # Check SVG margins
    for r in svg_rules:
        px = parse_rem(r['value'])
        if px is not None and px < 24:
            issues.append({
                'severity': '🟡',
                'type': 'css-svg-margin',
                'msg': f'{r["selector"]} → {r["property"]}: {r["value"]} ({px:.0f}px < 24px)',
                'line': r['line'],
            })

    # Check section spacing
    for r in section_rules:
        px = parse_rem(r['value'])
        if px is not None and px < 32:
            issues.append({
                'severity': '🟡',
                'type': 'css-section-gap',
                'msg': f'{r["selector"]} → {r["property"]}: {r["value"]} ({px:.0f}px < 32px)',
                'line': r['line'],
            })

    # Check card gaps
    for r in card_rules:
        px = parse_rem(r['value'])
        if px is not None and px < 16:
            issues.append({
                'severity': '🟡',
                'type': 'css-card-gap',
                'msg': f'{r["selector"]} → {r["property"]}: {r["value"]} ({px:.0f}px < 16px)',
                'line': r['line'],
            })

    # Check accordion padding
    for r in acc_rules:
        px = parse_rem(r['value'])
        if px is not None and px < 16:
            issues.append({
                'severity': '🟡',
                'type': 'css-acc-padding',
                'msg': f'{r["selector"]} → {r["property"]}: {r["value"]} ({px:.0f}px < 16px)',
                'line': r['line'],
            })

    # Also do broader search for these class names and their spacing
    broader_results = []

    # Search for all SVG-related wrapper patterns
    svg_wrapper_pattern = re.compile(r'([.\w-]*svg[.\w-]*|[.\w-]*diagram[.\w-]*|[.\w-]*chart[.\w-]*|[.\w-]*fig[.\w-]*)\s*\{([^}]*)\}', re.DOTALL)
    for m in svg_wrapper_pattern.finditer(css):
        sel = m.group(1).strip()
        block = m.group(2)
        for prop in ['margin', 'margin-top', 'margin-bottom']:
            pm = re.search(r'\b' + prop + r'\s*:\s*([^;]+)', block)
            if pm:
                broader_results.append({'selector': sel, 'property': prop, 'value': pm.group(1).strip()})

    # Search for gap in grid containers
    gap_pattern = re.compile(r'([\w.-]+)\s*\{[^}]*\bgap\s*:\s*([^;]+)', re.DOTALL)
    for m in gap_pattern.finditer(css):
        broader_results.append({'selector': m.group(1).strip(), 'property': 'gap', 'value': m.group(2).strip()})

    return issues, svg_rules, section_rules, card_rules, acc_rules, broader_results


# ─── Main ───

def main():
    all_svg_results = []
    all_rhythm_data = []

    print("=" * 80)
    print("  SPACING & VISUAL-BALANCE AUDIT")
    print("  Bipolare-Erkrankung — Psychoedukations-Website")
    print("=" * 80)
    print()

    # ─── TEIL 1: SVG-INTERNE ABSTÄNDE ───
    print("## TEIL 1: SVG-interne Abstände")
    print("=" * 80)
    print()

    for fpath in FILES:
        full_path = os.path.join(BASE, fpath)
        if not os.path.exists(full_path):
            print(f"WARNUNG: {fpath} nicht gefunden")
            continue

        svgs = extract_svgs_from_html(full_path)
        if not svgs:
            continue

        print(f"\n### Datei: {fpath} ({len(svgs)} SVGs)")
        print("-" * 60)

        for idx, svg_data in enumerate(svgs):
            svg_text = svg_data['text']
            line_num = svg_data['line']
            aria = svg_data['aria_label']

            # Parse SVG XML
            try:
                # Wrap in namespace-cleaned version
                cleaned = re.sub(r'xmlns:[a-z]+="[^"]*"', '', svg_text)
                cleaned = re.sub(r'xlink:href', 'href', cleaned)
                root = ET.fromstring(cleaned)
            except ET.ParseError as e:
                print(f"\n#### SVG #{idx+1}: {fpath}:{line_num} — {aria}")
                print(f"  ⚠️ XML Parse Error: {e}")
                continue

            viewbox = parse_viewbox(root)
            texts, rects, circles, lines = collect_elements(root)

            # Remove duplicate texts (from parent text + tspan)
            seen = set()
            unique_texts = []
            for t in texts:
                key = (round(t['x'], 1), round(t['y'], 1), t['content'][:20])
                if key not in seen:
                    seen.add(key)
                    unique_texts.append(t)
            texts = unique_texts

            # Run all audits
            issues = []
            issues.extend(audit_text_to_text(texts))
            issues.extend(audit_text_to_rect(texts, rects))
            issues.extend(audit_element_to_element(rects, circles))
            issues.extend(audit_text_to_viewbox(texts, viewbox))
            issues.extend(audit_overlaps(texts, rects, circles))

            rhythm = audit_vertical_rhythm(texts)

            # Count by severity
            overlaps = len([i for i in issues if i['severity'] == '🔴'])
            warnings = len([i for i in issues if i['severity'] == '🟡'])

            vb_str = f"{viewbox[0]:.0f} {viewbox[1]:.0f} {viewbox[2]:.0f} {viewbox[3]:.0f}" if viewbox else "?"

            print(f"\n#### SVG #{idx+1}: {fpath}:{line_num} — «{aria}»")
            print(f"  viewBox: {vb_str}, Elemente: {len(texts)} text, {len(rects)} rect, {len(circles)} circle")

            if issues:
                # Sort: 🔴 first, then by distance
                issues.sort(key=lambda i: (0 if i['severity'] == '🔴' else 1, i.get('dist', 0)))
                for iss in issues:
                    print(f"  {iss['severity']} {iss['msg']}")
            else:
                print(f"  ✅ Keine Engstellen oder Überlappungen gefunden")

            if rhythm['n'] >= 3:
                print(f"  Vertikaler Rhythmus: Median {rhythm['median']}px, StdDev {rhythm['stddev']}px ({rhythm['ratio']}%) — {rhythm['status']}")

            all_svg_results.append({
                'file': fpath,
                'line': line_num,
                'aria': aria,
                'overlaps': overlaps,
                'warnings': warnings,
                'rhythm': rhythm['status'],
                'issues': issues,
                'texts': len(texts),
                'rects': len(rects),
            })
            all_rhythm_data.append({
                'file': fpath,
                'line': line_num,
                'aria': aria,
                'rhythm': rhythm,
            })

    # ─── TEIL 2: CSS-ABSTÄNDE ───
    print()
    print()
    print("## TEIL 2: CSS-Abstände")
    print("=" * 80)

    css_path = os.path.join(BASE, "shared.css")
    css_issues, svg_rules, section_rules, card_rules, acc_rules, broader = audit_css(css_path)

    print("\n### 2.1 SVG-Container-Margins")
    if svg_rules:
        for r in svg_rules:
            print(f"  {r['selector']} → {r['property']}: {r['value']} (Zeile {r['line']})")
    else:
        print("  Keine dedizierten SVG-Wrapper-Klassen mit margin gefunden")
    print()

    print("### 2.2 Sektions-Abstände")
    if section_rules:
        for r in section_rules:
            print(f"  {r['selector']} → {r['property']}: {r['value']} (Zeile {r['line']})")
    else:
        print("  Keine .section/.sc-wrap rules mit margin gefunden")
    print()

    print("### 2.3 Card-Grid-Abstände")
    if card_rules:
        for r in card_rules:
            print(f"  {r['selector']} → {r['property']}: {r['value']} (Zeile {r['line']})")
    else:
        print("  Keine card-grid rules gefunden")
    print()

    print("### 2.4 Accordion-Padding")
    if acc_rules:
        for r in acc_rules:
            print(f"  {r['selector']} → {r['property']}: {r['value']} (Zeile {r['line']})")
    else:
        print("  Keine acc-content rules gefunden")
    print()

    if css_issues:
        print("### CSS-Befunde:")
        for iss in css_issues:
            print(f"  {iss['severity']} {iss['msg']}")
    else:
        print("### ✅ CSS-Abstände im grünen Bereich")

    # ─── TEIL 3: VERTIKALER RHYTHMUS ───
    print()
    print()
    print("## TEIL 3: Vertikaler Rhythmus — Konsistenz")
    print("=" * 80)

    print("\n### 3.1 Pro SVG:")
    unruhig_svgs = []
    for rd in all_rhythm_data:
        r = rd['rhythm']
        if r['n'] >= 3:
            flag = " ⚠️" if r['status'] == 'unruhig' else ""
            print(f"  {rd['file']}:{rd['line']} «{rd['aria'][:40]}» — Median {r['median']}px, StdDev {r['stddev']}px ({r['ratio']}%) — {r['status']}{flag}")
            if r['status'] == 'unruhig':
                unruhig_svgs.append(rd)

    print(f"\n### 3.2 Konsistenz zwischen SVGs:")
    medians = [rd['rhythm']['median'] for rd in all_rhythm_data if rd['rhythm']['n'] >= 3 and rd['rhythm']['median'] > 0]
    if medians:
        avg_median = sum(medians) / len(medians)
        for rd in all_rhythm_data:
            r = rd['rhythm']
            if r['n'] >= 3 and r['median'] > 0:
                deviation = abs(r['median'] - avg_median) / avg_median * 100
                if deviation > 50:
                    print(f"  ⚠️ {rd['file']}:{rd['line']} «{rd['aria'][:40]}» Median {r['median']}px weicht {deviation:.0f}% vom Durchschnitt ({avg_median:.1f}px) ab")
        print(f"  Durchschnittlicher Median: {avg_median:.1f}px")

    # ─── ZUSAMMENFASSUNG ───
    print()
    print()
    print("## ZUSAMMENFASSUNG")
    print("=" * 80)
    print()
    print(f"| {'SVG':<35} | {'Datei':<25} | {'Überlapp.':<10} | {'Engstellen':<11} | {'Rhythmus':<10} |")
    print(f"|{'-'*37}|{'-'*27}|{'-'*12}|{'-'*13}|{'-'*12}|")

    for svgr in all_svg_results:
        name = svgr['aria'][:33]
        file_loc = f"{svgr['file']}:{svgr['line']}"
        ovl = f"{svgr['overlaps']} 🔴" if svgr['overlaps'] > 0 else "0"
        wrn = str(svgr['warnings'])
        rhy = svgr['rhythm']
        print(f"| {name:<35} | {file_loc:<25} | {ovl:<10} | {wrn:<11} | {rhy:<10} |")

    # Totals
    total_overlaps = sum(s['overlaps'] for s in all_svg_results)
    total_warnings = sum(s['warnings'] for s in all_svg_results)
    total_unruhig = len(unruhig_svgs)

    print()
    print(f"**Gesamt:** {total_overlaps} Überlappungen (🔴), {total_warnings} Engstellen (🟡), {total_unruhig} unruhige Rhythmen")

    # ─── PRIORISIERTE FIX-LISTE ───
    print()
    print()
    print("## PRIORISIERTE FIX-LISTE")
    print("=" * 80)

    # Collect all issues
    all_issues = []
    for svgr in all_svg_results:
        for iss in svgr['issues']:
            all_issues.append({
                'file': svgr['file'],
                'line': svgr['line'],
                'aria': svgr['aria'],
                **iss,
            })

    # Priority 1: Overlaps
    overlaps = [i for i in all_issues if i['severity'] == '🔴']
    if overlaps:
        print(f"\n### Priorität 1: Überlappungen ({len(overlaps)} Befunde)")
        for i, iss in enumerate(overlaps, 1):
            print(f"  {i}. 🔴 {iss['file']}:{iss['line']} «{iss['aria'][:30]}» — {iss['msg']}")

    # Priority 2: Critical tightness (< 4px)
    critical = [i for i in all_issues if i['severity'] == '🟡' and i.get('dist', 99) < 4 and i.get('dist', -1) >= 0]
    if critical:
        print(f"\n### Priorität 2: Kritische Engstellen < 4px ({len(critical)} Befunde)")
        for i, iss in enumerate(critical, 1):
            print(f"  {i}. 🟡 {iss['file']}:{iss['line']} «{iss['aria'][:30]}» — {iss['msg']}")

    # Priority 3: Moderate tightness
    moderate = [i for i in all_issues if i['severity'] == '🟡' and (i.get('dist', 0) >= 4 or i.get('dist', -1) < 0)]
    if moderate:
        print(f"\n### Priorität 3: Moderate Engstellen / Asymmetrien ({len(moderate)} Befunde)")
        for i, iss in enumerate(moderate, 1):
            print(f"  {i}. 🟡 {iss['file']}:{iss['line']} «{iss['aria'][:30]}» — {iss['msg']}")

    # Priority 4: Rhythm issues
    if unruhig_svgs:
        print(f"\n### Priorität 4: Unruhiger Rhythmus ({len(unruhig_svgs)} SVGs)")
        for i, rd in enumerate(unruhig_svgs, 1):
            r = rd['rhythm']
            print(f"  {i}. {rd['file']}:{rd['line']} «{rd['aria'][:30]}» — StdDev {r['stddev']}px ({r['ratio']}% des Medians)")

    # CSS issues
    if css_issues:
        print(f"\n### CSS-Befunde ({len(css_issues)} Befunde)")
        for i, iss in enumerate(css_issues, 1):
            print(f"  {i}. {iss['severity']} shared.css:{iss['line']} — {iss['msg']}")

    print()
    print("=" * 80)
    print("  AUDIT ABGESCHLOSSEN")
    print("=" * 80)

if __name__ == '__main__':
    main()
