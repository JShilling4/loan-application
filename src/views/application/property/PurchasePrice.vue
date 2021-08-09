<template>
	<div class="purchasePrice">
        <page-heading :theme="appTheme">
            Purchase Price
        </page-heading>

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
				@advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
				:local-posting="localDataIsPosting"
			/>
		</form>
	</div>
</template>

<script>
import property from "@/includes/mixins/application/property";

const SECTION_NUMBER = 5;

export default {
	name: "PurchasePrice",
	mixins: [property],
	components: {},
	data() {
		return {
			downPaymentType: "$"
		};
	},

	methods: {
		async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerProperty(this.localAbout);
                // post progress if newly completed
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < SECTION_NUMBER
                ) {
                    this.localSectionProgress.about = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                // TODO: if has coborrower, go to coborrower routes

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
