import createStore from "./ui/Store";
import checkMobile from "./utils/isMobile"
import desktopInit from "./index.desktop";
import mobileInit from "./index.mobile";

import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

const DriftRace = {};
DriftRace.Ui = {};
DriftRace.Ui.Store = createStore();

if(checkMobile()) {
	mobileInit(DriftRace);
} else {
	desktopInit(DriftRace);
}

window.DriftRace = DriftRace;
