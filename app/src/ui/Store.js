import Vuex from "vuex";

export default function createStore() {
	const network = {
		namespaced: true,

		state: {
			token: '',
			shards: []
		},

		mutations: {
			info(state, {token}) {
				state.token = token;
			},

			newShard(state, {token}) {

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
