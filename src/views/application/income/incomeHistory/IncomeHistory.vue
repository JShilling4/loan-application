<template>
    <div class="incomeHistory">
        <h1 class="appHeading">Income History</h1>
        <form class="pageForm">
            <p class="pageCopy">
                {{ borrowerData.profile.firstName }}, once you've entered at
                least two years of income history you will be able to move onto
                the next section of the application
            </p>

            <app-table
                v-if="computedIncomeHistory > 0"
                :columns="tableColumns"
                :rows="borrowerData.income.incomeHistory"
            />

            <add-button text="Add Income" @click="loadIncomeModal()" />

            <view-controls @next-view="submitPage()" />
        </form>
    </div>
</template>

<script>
import income from "@/mixins/income";
import AddButton from "@/components/AddButton.vue";
import AppTable from "@/components/AppTable.vue";

export default {
    name: "IncomeHistory",
    mixins: [income],
    components: {
        "add-button": AddButton,
        "app-table": AppTable,
    },
    data() {
        return {
            tableColumns: [
                {
                    label: "Income Type",
                    field: "incomeType",
                },
                {
                    label: "Description",
                    field: "description",
                },
                {
                    label: "Start Date",
                    field: "startDate",
                },
                {
                    label: "End Date",
                    field: "endDate",
                },
                {
                    label: "Edit",
                    field: "edit",
                },
                {
                    label: "Delete",
                    field: "delete",
                },
            ],
        };
    },

    computed: {
        computedIncomeHistory() {
            return this.localIncome.incomeHistory !== null ? this.localIncome.incomeHistory : []
        },
    },

    methods: {
        loadAddressModal(income = null) {
            console.log(income);
            // if (income !== null) {
            //     this.modalAction = "Edit";
            //     this.openIncomeModal();
            // }
            // if (income == null) {
            //     this.modalAction = "Add";
            //     this.openIncomeModal();
            // }
        },

        async saveIncome(income) {
            console.log(income);
            // this.localDataIsPosting = true;
            // this.postBorrowerIncome(income).then(() => {
            //     this.localProperty = income;
            //     this.incomeModalShowing = false;
            //     this.localDataIsPosting = false;
            // });
        },

        removeIncome(income) {
            console.log(income);
            // TODO: delete address
        },
        submitPage() {
            this.editSectionProgress(1);
            this.$router.push("/income/coborrower-income-history");
        },
    },
};
</script>

<style lang="scss" scoped>
.incomeHistory {
    .pageCopy {
        width: 80%;
        margin: 0 auto 3rem;
    }
}
</style>
