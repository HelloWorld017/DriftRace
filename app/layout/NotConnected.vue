<template>
	<section class="NotConnected">
		<section class="ConnectionInfo" v-if="nodes.length === 0">
			<i class="ConnectionInfo__icon mdi mdi-wifi-off"></i>
			<h1 class="ConnectionInfo__title">Not Connected</h1>
			<span class="ConnectionInfo__description">스마트폰에서 하단의 링크에 접속해 연결하세요</span>
		</section>

		<span class="ConnectLink">
			<template v-if="token">
				<span class="ConnectLink__prefix">
					{{prefix}}
				</span>

				<span class="ConnectLink__token">
					{{token}}
				</span>
			</template>

			<template v-else>
				<span class="ConnectLink__loading">
					Loading...
				</span>
			</template>
		</span>
	</section>
</template>

<style lang="less" scoped>
	.NotConnected {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.ConnectionInfo {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 100px;
		color: var(--gray-100);

		&__icon {
			font-size: 15vh;
			padding: 20px 0;
		}

		&__title {
			padding: 20px 0;
			margin: 0;

			font-family: var(--font-title);
			font-weight: 400;
			font-size: 2.3rem;
			text-transform: uppercase;
		}

		&__description {
			font-family: var(--font-content);
			font-size: 1.5rem;
			font-weight: 800;
		}
	}

	.ConnectLink {
		font-size: 3rem;

		&__prefix {
			color: var(--gray-100);
			font-family: var(--font-link);
			font-weight: 200;
			font-style: italic;
		}

		&__token {
			color: var(--cyan-400);
			font-family: var(--font-monospace);
			font-weight: 500;
		}

		&__loading {
			color: var(--gray-100);
			font-family: var(--font-title);
			font-weight: 100;
		}
	}
</style>

<script>
	export default {
		computed: {
			nodes() {
				return this.$store.state.network.nodes;
			},

			token() {
				return this.$store.state.network.token;
			},

			prefix() {
				return this.$store.state.network.prefix;
			}
		}
	};
</script>
