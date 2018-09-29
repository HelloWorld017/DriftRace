<template>
	<section class="Connect">
		<background></background>
		<h1 class="Connect__title">
			사용자명
		</h1>

		<p class="Connect__description">
			사용자명은 캘리브레이션 값 저장 및 폰 확인 용으로 사용됩니다.
		</p>

		<div class="Connect__form">
			<text-input class="Connect__input"
				v-model="username"
				:maxlength="16"
				:handleInput="sanitize"
				placeholder="Unnamed">
			</text-input>

			<transition name="Fade" mode="out-in">
				<text-button @click="connect" v-if="!connecting">연결</text-button>
				<spinner v-else></spinner>
			</transition>
		</div>
	</section>
</template>

<style lang="less" scoped>
	.Background {
		background-image: url("../images/background1.jpg");
	}

	.Connect {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 30px;
		height: 100vh;

		&__title {
			color: var(--gray-100);
			font-family: var(--font-content);
			font-weight: 800;
			margin: 0;
			margin-bottom: 20px;
		}

		&__description {
			color: var(--gray-100);
			word-break: keep-all;
			font-family: var(--font-content);
			font-weight: 400;
			margin: 0;
			margin-bottom: 40px;
		}

		&__form {
			display: flex;
			align-items: center;
			padding: 30px 0;
		}

		&__input {
			flex: 1;
		}
	}

	.Fade {
		&-enter {
			&-active {
				transition: all .4s ease;
			}

			opacity: 1;
		}

		&-leave {
			&-active {
				transition: all .4s ease;
			}

			opacity: 0;
		}
	}
</style>

<script>
	import Background from "../components/Background.vue";
	import Spinner from "../components/Spinner.vue";
	import TextButton from "../components/TextButton.vue";
	import TextInput from "../components/TextInput.vue";

	export default {
		data() {
			return {
				username: '',
				connecting: false
			};
		},

		methods: {
			sanitize(evt) {
				evt.target.value = evt.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
			},

			async connect() {
				this.connecting = true;
				setTimeout(async () => {
					await DriftRace.ConnectShard(this.username);
					this.connecting = false;

					this.$emit('start')
				}, 4000);
			}
		},

		components: {
			Background,
			Spinner,
			TextButton,
			TextInput
		}
	};
</script>
