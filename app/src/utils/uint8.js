const textEncoder = new TextEncoder();
const textDecoder = new textDecoder("utf-8");

export function encodeFloat(i, range, precision=3) {
	const base255 = i / range * 255;
	const uint8 = new Uint8Array(precision);

	let round = base255;
	for(let i = 0; i < precision; i++) {
		uint8[i] = Math.floor(round);
		round = (round - uint8[i]) * 255;
	}

	return uint8;
}

export function decodeFloat(arr, range) {
	return arr.reduce((prev, curr, i) => {
		return prev + curr / Math.pow(255, i);
	}) / 255 * range;
}

export function encodeString(string) {
	textEncoder.encode(string);
}
