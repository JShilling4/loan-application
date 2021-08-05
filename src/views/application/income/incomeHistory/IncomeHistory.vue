<template>
    <div class="incomeHistory">
        <h1 class="appHeading">Income History</h1>

        <transition name="fade">
            <div
                v-if="!localDataIsLoading"
                class="pageWrapper"
            >
                <p class="pageCopy">
                    {{ borrowerData.profile.firstName }}, once you've entered at
                    least two years of income history you will be able to move onto
                    the next section of the application
                </p>

                <!-- Table -->
                <transition name="fade">
                    <app-table
                        v-if="tableShouldShow"
                        :columns="tableColumns"
                        :rows="computedIncomeHistory"
                        @edit="loadIncomeModal"
                    />
                </transition>

                <!-- Add New Button -->
                <add-button
                    text="Add Income"
                    @click="loadIncomeModal()"
                />

                <!-- Current Work Years -->
                <div class="inline-group">
                    <app-label class-list="dark">{{ $t('formLabels.currentWorkYears') }}</app-label>
                    <text-field
                        v-model="localIncome.currentWorkYears"
                        text-align="center"
                    />
                </div>

                <view-controls @advance-app="submitPage()" @retreat-app="$router.go(-1)" />
            </div>
        </transition>

        <transition name="fade">
            <div
                v-if="localDataIsLoading"
                class="loading-wrapper"
            >
                <loading-indicator />
            </div>
        </transition>

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
                    tdClass: "incomeType",
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
                    thClass: "center",
                    tdClass: "center",
                },
                {
                    label: "Delete",
                    field: "delete",
                    thClass: "center",
                    tdClass: "center",
                },
            ],
        };
    },

    computed: {
        computedIncomeHistory() {
            return this.localIncome.incomeHistory !== null
                ? this.localIncome.incomeHistory
                : null;
        },
        tableShouldShow() {
            if (!this.computedIncomeHistory) {
                return false;
            } else if (
                this.computedIncomeHistory.length > 0 &&
                !this.localDataIsLoading
            ) {
                return true;
            }
            return false;
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
    .pageWrapper {
        max-width: 80rem;
        margin: 0 auto;
    }
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
            width: 6rem;
        }
    }
}

:deep(td.incomeType span) {
    text-transform: capitalize;
}
</style>
