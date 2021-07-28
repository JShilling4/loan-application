<template>
	<div v-if="localCoborrowerProfile" class="coborrowerAddress">
		<h1 class="appHeading">Please provide coborrower information.</h1>

		<div class="body-wrapper">
			<div class="inline-form-group">
				<!-- Street Address -->
				<div class="input-group">
					<app-label class-list="dark" for="route"
						>Home Address</app-label
					>
					<text-field
						id="addressAutocomplete"
						class-list="dark"
						type="text"
						name="HomeAddress"
						v-model="localCoborrowerProfile.streetAddress"
					/>
				</div>

				<!-- Unit -->
				<div class="input-group short">
					<app-label class-list="dark" for="unitNumber"
						>Unit / Apt.</app-label
					>
					<text-field
						class-list="dark"
						id="unitNumber"
						type="text"
						name="Unit"
						v-model="localCoborrowerProfile.apartmentNumber"
					/>
				</div>
			</div>

			<!-- City -->
			<div class="input-group">
				<app-label class-list="dark">City</app-label>
				<text-field
					class-list="dark"
					id="dynamicId"
					type="text"
					name="City"
					v-model="localCoborrowerProfile.city"
				/>
			</div>

			<!-- Unit/City/State/Zip Group -->
			<div class="inline-form-group">
				<!-- State -->
				<div class="input-group">
					<app-label class-list="dark">State</app-label>
					<!-- <v-select
						:options="states"
						:clearble="false"
						:reduce="state => state.value"
						v-model="localCoborrowerProfile.state"
					></v-select> -->
				</div>

				<!-- Zip Code -->
				<div class="input-group short">
					<app-label class-list="dark" for="zipcode"
						>Zip Code</app-label
					>
					<text-field
						type="tel"
						id="zipcode"
						class-list="dark"
						v-model="localCoborrowerProfile.zipcode"
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
import about from "@/mixins/about";
import TextField from "@/components/shared/inputs/TextField.vue";

export default {
	name: "CoborrowerAddress",
	mixins: [about],
	components: {
		"text-field": TextField
	},

	methods: {
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;
				await this.postCoborrowerProfile(this.localCoborrowerProfile);
				this.editSectionProgress(6);
				this.$router.push("/about/coborrower/auth");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.body-wrapper {
	width: 440px;
	margin: 0 auto;
}
</style>
