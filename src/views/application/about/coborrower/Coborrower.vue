<template>
	<div class="coborrower">
		<h1 class="appHeading">Would you like to include a co-borrower?</h1>

		<div class="choice-container">
			<div class="choice-container">
				<app-button
					@click="selectIfHasCoborrower('yes')"
					:class-list="[
						localAbout.hasCoborrower == true
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
				>
					Yes
				</app-button>

				<app-button
					@click="selectIfHasCoborrower('no')"
					:class-list="[
						localAbout.hasCoborrower == false
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
				>
					No
				</app-button>
			</div>
		</div>

		<view-controls
			@next-view="submitPage()"
			:local-posting="localDataIsPosting"
		/>
	</div>
</template>

<script>
import about from "@/includes/applicationMixins/about";

export default {
	name: "Coborrower",
	mixins: [about],
	methods: {
		selectIfHasCoborrower(choice) {
			choice == "yes"
				? (this.localAbout.hasCoborrower = true)
				: (this.localAbout.hasCoborrower = false);
		},
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;

				await this.postBorrowerAbout(this.localAbout);

				const shouldForce =
					this.borrowerData.about.hasCoborrower !==
					this.localAbout.hasCoborrower;

				if (this.localAbout.hasCoborrower == true) {
					this.editNavigationSectionCount({
						section: "about",
						count: 11
					});
					this.editSectionProgress(4, { force: shouldForce });
					this.$router.push("/about/coborrower/info");
				} else {
					this.editNavigationSectionCount({
						section: "about",
						count: 6
					});
					this.editSectionProgress(4, { force: shouldForce });
					this.$router.push("/about/dependents");
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.coborrower {
	.choice-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 600px;
		margin: 4rem auto 0;
		.choice {
			margin: 0 1rem 2rem;
			width: 20rem;
		}
	}

	.button-container {
		max-width: 420px;
		margin: 4rem auto 0;
	}
}
</style>
