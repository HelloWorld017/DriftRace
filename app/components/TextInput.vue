<template>
	<div class="TextInput">
		<label>
			<input ref="input"
				v-model="_content"
				type="text"
				:maxlength="maxlength"
				:placeholder="placeholder"
				@input="handleInput">

			<div class="indicator">
				<div class="focus-indicator"></div>
				<div class="length-indicator" :style="transformObject"></div>
			</div>
		</label>
	</div>
</template>

<style lang="less" scoped>
	*::selection {
		background: rgba(255, 255, 255, .1);
	}

	.TextInput {
		margin-right: 30px;

		input {
			border: none;
			background: transparent;
			outline: none;
			padding: 15px;
			font-size: 1.1rem;
			font-family: var(--font-content);
			color: var(--gray-100);
			font-weight: 100;
			position: relative;
			border-bottom: 2px solid rgba(255, 255, 255, .1);
			width: 100%;
			box-sizing: border-box;

			& + .indicator {
				position: relative;

				.focus-indicator {
					content: '';
					display: block;
					position: absolute;
					background: var(--cyan-400);
					width: 100%;
					height: 2px;
					bottom: 0;
					left: 0;
					transition: transform .5s ease;
					transform: scaleX(0);
				}

				.length-indicator {
					content: '';
					display: block;
					position: absolute;
					background: var(--cyan-700);
					width: 100%;
					height: 2px;
					bottom: 0;
					left: 0;
					transition: transform .4s, opacity .4s ease;
					opacity: .4;
					transform: scaleX(0);
				}

			}

			&:focus + .indicator {
				.focus-indicator {
					transform: scaleX(1);
				}

				.length-indicator {
					opacity: 1;
				}
			}
		}
	}
</style>

<script>
	export default {
		model: {
			prop: 'content',
			event: 'change'
		},

		props: {
			content: String,
			placeholder: String,

			maxlength: {
				type: Number,
				default: 100
			},

			handleInput: {
				type: Function,
				default: () => {}
			}
		},

		computed: {
			_content: {
				get() {
					return this.content;
				},
				set(v) {
					this.$emit('change', v);
				}
			},

			length() {
				return this.content.length;
			},

			percent() {
				return `${this.length / this.maxlen * 100}%`;
			},

			transformObject() {
				return {
					transform: `scaleX(${this.length / this.maxlen})`
				};
			}
		}
	};
</script>
