#!/usr/bin/env python3
"""Apply SVG text-in-box fixes across all modules."""

import re
import sys

def fix_file(filepath, replacements):
    """Apply a list of (old, new) string replacements to a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    count = 0
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new, 1)
            count += 1
        else:
            print(f"  WARNING: Not found in {filepath}: {old[:80]}...")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  {filepath}: {count}/{len(replacements)} replacements applied")
    return count


def main():
    total = 0

    # ================================================================
    # MODUL 1: Eisberg — expand viewBox for right-side text overflow
    # ================================================================
    print("\n=== modul/1: Eisberg ===")
    total += fix_file("modul/1/index.html", [
        # Eisberg viewBox: expand width from 600 to 650 for right-side annotations
        ('viewBox="0 -8 600 373" xmlns="http://www.w3.org/2000/svg">\n<!-- Water -->',
         'viewBox="0 -8 650 373" xmlns="http://www.w3.org/2000/svg">\n<!-- Water -->'),
        # Also expand water rect and background
        ('<rect fill="#ddeef8" height="159.3" opacity="0.4" rx="0" width="600" x="0" y="123.9">',
         '<rect fill="#ddeef8" height="159.3" opacity="0.4" rx="0" width="650" x="0" y="123.9">'),
    ])

    # ================================================================
    # MODUL 1: Hypervigilanz — widen phase rects, enlarge center circle
    # ================================================================
    print("\n=== modul/1: Hypervigilanz ===")
    total += fix_file("modul/1/index.html", [
        # viewBox: keep 600 wide but ensure enough space
        # Background rect: keep 600 wide

        # Center circle: r=35.4 → r=50 to fit "Dauer-anspannung"
        ('circle cx="300" cy="135.7" fill="#fde8e0" opacity="0.5" r="35.4"',
         'circle cx="300" cy="135.7" fill="#fde8e0" opacity="0.5" r="50"'),

        # Phase 1 (top): Beobachten — rect w=100 → w=150, x=250 → x=225
        ('rect fill="#ddeef8" height="42.5" rx="18" stroke="#4a7fa5" stroke-width="1.5" width="100" x="250" y="37.8"',
         'rect fill="#ddeef8" height="42.5" rx="18" stroke="#4a7fa5" stroke-width="1.5" width="150" x="225" y="37.8"'),

        # Phase 2 (right): Anspannung — rect w=100 → w=150, x=410 → x=385
        ('rect fill="#fdf6e8" height="42.5" rx="18" stroke="#8a6a3a" stroke-width="1.5" width="100" x="410" y="114.5"',
         'rect fill="#fdf6e8" height="42.5" rx="18" stroke="#8a6a3a" stroke-width="1.5" width="150" x="385" y="114.5"'),

        # Phase 3 (bottom): Erschöpfung — rect w=100 → w=150, x=250 → x=225
        ('rect fill="#fde8e0" height="42.5" rx="18" stroke="#c07030" stroke-width="1.5" width="100" x="250" y="189"',
         'rect fill="#fde8e0" height="42.5" rx="18" stroke="#c07030" stroke-width="1.5" width="150" x="225" y="189"'),

        # Phase 4 (left): Erholung — rect w=100 → w=150, x=90 → x=65
        ('rect fill="#e8f0e8" height="42.5" rx="18" stroke="#5a7a5a" stroke-width="1.5" width="100" x="90" y="114.5"',
         'rect fill="#e8f0e8" height="42.5" rx="18" stroke="#5a7a5a" stroke-width="1.5" width="150" x="65" y="114.5"'),

        # Arrows — adjust to new rect boundaries
        # Arrow top→right: start from right side of top rect (was 345, now 370)
        ('d="M345 64.9 Q390 70.8 410 114.5"',
         'd="M370 64.9 Q405 75 385 114.5"'),

        # Arrow right→bottom: end at right side of bottom rect (was 350, now 370)
        ('d="M460 156.9 Q440 178.8 350 193"',
         'd="M460 157 Q440 180 370 200"'),

        # Arrow bottom→left: start from left side (was 255→230), end at right of left (was 190→215)
        ('d="M255 200 Q210 190.5 190 156.9"',
         'd="M230 200 Q195 192 215 157"'),

        # Arrow left→top: end at left side of top (was 250→225)
        ('d="M140 114.5 Q155 76.7 250 56.6"',
         'd="M140 114.5 Q155 80 225 59"'),
    ])

    # ================================================================
    # MODUL 3: Solidaritätserosion — expand background rect height for labels
    # ================================================================
    print("\n=== modul/3: Solidaritätserosion ===")
    total += fix_file("modul/3/index.html", [
        # The "1. Krise", "2. Krise", "3. Krise" labels at y=218 overflow the zone rects.
        # The zone rects end at y=212.4. Extend the last zone rect height.
        # Zone 3 (Depression): height=64.9, y=147.5 → endY=212.4
        # Make it: height=72, endY=219.5 — covers the crisis labels
        ('rect fill="#ddeef8" height="64.9" opacity="0.35" rx="4" width="520" x="40" y="147.5"',
         'rect fill="#ddeef8" height="72" opacity="0.35" rx="4" width="520" x="40" y="147.5"'),
        # Also the timeline sits at y=216 which is very close. Move "Depression" label
        # The label at x=48, y=166 is fine (inside zone 3)
    ])

    # ================================================================
    # MODUL 4: EE Teufelskreis — enlarge outer circles
    # ================================================================
    print("\n=== modul/4: EE Teufelskreis ===")
    total += fix_file("modul/4/index.html", [
        # Center circle: r=49.6 → r=55 for "Teufels-kreis" text
        ('circle cx="170" cy="200.6" fill="#f2ead8" r="49.6"',
         'circle cx="170" cy="200.6" fill="#f2ead8" r="55"'),

        # All 4 outer circles: r=44.8 → r=52
        # Node 1 (Schuldgefühle, top)
        ('r="44.8" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="170" y="56.6">😰</text>',
         'r="52" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="170" y="56.6">😰</text>'),

        # Node 2 (Überinvolvement, right)
        ('r="44.8" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="285" y="192.3">🔍</text>',
         'r="52" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="285" y="192.3">🔍</text>'),

        # Node 3 (Erschöpfung, bottom)
        ('r="44.8" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="170" y="324">😮‍💨</text>',
         'r="52" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="170" y="324">😮‍💨</text>'),

        # Node 4 (Kritik, left)
        ('r="44.8" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="55" y="192.3">😤</text>',
         'r="52" role="button" stroke="#d4c8b0" stroke-width="1.5" class="pointer" tabindex="0"></circle>\n<text fill="#7a6050" font-family="Source Sans 3,sans-serif" font-size="18" text-anchor="middle" x="55" y="192.3">😤</text>'),

        # Orbit circle: r=129.8 → r=136 to keep distance from larger nodes
        ('circle cx="170" cy="200.6" fill="none" r="129.8" stroke="#e8dfd0"',
         'circle cx="170" cy="200.6" fill="none" r="136" stroke="#e8dfd0"'),
    ])

    # ================================================================
    # MODUL 4: Barrieren — widen barrier rects and endpoint rects
    # ================================================================
    print("\n=== modul/4: Barrieren ===")
    total += fix_file("modul/4/index.html", [
        # "Sie" rect: w=70 → w=80, x=25 → x=20
        ('rect fill="#ddeef8" height="53.1" rx="22" stroke="#4a7fa5" stroke-width="1.5" width="70" x="25" y="64.9"',
         'rect fill="#ddeef8" height="53.1" rx="22" stroke="#4a7fa5" stroke-width="1.5" width="80" x="20" y="64.9"'),

        # "Gesunde Grenzen" rect: w=70 → w=85, x=505 → x=497
        ('rect fill="#e8f0e8" height="53.1" rx="22" stroke="#5a7a5a" stroke-width="1.5" width="70" x="505" y="64.9"',
         'rect fill="#e8f0e8" height="53.1" rx="22" stroke="#5a7a5a" stroke-width="1.5" width="85" x="497" y="64.9"'),

        # 4 barrier rects: w=75 → w=90 each, adjust x to keep centered
        # Barrier 1 (Angst): x=120, center=157.5 → x=112, center=157
        ('rect fill="#fde8e0" height="100.3" opacity="0.9" rx="6" stroke="#c07030" stroke-width="1.5" width="75" x="120"',
         'rect fill="#fde8e0" height="100.3" opacity="0.9" rx="6" stroke="#c07030" stroke-width="1.5" width="90" x="112"'),

        # Barrier 2 (Schuld): x=215, center=252.5 → x=207, center=252
        ('rect fill="#fdf6e8" height="100.3" opacity="0.9" rx="6" stroke="#8a6a3a" stroke-width="1.5" width="75" x="215"',
         'rect fill="#fdf6e8" height="100.3" opacity="0.9" rx="6" stroke="#8a6a3a" stroke-width="1.5" width="90" x="207"'),

        # Barrier 3 (Druck): x=310, center=347.5 → x=302, center=347
        ('rect fill="#eee8f4" height="100.3" opacity="0.9" rx="6" stroke="#5a5070" stroke-width="1.5" width="75" x="310"',
         'rect fill="#eee8f4" height="100.3" opacity="0.9" rx="6" stroke="#5a5070" stroke-width="1.5" width="90" x="302"'),

        # Barrier 4 (Gewohnheit): x=405, center=442.5 → x=397, center=442
        ('rect fill="#f0ece6" height="100.3" opacity="0.9" rx="6" stroke="#8a8070" stroke-width="1.5" width="75" x="405"',
         'rect fill="#f0ece6" height="100.3" opacity="0.9" rx="6" stroke="#8a8070" stroke-width="1.5" width="90" x="397"'),
    ])

    # ================================================================
    # MODUL 4: Kompass — widen axis label rects
    # ================================================================
    print("\n=== modul/4: Kompass ===")
    total += fix_file("modul/4/index.html", [
        # Left rects (❌ labels): w=90/95 → w=120/125, adjust x to keep visual center
        # Axis 1 left (Bewertung): w=90, x=50 → w=125, x=33
        ('rect fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="90" x="50" y="54.3"',
         'rect fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="125" x="33" y="54.3"'),

        # Axis 1 right (Beobachtung): w=95, x=460 → w=130, x=442
        ('rect fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="95" x="460" y="54.3"',
         'rect fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="130" x="442" y="54.3"'),

        # Axis 2 left (Du-Botschaft): w=95, x=50 → w=135, x=30
        ('rect fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="95" x="50" y="148.7"',
         'rect fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="135" x="30" y="148.7"'),

        # Axis 2 right (Ich-Botschaft): w=95, x=460 → w=130, x=442
        ('rect fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="95" x="460" y="148.7"',
         'rect fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="130" x="442" y="148.7"'),
    ])

    # ================================================================
    # MODUL 5: Sauerstoffmaske — expand viewBox
    # ================================================================
    print("\n=== modul/5: Sauerstoffmaske ===")
    total += fix_file("modul/5/index.html", [
        # viewBox is tiny (0 0 140 90), texts near edges
        # "Sie zuerst" at x=32 y=84, "dann anderen" at x=108 y=84
        # Expand viewBox height slightly for bottom text: 90 → 95
        ('viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg">\n<!-- Person 1',
         'viewBox="0 0 140 95" xmlns="http://www.w3.org/2000/svg">\n<!-- Person 1'),
    ])

    # ================================================================
    # MODUL 5: Krisenplan-Ampel — widen phase rects
    # ================================================================
    print("\n=== modul/5: Krisenplan-Ampel ===")
    total += fix_file("modul/5/index.html", [
        # Phase 1 (Gelb): w=160 → w=175, x=30 → x=22
        ('rect fill="#fdf6e8" height="106.2" rx="8" stroke="#d4a843" stroke-width="1.5" width="160" x="30" y="41.3"',
         'rect fill="#fdf6e8" height="106.2" rx="8" stroke="#d4a843" stroke-width="1.5" width="175" x="22" y="41.3"'),

        # Phase 2 (Orange): w=160 → w=175, x=220 → x=212
        ('rect fill="#fde8e0" height="106.2" rx="8" stroke="#c07030" stroke-width="1.5" width="160" x="220" y="41.3"',
         'rect fill="#fde8e0" height="106.2" rx="8" stroke="#c07030" stroke-width="1.5" width="175" x="212" y="41.3"'),

        # Phase 3 (Rot): w=160 → w=175, x=410 → x=402
        ('rect fill="#fce4e4" height="106.2" rx="8" stroke="#be3b3b" stroke-width="1.5" width="160" x="410" y="41.3"',
         'rect fill="#fce4e4" height="106.2" rx="8" stroke="#be3b3b" stroke-width="1.5" width="175" x="402" y="41.3"'),
    ])

    # ================================================================
    # MODUL 5: Spektrum der Grenzsetzung — widen green zone + expand viewBox
    # ================================================================
    print("\n=== modul/5: Spektrum ===")
    total += fix_file("modul/5/index.html", [
        # viewBox: expand height for bottom text: 210 → 218
        ('viewBox="0 -5 600 210" xmlns="http://www.w3.org/2000/svg">\n<rect fill="#fafaf6" height="153.4"',
         'viewBox="0 -5 600 218" xmlns="http://www.w3.org/2000/svg">\n<rect fill="#fafaf6" height="158"'),
    ])

    # ================================================================
    # MODUL 6: Fünf Säulen — widen pillar rects
    # ================================================================
    print("\n=== modul/6: Fünf Säulen ===")
    total += fix_file("modul/6/index.html", [
        # All 5 pillars: w=68 → w=84, adjust x to keep centered
        # Pillar 1: x=52, center=86 → x=44
        ('rect fill="#ddeef8" height="142.8" rx="4" stroke="#a8c8e0" stroke-width="1" width="68" x="52"',
         'rect fill="#ddeef8" height="142.8" rx="4" stroke="#a8c8e0" stroke-width="1" width="84" x="44"'),

        # Pillar 2: x=148, center=182 → x=140
        ('rect fill="#e8f0e8" height="142.8" rx="4" stroke="#b8d0b8" stroke-width="1" width="68" x="148"',
         'rect fill="#e8f0e8" height="142.8" rx="4" stroke="#b8d0b8" stroke-width="1" width="84" x="140"'),

        # Pillar 3: x=244, center=278 → x=236
        ('rect fill="#fdf6e8" height="142.8" rx="4" stroke="#e8d8b0" stroke-width="1" width="68" x="244"',
         'rect fill="#fdf6e8" height="142.8" rx="4" stroke="#e8d8b0" stroke-width="1" width="84" x="236"'),

        # Pillar 4: x=340, center=374 → x=332
        ('rect fill="#fde8e0" height="142.8" rx="4" stroke="#e0c0b0" stroke-width="1" width="68" x="340"',
         'rect fill="#fde8e0" height="142.8" rx="4" stroke="#e0c0b0" stroke-width="1" width="84" x="332"'),

        # Pillar 5: x=436, center=470 → x=428
        ('rect fill="#eee8f4" height="142.8" rx="4" stroke="#c0b8d4" stroke-width="1" width="68" x="436"',
         'rect fill="#eee8f4" height="142.8" rx="4" stroke="#c0b8d4" stroke-width="1" width="84" x="428"'),
    ])

    # ================================================================
    # MODUL 6: Fortschritt — expand background rect to cover time labels
    # ================================================================
    print("\n=== modul/6: Fortschritt ===")
    total += fix_file("modul/6/index.html", [
        # Background rect: h=236, y=0 → endY=236. Time labels at y=241.
        # Expand to h=248 to cover them.
        ('viewBox="0 0 600 335" xmlns="http://www.w3.org/2000/svg">\n<!-- Background -->\n<rect fill="#fafaf6" height="236.0" rx="8" width="600" x="0" y="0.0"',
         'viewBox="0 0 600 335" xmlns="http://www.w3.org/2000/svg">\n<!-- Background -->\n<rect fill="#fafaf6" height="250.0" rx="8" width="600" x="0" y="0.0"'),
    ])

    print(f"\n{'='*60}")
    print(f"TOTAL: {total} replacements applied")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
