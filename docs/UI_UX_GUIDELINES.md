# UI/UX & Theming Guidelines

## 1. Design System & Theme Variables

- **Primary Colors:** Emerald (`#10B981`) transitioning to Teal for spiritual gradient surfaces.
- **Surface Elevation:**
  - **Light Mode:** Canvas `zinc-50`, floating panels `white`, typography `zinc-900`.
  - **Dark Mode:** Canvas `zinc-950`, floating panels `zinc-900` with `border-white/10`, typography `zinc-50`.
- **Glassmorphism:** Use the `.glass-panel` utility (`backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70`) for sticky headers, navigation rails, and modal sheets.
- **Directionality (RTL/LTR):** Exclusively logical properties (`ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`). Physical directional classes (`pl-`, `pr-`, `ml-`, `mr-`, `text-left`, `text-right`) are banned.

---

## 2. Typography

- **English & Latin Script (UI & Translation):** `Inter` sans-serif (`--font-inter`).
- **Arabic Script (Quran, Hadith & Nav):** `Noto Kufi Arabic` serif (`--font-noto-serif`) aligned `text-end` in RTL modes.
- **Dual-Script Alignment:** Side-by-side or stacked layout supporting automatic flipping based on active locale (`en`, `ar`, `ur`, `hi`).

---

## 3. Micro-Interactions & State Preservation

- **Native React 19 Activity:** Use `<Activity mode="visible" | "hidden">` directly from `'react'` to preserve counter state, audio playback, and scroll position when navigating between tabs.
- **Tactile Tap Physics:** `whileTap={{ scale: 0.95 }}` on buttons and interactive chips via Framer Motion.
- **Tasbeeh Haptics:** Neumorphic 3D press effect using inverted drop-shadows and tactile spring physics on tap.
- **Smooth Page Transitions:** Spring-based horizontal slide transitions on route shifts.

---

## 4. Islamic Aesthetics

- **Mihrab Arch Geometry:** Top corners of primary hero cards feature `rounded-t-[32px]` with bottom corners `rounded-b-2xl`.
- **Girih Geometric Patterns:** Low-opacity (3–5%) SVG Girih geometric patterns used as subtle watermarks in hero cards and headers.
