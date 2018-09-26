<template>
	<div class="Background">
		<div class="Background__gradient"></div>
	</div>
</template>

<style lang="less" scoped>
	.Background, .Background__gradient {
		position: absolute;
		top: -10px;
		left: -10px;
		width: ~"calc(100vw + 20px)";
		height: ~"calc(100vh + 20px)";
	}

	.Background {
		background-size: cover;
		filter: blur(5px);
		z-index: -1;

		&__gradient {
			background: radial-gradient(rgba(0, 0, 0, 0.6) 75%, rgba(0, 12, 33, 0.6) 100%);
		}
	}
</style>
