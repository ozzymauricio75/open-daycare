# SPEC 01 — Home feed fiel al prototipo

> **Estado:** Aprobado
> **Depende de:** Ninguna
> **Fecha:** 2026-11-01
> **Objetivo:** Replicar `references/pantallas/feed.dc.html` como home `/` con Tailwind v4, fuentes Fredoka/Nunito y datos mock tipados, sin autenticación ni base de datos.

## Por qué existe esta spec

Es la primera spec del proyecto y define las bases visuales que heredarán las demás pantallas: paleta como tokens, las dos tipografías del diseño, convención de componentes en `app/_components/` y la forma de modelar datos mock hasta que exista persistencia. Si esto queda mal, cada pantalla futura lo arrastra.

## Alcance

**In:**

- Ruta `/` (`app/page.tsx`) con sidebar de 248px, encabezado de sala, composer "Compartí un momento…", separador `PUBLICADO HOY` y las tres publicaciones del prototipo.
- Fredoka y Nunito vía `next/font/google` en `app/layout.tsx`, expuestas como variables CSS. Se retiran Geist y Geist_Mono.
- Tokens de color y tipografía del prototipo en `app/globals.css` (`@theme` + `@theme inline`).
- Iconos SVG inline copiados del prototipo (sin dependencias nuevas).
- Datos mock tipados en `app/_data/feed.ts`.
- Componentes `Sidebar` y `PostCard` en `app/_components/`.
- Enlaces del prototipo presentes con `href="#"` (inertes).
- Scrollbar custom estilo del prototipo (WebKit).
- Verificación visual con Playwright a 924×540 contra `references/screenshots/feed.png`.

**Fuera de alcance (para specs futuras):**

- Autenticación, sesión real y logout funcional.
- Base de datos, fetching o Server Actions.
- Las demás pantallas: `crear-publicacion`, `ninos`, `avisos`, `mi-cuenta`, `detalle-publicacion`, `foto`, `login`, `index`.
- Responsive móvil, sidebar colapsable o menú hamburguesa.
- Interacciones: dar like, comentar, editar, subir foto.
- Dark mode.
- Tests automatizados.

## Modelo de datos

Este feature sí introduce estructuras, pero viven en memoria: no se persisten ni se versionan.

```ts
// app/_data/feed.ts

type PostKind = "achievement" | "activity" | "announcement";

type Post = {
  id: string;              // "mateo-achievement-potty"
  kind: PostKind;
  authorName: string;      // "Mateo" | "Anuncio general"
  authorInitial: string;   // "M"
  time: string;            // "14:20"  (texto literal)
  publishedBy: string;     // "publicado por vos"
  audience: string;        // "Para: familia de Mateo"
  body: string;
  photo?: { label: string }; // "Foto · pintando con témperas"
  likes: number;
  comments: number;
};

// Identificador interno en inglés; etiqueta visible en español.
const POST_KIND_LABELS: Record<PostKind, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
};

const currentUser = { name: "Caro Giménez", initial: "C", role: "Maestra · Soles" };
const room = { name: "Sala Soles", childrenCount: 12, dateLabel: "martes 17 jun" };
const feedPosts: Post[] = [/* 3 posts del prototipo */];
```

Convenciones:

- **Código en inglés, interfaz en español.** Tipos, variables, funciones, componentes, archivos e `id` van en inglés. Todo lo que el usuario lee (etiquetas de badge, saludo, cuerpo de las publicaciones, "Editar", "Nueva publicación") va en español y se toma literal del prototipo.
- El mapa `POST_KIND_LABELS` es el único lugar donde un `PostKind` se traduce a texto visible.
- El estilo de cada `PostKind` (fondo y color del badge, avatar del autor) vive en un mapa con **clases Tailwind literales**, nunca concatenadas en runtime.
- Todo el copy es literal del prototipo, incluida la fecha `martes 17 jun`. No se calcula nada.
- El orden del array es el orden de render.

