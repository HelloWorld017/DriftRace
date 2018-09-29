<template>
	<a class="TextButton" :class="{'TextButton--disabled': disabled}" @click="click">
		<slot></slot>
	</a>
</template>

<style lang="less" scoped>
	.TextButton {
		color: var(--cyan-400);
		font-family: var(--font-content);
		font-weight: 800;
		font-size: 1.4rem;
	}
</style>

<script>
	export default {
		props: {
			disabled: Boolean
		},

		methods: {
			click() {
				this.$emit('click');
			}
		}
	};
</script>
