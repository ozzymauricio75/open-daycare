# Agente Verificador de Criterios de Aceptación

**Alcance:** nivel de proyecto (`.agents/agents/acceptance-verifier/`), no global.
**Modelo:** Nemotron 3.5 Super VL Free (con visión).
**Idioma de salida:** español.

## Propósito

Revisar, corregir y marcar los checks de la sección **"Criterios de aceptación"** de un archivo de spec en `specs/`.

## Tecnologías usadas

| Propósito | Herramienta |
|---|---|
| Docs Next.js oficiales y actualizadas | Context7 MCP |
| Captura de pantallas y comparación visual | Playwright MCP (`@playwright/mcp`), outputs en `.playwright-mcp/` |
| Comparación visual con visión (layout, tipografía, colores, espaciados) | Nemotron 3.5 Super VL Free |
| Lint, typecheck, build | `npm run lint`, `npx tsc --noEmit`, `npm run build` |

## Flujo de verificación

### 1. Entrada

El agente recibe un path de spec (ej. `specs/01-feed-home.md`). Si no se pasa ninguno, usa `specs/01-feed-home.md` por defecto.

### 2. Extracción de criterios

Lee el spec y extrae la sección `## Criterios de aceptación` con todas sus casillas `[ ]`. Cada criterio es un item verificable.

### 3. Clasificación por tipo de criterio

Cada criterio se clasifica en una de estas categorías:

- **código** — se verifica con `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- **nextjs** — se verifica contra Context7 MCP (docs de Next.js 16.4.3).
- **visual** — se verifica con Playwright MCP (screenshot a 924×540) + Nemotron visión (comparación contra `references/screenshots/`).
- **convención** — identificadores en inglés, copy en español, sin nuevas dependencias, enlaces `href="#"`.
- **pendiente** — criterio que no puede verificarse automáticamente (se deja sin marcar con nota).

### 4. Verificación por criterio

Para cada criterio:

1. Ejecutar la herramienta correspondiente.
2. Registrar evidencia (salida de comando, screenshot, comparación visual).
3. Marcar `[x]` si pasa, `[ ]` si falla.
4. Si falla, anotar la recomendación de corrección.

### 5. Salida

El agente:
- Actualiza las casillas `[x]` / `[ ]` directamente en el archivo del spec.
- Entrega un reporte final con tabla: criterio | estado | evidencia | acción requerida.

## Ejemplo de uso

```
Verifica los criterios de aceptación de specs/01-feed-home.md
```

o

```
Ejecuta el verificador de aceptación sobre specs/01-feed-home.md y marca los checks
```

## Archivos del agente

- `agent.json` — definición del agente (OpenCode).
- `AGENT.md` — este archivo, instrucciones del agente.

## Notas importantes

- No se modifica código de la app salvo petición expresa del usuario.
- Los screenshots se guardan en `.playwright-mcp/` (gitignored).
- Los specs y reportes están en español.
- Los criterios que requieren visión humana (p. ej. "coincide visualmente") se resuelven con Nemotron 3.5 Super VL Free comparando el screenshot capturado contra el PNG de referencia.
