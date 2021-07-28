<template>
	<div class="profileAddress">
		<h1 class="appHeading">Address</h1>

		<!-- State/Unit Group -->
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
					v-model="localProfile.streetAddress"
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
					v-model="localProfile.unit"
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
				v-model="localProfile.city"
			/>
		</div>

		<!-- State/Zip Group -->
		<div class="inline-form-group">
			<!-- State -->
			<div class="input-group">
				<app-label class-list="dark">State</app-label>
				<!-- <v-select
					:options="states"
					:clearble="false"
					:reduce="state => state.value"
					v-model="localProfile.state"
				/> -->
			</div>

			<!-- Zip Code -->
			<div class="input-group short">
				<app-label class-list="dark" for="zipcode">Zip Code</app-label>
				<text-field
					type="tel"
					id="zipcode"
					class-list="dark"
					v-model="localProfile.zipcode"
				/>
			</div>
		</div>

		<view-controls
			@next-view="submitPage()"
			:local-posting="localDataIsPosting"
		/>
	</div>
</template>

<script>
import profile from "@/mixins/profile";

export default {
	name: "ProfileAddress",
	mixins: [profile],
	components: {},
	methods: {
		async submitPage() {
			if (this.localDataIsPosting == false) {
				this.localDataIsPosting = true;
				await this.postBorrowerProfile(this.localProfile);

				if (
					this.applicationData.progress.profile === null ||
					this.applicationData.progress.profile < 2
				) {
					this.localApplicationData.progress.profile = 2;
					this.postApplicationData(this.localApplicationData);
				}
				if (this.borrowerData.profile.password === null) {
					this.$router.push("/profile/create-password");
				} else {
					this.$router.push("/about/referral");
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
