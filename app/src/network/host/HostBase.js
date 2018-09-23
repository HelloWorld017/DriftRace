import EventEmitter from "events";

import io from "socket.io-client";

const DRIFTRACE_SERVER = 'http://localhost:80/';

class HostBase extends EventEmitter {
	constructor(store) {
		super();

		this.socket = io(DRIFTRACE_SERVER);
		this.parentShard = undefined;

		this.store = store;
	}

	initHost() {
		return new Promise((resolve, reject) => {
			this.socket.once('registerPeer', peerInfo => {
				this.peerInfo = peerInfo;
				this.store.commit('network/party', {
					token: this.peerInfo
				});

				resolve();
			});

			this.socket.emit('registerPeer');
		});
	}
}

export default HostBase;
