<template>
	<label class="radioButton" :for="id" :class="classList">
		<input
			type="radio"
			:id="id"
			:name="name"
			@change="valueChanged()"
			:style="inputStyles"
			:checked="modelValue == label"
		/>
		<span :style="labelStyles">{{ label }}</span>
	</label>
</template>

<script>
export default {
	name: "RadioButton",
	props: {
		label: {
			type: String
		},
		id: {
			type: String
		},
		name: {
			type: String
		},
		modelValue: {
			type: String
		},
		width: {
			type: String,
			default: "11rem"
		},
		classList: {
			type: String
		}
	},
	data() {
		return {
			inputStyles: {},
			labelStyles: {
				width: this.width
			}
		};
	},
	methods: {
		valueChanged() {
			this.$emit("update:modelValue", this.label);
		}
	}
};
</script>

<style lang="scss" scoped>
input {
	display: none;
}

label {
	text-align: center;
	cursor: pointer;

	&.light {
		span {
			border-color: var(--blue-green);
			color: var(--blue-green);
		}
	}
}

label span {
	display: inline-block;
	width: 11rem;
	height: var(--input-height);
	line-height: 2.2;
	font-size: 18.7px;
	border-radius: 2rem;
	border: 1px solid #fff;
	color: #fff;
}

input:checked + span {
	background: var(--teal-hc);
	color: #fff;
	font-weight: bold;
}
</style>
