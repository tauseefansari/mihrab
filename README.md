# Mihrab App 🕌

> A Modern Spiritualist Islamic Application, designed for _khushu_ (tranquility and focus).

[![CI/CD Pipeline](https://github.com/Tauseef/mihrab/actions/workflows/deploy.yml/badge.svg)](https://github.com/Tauseef/mihrab/actions/workflows/deploy.yml)
[![Coverage Status](https://img.shields.io/badge/coverage-90%25-brightgreen.svg)](<>)
[![Vercel](https://img.shields.io/badge/vercel-deployed-black.svg)](<>)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](<>)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwind-css)](<>)

Mihrab App is an offline-first Islamic companion built on the cutting edge of the Next.js App Router. It utilizes the **Stitch Modern Spiritualist Design System** (Glassmorphic Minimalism) and adheres to extremely strict engineering standards to ensure it is robust, accessible, and easily maintainable.

---

## 🏗 Architecture & Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Database:** Neon Serverless Postgres via Drizzle ORM
- **Authentication:** Firebase Auth (OTP/Phone)
- **Design System:** Tailwind CSS v4, Framer Motion, Native View Transitions
- **Internationalization:** next-intl (Full LTR/RTL support across EN, AR, UR, HI)
- **PWA:** Serwist (Offline-First capabilities)
- **Testing:** Vitest (90%+ Coverage), Playwright (E2E)

### Strict Engineering Rules (SOLID & DRY)

- **Zero Tolerance Linting:** The build fails on a single ESLint error or warning (`--max-warnings 0`), fully enforced by TypeScript.
- **Feature-Sliced Design (FSD):** Code is modular. Raw HTML tags (`<button>`, `<input>`) are strictly forbidden outside of `src/components/ui/` to ensure the design system is universally respected.
- **Complexity Limits:** Functions are capped at 80 lines and 15 cognitive complexity.
- **SOLID Principles:** API routes and Server Actions act strictly as orchestrators; all business logic lives in `src/core/services/` (e.g. `CookieService`).
- **Server Actions over Client Mutations:** Infrastructure operations like persisting theme and i18n settings to secure cookies are handled via optimized Next.js Server Actions.

---

## 🚀 Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tauseef/mihrab.git
   cd mihrab
   ```

2. **Install Dependencies (pnpm only)**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   - Copy the `.env.example` file to `.env`
   - Fill in your `DATABASE_URL` (Neon) and Firebase keys.

   ```bash
   cp .env.example .env
   ```

4. **Database Setup**

   ```bash
   pnpm dlx drizzle-kit generate
   pnpm dlx drizzle-kit push
   ```

5. **Run the Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🧪 Testing

We enforce a strict 90% coverage limit.

```bash
# Run unit tests and check coverage
pnpm run test:coverage

# Run End-to-End tests
pnpm dlx playwright test
```

## 📜 License

Private - All Rights Reserved.
