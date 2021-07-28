<template>
	<div class="coborrowerAlimony">
		<h1 class="appHeading">Coborrower Alimony/Chid Support</h1>

		<app-label class-list="dark label-outside" for="payReceiveSupport">
			{{ localCoborrowerProfile.firstName }}, do you pay or receive
			alimony or child support?
		</app-label>

		<div class="body-wrapper">
			<div class="input-group">
				<!-- <v-select
					:options="[
						{ value: 'Pay', label: 'Pay' },
						{ value: 'Receive', label: 'Receive' },
						{ value: 'NotApplicable', label: 'Not Applicable' }
					]"
					:clearable="false"
					:reduce="payOrReceiveSupport => payOrReceiveSupport.value"
					v-model="localCoborrowerAbout.payOrReceiveSupport"
				></v-select> -->
			</div>

			<view-controls
				@next-view="submitPage()"
				:local-posting="localDataIsPosting"
			/>
		</div>
	</div>
</template>

<script>
import about from "@/mixins/about";

export default {
	name: "CoborrowerAlimony",
	mixins: [about],
	methods: {
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;

				await this.postCoborrowerAbout(this.localCoborrowerAbout);

				this.editSectionProgress(11);
				this.$router.push("/property/loan-type");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.coborrowerAlimony {
	.body-wrapper {
		max-width: 325px;
		margin: 0 auto;
	}
}
</style>
