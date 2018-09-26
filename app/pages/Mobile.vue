<template>
	<div id="app" class="Mobile">
		<connect v-if="phase === 0" @start="phase = 1"></connect>
	</div>
</template>

<script>
	import Connect from "./Connect.vue";

	export default {
		data() {
			return {
				phase: 0
			};
		},

		components: {
			Connect
		}
	};
</script>
