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
- Supabase MCP (`https://mcp.supabase.com/mcp`): acceso al proyecto de Supabase (BD, Auth, Edge Functions, Storage, Realtime, migraciones, logs). Requiere autenticación OAuth 2.1 o un personal access token scoped (variable `SUPABASE_ACCESS_TOKEN`). La contraseña de la BD se maneja con `SUPABASE_DB_PASSWORD` para comandos como `supabase db push`. Nunca exponer la `service_role` ni secret key en clientes públicos; usar claves publicables para el frontend (cualquier `NEXT_PUBLIC_` va al navegador).

## Supabase

- Skill `supabase` (`.agents/skills/supabase/`): usar para CUALQUIER tarea con Supabase (Base de datos, Auth, Edge Functions, Realtime, Storage, Vectores, Cron, Colas; `supabase-js`, `@supabase/ssr`; RLS; CLI/MCP; migraciones, esquemas declarativos; depuración). Cargar antes de tocar cualquier cosa de Supabase.
- Skill `supabase-postgres-best-practices` (`.agents/skills/supabase-postgres-best-practices/`): cargar ANTES de escribir o cambiar algo en Postgres (tablas, columnas, tipos, índices, RLS, funciones, triggers, pg_cron, pgmq, pgvector, dumps). Reglas de rendimiento y seguridad por categoría (`query-`, `conn-`, `security-`, `schema-`, `lock-`, `data-`, `monitor-`, `advanced-`).
- Reglas clave de Supabase: habilitar RLS en toda tabla expuesta (`public` por defecto); nunca usar `user_metadata` para autorización (usa `app_metadata`); `auth.role()` está deprecado, usar `TO authenticated` + predicado de propiedad en `USING`; las vistas saltan RLS por defecto (`WITH (security_invoker = true)` en PG 15+); `SECURITY DEFINER` salta RLS, preferir `SECURITY INVOKER`; nunca exponer `service_role` en público.
- Flujo de cambios de esquema: **SIEMPRE usar migraciones imperativas** (`supabase migration new <name>`) cada vez que se manipula la base de datos (crear/alterar tablas, columnas, índices, RLS, seed, etc.). Nunca usar esquemas declarativos (`supabase/schemas/`) para cambios de esquema. Iterar con `execute_sql` / `supabase db query` (NO `apply_migration` para cambiar esquema local). Al commitear: `supabase db advisors`, revisar checklist de seguridad, `supabase db pull <nombre> --local --yes`, `supabase migration list --local`.

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

## Skills instaladas (`.agents/skills/`)

- `spec` — diseña especificaciones y las guarda como `specs/NN-slug.md`.
- `spec-impl` — implementa specs aprobadas (rama `spec-NN-slug`), sin auto-commit.
- `supabase` — tarea con Supabase (BD, Auth, Edge Functions, Storage, RLS, migraciones, CLI/MCP).
- `supabase-postgres-best-practices` — mejores prácticas de Postgres/Supabase antes de cambiar esquema o SQL.

## Reglas de código

- Usar código limpio, nombres, funciones, variables, etc en ingles

## Agente verificador de aceptación

Ubicado en `.agents/agents/acceptance-verifier/`. Revisa y marca las casillas `[x]` / `[ ]` de la sección "Criterios de aceptación" de un spec en `specs/`.

### Comando

```
npx tsx .agents/agents/acceptance-verifier/verify.ts specs/01-feed-home.md
```

Si no se pasa path de spec, usa `specs/01-feed-home.md` por defecto.

### Clasificación de criterios

| Tipo | Herramienta | Ejemplo |
|------|-------------|---------|
| código | `npm run lint`, `npx tsc --noEmit`, `npm run build` | sin errores nuevos, consola limpia |
| convención | inspección de `package.json` y fuentes | identificadores en inglés, copy en español, `href="#"` |
| visual | Playwright MCP (screenshot 924×540) + Nemotron visión | comparación contra `references/screenshots/feed.png` |
| nextjs | Context7 MCP (docs Next.js 16.4.3) | recomendaciones oficiales |
| pendiente | revisión manual | criterios no verificables automáticamente |

### Archivos del agente

- `verify.ts` — script de verificación (extrae criterios, ejecuta checks, marca casillas, imprime reporte).
- `AGENT.md` — instrucciones del agente.
- `agent.json` — definición del agente (modelo: Nemotron 3.5 Super VL Free).

### Reglas

- No se modifica código de la aplicación salvo petición expresa del usuario.
- Los screenshots se guardan en `.playwright-mcp/` (gitignored).
- Los specs y reportes están en español.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
