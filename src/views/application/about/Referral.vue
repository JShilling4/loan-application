<template>
	<div class="referral">
		<h1 class="appHeading">How did you hear about Ruoff Mortgage?</h1>

		<div class="body-wrapper">
			<div class="input-group">
				<app-label class-list="dark" for="referralSource"
					>Referral Source</app-label
				>
				<!-- <v-select
					:options="sourceOptions"
					:clearable="false"
					:reduce="referralSource => referralSource.value"
					v-model="localAbout.referralSource"
				></v-select> -->
			</div>

			<view-controls
				@next-view="submitPage()"
				:include-back="false"
				:local-posting="localDataIsPosting"
			/>
		</div>
	</div>
</template>

<script>
import about from "@/mixins/about";

export default {
	name: "Referral",
	mixins: [about],
	data() {
		return {
			sourceOptions: [
				{
					label: "Online Advertisement",
					value: "Online Advertisement"
				},
				{
					label: "Social Media",
					value: "Social Media"
				},
				{
					label: "Radio",
					value: "Radio"
				},
				{
					label: "TV",
					value: "TV"
				},
				{
					label: "Realtor",
					value: "Realtor"
				},
				{
					label: "Preferred Partner",
					value: "Preferred Partner"
				},
				{
					label: "Other",
					value: "Other"
				}
			]
		};
	},
	methods: {
		async submitPage() {
			this.localDataIsPosting = true;
			this.postBorrowerAbout(this.localAbout).then(() => {
				this.editSectionProgress(1);
				this.$router.push("/about/select-loan-officer");
				this.localDataIsPosting = false;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.referral {
	.body-wrapper {
		width: 300px;
		margin: 0 auto;
	}
}
</style>
