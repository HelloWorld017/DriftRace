import DesktopView from "../pages/Desktop.vue";
import Server from "./network/host/Server";
import Vue from "vue";

export default async function initDesktop(DriftRace) {
	DriftRace.Host = new Server(DriftRace.Ui.Store);
	DriftRace.isDesktop = true;

	await DriftRace.Host.initServer();

	new Vue({
		el: '#app',
		render(h) {
			return h(DesktopView);
		}
	});
};
