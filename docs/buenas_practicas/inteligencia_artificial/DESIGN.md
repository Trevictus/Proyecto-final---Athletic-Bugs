# BRIEF DE DISEÑO: Athletic Bugs
**Estética:** Pixel Art Retro Gym | **Versión:** 2.0

---

## 1. Visión General del Nuevo Estilo
El proyecto **Athletic Bugs** transiciona de una estética vectorial/cartoon genérica a un estilo **Pixel Art 2D (16-bit / 32-bit)**. La inspiración principal proviene de videojuegos clásicos de gestión y mascotas virtuales (ej. *GameBoy Advance*, *Stardew Valley*).

La aplicación se mantendrá encapsulada en un simulador de smartphone. Sin embargo, todos los assets (interfaz gráfica, fondos y avatar) deben ser estrictamente pixelados, manteniendo bordes definidos (*pixel-perfect*) y utilizando una paleta de colores vibrante con tono nostálgico.

## 2. El Entorno (Fondo de la App)
El hábitat de "Buggy" evoluciona de una habitación de estudio a un **Gimnasio Acogedor Retro**. 
Se utilizará una perspectiva frontal plana (*2D flat perspective*) con una falsa profundidad aplicada en el suelo y el techo.

### Elementos Obligatorios de la Escena
*   **Paredes y Suelo:** Papel tapiz verde con patrones geométricos sutiles (flechas hacia arriba). Estructura visible de madera rústica (columnas y vigas) y suelo de listones de madera cálida.
*   **Punto Focal (Centro):** Una alfombra circular de mimbre o tela. Aquí se renderizará a "Buggy".
*   **Decoración de Gimnasio (Laterales):** Banco de pesas con barra, dispensador de agua de oficina, cinta de correr clásica y mancuernas en el suelo.
*   **Estanterías y Detalles:** Trofeos dorados, toallas apiladas y un elemento místico (ej. un cristal brillante que represente "disciplina").
*   **Letrero Motivacional:** Cartel central en la pared del fondo con tipografía pixelada gruesa. Debe incluir frases como *"¡MUEVE LAS PATAS!"* o *"NO PAIN NO GAIN"*, acompañado del icono de un insecto.

## 3. Especificaciones del Avatar (Buggy)
El avatar debe rediseñarse completamente en Pixel Art, manteniendo su arquitectura modular. Estará compuesto por 3 contenedores apilados en columna (Cabeza, Torso, Piernas).

### Requerimientos Técnicos del Sprite
*   **Estilo Visual:** Contornos oscuros de 1 a 2 píxeles. Colores planos con sombreado de tramado (*dithering*) mínimo, priorizando un estilo *cel-shaded* pixelado.
*   **Integración Modular:** Los 3 bloques de imagen (`<div>` o contenedores) deben tener exactamente el mismo ancho en píxeles. Al apilarse mediante CSS (`display: flex; flex-direction: column;` o `grid`), deben fusionarse visualmente como un único personaje sin cortes.
*   **Animación (Recomendado):** Implementar una animación *Idle* (respiración) de 2 a 4 *frames*, donde el módulo del torso se desplace 1 píxel hacia arriba y hacia abajo de forma cíclica.

## 4. UI / UX (Interfaz del Simulador)
Los elementos superpuestos al entorno (*overlay*) deben respetar estrictamente el lenguaje retro:

*   **Tipografía:** Utilizar fuentes tipográficas de estilo pixelado disponibles en Google Fonts (ej. `Press Start 2P`, `Pixelify Sans`).
*   **Botones:** Diseño en bloque grueso con efecto de relieve (*bevel*), utilizando tonos claros en el borde superior y oscuros en el inferior. Al interactuar con ellos (estado CSS `:active`), deben hundirse visualmente desplazándose de 2 a 4 píxeles hacia abajo.
*   **Contenedor del Dispositivo:** El marco del smartphone simulado debe usar un color sólido oscuro (ej. azul marino `#1a1c29` o gris oscuro) con bordes redondeados. Debe incluir un bisel interior sutil para emular la pantalla de una consola portátil clásica.
*   **Paleta de Interfaz:** Utilizar colores complementarios al verde del fondo para destacar elementos accionables:
    *   **Alertas/Peligro:** Rojo cálido (`#d94141`).
    *   **Recompensas/Logros:** Dorado (`#f2a65a`).
    *   **Textos de lectura:** Blanco roto o crema.