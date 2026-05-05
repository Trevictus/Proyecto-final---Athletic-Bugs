Este archivo `CONTEXT.md` servirá como la "Biblia" del proyecto. Podéis dárselo a cualquier agente de IA al abrir un nuevo chat para que sepa exactamente qué está haciendo y bajo qué reglas trabajar.

***

# CONTEXT.md: Proyecto "Athletic Bugs" 🐛💪

## 1. Visión General
**Athletic Bugs** es una aplicación web tipo "habit tracker" encapsulada en un simulador de iPhone. El objetivo es que el usuario registre sus entrenamientos diarios y vea una evolución visual en un avatar modular llamado **"Buggy"**. 

La estética es **Cozy Cartoon** (paletas suaves, bordes redondeados, ambiente relajado tipo habitación de estudio).

## 2. El Personaje: Buggy
Buggy no es una imagen estática, es un **componente modular programable** construido con HTML/SVG y CSS. Evoluciona según tres ejes:
- **Cabeza (Head):** Refleja el **Estado de Ánimo** (expresiones faciales, antenas, color).
- **Torso (Upper Body):** Refleja el **Tren Superior** (ancho del torso, definición, accesorios como pesas).
- **Piernas (Lower Body):** Refleja el **Tren Inferior** (grosor de patas, altura, estabilidad).

## 3. Reglas Técnicas (Innegociables)
- **Stack:** Vanilla HTML5, CSS3 y JavaScript (ES6+). **Prohibido** el uso de librerías externas o frameworks.
- **Entorno:** La app debe renderizarse exclusivamente dentro de un contenedor con forma de **iPhone** (390x844px aprox), centrado en la pantalla.
- **Arquitectura de Estado:** 
    - Existe un único objeto `gameState` que contiene los niveles de cada parte del cuerpo y el ánimo.
    - El DOM y el aspecto de Buggy son **reactivos** a este estado. No se manipula el estilo directamente desde la lógica de cálculo.
- **Estilización:** Uso intensivo de **Variables CSS** (Custom Properties) para gestionar la metamorfosis del personaje (ej: `--buggy-bulk`, `--buggy-mood-color`).
- **Persistencia:** Los datos deben guardarse en `localStorage` para que el progreso no se pierda al recargar.

## 4. Estructura de Archivos
Para facilitar el trabajo en paralelo de 4 personas:
```text
/
├── index.html          # Estructura del iPhone y puntos de montaje
├── css/
│   ├── main.css        # Layout del iPhone y la habitación (cozy room)
│   ├── buggy.css       # Estilos modulares y animaciones del avatar
│   └── ui.css          # Estilos de formularios, botones y modales
└── js/
    ├── app.js          # Orquestador y manejo de eventos
    ├── state.js        # Lógica del gameState y localStorage
    └── render.js       # Actualización del DOM y clases de Buggy
```

## 5. Lógica de Evolución
- El usuario introduce entrenamientos mediante un botón de acción (+).
- Cada entrenamiento suma puntos a una categoría (Superior/Inferior).
- Al alcanzar ciertos umbrales de puntos, la parte del cuerpo correspondiente sube de nivel (ej: Nivel 1 -> Nivel 2 -> Nivel 3).
- El estado de ánimo es temporal y cambia la expresión inmediata del avatar.

## 6. Roadmap del Taller (2 Horas)
1. **00:00 - 00:20:** Inicialización del frame iPhone y sistema de archivos.
2. **00:20 - 01:00:** Creación del Buggy Modular (SVG/CSS) y los niveles visuales.
3. **01:00 - 01:40:** Implementación del formulario de registro y lógica de estado.
4. **01:40 - 02:00:** Pulido estético, animaciones de transición y testing de persistencia.

***

### Cómo usar este archivo:
Cuando empecéis a trabajar con una IA, pegad el contenido de este `CONTEXT.md` y añadid: 
> *"Basado en este CONTEXT.md, vamos a trabajar en la tarea específica de: [Tarea: ej. Crear el diseño de Buggy en CSS]."*