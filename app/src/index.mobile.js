import Client from "./network/host/Client";

import platform from "platform";
import swal from "sweetalert2";

export default async function initMobile(DriftRace) {
	DriftRace.Host = new Client(DriftRace.Ui.Store);
	DriftRace.isMobile = true;

	await DriftRace.Host.initClient();

	const remoteToken = location.href.split('/').pop();
	const serverExists = await new Promise((resolve, reject) => {
		socket.once('existsPeer', payload => {
			resolve(payload.exists);
		});

		socket.emit('existsPeer', remoteToken);
	});

	if(!serverExists) {
		swal('잘못된 주소', `${remoteToken}라는 서버가 존재하지 않습니다! 주소를 한번 더 확인해주세요!`, 'error');
	}
};
