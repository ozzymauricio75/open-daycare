# SPEC 02 — Pantallas de login y activar cuenta

> **Estado:** Aprobado
> **Depende de:** Ninguna
> **Fecha:** 2026-11-07
> **Objetivo:** Replicar `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` como rutas estáticas de Next.js/App Router, sin el selector Ingreso como (Personal/Familia) en el login, con copy en español, identificadores en inglés y datos mock sin autenticación real.

## Por qué existe esta spec

Es la tercera pantalla del proyecto (tras home feed y niños/perfil) y abre el bloque de autenticación de entrada. Como las specs anteriores, no implementa lógica de negocio ni persistencia: son interfaces estáticas fieles a los prototipos `.dc.html`, listas para conectar a una sesión real en una spec futura.

## Alcance

**In:**

- Ruta `/login` (`app/login/page.tsx`): título "Iniciar sesión", campos EMAIL y CONTRASEÑA, "¿Olvidaste tu contraseña?", botón "Iniciar sesión" y enlace a "Activá tu cuenta". **Sin** el bloque `INGRESO COMO` (Personal/Familia).
- Ruta `/activar-cuenta` (`app/activar-cuenta/page.tsx`): "Bienvenida a OpenDayCare", tarjeta "Te invitaron a seguir a Mateo · Sala Soles", CÓDIGO DE INVITACIÓN, EMAIL, CREAR CONTRASEÑA, consentimiento de fotos, botón "Activar mi cuenta" y enlace "¿Ya tenés cuenta? Iniciar sesión".
- Copy visible al usuario en español, literal de los prototipos `.dc.html`.
- Identificadores de código (tipos, variables, funciones, componentes, archivos, `id`, rutas) en inglés.
- Tipografía Fredoka y Nunito ya cargadas en `app/layout.tsx` (no se modifican fuentes).
- Tokens de color y tipografía ya definidos en `app/globals.css` (`cream`, `surface`, `line`, `ink`, `muted`, `muted-2`, `coral`, `coral-deep`, `coral-soft`).
- Enlaces internos entre las dos pantallas; enlaces sin destino real con `href="#"` (convención del repo).
- Datos mock estáticos: email por defecto `lucia.fernandez@gmail.com`, código `7K4P9`, niño "Mateo · Sala Soles".
- Verificación visual por Playwright a 924×540 en `.playwright-mcp/` (revisión manual contra los `.dc.html`; no existen capturas de referencia PNG para estas dos pantallas).

**Fuera de alcance (para specs futuras):**

- Autenticación, sesión real, logout, Server Actions, base de datos, fetching.
- Rutas de destino del login (`feed`, `familia-feed`) — no existen aún; el botón usa `href="#"`.
- Validación interactiva, estados de carga/error, "recordarme", restablecimiento de contraseña real.
- Responsive móvil, sidebar colapsable, menú hamburguesa.
- Grupo de rutas `(auth)` — las pantallas viven directamente bajo `app/`.
- Dark mode.
- Tests automatizados.

## Rutas y páginas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/login` | `app/login/page.tsx` | Inicio de sesión sin selector Personal/Familia |
| `/activar-cuenta` | `app/activar-cuenta/page.tsx` | Activación de cuenta por invitación |

## Componentes

Todos en `app/_components/` si se extrae lógica compartida. Por ahora cada página es autocontenida; si se repiten patrones (input con label, botón gradiente coral, campo con borde `line`), se crean componentes compartidos en este paso.

| Componente (opcional) | Descripción |
|-----------------------|-------------|
| `auth-input.tsx` | Campo con label mayúscula `12px font-bold tracking-wide muted`, borde `line`, fondo `surface`, placeholder `B6A99B`. |
| `auth-button.tsx` | Botón block gradiente coral `F4977E` → `EE8164`, sombra, texto blanco `font-extrabold`. |
| `auth-card.tsx` | Contenedor centrado `max-width` con fondo `cream`, padding `40px`. |

## Datos mock

Archivo: `app/_data/auth.ts` (opcional, si se extrae; si no, vive dentro de cada página).

```ts
// app/_data/auth.ts

export const LOGIN_DEFAULT_EMAIL = "lucia.fernandez@gmail.com";
export const ACTIVATION_CHILD = { name: "Mateo", room: "Sala Soles", initial: "M", avatarBg: "#A9D9E8", avatarFg: "#1F7A93" };
export const ACTIVATION_CODE = "7K4P9";
export const ACTIVATION_EMAIL = "lucia.fernandez@gmail.com";
```

Convenciones:

- **Código en inglés, interfaz en español.** Todo lo que lee el usuario va literal del prototipo.
- El email por defecto del login es `lucia.fernandez@gmail.com` (flujo familia, coherente con `activar-cuenta.dc.html`).
- `7K4P9` y `lucia.fernandez@gmail.com` van precargados como valor estático de los inputs, tal como aparecen en el prototipo.

## Plan de implementación

