<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Coding Style

Before writing or modifying code, read CODING_STYLE.md and follow the conventions documented there.

Treat my established coding style as the default for all new code and refactoring. Match existing patterns for naming, formatting, TypeScript, function structure, and abstraction.

Do not introduce your own stylistic preferences when my codebase already demonstrates a consistent preference.

When a change requires departing from my established style, explain why. Keep changes focused and avoid unrelated formatting or stylistic rewrites.

After implementing changes, review the diff for stylistic consistency and run the relevant type checks and linting commands.