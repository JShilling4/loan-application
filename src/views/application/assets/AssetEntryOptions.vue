<template>
	<div class="assetChoices">
		<h1 class="appHeading">Assets</h1>

		<div class="body-wrapper">
			<p class="pageCopy">
				We have to document all the funds that are going to be used in
				your mortgage. Please share your account information to help us
				determine the best mortgage product for you.
			</p>
			<div class="choice-container">
				<!-- Add w/ Finicity -->
				<div class="choice">
					<div class="choiceName-container">
						<span class="text">Verify Automatically</span>
						<img
							src="@/assets/images/finicity_logo.svg"
							alt="Finicity"
						/>
					</div>

					<div class="choiceFeatures-container">
						<ul class="featureList">
							<li class="feature">
								Import your financial statements with ease
							</li>
							<li class="feature">
								Protected with bank level security
							</li>
							<li class="feature">
								We keep your financial data private
							</li>
						</ul>
						<app-button
							class-list="white-outline"
							font-size="14px"
							@click="submitPage('verify-assets')"
						>
							Select
						</app-button>
					</div>
				</div>

				<!-- Add Manually -->
				<div class="choice manually">
					<div class="choiceName-container">
						<span class="text">Verify Manually</span>
					</div>

					<div class="choiceFeatures-container">
						<p class="featureCopy">
							Using this method, you will state the amount of
							money you have in each account. You will need to
							provide statements at a later date.
						</p>
						<app-button
							class-list="white-outline"
							font-size="14px"
							@click="submitPage('add-assets')"
						>
							Select
						</app-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import assets from "@/mixins/assets";

export default {
	name: "AssetEntryOptions",
	mixins: [assets],
	methods: {
		submitPage(route) {
			this.$router.push(`/assets/${route}`);
		}
	}
};
</script>

<style lang="scss" scoped>
.body-wrapper {
	max-width: 750px;
	margin: 0 auto;
}
.pageCopy {
	margin: 0 auto 4rem;
	width: 95%;
}
.choice-container {
	border: 1px solid #fff;
	border-radius: 25px;
}

.choice {
	display: flex;
	padding: 2rem;

	&:not(:last-child) {
		border-bottom: 1px solid #fff;
	}
	.choiceName-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 20rem;
		padding: 1rem 2rem;
		text-align: center;
		background-color: #fff;
		border-radius: 15px;
		.text {
			color: $blue-green;
			margin-bottom: 1rem;
		}
	}

	.choiceFeatures-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem 1rem 1rem 4rem;
		.featureList {
			color: #fff;
			min-width: 34rem;
			list-style: disc;
			.feature {
				font-size: 14px;
				&:not(:last-child) {
					margin-bottom: 0.5rem;
				}
			}
		}
		.featureCopy {
			margin-left: -1.5rem;
			padding-right: 3rem;
			color: #fff;
			min-width: 35.5rem;
			line-height: 1.5;
			font-size: 14px;
		}
	}

	&.manually {
		.choiceName-container {
			background-color: transparent;
			.text {
				color: #fff;
				margin-bottom: 0;
			}
		}
	}
}
</style>
