<template>
	<div class="coborrowerIncomeHistory">
		<h1 class="appHeading">Co-borrower Income History</h1>
		<form class="pageForm">
			<p class="pageCopy">
				{Coborrower}, once you've entered at least two years of income
				history you will be able to move onto the next section of the
				application
			</p>

			<app-table
				v-if="localCoborrowerIncome.incomeHistory !== null"
				:columns="tableColumns"
				:rows="localCoborrowerIncome.incomeHistory"
			/>

			<add-button text="Add Income" />

			<view-controls @next-view="submitPage()" />
		</form>
	</div>
</template>

<script>
import income from "@/includes/applicationMixins/income";

export default {
	name: "IncomeHistory",
	mixins: [income],
	components: {
		"add-button": () => import("@/components/AddButton.vue"),
		"app-table": () => import("@/components/AppTable.vue")
	},
	data() {
		return {
			tableColumns: [
				{
					label: "Income Type",
					field: "incomeType"
				},
				{
					label: "Description",
					field: "description"
				},
				{
					label: "Start Date",
					field: "startDate"
				},
				{
					label: "End Date",
					field: "endDate"
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
			this.editSectionProgress(2);
			this.$router.push("/income/credit-check");
		}
	}
};
</script>

<style lang="scss" scoped>
.coborrowerIncomeHistory {
	.pageCopy {
		width: 80%;
		margin: 0 auto 3rem;
	}
}
</style>
