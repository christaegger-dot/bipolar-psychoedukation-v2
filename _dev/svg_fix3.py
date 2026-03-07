#!/usr/bin/env python3
"""Round 3 SVG fixes: comprehensive pass to eliminate all remaining criticals."""

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
# MODUL 1: Hypervigilanz — fix T=-0.2 on all 4 phase rects
#   Move rect y up 1px, increase height +1px
#   Fix "😮‍💨 Erschöpfung" L/R=-10.5 by widening rect
# ================================================================
print("\n=== modul/1: Hypervigilanz phase rects ===")
total += fix_file("modul/1/index.html", [
    # Phase 1 Beobachten: y=37.8→36.8, h=42.5→43.5
    ('height="42.5" rx="18" stroke="#4a7fa5" stroke-width="1.5" width="150" x="225" y="37.8"',
     'height="43.5" rx="18" stroke="#4a7fa5" stroke-width="1.5" width="150" x="225" y="36.8"'),

    # Phase 2 Anspannung: y=114.5→113.5, h=42.5→43.5
    ('height="42.5" rx="18" stroke="#8a6a3a" stroke-width="1.5" width="150" x="385" y="114.5"',
     'height="43.5" rx="18" stroke="#8a6a3a" stroke-width="1.5" width="150" x="385" y="113.5"'),

    # Phase 3 Erschöpfung: y=189→188, h=42.5→43.5, ALSO widen w=150→174, x=225→213
    ('height="42.5" rx="18" stroke="#c07030" stroke-width="1.5" width="150" x="225" y="189"',
     'height="43.5" rx="18" stroke="#c07030" stroke-width="1.5" width="174" x="213" y="188"'),

    # Phase 4 Erholung: y=114.5→113.5, h=42.5→43.5
    ('height="42.5" rx="18" stroke="#5a7a5a" stroke-width="1.5" width="150" x="65" y="114.5"',
     'height="43.5" rx="18" stroke="#5a7a5a" stroke-width="1.5" width="150" x="65" y="113.5"'),
])

# ================================================================
# MODUL 3: Solidaritätserosion — "3. Krise" R=-8.2
#   The zone rects end at x=560 (40+520).
#   "3. Krise" at x=525, anchor=middle, width=86.4 → endX=568.2
#   Move to x=516 → endX=559.2 (fits in 560)
# ================================================================
print("\n=== modul/3: 3. Krise further left ===")
total += fix_file("modul/3/index.html", [
    # Move "3. Krise" text x=525→516
    ('text-anchor="middle" x="525" y="218">3. Krise</text>',
     'text-anchor="middle" x="516" y="218">3. Krise</text>'),
    # Move vertical dashed line x=525→516
    ('x1="525" x2="525" y1="141.6" y2="203.0"',
     'x1="516" x2="516" y1="141.6" y2="203.0"'),
    # Adjust Solidaritätskurve endpoint
    ('520 134.5 525 141.6" fill="none" stroke="#8b2020"',
     '518 134.5 516 141.6" fill="none" stroke="#8b2020"'),
    # Shading path endpoint
    ('520 134.5 525 141.6 L525 11.8',
     '518 134.5 516 141.6 L516 11.8'),
])

# ================================================================
# MODUL 4: EE Teufelskreis — "involvement" L/R=-1.3 in circle r=52
#   Increase r=52→55 for Knoten 2 (Überinvolvement)
# ================================================================
print("\n=== modul/4: EE Teufelskreis circle ===")
total += fix_file("modul/4/index.html", [
    ('aria-label="Überinvolvement — klicken für Details" cx="285" cy="200.6" fill="white" id="ee-svg-2" onclick="highlightEE(2)" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();highlightEE(2)}" r="52"',
     'aria-label="Überinvolvement — klicken für Details" cx="285" cy="200.6" fill="white" id="ee-svg-2" onclick="highlightEE(2)" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();highlightEE(2)}" r="55"'),
])

