import DesktopView from "../pages/Desktop.vue";
import {Server} from "recogi";
import Vue from "vue";

export default async function initDesktop(DriftRace) {
	DriftRace.Host = new Server(`${location.hostname}:5477`);
	DriftRace.isDesktop = true;

	const mapStore = (store, eventName) => node => {
		store.commit(eventName, node);
	};

	const token = await DriftRace.Host.initServer();
	DriftRace.Ui.Store.commit('network/info', token);
	DriftRace.Host.on('connectedNode', mapStore(DriftRace.Ui.Store, 'addNode'));

	new Vue({
		el: '#app',
		store: DriftRace.Ui.Store,
		render(h) {
			return h(DesktopView);
		}
	});
};
