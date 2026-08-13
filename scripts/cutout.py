#!/usr/bin/env python3
"""Cutout v10: v9 + final small-component cleanup (drop tiny red/cyan fragments inside blob)."""
import numpy as np
import cv2
from PIL import Image, ImageFilter
from collections import deque

SRC = "/mnt/c/Users/bobby/Downloads/photo_2026-08-08_23-02-26.jpg"
OUT = "/home/gumilang/rodai-pixel/public/images/px/hero_char.png"

im = Image.open(SRC).convert("RGB")
rgb = np.array(im)
h, w, _ = rgb.shape
R = rgb[:, :, 0].astype(np.int16)
G = rgb[:, :, 1].astype(np.int16)
B = rgb[:, :, 2].astype(np.int16)
hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
H = hsv[:, :, 0].astype(np.int16)
S = hsv[:, :, 1].astype(np.int16)
V = hsv[:, :, 2].astype(np.int16)

is_bg = (B > R + 25) & (B > G + 22)
is_cyan = (B > 170) & (G > 140) & (B > R + 20)
is_bg |= is_cyan

red_hue = ((H < 14) | (H > 235)) & (S > 125) & (V > 60)
keep = ~is_bg & ~red_hue

# connected components
label = np.zeros((h, w), dtype=np.int32)
sizes = []
cur = 0
for y in range(h):
    for x in range(w):
        if keep[y, x] and label[y, x] == 0:
            cur += 1
            sz = 1
            q = deque([(y, x)])
            label[y, x] = cur
            while q:
                cy, cx = q.popleft()
                for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < h and 0 <= nx < w and keep[ny, nx] and label[ny, nx] == 0:
                        label[ny, nx] = cur
                        sz += 1
                        q.append((ny, nx))
            sizes.append(sz)

print("components:", len(sizes), "largest:", max(sizes))
big = int(np.argmax(sizes)) + 1
blob = (label == big)

hole = (red_hue & blob).astype(np.uint8) * 255
if hole.sum() > 0:
    rgb = cv2.inpaint(rgb, hole, 12, cv2.INPAINT_TELEA)

alpha = np.where(blob, 255, 0).astype(np.uint8)
alpha_img = Image.fromarray(alpha, "L")
closed = alpha_img.filter(ImageFilter.MaxFilter(35)).filter(ImageFilter.MinFilter(35))
alpha_f = Image.fromarray(np.maximum(np.array(closed), alpha), "L").filter(ImageFilter.MaxFilter(3))
alpha_arr = np.array(alpha_f)
blobA = alpha_arr > 127

# ---------- FINAL border red strip ----------
outside = ~blobA
red_loose = (R > G + 18) & (R > B + 18) & (R > 55) & (S > 60)
strip = np.zeros((h, w), dtype=bool)
d_out = outside.copy()
for _ in range(80):
    ny = np.zeros((h, w), dtype=bool)
    ny[1:, :] |= d_out[:-1, :]
    ny[:-1, :] |= d_out[1:, :]
    ny[:, 1:] |= d_out[:, :-1]
    ny[:, :-1] |= d_out[:, 1:]
    t = ny & blobA & red_loose
    strip |= t
    d_out |= t
    if not t.any():
        break
print("final stripped red px:", int(strip.sum()))
blob_final = blobA & ~strip
if strip.any():
    rgb = cv2.inpaint(rgb, strip.astype(np.uint8) * 255, 8, cv2.INPAINT_TELEA)

# ---------- drop tiny COLORED fragments (red/cyan/saturated) inside weird places ----------
colorful = (red_loose | ((B > R + 15) & (B > G + 15) & (S > 90) & (V > 60)))
clabel = np.zeros((h, w), dtype=np.int32)
csizes = []
ccur = 0
for y in range(h):
    for x in range(w):
        if blob_final[y, x] and colorful[y, x] and clabel[y, x] == 0:
            ccur += 1
            sz = 1
            q = deque([(y, x)])
            clabel[y, x] = ccur
            while q:
                cy, cx = q.popleft()
                for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < h and 0 <= nx < w and blob_final[ny, nx] and colorful[ny, nx] and clabel[ny, nx] == 0:
                        clabel[ny, nx] = ccur
                        sz += 1
                        q.append((ny, nx))
            csizes.append(sz)

drop = np.zeros((h, w), dtype=bool)
# drop tiny (<400px) fragments
smalls = 0
for i, sz in enumerate(csizes):
    if sz < 400:
        drop |= clabel == (i + 1)
        smalls += 1
# drop edge-hugging colored fragments (suit-side red/cyan leftovers): near left/right/top image borders
edge_bin = np.zeros((h, w), dtype=bool)
edge_bin[:, :150] = True   # left strip
edge_bin[:, -150:] = True  # right strip
edge_bin[:80, :] = True    # top strip
edge_drop = 0
for i, sz in enumerate(csizes):
    cid = i + 1
    if sz < 20000 and (clabel == cid)[edge_bin].sum() > 0:
        drop |= clabel == cid
        edge_drop += 1
print("dropped small colorful px:", int(drop.sum()), "small comps:", smalls, "edge comps:", edge_drop)

blob_final2 = blob_final & ~drop
if drop.any():
    rgb = cv2.inpaint(rgb, drop.astype(np.uint8) * 255, 8, cv2.INPAINT_TELEA)

alpha2 = np.where(blob_final2, 255, 0).astype(np.uint8)
# brutal: erode 5px to kill edge-attached fragments, dilate back
aa = Image.fromarray(alpha2, "L")
aa = aa.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MaxFilter(3))
out = Image.fromarray(rgb).convert("RGBA")
out.putalpha(aa)
arr = np.array(out)[:, :, 3]
ys, xs = np.where(arr > 10)
pad = 16
y0 = max(0, int(ys.min()) - pad); x0 = max(0, int(xs.min()) - pad)
y1 = min(h, int(ys.max()) + pad); x1 = min(w, int(xs.max()) + pad)
out = out.crop((x0, y0, x1, y1))
out.save(OUT)
a2 = np.array(out)
print("saved", OUT, "size", out.size, "alpha>10 %:", round(100 * (a2[:, :, 3] > 10).mean(), 2))