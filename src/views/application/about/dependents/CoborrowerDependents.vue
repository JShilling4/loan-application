<template>
	<div class="dependents">
		<h1 class="appHeading">
			{{ localCoborrowerProfile.firstName }}, do you have any dependents?
		</h1>
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
							class-list="dark"
							for="numberOfDependents"
							margin="0 1rem 0 0"
						>
							How many dependents do you have?
						</app-label>
					</div>

					<div class="inline-input-container align-center">
						<text-field
							class-list="dark short"
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
							class-list="dark"
							:for="`dependent${index + 1}Age`"
							margin="0 1rem 0 0"
						>
							What is the age of dependent {{ index + 1 }}?
						</app-label>
					</div>

					<div class="inline-input-container align-center">
						<text-field
							class-list="dark short"
							type="number"
							text-align="center"
							:id="`dependent${index + 1}Age`"
							v-model="localCoborrowerAbout.dependentAges[index]"
						/>
					</div>
				</div>
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
	name: "Dependents",
	mixins: [about],
	components: {},

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
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;
				await this.postCoborrowerAbout(this.localCoborrowerAbout);
				this.editSectionProgress(7);
				this.$router.push("/about/alimony");
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
