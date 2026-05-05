# BRIEF DE REDISEÑO: Athletic Bugs (Pixel Art Retro Gym)

## 1. Visión General del Nuevo Estilo
El proyecto "Athletic Bugs" debe abandonar la estética vectorial/cartoon genérica y adoptar un estilo *Pixel Art 2D (16-bit / 32-bit)*, inspirado en los videojuegos clásicos de gestión y mascotas virtuales (estilo GameBoy Advance / Stardew Valley). 

La aplicación seguirá encapsulada en un simulador de smartphone, pero toda la interfaz gráfica, fondos y el avatar deben estar pixelados, con bordes definidos (pixel-perfect) y una paleta de colores vibrante pero nostálgica.

## 2. El Entorno (El Fondo de la App)
La habitación de "Buggy" ya no es un cuarto de estudio relajado, sino un *Gimnasio Acogedor Retro*. 
Debe seguir una perspectiva frontal plana (2D flat perspective) con profundidad simulada en el suelo y techo. 

*Elementos obligatorios del fondo:*
*   *Paredes y Suelo:* Papel tapiz verde con patrones geométricos sutiles (flechas hacia arriba). Estructura de madera rústica (columnas y vigas) y suelo de listones de madera cálida.
*   *Centro de la sala:* Una alfombra circular de mimbre o tela donde se posicionará a "Buggy". Este es el punto focal.
*   *Decoración de Gimnasio (Izquierda/Derecha):* Banco de pesas con barra, dispensador de agua de oficina, cinta de correr clásica, y unas mancuernas en el suelo.
*   *Estanterías y Detalles:* Trofeos dorados, toallas apiladas y algún elemento místico (como un cristal brillante que represente la "experiencia" o "disciplina").
*   *Letrero Motivacional:* Un cartel central en la pared del fondo con tipografía pixelada gruesa que diga frases como "¡MUEVE LAS PATAS!" o "NO PAIN NO GAIN", acompañado del icono de un bichito.

## 3. Rediseño de Buggy (El Avatar Modular)
Buggy debe rediseñarse completamente en *Pixel Art*. Debe mantener su naturaleza modular (3 contenedores apilados en columna: Cabeza, Torso, Piernas), pero ahora los sprites deben encajar a nivel de píxel.

*   *Estilo del Sprite:* Contornos oscuros de 1-2 píxeles, colores planos con sombreado de tramado (dithering) mínimo o estilo "cel-shaded" en píxeles.
*   *Integración:* Los 3 bloques (divs/contenedores) deben tener el mismo ancho en píxeles para que, al apilarse mediante CSS (flexbox/grid), parezcan un solo personaje de videojuego ininterrumpido.
*   *Animación (Opcional pero recomendada):* Buggy debería tener una animación "Idle" (respiración) de 2 a 4 frames donde el torso sube y baja un píxel.

## 4. UI / UX (Interfaz del Simulador)
Toda la interfaz por encima de la habitación debe adaptarse al estilo retro:
*   *Tipografía:* Usar fuentes de estilo pixel (ej. Press Start 2P, Pixelify Sans o similares de Google Fonts).
*   *Botones:* Botones gruesos con aspecto de bloque (efecto bevel/relieve usando colores más claros arriba y oscuros abajo). Al presionarlos (estado :active), deben "hundirse" visualmente (bajando 2 a 4 píxeles).
*   *Contenedor del iPhone:* El marco del simulador de móvil debe adoptar un color sólido oscuro (ej. azul marino #1a1c29 o gris oscuro) con bordes redondeados y un sutil borde interior para enmarcar la escena pixel art como si fuera la pantalla de una consola portátil.
*   *Colores de UI:* Utilizar colores complementarios al verde del fondo, como rojos cálidos (#d94141) para alertas, dorados (#f2a65a) para recompensas y blancos rotos para el texto.