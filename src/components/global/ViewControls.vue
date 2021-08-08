<template>
	<div class="button-container">
		<app-button
			v-if="includeNext"
			class-list="orange-fill"
			:is-posting="localPosting"
			indicator-type="button"
			:append-icon="true"
			@click="onForwardClick($event)"
		>
			{{ $t(`global.${camelize(nextText.toLowerCase())}`) }}
		</app-button>
		<app-button
			v-if="includeBack && !localPosting"
			class-list="white-fill backButton"
            :theme="theme"
			:prepend-icon="true"
			@click="onBackClick($event)"
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
    emits: ["advance-app", "retreat-app"],
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
		},
        theme: {
            type: String,
        },
	},
    methods: {
        onForwardClick() {
            this.$emit('advance-app');
        },
        onBackClick() {
            this.$emit('retreat-app')
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
