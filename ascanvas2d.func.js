/**
 * Obtiene el contexto 2D de un canvas
 * @param {HTMLCanvasElement} cv - Elemento canvas
 * @returns {CanvasRenderingContext2D} Contexto 2D del canvas
 */
function getContext(cv) {
    return cv.getContext('2d', { willReadFrequently: true });
}

/**
 * Establece el color de fondo del canvas
 * @param {string} c - Color de fondo
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function bg(c, cv) {
    getContext(cv).save();
    getContext(cv).strokeStyle = 'transparent';
    getContext(cv).fillStyle = c;
    getContext(cv).fillRect(0, 0, cv.width, cv.height);
    getContext(cv).restore();
}

/**
 * Establece el tamaño del canvas
 * @param {number} w - Ancho en píxeles
 * @param {number} h - Alto en píxeles
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function size(w, h, cv) {
    cv.width = w * cv.resolution;
    cv.height = h * cv.resolution;
}

/**
 * Ajusta el canvas al tamaño de la ventana
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function fullSize(cv) {
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
}

/**
 * Establece el color de relleno
 * @param {string} [c='#fff'] - Color de relleno
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function fill(c = '#fff', cv) {
    getContext(cv).fillStyle = c;
}

/**
 * Elimina el color de relleno
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function noFill(cv) {
    getContext(cv).fillStyle = 'transparent';
}

/**
 * Establece el color del trazo
 * @param {string} [c='#000'] - Color del trazo
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function stroke(c = '#000', cv) {
    getContext(cv).strokeStyle = c;
}

/**
 * Elimina el trazo
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function noStroke(cv) {
    getContext(cv).strokeStyle = 'transparent';
}

/**
 * Establece el ancho del trazo
 * @param {number} sw - Ancho del trazo
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function strokeWidth(sw, cv) {
    getContext(cv).lineWidth = sw;
}

/**
 * Dibuja un círculo en el canvas
 * @param {number} x - Posición X del centro
 * @param {number} y - Posición Y del centro
 * @param {number} d - Diámetro del círculo
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function circle(x, y, d, cv) {
    getContext(cv).beginPath();
    getContext(cv).arc(x, y, d, 0, 2 * Math.PI, true);
    getContext(cv).closePath();
    getContext(cv).fill();
    getContext(cv).stroke();
}

/**
 * Dibuja un rectángulo en el canvas
 * @param {number} x - Posición X de la esquina superior izquierda
 * @param {number} y - Posición Y de la esquina superior izquierda
 * @param {number} w - Ancho del rectángulo
 * @param {number} h - Alto del rectángulo
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function rect(x, y, w, h, cv) {
    getContext(cv).beginPath();
    getContext(cv).rect(x, y, w, h);
    getContext(cv).fill();
    getContext(cv).stroke();
}

/**
 * Dibuja una línea en el canvas
 * @param {number} x1 - Posición X inicial
 * @param {number} y1 - Posición Y inicial
 * @param {number} x2 - Posición X final
 * @param {number} y2 - Posición Y final
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function line(x1, y1, x2, y2, cv) {
    getContext(cv).beginPath();
    getContext(cv).moveTo(x1, y1);
    getContext(cv).lineTo(x2, y2);
    getContext(cv).stroke();
}

/**
 * Dibuja un punto en el canvas
 * @param {number} x - Posición X
 * @param {number} y - Posición Y
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function point(x, y, cv) {
    getContext(cv).beginPath();
    getContext(cv).moveTo(x, y);
    getContext(cv).save();
    getContext(cv).lineCap = 'round';
    getContext(cv).lineTo(x, y);
    getContext(cv).stroke();
    getContext(cv).restore();
}

/**
 * Establece la sombra para los elementos del canvas
 * @param {number} [x=0] - Desplazamiento X de la sombra
 * @param {number} [y=0] - Desplazamiento Y de la sombra
 * @param {number} [b=10] - Desenfoque de la sombra
 * @param {string} [c='rgba(0,0,0,0.5)'] - Color de la sombra
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function shadow(x = 0, y = 0, b = 10, c = 'rgba(0,0,0,0.5)', cv) {
    getContext(cv).shadowColor = c;
    getContext(cv).shadowOffsetX = x * cv.resolution;
    getContext(cv).shadowOffsetY = y * cv.resolution;
    getContext(cv).shadowBlur = b * cv.resolution;
}

/**
 * Elimina la sombra
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function noShadow(cv) {
    getContext(cv).shadowColor = 'transparent';
    getContext(cv).shadowOffsetX = 0;
    getContext(cv).shadowOffsetY = 0;
    getContext(cv).shadowBlur = 0;
}

/**
 * Obtiene los datos de imagen de una región del canvas
 * @param {number} x - Posición X inicial
 * @param {number} y - Posición Y inicial
 * @param {number} w - Ancho de la región
 * @param {number} h - Alto de la región
 * @param {HTMLCanvasElement} cv - Elemento canvas
 * @returns {ImageData} Datos de imagen de la región especificada
 */
