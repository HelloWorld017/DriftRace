import Connection from "../Connection";
import HostBase from "./HostBase";
import Node from "../Node";

const MAX_PLAYER = 4;

class Server extends HostBase {
	constructor(store) {
		super(store);

		this.nodes = {};
	}

	async initServer() {
		await this.initHost();
		this.socket.on('channelMessage', ({messageType, payload, from}) => {
			if(messageType === 'connectFromNode' && payload.token) {
				if(this.length >= MAX_PLAYER) {
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
			const node = new Node(connection, this.length);

			this.store.commit('network/addNode', {
				token: connection.remote,
				deviceName: node.deviceName,
				playerName: node.playerName,
				index: node.index
			});

			this.nodes[connection.remote] = node;

			this.emit('connectedNode');
		});

		connection.on('DeviceID', pk => {
			this.nodes[connection.remote].deviceName = pk.deviceName;
			this.nodes[connection.remote].playerName = pk.playerName;

			this.store.commit('network/updateNode', {
				token: connection.remote,
				deviceName: node.deviceName,
				playerName: node.playerName
			});
		});

		await connection.connectFromRemote();
	}

	async broadcastToNodes() {

	}

	get length() {
		return Object.keys(this.nodes).length;
	}

	get isHostingShard() {
		return this.parentShard === undefined;
	}
}

export default Server;
