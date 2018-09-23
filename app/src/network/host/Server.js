import Connection from "../Connection";
import HostBase from "./HostBase";
import Node from "../Node";

class Server extends HostBase {
	constructor(store) {
		super(store);

		this.nodes = [];
		this.shards = [];
	}

	async initServer() {
		await this.initHost();
		this.socket.on('channelMessage', ({messageType, payload}) => {
			if(messageType === 'connectFromNode' && payload.token) {
				this.connectFromNode(payload.token);
				return;
			}
		});
	}

	async connectFromNode(token) {
		const connection = new Connection(this, token);
		connection.on('_established', () => {
			this.nodes.push(new Node(connection));
			this.emit('connectedNode');
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
