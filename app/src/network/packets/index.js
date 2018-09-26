import PacketAcceleration from "./PacketAcceleration";
import PacketDeviceID from "./PacketDeviceID";
import PacketOrientation from "./PacketOrientation";

const packets = [
	PacketAcceleration,
	PacketDeviceID,
	PacketOrientation
].reduce((object, packet) => {
	object[packet.NETWORK_ID] = packet;

	return object;
}, {});

export default packets;
