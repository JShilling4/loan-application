<template>
	<div class="veteran">
        <page-heading :theme="appTheme">
            Are you interested in and eligible for a VA/Military loan?
        </page-heading>

		<div class="body-wrapper">
			<div class="choice-container">
				<app-button
					@click="selectIfVeteran('yes')"
					:class-list="[
						localAbout.isVeteran == true
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
				>
					Yes
				</app-button>

				<app-button
					@click="selectIfVeteran('no')"
					:class-list="[
						localAbout.isVeteran == false
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
				>
					No
				</app-button>
			</div>

			<view-controls
				@advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
				:local-posting="localDataIsPosting"
                :theme="appTheme"
			/>
		</div>
	</div>
</template>

<script>
import about from "@/includes/mixins/application/about";

const SECTION_NUMBER = 3;

export default {
	name: "Veteran",
	mixins: [about],
	methods: {
		selectIfVeteran(choice) {
			choice == "yes"
				? (this.localAbout.isVeteran = true)
				: (this.localAbout.isVeteran = false);
		},
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;
				await this.postBorrowerAbout(this.localAbout);
				// post progress if newly completed
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < SECTION_NUMBER
                ) {
                    this.localSectionProgress.about = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
				this.$router.push("/about/dependents");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.veteran {
	.body-wrapper {
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
            &.teal-fill:hover {
                background-color: var(--teal-dark);
            }
		}
	}
}
</style>
