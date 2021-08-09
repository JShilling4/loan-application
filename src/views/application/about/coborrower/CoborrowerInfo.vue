<template>
	<div v-if="localCoborrowerProfile" class="coborrowerInfo">
        <page-heading :theme="appTheme">
            Please provide coborrower information.
        </page-heading>

		<div class="pageWrapper">
			<!-- Name Input Group -->
			<div class="inline-form-group">
				<!-- First Name -->
				<div class="input-group">
					<app-label :theme="appTheme" for="fname"
						>First Name</app-label
					>
					<text-field
						:theme="appTheme"
						id="fname"
						type="text"
						name="FirstName"
						v-model="localCoborrowerProfile.firstName"
					/>
				</div>

				<!-- Middle Initial -->
				<div class="input-group short">
					<app-label :theme="appTheme" for="middleInitial"
						>Middle Initial</app-label
					>
					<text-field
						:theme="appTheme"
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
					<app-label :theme="appTheme" for="lname"
						>Last Name</app-label
					>
					<text-field
						:theme="appTheme"
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
				<app-label :theme="appTheme">Email Address</app-label>
				<text-field
					type="text"
					:theme="appTheme"
					v-model="localCoborrowerProfile.email"
				/>
			</div>

			<!-- Phone -->
			<div class="input-group">
				<app-label :theme="appTheme" for="phone"
					>Phone Number</app-label
				>
				<text-field
					:theme="appTheme"
					id="phone"
					type="tel"
					name="Phone"
					maxlength="12"
					v-model="localCoborrowerProfile.phone"
				/>
			</div>

			<!-- Marital Status -->
			<div class="input-group">
				<app-label :theme="appTheme" for="maritalStatus"
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
				@advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
				:local-posting="localDataIsPosting"
                :theme="appTheme"
			/>
		</div>
	</div>
</template>

<script>
import about from "@/includes/mixins/application/about";

const SECTION_NUMBER = 8;

export default {
	name: "CoborrowerInfo",
	mixins: [about],
	components: {},

	methods: {
		async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerAbout(this.localAbout);
                // post progress if newly completed
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < SECTION_NUMBER
                ) {
                    this.localSectionProgress.about = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
				this.$router.push("/about/coborrower/address");
            }
		}
	}
};
</script>

<style lang="scss" scoped>
.pageWrapper {
	max-width: 350px;
	margin: 0 auto;
}
</style>
