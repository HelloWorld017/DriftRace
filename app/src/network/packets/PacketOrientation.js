import Packet from "./Packet";
import {Vector3} from "babylonjs";

class PacketOrientation extends Packet {
	constructor() {
		super();

		this.motion = new Vector3;
	}

	serializePayload() {
		this.putFloat(this.motion.x);
		this.putFloat(this.motion.y);
		this.putFloat(this.motion.z);
	}

	deserializePayload() {
		this.motion = new Vector3(
			this.getFloat(),
			this.getFloat(),
			this.getFloat()
		);
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
