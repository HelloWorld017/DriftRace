<template>
	<div class="NodeCard">
		<h1 class="NodeCard__Name">
			<span class="NodeCard__Index">
				#{{node.index}}
			</span>
			{{node.playerName}}
		</h1>

		<span class="NodeCard__Device">
			{{node.deviceName}}
		</span>

		<device-view :token="token"></device-view>

		<div class="NodeCard__actions">
			<text-button>기기 차단</text-button>
		</div>
	</div>
</template>

<script>
	import DeviceView from "../components/DeviceView.vue";
	import TextButton from "../components/TextButton.vue";

	export default {
		computed: {
			node() {
				return this.$store.state.network.nodes.find(v => v.token === this.token);
			}
		},

		props: {
			token: {
				type: String,
				required: true
			}
		},

		components: {
			DeviceView,
			TextButton
		}
	};
</script>
