import Connection from "../Connection";
import HostBase from "./HostBase";

class Client extends HostBase {
	async initClient() {
		await this.initHost();
	}

	async connectToShard(token) {
		const connection = new Connection(this, token, true);
		connection.on('_established', () => {
			this.parentShard = connection;
			this.emit('connectedShard');
		});

		await connection.connectToRemote();
	}
}

export default Client;
