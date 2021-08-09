<template>
	<div class="purchaseInfo">
		<h1 class="appHeading">Describe the property you would like to buy</h1>
		<form class="pageForm">
			<!-- Found Home -->
			<div class="inline-form-group">
				<div class="label-container">
					<app-label class-list="dark">
						Have you found a home yet?
					</app-label>
				</div>

				<div class="inline-input-container">
					<div class="radioButton-container">
						<radio-button
							label="Yes"
							id="foundHomeYes"
							name="foundHome"
							v-model="localProperty.foundHome"
							@input="clearInputSet('looking')"
						/>
					</div>

					<div class="radioButton-container">
						<radio-button
							label="No"
							id="foundHomeNo"
							name="foundHome"
							v-model="localProperty.foundHome"
							@input="clearInputSet('location')"
						/>
					</div>
				</div>
			</div>

			<!-- If yes found home, property location -->
			<div v-if="localProperty.foundHome == 'Yes'">
				<!-- Property location city -->
				<div class="inline-form-group">
					<div class="label-container">
						<app-label class-list="dark" for="propertyLocationCity">
							Which city is the property located in?
						</app-label>
					</div>

					<div class="inline-input-container">
						<text-field
							class-list="dark"
							type="text"
							id="propertyLocationCity"
							v-model="localProperty.propertyLocationCity"
						/>
					</div>
				</div>

				<!-- Property location state -->
				<div class="inline-form-group">
					<div class="label-container">
						<app-label class-list="dark">
							Which state is the property located in?
						</app-label>
					</div>

					<div class="inline-input-container">
						<multi-select
							:options="states"
							:can-clear="false"
							v-model="localProperty.propertyLocationState"
						/>
					</div>
				</div>
			</div>

			<!-- If no found home, where looking -->
			<div v-if="localProperty.foundHome == 'No'">
				<!-- Where looking city -->
				<div class="inline-form-group">
					<div class="label-container">
						<app-label class-list="dark" for="propertyLocationCity">
							In which city are you looking to buy?
						</app-label>
					</div>

					<div class="inline-input-container">
						<text-field
							class-list="dark"
							type="text"
							id="propertyLocationCity"
							v-model="localProperty.whereLookingCity"
						/>
					</div>
				</div>

				<!-- Property location state -->
				<div class="inline-form-group">
					<div class="label-container">
						<app-label class-list="dark">
							In which state are you looking to buy?
						</app-label>
					</div>

					<div class="inline-input-container">
						<multi-select
							:options="states"
							:can-clear="false"
							v-model="localProperty.whereLookingState"
						/>
					</div>
				</div>
			</div>

			<!-- Property Use -->
			<div class="inline-form-group">
				<div class="label-container">
					<app-label class-list="dark" for="propertyUse">
						How do you plan to use this property?
					</app-label>
				</div>

				<div class="inline-input-container">
					<multi-select
						:options="[
							{ value: 'primary', label: 'Primary Residence' },
							{
								value: 'secondary',
								label: 'Secondary/Vacation'
							},
							{ value: 'notApplicable', label: 'Not Applicable' }
						]"
						:can-clear="false"
						v-model="localProperty.propertyUse"
					/>
				</div>
			</div>

			<!-- Real Estate Agent -->
			<div class="inline-form-group">
				<div class="label-container">
					<app-label class-list="dark">
						Are you currently working with a real estate agent?
					</app-label>
				</div>

				<div class="inline-input-container">
					<div class="radioButton-container">
						<radio-button
							label="Yes"
							value="yes"
							id="hasRealEstateAgentYes"
							name="hasRealEstateAgent"
							v-model="localProperty.hasRealEstateAgent"
						/>
					</div>

					<div class="radioButton-container">
						<radio-button
							label="No"
							value="no"
							id="hasRealEstateAgentNo"
							name="hasRealEstateAgent"
							v-model="localProperty.hasRealEstateAgent"
							@input="clearInputSet('agentName')"
						/>
					</div>
				</div>
			</div>

			<!-- If yes realtor, realtor name -->
			<div v-if="localProperty.hasRealEstateAgent == 'Yes'">
				<!-- Real Estate Agent Name -->
				<div class="inline-form-group">
					<div class="label-container">
						<app-label class-list="dark" for="realEstateAgentName">
							Name of Real Estate Agent?
						</app-label>
					</div>

					<div class="inline-input-container">
						<text-field
							class-list="dark"
							type="text"
							id="realEstateAgentName"
							v-model="localProperty.realEstateAgentName"
						/>
					</div>
				</div>
			</div>

			<!-- Page Submit -->
			<view-controls
				@advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
				:local-posting="localDataIsPosting"
			/>
		</form>
	</div>
</template>

<script>
import property from "@/includes/mixins/application/property";

export default {
	name: "PurchaseInfo",
	mixins: [property],
	components: {},

	computed: {
		sectionProgress() {
			if (this.borrower.about.hasCoborrower == true) {
				if (this.borrower.property.hasOtherProperties === true) {
					return 7;
				}
				return 5;
			}
			if (this.borrower.property.hasOtherProperties === true) {
				return 5;
			}
			return 4;
		}
	},

	methods: {
		clearInputSet(inputSet) {
			switch (inputSet) {
				case "looking": {
					this.localProperty.whereLookingCity = null;
					this.localProperty.whereLookingState = null;
					break;
				}
				case "location": {
					this.localProperty.propertyLocationCity = null;
					this.localProperty.propertyLocationState = null;
					break;
				}
				case "agentName": {
					this.localProperty.realEstateAgentName = null;
					break;
				}
			}
		},

		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;
				// post data
				await this.postBorrowerProperty(this.localProperty);

				// update section progress
				this.editSectionProgress(this.sectionProgress);

				// route to next section
				this.$router.push("/property/purchase-price");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.purchaseInfo {
	form {
		max-width: 620px;
	}
	.inline-form-group {
		margin: 0 0 3rem;
		align-items: center;
	}
	.label-container {
		width: 60%;
	}
	.inline-input-container {
		display: flex;
		justify-content: space-between;
		width: 40%;
	}
}
</style>
