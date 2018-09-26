import Client from "./network/host/Client";
import MobileView from "../pages/Mobile.vue";
import PacketDeviceID from "./network/packets/PacketDeviceID";
import ShowInDesktop from "../pages/ShowInDesktop.vue";
import Vue from "vue";

import platform from "platform";
import swal from "sweetalert2";

export default async function initMobile(DriftRace) {
	DriftRace.Host = new Client(DriftRace.Ui.Store);
	DriftRace.isMobile = true;

	await DriftRace.Host.initClient();

	let remoteToken = location.href.split('/').pop();
	if(remoteToken.startsWith('#') || !remoteToken) remoteToken = location.href.split('#').pop();

	let serverExists = false;

	if(remoteToken) {
		serverExists = await new Promise((resolve, reject) => {
			DriftRace.Host.socket.once('existsPeer', payload => {
				resolve(payload.exists);
			});

			DriftRace.Host.socket.emit('existsPeer', remoteToken);
		});

		if(!serverExists) {
			swal('잘못된 주소', `${remoteToken}라는 서버가 존재하지 않습니다! 주소를 한번 더 확인해주세요!`, 'error');
		}
	}

	DriftRace.ConnectShard = async username => {
		DriftRace.Host.on('_established', () => {
			const pk = new PacketDeviceID();
			pk.deviceName = `${platform.manufacturer} ${platform.product}`;
			pk.playerName = username;

			DriftRace.Host.parentShard.packet(pk);
		});

		await DriftRace.Host.connectToShard(remoteToken);
	};

	new Vue({
		el: '#app',
		store: DriftRace.Ui.Store,
		render(h) {
			if(remoteToken && serverExists) {
				return h(MobileView);
			} else {
				return h(ShowInDesktop);
			}
		}
	});
};
