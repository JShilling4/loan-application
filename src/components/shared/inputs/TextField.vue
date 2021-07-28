<template>
	<div :class="['input-wrapper', { light: theme == 'light' }]">
		<span v-if="isCurrency" class="dollarSign">
			<font-awesome-icon :icon="['far', 'dollar-sign']" class="icon" />
		</span>
		<span v-if="isPercentage" class="percentSign">
			<font-awesome-icon :icon="['fal', 'percentage']" class="icon" />
		</span>
		<input
			:type="type"
			:class="[classList, { hasIcon: isCurrency || isPercentage }]"
			:style="styleObject"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:tabindex="tabIndex"
		/>
	</div>
</template>

<script>
export default {
	name: "TextField",
	props: {
		borderRadius: {
			type: String,
			default: "2rem"
		},
		modelValue: {
			type: [String],
            validator: prop => typeof prop === 'string' || prop === null
		},
		type: {
			type: String,
			default: "text"
		},
		tabIndex: {
			type: String,
			default: "0"
		},
		classList: {
			type: String,
			default: ""
		},
		width: {
			type: String
		},
		textAlign: {
			type: String
		},
		isCurrency: {
			type: Boolean,
			default: false
		},
		isPercentage: {
			type: Boolean,
			default: false
		},
		theme: {
			type: String
		}
	},
	data() {
		return {
			styleObject: {
				borderRadius: this.borderRadius,
				width: this.width,
				textAlign: this.textAlign
			}
		};
	}
};
</script>

<style lang="scss" scoped>
.input-wrapper {
	position: relative;
	width: 100%;
	.dollarSign,
	.percentSign {
		position: absolute;
		top: 50%;
		color: #fff;
		transform: translateY(-43%);
	}
	.dollarSign {
		left: 1rem;
	}
	.percentSign {
		left: 0.8rem;
		transform: scale(0.8);
		font-size: 20px;
		top: 20%;
	}
	&.light {
		color: $blue-green;
		.dollarSign,
		.percentSign {
			color: $blue-green;
		}
	}
}
input {
	height: $input-height;
	outline: none;
	padding: 0.5rem 1rem 0.5rem;
	border: 1px solid $blue-dark;
	width: 100%;
	font-size: 16px;
	background-color: transparent;
	color: $blue-dark;
	&:focus {
		border-color: $teal;
		box-shadow: $input-focused-border-shadow;
	}

	&.dark {
		border-color: #fff;
		background-color: transparent;
		color: #fff;
		&:focus {
			border-color: $teal;
		}
	}

	&.short {
		width: 7rem;
	}

	&.hasIcon {
		padding-left: 2.5rem;
	}

	/* Chrome, Safari, Edge, Opera */
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	&[type="number"] {
		-moz-appearance: textfield;
		font-family: Arial, Helvetica, sans-serif;
		&.hasIcon {
			padding: 0.5rem 1rem 0.5rem 2.25rem;
		}
	}

	&::-webkit-input-placeholder {
		/* Chrome/Opera/Safari */
		color: $placeholder-opacity;
	}
	&::-moz-placeholder {
		/* Firefox 19+ */
		color: $placeholder-opacity;
	}
	&:-ms-input-placeholder {
		/* IE 10+ */
		color: $placeholder-opacity;
	}
	&:-moz-placeholder {
		/* Firefox 18- */
		color: $placeholder-opacity;
	}
}
</style>
