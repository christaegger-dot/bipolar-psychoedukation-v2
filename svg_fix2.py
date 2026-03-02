#!/usr/bin/env python3
"""Round 2 SVG fixes: remaining genuine text overflows."""

import re

def fix_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    count = 0
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new, 1)
            count += 1
        else:
            print(f"  WARNING not found in {filepath}: {old[:90]}...")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  {filepath}: {count}/{len(replacements)} applied")
    return count

total = 0

# ================================================================
# MODUL 1: Hypervigilanz — move subtitle texts below their rects
# ================================================================
print("\n=== modul/1: Hypervigilanz subtitles ===")
total += fix_file("modul/1/index.html", [
    # "Stimmung scannen" at y=79.6 is at bottom edge of top rect (endY=80.3)
    # Move it clearly below: y=79.6 → y=92
    ('font-size="18" text-anchor="middle" x="300" y="79.6">Stimmung scannen</text>',
     'font-size="14" text-anchor="middle" x="300" y="92">Stimmung scannen</text>'),

    # "Schlaf, Konzentration ↓" at y=239 within bottom rect (endY=231.5)
    # Move below rect: y=239 → y=248, reduce font to fit
    ('font-size="15" text-anchor="middle" x="300" y="239">Schlaf, Konzentration ↓</text>',
     'font-size="13" text-anchor="middle" x="300" y="246">Schlaf, Konzentration ↓</text>'),

    # "Körper in Alarmbereitschaft" — subtitle below right rect, reduce to match
    ('font-size="15" text-anchor="middle" x="460" y="172">Körper in Alarmbereitschaft</text>',
     'font-size="13" text-anchor="middle" x="460" y="172">Körper in Alarmbereitschaft</text>'),

    # "Kurz — nie vollständig" — subtitle below left rect, reduce to match
    ('font-size="18" text-anchor="middle" x="140" y="172">Kurz — nie vollständig</text>',
     'font-size="13" text-anchor="middle" x="140" y="172">Kurz — nie vollständig</text>'),
])

# ================================================================
# MODUL 3: Solidaritätserosion — move "3. Krise" left
# ================================================================
print("\n=== modul/3: 3. Krise position ===")
total += fix_file("modul/3/index.html", [
    # Move "3. Krise" from x=542 to x=525 to fit within zone rect (endX=560)
    ('text-anchor="middle" x="542" y="218">3. Krise</text>',
     'text-anchor="middle" x="525" y="218">3. Krise</text>'),
    # Also move the vertical dashed line
    ('x1="542" x2="542" y1="141.6" y2="203.0"',
     'x1="525" x2="525" y1="141.6" y2="203.0"'),
    # Adjust the Solidaritätskurve endpoint to match
    ('502 127.4 C516 140.4 528 134.5 542 141.6',
     '502 127.4 C516 140.4 520 134.5 525 141.6'),
    # Also the shading path endpoint
    ('502 127.4 C516 140.4 528 134.5 542 141.6 L542 11.8',
     '502 127.4 C516 140.4 520 134.5 525 141.6 L525 11.8'),
])

# ================================================================
# MODUL 4: Barrieren — widen remaining tight rects
# ================================================================
print("\n=== modul/4: Barrieren refinements ===")
total += fix_file("modul/4/index.html", [
    # "Sie" rect: w=80 → w=90 for "«Ich sollte…»"
    ('width="80" x="20" y="64.9"></rect>\n<text fill="#4a7fa5"',
     'width="90" x="15" y="64.9"></rect>\n<text fill="#4a7fa5"'),

    # Barrier 4 (Gewohnheit): w=90 → w=100 for "Gewohnheit" at 18px
    ('rect fill="#f0ece6" height="100.3" opacity="0.9" rx="6" stroke="#8a8070" stroke-width="1.5" width="90" x="397"',
     'rect fill="#f0ece6" height="100.3" opacity="0.9" rx="6" stroke="#8a8070" stroke-width="1.5" width="100" x="392"'),

    # Barrier 3 (Druck): w=90 → w=100 for "nicht im Stich»"
    ('rect fill="#eee8f4" height="100.3" opacity="0.9" rx="6" stroke="#5a5070" stroke-width="1.5" width="90" x="302"',
     'rect fill="#eee8f4" height="100.3" opacity="0.9" rx="6" stroke="#5a5070" stroke-width="1.5" width="100" x="297"'),

    # Also increase all barrier rect height to cover emoji top (T=-2.9)
    # All barriers y=41.3 → y=38, height=100.3 → height=103.6
])

