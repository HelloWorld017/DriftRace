import Packet from "./Packet";
import {Vector3} from "babylonjs";

class PacketAcceleration extends Packet {
	constructor() {
		super();

		this.motion = new Vector3;
	}

	serialize() {

	}

	deserialize() {

	}

	get NETWORK_ID() {
		return 0x30;
	}
}

export default PacketAcceleration;
