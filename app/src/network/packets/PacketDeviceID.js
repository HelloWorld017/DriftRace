import Packet from "./Packet";

class PacketDeviceID extends Packet{
	constructor() {
		super();

		this.deviceName = '';
		this.playerName = '';
	}

	serializePayload() {
		this.putString(this.deviceName);
		this.putString(this.playerName);
	}

	deserializePayload() {
		this.deviceName = this.getString().slice(0, 24).replace(/[^A-z0-9a-z _-]/g, '');
		this.playerName = this.getString().slice(0, 16).replace(/[^A-Z0-9a-z-_]/g, '');

		if(this.deviceName) this.deviceName = 'Unknown Device';
		if(this.playerName === '') this.playerName = 'Unnamed';
	}

	resetBuffer() {
		this.buffer = new Uint8Array(
			1 + Packet.stringLength(this.deviceName) + Packet.stringLength(this.playerName)
		);
	}

	get NETWORK_ID() {
		return 0x20;
	}

	get name() {
		return "DeviceID";
	}
}

export default PacketDeviceID;
