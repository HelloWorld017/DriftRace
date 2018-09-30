<template>
	<main class="Lobby">
		<background></background>

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

			<div class="Start" v-if="nodes.length > 1">
				<button>
					게임 시작 <i class="mdi mdi-chevron-double-right"></i>
				</button>
			</div>
		</header>

		<div class="Container">
			<transition name="FadeTranslate--right">
				<not-connected v-if="nodes.length === 0"></not-connected>
			</transition>

			<transition name="FadeTranslate--up">
				<div class="NodeCards" v-if="nodes.length !== 0">
					<node-card v-for="node in nodes" :key="node.token" :node="node"></node-card>
				</div>
			</transition>
		</div>
	</main>
</template>

<style lang="less" scoped>
	header {
		display: flex;
		align-items: center;
		padding: 0 10vw;
		box-sizing: border-box;
		width: 100%;
	}

	.Header {
		flex: 1;
	}

	.Branding {
		font-family: var(--font-brand);
		font-size: 2rem;
		font-weight: 400;

		color: var(--gray-100);
	}

	.NavDivider {
		display: inline-block;
		background: var(--gray-100);

		width: 100px;
		height: 20px;
	}

	.NavTitle {
		font-family: var(--font-content);
		font-weight: 800;
		font-size: 2.2rem;

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
	}

	.Background {
		background-image: url("../images/background1.jpg");
	}

	.Container {
		flex: 1;
	}

	.FadeTranslate {
		&--left {
			&-enter {
				&-active {
					transition: all .4s ease;
				}

				opacity: 1;
				transform: translateX(0);
			}

			&-leave {
				&-active {
					transition: all .4s ease;
				}

				opacity: 0;
				transform: translateX(10px);
			}
		}
	}
</style>

<script>
	import Background from "../components/Background.vue";
	import NodeCard from "../layout/NodeCard.vue";
	import NotConnected from "../layout/NotConnected.vue";

	export default {
		computed: {
			nodes() {
				return this.$store.state.network.nodes;
			}
		},

		components: {
			Background,
			NodeCard,
			NotConnected
		}
	};
</script>
