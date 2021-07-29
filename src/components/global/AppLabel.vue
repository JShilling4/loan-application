<template>
	<label :for="labelFor" :class="classList" :style="styleObject">
		<slot></slot>
	</label>
</template>

<script>
export default {
	name: "AppLabel",
	props: {
		labelFor: {
			type: String,
			default: ""
		},
		inline: {
			type: Boolean,
			default: false
		},
		classList: {
			type: String,
			default: ""
		},
		margin: {
			type: String
		}
	},
	data() {
		return {
			styleObject: {
				display: this.inline ? "inline" : "block",
				margin: this.margin
			}
		};
	}
};
</script>

<style lang="scss" scoped>
label {
	// color: var(--blue-green);
	color: var(--blue-dark);
	margin-left: 0.5rem;
	margin-bottom: 5px;
	font-size: 15px;
	&.dark {
		color: var(--label-opacity);
	}
}
</style>
