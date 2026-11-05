# Spec 01 — Pantallas: Niños y Perfil del niño

**Estado:** Implementado
**Copy visible:** español | **Identificadores, rutas, nombres de archivo y componentes:** inglés  
**Referencias visuales:** `references/pantallas/ninos.dc.html`, `references/pantallas/perfil-nino.dc.html`

---

## 1. Objetivo

Implementar únicamente las interfaces y componentes de dos pantallas:

1. **Listado de niños** (`/kids`) — grid de tarjetas, buscador, botón "Agregar niño".
2. **Perfil del niño** (`/kids/[slug]`) — datos del niño, alergias, fechas, padres vinculados, botón "Editar", "Resumen del día", "Vincular otro padre" y enlace "Volver a Niños".

No se implementa lógica de negocio, persistencia ni autenticación real. Son interfaces estáticas con datos mock.

---

## 2. Rutas y páginas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/kids` | `app/kids/page.tsx` | Listado de niños de la sala Soles |
| `/kids/[slug]` | `app/kids/[slug]/page.tsx` | Perfil de un niño concreto |

El parámetro `slug` es un slug del nombre del niño (ej. `mateo-fernandez`, `sofia-mendez`).

---

## 3. Componentes

Todos en `app/_components/`:

| Componente | Descripción |
|------------|-------------|
| `child-card.tsx` | Tarjeta `.kid`: avatar circular con inicial, nombre, subtítulo edad/padres, badge de acento o chevron a la derecha. Hover: `border-color:#F2A78E` y `translateY(-2px)`. |
| `kids-search.tsx` | Buscador "Buscar niño…" con lupa, fondo surface, borde line. |
| `kids-page-header.tsx` | Cabecera "GESTIÓN / Niños" + botón "Agregar niño" (gradiente coral). |
| `profile-avatar.tsx` | Avatar grande con inicial (usado en perfil y tarjetas). |
| `sidebar.tsx` (modificación) | El ítem nav "Niños" se marca activo según `usePathname()` empiece con `/kids`. |

---

## 4. Datos

Archivo: `app/_data/kids.ts`

Lista mock de 8 niños con: `id`, `slug`, `nombre`, `edad`, `sala`, `inicial`, `colorAvatar`, `padresVinculados`, `notaAlergia` (opcional), `badge` (opcional: texto + colores).

Niños de referencia:
- Mateo Fernández — 3 años — 2 padres — badge MANÍ
- Sofía Méndez — 2 años — 1 padre — chevron
- Benjamín Ruiz — 3 años — 2 padres — chevron
- Valentina Soto — 2 años — sin padres — badge VINCULAR
- Tomás Díaz — 3 años — 1 padre — badge LACTOSA
- Emma Castro — 2 años — 1 padre — chevron
- Lucas Romero — 3 años — 1 padre — chevron
- Olivia Vega — 2 años — 1 padre — chevron

Perfil de Mateo Fernández incluye: fecha de nacimiento, sala, ingreso, alergias y notas, padres vinculados (Lucía activa, Diego pendiente), botón "Vincular otro padre".

---

## 5. Diseño y tokens

- Colores ya definidos en `app/globals.css`: `cream`, `surface`, `line`, `line-soft`, `ink`, `muted`, `muted-2`, `coral`, `coral-deep`, `coral-soft`.
- Colores de acento por niño (avatares y badges) no están en `@theme`: usar `style={{...}}` en línea fiel al HTML de referencia o extender `globals.css` (decisión del implementador).
- Tipografía: Nunito (cuerpo) y Fredoka (títulos), ya cargadas en `layout.tsx`.
- Enlaces internos: `href="/kids"` y `href="/kids/[slug]"`. Enlaces placeholder externos: `href="#"`.

---

## 6. Criterios de aceptación

- [x] `npm run lint` — sin errores nuevos, consola limpia.
- [x] `npx tsc --noEmit` — tipos limpios, sin errores de `PageProps`/`LayoutProps` (regenerar `.next/types` si es necesario con `npx next typegen`).
- [x] `npm run build` — build de producción exitoso.
- [x] Convención: identificadores en inglés, copy en español, `href="#"` en enlaces placeholder.
- [x] Visual: Playwright MCP screenshot 924×540 comparado contra `references/screenshots/`.
- [x] Rutas: `/kids` renderiza el listado; `/kids/[slug]` renderiza el perfil con los datos del niño.
- [x] Sidebar: ítem "Niños" activo (`bg-coral-soft text-coral-deep font-extrabold`) cuando se está en `/kids` o `/kids/[slug]`.
- [x] Navegación: clic en una tarjeta lleva a `/kids/[slug]`; "Volver a Niños" lleva a `/kids`.

---

## 7. Notas de implementación

- La pantalla de referencia `ninos.dc.html` usa `max-width:880px`; `perfil-nino.dc.html` usa `max-width:820px`.
- Las tarjetas de niño usan `grid-template-columns:repeat(2,1fr)` con `gap:14px`.
- El perfil tiene layout de dos columnas: lado izquierdo (datos principales, 1:1) y lado derecho (300px fijo con "Resumen del día" y "Padres vinculados").
- No usar librerías externas adicionales; solo Next.js + React + Tailwind v4 ya instalados.
