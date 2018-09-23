import Vuex from "vuex";

export default function createStore() {
	const network = {
		namespaced: true,
		
		state: {
			token: ''
		},

		mutations: {
			party(state, {token}) {
				state.token = token;
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
