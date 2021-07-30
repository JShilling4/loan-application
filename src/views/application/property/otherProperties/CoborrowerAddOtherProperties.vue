<template>
	<div class="CoborrowerAddOtherProperties">
		<h1 class="appHeading">
			Coborrower Other Properties
		</h1>

		<transition name="fade">
			<div v-if="!localDataIsLoading" class="page-wrapper">
				<app-table
					v-if="coborrowerData.property.otherProperties !== null"
					:columns="tableColumns"
					:rows="coborrowerData.property.otherProperties"
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
			:profile="coborrowerData.profile"
			:property="coborrowerData.property"
			:other-property="selectedOtherProperty"
			@save-property="saveProperty"
		/>
	</div>
</template>

<script>
import property from "@/mixins/property";
import otherProperties from "@/mixins/otherProperties";
import AddButton from "@/components/AddButton.vue";
import AppTable from "@/components/AppTable.vue";
import PropertiesModal from "@/components/PropertiesModal.vue";

export default {
	name: "CoborrowerAddOtherProperties",
	mixins: [property, otherProperties],
	components: {
		"add-button": AddButton,
		"app-table": AppTable,
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
					field: "edit"
				},
				{
					label: "Delete",
					field: "delete"
				}
			]
		};
	},
	methods: {
		submitPage() {
			// post data
			this.postCoborrowerProperty(this.localCoborrowerProperty);

			// update section progress
			this.editSectionProgress(6);

			// route to next section
			this.$router.push("/property/purchase-info");
		},

		saveProperty(otherProperty) {
			this.postCoborrowerProperty(otherProperty);
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
