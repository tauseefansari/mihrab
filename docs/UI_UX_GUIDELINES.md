# UI/UX & Theming Guidelines

## 1. Theme Variables

- **Primary:** Emerald (`#10B981`), transitioning to Teal for gradients.
- **Light Mode:** Background `zinc-50`, Surfaces `white`, Text `zinc-900`.
- **Dark Mode:** Background `zinc-950`, Surfaces `zinc-900` with `border-white/10`, Text `zinc-50`.
- **Glassmorphism:** Use `backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70` for navigation bars and sticky headers.

## 2. Typography

- **English (UI & Translation):** `Inter` (Sans-serif).
- **Arabic (Quran/Hadith):** `Amiri` or `Noto Naskh Arabic` (Serif).

## 3. Micro-Interactions (Framer Motion)

- **Page Transitions:** Horizontal slide-ins (spring physics) for sequential flows (like Auth).
- **Button Taps:** `whileTap={{ scale: 0.95 }}` on all interactive primary elements.
- **Tasbeeh Counter:** Neumorphic 3D press effect using inverted drop-shadows on tap.

## 4. Islamic Aesthetics

- **Mihrab Arch:** Top corners of primary hero cards use `rounded-t-[32px]` while bottom corners use `rounded-b-2xl`.
- **Geometric Patterns:** Low-opacity (3-5%) SVG Girih patterns used as background watermarks in hero cards and splash screens.
