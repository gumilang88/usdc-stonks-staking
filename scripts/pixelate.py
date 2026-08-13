#!/usr/bin/env python3
"""Pixelate rodai assets -> public/images/px/ (very neat: box downsample + nearest upscale)."""
import os
from PIL import Image

RAW = "/home/gumilang/rodai-pixel/raw_assets"
PX = "/home/gumilang/rodai-pixel/public/images/px"
os.makedirs(PX, exist_ok=True)

# name -> (source, min_size_threshold, scale)
JOBS = [
    ("mascot.png",      "logo_stack.png", 10),   # 640x538 rod logo stacked
    ("burner.png",      "burner.webp",    10),   # 1080 animated burner avatar
    ("dj.png",          "dj.png",         12),   # 1280x1280 DJ art
    ("aerosol.png",     "aerosol.png",    8),
    ("team_kelvin.png", "team_kelvin.jpg", 8),
    ("team_m2dev.png",  "team_m2dev.jpg",  8),
    ("team_valencia.png","team_valencia.jpg", 8),
    ("tele.png",        "tele.png",       4),
    ("x.png",           "x.png",          4),
    ("yt.png",          "yt.png",         4),
    ("solflare.png",    "solflare.webp",  4),
    ("backpack.png",    "backpack.webp",  4),
    ("logo_horiz.png",  "logo_horiz.webp", 6),
]

for out, src, scale in JOBS:
    p = os.path.join(RAW, src)
    if not os.path.exists(p):
        print(f"SKIP missing {src}")
        continue
    im = Image.open(p).convert("RGBA")
    w, h = im.size
    if max(w, h) >= 150:
        bw, bh = max(1, w // scale), max(1, h // scale)
        small = im.resize((bw, bh), Image.BOX)
        im2 = small.resize((w, h), Image.NEAREST)
    else:
        im2 = im
    out_path = os.path.join(PX, out)
    im2.save(out_path)
    print(f"{out}: {w}x{h} -> {im2.size} px={bw}x{bh}")

print("DONE")