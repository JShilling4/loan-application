<template>
	<div class="addOtherProperties">
		<h1 class="appHeading">
			Other Properties
		</h1>

		<transition name="fade">
			<div v-if="!localDataIsLoading" class="page-wrapper">
				<app-table
					v-if="borrower.property.otherProperties !== null"
					:columns="tableColumns"
					:rows="borrower.property.otherProperties"
					@edit="loadPropertyModal"
				/>

				<add-button
					text="Add Property"
					@click="loadPropertyModal()"
				/>

				<view-controls @advance-app="submitPage()" @retreat-app="$router.go(-1)" />
			</div>
		</transition>

		<transition name="fade">
			<div v-if="localDataIsLoading" class="loading-wrapper">
				<loading-indicator />
			</div>
		</transition>

		<properties-modal
			:is-showing="propertyModalShowing"
			:modal-action="modalAction"
			@close="closePropertyModal()"
			:profile="borrower.profile"
			:property="borrower.property"
			:other-property="selectedOtherProperty"
			@save-property="saveOtherProperty"
		/>
	</div>
</template>

<script>
import property from "@/includes/mixins/application/property";
import otherProperties from "@/includes/mixins/application/otherProperties";
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
			if (this.borrower.about.hasCoborrower == true) {
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
			if (this.borrower.about.hasCoborrower == true) {
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
