# GUARDRAILS.md — Reglas de seguridad operativa

Reglas concretas, no teóricas. Aplican a cualquier cambio en este repositorio.

## Entradas de usuario

- **Nunca uses `innerHTML`, `outerHTML` ni `insertAdjacentHTML` con datos del usuario** (textarea, input text, localStorage).  
  Usa `textContent`, `createElement` + `append`, o la API DOM estructurada.
- El campo `note` del formulario es texto libre. Tratarlo siempre como potencialmente malicioso.
- Los valores `mood` vienen de `data-mood-option` en botones definidos en el HTML; son seguros, pero valida contra el conjunto conocido antes de persistir si añades nuevos modos.

## Estado y almacenamiento

- `localStorage` puede contener datos manipulados por el usuario. El `loadState()` en `store.js` ya hace merge defensivo con `defaultState`; mantén ese patrón si extiendes el estado.
- No serialices en `localStorage` objetos con métodos o prototipos. Solo datos planos.
- No almacenes secretos, tokens ni PII en `localStorage`.

## Exposición global

- No añadas propiedades a `window` desde los módulos JS. El estado es privado al módulo.
- Si necesitas depurar desde la consola del navegador, importa el módulo dinámicamente: `const { getState } = await import('./store.js')`.

## DOM y scripts

- No uses `eval()`, `new Function()`, ni `setTimeout(string)`.
- No cargues scripts externos. El proyecto es 100% local.
- El atributo `type="module"` en `<script>` es obligatorio; no lo elimines (activa strict mode y aísla el scope).

## Cambios estructurales

- Antes de añadir un archivo JS nuevo, verifica que no duplica responsabilidad con `store.js`, `ui.js` o `buggy.js`.
- Si añades validación de inputs, hazla en el submit handler de `ui.js`, no en el store. El store recibe datos ya validados.
- No modifiques `STORAGE_KEY` en `store.js` sin migrar el estado existente o se perderán los datos de usuarios actuales.
