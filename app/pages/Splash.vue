<template>
	<main class="Splash">
		<div class="Background">
			<div class="Background__gradient"></div>
		</div>

		<div class="Logo">
			<div class="Logo__left">
				<h1 v-for="i in 3">DriftRace</h1>
			</div>

			<h1 class="Logo__right">DriftRace</h1>
		</div>

		<span class="Tip">
			Touch Anywhere to start
		</span>
	</main>
</template>

<style lang="less" scoped>
	.Logo {
		color: var(--gray-100);
		position: relative;
		font-size: 5rem;
		font-family: var(--font-brand);

		h1 {
			position: fixed;
			left: 0;
			width: 100%;
			text-align: center;

			font-weight: 400;
			margin-top: 0;
			margin-bottom: 0;
		}

		&__left h1 {
			mix-blend-mode: screen;
			clip-path: polygon(~"calc(50% + 5rem)" 0, ~"calc(50% - 5rem)" 100%, 0 100%, 0 0);

			&:nth-child(1) {
				color: #ff0000;
				animation: breath 13s ease 0s infinite;
			}

			&:nth-child(2) {
				color: #00ff00;
				animation: breath 16s linear -4s infinite;
			}

			&:nth-child(3) {
				color: #0000ff;
				animation: breath 9s ease-in-out -2s infinite;
			}
		}

		&__right {
			clip-path: polygon(~"calc(50% + 5rem)" 0, ~"calc(50% - 5rem)" 100%, 100% 100%, 100% 0);
			margin-left: 10px;
		}

		user-select: none;
	}

	.Tip {
		color: var(--gray-100);

		font-family: var(--font-title);
		font-size: 2.4rem;
		font-style: italic;
		font-weight: bold;

		text-transform: uppercase;

		position: relative;
	}

	.Splash {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;

		padding: 20vh 0;
		width: 100vw;
		height: 100vh;

		cursor: pointer;
	}

	.Background, .Background__gradient {
		position: absolute;
		top: -6px;
		left: -6px;
		width: ~"calc(100vw + 15px)";
		height: ~"calc(100vh + 15px)";
	}

	.Background {
		background-image: url("../images/background0.jpg");
		background-size: cover;
		filter: blur(5px);

		&__gradient {
			background: radial-gradient(rgba(23, 23, 86, 0.5) 0%, rgba(14, 14, 15, 0.5) 75%);
		}
	}

	@keyframes breath {
		0% {
			transform: translate(4px, 0);
		}

		20% {
			transform: translate(1px, 1px);
		}

		50% {
			transform: translate(3px, 2px);
		}

		75% {
			transform: translate(0, -2px);
		}

		80% {
			transform: translate(-4px, 1px);
		}

		90% {
			transform: translate(0px, -3px);
		}

		100% {
			transform: translate(4px, 0);
		}
	}
</style>
