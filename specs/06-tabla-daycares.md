# SPEC 06 — Tabla daycares en Supabase con seed inicial

> **Estado:** Implementado
> **Depende de:** Ninguna
> **Fecha:** 2026-11-10
> **Objetivo:** Crear la tabla `daycares` en Supabase mediante migración SQL e insertar 4 guarderías iniciales, siendo "Sala Soles" la guardería raíz.

## Por qué existe esta spec

Es el primer contacto del proyecto con Supabase y la base de datos real. La tabla `daycares` es la entidad raíz del esquema de referencia (`07-DB-Schema/opendaycare-database-schema.md`) y de ella dependen `users`, `rooms` y el resto del modelo. Definirla ahora, con migración y seed, sienta el patrón que seguirán las siguientes tablas.

## Alcance

**In:**

- Carpeta `supabase/migrations/` (no existe todavía en el repo).
- Migración imperativa que crea la tabla `daycares`: `id uuid PK default gen_random_uuid()`, `name text not null`, `created_at timestamptz not null default now()`.
- RLS habilitado en `daycares` con política de lectura para `authenticated`.
- Seed SQL que inserta 4 guarderías: `Sala Soles`, `Mundo de Colores`, `Pequeños Pasos`, `Arcoíris`.
- Aplicar migración y seed contra Supabase remoto.
- Sincronizar estado local: `supabase db pull --local --yes` y `supabase migration list --local`.

**Fuera de alcance (para specs futuras):**

- Tablas `users`, `rooms`, `children`, `posts` y resto del esquema.
- Trigger `AFTER INSERT` en `auth.users` ni función `SECURITY DEFINER` (va con la spec de `users`).
- Columna `updated_at` en `daycares` (no está en el esquema de referencia para esta tabla).
- Conexión desde Next.js (`supabase-js`, Server Actions, componentes de lectura).

## Modelo de datos

Migración SQL (archivo en `supabase/migrations/`):

```sql
create table daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table daycares enable row level security;

create policy "daycares_read_authenticated"
  on daycares for select
  to authenticated
  using (true);
```

Seed SQL (se ejecuta tras la migración):

```sql
insert into daycares (name) values
  ('Sala Soles'),
  ('Mundo de Colores'),
  ('Pequeños Pasos'),
  ('Arcoíris');
```

Convenciones:

- Identificadores de esquema en inglés (`daycares`, `id`, `name`, `created_at`).
- Copy visible al usuario en español; aquí no hay copy de UI, solo datos de prueba.
- `Sala Soles` es la guardería raíz y debe aparecer como primera fila del seed.

## Plan de implementación

1. **Crear carpeta `supabase/migrations/`** en la raíz del repo. Prueba: `ls supabase/migrations/` existe.
2. **Crear la migración** `supabase/migrations/<timestamp>_create_daycares_table.sql` con el DDL de `daycares` + RLS. Prueba: el archivo compila sintácticamente (formato SQL válido).
3. **Crear el seed** con las 4 guarderías (puede ir en el mismo archivo de migración o en uno separado `seed_daycares.sql`). Prueba: `insert` de 4 filas, `Sala Soles` incluida.
4. **Aplicar contra Supabase remoto** (`supabase db push` o `execute_sql` vía MCP). Prueba: la tabla `daycares` aparece en el proyecto remoto con las 4 filas.
5. **Sincronizar local:** `supabase db pull --local --yes` y `supabase migration list --local`. Prueba: la migración aparece en el listado local.
6. **Verificación final:** `npm run lint`, `npx tsc --noEmit`, `npm run build` sin errores nuevos.

## Criterios de aceptación

- [x] Existe `supabase/migrations/<timestamp>_create_daycares_table.sql`.
- [x] La migración aplica limpiamente contra Supabase remoto.
- [x] La tabla `daycares` tiene exactamente 4 filas tras el seed.
- [x] Una de las filas tiene `name = 'Sala Soles'`.
- [x] RLS habilitado en `daycares` y política de lectura para `authenticated`.
- ~~`supabase migration list --local` muestra la migración aplicada.~~ (omitido: sin Docker en este entorno)
- [x] `npm run lint` — sin errores nuevos, consola limpia.
- [x] `npx tsc --noEmit` — tipos limpios.
- [x] `npm run build` — build de producción exitoso.

## Decisiones tomadas y descartadas

- **Sí:** migración imperativa (`supabase migration new`) sobre esquema declarativo, porque es el patrón de las notas del proyecto y `daycares` es la tabla raíz (orden de creación explícito).
- **Sí:** RLS habilitado desde la primera migración, por la regla de seguridad del repo.
- **Sí:** política `to authenticated using (true)` como primera política; `daycares` no tiene columna de propietario todavía, la RLS granular por `daycare_id` llega con `users`.
- **Sí:** 4 guarderías en el seed, con `Sala Soles` como primera fila (guardería raíz).
- **No:** `updated_at` en `daycares` (no está en el esquema de referencia para esta tabla).
- **No:** trigger en `auth.users` ni `SECURITY DEFINER` (va en la spec de `users`).
- **No:** `apply_migration` para cambiar esquema local (iterar con `execute_sql` / `supabase db query`).

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| No existe carpeta `supabase/` ni CLI configurado localmente | Verificar `supabase` binary/config; si falta, `supabase init` y ligar al proyecto remoto. |
| Faltan `SUPABASE_ACCESS_TOKEN` / `SUPABASE_DB_PASSWORD` | Pedírselas al usuario antes de aplicar contra Supabase remoto. |
| Conflicto local ↔ remoto | `supabase db pull --local --yes` y revisar `supabase db advisors` tras aplicar. |

## Lo que no entra en esta spec

- Autenticación, sesión real o logout funcional.
- Tablas `users`, `rooms`, `children`, `posts` y resto del esquema.
- Conexión desde Next.js (`supabase-js`, Server Actions).
- Responsive móvil, dark mode y tests automatizados.

Cada uno de esos puntos, si llega, va en su propia spec.
