<template>
	<div class="referral">
		<h1 class="appHeading">Loan Officer Selection</h1>

		<div class="body-wrapper">
			<div class="input-group">
				<app-label class-list="dark" for="referralSource"
					>Loan Officer</app-label
				>
				<multi-select
					:options="sourceOptions"
					:can-clear="false"
					v-model="localAbout.loanOfficer"
				/>
			</div>
			<view-controls
				@next-view="submitPage()"
				:local-posting="localDataIsPosting"
			/>
		</div>
	</div>
</template>

<script>
import about from "@/includes/mixins/application/about";

export default {
	name: "Referral",
	mixins: [about],
	data() {
		return {
			sourceOptions: [
				{
					label: "Clint Morgan",
					value: "clintmorgan"
				},
				{
					label: "Adam Garman",
					value: "adamgarman"
				},
				{
					label: "Ryan Frantz",
					value: "ryanfrantz"
				}
			]
		};
	},
	methods: {
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;
				await this.postBorrowerAbout(this.localAbout);
				this.editSectionProgress(2);
				this.$router.push("/about/veteran");
			}
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
