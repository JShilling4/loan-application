<template>
	<div class="addOtherProperties">
		<transition name="fade">
			<div v-if="!localDataIsLoading" class="table-wrapper">
				<app-table
					v-if="otherProperties !== null"
					:columns="tableColumns"
					:rows="otherProperties"
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
			:other-property="selectedOtherProperty"
			@save-property="onSaveOtherProperty($event)"
		/>
	</div>
</template>

<script>
import otherProperties from "@/includes/mixins/application/otherProperties";
import AppTable from "@/components/AppTable.vue";
import AddButton from "@/components/AddButton.vue";
import PropertiesModal from "@/components/PropertiesModal.vue";

export default {
	name: "OtherPropertiesTable",
    emits: ['save-property'],
    mixins: [otherProperties],

    props: {
        otherProperties: {
            type: Array,
        },
        localDataIsLoading: {
            type: Boolean,
        }
    },

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
		onSaveOtherProperty(otherProperty) {
            this.$emit("save-property", otherProperty);
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
