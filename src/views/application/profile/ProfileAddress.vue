<template>
	<div class="profileAddress">
		<h1 class="appHeading">{{ $t('headings.profile2') }}</h1>

		<!-- State/Unit Group -->
		<div class="inline-form-group">
			<!-- Street Address -->
			<div class="input-group">
				<app-label class-list="dark" for="address"
					>Home Address</app-label
				>
				<text-field
					id="address"
					class-list="dark"
					type="text"
					name="address"
					v-model="localProfile.streetAddress"
				/>
			</div>

			<!-- Unit -->
			<div class="input-group short">
				<app-label class-list="dark" for="suite"
					>Unit / Apt.</app-label
				>
				<text-field
					class-list="dark"
					id="suite"
					type="text"
					name="suite"
					v-model="localProfile.unit"
				/>
			</div>
		</div>

		<!-- City -->
		<div class="input-group">
			<app-label class-list="dark">City</app-label>
			<text-field
				class-list="dark"
				id="city"
				type="text"
				name="city"
				v-model="localProfile.city"
			/>
		</div>

		<!-- State/Zip Group -->
		<div class="inline-form-group">
			<!-- State -->
			<div class="input-group">
				<app-label class-list="dark">State</app-label>
				<multi-select
					:options="states"
					:can-clear="false"
                    name="state"
					v-model="localProfile.state"
				/>
			</div>

			<!-- Zip Code -->
			<div class="input-group short">
				<app-label class-list="dark" for="zipcode">Zip Code</app-label>
				<text-field
					type="number"
					id="zipcode"
                    name="zipcode"
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
import profile from "@/includes/mixins/application/profile";

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
