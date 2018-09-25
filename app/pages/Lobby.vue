<template>
	<main class="Lobby">
		<header>
			<div class="Header">
				<h1 class="Branding">
					DriftRace
				</h1>
				<hr class="NavDivider">
				<h2 class="NavTitle">
					연결된 노드
					<span class="NavConnection">
						{{nodes.length}} / 4
					</span>
				</h2>
			</div>

			<div class="Start">
				<button>
					게임 시작 <i class="mdi mdi-chevron-double-right"></i>
				</button>
			</div>
		</header>

		<div class="Container">
			<not-connected v-if="nodes.length === 0"></not-connected>
			<div class="NodeCards" v-else>
				<node-card v-for="node in nodes" :node="node"></node-card>
			</div>
		</div>
	</main>
</template>

<style lang="less" scoped>
	header {
		display: flex;
		align-items: center;
	}

	.Header {
		flex: 1;
	}

	.NavTitle {
		font-family: var(--font-brand);
		font-size: 1.2rem;

		color: var(--gray-100);
	}

	.NavDivider {
		display: block;
		background: var(--gray-100);

		width: 100px;
		height: 30px;
	}

	.NavTitle {
		font-family: var(--font-content);
		font-weight: 800;
		font-size: 1.2rem;

		color: var(--gray-100);
		margin-left: 20px;
	}

	.NavConnection {
		font-weight: 100;
	}

	.Lobby {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100vw;
		height: 100vh;

		background-image: url("../images/background1.jpg");
	}

	.Container {
		flex: 1;
	}
</style>

<script>
	import NodeCard from "../layout/NodeCard.vue";
	import NotConnected from "../layout/NotConnected.vue";

	export default {
		computed: {
			nodes() {
				return this.$store.state.network.nodes;
			}
		},

		components: {
			NodeCard,
			NotConnected
		}
	};
</script>
