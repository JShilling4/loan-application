<template>
	<div class="purchasePrice">
		<h1 class="appHeading">Purchase Price</h1>
		<form class="pageForm">
			<!-- Purchase price -->
			<div class="inline-form-group">
				<div class="label-container">
					<app-label class-list="dark" for="purchasePrice">
						What is your purchase price?
					</app-label>
				</div>

				<div class="inline-input-container">
					<text-field
						class-list="dark"
						type="number"
						id="purchasePrice"
						:is-currency="true"
						v-model="localProperty.purchasePrice"
					/>
				</div>
			</div>

			<!-- Down payment amount -->
			<div class="inline-form-group">
				<div class="label-container">
					<app-label class-list="dark" for="purchasePrice">
						How much will your down payment be?
					</app-label>
				</div>

				<div class="inline-input-container">
					<text-field
						class-list="dark hasIcon"
						type="number"
						id="purchasePrice"
						:is-currency="downPaymentType === '$'"
						:is-percentage="downPaymentType === '%'"
						v-model="localProperty.downPaymentAmount"
					/>

					<!-- Dollars/Percentage -->
					<div class="inline-group">
						<div class="radioButton-container">
							<radio-button
								label="$"
								id="dollars"
								name="downPaymentType"
								width="5rem"
								v-model="downPaymentType"
							/>
						</div>
						<div class="radioButton-container">
							<radio-button
								label="%"
								id="percent"
								name="downPaymentType"
								width="5rem"
								v-model="downPaymentType"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Page submit -->
			<view-controls
				@next-view="submitPage()"
				:local-posting="localDataIsPosting"
			/>
		</form>
	</div>
</template>

<script>
import property from "@/includes/applicationMixins/property";

export default {
	name: "PurchasePrice",
	mixins: [property],
	components: {},
	data() {
		return {
			downPaymentType: "$"
		};
	},

	computed: {
		sectionProgress() {
			if (this.borrowerData.about.hasCoborrower === true) {
				if (this.borrowerData.property.hasOtherProperties === true) {
					return 8;
				}
				return 6;
			}
			if (this.borrowerData.property.hasOtherProperties === true) {
				return 6;
			}
			return 5;
		}
	},

	methods: {
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;
				// post data
				await this.postBorrowerProperty(this.localProperty);

				// update section progress
				this.editSectionProgress(this.sectionProgress);

				// route to next page
				this.$router.push("/income/income-history");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.purchasePrice {
	form {
		max-width: 610px;
	}

	.inline-form-group {
		margin: 0 0 3rem;
		align-items: center;
	}
	.label-container {
		width: 47.5%;
		label {
			margin-bottom: 0;
		}
	}
	.inline-input-container {
		display: flex;
		justify-content: space-between;
		width: 52.5%;
	}

	.input-wrapper {
		max-width: 18.5rem;
	}

	.radioButton-container {
		&:not(:last-child) {
			margin-right: 1rem;
		}
	}
}
</style>
