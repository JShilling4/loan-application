<template>
	<div class="password-block">
		<h1 class="appHeading">Create Password</h1>

		<!-- Password Group -->
		<!-- Password -->
		<div class="input-group">
			<app-label class-list="dark">Password</app-label>
			<text-field
				type="password"
				class-list="dark"
				v-model="localProfile.password"
			/>
		</div>

		<!-- Confirm Password -->
		<div class="input-group">
			<app-label class-list="dark">Re-enter Password</app-label>
			<text-field
				type="password"
				class-list="dark"
				v-model="confirmPassword"
			/>
		</div>

		<view-controls
			@next-view="submitPage()"
			next-text="Create Profile"
			:local-posting="localDataIsPosting"
		/>
	</div>
</template>

<script>
import profile from "@/includes/applicationMixins/profile";

export default {
	name: "ProfilePassword",
	mixins: [profile],
	components: {},
	data() {
		return {
			confirmPassword: null
		};
	},
	methods: {
		async submitPage() {
			if (this.localDataIsPosting == false) {
				this.localDataIsPosting = true;
				this.postBorrowerProfile(this.localProfile).then(() => {
					if (
						this.applicationData.progress.profile === null ||
						this.applicationData.progress.profile < 3
					) {
						this.localApplicationData.progress.profile = 3;
						this.postApplicationData(this.localApplicationData);
					}
					this.$router.push("/about/referral");
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