export function getImage(x, y, w, h, cv) {
    return getContext(cv).getImageData(x * cv.resolution, y * cv.resolution, w * cv.resolution, h * cv.resolution);
}

/**
 * Dibuja una imagen en el canvas
 * @param {ImageData|HTMLImageElement} i - Imagen a dibujar
 * @param {number} x - Posición X
 * @param {number} y - Posición Y
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function image(i, x, y, cv) {
    if (i.constructor.name === 'ImageData') {
        getContext(cv).putImageData(i, x * cv.resolution, y * cv.resolution);
    } else {
        getContext(cv).drawImage(i, x, y,i.width/cv.resolution,i.height/cv.resolution);
    }
}

/**
 * Guarda el canvas como archivo JPG
 * @param {HTMLCanvasElement} cv - Elemento canvas
 * @param {number} [q=0.75] - Calidad de la imagen (0-1)
 */
export function saveJPG(cv, q = 0.75) {
    let a = document.createElement('a');
    a.href = cv.toDataURL('image/jpeg', q);
    a.download = 'file.jpeg';
    a.click();
    a.remove();
}

/**
 * Guarda el canvas como archivo PNG
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function savePNG(cv) {
    let a = document.createElement('a');
    a.href = cv.toDataURL('image/png');
    a.download = 'file.png';
    a.click();
    a.remove();
}

/**
 * Ajusta un valor a una cuadrícula
 * @param {number} v - Valor a ajustar
 * @param {number} s - Tamaño de la cuadrícula
 * @returns {number} Valor ajustado
 */
export function snapValue(v, s) {
    return Math.round(v / s) * s;
}

/**
 * Mapea un valor de un rango a otro
 * @param {number} v - Valor a mapear
 * @param {number} f1 - Inicio del rango origen
 * @param {number} f2 - Fin del rango origen
 * @param {number} t1 - Inicio del rango destino
 * @param {number} t2 - Fin del rango destino
 * @returns {number} Valor mapeado
 */
export function mapValue(v, f1, f2, t1, t2) {
    return t1 + ((t2 - t1) * (v - f1)) / (f2 - f1);
}

/**
 * Calcula la distancia entre dos puntos
 * @param {number} x1 - Posición X del primer punto
 * @param {number} y1 - Posición Y del primer punto
 * @param {number} x2 - Posición X del segundo punto
 * @param {number} y2 - Posición Y del segundo punto
 * @returns {number} Distancia entre los puntos
 */
export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Traslada el origen del canvas
 * @param {number} x - Desplazamiento X
 * @param {number} y - Desplazamiento Y
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function translate(x, y, cv) {
    getContext(cv).translate(x, y);
}

/**
 * Rota el canvas
 * @param {number} a - Ángulo de rotación en radianes
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function rotate(a, cv) {
    getContext(cv).rotate(a);
}

/**
 * Guarda el estado actual del canvas
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function push(cv) {
    getContext(cv).save();
}

/**
 * Restaura el último estado guardado del canvas
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function pop(cv) {
    getContext(cv).restore();
}

/**
 * Escala el canvas
 * @param {number} x - Factor de escala en X
 * @param {number} y - Factor de escala en Y
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function scale(x, y, cv) {
    getContext(cv).scale(x, y);
}

/**
 * Establece la resolución del canvas
 * @param {number} pixelDensity - Densidad de píxeles
 * @param {HTMLCanvasElement} cv - Elemento canvas
 */
export function setCanvasResolution(pixelDensity, cv) {
    if(cv._isMainCanvas){
        const width = cv.width;
        const height = cv.height;
        cv.width = width * pixelDensity;
        cv.height = height * pixelDensity;
        cv.style = `width:${width}px;height:${width}px;`;
        cv.resolution = pixelDensity;
        getContext(cv).scale(pixelDensity, pixelDensity);
    }else{
        console.warn('Can not set resolution in offscreen canvas')
    }
}

/**
 * Crea un degradado lineal
 * @param {number} [x1=0] - Posición X inicial
 * @param {number} [y1=0] - Posición Y inicial
 * @param {number} [x2=999] - Posición X final
 * @param {number} [y2=999] - Posición Y final
 * @param {Object} [_steps={}] - Objeto con pasos del degradado {offset: color}
 * @param {HTMLCanvasElement} cv - Elemento canvas
 * @returns {CanvasGradient} Degradado lineal
 */
export function linearGradient(
    x1 = 0,
    y1 = 0,
    x2 = 999,
    y2 = 999,
    _steps = {},
    cv
) {
    const steps = {
        0.0: '#000',
        1.0: '#fff',
        ..._steps,
    };
    const grad = getContext(cv).createLinearGradient(x1, y1, x2, y2);
    Object.entries(steps).forEach((kv) => {
        grad.addColorStop(kv[0], kv[1]);
    });
    return grad;
}

