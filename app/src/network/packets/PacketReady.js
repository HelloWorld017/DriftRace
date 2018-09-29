import Packet from "./Packet";

class PacketReady extends Packet{
	constructor() {
		super();

		this.ready = true;
	}

	serializePayload() {
		this.putBoolean(this.ready);
	}

	deserializePayload() {
		this.ready = this.getBoolean();
	}

	resetBuffer() {
		this.buffer = new Uint8Array(2);
	}

	get NETWORK_ID() {
		return 0x21;
	}

	get name() {
		return "Ready";
	}
}

export default PacketReady;
