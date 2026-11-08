# SPEC 04 — Pantalla Vincular padre

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-11-08
> **Objetivo:** Implementar el modal "Vincular padre" como destino del botón "Vincular otro padre" del perfil del niño, fiel a `references/pantallas/vincular-padre.dc.html`, con copy en español, identificadores en inglés y datos mock sin autenticación ni persistencia reales.

---

## 1. Por qué existe esta spec

El perfil del niño ya tiene el botón "Vincular otro padre" con `href="#"` (SPEC 01). Esta spec le da un destino real: abrir un **modal** "Vincular padre" para capturar nombre, email y parentesco del nuevo padre/tutor, mostrar el código de invitación y enviar la invitación (sin lógica real). Es la cuarta pantalla del proyecto, tras home feed, niños/perfil y login/activar-cuenta.

---

## 2. Alcance

**In:**

- Componente `vincular-padre-modal.tsx` en `app/_components/`: modal centrado con cabecera "Vincular padre" + "a <Nombre del niño>", aviso de correo con código, input "NOMBRE DEL PADRE/MADRE" (obligatorio) y input "EMAIL" (`type="email"`, placeholder `correo@ejemplo.com`, obligatorio) con estructura válida de correo a nivel de navegador, botones de parentesco Mamá/Papá/Tutor/a (Mamá seleccionado por defecto), caja "CÓDIGO DE INVITACIÓN" con código `7K4P9` y "Vence en 7 días", botón "Enviar invitación" (`href="#"`) y botón de cerrar (X). Los campos nombre y email son obligatorios: el botón de envío los valida y muestra error si están vacíos.
- Modificar `app/kids/[slug]/page.tsx`: el enlace "Vincular otro padre" abre el modal en lugar de `href="#"` (se agrega estado de visibilidad del modal y se renderiza el componente dentro de la página).
- Copy visible al usuario en español, literal del prototipo `.dc.html` (títulos, labels, placeholders, códigos, mensajes).
- Identificadores de código (archivos, tipos, variables, clases) en inglés.
- Tipografía Fredoka y Nunito ya cargadas en `app/layout.tsx` (no se modifican fuentes).
- Tokens de color ya definidos en `app/globals.css` (`cream`, `surface`, `line`, `ink`, `muted`, `muted-2`); colores del prototipo aplicados en línea cuando no existan como token (estilo SPEC 01).
- Datos mock: el niño se lee de `app/_data/kids.ts` por `slug`; código de invitación `7K4P9` (valor estático igual al prototipo, o reusando `app/_data/auth.ts`).
- Enlaces internos: `href="#"` para el botón "Enviar invitación" (sin destino real aún).
- Verificación visual por Playwright a 924×540 en `.playwright-mcp/` (revisión manual contra el `.dc.html`; no existe captura PNG de referencia).

**Fuera de alcance (para specs futuras):**

- Autenticación, sesión real, envío de correos, Server Actions, base de datos, fetching.
- Guardar el padre vinculado en la lista de padres del niño (eso cambia `app/_data/kids.ts` y va en otra spec).
- Validación interactiva avanzada (más allá de requerido en nombre y email), estados de carga/error de envío, "recordarme".
- Responsive móvil, sidebar colapsable, menú hamburguesa, dark mode.
- Tests automatizados.

---

## 3. Datos

Esta spec no introduce nuevas estructuras de datos. Reusa lo existente:

- `app/_data/kids.ts`: lista `kids[]` y tipo `Kid` (para obtener `nombre` del niño por `slug` y mostrarlo en la cabecera "a Mateo Fernández").
- `app/_data/auth.ts`: `ACTIVATION_CODE = "7K4P9"` (opcional; el código también puede escribirse estático en la página, igual al prototipo).

---

## 4. Plan de implementación