/**
 * Crea un degradado radial
 * @param {number} [x1=0] - Posición X del centro inicial
 * @param {number} [y1=0] - Posición Y del centro inicial
 * @param {number} [r1=0] - Radio inicial
 * @param {number} [x2=200] - Posición X del centro final
 * @param {number} [y2=200] - Posición Y del centro final
 * @param {number} [r2=200] - Radio final
 * @param {Object} [_steps={}] - Objeto con pasos del degradado {offset: color}
 * @param {HTMLCanvasElement} cv - Elemento canvas
 * @returns {CanvasGradient} Degradado radial
 */
export function radialGradient(
    x1 = 0,
    y1 = 0,
    r1 = 0,
    x2 = 200,
    y2 = 200,
    r2 = 200,
    _steps = {},
    cv
) {
    const steps = {
        0.0: "#000",
        1.0: "#fff",
        ..._steps,
    };
    const grad = getContext(cv).createRadialGradient(x1, y1, r1, x2, y2, r2);
    Object.entries(steps).forEach((kv) => {
        grad.addColorStop(kv[0], kv[1]);
    });
    return grad;
}

/**
 * Crea un color RGB
 * @param {number} [r=255] - Componente rojo (0-255)
 * @param {number} [g=255] - Componente verde (0-255)
 * @param {number} [b=255] - Componente azul (0-255)
 * @param {number} [a=1.0] - Canal alfa (0-1)
 * @returns {string} Color en formato rgba()
 */
function colorRGB(r = 255, g = 255, b = 255, a = 1.0) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

/**
 * Crea un color en escala de grises
 * @param {number} [c=255] - Valor de gris (0-255)
 * @param {number} [a=1.0] - Canal alfa (0-1)
 * @returns {string} Color en formato rgba()
 */
function colorBW(c = 255, a = 1.0) {
    return 'rgba(' + c + ',' + c + ',' + c + ',' + a + ')';
}

/**
 * Crea un color HSB/HSL
 * @param {number} [h=0] - Tono (0-360)
 * @param {number} [s=100] - Saturación (0-100)
 * @param {number} [l=50] - Luminosidad (0-100)
 * @param {number} [a=1.0] - Canal alfa (0-1)
 * @returns {string} Color en formato hsla()
 */
function colorHSB(h = 0, s = 100, l = 50, a = 1.0) {
    const _s = s + '%';
    const _l = l + '%';
    return 'hsla(' + h + ',' + _s + ',' + _l + ',' + a + ')';
}

/**
 * Crea un color en diferentes formatos
 * @param {...*} c - Argumentos del color:
 *   - ['RGB', r, g, b, a] para color RGB
 *   - ['BW', valor, alpha] para escala de grises
 *   - ['HSLA', h, s, l, a] para color HSL
 * @returns {string} Color en formato CSS
 */
export function color(...c) {
    if (c[0] === 'RGB') {
        const r = c[1] ?? 255;
        const g = c[2] ?? 255;
        const b = c[3] ?? 255;
        const a = c[4] ?? 1.0;
        return colorRGB(r, g, b, a);
    }
    if (c[0] === 'BW') {
        const t = c[1] ?? 255;
        const a = c[2] ?? 1.0;
        return colorBW(t, a);
    }
    if (c[0] === 'HSLA') {
        const h = c[1] ?? 0;
        const s = c[2] ?? 100;
        const l = c[3] ?? 50;
        const a = c[4] ?? 1.0;
        return colorHSB(h, s, l, a)
    }
}

/**
 * Obtiene el ancho del canvas ajustado por resolución
 * @param {HTMLCanvasElement} cv - Elemento canvas
 * @returns {number} Ancho ajustado
 */
export function width(cv) {
    return cv.width / cv.resolution;
}

/**
 * Obtiene el alto del canvas ajustado por resolución
 * @param {HTMLCanvasElement} cv - Elemento canvas
 * @returns {number} Alto ajustado
 */
export function height(cv) {
    return cv.height / cv.resolution;
}

/**
 * Crea un canvas fuera de pantalla
 * @param {number} w - Ancho del canvas
 * @param {number} h - Alto del canvas
 * @param {HTMLCanvasElement} cv - Canvas de referencia para la resolución
 * @returns {HTMLCanvasElement} Nuevo canvas fuera de pantalla
 */
export function createOffCanvas(w, h, cv) {
    const canvas = document.createElement('canvas');
    canvas.resolution = cv.resolution;
    canvas.width = w * cv.resolution;
    canvas.height = h * cv.resolution;
    getContext(canvas).scale(cv.resolution, cv.resolution);
    return canvas;
}