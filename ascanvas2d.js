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

/**
 * Inicializa un canvas 2D con funciones de setup y animación
 * @param {Function} setup Función de configuración inicial que recibe {canvas, mouse}
 * @param {Function} draw Función de animación que recibe {time, deltaRatio, canvas, mouse, frameCount}
 */
export default function ascanvas2d(setup, draw) {
    const canvas = createCanvas();
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Variables globales para tracking del mouse y frames
    const mouse = { x: 0, y: 0 };
    let frameCount = 0;

    // Ejecuta la configuración inicial
    setup({ canvas, mouse });

    // Configuración del loop de animación
    const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame;
    let lastTime = Date.now();

    /**
     * Loop principal de animación
     * @param {number} time Timestamp actual
     */
    function _(time) {
        // Cálculo de DeltaTime para normalizar la velocidad de animación
        const deltaTime = time - lastTime; // Tiempo variable entre frames
        const constantTime = 1000 / 60;    // Tiempo objetivo (16.67ms @ 60fps)
        const deltaRatio = constantTime / deltaTime; // Factor de corrección
        lastTime = time;

        // Ejecuta el frame de animación
        draw({
            time,
            deltaRatio,
            canvas,
            mouse,
            frameCount,
        });
        raf(_);
        frameCount++;
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
