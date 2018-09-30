import createStore from "./ui/Store";
import {isMobile} from "recogi";
import desktopInit from "./index.desktop";
import mobileInit from "./index.mobile";

import Vue from "vue";
import Vuex from "vuex";

import "../less/index.less";

Vue.use(Vuex);

const DriftRace = {};
DriftRace.Ui = {};
DriftRace.Ui.Store = createStore();

Vue.prototype.$game = DriftRace;
window.DriftRace = DriftRace;

if(isMobile()) {
	mobileInit(DriftRace);
} else {
	desktopInit(DriftRace);
}
