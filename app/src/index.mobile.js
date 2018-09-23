import Client from "./network/host/Client";

export default async function initMobile(DriftRace) {
	DriftRace.Host = new Client(DriftRace.Ui.Store);
	DriftRace.isMobile = true;

	await DriftRace.Host.initClient();
};
