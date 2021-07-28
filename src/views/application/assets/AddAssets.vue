<template>
	<div class="addAssets">
		<h1 class="appHeading">Add Assets</h1>

		<form class="pageForm">
			<app-table :columns="tableColumns" :rows="tableRows" />

			<add-button text="Add Income" />

			<view-controls @next-view="submitPage()" />
		</form>
	</div>
</template>

<script>
import assets from "@/mixins/assets";

export default {
	name: "AddAssets",
	mixins: [assets],
	components: {
		"add-button": () => import("@/components/shared/AddButton.vue"),
		"app-table": () => import("@/components/shared/AppTable.vue")
	},
	data() {
		return {
			tableColumns: [
				{
					label: "Institution Name",
					field: "institutionName"
				},
				{
					label: "Account Type",
					field: "accountType"
				},
				{
					label: "Account Value",
					field: "accountValue"
				},
				{
					label: "Edit",
					field: "edit"
				},
				{
					label: "Delete",
					field: "delete"
				}
			],
			tableRows: [
				{
					institutionName: "Lake City Bank",
					accountType: "Savings",
					accountValue: "$80,000"
				}
			]
		};
	},

	methods: {
		submitPage() {
			this.editSectionProgress(1);
			this.$router.push("/assets/coborrower-add-assets");
		}
	}
};
</script>

<style lang="scss" scoped>
form {
	max-width: 75rem;
}
</style>