Paleta a tokenizar (valores exactos, sin redondear):

| Token | Valor | Uso |
| --- | --- | --- |
| `cream` | `#F6ECDF` | fondo de app |
| `surface` | `#FFFDF9` | sidebar y tarjetas |
| `line` | `#ECE0D0` | bordes |
| `line-soft` | `#F0E6D8` | divisor interno de tarjeta |
| `ink` | `#3F362E` | texto principal |
| `ink-body` | `#4A4038` | cuerpo de publicación |
| `muted` | `#94887B` | texto secundario |
| `muted-2` | `#A89A8B` | metadatos |
| `coral` | `#E0654A` | likes, acentos |
| `coral-deep` | `#D9583C` | eyebrow, nav activa |
| `coral-soft` | `#FBE3D8` | fondo nav activa |
| `achievement` / `activity` / `announcement` | `#3E9B6C` / `#2E89A6` / `#4E72C8` | texto y punto del badge |

## Plan de implementación

1. **Fuentes y metadata.** En `app/layout.tsx` reemplazar Geist por `Fredoka` (`--font-fredoka`) y `Nunito` (`--font-nunito`), poner `lang="es"` y metadata `OpenDayCare · Sala Soles`. Prueba: `npm run dev` y el starter ya se ve con Nunito.
2. **Tokens.** En `app/globals.css`: eliminar el bloque `prefers-color-scheme: dark` y el `font-family: Arial`; declarar colores en `@theme`, fuentes en `@theme inline` (`--font-sans: var(--font-nunito)`, `--font-display: var(--font-fredoka)`) y el scrollbar custom. Prueba: fondo crema en `/`.
3. **Iconos.** Crear `app/_components/icons.tsx` con los 13 SVG del prototipo como componentes tipados que aceptan `className` y tamaño por defecto. Prueba: `npx tsc --noEmit` limpio.
4. **Datos.** Crear `app/_data/feed.ts` con tipos, `POST_KIND_LABELS`, `currentUser`, `room` y los tres posts. Prueba: el módulo compila y el contenido coincide palabra por palabra con el prototipo.
5. **Sidebar.** Crear `app/_components/sidebar.tsx`: logo con gradiente, botón "Nueva publicación", nav con Feed activo, footer de usuario. Prueba: se ve igual al aside del prototipo.
6. **Tarjeta.** Crear `app/_components/post-card.tsx`: cabecera con avatar/badge, audiencia, cuerpo, placeholder punteado opcional y pie con likes, comentarios y "Editar". Prueba: montarla provisionalmente en `/` con un post.
7. **Home.** Reescribir `app/page.tsx`: root `flex min-h-screen min-w-[900px] bg-cream`, sidebar sticky `h-screen` y `main` con `h-screen overflow-y-auto`; dentro, encabezado, composer, separador y mapeo de posts. Prueba: `/` es la pantalla completa y única con scroll interno.
8. **Ajuste final.** Ajustar `body` en el layout (sin `flex flex-col`, con `bg-cream` y `text-ink`) y quitar `app/page.tsx` de cualquier resto del starter. Prueba: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
9. **Verificación visual.** Con `npm run dev`, capturar con Playwright a 924×540 en `.playwright-mcp/` y comparar contra `references/screenshots/feed.png`. Prueba: diferencias solo de renderizado de fuentes, ningún corrimiento de layout.

## Criterios de aceptación

