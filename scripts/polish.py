#!/usr/bin/env python3
"""Final polish: remove any residual red/cyan pixels hugging the outer 140px rim (arrow fragments at silhouette edges)."""
import numpy as np
from PIL import Image, ImageFilter

P = "/home/gumilang/rodai-pixel/public/images/px/hero_char.png"
im = Image.open(P).convert("RGBA")
a = np.array(im)
h, w, _ = a.shape
alpha = a[:, :, 3] > 127
R = a[:, :, 0].astype(np.int16); G = a[:, :, 1].astype(np.int16); B = a[:, :, 2].astype(np.int16)

edge_bin = np.zeros((h, w), dtype=bool)
edge_bin[:, :140] = True
edge_bin[:, -140:] = True
edge_bin[:90, :] = True

# colorful pixels inside alpha at outer rim
redd = (R > G + 25) & (R > B + 25) & (R > 70) & ((R - np.maximum(G, B)) > 40)
cyand = (B > G + 30) & (B > R + 18) & (B > 130)
kill = edge_bin & alpha & (redd | cyand)
print("rim colorful px to kill:", int(kill.sum()))

# blank them out (transparent) — they were only edge fragments
a2 = a.copy()
a2[:, :, 3] = np.where(kill, 0, a2[:, :, 3])
out = Image.fromarray(a2)
out.save(P)
print("saved", P, out.size)