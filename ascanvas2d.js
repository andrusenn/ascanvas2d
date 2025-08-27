/**
 * Crea y configura un nuevo elemento canvas en el documento
 * @returns {HTMLCanvasElement} El elemento canvas creado
 */
function createCanvas() {
    const cv = document.createElement('canvas');
    cv.resolution = 1;
    cv._isMainCanvas = true;
    document.body.appendChild(cv);
    return cv;
}
function createOffCanvas() {
    const cv = new OffscreenCanvas(100, 100);
    return cv;
}

/**
 * Inicializa un canvas 2D con funciones de setup y animación
 * @param {Function} setup Función de configuración inicial que recibe {canvas, mouse}
 * @param {Function} draw Función de animación que recibe {time, deltaRatio, canvas, mouse, frameCount}
 */
export default function ascanvas2d({setup, draw, frameRate = 60, offScreen = false} = {}) {
    if(!setup || !draw) {
        throw new Error('setup y draw son requeridos');
    }

    let canvas;
    if(offScreen) {
        canvas = createOffCanvas();
    } else {
        canvas = createCanvas();
    }
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const mouse = { x: 0, y: 0 };
    let frameCount = 0;

    // Ejecuta la configuración inicial
    setup({ canvas, mouse });

    const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame;
    let lastTime = Date.now();
    const targetFrameTime = 1000 / frameRate; // Tiempo objetivo entre frames
    let lastDrawTime = 0;

    function _(time) {
        // Solo dibuja si ha pasado suficiente tiempo
        if (time - lastDrawTime >= targetFrameTime) {
            const deltaTime = time - lastTime;
            const constantTime = 1000 / 60;
            const deltaRatio = constantTime / deltaTime;
            lastTime = time;
            lastDrawTime = time;

            draw({
                time,
                deltaRatio,
                canvas,
                mouse,
                frameCount,
                frameRate,
            });
            frameCount++;
        }
        raf(_);
    }
    _();
    
    /**
     * Actualiza las coordenadas del mouse relativas al canvas
     * @param {MouseEvent} e Evento del mouse
     */
    function mouseMove(e) {
        var rect = ctx.canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    // Configuración de eventos del mouse
    ctx.canvas.removeEventListener('mousemove', mouseMove);
    ctx.canvas.addEventListener('mousemove', mouseMove, false);
}
