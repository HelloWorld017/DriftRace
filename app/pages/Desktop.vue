<template>
	<div id="app" class="Desktop">
		<splash v-if="phase === 0" @click="phase = 1"></splash>
		<lobby v-else-if="phase === 1" @start="phase = 2"></lobby>
	</div>
</template>

<script>
	import Lobby from "./Lobby.vue";
	import Splash from "./Splash.vue";

	export default {
		data() {
			return {
				phase: 0
			};
		},

		components: {
			Splash,
			Lobby
		}
	};
</script>
