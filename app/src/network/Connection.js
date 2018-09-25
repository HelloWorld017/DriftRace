import EventEmitter from "events";

import packets from "./packets";

const availableServers = [
	'stun.l.google.com:19302',
	'stun1.l.google.com:19302',
	'stun2.l.google.com:19302',
	'stun3.l.google.com:19302',
	'stun4.l.google.com:19302',
	'stun.services.mozilla.com'
];

class Connection extends EventEmitter {
	constructor(hostBase, token, isRemote) {
		super();

		this.socket = hostBase.socket;
		this.local = hostBase.peerInfo;
		this.remote = token;
		this.isRemote = isRemote;
		this.established = false;

		this.connection = new RTCPeerConnection({
			iceServers: availableServers.map(v => ({
				url: `stun:${v}`
			}))
		});

		if(isRemote) {
			this.connection.ondatachannel = evt => this.channel = this.setChannelEvents(evt.channel);
		}
		else {
			this.channel = this.setChannelEvents(this.connection.createDataChannel("party", {ordered: true}));
			this.channel.binaryType = 'arraybuffer';
		}

		this.socket.on('channelMessage', ({messageType, payload}) => {
			switch(messageType) {
				case 'candidate':
					if(!payload.candidate) break;

					this.connection.addIceCandidate(payload.candidate);
					break;

				case 'description':
					if(!payload.description) break;

					this.connection.setRemoteDescription(payload.description);
					break;
			}

			if(!messageType.startsWith('_')) this.emit(messageType, payload);
		});

		this.connection.onicecandidate = evt => {
			if(!evt || !evt.candidate) return;

			this.socket.emit('channelMessage', {
				target: this.remote,
				messageType: 'candidate',
				payload: {
					candidate: evt.candidate
				}
			});
		};
	}

	onEstablished() {
		this.established = true;
		this.emit('_established');
	}

	onClosed() {
		this.emit('_closed');
	}

	setChannelEvents(channel) {
		channel.onopen = () => this.onEstablished();
		channel.onclose = () => this.onClosed();
		channel.onmessage = evt => {
			const packetId = evt.data[0];
			const packet = packets[packetId];

			if(!packet) return;

			packet.buffer = evt.data;
			packet.deserialize();

			this.emit(packet.name, packet);
		};

		return channel;
	}

	async connectFromRemote() {
		const offer = await this.connection.createOffer();
		await this.connection.setLocalDescription(offer);

		this.socket.emit('channelMessage', {
			target: this.remote,
			messageType: 'description',
			payload: {
				description: offer
			}
		});
	}

	async connectToRemote() {
		this.once('description', async payload => {
			const answer = await this.connection.createAnswer();
			await this.connection.setLocalDescription(answer);

			this.socket.emit('channelMessage', {
				target: this.remote,
				messageType: 'description',
				payload: {
					description: answer
				}
			});
		});

		this.socket.emit('channelMessage', {
			target: this.remote,
			messageType: 'connectFromNode',
			payload: {
				token: this.local
			}
		});
	}
}

export default Connection;
