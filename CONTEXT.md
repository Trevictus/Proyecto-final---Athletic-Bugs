# CONTEXT.md — Athletic Bugs

> Fuente de verdad sobre la arquitectura real del proyecto. Úsala antes de editar cualquier archivo.

## Visión General

**Athletic Bugs** es una habit tracker web mobile-first, encapsulada dentro de un shell visual tipo iPhone. El usuario registra entrenamientos (tren superior, tren inferior, estado de ánimo) y el avatar **Buggy** evoluciona visualmente según el estado acumulado.

Estética: **Cozy Cartoon** — paletas suaves, bordes redondeados, sin agresividad visual.

## Estructura Real de Archivos

```
/
├── index.html          # HTML completo. Punto de entrada. Sin build step.
├── ui.css              # Layout del shell iPhone, tarjetas, formulario y controles
├── ui.js               # Eventos, suscripción al store, render del historial
├── buggy.css           # Avatar Buggy: formas, colores, transformaciones CSS
├── buggy.js            # Inicializa Buggy y suscribe al store para actualizar data-* y CSS vars
├── store.js            # Estado central (gameState), localStorage, pub/sub reactivo
└── assets/
    └── iphone-frame.png  # Marco PNG del iPhone renderizado vía SVG inline en index.html
```

> **Nota:** El CONTEXT.md original describía una estructura con carpetas `css/` y `js/` y archivos `app.js`, `state.js`, `render.js`. Esa estructura **nunca existió en el código real**. Los archivos reales son los listados arriba, todos en la raíz.

## Stack

- Vanilla HTML5, CSS3, JavaScript ES Modules (navegador nativo)
- Sin bundler, sin framework, sin dependencias externas
- Se abre directamente desde `index.html` en el navegador

## Estado Central

- `store.js` gestiona `gameState` (objeto en memoria) + `localStorage` (clave `athletic-bugs-state`)
- Expone: `getState()`, `subscribe(fn)`, `commitSession(payload)`, `resetState()`, `getProgressSnapshot(state)`
- `subscribe` es pub/sub: cada llamada registra un listener y lo invoca inmediatamente con el estado actual
- `getState()` devuelve un `structuredClone` — los lectores no mutan el estado interno
- El estado **no se expone en `window`**. Usarlo desde la consola requiere importar el módulo.

## Flujo Principal

1. `index.html` carga `ui.js` como `type="module"`
2. `ui.js` importa `buggy.js` y el store; suscribe listeners al DOM
3. `buggy.js` suscribe al store y actualiza `data-*` y variables CSS del avatar
4. El formulario llama a `commitSession()` → el store persiste y notifica → `ui.js` y `buggy.js` re-renderizan

## El Avatar Buggy

- Construido con `<div>` y CSS puro. No usa imágenes ni SVG para el cuerpo.
- Controlado por `data-upper-tier`, `data-lower-tier`, `data-mood` en `#buggy-avatar`
- Variables CSS: `--buggy-upper-scale`, `--buggy-lower-scale`, `--buggy-balance`
- Los tiers (0–3) se calculan en `mapScoreToTier` dentro de `store.js`

## Moods Válidos

`focused` | `charged` | `playful` | `tired`

## Restricciones Permanentes

- No introducir React, Vue, TypeScript, bundlers ni dependencias externas
- No reestructurar el proyecto en carpetas sin necesidad funcional clara
- No romper la estética cozy ni el shell tipo iPhone
- No exponer el estado en `window` sin justificación explícita