- [ ] `/` muestra sidebar fija de 248px a la izquierda y contenido a la derecha; el `body` no scrollea, solo el panel de contenido.
- [ ] El fondo general es `#F6ECDF`, las superficies `#FFFDF9` y los bordes `#ECE0D0`, verificable en los estilos computados.
- [ ] Marca, `h1` y nombres de autor usan Fredoka; el resto usa Nunito; Geist no aparece en ningún elemento.
- [ ] Se ven las tres publicaciones con badge `LOGRO`, `ACTIVIDAD` y `ANUNCIO`, sus colores exactos y contadores `3/1`, `5/2`, `8/0`.
- [ ] Ningún identificador de código (tipos, variables, funciones, componentes, archivos, `id`) está en español; todo el copy visible al usuario sí lo está.
- [ ] La publicación de actividad muestra el recuadro punteado con "Foto · pintando con témperas".
- [ ] Todos los enlaces del prototipo existen con `href="#"` y no navegan ni producen 404.
- [ ] A 924×540 el screenshot coincide visualmente con `references/screenshots/feed.png` en layout, tipografía, colores y espaciados.
- [ ] Por debajo de 900px aparece scroll horizontal en vez de un layout colapsado.
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores nuevos.
- [ ] La consola del navegador en `/` no muestra errores ni warnings.
- [ ] No se agregó ninguna dependencia a `package.json`.

## Decisiones tomadas y descartadas

- **Sí:** Tailwind v4 con tokens en `globals.css`. Es la única vía de estilos ya cableada en el repo y evita introducir un sistema paralelo.
- **Sí:** identificadores en inglés (`achievement`, `activity`, `announcement`, `PostKind`) con etiquetas visibles en español (`LOGRO`, `ACTIVIDAD`, `ANUNCIO`). Cumple la regla de código del repo y evita mezclar idiomas en el modelo.
- **No:** inline styles calcados. Fidelidad inmediata, pero duplican la paleta en decenas de lugares y no se reutilizan.
- **No:** CSS Modules. Convive mal con Tailwind v4 y fragmenta la convención.
- **Sí:** `next/font/google` en el layout raíz. Autohospeda, sin FOUT, y deja la tipografía lista para todas las pantallas.
- **No:** `<link>` a Google Fonts como en el prototipo. Depende de red y deja Geist de base.
- **No:** dark mode. El bloque `prefers-color-scheme` del starter se elimina porque el diseño es deliberadamente claro.
- **Sí:** `app/_components/` + `app/_data/feed.ts`. La sidebar y la tarjeta se reutilizan en las próximas pantallas.
- **No:** layout de grupo `app/(app)/` por ahora. Solo hay una ruta; se introduce cuando exista la segunda.
- **Sí:** enlaces `href="#"`. Ninguna ruta fantasma que después haya que reescribir.
- **Sí:** `min-w-[900px]` conservando el comportamiento fluido del prototipo por encima de ese ancho. A 924px se mantiene idéntico al PNG de referencia.
- **Sí:** fecha y saludo estáticos. No hay sesión ni reglas de saludo que justifiquen calcularlos.
- **Sí:** SVG inline copiados. Evita una dependencia nueva por 13 iconos.
- **No:** imágenes reales. El placeholder punteado se replica tal cual.
- **No:** interactividad. Esta spec es solo presentación.
- **Sí:** Playwright a 924×540 como criterio de cierre visual.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Tailwind no genera clases armadas en runtime | El estilo por `PostKind` se define en un mapa con strings literales completos. |
| Tamaños no estándar (11.5px, 12.5px, 15.5px) redondeados de más | Usar valores arbitrarios en px y copiar el `line-height`/`letter-spacing` del prototipo. |
| El scrollbar custom solo aplica en WebKit | Aceptado: el screenshot se toma en Chromium. Firefox usará el nativo. |
| `next/font/google` requiere red en build | El proyecto ya lo usa; si el entorno no tiene red, se documenta y se verifica solo en dev. |

## Lo que **no** entra en esta spec

- Autenticación, sesión real o logout funcional.
- Base de datos, fetching o Server Actions.
- Las demás pantallas del prototipo.
- Responsive móvil y sidebar colapsable.
- Interacciones de like, comentario, edición o subida de foto.
- Dark mode.
- Tests automatizados.

Cada uno de esos puntos, si llega, va en su propia spec.
