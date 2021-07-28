<template>
	<app-modal
		class="propertiesModal"
		width="65rem"
		:show="isShowing"
		:show-close-button="true"
		:clickaway="true"
		background-color="#fff"
		@close="$emit('close')"
	>
		<template v-slot:body>
			<span class="heading"> {{ modalAction }} Property </span>

			<!-- Mailing Address -->
			<div class="mailingAddress">
				<div class="inline-form-group">
					<!-- Street Address -->
					<div class="col col3_5-4">
						<app-label theme="light">
							Street Address
						</app-label>
						<text-field
							v-model="localOtherProperty.streetAddress"
						/>
					</div>

					<div class="gutter-20"></div>

					<!-- Unit/Apt -->
					<div class="col col1-4">
						<app-label theme="light">
							Unit / Apt
						</app-label>
						<text-field
							v-model="localOtherProperty.apartmentNumber"
						/>
					</div>
				</div>

				<div class="inline-form-group">
					<!-- City -->
					<div class="col col2-4">
						<app-label theme="light">
							City
						</app-label>
						<text-field v-model="localOtherProperty.city" />
					</div>

					<div class="gutter-20"></div>

					<!-- State -->
					<div class="col col1_5-4">
						<app-label theme="light">
							State
						</app-label>
						<!-- <v-select
							:options="states"
							:clearable="false"
							class="light"
							:append-to-body="true"
							:reduce="state => state.value"
							v-model="localOtherProperty.state"
						/> -->
					</div>

					<div class="gutter-20"></div>

					<!-- Zip Code -->
					<div class="col col1-4">
						<app-label theme="light">
							Zipcode
						</app-label>
						<text-field v-model="localOtherProperty.zipcode" />
					</div>
				</div>
			</div>

			<!-- Mortgage Type / Property Plan -->
			<div class="inline-form-group">
				<!-- Mortgage Type -->
				<div class="input-group">
					<app-label class-list="light">
						Type of Mortgage
					</app-label>

					<!-- <v-select
						:options="[
							{
								value: 'Conventional',
								label: 'Conventional'
							},
							{
								value: 'FHA',
								label: 'FHA'
							},
							{
								value: 'VA',
								label: 'VA'
							},
							{
								value: 'USDA',
								label: 'USDA'
							},
							{
								value: 'None',
								label: 'None'
							}
						]"
						:clearable="false"
						class="light"
						:reduce="mortgageType => mortgageType.value"
						v-model="localOtherProperty.mortgageType"
					/> -->
				</div>

				<!-- Property Plan -->
				<div class="input-group">
					<app-label class-list="light">
						Plan for property
					</app-label>

					<!-- <v-select
						:options="[
							{
								value: 'Pending Sale',
								label: 'Pending Sale'
							},
							{
								value: 'Refinance',
								label: 'Refinance'
							},
							{
								value: 'Rental',
								label: 'Rental'
							},
							{
								value: 'None',
								label: 'None'
							}
						]"
						:clearable="false"
						class="light"
						:reduce="propertyPlan => propertyPlan.value"
						v-model="localOtherProperty.propertyPlan"
					/> -->
				</div>
			</div>

			<!-- Current Usage / Approx Value -->
			<div class="inline-form-group">
				<!-- Current Usage -->
				<div class="input-group">
					<app-label class-list="light">
						Current Usage
					</app-label>

					<!-- <v-select
						:options="[
							{
								value: 'Primary Residence',
								label: 'Primary Residence'
							},
							{
								value: 'Secondary Residence',
								label: 'Secondary Residence'
							},
							{
								value: 'Investment Property',
								label: 'Investment Property'
							}
						]"
						:clearable="false"
						class="light"
						:reduce="currentUse => currentUse.value"
						v-model="localOtherProperty.currentUse"
					/> -->
				</div>

				<!-- Approximate Value -->
				<div class="input-group">
					<app-label class-list="light">
						Approximate Value?
					</app-label>

					<text-field
						:is-currency="true"
						theme="light"
						v-model="localOtherProperty.approximateValue"
					/>
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
import AppModal from "@/components/shared/AppModal.vue";
import TextField from "@/components/shared/inputs/TextField.vue";

export default {
	name: "PropertiesModal",
	components: {
		"app-modal": AppModal,
        "text-field": TextField,
	},
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
		otherProperty: {
			type: Object
		}
	},
	data() {
		return {
			localProperty: {},
			localOtherProperty: {}
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

		otherProperty() {
			this.localOtherProperty = JSON.parse(
				JSON.stringify({ ...this.otherProperty })
			);
		}
	},
	methods: {
		saveLocalData() {
			if (this.localProperty.otherProperties === null) {
				this.localProperty.otherProperties = [this.localOtherProperty];
			} else {
				this.localProperty.otherProperties.push(
					this.localOtherProperty
				);
			}
			this.$emit("save-property", this.localProperty);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";
</style>
