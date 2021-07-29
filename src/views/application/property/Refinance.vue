<template>
	<div class="refinance">
		<h1 class="appHeading">Refinance Information</h1>

		<div class="body-wrapper">
			<!-- Property Plan -->
			<app-label class-list="dark label-outside"
				>How do you plan to use this property?</app-label
			>
			<div class="input-group">
				<multi-select
					:options="[
						{ value: 'Primary', label: 'Primary Residence' },
						{
							value: 'Secondary',
							label: 'Secondary/Vacation Home'
						},
						{ value: 'NotApplicable', label: 'Not Applicable' }
					]"
					:can-clear="false"
					v-model="localProperty.propertyPlan"
				/>
			</div>

			<!-- Cash Out Refinance -->
			<app-label class-list="dark label-outside">
				Are you interested in a cash-out refinance?
			</app-label>

			<div class="inline-form-group">
				<div class="radioButton-container">
					<radio-button
						label="Yes"
						name="isCashout"
						v-model="localProperty.cashOut"
					/>
				</div>

				<div class="radioButton-container">
					<radio-button
						label="No"
						name="isCashout"
						v-model="localProperty.cashOut"
					/>
				</div>
			</div>

			<!-- Include Insurance/Property Taxes in payment -->
			<app-label class-list="dark label-outside">
				Do you plan to include the insurance and property taxes in your
				monthly payment?
			</app-label>

			<div class="inline-form-group">
				<div class="radioButton-container">
					<radio-button
						label="Yes"
						name="includeTaxesAndInsurance"
						v-model="localProperty.includeTaxesAndInsurance"
					/>
				</div>

				<div class="radioButton-container">
					<radio-button
						label="No"
						name="includeTaxesAndInsurance"
						v-model="localProperty.includeTaxesAndInsurance"
					/>
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
import property from "@/mixins/property";

export default {
	name: "Refinance",
	mixins: [property],
	components: {},
	data() {
		return {};
	},

	methods: {
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;

				await this.postBorrowerProperty(this.localProperty);

				this.editSectionProgress(2);
				this.$router.push("/property/address-history");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
$input-margin-bottom: 3rem;

.refinance {
	.body-wrapper {
		max-width: 400px;
		margin: 0 auto;
	}

	.input-group {
		max-width: 275px;
		margin: 0 auto $input-margin-bottom;
	}

	.inline-form-group {
		justify-content: center;
		margin-bottom: $input-margin-bottom;
	}

	.label-outside {
		line-height: 1.5;
	}

	.radioButton-container {
		width: auto;
	}

	.button-container {
		margin: 4rem auto 0;
	}
}
</style>
