import Server from "./network/host/Server";

export default async function initDesktop(DriftRace) {
	DriftRace.Host = new Server(DriftRace.Ui.Store);
	DriftRace.isDesktop = true;

	await DriftRace.Host.initServer();
};
