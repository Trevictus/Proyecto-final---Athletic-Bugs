# CLAUDE.md — Contexto operativo para agentes IA

Lee este archivo primero. Luego lee CONTEXT.md para la arquitectura detallada.

## Qué es este proyecto

Habit tracker web estático. Vanilla HTML/CSS/JS. Sin build step. Se abre desde `index.html`.
El estado central vive en `store.js` y persiste en `localStorage` con la clave `athletic-bugs-state`.

## Archivos principales

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura completa del HTML. Único punto de entrada. |
| `store.js` | Estado, persistencia, pub/sub. Única fuente de verdad. |
| `ui.js` | Formulario, historial, sincronización de controles. |
| `buggy.js` | Avatar Buggy: actualiza `data-*` y variables CSS. |
| `ui.css` | Layout, shell iPhone, tarjetas, controles. |
| `buggy.css` | Avatar visual: formas, colores, animaciones. |

## Reglas para editar

1. **No introduzcas frameworks, bundlers ni dependencias.** Este proyecto es intencionalmente vanilla.
2. **No reestructures en carpetas** sin una necesidad funcional documentada.
3. **No uses `innerHTML` con datos de usuario.** Usa `textContent` o la API DOM.
4. **No expongas estado en `window`.** El estado es interno al módulo `store.js`.
5. **No rompas el shell iPhone ni la estética cozy cartoon.**
6. **Itera en pequeños cambios verificables.** Abre `index.html` en el navegador después de cada cambio significativo.

## Cómo funciona el estado

```js
// Leer (devuelve clon, no mutar directamente)
import { getState } from "./store.js";

// Suscribirse a cambios (se invoca inmediatamente con el estado actual)
import { subscribe } from "./store.js";
subscribe((state) => { /* actualizar DOM */ });

// Guardar sesión
import { commitSession } from "./store.js";
commitSession({ upperBody, lowerBody, mood, note });

// Resetear
import { resetState } from "./store.js";
```

## Moods válidos

`"focused"` | `"charged"` | `"playful"` | `"tired"`

## Cómo verificar que nada se rompió

1. Abre `index.html` directamente en el navegador (sin servidor).
2. Mueve los sliders y selecciona un mood. Haz clic en "Guardar evolución".
3. Comprueba que Buggy cambia visualmente y el historial muestra la entrada.
4. Recarga: el estado debe persistir.
5. Pulsa Reset: el estado debe volver al default y Buggy volver a nivel base.

## Qué NO está en este proyecto

- No hay servidor, backend ni API
- No hay tests automatizados
- No hay `package.json` ni node_modules
- No hay `css/` ni `js/` como carpetas — todos los archivos están en la raíz
- Los archivos `app.js`, `state.js`, `render.js`, `main.css` que menciona el CONTEXT.md original **no existen**
