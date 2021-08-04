<template>
	<div class="veteran">
		<h1 class="appHeading">
			Are you interested in and eligible for a VA/Military loan?
		</h1>
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
			/>
		</div>
	</div>
</template>

<script>
import about from "@/includes/mixins/application/about";

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
				this.editSectionProgress(1);
				this.$router.push("/about/coborrower");
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
