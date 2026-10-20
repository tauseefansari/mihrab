<div align="center">

# 🕌 Mihrab (مِحْرَاب)

**A Modern Spiritualist Islamic companion designed for _khushu_ (tranquility, reverence, and focus).**

<p align="center">
  <a href="https://github.com/tauseefansari/mihrab/actions/workflows/ci.yml">
    <img src="https://github.com/tauseefansari/mihrab/actions/workflows/ci.yml/badge.svg" alt="CI Pipeline Status" />
  </a>
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js" alt="Next.js 16" />
  </a>
  <a href="https://react.dev">
    <img src="https://img.shields.io/badge/React-19.3-087EA4?style=flat&logo=react" alt="React 19" />
  </a>
  <a href="https://turbo.build/repo">
    <img src="https://img.shields.io/badge/Turborepo-2.11-EF4444?style=flat&logo=turborepo" alt="Turborepo" />
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss" alt="Tailwind CSS v4" />
  </a>
  <a href="https://vitest.dev">
    <img src="https://img.shields.io/badge/Coverage-99%25-brightgreen?style=flat&logo=vitest" alt="Test Coverage" />
  </a>
  <a href="https://gitmoji.dev">
    <img src="https://img.shields.io/badge/Gitmoji-%20%F0%9F%98%9C%20%F0%9F%98%8D-FFDD67.svg?style=flat" alt="Gitmoji" />
  </a>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-architecture--monorepo-structure">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-available-scripts">Scripts</a> •
  <a href="#-engineering-standards">Engineering Standards</a> •
  <a href="#-license">License</a>
</p>

---

</div>

## ✨ Key Features

- **🌙 Glassmorphic Minimalism:** Purpose-crafted UI utilizing floating acrylic panels, subtle borders, and harmonious dark/light themes designed to foster focus.
- **🌍 Bi-directional & Multilingual:** Native support for English, Arabic (`العربية`), Urdu (`اردو`), and Hindi (`हिंदी`) with strict logical CSS properties (`start`/`end`) ensuring flawless RTL and LTR rendering.
- **⚡ Offline-First PWA:** Powered by Serwist service worker caching for offline prayer times, dhikr tracking, and reading.
- **📿 Tasbeeh & Spiritual Widgets:** Real-time counters, daily ayah inspirations, prayer schedules, and Qibla direction indicators.
- **🔐 Strict Security & Auth:** Hybrid client-side and server-side Firebase Authentication paired with zero-warning security audits in CI.
- **💎 Zero Technical Debt:** 100% unit test coverage thresholds across core services, zero ESLint warnings (`--max-warnings 0`), and complete TypeScript type safety.

---

## 🏗 Architecture & Monorepo Structure

Mihrab is built as an ultra-fast Turborepo monorepo adhering to **Feature-Sliced Design (FSD)**:

```text
mihrab/
├── apps/
│   └── web/                     # Primary Next.js 16 App Router application
│       ├── src/
│       │   ├── app/             # Route handlers, server actions, and root layout
│       │   ├── components/
│       │   │   ├── layout/      # Shell, top navigation, sidebar, mobile bar
│       │   │   └── ui/          # Atomic design primitives (buttons, inputs, cards)
│       │   ├── core/services/   # Isolated business logic layer (Cookie, DB, Auth)
│       │   ├── db/              # Drizzle ORM schema, client & migrations
│       │   ├── features/        # Domain features (dashboard, tasbeeh, qibla)
│       │   └── shared/          # Typed env validation, i18n configs, utilities
│       └── drizzle.config.ts    # Drizzle Kit migration configuration
│
├── packages/
│   ├── eslint-config/           # Reusable ESLint 9 flat configurations
│   ├── prettier-config/         # Standardized code style configuration
│   ├── typescript-config/       # Base & Next.js TypeScript compiler presets
│   └── vitest-config/           # Shared Vitest configuration with 90%+ coverage gates
│
└── .husky/                      # Git hooks enforcing pre-commit formatting & commitlint
```

---

## 🛠 Tech Stack

