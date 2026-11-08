# SPEC 05 — Modal: Crear publicación

> **Estado:** Aprobado
> **Depende de:** SPEC 01 (Home feed), SPEC 03 (Modal: Agregar niño)
> **Fecha:** 2026-11-08
> **Objetivo:** Implementar el modal "Nueva publicación" fiel a `references/pantallas/crear-publicacion.dc.html`, que se abre al hacer clic en el botón "Nueva publicación" del sidebar del feed `/`, con audiencia PARA (Mateo, Sofía, Benjamín + Toda la sala), tipos TIPO (7), campo DESCRIPCIÓN obligatorio, fotos con selección de archivo, vista previa y eliminación, validación al publicar siguiendo la convención de errores de Agregar niño, y cierre con Cancelar / fondo / Esc, sin persistencia ni navegación.

## Por qué existe esta spec

Es la quinta entrega visual del proyecto (tras home feed, niños/perfil, login/activar cuenta y modal Agregar niño). Como las anteriores, no implementa lógica de negocio ni persistencia: es una interfaz estática fiel al prototipo `.dc.html`, lista para conectar a una sesión real en una spec futura. El botón "Nueva publicación" ya existe en `app/_components/sidebar.tsx` como un `Link` inerte (`href="#"`); esta spec lo conecta al nuevo modal.

## Alcance

**In:**

- Ruta `/` (`app/page.tsx`): maneja el estado `open` del modal y lo renderiza sobre la página de feed; pasa `onNuevaPublicacion` al Sidebar.
- Botón "Nueva publicación" del sidebar (`app/_components/sidebar.tsx`): deja de ser un `Link` inerte y abre el modal (sin navegar).
- Componente `CrearPublicacionModal` en `app/_components/crear-publicacion-modal.tsx`: overlay + backdrop (clic fuera cierra), panel blanco `border-radius:24px`, cabecera (Cancelar / "Nueva publicación" / Publicar), secciones PARA, TIPO, DESCRIPCIÓN y FOTOS del prototipo, cierre con Cancelar / fondo / Esc y animación de entrada (fade + escala + desplazamiento suave).
- Audiencia PARA: botones de selección a partir de `kids` de `app/_data/kids.ts` (Mateo, Sofía, Benjamín con inicial y color de avatar del mock; además "Toda la sala").
- Tipos TIPO: 7 botones del prototipo (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio) con sus colores exactos; se extiende `PostKind`/`POST_KIND_LABELS` en `app/_data/feed.ts`.
- DESCRIPCIÓN: textarea obligatorio con placeholder del prototipo ("Contá cómo le fue hoy…"); se valida al pulsar Publicar.
- FOTOS: zona de foto vacía estática del prototipo + botón "Agregar" que abre un selector de archivos de imagen; las fotos seleccionadas se muestran como thumbnails con vista previa (Data URL) y botón para eliminar cada una; sin subida real al servidor.
- Errores: al pulsar Publicar con DESCRIPCIÓN vacía → borde `coral-deep` en el textarea + mensaje "Este campo es obligatorio" debajo; el modal no se cierra hasta completar el campo.
- Copy visible al usuario en español, literal del prototipo. Identificadores de código en inglés.
- Tokens de `app/globals.css` y fuentes Fredoka/Nunito ya cargadas (sin modificaciones).
- Animación solo con CSS (keyframes/transiciones); no se agrega `framer-motion` ni dependencias nuevas.
- Verificación visual con Playwright a 924×540 en `.playwright-mcp/` (revisión manual contra el `.dc.html`).

**Fuera de alcance (para specs futuras):** persistencia, base de datos, Server Actions, autenticación, publicar realmente, navegación tras publicar, subida de fotos real, pantalla de detalle, validación interactiva campo por campo, responsive móvil, dark mode, tests automatizados, ruta independiente `/crear-publicacion`.

## Rutas y páginas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Feed; estado `open` del modal y render de `CrearPublicacionModal` |

## Componentes

| Componente | Descripción |
|------------|-------------|
| `crear-publicacion-modal.tsx` | Modal con overlay, backdrop, panel `border-radius:24px`, cabecera (Cancelar / "Nueva publicación" / Publicar), formulario PARA/TIPO/DESCRIPCIÓN/FOTOS, validación de descripción obligatoria al publicar, cierre Cancelar/fondo/Esc, animación CSS keyframes. |
| `sidebar.tsx` (modificación) | Recibe prop `onNuevaPublicacion`; el botón "Nueva publicación" deja de ser `Link` inerte y abre el modal. |

## Datos mock

Se extiende `app/_data/feed.ts` con los tipos nuevos del prototipo. Los niños de la audiencia PARA se toman de `app/_data/kids.ts` (array `kids`, ya existente).

```ts
// app/_data/feed.ts (extensión)

type PostKind = "achievement" | "activity" | "announcement" | "meal" | "nap" | "mood" | "photo";

const POST_KIND_LABELS: Record<PostKind, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
  meal: "COMIDA",
  nap: "SIESTA",
  mood: "ÁNIMO",
  photo: "FOTO",
};
```

