const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");

class Packet {
	constructor() {
		this.buffer = null;
		this.bufferArray = null;
		this.view = null;
		this.offset = 0;
	}

	serialize() {
		this.reset();
		this.serializeHeader();
		this.serializePayload();
	}

	serializeHeader() {
		this.putShort(this.NETWORK_ID);
	}

	serializePayload() {}

	deserialize() {
		this.deserializeHeader();
		this.deserializePayload();
	}

	deserializeHeader() {
		const networkId = this.buffer.get();
		if(networkId !== this.NETWORK_ID) throw new Error("Invalid Network ID!");
	}

	deserializePayload() {}

	setBuffer(buffer) {
		this.buffer = buffer;
		this.view = new DataView(buffer);
		this.bufferArray = new Uint8Array(buffer);
	}

	reset() {
		this.resetBuffer();
		this.offset = 0;
	}

	resetBuffer() {}

	put(byte) {
		this.view.setUint8(this.offset, byte);
		this.offset++;
	}

	get() {
		this.view.getUint8(this.offset);
		this.offset++;
	}

	putUShort(s) {
		this.view.setUint16(this.offset, s);
		this.offset += 2;
	}

	getUShort() {
		this.view.getUint16(this.offset);
		this.offset += 2;
	}

	putShort(s) {
		this.view.setInt16(this.offset, s);
		this.offset += 2;
	}

	getShort() {
		this.view.getInt16(this.offset);
		this.offset += 2;
	}

	putUInt(i) {
		this.view.setUint32(this.offset, i);
		this.offset += 4;
	}

	getUInt(i) {
		this.view.getUint32(this.offset);
		this.offset += 4;
	}

	putInt(i) {
		this.view.setInt32(this.offset, i);
		this.offset += 4;
	}

	getInt(i) {
		this.view.getInt32(this.offset);
		this.offset += 4;
	}

	putFloat(f) {
		this.view.setFloat32(this.offset, f);
		this.offset += 4;
	}

	getFloat(range) {
		this.view.getFloat32(this.offset);
		this.offset += 4;
	}

	putBool(b) {
		return this.put(b ? 0x01 : 0x00);
	}

	getBool() {
		return this.get() === 0x01;
	}

	putString(s) {
		const buffer = textEncoder.encode(s);
		this.putUShort(buffer.length);

		this.bufferArray.set(this.offset, buffer);
		this.offset += buffer.length;
	}

	getString() {
		const len = this.getUShort();
		const buffer = this.bufferArray.slice(this.offset, this.offset + len);

		this.offset += len;

		return textDecoder.decode(buffer);
	}

	putBuffer(buffer) {
		this.putUShort(buffer.length);

		this.bufferArray.set(this.offset, buffer);
	}

	getBuffer() {
		const len = this.getUShort();
		const buffer = this.bufferArray.slice(this.offset, this.offset + len);

		this.offset += len;
		return buffer;
	}

	static stringLength(string) {
		return textEncoder.encode(e).length + 2;
	}

	get NETWORK_ID() {
		return 0x00;
	}
}

export default Packet;
