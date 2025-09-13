# ascanvas2d

Es una librería de uso personal creada para minimizar el código necesario para crear gráficos en canvas2d.

Para poder minimizar el codigo y hacer "tree shaking", utilizar algún bundler como vite, webpack, etc.

Si se necesitan funcionalidades más complejas, se puede utilizar p5js. De hecho, el código está inspirado en P5JS.

## Ejemplo básico de uso

```js
import ascanvas from './ascanvas2d.js';
import { createRandom } from './ascanvas2d.utils.js';
import {
    bg,
    size,
    width,
    height,
    color,
    fill,
    stroke,
    strokeWidth,
    circle,
    rect,
    point,
    translate,
    rotate,
    push,
    pop,
} from './ascanvas2d.func.js';

const random = createRandom();

// Definición de setup -> Configuración inicial
function setup(o) {
    const { canvas } = o;
    size(800, 600, canvas);
    bg('#1a1a1a', canvas);
}

// Definición de draw -> Animación
function draw(o) {
    // o -> {canvas, mouse, time, deltaRatio, frameCount}
    const { canvas, mouse, time, frameCount } = o;
    
    // Fondo con transparencia para efecto de rastro
    fill(color('RGB', 26, 26, 26, 0.5), canvas);
    rect(0, 0, width(canvas), height(canvas), canvas);
    
    push(canvas);
    translate(width(canvas) / 2, height(canvas) / 2, canvas);
    
    // Círculos animados
    for (let i = 0; i < 8; i++) {
        push(canvas);
        rotate((time * 0.001) + (i * Math.PI / 4), canvas);
        
        const x = Math.cos(time * 0.002) * 150;
        const y = Math.sin(time * 0.003) * 100;
        
        fill(color('HSLA', (i * 45 + frameCount) % 360, 70, 60, 0.8), canvas);
        stroke(color('HSLA', (i * 45 + frameCount) % 360, 90, 80, 1), canvas);
        strokeWidth(2, canvas);
        
        circle(x, y, 20 + Math.sin(time * 0.005 + i) * 10, canvas);
        pop(canvas);
    }
    
    // Puntos siguiendo el mouse
    if (mouse.x && mouse.y) {
        stroke(color('RGB', 255, 255, 255, 0.6), canvas);
        strokeWidth(random(1, 3), canvas);
        point(mouse.x - width(canvas) / 2, mouse.y - height(canvas) / 2, canvas);
    }
    
    pop(canvas);
}

// Inicializar
ascanvas({setup, draw});
```