1. **Crear `app/_components/vincular-padre-modal.tsx`.** Componente de modal centrado fiel al `.dc.html`: recibe el `nombre` del niño por props, cabecera "Vincular padre" + "a <Nombre>", aviso de correo, formulario (nombre, email `type="email"` con placeholder `correo@ejemplo.com`), botones de parentesco Mamá/Papá/Tutor/a con "Mamá" preseleccionado, caja de código `7K4P9`, botón "Enviar invitación" con `href="#"` y botón de cerrar (X). Prueba: `npm run dev`, renderiza en `/kids/mateo-fernandez` al abrir el modal.
2. **Modificar `app/kids/[slug]/page.tsx`.** Agregar estado `isOpen`, cambiar el enlace "Vincular otro padre" para que abra el modal (en lugar de `href="#"`), y renderizar `<VincularPadreModal kidNombre={kid.nombre} isOpen={isOpen} onClose={...} />` dentro de la página. Prueba: clic abre el modal; clic en X lo cierra.
3. **Tipos y lint.** `npx tsc --noEmit` y `npm run lint` limpios (regenerar `.next/types` con `npx next typegen` si es necesario).
4. **Build.** `npm run build` exitoso.
5. **Verificación visual.** Con `npm run dev`, capturar con Playwright a 924×540 en `.playwright-mcp/` y comparar visualmente contra `references/pantallas/vincular-padre.dc.html` (layout, tipografía, colores, espaciados, estado seleccionado de Mamá).

---

## 5. Criterios de aceptación

- [x] Al hacer clic en "Vincular otro padre" en `/kids/[slug]` se abre el modal "Vincular padre".
- [x] El modal muestra "Vincular padre", "a <Nombre del niño>", aviso de correo con código, input NOMBRE DEL PADRE/MADRE y input EMAIL (`type="email"`, placeholder `correo@ejemplo.com`) con placeholders del prototipo.
- [x] El modal tiene botón de cerrar (X) que lo cierra.
- [x] Los campos NOMBRE DEL PADRE/MADRE y EMAIL son obligatorios: si están vacíos al hacer clic en "Enviar invitación", se muestra error y no se navega.
- [x] Botones de parentesco Mamá/Papá/Tutor/a; "Mamá" seleccionado por defecto (fondo #CCD8F4, texto #4E72C8).
- [x] Caja CÓDIGO DE INVITACIÓN con código `7K4P9` y "Vence en 7 días".
- [x] Botón "Enviar invitación" con `href="#"` (sin acción real).
- [x] Identificadores en inglés; copy visible en español, literal del prototipo.
- [x] `npm run lint` — sin errores nuevos, consola limpia.
- [x] `npx tsc --noEmit` — tipos limpios, sin errores de `PageProps` (regenerar `.next/types` si es necesario).
- [x] `npm run build` — build de producción exitoso.
- [ ] Visual: captura Playwright 924×540 en `.playwright-mcp/` coincide con `references/pantallas/vincular-padre.dc.html` (revisión manual, sin PNG de referencia).
- [ ] Consola del navegador sin errores ni warnings en la página.

---

## 6. Decisiones tomadas y descartadas

- **Sí:** modal como componente `vincular-padre-modal.tsx` en `app/_components/`, renderizado dentro de `app/kids/[slug]/page.tsx`. No hay nueva ruta de página; el modal se abre sobre el perfil del niño, manteniendo el diseño centrado del `.dc.html`.
- **Sí:** `href="#"` en "Enviar invitación". No hay lógica de envío real; es una pantalla de presentación.
- **Sí:** "Mamá" preseleccionado por defecto. Coincide con el prototipo, donde Mamá aparece activo (fondo azul).
- **Sí:** nombre y email son campos obligatorios. El botón "Enviar invitación" los valida y muestra error si están vacíos; no hay envío real (href="#").
- **Sí:** reusar datos existentes (`kids.ts` por `slug`, código `7K4P9`). No hay archivo de datos nuevo.
- **No:** validación interactiva avanzada más allá de requerido en nombre y email, estados de error de envío. Esta spec es solo presentación.
- **No:** sidebar, responsive móvil, dark mode. El prototipo es escritorio fijo y claro.

---

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| Tamaños de fuente no estándar (13.5px, 15.5px, 34px, letter-spacing) | Valores arbitrarios en px y `line-height`/`letter-spacing` del prototipo, como en specs 01 y 02. |
| No hay PNG de referencia para esta pantalla | Verificación visual manual contra el `.dc.html`; capturas en `.playwright-mcp/` para comparación futura. |

---

## Lo que **no** entra en esta spec

- Autenticación, envío de correos, Server Actions, base de datos.
- Guardar el padre vinculado en el perfil del niño (otra spec).
- Validación interactiva, estados de carga/error, responsive móvil, dark mode.
- Tests automatizados.

Cada uno de esos puntos, si llega, va en su propia spec.
