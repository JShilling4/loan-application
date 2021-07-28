<template>
	<div class="loanType">
		<h1 class="appHeading">What is your homeownership goal?</h1>

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
				@next-view="submitPage()"
				:local-posting="localDataIsPosting"
			/>
		</div>
	</div>
</template>

<script>
import property from "@/mixins/property";

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
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;

				await this.postBorrowerProperty(this.localProperty);

				this.editSectionProgress(1);

				if (this.localProperty.loanType == "refinance") {
					this.$router.push("/property/refinance");
				} else if (this.localProperty.loanType == "purchase") {
					this.$router.push("/property/address-history");
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
				background-color: $teal-dark;
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