Estilos de cada tipo (fondo y color) se definen en un mapa con clases Tailwind literales, como en SPEC 01.

## Plan de implementación

1. Extender `app/_data/feed.ts` con `PostKind` (meal, nap, mood, photo) y `POST_KIND_LABELS` (COMIDA, SIESTA, ÁNIMO, FOTO). Prueba: `npx tsc --noEmit` limpio.
2. Crear `app/_components/crear-publicacion-modal.tsx` (secciones PARA/TIPO/DESCRIPCIÓN/FOTOS del prototipo, validación de descripción obligatoria al publicar, cierre Cancelar/fondo/Esc, animación CSS keyframes). Prueba: renderiza montado provisionalmente en `/` y `npx tsc --noEmit` limpio.
3. En `app/page.tsx`: estado `open` del modal y render condicional de `CrearPublicacionModal`. Prueba: el feed sigue funcionando y el modal se declara en la página.
4. En `app/_components/sidebar.tsx`: agregar prop `onNuevaPublicacion`; el botón "Nueva publicación" deja de ser `Link` inerte (`href="#"`) y llama al handler que abre el modal. Prueba: clic en "Nueva publicación" abre el modal sin navegar.
5. Fotos: selector de archivo al pulsar "Agregar", vista previa de thumbnails con botón de eliminar, limpieza de URLs de objeto al desmontar. Prueba: se pueden seleccionar, ver y eliminar imágenes.
6. Publicar con DESCRIPTION vacía: marca error (borde `coral-deep` + mensaje debajo) e impide cierre. Publicar completo: cierra el modal, no navega, no persiste. Prueba: `npm run dev`.
6. Ajuste final: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
7. Verificación visual: con `npm run dev`, capturar con Playwright a 924×540 en `.playwright-mcp/` y comparar contra `references/pantallas/crear-publicacion.dc.html`.

## Criterios de aceptación

- [ ] Clic en "Nueva publicación" del sidebar abre el modal (sin navegar).
- [x] Modal fiel a `crear-publicacion.dc.html`: PARA (Mateo, Sofía, Benjamín, Toda la sala), TIPO (7 tipos con colores del prototipo), DESCRIPCIÓN, FOTOS.
- [ ] FOTOS: al pulsar "Agregar" se abre el selector de archivo; las imágenes seleccionadas se muestran como thumbnails con vista previa y se pueden eliminar individualmente.
- [ ] DESCRIPCIÓN obligatorio: publicar vacío marca error y impide el cierre.
- [ ] Publicar completo: cierra el modal, no navega, no persiste.
- [ ] Cierre con Cancelar, clic en fondo y Esc.
- [ ] Animación de entrada (fade + escala/desplazamiento) al abrirse.
- [x] Copy en español literal del prototipo; identificadores en inglés.
- [x] `npm run lint`, `npx tsc --noEmit`, `npm run build` sin errores nuevos.
- [ ] Screenshot Playwright 924×540 en `.playwright-mcp/` coincide visualmente con el `.dc.html`.
- [x] Sin dependencias nuevas en `package.json`.

## Decisiones tomadas y descartadas

- **Sí:** estado `open` en `app/page.tsx` y prop al Sidebar (consistencia con `KidsAddModal` en `/kids`).
- **Sí:** audiencia de `app/_data/kids.ts` (Mateo, Sofía, Benjamín con inicial y color de avatar del mock; "Toda la sala" como botón estático).
- **Sí:** extender `PostKind`/`POST_KIND_LABELS` en `feed.ts` con los 4 tipos nuevos (meal, nap, mood, photo) y sus etiquetas en español.
- **Sí:** Publicar = mock puro (cierra el modal, no persiste, no navega), igual que Agregar niño.
- **Sí:** errores solo al pulsar Publicar, borde `coral-deep` + mensaje debajo (convención de `kids-add-modal.tsx`).
- **Sí:** animación solo CSS; componente en `app/_components/` con estado en la página; botón deja de ser `Link` inerte.
- **No:** validación interactiva campo por campo; subida de fotos al servidor (las fotos se manejan en memoria como Data URL); persistencia o navegación tras publicar; responsive móvil; dark mode; dependencias nuevas; ruta independiente `/crear-publicacion`.

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Selección múltiple de audiencia (botones tipo toggle) sin librería | Estado simple de IDs seleccionados dentro del componente; "Toda la sala" limpia la selección individual. |
| 7 tipos con colores y fondos distintos | Mapa literal de clases Tailwind por tipo, como se hizo con `PostKind` en SPEC 01. |
| Sin PNG de referencia | Verificación manual contra el `.dc.html`; capturas en `.playwright-mcp/`. |

## Lo que **no** entra en esta spec

- Persistencia, publicar realmente, navegación tras publicar, pantalla de éxito o detalle.
- Subida de fotos al servidor (las fotos se manejan en memoria como Data URL; no se envían a ningún backend).
- Validación interactiva, responsive móvil, dark mode, tests automatizados.

Cada uno de esos puntos, si llega, va en su propia spec.
