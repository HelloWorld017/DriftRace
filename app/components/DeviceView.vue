<template>
	<div class="DeviceView">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				acceleration: {
					x: 0,
					y: 0,
					z: 0
				},

				orientation: {
					x: 0,
					y: 0,
					z: 0
				}
			};
		},

		props: {
			token: {
				type: String,
				required: true
			}
		},

		mounted() {
			const node = this.$game.Host.nodes.find(v => v.token === this.token);
			this.intervalId = setInterval(() => {

			}, 75);
		},

		destroyed() {
			this.clearInterval(this.intervalId);
		}
	};
</script>
