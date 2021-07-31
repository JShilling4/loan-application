<template>
	<div class="otherProperties">
		<section class="introSection">
			<h1 class="appHeading">
				Do you own other properties?
			</h1>

			<div class="choice-container">
				<app-button
					@click="selectIfHasOtherProperties('yes')"
					:class-list="[
						localProperty.hasOtherProperties == true
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
				>
					Yes
				</app-button>

				<app-button
					@click="selectIfHasOtherProperties('no')"
					:class-list="[
						localProperty.hasOtherProperties == false
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
		</section>
	</div>
</template>

<script>
import property from "@/includes/applicationMixins/property";

export default {
	name: "OtherProperties",
	mixins: [property],
	computed: {
		shouldForceSectionCountUpdate() {
			return (
				this.borrowerData.property.hasOtherProperties !==
				this.localProperty.hasOtherProperties
			);
		},
		sectionCount() {
			if (this.borrowerData.about.hasCoborrower == true) {
				if (this.localProperty.hasOtherProperties !== true) {
					return 7;
				}
				return 8;
			}
			if (this.localProperty.hasOtherProperties !== true) {
				return 5;
			}
			return 6;
		}
	},
	methods: {
		selectIfHasOtherProperties(choice) {
			choice == "yes"
				? (this.localProperty.hasOtherProperties = true)
				: (this.localProperty.hasOtherProperties = false);
		},
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;

				// post data
				await this.postBorrowerProperty(this.localProperty);
				// update section count based on application choices
				this.editNavigationSectionCount({
					section: "property",
					count: this.sectionCount
				});
				// update section progress
				this.editSectionProgress(this.sectionCount, {
					force: this.shouldForceSectionCountUpdate
				});
				// route to next section
				if (this.localProperty.hasOtherProperties == true) {
					this.$router.push("/property/add-properties");
				} else {
					this.$router.push("/property/purchase-info");
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.otherProperties {
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
		max-width: 440px;
		margin: 4rem auto 0;
	}
}
</style>
