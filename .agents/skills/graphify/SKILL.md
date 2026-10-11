---
name: graphify
description: Leverage tree-sitter knowledge graphs to navigate codebase relationships and optimize AI token consumption.
---

# Graphify: Codebase Knowledge Graph & Token Optimizer

Graphify transforms the monorepo into an AST-aware knowledge graph using tree-sitter, mapping classes, functions, components, and call graphs.

## Token Optimization Principles

- Instead of scanning entire directories or raw files in full, query the symbol index and relational graph.
- Exclude all graph artifacts (`.graphify/`, `graph.json`, `graphify-out/`) from git tracking and AI context windows via `.gitignore`, `.agentignore`, and `.claudeignore`.
- Prevent prompt cache invalidation by never letting generated graph cache files enter the context window.
