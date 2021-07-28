<template>
	<div class="profileGeneral">
		<h1 class="appHeading">Tell Us About Yourself</h1>

		<!-- Name Input Group -->
		<div class="inline-form-group">
			<!-- First Name -->
			<div class="input-group">
				<app-label class-list="dark" for="fname">First Name</app-label>
				<text-field
					class-list="dark"
					id="fname"
					type="text"
					name="FirstName"
					v-model="localProfile.firstName"
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
					v-model="localProfile.middleInitial"
				/>
			</div>
		</div>

		<!-- Suffix/Email Group -->
		<div class="inline-form-group">
			<!-- Last Name -->
			<div class="input-group">
				<app-label class-list="dark" for="lname">Last Name</app-label>
				<text-field
					class-list="dark"
					id="lname"
					type="text"
					name="LastName"
					v-model="localProfile.lastName"
				/>
			</div>
			<!-- Suffix -->
			<div class="input-group short">
				<app-label class-list="dark" for="suffix">Suffix</app-label>
				<!-- <v-select
					:options="suffixes"
					:clearable="false"
					:reduce="suffix => suffix.value"
					v-model="localProfile.suffix"
				></v-select> -->
			</div>
		</div>

		<!-- Email -->
		<div class="input-group">
			<app-label class-list="dark">Email Address</app-label>
			<text-field
				type="text"
				class-list="dark"
				v-model="localProfile.email"
			/>
		</div>

		<!-- Phone/Maritial Status Group -->
		<!-- Phone -->
		<div class="input-group">
			<app-label class-list="dark" for="phone">Phone Number</app-label>
			<text-field
				class-list="dark"
				id="phone"
				type="tel"
				name="Phone"
				maxlength="12"
				v-model="localProfile.phone"
			/>
		</div>

		<!-- Marital Status -->
		<div class="input-group">
			<app-label class-list="dark" for="maritalStatus"
				>Marital Status</app-label
			>
			<!-- <v-select
				:options="[
					{ value: 'Single', label: 'Single' },
					{ value: 'Married', label: 'Married' },
					{ value: 'Separated', label: 'Separated' }
				]"
				:clearable="false"
				:reduce="maritalStatus => maritalStatus.value"
				v-model="localProfile.maritalStatus"
			></v-select> -->
		</div>

		<app-button
			class-list="orange-fill pageSubmit"
			:isPosting="localDataIsPosting"
			indicator-type="button"
			:append-icon="true"
			@click="submitPage()"
		>
			Next
		</app-button>
	</div>
</template>

<script>
import profile from "@/mixins/profile";
import TextField from "@/components/shared/inputs/TextField.vue";

export default {
	name: "ProfileGeneral",
	mixins: [profile],
	components: {
		"text-field": TextField,
		// "v-select": () => import("vue-select")
	},
	methods: {
		async submitPage() {
			if (this.localDataIsPosting == false) {
				// start loader
				this.localDataIsPosting = true;
				// post data
				await this.postBorrowerProfile(this.localProfile);
				// post progress
				if (this.applicationData.progress.profile === null) {
					this.localApplicationData.progress.profile = 1;
					this.postApplicationData(this.localApplicationData);
				}
				// next route
				this.$router.push("/profile/address");
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
