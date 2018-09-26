<template>
	<div id="app" class="ShowInDesktop">
		<background></background>

		<h1 class="Branding">DriftRace</h1>

		<p class="Tip">
			데스크탑에서 열어주세요!
		</p>
	</div>
</template>

<style lang="less" scoped>
	.ShowInDesktop {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 0 50px;
	}

	.Background {
		background-image: url("../images/background1.jpg");
	}

	.Branding {
		font-family: var(--font-brand);
		font-size: 3rem;
		font-weight: 400;
		margin: 0;
		margin-bottom: 20vh;
		width: 100%;
		text-align: center;
		color: var(--gray-100);
	}

	.Tip {
		font-family: var(--font-content);
		font-size: 2rem;
		font-weight: 800;
		color: var(--gray-100);
		margin: 0;
		word-break: keep-all;
		text-align: center;
	}
</style>

<script>
	import Background from "../components/Background.vue";

	export default {
		components: {
			Background
		}
	};
</script>