# ================================================================
# MODUL 4: Barrieren — fix emoji T=-2.9, "Gewohnheit" L/R=-4, "Ich sollte" L/R=-1.8
# ================================================================
print("\n=== modul/4: Barrieren rect fixes ===")
total += fix_file("modul/4/index.html", [
    # All 4 barrier rects: move y=41.3→38, h=100.3→103.6

    # Barrier 1 Angst: y=41.3→38, h=100.3→103.6
    ('fill="#fde8e0" height="100.3" opacity="0.9" rx="6" stroke="#c07030" stroke-width="1.5" width="90" x="112" y="41.3"',
     'fill="#fde8e0" height="103.6" opacity="0.9" rx="6" stroke="#c07030" stroke-width="1.5" width="90" x="112" y="38"'),

    # Barrier 2 Schuld: y=41.3→38, h=100.3→103.6
    ('fill="#fdf6e8" height="100.3" opacity="0.9" rx="6" stroke="#8a6a3a" stroke-width="1.5" width="90" x="207" y="41.3"',
     'fill="#fdf6e8" height="103.6" opacity="0.9" rx="6" stroke="#8a6a3a" stroke-width="1.5" width="90" x="207" y="38"'),

    # Barrier 3 Druck: y=41.3→38, h=100.3→103.6
    ('fill="#eee8f4" height="100.3" opacity="0.9" rx="6" stroke="#5a5070" stroke-width="1.5" width="100" x="297" y="41.3"',
     'fill="#eee8f4" height="103.6" opacity="0.9" rx="6" stroke="#5a5070" stroke-width="1.5" width="100" x="297" y="38"'),

    # Barrier 4 Gewohnheit: y=41.3→38, h=100.3→103.6, ALSO widen w=100→116, x=392→384
    ('fill="#f0ece6" height="100.3" opacity="0.9" rx="6" stroke="#8a8070" stroke-width="1.5" width="100" x="392" y="41.3"',
     'fill="#f0ece6" height="103.6" opacity="0.9" rx="6" stroke="#8a8070" stroke-width="1.5" width="116" x="384" y="38"'),

    # "Sie" rect: widen w=90→106, x=15→7 for "«Ich sollte…»"
    ('fill="#ddeef8" height="53.1" rx="22" stroke="#4a7fa5" stroke-width="1.5" width="90" x="15" y="64.9"',
     'fill="#ddeef8" height="53.1" rx="22" stroke="#4a7fa5" stroke-width="1.5" width="106" x="7" y="64.9"'),
])

# ================================================================
# MODUL 4: Kompass — fix center circle, axis rects, title
# ================================================================
print("\n=== modul/4: Kompass comprehensive fix ===")
total += fix_file("modul/4/index.html", [
    # Background rect: extend top to cover title T=-2.8
    # Currently y=0.0, h=212.4. Title top at y=21.2-24=-2.8.
    # Move rect y=0→-4, h=212.4→216.4
    ('fill="#fafaf6" height="212.4" rx="8" width="600" x="0" y="0.0"></rect>\n<text fill="#5a5070" font-family="Source Sans 3, sans-serif" font-size="24" font-weight="600" text-anchor="middle" x="300" y="21.2">Kommunikations-Kompass: 4 Achsen</text>',
     'fill="#fafaf6" height="216.4" rx="8" width="600" x="0" y="-4"></rect>\n<text fill="#5a5070" font-family="Source Sans 3, sans-serif" font-size="24" font-weight="600" text-anchor="middle" x="300" y="21.2">Kommunikations-Kompass: 4 Achsen</text>'),

    # Center circle: r=36→42 for "Was sage" / "ich wie?"
    ('circle cx="300" cy="118.0" fill="white" r="36.0" stroke="#d0ccc6"',
     'circle cx="300" cy="118.0" fill="white" r="42.0" stroke="#d0ccc6"'),

    # Bewertung rect (top left): w=125→136, x=33→27
    ('fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="125" x="33" y="54.3"',
     'fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="136" x="27" y="54.3"'),

    # Beobachtung rect (top right): w=145→160, x=435→427
    ('fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="145" x="435" y="54.3"',
     'fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="160" x="427" y="54.3"'),

    # Du-Botschaft rect (bottom left): w=160→178, x=17→8
    ('fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="160" x="17" y="148.7"',
     'fill="#fde8e0" height="37.8" rx="16" stroke="#c07030" stroke-width="1" width="178" x="8" y="148.7"'),

    # Ich-Botschaft rect (bottom right): w=160→178, x=427→416
    ('fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="160" x="427" y="148.7"',
     'fill="#e8f0e8" height="37.8" rx="16" stroke="#5a7a5a" stroke-width="1" width="178" x="416" y="148.7"'),
])

