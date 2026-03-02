#!/usr/bin/env python3
"""SVG Text-in-Box Audit: Finds text elements that overflow their containers."""

import re
import sys
import os
import xml.etree.ElementTree as ET

CHAR_WIDTH_FACTOR = 0.6  # average char width as fraction of font-size for German text


def extract_svgs_from_file(filepath):
    """Extract inline SVG blocks from an HTML file by matching balanced tags."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    svgs = []
    # Find SVG opening tags that have aria-label (content SVGs, not decorative)
    for m in re.finditer(r'<svg\s[^>]*aria-label="[^"]*"[^>]*>', content):
        start = m.start()
        # Find the matching </svg> by counting nesting
        depth = 1
        pos = m.end()
        while depth > 0 and pos < len(content):
            next_open = content.find('<svg', pos)
            next_close = content.find('</svg>', pos)
            if next_close == -1:
                break
            if next_open != -1 and next_open < next_close:
                depth += 1
                pos = next_open + 4
            else:
                depth -= 1
                if depth == 0:
                    end = next_close + 6  # len('</svg>')
                    svg_text = content[start:end]
                    line_num = content[:start].count('\n') + 1

                    label_match = re.search(r'aria-label="([^"]*)"', svg_text[:200])
                    label = label_match.group(1) if label_match else "unknown"

                    vb_match = re.search(r'viewBox="([^"]*)"', svg_text[:200])
                    viewbox = vb_match.group(1) if vb_match else "0 0 600 400"

                    svgs.append({
                        'xml': svg_text,
                        'line': line_num,
                        'label': label,
                        'viewbox': viewbox,
                    })
                pos = next_close + 6

    return svgs


def parse_viewbox(vb_str):
    parts = vb_str.split()
    return tuple(float(p) for p in parts)


def get_transform_offset(elem):
    tx, ty = 0, 0
    transform = elem.get('transform', '')
    m = re.search(r'translate\(\s*([-\d.]+)\s*[,\s]\s*([-\d.]+)\s*\)', transform)
    if m:
        tx = float(m.group(1))
        ty = float(m.group(2))
    return tx, ty


def strip_ns(tag):
    return tag.split('}')[1] if '}' in tag else tag


def parse_font_size(elem):
    """Extract font-size from attribute or style."""
    fs_str = elem.get('font-size', '')
    if fs_str:
        fs_str = re.sub(r'[^0-9.]', '', fs_str)
        if fs_str:
            return float(fs_str)
    style = elem.get('style', '')
    if 'font-size' in style:
        m = re.search(r'font-size:\s*([\d.]+)', style)
        if m:
            return float(m.group(1))
    return None


def analyze_svg(svg_data, filepath):
    """Analyze a single SVG for text-container issues."""
    results = {
        'file': filepath,
        'line': svg_data['line'],
        'label': svg_data['label'],
        'viewbox': svg_data['viewbox'],
        'red': [],
        'yellow': [],
        'texts': [],
        'containers': [],
        'parse_error': None,
    }

    vb_x, vb_y, vb_w, vb_h = parse_viewbox(svg_data['viewbox'])

    # Clean XML for parsing
    xml_str = svg_data['xml']
    xml_str = re.sub(r'\s+on\w+="[^"]*"', '', xml_str)
    xml_str = re.sub(r'&(?!amp;|lt;|gt;|quot;|apos;|#)', '&amp;', xml_str)

    try:
        root = ET.fromstring(xml_str)
    except ET.ParseError as e:
        results['parse_error'] = str(e)
        return results

    # Strip namespaces
    for elem in root.iter():
        elem.tag = strip_ns(elem.tag)

    # Collect containers
    containers = []

    def collect_containers(parent, ptx=0, pty=0):
        tx, ty = get_transform_offset(parent)
        ctx, cty = ptx + tx, pty + ty
        for child in parent:
            child_tx, child_ty = get_transform_offset(child)
            ttx, tty = ctx + child_tx, cty + child_ty
            tag = strip_ns(child.tag)

            if tag == 'rect':
                x = float(child.get('x', 0)) + ttx
                y = float(child.get('y', 0)) + tty
                w = float(child.get('width', 0))
                h = float(child.get('height', 0))
                # Skip very small rects (decorative lines, etc.)
                if w > 20 and h > 10:
                    containers.append({
                        'type': 'rect', 'x': x, 'y': y, 'w': w, 'h': h,
                        'startX': x, 'endX': x + w, 'startY': y, 'endY': y + h,
                    })
            elif tag == 'ellipse':
                cx = float(child.get('cx', 0)) + ttx
                cy = float(child.get('cy', 0)) + tty
                rx = float(child.get('rx', 0))
                ry = float(child.get('ry', 0))
                if rx > 10:
                    containers.append({
                        'type': 'ellipse', 'cx': cx, 'cy': cy, 'rx': rx, 'ry': ry,
                        'startX': cx - rx, 'endX': cx + rx, 'startY': cy - ry, 'endY': cy + ry,
                    })
            elif tag == 'circle':
                cx = float(child.get('cx', 0)) + ttx
                cy = float(child.get('cy', 0)) + tty
                r = float(child.get('r', 0))
                if r > 10:
                    containers.append({
                        'type': 'circle', 'cx': cx, 'cy': cy, 'r': r,
                        'startX': cx - r, 'endX': cx + r, 'startY': cy - r, 'endY': cy + r,
                    })
            if tag == 'g':
                collect_containers(child, ttx, tty)

    collect_containers(root)

    # Collect texts
    texts = []
    default_fs = 18

    def collect_texts(parent, ptx=0, pty=0, inherited_fs=None):
        tx, ty = get_transform_offset(parent)
        ctx, cty = ptx + tx, pty + ty

        # Check for font-size on parent
        parent_fs = parse_font_size(parent)
        if parent_fs:
            inherited_fs = parent_fs

        for child in parent:
            child_tx, child_ty = get_transform_offset(child)
            ttx, tty = ctx + child_tx, cty + child_ty
            tag = strip_ns(child.tag)

            if tag == 'text':
                x = float(child.get('x', 0)) + ttx
                y = float(child.get('y', 0)) + tty
                anchor = child.get('text-anchor', 'start')

                fs = parse_font_size(child)
                if not fs:
                    fs = inherited_fs or default_fs

                # Check for tspans
                tspans = list(child)
                has_tspans = any(strip_ns(ts.tag) == 'tspan' for ts in tspans)

                if has_tspans:
                    for ts in tspans:
                        if strip_ns(ts.tag) != 'tspan':
                            continue
                        ts_text = ''.join(ts.itertext()).strip()
                        if not ts_text:
                            continue
                        ts_x = ts.get('x')
                        ts_y = ts.get('y')
                        ts_dy = ts.get('dy')
                        t_x = float(ts_x) + ttx if ts_x else x
                        t_y = float(ts_y) + tty if ts_y else y
                        if ts_dy:
                            t_y = y + float(ts_dy)
                        ts_fs = parse_font_size(ts) or fs
                        ts_anchor = ts.get('text-anchor', anchor)
                        texts.append({
                            'x': t_x, 'y': t_y, 'text': ts_text,
                            'fs': ts_fs, 'anchor': ts_anchor
                        })
                else:
                    text_content = ''.join(child.itertext()).strip()
                    if text_content:
                        texts.append({
                            'x': x, 'y': y, 'text': text_content,
                            'fs': fs, 'anchor': anchor
                        })

            if tag == 'g':
                collect_texts(child, ttx, tty, inherited_fs)

    collect_texts(root)

    results['texts'] = texts
    results['containers'] = containers

    # === Analysis 1: Text in containers ===
    for t in texts:
        text_width = len(t['text']) * t['fs'] * CHAR_WIDTH_FACTOR

        if t['anchor'] == 'middle':
            t_startX = t['x'] - text_width / 2
            t_endX = t['x'] + text_width / 2
        elif t['anchor'] == 'end':
            t_startX = t['x'] - text_width
            t_endX = t['x']
        else:
            t_startX = t['x']
            t_endX = t['x'] + text_width

        t_topY = t['y'] - t['fs']
        t_botY = t['y']
        t_centerX = (t_startX + t_endX) / 2
        t_centerY = (t_topY + t_botY) / 2

        # Find container
        best_container = None
        best_area = float('inf')
        for c in containers:
            if (c['startX'] <= t_centerX <= c['endX'] and
                c['startY'] <= t_centerY <= c['endY']):
                # Pick smallest enclosing container
                area = (c['endX'] - c['startX']) * (c['endY'] - c['startY'])
                if area < best_area:
                    best_area = area
                    best_container = c

        if best_container:
            c = best_container
            c_width = c['endX'] - c['startX']
            c_height = c['endY'] - c['startY']

            # Skip false positives: text much wider than container
            # (e.g. axis hint text crossing through a circle)
            if text_width > 3 * c_width:
                best_container = None
            # Skip false positives: text clearly below an ellipse/circle
            # (label text whose y baseline is below the container bottom)
            elif c['type'] in ('ellipse', 'circle') and t_botY > c['endY']:
                best_container = None
            # Skip false positives: single decorative chars (arrows, etc.)
            # that are positioned between containers
            elif len(t['text'].strip()) <= 1:
                best_container = None

        if best_container:
            c = best_container
            pad_left = t_startX - c['startX']
            pad_right = c['endX'] - t_endX
            pad_top = t_topY - c['startY']
            pad_bottom = c['endY'] - t_botY

            # For curved shapes, compute effective width at text Y
            if c['type'] in ('circle', 'ellipse'):
                if c['type'] == 'circle':
                    r = c['r']
                    cx, cy = c['cx'], c['cy']
                    dy = abs(t_centerY - cy)
                    if dy < r:
                        half_w = (r**2 - dy**2)**0.5
                    else:
                        half_w = 0
                else:
                    rx, ry = c['rx'], c['ry']
                    cx, cy = c['cx'], c['cy']
                    dy = abs(t_centerY - cy)
                    if dy < ry:
                        half_w = rx * (1 - (dy / ry)**2)**0.5
                    else:
                        half_w = 0
                    cx = c['cx']

                eff_startX = cx - half_w
                eff_endX = cx + half_w
                pad_left = t_startX - eff_startX
                pad_right = eff_endX - t_endX

            issue = {
                'text': t['text'],
                'fs': t['fs'],
                'container': f"{c['type']}",
                'pad_left': round(pad_left, 1),
                'pad_right': round(pad_right, 1),
                'pad_top': round(pad_top, 1),
                'pad_bottom': round(pad_bottom, 1),
            }

            status_parts = []
            for side, val in [('L', pad_left), ('R', pad_right), ('T', pad_top), ('B', pad_bottom)]:
                if val < 0:
                    status_parts.append(f"🔴{side}={round(val,1)}")
                elif val < 6:
                    status_parts.append(f"🟡{side}={round(val,1)}")

            if status_parts:
                issue['status'] = ' '.join(status_parts)
                if any(s.startswith('🔴') for s in status_parts):
                    results['red'].append(issue)
                else:
                    results['yellow'].append(issue)

        # === Analysis 2: viewBox boundary ===
        pad_vb_left = t_startX - vb_x
        pad_vb_right = (vb_x + vb_w) - t_endX
        pad_vb_top = t_topY - vb_y
        pad_vb_bottom = (vb_y + vb_h) - t_botY

        vb_issues = []
        for side, val in [('L', pad_vb_left), ('R', pad_vb_right), ('T', pad_vb_top), ('B', pad_vb_bottom)]:
            if val < 0:
                vb_issues.append(f"🔴vb-{side}={round(val,1)}")
            elif val < 5:
                vb_issues.append(f"🟡vb-{side}={round(val,1)}")

        if vb_issues:
            vb_item = {
                'text': t['text'],
                'fs': t['fs'],
                'status': ' '.join(vb_issues),
                'type': 'viewbox',
            }
            if any(s.startswith('🔴') for s in vb_issues):
                results['red'].append(vb_item)
            else:
                results['yellow'].append(vb_item)

    return results


def print_issue(issue):
    if issue.get('type') == 'viewbox':
        print(f"    \"{issue['text']}\" ({issue['fs']}px) — viewBox: {issue['status']}")
    else:
        print(f"    \"{issue['text']}\" ({issue['fs']}px) in {issue['container']}")
        print(f"      Padding: L={issue['pad_left']} R={issue['pad_right']} T={issue['pad_top']} B={issue['pad_bottom']}")
        print(f"      {issue['status']}")


def main():
    files = [
        "modul/1/index.html",
        "modul/2/index.html",
        "modul/3/index.html",
        "modul/4/index.html",
        "modul/5/index.html",
        "modul/6/index.html",
    ]

    all_results = []
    total_red = 0
    total_yellow = 0

    for filepath in files:
        if not os.path.exists(filepath):
            print(f"WARNING: {filepath} not found")
            continue
        svgs = extract_svgs_from_file(filepath)
        for svg in svgs:
            result = analyze_svg(svg, filepath)
            all_results.append(result)
            total_red += len(result['red'])
            total_yellow += len(result['yellow'])

    # Print report
    print("=" * 80)
    print("SVG TEXT-IN-BOX AUDIT REPORT")
    print("=" * 80)

    summary_rows = []

    for r in all_results:
        label_short = r['label'][:55]
        n_red = len(r['red'])
        n_yellow = len(r['yellow'])
        summary_rows.append((r['file'], r['line'], label_short, n_red, n_yellow))

        if r.get('parse_error'):
            print(f"\n### {r['file']}:{r['line']} — PARSE ERROR: {r['parse_error']}")
            continue

        if n_red > 0 or n_yellow > 0:
            print(f"\n### {r['file']}:{r['line']} — \"{label_short}\"")
            print(f"    viewBox: {r['viewbox']} | Texte: {len(r['texts'])} | Container: {len(r['containers'])}")

            if r['red']:
                print("  🔴 CRITICAL:")
                for issue in r['red']:
                    print_issue(issue)

            if r['yellow']:
                print("  🟡 WARNING:")
                for issue in r['yellow']:
                    print_issue(issue)

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"\n{'File':<28} {'Line':>5} {'Label':<42} {'RED':>4} {'YLW':>4}")
    print("-" * 87)
    for file, line, label, nr, ny in summary_rows:
        flag = "***" if nr > 0 else ("  *" if ny > 0 else "   ")
        print(f"{file:<28} {line:>5} {label:<42} {nr:>4} {ny:>4} {flag}")
    print("-" * 87)
    print(f"{'TOTAL':<76} {total_red:>4} {total_yellow:>4}")

    if total_red == 0 and total_yellow == 0:
        print("\n✅ ALL CLEAR!")
    else:
        print(f"\n⚠️  {total_red} critical + {total_yellow} warnings")

    return total_red + total_yellow


if __name__ == '__main__':
    sys.exit(0 if main() == 0 else 1)
