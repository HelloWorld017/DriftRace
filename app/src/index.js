import createStore from "./ui/Store";
import checkMobile from "./utils/isMobile"
import desktopInit from "./index.desktop";
import mobileInit from "./index.mobile";

import Vue from "vue";
import Vuex from "vuex";

import "../less/index.less";

Vue.use(Vuex);

const DriftRace = {};
DriftRace.Ui = {};
DriftRace.Ui.Store = createStore();

Vue.prototype.$drift = DriftRace;
window.DriftRace = DriftRace;

if(checkMobile()) {
	mobileInit(DriftRace);
} else {
	desktopInit(DriftRace);
}