# ================================================================
# MODUL 5: Sauerstoffmaske — viewBox R=-0.4 for "dann anderen"
#   "dann anderen" at x=108, anchor=middle, fs=9 → but 0.6 overestimates
#   Widen viewBox from 140 to 148
# ================================================================
print("\n=== modul/5: Sauerstoffmaske viewBox ===")
total += fix_file("modul/5/index.html", [
    ('viewBox="0 0 140 95"',
     'viewBox="0 0 148 95"'),
])

# ================================================================
# MODUL 5: Krisenplan-Ampel — fix title T=-4.3, bullet text overflows
#   Move all 3 phase rects up: y=41.3→36, h=106.2→111.5
#   Widen all 3 phase rects: w=175→192
#   Adjust x positions to maintain spacing:
#     Yellow: x=22→10, Orange: x=212→206, Red: x=402→402
#   Reduce bullet text from 11→10px (allowed -1px)
#   Also widen "!!!" warning circle r=14.2→17
# ================================================================
print("\n=== modul/5: Krisenplan-Ampel comprehensive ===")
total += fix_file("modul/5/index.html", [
    # Phase 1 Gelb: y=41.3→36, h=106.2→111.5, w=175→192, x=22→10
    ('fill="#fdf6e8" height="106.2" rx="8" stroke="#d4a843" stroke-width="1.5" width="175" x="22" y="41.3"',
     'fill="#fdf6e8" height="111.5" rx="8" stroke="#d4a843" stroke-width="1.5" width="192" x="10" y="36"'),

    # Phase 2 Orange: y=41.3→36, h=106.2→111.5, w=175→192, x=212→206
    ('fill="#fde8e0" height="106.2" rx="8" stroke="#c07030" stroke-width="1.5" width="175" x="212" y="41.3"',
     'fill="#fde8e0" height="111.5" rx="8" stroke="#c07030" stroke-width="1.5" width="192" x="206" y="36"'),

    # Phase 3 Rot: y=41.3→36, h=106.2→111.5, w=175→192, x=402→402
    ('fill="#fce4e4" height="106.2" rx="8" stroke="#be3b3b" stroke-width="1.5" width="175" x="402" y="41.3"',
     'fill="#fce4e4" height="111.5" rx="8" stroke="#be3b3b" stroke-width="1.5" width="192" x="402" y="36"'),

    # Warning circles — enlarge r=14.2→17
    ('cx="55" cy="68.4" fill="#d4a843" opacity="0.8" r="14.2"',
     'cx="55" cy="68.4" fill="#d4a843" opacity="0.8" r="17"'),
    ('cx="245" cy="68.4" fill="#c07030" opacity="0.8" r="14.2"',
     'cx="245" cy="68.4" fill="#c07030" opacity="0.8" r="17"'),
    ('cx="435" cy="68.4" fill="#be3b3b" opacity="0.8" r="14.2"',
     'cx="435" cy="68.4" fill="#be3b3b" opacity="0.8" r="17"'),

    # Bullet texts: font-size 11→10 (allowed -1px)
    # Phase 1 bullets
    ('font-size="11" text-anchor="middle" x="110" y="89.3">Schlaf ↓ · Reizbarkeit ↑</text>',
     'font-size="10" text-anchor="middle" x="110" y="89.3">Schlaf ↓ · Reizbarkeit ↑</text>'),
    ('font-size="11" text-anchor="middle" x="110" y="108.3">Geld ausgeben · Schnell reden</text>',
     'font-size="10" text-anchor="middle" x="110" y="108.3">Geld ausgeben · Schnell reden</text>'),
    ('font-size="11" font-style="italic" text-anchor="middle" x="110" y="127.3">→ Behandlungsteam informieren</text>',
     'font-size="10" font-style="italic" text-anchor="middle" x="110" y="127.3">→ Behandlungsteam informieren</text>'),
    ('font-size="11" font-style="italic" text-anchor="middle" x="110" y="146.3">→ Krisenplan hervornehmen</text>',
     'font-size="10" font-style="italic" text-anchor="middle" x="110" y="146.3">→ Krisenplan hervornehmen</text>'),

    # Phase 2 bullets
    ('font-size="11" text-anchor="middle" x="300" y="89.3">Realitätsverlust · Impulsivität</text>',
     'font-size="10" text-anchor="middle" x="300" y="89.3">Realitätsverlust · Impulsivität</text>'),
    ('font-size="11" text-anchor="middle" x="300" y="108.3">Medikamente abgesetzt</text>',
     'font-size="10" text-anchor="middle" x="300" y="108.3">Medikamente abgesetzt</text>'),
    ('font-size="11" font-style="italic" text-anchor="middle" x="300" y="127.3">→ Kontaktperson anrufen</text>',
     'font-size="10" font-style="italic" text-anchor="middle" x="300" y="127.3">→ Kontaktperson anrufen</text>'),
    ('font-size="11" font-style="italic" text-anchor="middle" x="300" y="146.3">→ Kinder versorgen lassen</text>',
     'font-size="10" font-style="italic" text-anchor="middle" x="300" y="146.3">→ Kinder versorgen lassen</text>'),

    # Phase 3 bullets
    ('font-size="11" text-anchor="middle" x="490" y="89.3">Selbst-/Fremdgefährdung</text>',
     'font-size="10" text-anchor="middle" x="490" y="89.3">Selbst-/Fremdgefährdung</text>'),
    ('font-size="11" text-anchor="middle" x="490" y="108.3">Suizidgedanken · Aggression</text>',
     'font-size="10" text-anchor="middle" x="490" y="108.3">Suizidgedanken · Aggression</text>'),
    ('font-size="11" font-style="italic" text-anchor="middle" x="490" y="163.3">→ PUK Notfall: 058 384 21 11</text>',
     'font-size="10" font-style="italic" text-anchor="middle" x="490" y="163.3">→ PUK Notfall: 058 384 21 11</text>'),
])

