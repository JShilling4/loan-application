<template>
	<div v-if="localCoborrowerProfile" class="coborrowerInfo">
		<h1 class="appHeading">Please provide coborrower information.</h1>

		<div class="body-wrapper">
			<!-- Name Input Group -->
			<div class="inline-form-group">
				<!-- First Name -->
				<div class="input-group">
					<app-label class-list="dark" for="fname"
						>First Name</app-label
					>
					<text-field
						class-list="dark"
						id="fname"
						type="text"
						name="FirstName"
						v-model="localCoborrowerProfile.firstName"
					/>
				</div>

				<!-- Middle Initial -->
				<div class="input-group short">
					<app-label class-list="dark" for="middleInitial"
						>Middle Initial</app-label
					>
					<text-field
						class-list="dark"
						id="middleInitial"
						type="text"
						maxlength="1"
						name="MiddleInitial"
						v-model="localCoborrowerProfile.middleInitial"
					/>
				</div>
			</div>

			<div class="inline-form-group">
				<!-- Last Name -->
				<div class="input-group">
					<app-label class-list="dark" for="lname"
						>Last Name</app-label
					>
					<text-field
						class-list="dark"
						id="lname"
						type="text"
						name="LastName"
						v-model="localCoborrowerProfile.lastName"
					/>
				</div>

				<!-- Suffix/Email Group -->
				<!-- Suffix -->
				<div class="input-group short">
					<app-label class-list="dark" for="suffix">Suffix</app-label>
					<multi-select
						:options="suffixes"
						:can-clear="false"
						v-model="localCoborrowerProfile.suffix"
					/>
				</div>
			</div>

			<!-- Email -->
			<div class="input-group">
				<app-label class-list="dark">Email Address</app-label>
				<text-field
					type="text"
					class-list="dark"
					v-model="localCoborrowerProfile.email"
				/>
			</div>

			<!-- Phone -->
			<div class="input-group">
				<app-label class-list="dark" for="phone"
					>Phone Number</app-label
				>
				<text-field
					class-list="dark"
					id="phone"
					type="tel"
					name="Phone"
					maxlength="12"
					v-model="localCoborrowerProfile.phone"
				/>
			</div>

			<!-- Marital Status -->
			<div class="input-group">
				<app-label class-list="dark" for="maritalStatus"
					>Marital Status</app-label
				>
				<multi-select
					:options="[
						{ value: 'Single', label: 'Single' },
						{ value: 'Married', label: 'Married' },
						{ value: 'Separated', label: 'Separated' }
					]"
					:can-clear="false"
					v-model="localCoborrowerProfile.maritalStatus"
				/>
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

export default {
	name: "CoborrowerInfo",
	mixins: [about],
	components: {},

	methods: {
		async submitPage() {
			if (this.localDataIsPosting !== true) {
				this.localDataIsPosting = true;
				await this.postCoborrowerProfile(this.localCoborrowerProfile);
				this.editSectionProgress(5);
				this.$router.push("/about/coborrower/address");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.body-wrapper {
	max-width: 440px;
	margin: 0 auto;
}
</style>
