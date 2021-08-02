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
                @edit="loadIncomeModal"
            />

            <add-button
                text="Add Income"
                @click="loadIncomeModal()"
            />

            <income-modal
                :is-showing="incomeDetailsModalShowing"
                :is-posting="localDataIsPosting"
                :modal-action="modalAction"
                @close="closeIncomeModal()"
                :profile="borrowerData.profile"
                :income="borrowerData.income"
                :income-details="selectedIncomeDetails"
                @save-income="saveIncomeDetails($event)"
            />

            <div class="inline-group">
                <app-label class-list="dark">{{ $t('formLabels.currentWorkYears') }}</app-label>
                <text-field v-model="localIncome.currentWorkYears" />
            </div>

            <view-controls @next-view="submitPage()" />
        </form>
    </div>
</template>

<script>
import income from "@/includes/mixins/application/income";
import incomeHistory from "@/includes/mixins/application/incomeHistory";
import AddButton from "@/components/AddButton.vue";
import AppTable from "@/components/AppTable.vue";
import IncomeModal from "@/components/IncomeModal.vue";

export default {
    name: "IncomeHistory",
    mixins: [income, incomeHistory],
    components: {
        "add-button": AddButton,
        "app-table": AppTable,
        "income-modal": IncomeModal,
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
            return this.localIncome.incomeHistory !== null
                ? this.localIncome.incomeHistory
                : [];
        },
    },

    methods: {
        loadIncomeModal(income = null) {
            if (income !== null) {
                this.modalAction = "Edit";
                this.selectedIncomeDetails = this.deepClone(income);
                this.openIncomeModal();
            }

            if (income == null) {
                this.modalAction = "Add";
                this.selectedIncomeDetails = {
                    incomeType: null,
                    currentOrPriorEmployer: null,
                    compensationType: [],
                };
                this.openIncomeModal();
            }
        },

        async saveIncomeDetails(income) {
            this.localDataIsPosting = true;
            this.postBorrowerIncome(income).then(() => {
                this.localIncome = income;
                this.incomeDetailsModalShowing = false;
                this.localDataIsPosting = false;
            });
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

    .inline-group {
        align-items: center;
        margin-top: 4rem;
        label {
            word-wrap: nowrap;
            margin-right: 1.5rem;
        }
        .input-wrapper {
            width: 8rem;
        }
    }
}
</style>
