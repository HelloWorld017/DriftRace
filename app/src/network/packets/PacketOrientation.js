import Packet from "./Packet";
import {Vector3} from "babylonjs";

import {encodeFloat, decodeFloat} from "../../utils/uint8";

class PacketOrientation extends Packet {
	constructor() {
		super();

		this.buffer = new Uint8Array(10);
		this.motion = new Vector3;
	}

	serialize() {
		const buffer = new Uint8Array(10);
		buffer[0] = this.NETWORK_ID;

		buffer.set(encodeFloat(this.motion.x), 1);
		buffer.set(encodeFloat(this.motion.y), 4);
		buffer.set(encodeFloat(this.motion.z), 7);

		this.buffer = buffer;
	}

	deserialize() {
		super.deserialize();

		this.motion = new Vector3(
			decodeFloat(buffer.slice(1, 4)),
			decodeFloat(buffer.slice(4, 7)),
			decodeFloat(buffer.slice(7, 9))
		);
	}

	get NETWORK_ID() {
		return 0x31;
	}
}

export default PacketOrientation;
