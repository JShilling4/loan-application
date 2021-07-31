<template>
	<div class="addOtherProperties">
		<h1 class="appHeading">
			Other Properties
		</h1>

		<transition name="fade">
			<div v-if="!localDataIsLoading" class="page-wrapper">
				<app-table
					v-if="borrowerData.property.otherProperties !== null"
					:columns="tableColumns"
					:rows="borrowerData.property.otherProperties"
					@edit="loadPropertyModal"
				/>

				<add-button
					text="Add Property"
					@click="loadPropertyModal()"
				/>

				<view-controls @next-view="submitPage()" />
			</div>
		</transition>

		<transition name="fadeIn">
			<div v-if="localDataIsLoading" class="loading-wrapper">
				<loading-indicator />
			</div>
		</transition>

		<properties-modal
			:is-showing="propertyModalShowing"
			:modal-action="modalAction"
			@close="closePropertyModal()"
			:profile="borrowerData.profile"
			:property="borrowerData.property"
			:other-property="selectedOtherProperty"
			@save-property="saveOtherProperty"
		/>
	</div>
</template>

<script>
import property from "@/includes/applicationMixins/property";
import otherProperties from "@/includes/applicationMixins/otherProperties";
import AppTable from "@/components/AppTable.vue";
import AddButton from "@/components/AddButton.vue";
import PropertiesModal from "@/components/PropertiesModal.vue";

export default {
	name: "addOtherProperties",
	mixins: [property, otherProperties],
	components: {
		"app-table": AppTable,
        "add-button": AddButton,
		"properties-modal": PropertiesModal
	},
	data() {
		return {
			tableColumns: [
				{
					label: "Address",
					field: "streetAddress"
				},
				{
					label: "Current Use",
					field: "currentUse"
				},
				{
					label: "Edit",
					field: "edit",
					thClass: "center",
					tdClass: "center"
				},
				{
					label: "Delete",
					field: "delete",
					thClass: "center",
					tdClass: "center"
				}
			]
		};
	},

	computed: {
		sectionProgress() {
			if (this.borrowerData.about.hasCoborrower == true) {
				return 5;
			}
			return 4;
		}
	},

	methods: {
		submitPage() {
			// update section progress
			this.editSectionProgress(this.sectionProgress);

			// route to next page
			if (this.borrowerData.about.hasCoborrower == true) {
				this.$router.push("/property/add-coborrower-properties");
			} else {
				this.$router.push("/property/purchase-info");
			}
		},

		saveOtherProperty(otherProperty) {
			this.postBorrowerProperty(otherProperty);
			this.propertyModalShowing = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrapper {
	max-width: 700px;
	margin: 0 auto;
}
</style>
