---
name: ui-ux-pro-max
description: Guide high-taste visual design, glassmorphic minimalism, micro-interactions, and Islamic geometric aesthetic standards.
---

# UI/UX Pro Max: Vibe Coding & Taste Design Guidelines

This skill guides creating interfaces with world-class aesthetic excellence and sensory delight.

## 1. Color Palette & The 60-30-10 Rule

- **60% Dominant Base:** Clean neutral background (`zinc-50` in light mode, `zinc-950` in dark mode).
- **30% Structural Surfaces:** Glassmorphic floating surfaces (`.glass-panel`, `backdrop-blur-xl bg-surface/80`).
- **10% Accent Punch:** Vibrant Spiritual Emerald (`#10B981` / `primary`) transitioning into Teal for gradients.

## 2. Micro-Interactions & Motion

- **Native View Transitions:** Smooth radial circular reveal origin for theme toggling (`circle(150% at 50% 50%)`).
- **Tactile Feedback:** `whileTap={{ scale: 0.95 }}` on primary buttons; neumorphic inverted shadow press on digital Tasbeeh counter.
- **Zero Layout Shifts (CLS 0):** Pre-allocate component dimensions using CSS skeleton containers; avoid layout jumps on hydration.

## 3. Cultural & Islamic Aesthetics

- **Mihrab Arches:** Top corners of primary hero cards use `rounded-t-[32px]` while bottom corners use `rounded-b-2xl`.
- **Girih Geometric Motifs:** Low-opacity (3-5%) SVG Girih patterns as ambient watermarks in hero cards.
- **Dual-Script Typography:**
  - English: `Inter` sans-serif.
  - Arabic: `Noto Serif` / `Amiri` serif with strict `text-end`.

## 4. Strict RTL / LTR Logical Properties

- **NEVER use:** `pl-`, `pr-`, `ml-`, `mr-`, `text-left`, `text-right`.
- **ALWAYS use:** `ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`.
