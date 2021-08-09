<template>
	<div class="addOtherProperties">
		<transition name="fade">
			<div v-if="!localDataIsLoading" class="table-wrapper">
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

	methods: {
		saveOtherProperty(otherProperty) {
			this.postBorrowerProperty(otherProperty);
			this.propertyModalShowing = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.table-wrapper {
	max-width: 700px;
	margin: 4rem auto 0;
}
</style>
