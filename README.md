# ascanvas2d

Es una librería de uso personal creada para minimizar el código necesario para crear gráficos en canvas2d.

Para poder minimizar el codigo y hacer "tree shaking", utilizar algún bundler como vite, webpack, etc.

Si se necesitan funcionalidades más complejas, se puede utilizar p5js. De hecho, el código está inspirado en P5JS.

## Ejemplo básico de uso

```js
import ascanvas from './libs/ascanvas2d.js';
import { createRandom } from './libs/ascanvas2d.utils.js';
import {
    bg,
    size,
    width,
    height,
    color,
    stroke,
    strokeWidth,
    point,
    translate,
    push,
    pop,
} from './libs/ascanvas2d.func.js';

const random = createRandom();

// Definición de setup -> Configuración inicial
function setup(o) {
    const { canvas } = o;
    size(500, 500, canvas);
    bg(
        '#333',
        canvas
    );
}

// Definición de draw -> Animación
function draw(o) {
    // o -> {canvas, mouse, time, deltaRatio, frameCount}
    const { canvas } = o;
    bg('#000', canvas);
    push(canvas);
    translate(5, 5, canvas);
    for (let x = 0; x < width(canvas); x += 10) {
        for (let y = 0; y < height(canvas); y += 10) {
            stroke(color('BW', random(0, 255), 1), canvas);
            strokeWidth(random(1, 5), canvas);
            point(x, y, canvas);
        }
    }
    pop(canvas);
}
// Inicializar
ascanvas(setup, draw);
```

