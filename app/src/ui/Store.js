import Vuex from "vuex";

export default function createStore() {
	const network = {
		namespaced: true,

		state: {
			token: '',
			prefix: `${location.hostname}${location.port ? `:${location.port}` : ''}/`,
			nodes: []
		},

		mutations: {
			info(state, token) {
				state.token = token;
			},

			addNode(state, node) {
				state.nodes.push({
					index: node.index,
					playerName: node.playerName,
					deviceName: node.deviceName,
					token: node.token
				});
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
