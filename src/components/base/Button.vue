<template>
	<button
		:type="type"
		:style="styleObject"
		:class="['appButton', classList, { posting: isPosting }]"
	>
		<span v-if="!isPosting">
			<slot>Button</slot>
			<font-awesome-icon
				v-if="appendIcon"
				:icon="['fas', 'angle-right']"
				class="icon right"
			/>
			<font-awesome-icon
				v-if="prependIcon"
				:icon="['fas', 'angle-left']"
				class="icon left"
			/>
		</span>

		<loading-indicator v-if="isPosting" :indicator-type="indicatorType" />

		<transition name="fade">
			<span v-if="isPosting">
				Submitting...
			</span>
		</transition>
	</button>
</template>

<script>
export default {
	name: "AppButton",
	props: {
		type: {
			type: String,
			default: "button"
		},
		classList: {
			type: [String, Array],
			default: "orange-fill"
		},
		borderRadius: {
			type: String,
			default: "2rem"
		},
		padding: {
			type: String,
			default: ""
		},
		border: {
			type: String,
			default: "1px solid #000"
		},
		backgroundColor: {
			type: String,
			default: "transparent"
		},
		appendIcon: {
			type: Boolean,
			default: false
		},
		prependIcon: {
			type: Boolean,
			default: false
		},
		fontSize: {
			type: String
		},
		width: {
			type: String
		},
		isPosting: {
			type: Boolean
		},
		indicatorType: {
			type: String
		}
	},
	data() {
		return {
			styleObject: {
				borderRadius: this.borderRadius,
				padding: this.padding,
				fontSize: this.fontSize,
				width: this.width
			}
		};
	}
};
</script>

<style lang="scss" scoped>
button {
	position: relative;
	outline: none;
	transition: color 0.3s, background-color 0.3s, border-color 0.3s;
	cursor: pointer;
	font-weight: bold;
	height: $input-height;
	width: 100%;
	font-size: 18.7px;
	letter-spacing: 0.75px;

	.icon {
		position: absolute;
		&.right {
			right: 1.5rem;
		}
		&.left {
			left: 1.5rem;
		}
	}

	/* &.posting {
	} */
}
</style>
