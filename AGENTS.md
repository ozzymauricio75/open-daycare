<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project notes

`open-daycare`: a daycare/parenting app on Next.js 16.4.3 (App Router, React 19, Tailwind v4). Only scaffolding exists so far — `app/page.tsx` is still the create-next-app starter; the real product is specified by the design references below.

**Never edit inside the managed block above.** `next dev` replaces everything between those markers with its canonical block (`upsertAgentRulesBlock` in `generate-agent-files.js`), so notes placed there are silently lost. Project notes belong below it, like these.

## MCPs

- Playwright screenshots y cualquier cosa relacionada a Playwright tienen que estar en la carpeta `.playwright-mcp` (gitignored). Playwright MCP is configured in `opencode.json`.
- Context7: usaremos este MCP para traer la documentación del framework actualizada.

## Commands

- `npm run dev` — Turbopack dev server on :3000. Also rewrites the managed `AGENTS.md` block.
- `npm run lint` — bare `eslint` (flat config, whole repo; no `--fix`, no file args). Single file: `npx eslint app/page.tsx`; autofix: add `--fix`.
- `npx tsc --noEmit` — typecheck. There is no `typecheck` script.
- `npx next typegen` — regenerate `.next/types` route types after adding/renaming routes. Typed routes are in use (`LayoutProps<"/">` in `app/layout.tsx`), so `tsc`/editor errors on `PageProps`/`LayoutProps` usually mean the types are stale.
- `npm run build` / `npm start` — production build and serve.
- No test runner is configured. `next experimental-test` exists in the CLI but nothing is set up — don't invent a test command.

## Config quirks (verified in `next.config.ts`)

- `cacheComponents: true` + `partialPrefetching: true`: PPR/`use cache` model. Data fetching is dynamic by default; the static shell prerenders and dynamic parts stream, so uncached async reads need Suspense boundaries or a `use cache` boundary. Node runtime only — no `runtime` segment export (not even `runtime = "nodejs"`). See `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`.
- Tailwind v4 is wired through a Turbopack loader rule (`@tailwindcss/turbopack`) in `next.config.ts`. There is **no** `postcss.config.*` or `tailwind.config.*`: theme tokens live in `app/globals.css` (`@import "tailwindcss"` + `@theme inline`).
- `experimental.agentFeedback: true`: before the final response, if you hit real Next.js bugs/friction, run `npx --no-install next internal agent-feedback-instructions` from this directory once.
- `@/*` maps to the **repo root**, not `src/` (there is no `src/`). `next-env.d.ts` is generated and gitignored.

## Layout

- `app/` — App Router. `app/layout.tsx` loads Geist as `--font-geist-sans` / `--font-geist-mono`, consumed by `@theme inline` in `globals.css`.
- `references/pantallas/*.dc.html` — self-contained design prototypes (own `support.js`, Google Fonts Fredoka/Nunito, cream palette). `references/screenshots/*.png` — rendered targets. These are visual sources of truth, not app code; nothing imports them. Build UI to match them rather than inventing screens.
- `.playwright-mcp/` — Playwright logs/screenshots, gitignored.

## Workflow: spec-driven

- `.agents/skills/spec` (`/spec`) designs a spec and saves it as `specs/NN-slug.md`; `.agents/skills/spec-impl` (`/spec-impl`) refuses to run unless the status means "Approved"/"Aprobado", then creates branch `spec-NN-slug`. `specs/` does not exist yet — the first spec is `01-`.
- Those skills forbid writing code during `/spec` and forbid auto-committing during implementation: write code, show the diff, let the user commit.
- Specs, UI copy and commit messages are in Spanish; match the existing files.

## Spec Driven Development - Skills

- /spec Usaremos esta habilidad para crear las especificaciones.
- /spec-impl Usaremos este skill para hacer las implementaciones.

## Reglas de código

- Usar código limpio, nombres, funciones, variables, etc en ingles
