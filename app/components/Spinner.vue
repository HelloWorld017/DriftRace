<template>
	<div class="Spinner">
		<div class="Spinner__item"></div>
		<div class="Spinner__orbit"></div>
	</div>
</template>

<style lang="less" scoped>
	.Spinner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		position: relative;

		&__item {
			background: #00bcd4;
			animation: spinner 5s infinite;
		}

		&__orbit {
			border: 1px solid #00bcd4;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}

	@keyframes spinner {
		0% {
			opacity: 0;
		}

		15% {
			width: 40px;
			height: 40px;
			border-radius: 0;
			opacity: 1;
		}

		30% {
			border-radius: 50%;
		}

		45% {
			width: 7px;
			height: 7px;
			border-radius: 50%;
			transform: translate(0, 0);
		}

		50% {
			width: 7px;
			height: 7px;
			border-radius: 50%;
			transform: rotate(0deg) translate(-20px, 0);
		}

		85% {
			width: 7px;
			height: 7px;
			border-radius: 50%;
			transform: rotate(360deg) translate(-20px, 0);
			opacity: 1;
		}

		90% {
			width: 7px;
			height: 7px;
			border-radius: 50%;
			transform: translate(0, 0);
			opacity: 1;
		}

		100% {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			transform: translate(0, 0);
			opacity: 0;
		}
	}
</style>