1. **Datos mock.** Crear `app/_data/auth.ts` con `LOGIN_DEFAULT_EMAIL`, `ACTIVATION_CHILD`, `ACTIVATION_CODE`, `ACTIVATION_EMAIL`. Prueba: compila y los valores coinciden con los prototipos.
2. **Componentes compartidos (opcional).** Si hay repetición entre ambas páginas, crear `auth-input.tsx`, `auth-button.tsx` y/o `auth-card.tsx` en `app/_components/`. Prueba: `npx tsc --noEmit` limpio.
3. **Página `/login`.** Crear `app/login/page.tsx` con título, email, contraseña, "¿Olvidaste tu contraseña?", botón "Iniciar sesión" (`href="#"`) y enlace a `/activar-cuenta`. Sin el bloque `INGRESO COMO`. Prueba: renderiza en `npm run dev`.
4. **Página `/activar-cuenta`.** Crear `app/activar-cuenta/page.tsx` con saludo, tarjeta del niño, código, email, contraseña, consentimiento, botón "Activar mi cuenta" y enlace a `/login`. Prueba: renderiza en `npm run dev`.
5. **Navegación cruzada.** Verificar que el enlace "Activá tu cuenta" del login apunta a `/activar-cuenta` y el "Iniciar sesión" de activar-cuenta apunta a `/login`. Prueba: clic navega entre ambas.
6. **Ajuste final y limpieza.** Revisar que no quede Geist, que se usen los tokens de `globals.css`, que el copy sea literal del prototipo y que no haya rutas fantasma. Prueba: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
7. **Verificación visual.** Con `npm run dev`, capturar con Playwright a 924×540 en `.playwright-mcp/` y comparar visualmente contra los `.dc.html` (no hay PNG de referencia). Prueba: layout, tipografía, colores y espaciados coinciden con los prototipos.

## Criterios de aceptación

- [x] `/login` muestra "Iniciar sesión", campos EMAIL y CONTRASEÑA, "¿Olvidaste tu contraseña?", botón "Iniciar sesión" y enlace a "Activá tu cuenta"; **no** muestra el selector Personal/Familia.
- [x] `/activar-cuenta` muestra "Bienvenida a OpenDayCare", tarjeta "Mateo · Sala Soles", código `7K4P9`, email `lucia.fernandez@gmail.com`, consentimiento de fotos, botón "Activar mi cuenta" y enlace "Iniciar sesión".
- [x] El email por defecto del login es `lucia.fernandez@gmail.com`.
- [x] Ningún identificador de código está en español; todo el copy visible al usuario sí lo está.
- [x] Los enlaces entre pantallas funcionan; el destino del botón "Iniciar sesión" es `href="#"`.
- [x] `npm run lint` — sin errores nuevos, consola limpia.
- [x] `npx tsc --noEmit` — tipos limpios (regenerar `.next/types` con `npx next typegen` si es necesario).
- [x] `npm run build` — build de producción exitoso.
- [x] Visual: capturas de Playwright a 924×540 en `.playwright-mcp/` coinciden con los `.dc.html` (revisión manual, sin PNG de referencia).
- [x] No se agregó ninguna dependencia a `package.json`.
- [x] La consola del navegador en ambas rutas no muestra errores ni warnings.

## Decisiones tomadas y descartadas

- **Sí:** rutas plano bajo `app/` (`/login`, `/activar-cuenta`), sin grupo `(auth)`. Consistencia con las specs existentes.
- **Sí:** quitar el selector `INGRESO COMO` (Personal/Familia) del login, según indicó el usuario. Queda un solo flujo (familia) con email por defecto `lucia.fernandez@gmail.com`.
- **Sí:** `href="#"` para el destino del login. No existen rutas de feed/familia-feed todavía; evitar rutas fantasma.
- **Sí:** activar-cuenta como mockup estático (niño, código, email, consentimiento sin lógica real). Sin autenticación ni persistencia.
- **Sí:** `app/_data/auth.ts` para los valores mock, siguiente el patrón de `app/_data/feed.ts` y `app/_data/kids.ts`.
- **No:** validación interactiva ni estados de error. Esta spec es solo presentación.
- **No:** imágenes reales ni dependencias nuevas. SVG inline si hace falta, copiados de los prototipos.
- **No:** dark mode ni responsive móvil. Los prototipos son escritorio fijo y claro.

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| No hay PNG de referencia para login/activar-cuenta | La verificación visual es manual contra los `.dc.html`; las capturas de Playwright se guardan en `.playwright-mcp/` para comparación futura. |
| Tamaños no estándar de fuente (13.5px, 14.5px, 15.5px) | Usar valores arbitrarios en px y copiar `line-height`/`letter-spacing` del prototipo, como se hizo en la spec 01. |
| `next/font/google` requiere red en build | El proyecto ya lo usa en `layout.tsx`; se verifica en dev y build. |

## Lo que no entra en esta spec

- Autenticación, sesión real o logout funcional.
- Base de datos, fetching o Server Actions.
- Las rutas de destino del login y de activar cuenta.
- Responsive móvil y dark mode.
- Tests automatizados.

Cada uno de esos puntos, si llega, va en su propia spec.