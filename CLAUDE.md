# CLAUDE.md

## Project
CLI tool that prints a directory tree with file sizes next to each file.

## Stack
- TypeScript (strict mode)
- Vitest for tests
- ESLint for linting
- tsup for building

## File responsibilities
- src/traverse.ts  → walks the directory recursively
- src/format.ts    → formats tree lines and file sizes
- src/print.ts     → outputs to terminal
- src/index.ts     → CLI entry point, parses args

## Rules
- All source code in src/ only
- Never modify package.json manually
- Every exported function must have at least one test in tests/
- Run `npm test` after every change
- Use named exports only, no default exports
- Keep comitting when you make progress, even if it's not a full feature yet (don't add yourself as coauthor)
- Commit messages should be concise but descriptive, e.g. "feat: Add --depth flag with tests" or "Handle empty directories in traverse function" and also using semantic commit message format (feat, fix, docs, etc.)
- Don't add new dependencies without a good reason. If you think you need one, add it to the "Next features" section first and justify why it's needed.
- Update this `CLAUDE.md` file with any new features, rules, or architectural decisions as the project evolves. This is the single source of truth for how the project is structured and how to contribute to it.
- File sizes: show in B, KB, MB depending on size


## Current features
- Prints directory tree with file sizes (B/KB/MB)
- --depth <n> flag to limit tree depth
```

So the next session, Claude Code knows the full picture without you re-explaining.

**`CLAUDE.md` is a living document. It grows with your project.**

---

## For your specific next steps

| What to build | Prompt to use |
|---|---|
| `--depth` flag | *"Add --depth \<n\> flag. Default = unlimited. Tests for 0, 1, 2."* |
| `--ignore` flag | *"Add --ignore flag accepting comma-separated names. Default ignore node_modules and .git. Tests for custom ignore lists."* |
| Edge case tests | *"Add tests only — no new features. Cover: empty dirs, symlinks, files >1MB. Don't change src/ files."* |

Notice the last one — *"don't change src/ files"* is a guardrail in the prompt itself. You can add one-off rules per session on top of `CLAUDE.md`.

---

## The full rhythm
```
Session 1: scaffold + core build      ✅ done
Session 2: --depth flag
Session 3: --ignore flag
Session 4: edge case tests
Session 5: publish to npm