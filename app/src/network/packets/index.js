import PacketAcceleration from "./PacketAcceleration";
import PacketDeviceIdentification from "./PacketDeviceIdentification";
import PacketOrientation from "./PacketOrientation";

const packets = [
	PacketAcceleration,
	PacketDeviceIdentification,
	PacketOrientation
].reduce((object, packet) => {
	object[packet.NETWORK_ID] = packet;

	return object;
}, {});

export default packets;
