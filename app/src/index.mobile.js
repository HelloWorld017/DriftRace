import {Client} from "recogi";
import MobileView from "../pages/Mobile.vue";
import ShowInDesktop from "../pages/ShowInDesktop.vue";
import Vue from "vue";

import swal from "sweetalert2";

export default async function initMobile(DriftRace) {
	DriftRace.Host = new Client(DriftRace.Ui.Store);
	DriftRace.isMobile = true;

	await DriftRace.Host.initClient();

	let remoteToken = location.href.split('/').pop();
	if(remoteToken.startsWith('#')) remoteToken = location.href.split('#').pop();

	let serverExists = false;

	if(remoteToken) {
		serverExists = await DriftRace.Host.checkExists(remoteToken);

		if(!serverExists) {
			swal('잘못된 주소', `${remoteToken}라는 서버가 존재하지 않습니다! 주소를 한번 더 확인해주세요!`, 'error');
		}
	}

	DriftRace.ConnectShard = username => DriftRace.Host.connectToShard(remoteToken, username);

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
