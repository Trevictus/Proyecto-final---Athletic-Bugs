# Athletic Bugs

Aplicacion web mobile-first construida solo con HTML5, CSS3 y JavaScript moderno. Toda la experiencia vive dentro de un shell que simula un iPhone y gira alrededor de Buggy, un avatar modular que evoluciona segun tres entradas de usuario:

- Tren superior
- Tren inferior
- Estado de animo

## Arquitectura

- `index.html`: estructura principal y composicion del shell movil.
- `ui.css`: layout general, tarjetas, formulario y visual del iPhone en escritorio.
- `ui.js`: eventos de interfaz, render de historial y sincronizacion de controles.
- `buggy.css`: dibujo del avatar y reglas visuales de transformacion.
- `buggy.js`: adaptacion del avatar a partir del estado global.
- `store.js`: `gameState`, persistencia con `localStorage` y suscripcion reactiva.
- `assets/iphone-frame.svg`: frame SVG que reutiliza `assets/iphone-frame.png` para encapsular la interfaz.

## Estado Centralizado

La app usa `gameState` como fuente unica de verdad. Cada sesion guardada actualiza el store, persiste en `localStorage` y notifica a la UI y al avatar para rerenderizar sin duplicar logica.

## Como ejecutar

Abre `index.html` directamente en el navegador o desde VS Code. No requiere servidor, dependencias ni build step.