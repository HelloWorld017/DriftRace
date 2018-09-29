import Packet from "./Packet";

class PacketOrientation extends Packet {
	constructor() {
		super();

		this.motion = {};
	}

	serializePayload() {
		this.putFloat(this.motion.x);
		this.putFloat(this.motion.y);
		this.putFloat(this.motion.z);
	}

	deserializePayload() {
		this.motion.x = this.getFloat();
		this.motion.y = this.getFloat();
		this.motion.z = this.getFloat();
	}

	resetBuffer() {
		this.buffer = new Uint8Array(13);
	}

	get NETWORK_ID() {
		return 0x31;
	}

	get name() {
		return "Orientation";
	}
}

export default PacketOrientation;
