<template>
	<div class="dependents">
        <page-heading :theme="appTheme">
            {{ localCoborrowerProfile.firstName }}, do you have any dependents?
        </page-heading>

		<div class="viewWrapper">
			<!-- Has dependents -->
			<div class="choice-container">
				<app-button
					@click="selectIfHasDependents('yes')"
					:class-list="[
						localCoborrowerAbout.hasDependents == true
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
				>
					Yes
				</app-button>

				<app-button
					@click="selectIfHasDependents('no')"
					:class-list="[
						localCoborrowerAbout.hasDependents == false
							? 'teal-fill'
							: 'white-outline',
						'choice'
					]"
				>
					No
				</app-button>
			</div>

			<div
				v-if="localCoborrowerAbout.hasDependents == true"
				class="body-wrapper"
			>
				<!-- Number of dependents -->
				<div class="inline-form-group align-center">
					<div class="label-container">
						<app-label
							:theme="appTheme"
							for="numberOfDependents"
							margin="0 1rem 0 0"
						>
							How many dependents do you have?
						</app-label>
					</div>

					<div class="inline-input-container align-center">
						<text-field
							class-list="short"
                            :theme="appTheme"
							type="number"
							text-align="center"
							id="numberOfDependents"
							v-model="localCoborrowerAbout.numberOfDependents"
							@input="setDependentAges()"
						/>
					</div>
				</div>

				<!-- Dependent Age -->
				<div
					v-for="(age, index) in localCoborrowerAbout.dependentAges"
					:key="index"
					class="inline-form-group align-center dependentAge"
				>
					<div class="label-container">
						<app-label
							:theme="appTheme"
							:for="`dependent${index + 1}Age`"
							margin="0 1rem 0 0"
						>
							What is the age of dependent {{ index + 1 }}?
						</app-label>
					</div>

					<div class="inline-input-container align-center">
						<text-field
							class-list="short"
                            :theme="appTheme"
							type="number"
							text-align="center"
							:id="`dependent${index + 1}Age`"
							v-model="localCoborrowerAbout.dependentAges[index]"
						/>
					</div>
				</div>
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

const SECTION_NUMBER = 10;

export default {
	name: "Dependents",
	mixins: [about],

	methods: {
		selectIfHasDependents(choice) {
			if (choice == "yes") {
				this.localCoborrowerAbout.hasDependents = true;
			}
			if (choice == "no") {
				this.localCoborrowerAbout.hasDependents = false;
				this.localCoborrowerAbout.numberOfDependents = null;
				this.localCoborrowerAbout.dependentAges = [];
			}
		},

		setDependentAges() {
			this.localCoborrowerAbout.dependentAges = [];
			for (
				let i = 0;
				i < this.localCoborrowerAbout.numberOfDependents;
				i++
			) {
				this.localCoborrowerAbout.dependentAges.push("");
			}
		},

		async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
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
				this.$router.push("/about/coborrower-alimony");
            }
		}
	}
};
</script>

<style lang="scss" scoped>
.dependents {
	.viewWrapper {
		max-width: 440px;
		margin: 0 auto;
	}

	.body-wrapper {
		max-width: 350px;
		margin: 0 auto;
	}

	.inline-form-group {
		justify-content: center;
		margin: 2rem 0 4rem;

		&.align-center {
			align-items: center;
		}

		&.dependentAge {
			margin-bottom: 1rem;
		}
	}

	.label-container {
		width: 80%;
	}

	.inline-input-container {
		display: flex;
		justify-content: flex-end;
		width: 20%;
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
