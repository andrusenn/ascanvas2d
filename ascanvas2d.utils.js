/**
 * Función generadora de números aleatorios con semilla
 * Implementación basada en cyrb128 + mulberry32
 * 
 * Uso:
 * const random = createRandom(seed?);
 * random() -> 0 to < 1
 * random(5,15) -> 5 to < 15
 * 
 * @private
 * @param {string} seed - Semilla para la generación de números aleatorios
 * @returns {Function} Función generadora de números aleatorios
 */
function _createRandom(seed = "") {
	/**
	 * Algoritmo de hash cyrb128 para generar semillas
	 * @param {string} str - Cadena de entrada
	 * @returns {number[]} Array de 4 números hash
	 */
	let cyrb128 = (str) => {
		let h1 = 1779033703,
			h2 = 3144134277,
			h3 = 1013904242,
			h4 = 2773480762;
		for (let i = 0, k; i < str.length; i++) {
			k = str.charCodeAt(i);
			h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
			h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
			h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
			h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
		}
		h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
		h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
		h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
		h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
		return [
			(h1 ^ h2 ^ h3 ^ h4) >>> 0,
			(h2 ^ h1) >>> 0,
			(h3 ^ h1) >>> 0,
			(h4 ^ h1) >>> 0,
		];
	};
	/**
	 * Generador de números pseudoaleatorios mulberry32
	 * @param {number} a - Semilla numérica
	 * @returns {Function} Función generadora de números aleatorios
	 */
	let mulberry32 = (a) => {
		return function () {
			var t = (a += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	};
	// w/seed
	if (seed !== "") {
		const r = mulberry32(cyrb128(seed)[0]);
		return r;
	}
	// just random
	if (seed === "") {
		return Math.random;
	}
	return 0;
}
/**
 * Crea un generador de números aleatorios con semilla opcional
 * @param {string} [seed=""] - Semilla para la generación determinística
 * @returns {Function} Función que genera números aleatorios:
 *   - Sin argumentos: retorna 0 a < 1
 *   - Con argumentos (a, b): retorna a a < b
 * @example
 * const random = createRandom("miSemilla");
 * random() // 0.123...
 * random(5, 15) // 8.456...
 */
export function createRandom(seed = "") {
	let r = _createRandom(seed);
	return function (a, b) {
		if (arguments.length == 0) {
			return r();
		}
		return r() * (b - a) + a;
	};
}
/**
 * Implementación de Simplex Noise 3D
 * Basado en el trabajo de Jonas Wagner
 * Solo soporta ruido 3D
 */

/** Factor de deformación para 3D */
const F3 = 1.0 / 3.0;
/** Factor de deformación gradiente para 3D */
const G3 = 1.0 / 6.0;
/** Función optimizada para calcular el piso de un número */
const fastFloor = (x) => Math.floor(x) | 0;
/** Tabla de gradientes para simplex noise 3D */
const grad3 = new Float64Array([
	1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0,
	-1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
]);

/**
 * Crea un generador de ruido Simplex 3D
 * @param {Function} [random=Math.random] - Función generadora de números aleatorios
 * @returns {Function} Función de ruido que acepta coordenadas (x, y, z) y retorna un valor entre -1 y 1
 * @example
 * const noise3D = createNoise3D();
 * const valor = noise3D(x, y, z); // -1 a 1
 */
export function createNoise3D(random = Math.random) {
	const perm = buildPermutationTable(random);
	const permGrad3x = new Float64Array(perm).map((v) => grad3[(v % 12) * 3]);
	const permGrad3y = new Float64Array(perm).map(
		(v) => grad3[(v % 12) * 3 + 1],
	);
	const permGrad3z = new Float64Array(perm).map(
		(v) => grad3[(v % 12) * 3 + 2],
	);
	/**
	 * Función de ruido Simplex 3D
	 * @param {number} x - Coordenada X
	 * @param {number} y - Coordenada Y
	 * @param {number} z - Coordenada Z
	 * @returns {number} Valor de ruido entre -1 y 1
	 */
	return function noise3D(x, y, z) {
		let n0, n1, n2, n3;
		const s = (x + y + z) * F3;
		const i = fastFloor(x + s);
		const j = fastFloor(y + s);
		const k = fastFloor(z + s);
		const t = (i + j + k) * G3;
		const X0 = i - t;
		const Y0 = j - t;
		const Z0 = k - t;
		const x0 = x - X0;
		const y0 = y - Y0;
		const z0 = z - Z0;
		let i1, j1, k1;
		let i2, j2, k2;
		if (x0 >= y0) {
			if (y0 >= z0) {
				i1 = 1;
				j1 = 0;
				k1 = 0;
				i2 = 1;
				j2 = 1;
				k2 = 0;
			} else if (x0 >= z0) {
				i1 = 1;
				j1 = 0;
				k1 = 0;
				i2 = 1;
				j2 = 0;
				k2 = 1;
			} else {
				i1 = 0;
				j1 = 0;
				k1 = 1;
				i2 = 1;
				j2 = 0;
				k2 = 1;
			}
		} else {
			if (y0 < z0) {
				i1 = 0;
				j1 = 0;
				k1 = 1;
				i2 = 0;
				j2 = 1;
				k2 = 1;
			} else if (x0 < z0) {
				i1 = 0;
				j1 = 1;
				k1 = 0;
				i2 = 0;
				j2 = 1;
				k2 = 1;
			} else {
				i1 = 0;
				j1 = 1;
				k1 = 0;
				i2 = 1;
				j2 = 1;
				k2 = 0;
			}
		}
		const x1 = x0 - i1 + G3;
		const y1 = y0 - j1 + G3;
		const z1 = z0 - k1 + G3;
		const x2 = x0 - i2 + 2.0 * G3;
		const y2 = y0 - j2 + 2.0 * G3;
		const z2 = z0 - k2 + 2.0 * G3;
		const x3 = x0 - 1.0 + 3.0 * G3;
		const y3 = y0 - 1.0 + 3.0 * G3;
		const z3 = z0 - 1.0 + 3.0 * G3;
		const ii = i & 255;
		const jj = j & 255;
		const kk = k & 255;
		let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
		if (t0 < 0) n0 = 0.0;
		else {
			const gi0 = ii + perm[jj + perm[kk]];
			t0 *= t0;
			n0 =
				t0 *
				t0 *
				(permGrad3x[gi0] * x0 +
					permGrad3y[gi0] * y0 +
					permGrad3z[gi0] * z0);
		}
		let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
		if (t1 < 0) n1 = 0.0;
		else {
			const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1]];
			t1 *= t1;
			n1 =
				t1 *
				t1 *
				(permGrad3x[gi1] * x1 +
					permGrad3y[gi1] * y1 +
					permGrad3z[gi1] * z1);
		}
		let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
		if (t2 < 0) n2 = 0.0;
		else {
			const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2]];
			t2 *= t2;
			n2 =
				t2 *
				t2 *
				(permGrad3x[gi2] * x2 +
					permGrad3y[gi2] * y2 +
					permGrad3z[gi2] * z2);
		}
		let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
		if (t3 < 0) n3 = 0.0;
		else {
			const gi3 = ii + 1 + perm[jj + 1 + perm[kk + 1]];
			t3 *= t3;
			n3 =
				t3 *
				t3 *
				(permGrad3x[gi3] * x3 +
					permGrad3y[gi3] * y3 +
					permGrad3z[gi3] * z3);
		}
		return 32.0 * (n0 + n1 + n2 + n3);
	};
}
/**
 * Construye la tabla de permutaciones para el algoritmo de simplex noise
 * @param {Function} random - Función generadora de números aleatorios
 * @returns {Uint8Array} Tabla de permutaciones de 512 elementos
 */
function buildPermutationTable(random) {
	const tableSize = 512;
	const p = new Uint8Array(tableSize);
	for (let i = 0; i < tableSize / 2; i++) {
		p[i] = i;
	}
	for (let i = 0; i < tableSize / 2 - 1; i++) {
		const r = i + ~~(random() * (256 - i));
		const aux = p[i];
		p[i] = p[r];
		p[r] = aux;
	}
	for (let i = 256; i < tableSize; i++) {
		p[i] = p[i - 256];
	}
	return p;
}
