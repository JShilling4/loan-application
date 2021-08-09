<template>
	<div class="loanType">
        <page-heading :theme="appTheme">
            What is your homeownership goal?
        </page-heading>

		<div class="body-wrapper">
			<div class="choice-container">
				<div
					:class="[
						'choice',
						{ selected: localProperty.loanType == 'purchase' }
					]"
					@click="selectType('purchase')"
				>
					<img src="@/assets/images/purchase.png" class-list="" />
					<span>Purchase</span>
				</div>
				<div
					:class="[
						'choice',
						{ selected: localProperty.loanType == 'refinance' }
					]"
					@click="selectType('refinance')"
				>
					<img src="@/assets/images/refi.png" class-list="" />
					<span>Refinance</span>
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
import property from "@/includes/mixins/application/property";

const SECTION_NUMBER = 1;

export default {
	name: "LoanType",
	mixins: [property],
	methods: {
		selectType(type) {
			type == "purchase"
				? (this.localProperty.loanType = "purchase")
				: (this.localProperty.loanType = "refinance");
		},
		async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerProperty(this.localProperty);
                // post progress if newly completed
                if (
                    this.sectionProgress.property === null ||
                    this.sectionProgress.property < SECTION_NUMBER
                ) {
                    this.localSectionProgress.property = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route (progress fork -> purchase -> refinance)
                if (this.localProperty.loanType == "refinance") {
					this.$router.push("/property/refinance");
				} else {
					this.$router.push("/property/address-history");
				}
            }
		}
	}
};
</script>

<style lang="scss" scoped>
.loanType {
	.body-wrapper {
		max-width: 470px;
		margin: 0 auto;
	}
	.choice-container {
		display: flex;
		justify-content: center;
		margin: 4rem 0;
		.choice {
			margin: 0 4rem 2rem;
			cursor: pointer;
			border: 1px solid #fff;
			border-radius: 25px;
			padding: 1rem 3rem;
			&.selected {
				background-color: var(--teal-dark);
			}
			span {
				display: block;
				margin-top: 0.5rem;
				text-align: center;
				color: #fff;
				letter-spacing: 1px;
			}
		}
	}
}
</style>
