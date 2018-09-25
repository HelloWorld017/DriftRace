import Vuex from "vuex";

export default function createStore() {
	const network = {
		namespaced: true,

		state: {
			token: '',
			prefix: `${location.hostname}/`,
			nodes: []
		},

		mutations: {
			info(state, {token}) {
				state.token = token;
			},

			addNode(state, {token, deviceName, playerName}) {
				this.nodes.push({token, deviceName, playerName});
			},

			updateNode(state, {token, deviceName, playerName}) {
				const node = this.nodes.find(v => v.token === token);
				node.deviceName = deviceName;
				node.playerName = playerName;
			}
		}
	};

	const store = new Vuex.Store({
		modules: {
			network
		}
	});

	return store;
};