# ================================================================
# MODUL 4: Kompass — enlarge center circle + widen bottom axis rects
# ================================================================
print("\n=== modul/4: Kompass center + axis labels ===")
total += fix_file("modul/4/index.html", [
    # Center circle: r=26 → r=36 for "Was sage" / "ich wie?"
    ('circle cx="300" cy="118.0" fill="white" r="26.0"',
     'circle cx="300" cy="118.0" fill="white" r="36.0"'),

    # "Zielzone" rect: w=50 → w=75, x=370 → x=357
    ('rect fill="#e8f0e8" height="30" opacity="0.5" rx="6" stroke="#5a7a5a" stroke-dasharray="3,2" stroke-width="0.5" width="50" x="370"',
     'rect fill="#e8f0e8" height="30" opacity="0.5" rx="6" stroke="#5a7a5a" stroke-dasharray="3,2" stroke-width="0.5" width="75" x="357"'),

    # Bottom left axis rect (Du-Botschaft): w=135 → w=160, x=30 → x=17
    ('width="135" x="30" y="148.7"',
     'width="160" x="17" y="148.7"'),

    # Bottom right axis rect (Ich-Botschaft): w=130 → w=160, x=442 → x=427
    ('width="130" x="442" y="148.7"',
     'width="160" x="427" y="148.7"'),

    # Top right axis rect (Beobachtung): w=130 → w=145, x=442 → x=435
    ('width="130" x="442" y="54.3"',
     'width="145" x="435" y="54.3"'),
])

# ================================================================
# MODUL 5: Krisenplan-Ampel — extend background for bottom text
# ================================================================
print("\n=== modul/5: Krisenplan background ===")
total += fix_file("modul/5/index.html", [
    # Background rect h=182.9 → h=188 to cover bottom text at y=184
    ('rect fill="#fafaf6" height="182.9" rx="8" width="600" x="0" y="0.0"></rect>\n<text fill="#5a5070" font-family="Source Sans 3, sans-serif" font-size="22" font-weight="600" text-anchor="middle" x="300" y="30.0">Der Krisenplan',
     'rect fill="#fafaf6" height="188" rx="8" width="600" x="0" y="0.0"></rect>\n<text fill="#5a5070" font-family="Source Sans 3, sans-serif" font-size="22" font-weight="600" text-anchor="middle" x="300" y="30.0">Der Krisenplan'),
])

# ================================================================
# MODUL 5: Spektrum — widen green zone rect for subtitle
# ================================================================
print("\n=== modul/5: Spektrum green zone ===")
total += fix_file("modul/5/index.html", [
    # Green zone dashed rect: w=180 → w=240, x=210 → x=180
    ('rect fill="none" height="44.8" rx="19" stroke="#5a7a5a" stroke-dasharray="4,2" stroke-width="2" width="180" x="210"',
     'rect fill="none" height="44.8" rx="19" stroke="#5a7a5a" stroke-dasharray="4,2" stroke-width="2" width="240" x="180"'),

    # Gradient bar: extend left to cover "Zu weich". x=50→35, w=500→530
    ('rect fill="url(#grad-grenzen)" height="35.4" rx="15" width="500" x="50"',
     'rect fill="url(#grad-grenzen)" height="35.4" rx="15" width="530" x="35"'),
])

# ================================================================
# MODUL 6: Fünf Säulen — widen pillar 2 further for "Kommunikation"
# ================================================================
print("\n=== modul/6: Säulen pillar 2 ===")
total += fix_file("modul/6/index.html", [
    # Pillar 2 (Kommunikation): w=84 → w=96, x=140 → x=134
    ('rect fill="#e8f0e8" height="142.8" rx="4" stroke="#b8d0b8" stroke-width="1" width="84" x="140"',
     'rect fill="#e8f0e8" height="142.8" rx="4" stroke="#b8d0b8" stroke-width="1" width="96" x="134"'),

    # Pillar 3 (Krankheitsfreie Inseln): w=84 → w=96, x=236 → x=230
    ('rect fill="#fdf6e8" height="142.8" rx="4" stroke="#e8d8b0" stroke-width="1" width="84" x="236"',
     'rect fill="#fdf6e8" height="142.8" rx="4" stroke="#e8d8b0" stroke-width="1" width="96" x="230"'),

    # Pillar 4 (Krisenplan): w=84 → w=96, x=332 → x=326
    ('rect fill="#fde8e0" height="142.8" rx="4" stroke="#e0c0b0" stroke-width="1" width="84" x="332"',
     'rect fill="#fde8e0" height="142.8" rx="4" stroke="#e0c0b0" stroke-width="1" width="96" x="326"'),
])

print(f"\n{'='*60}")
print(f"TOTAL: {total} replacements applied")
print(f"{'='*60}")