| Domain                   | Technology                                                                                             | Description                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| **Framework**            | [Next.js 16](https://nextjs.org/)                                                                      | App Router with React 19 & React Compiler                 |
| **Monorepo**             | [Turborepo](https://turbo.build/)                                                                      | High-performance build system & remote task orchestration |
| **Styling**              | [Tailwind CSS v4](https://tailwindcss.com/)                                                            | Modern CSS-first engine with logical property standards   |
| **Database**             | [Drizzle ORM](https://orm.drizzle.team/) + [Neon](https://neon.tech/)                                  | Type-safe serverless PostgreSQL client & migrations       |
| **Authentication**       | [Firebase](https://firebase.google.com/)                                                               | Client SDK + Firebase Admin SDK                           |
| **PWA**                  | [Serwist](https://serwist.pages.dev/)                                                                  | Service worker caching & offline support                  |
| **Internationalization** | [next-intl](https://next-intl-docs.vercel.app/)                                                        | Type-safe dictionary translations across 4 locales        |
| **Testing**              | [Vitest](https://vitest.dev/) + [RTL](https://testing-library.com/)                                    | Unit testing with V8 coverage enforcement (>90%)          |
| **Git Automation**       | [Husky](https://typicode.github.io/husky/) + [Lint-Staged](https://github.com/lint-staged/lint-staged) | Automated pre-commit linting & Conventional Commitlint    |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v26.x` (managed via `.nvmrc`)
- **Package Manager**: `pnpm` (strictly enforced via `only-allow pnpm`)

### 1. Clone & Install

```bash
git clone git@github.com:tauseefansari/mihrab.git
cd mihrab
nvm use
pnpm install
```

### 2. Environment Configuration

Copy the example environment configuration into `apps/web`:

```bash
cp apps/web/.env.example apps/web/.env
```

Populate `apps/web/.env` with your Neon database URL and Firebase credentials.

### 3. Database Migration

Generate and apply the initial PostgreSQL database schema using Drizzle:

```bash
# Generate SQL migrations from schema
pnpm db:generate

# Push schema changes to your database
pnpm db:push

# (Optional) Open Drizzle Studio visual browser
pnpm db:studio
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

Run all commands from the root directory via `pnpm`:

| Command              | Action                                                                  |
| -------------------- | ----------------------------------------------------------------------- |
| `pnpm dev`           | Starts local Next.js development server with Turbopack/Webpack          |
| `pnpm build`         | Compiles optimized production bundle across all monorepo packages       |
| `pnpm lint`          | Validates code quality with zero-warning tolerance (`--max-warnings 0`) |
| `pnpm format`        | Auto-formats all code using Prettier                                    |
| `pnpm format:check`  | Verifies code formatting without modifying files                        |
| `pnpm type:check`    | Performs strict TypeScript validation without emitting code             |
| `pnpm test`          | Executes unit tests via Vitest                                          |
| `pnpm test:coverage` | Runs full unit test suite with coverage thresholds (>90%)               |
| `pnpm prebuild`      | Executes full audit pipeline (format check, lint, type check, coverage) |
| `pnpm db:generate`   | Generates Drizzle migration files from `src/db/schema.ts`               |
| `pnpm db:push`       | Synchronizes database schema directly with PostgreSQL                   |
| `pnpm db:studio`     | Launches visual Drizzle Studio schema explorer                          |

---

## 🏛 Engineering Standards

- **Strict FSD Primitive Boundaries:** Raw HTML elements (`<button>`, `<div>` for styling, `<input>`) may **only** reside inside `src/components/ui/`. All features must compose these primitives.
- **Bi-Directional Logical Styling:** Physical directional utilities (`ml-*`, `pr-*`, `text-left`) are strictly prohibited in favor of logical equivalents (`ms-*`, `pe-*`, `text-start`).
- **Server Actions & Service Layer:** UI components never write raw database queries. Data operations flow through dedicated services in `src/core/services/*`.
- **Gitmojis & Clean Commits:** All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification prefixed with [Gitmojis](https://gitmoji.dev) (e.g. `✨ feat(tasbeeh): add haptic vibration feedback`).

---

## 📄 License

Private repository. Copyright © 2026 Tauseef Ansari. All rights reserved.
