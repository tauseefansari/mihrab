---
name: conventional-commit
description: Craft conventional commit messages with standard Gitmoji icons and strictly clean attribution (no AI co-authorship trailers).
---

# Conventional Commit with Gitmojis

When crafting commit messages for this repository, you must strictly follow the conventional commits standard paired with standard Gitmojis.

## Commit Message Format

```text
<emoji> <type>(<scope>): <subject>

[optional body explaining why and what changed]

[optional footer(s)]
```

## Emoji and Type Mapping

- `✨ feat`: New feature or user-facing functionality
- `🐛 fix`: Bug fix
- `♻️ refactor`: Code refactoring without changing functionality
- `💄 style`: UI design, styling, and visual adjustments
- `📝 docs`: Documentation updates
- `⚡️ perf`: Performance optimizations
- `🧪 test`: Adding or refactoring unit/E2E tests
- `🌐 i18n`: Translations and internationalization
- `🏗️ arch`: Architecture, monorepo, or directory restructuring
- `🔧 chore`: Tooling, configs, dependency updates, scripts

## Strict Anti-AI Co-Authorship Rule

- **NEVER** append `Co-authored-by: Cursor <...>`, `Co-authored-by: Claude <...>`, `Co-authored-by: Copilot <...>`, or any AI / bot attribution trailer.
- The commit must appear 100% human-crafted with clean git history.
- Keep the first line concise ($\le 72$ characters) in imperative mood.
