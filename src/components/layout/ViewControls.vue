<template>
	<div class="button-container">
		<app-button
			v-if="includeNext"
			class-list="orange-fill"
			:is-posting="localPosting"
			indicator-type="button"
			:append-icon="true"
			@click="$emit('next-view')"
		>
			{{ nextText }}
		</app-button>
		<app-button
			v-if="includeBack && !localPosting"
			class-list="white-fill backButton"
			:prepend-icon="true"
			@click="$router.go(-1)"
		>
			{{ backText }}
		</app-button>
	</div>
</template>

<script>
export default {
	name: "ViewControls",
	props: {
		nextText: {
			type: String,
			default: "Next"
		},
		backText: {
			type: String,
			default: "Back"
		},
		includeNext: {
			type: Boolean,
			default: true
		},
		includeBack: {
			type: Boolean,
			default: true
		},
		localPosting: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss" scoped>
.button-container {
	margin-top: 5rem;
	button:first-child {
		margin-bottom: 1.5rem;
	}
}
</style>
