<template>
	<div class="coborrowerPresent">
		<h1 class="appHeading">Co-borrower Authorization</h1>
		<form class="coborrowerPresentForm">
			<p class="pageCopy">
				We will need to collect information about your co-borrower such
				as income and assets. Do you have access and authorization to
				provide this information on behalf of
				{{ coborrowerData.profile.firstName }}?
			</p>

			<div class="control-wrapper">
				<div class="choice-container">
					<app-button
						@click="selectIfHasAuth('yes')"
						:class-list="[
							localAbout.hasCoborrowerAuthorization == true
								? 'teal-fill'
								: 'white-outline',
							'choice'
						]"
					>
						Yes
					</app-button>

					<app-button
						@click="selectIfHasAuth('no')"
						:class-list="[
							localAbout.hasCoborrowerAuthorization == false
								? 'teal-fill'
								: 'white-outline',
							'choice'
						]"
					>
						No
					</app-button>
				</div>

				<view-controls
					@next-view="submitPage()"
					:local-posting="localDataIsPosting"
				/>
			</div>
		</form>
	</div>
</template>

<script>
import about from "@/includes/applicationMixins/about";

export default {
	name: "CoborrowerAuth",
	mixins: [about],
	methods: {
		selectIfHasAuth(choice) {
			choice == "yes"
				? (this.localAbout.hasCoborrowerAuthorization = true)
				: (this.localAbout.hasCoborrowerAuthorization = false);
		},

		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;

				await this.postBorrowerAbout(this.localAbout);

				this.editSectionProgress(7);
				this.$router.push("/about/dependents");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.coborrowerPresent {
	.coborrowerPresentForm {
		width: 750px;
		margin: 0 auto;
	}
	.control-wrapper {
		max-width: 440px;
		margin: 0 auto;
	}
	.choice-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 4rem auto 0;
		.choice {
			margin: 0 1rem 2rem;
			width: 20rem;
		}
	}
}
</style>
