<template>
	<app-modal
		class="previousAddressModal"
		width="60rem"
		:show="isShowing"
		:show-close-button="true"
		:clickaway="true"
		background-color="#fff"
		@close="$emit('close')"
	>
		<template v-slot:body>
			<span class="heading">
				{{ profile.firstName }}'s Previous Address
			</span>

			<div class="previousAddress">
				<!-- Move In / Move Out Date -->
				<div class="inline-form-group">
					<!-- Move In Date -->
					<div class="input-group">
						<app-label theme="light">
							Move In Date
						</app-label>
						<text-field v-model="localPreviousAddress.moveInDate" />
					</div>

					<!-- Move Out Date -->
					<div class="input-group">
						<app-label theme="light">
							Move Out Date
						</app-label>
						<text-field
							v-model="localPreviousAddress.moveOutDate"
						/>
					</div>
				</div>

				<!-- Streed Address / Unit Number -->
				<div class="inline-form-group">
					<!-- Street Address -->
					<div class="col col3_5-4">
						<app-label theme="light">
							Street Address
						</app-label>
						<text-field
							v-model="localPreviousAddress.streetAddress"
						/>
					</div>

					<div class="gutter-20"></div>

					<!-- Unit/Apt -->
					<div class="col col1-4">
						<app-label theme="light">
							Unit / Apt
						</app-label>
						<text-field
							v-model="localPreviousAddress.apartmentNumber"
						/>
					</div>
				</div>

				<!-- City / State / Zipcode -->
				<div class="inline-form-group">
					<!-- City -->
					<div class="col col2-4">
						<app-label theme="light">
							City
						</app-label>
						<text-field v-model="localPreviousAddress.city" />
					</div>

					<div class="gutter-20"></div>

					<!-- State -->
					<div class="col col1_5-4">
						<app-label theme="light">
							State
						</app-label>
						<!-- <v-select
							:options="states"
							theme="light"
							:clearable="false"
							class="light"
							:append-to-body="true"
							:reduce="state => state.value"
							v-model="localPreviousAddress.state"
						/> -->
					</div>

					<div class="gutter-20"></div>

					<!-- Zip Code -->
					<div class="col col1-4">
						<app-label theme="light">
							Zipcode
						</app-label>
						<text-field v-model="localPreviousAddress.zipcode" />
					</div>
				</div>
			</div>

			<!-- Property Owner -->
			<div class="inline-form-group ownProperty">
				<p class="label inline col1">
					Are you the owner of the property?
				</p>

				<div class="radio-group-wrapper col2">
					<div class="radioButton-container">
						<radio-button
							label="Yes"
							value="Yes"
							name="propertyOwner"
							class-list="light"
							v-model="localPreviousAddress.propertyOwner"
						/>
					</div>

					<div class="radioButton-container">
						<radio-button
							label="No"
							value="No"
							name="propertyOwner"
							class-list="light"
							v-model="localPreviousAddress.propertyOwner"
						/>
					</div>
				</div>
			</div>

			<div class="button-wrapper">
				<app-button @click="saveLocalData()">
					{{ modalAction }}
				</app-button>
			</div>
		</template>
	</app-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "PreviousAddressModal",
	components: {},
	props: {
		isShowing: {
			type: Boolean
		},
		modalAction: {
			type: String
		},
		profile: {
			type: Object
		},
		property: {
			type: Object
		},
		previousAddress: {
			type: Object
		}
	},
	data() {
		return {
			localProperty: {},
			localPreviousAddress: {}
		};
	},
	computed: {
		...mapState(["states"])
	},
	watch: {
		property() {
			this.localProperty = JSON.parse(
				JSON.stringify({ ...this.property })
			);
		},
		previousAddress() {
			this.localPreviousAddress = JSON.parse(
				JSON.stringify({ ...this.previousAddress })
			);
		}
	},
	methods: {
		saveLocalData() {
			if (this.localProperty.addressHistory === null) {
				this.localProperty.addressHistory = [this.localPreviousAddress];
			} else {
				this.localProperty.addressHistory.push(
					this.localPreviousAddress
				);
			}
			this.$emit("save-address", this.localProperty);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";

.previousAddressModal {
	.previousAddress {
		margin-bottom: 3rem;
		.inline-form-group {
			margin-bottom: 2rem;
		}
	}
}
</style>
