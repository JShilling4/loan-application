<template>
	<div class="coborrowerAddAssets">
		<h1 class="appHeading">Co-borrower Add Assets</h1>

		<form class="pageForm">
			<app-table :columns="tableColumns" :rows="tableRows" />

			<add-button text="Add Income" />

			<view-controls @next-view="submitPage()" />
		</form>
	</div>
</template>

<script>
import assets from "@/includes/mixins/application/assets";

export default {
	name: "CoborrowerAddAssets",
	mixins: [assets],
	components: {
		"add-button": () => import("@/components/AddButton.vue"),
		"app-table": () => import("@/components/AppTable.vue")
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
			this.editSectionProgress(2);
			this.$router.push("/identity/declarations");
		}
	}
};
</script>

<style lang="scss" scoped>
form {
	max-width: 75rem;
}

.pageCopy {
	margin: 0 auto 4rem;
	width: 95%;
}
</style>
