class Game {
	constructor(client, map) {
		this.players = client.sockets.map(v => new Player(v));
	}
}

export default Game;
