class Node {
	constructor(connection) {
		this.connection = connection;
		this.connection.channel.onmessage = evt => {
			console.log(evt.data);
		};
	}

	packet(packet) {
		this.connection.channel.send(packet);
	}
}

export default Node;
