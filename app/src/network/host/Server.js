import Connection from "../Connection";
import HostBase from "./HostBase";

const MAX_PLAYER = 4;

class Server extends HostBase {
	constructor(store) {
		super(store);

		this.nodes = [];
		this.shards = [];
	}

	async initServer() {
		await this.initHost();
		this.socket.on('channelMessage', ({messageType, payload, from}) => {
			if(messageType === 'connectFromNode' && payload.token) {
				if(this.nodes.length >= MAX_PLAYER) {
					socket.emit('channelMessage', {
						target: from,
						messageType: 'serverFull',
						payload: {}
					});

					return;
				}

				this.connectFromNode(payload.token);
				return;
			}
		});
	}

	async connectFromNode(token) {
		const connection = new Connection(this, token);
		connection.on('_established', () => {
			this.nodes.push(connection);
			this.store.commit('network/addNode', {
				token: connection.remote,
				name: 'Connecting...',
				device: 'Unknown Device'
			});

			this.emit('connectedNode');
		});

		connection.on('DeviceID', pk => {
			this.store.commit('network/updateNode', {
				token: connection.remote,
				name: pk.playerName,
				device: pk.deviceName
			});
		});

		await connection.connectFromRemote();
	}

	async connectFromShard(token) {

	}

	async connectToShard(token) {

	}

	async broadcastToNodes() {

	}

	get isHostingShard() {
		return this.parentShard === undefined;
	}
}

export default Server;