# ================================================================
# MODUL 5: Spektrum — gradient bar + green zone fixes
#   "Zu weich" / "Alles mitmachen" overflow left edge
#   "Zu hart" / "Ultimaten stellen" overflow right edge
#   "Klar · Liebevoll · Konsequent" wider than green zone
#   "Gesunde Zone" T=-1.1 — green rect too short at top
# ================================================================
print("\n=== modul/5: Spektrum comprehensive ===")
total += fix_file("modul/5/index.html", [
    # Gradient bar: widen x=35→15, w=530→570
    ('fill="url(#grad-grenzen)" height="35.4" rx="15" width="530" x="35"',
     'fill="url(#grad-grenzen)" height="35.4" rx="15" width="570" x="15"'),

    # Green zone dashed rect: widen w=240→270, x=180→165, also taller h=44.8→47, y=42.5→40
    ('fill="none" height="44.8" rx="19" stroke="#5a7a5a" stroke-dasharray="4,2" stroke-width="2" width="240" x="180" y="42.5"',
     'fill="none" height="47" rx="19" stroke="#5a7a5a" stroke-dasharray="4,2" stroke-width="2" width="270" x="165" y="40"'),

    # Move "Zu weich" right: x=80→68 (closer to bar left edge at 15)
    # Actually: bar starts at x=15, "Zu weich" at x=80, anchor=middle.
    # Width: 8*19*0.6=91.2, startX=80-45.6=34.4. Bar starts at 15. L=34.4-15=19.4. Fine now!
    # The issue is the bar was at x=35 before, now at x=15, so L padding improves.
    # But "Alles mitmachen": 16*14*0.6=134.4, startX=80-67.2=12.8. Bar at 15. L=12.8-15=-2.2
    # Move "Alles mitmachen" right a bit: x=80→85
    ('font-size="14" text-anchor="middle" x="80" y="85.0">Alles mitmachen</text>',
     'font-size="14" text-anchor="middle" x="85" y="85.0">Alles mitmachen</text>'),

    # "Ultimaten stellen": 18*14*0.6=151.2, endX=520+75.6=595.6, bar ends at 585. R=585-595.6=-10.6
    # Move left: x=520→515
    ('font-size="14" text-anchor="middle" x="520" y="85.0">Ultimaten stellen</text>',
     'font-size="14" text-anchor="middle" x="515" y="85.0">Ultimaten stellen</text>'),

    # Also move "Zu hart" label to match: x=520→515
    ('font-size="19" font-weight="600" text-anchor="middle" x="520" y="61.4">Zu hart</text>',
     'font-size="19" font-weight="600" text-anchor="middle" x="515" y="61.4">Zu hart</text>'),

    # Move the right-side quote labels to match: x=520→515
    ('font-size="11" text-anchor="middle" x="520" y="103.8">«Wenn du nicht zum</text>',
     'font-size="11" text-anchor="middle" x="515" y="103.8">«Wenn du nicht zum</text>'),
    ('font-size="11" text-anchor="middle" x="520" y="119.8">Arzt gehst, gehe</text>',
     'font-size="11" text-anchor="middle" x="515" y="119.8">Arzt gehst, gehe</text>'),
    ('font-size="11" text-anchor="middle" x="520" y="135.8">ich für immer.»</text>',
     'font-size="11" text-anchor="middle" x="515" y="135.8">ich für immer.»</text>'),
])

