# SPEC 03 — Modal: Agregar niño

> **Estado:** Aprobado
> **Depende de:** SPEC 01 (Pantallas: Niños y Perfil del niño)
> **Fecha:** 2026-11-08
> **Objetivo:** Implementar el modal "Agregar niño" fiel a `references/pantallas/agregar-nino.dc.html`, que se abre al hacer clic en el botón "Agregar niño" de la vista `/kids`, con los campos obligatorios nombre completo, fecha de nacimiento y sala (tres salas de ejemplo: Soles, Luna y Mar), máscara de fecha DD/MM/AAAA, validación al guardar y una animación de entrada bonita y elegante.

## Por qué existe esta spec

Es la cuarta entrega visual del proyecto (tras home feed, niños/perfil y login/activar cuenta). Como las anteriores, no implementa lógica de negocio ni persistencia: es una interfaz estática fiel al prototipo `.dc.html`, lista para conectar a una sesión real en una spec futura. El botón "Agregar niño" ya existe en `app/_components/kids-page-header.tsx` como un `Link` inerte (`href="#"`); esta spec lo conecta al nuevo modal.

## Alcance

**In:**

- Ruta `/kids` (`app/kids/page.tsx`): maneja el estado `open` del modal y lo renderiza sobre la página de niños.
- Botón "Agregar niño" del header de `/kids`: deja de ser un `Link` inerte y pasa a abrir el modal.
- Componente `KidsAddModal` en `app/_components/kids-add-modal.tsx`: formulario con los campos del prototipo (nombre completo, fecha de nacimiento, sala, alergias, notas médicas), botones "Cancelar" y "Guardar", cierre con clic en el fondo y tecla Esc, y animación de entrada (fade + escala + desplazamiento suave).
- Tres salas de ejemplo para el select de sala: **Soles**, **Luna**, **Mar**.
- Campos obligatorios: nombre completo, fecha de nacimiento, sala. Todos con placeholder (fecha: `dd/mm/aaaa`); la fecha lleva máscara de entrada y se valida como fecha real válida al pulsar Guardar.
- Copy visible al usuario en español, literal del prototipo. Identificadores de código en inglés.
- Tokens de `app/globals.css` y fuentes Fredoka/Nunito ya cargadas (sin modificaciones).
- Animación solo con CSS (keyframes/transiciones); no se agrega `framer-motion` ni dependencias nuevas.
- Verificación visual con Playwright a 924×540 en `.playwright-mcp/` (revisión manual contra el `.dc.html`).

**Fuera de alcance (para specs futuras):** persistencia, base de datos, Server Actions, autenticación, guardar realmente al niño, navegación tras guardar, validación interactiva campo por campo, responsive móvil, dark mode, tests automatizados.

## Rutas y páginas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/kids` | `app/kids/page.tsx` | Listado de niños; renderiza `KidsAddModal` cuando `open` es true |

## Componentes

| Componente | Descripción |
|------------|-------------|
| `kids-add-modal.tsx` | Modal con overlay, backdrop, panel blanco `max-width:520px` `border-radius:24px`, cabecera (Cancelar / "Agregar niño" / Guardar), formulario de 5 campos, animación de entrada, cierre con Cancelar / fondo / Esc. |
| `kids-page-header.tsx` (modificación) | El botón "Agregar niño" deja de ser `Link` inerte y abre el modal. |

## Datos mock (`app/_data/kids.ts`, se extiende)

```ts
export type Room = { key: string; label: string };
export const ROOMS: Room[] = [
  { key: "soles", label: "Soles" },
  { key: "luna", label: "Luna" },
  { key: "mar", label: "Mar" },
];
```

## Plan de implementación

1. Extender `app/_data/kids.ts` con `Room` y `ROOMS` (Soles, Luna, Mar).
2. Crear `app/_components/kids-add-modal.tsx` (5 campos, máscara de fecha, validación de obligatorios al Guardar, cierre Cancelar/fondo/Esc, animación CSS keyframes).
3. En `app/kids/page.tsx`: estado `open`, render del modal y conexión del botón "Agregar niño".
4. Validación de fecha real DD/MM/AAAA al pulsar Guardar (rechazar inválidas).
5. Verificar cierre con Cancelar, clic en fondo y Esc.
6. Ajuste final: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
7. Verificación visual Playwright 924×540 contra el `.dc.html`.

## Criterios de aceptación

- [x] Clic en "Agregar niño" de `/kids` abre el modal (sin navegar).
- [x] Cinco campos con placeholders del prototipo; select de sala con Soles, Luna, Mar.
- [x] Obligatorios: nombre completo, fecha de nacimiento, sala.
- [x] Fecha con máscara `dd/mm/aaaa`; solo fecha real válida en DD/MM/AAAA.
- [x] Guardar con vacíos: marca errores e impide cierre.
- [x] Guardar completo: cierra el modal, no navega, no persiste.
- [x] Cierre con Cancelar, clic en fondo y Esc.
- [x] Animación de entrada (fade + escala/desplazamiento) al abrirse.
- [x] Copy en español literal del prototipo; identificadores en inglés.
- [x] `npm run lint`, `npx tsc --noEmit`, `npm run build` sin errores.
- [x] Sin dependencias nuevas en `package.json`.
- [x] Screenshot Playwright 924×540 en `.playwright-mcp/` coincide con el `.dc.html`.

## Decisiones tomadas y descartadas

- **Sí:** salas Soles, Luna, Mar; Guardar no persiste (mock puro); cierre Cancelar/fondo/Esc; máscara `dd/mm/aaaa` + validación al guardar; componente en `app/_components/` con estado en la página; animación solo CSS; botón deja de ser `Link` inerte.
- **No:** `input type="date"` (rompe formato DD/MM/AAAA); validación interactiva campo por campo; persistencia/navegación tras guardar; responsive/dark mode; dependencias nuevas.

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Máscara de fecha en input controlado | Máscara ligera sin librería; validación estricta al pulsar Guardar. |
| Fecha con formato válido pero inexistente (31/02/2026) | Construir `Date` y comparar componentes día/mes/año. |
| Sin PNG de referencia | Verificación manual contra el `.dc.html`; capturas en `.playwright-mcp/`. |

## Lo que no entra en esta spec

Persistencia, guardar al niño realmente, navegación tras guardar, pantalla de éxito, validación interactiva, responsive, dark mode, tests. Cada uno va en su propia spec si llega.
