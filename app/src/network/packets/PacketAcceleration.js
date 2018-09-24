import Packet from "./Packet";
import {Vector3} from "babylonjs";

import {encodeFloat, decodeFloat} from "../../utils/uint8";

class PacketAcceleration extends Packet {
	constructor() {
		super();

		this.buffer = new Uint8Array(10);
		this.motion = new Vector3;
	}

	serializePayload() {
		this.putFloat(this.motion.x);
		this.putFloat(this.motion.y);
		this.putFloat(this.motion.z);
	}

	deserialize() {
		super.deserialize();

		this.motion = new Vector3(
			this.getFloat(),
			this.getFloat(),
			this.getFloat()
		);
	}

	get NETWORK_ID() {
		return 0x30;
	}
}

export default PacketAcceleration;
