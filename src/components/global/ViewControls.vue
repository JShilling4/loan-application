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
			{{ $t(`global.${camelize(nextText.toLowerCase())}`) }}
		</app-button>
		<app-button
			v-if="includeBack && !localPosting"
			class-list="white-fill backButton"
			:prepend-icon="true"
			@click="$router.go(-1)"
		>
			{{ $t(`global.${backText.toLowerCase()}`) }}
		</app-button>
	</div>
</template>

<script>
import { camelize } from "@/includes/mixins/helpers";

export default {
	name: "ViewControls",
    mixins: [camelize],
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
