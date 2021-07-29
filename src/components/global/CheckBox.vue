<template>
	<div :class="['checkbox-container', classList]">
		<div class="mark" @click="clickInput()">
			<font-awesome-icon
				v-if="checked"
				:icon="['fas', 'check']"
				class="icon"
			/>
		</div>
		<input
			ref="input"
			class="checkbox"
			type="checkbox"
			:checked="checked"
			@input="(event) => $emit('update:checked',event.target.checked)"
			:id="id"
		/>
		<label :for="id">{{ label }}</label>
	</div>
</template>

<script>
export default {
	name: "CheckBox",
	props: {
		label: { type: String },
		id: { type: String },
		checked: { type: Boolean },
		classList: { type: String }
	},
	methods: {
        clickInput() {
            this.$refs.input.click();
        }
	}
};
</script>

<style lang="scss" scoped>
.checkbox-container {
	display: flex;
	align-items: flex-start;

	&.light {
		.mark {
			border-color: var(--blue-green);
			color: #fff;
		}
	}
}
.mark {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 40px;
	min-width: 40px;
	border: 1px solid #fff;
	border-radius: 50%;
	margin-right: 1.5rem;
	cursor: pointer;

	.icon {
		padding: 6px;
		border-radius: 50%;
		background-color: var(--teal);
		font-size: 30px;
	}
}

.checkbox {
	position: absolute;
	margin: 0;
	padding: 0;
	opacity: 0;
	height: 0;
	width: 0;
	pointer-events: none;

	& + label {
		position: relative;
		user-select: none;
		cursor: pointer;
		display: inline-flex;
		align-items: flex-start; // align button and label to top
		line-height: 1.4;
	}

	// &:checked + label::before {
	// 	background-color: var(--teal);
	// }

	// &:focus + label::before {
	// 	border-color: teal;
	// 	box-shadow: 0 0 0 3px alpha($color: var(--teal));
	// }
}
</style>