# ================================================================
# MODUL 6: Fünf Säulen — fix emoji T=-6.4, text overflows, title T values
# ================================================================
print("\n=== modul/6: Fünf Säulen comprehensive ===")
total += fix_file("modul/6/index.html", [
    # All 5 pillar rects: move y=73.2→66, h=142.8→150 (fixes emoji T=-6.4)

    # Pillar 1 Psychoedukation: y=73.2→66, h=142.8→150, ALSO widen w=84→96, x=44→38
    ('fill="#ddeef8" height="142.8" rx="4" stroke="#a8c8e0" stroke-width="1" width="84" x="44" y="73.2"',
     'fill="#ddeef8" height="150" rx="4" stroke="#a8c8e0" stroke-width="1" width="96" x="38" y="66"'),

    # Pillar 2 Kommunikation: y=73.2→66, h=142.8→150, widen w=96→104, x=134→130
    ('fill="#e8f0e8" height="142.8" rx="4" stroke="#b8d0b8" stroke-width="1" width="96" x="134" y="73.2"',
     'fill="#e8f0e8" height="150" rx="4" stroke="#b8d0b8" stroke-width="1" width="104" x="130" y="66"'),

    # Pillar 3 Krankheitsfreie Inseln: y=73.2→66, h=142.8→150
    ('fill="#fdf6e8" height="142.8" rx="4" stroke="#e8d8b0" stroke-width="1" width="96" x="230" y="73.2"',
     'fill="#fdf6e8" height="150" rx="4" stroke="#e8d8b0" stroke-width="1" width="96" x="230" y="66"'),

    # Pillar 4 Krisenplan: y=73.2→66, h=142.8→150
    ('fill="#fde8e0" height="142.8" rx="4" stroke="#e0c0b0" stroke-width="1" width="96" x="326" y="73.2"',
     'fill="#fde8e0" height="150" rx="4" stroke="#e0c0b0" stroke-width="1" width="96" x="326" y="66"'),

    # Pillar 5 Netzwerk: y=73.2→66, h=142.8→150
    ('fill="#eee8f4" height="142.8" rx="4" stroke="#c0b8d4" stroke-width="1" width="84" x="428" y="73.2"',
     'fill="#eee8f4" height="150" rx="4" stroke="#c0b8d4" stroke-width="1" width="84" x="428" y="66"'),

    # Fundament rect: increase height to cover title T=-3.0
    # Rect y=226, h=33. Title y=244, fs=21, top=223. T=223-226=-3.
    # Move y=226→222, h=33→37
    ('fill="#e8f0e8" height="33.0" rx="4" stroke="#b8d0b8" stroke-width="1" width="540" x="30" y="226.0"',
     'fill="#e8f0e8" height="37.0" rx="4" stroke="#b8d0b8" stroke-width="1" width="540" x="30" y="222"'),

    # Dach/Roof rect: increase height to cover title T=-5.7
    # Rect y=49.6, h=21.2. Title y=64.9, fs=21, top=43.9. T=43.9-49.6=-5.7
    # Move y=49.6→43, h=21.2→27.8
    ('fill="#eee8f4" height="21.2" rx="3" stroke="#c0b8d4" stroke-width="1" width="560" x="20" y="49.6"',
     'fill="#eee8f4" height="27.8" rx="3" stroke="#c0b8d4" stroke-width="1" width="560" x="20" y="43"'),
])

print(f"\n{'='*60}")
print(f"TOTAL: {total} replacements applied")
print(f"{'='*60}")
