<template>
    <app-modal
        width="65rem"
        :show="isShowing"
        :show-close-button="true"
        :clickaway="true"
        background-color="#fff"
        @close="$emit('close')"
    >
        <template v-slot:body>
            <span class="heading">
                {{ profile.firstName }}'s Income History
            </span>

            <!-- Income Type -->
            <div class="input-group">
                <app-label class-list="light">
                    Choose your income type
                </app-label>

                <multi-select
                    :options="[
                        {
                            value: 'employed',
                            label: 'Employed'
                        },
                        {
                            value: 'selfEmployed',
                            label: 'Self Employed'
                        },
                        {
                            value: 'military',
                            label: 'Military'
                        },
                        {
                            value: 'socialSecurity',
                            label: 'Social Security'
                        },
                        {
                            value: 'pension',
                            label: 'Pension'
                        },
                        {
                            value: 'other',
                            label: 'Other'
                        }
                    ]"
                    :can-clear="false"
                    class="multiselect light"
                    v-model="localIncomeDetails.incomeType"
                />
            </div>

            <div v-if="supportingInputsShouldShow">
                <v-spacer height="2rem" />

                <!-- Employer Name / Job Title -->
                <div class="inline-form-group">
                    <!-- Employer Name -->
                    <div class="col col2-4">
                        <app-label class-list="light">
                            Employer Name
                        </app-label>

                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employerName"
                        />
                    </div>

                    <h-spacer width="2rem" />

                    <!-- Job Title -->
                    <div class="col col2-4">
                        <app-label class-list="light">
                            Job Title
                        </app-label>

                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.jobTitle"
                        />
                    </div>
                </div>

                <v-spacer height="2rem" />

                <!-- Employer Address -->
                <div class="input-group">
                    <app-label class-list="light">
                        Employer Address (optional)
                    </app-label>

                    <text-field
                        theme="light"
                        v-model="localIncomeDetails.employerAddress"
                    />
                </div>

                <v-spacer height="2rem" />

                <!-- Employer City / Employer State -->
                <div class="inline-form-group">
                    <!-- City -->
                    <div class="col col2-4">
                        <app-label
                            theme="light"
                            for="city"
                        >
                            Employer City
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employerCity"
                            id="city"
                            name="city"
                        />
                    </div>

                    <h-spacer width="2rem" />

                    <!-- State -->
                    <div class="col col2-4">
                        <app-label theme="light">
                            Employer State
                        </app-label>
                        <multi-select
                            :options="states"
                            :can-clear="false"
                            class="multiselect light"
                            v-model="localIncomeDetails.employerState"
                        />
                    </div>
                </div>

                <v-spacer height="2rem" />

                <!-- Employer Zipcode / Employer Phone -->
                <div class="inline-form-group">
                    <!-- Employer Zipcode -->
                    <div class="col col2-4">
                        <app-label
                            theme="light"
                            for="city"
                        >
                            Employer Zip Code
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employerZipcode"
                            id="city"
                            name="city"
                        />
                    </div>

                    <h-spacer width="2rem" />

                    <!-- Employer Phone -->
                    <div class="col col2-4">
                        <app-label theme="light">
                            Employer Phone
                        </app-label>
                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employerPhone"
                        />
                    </div>
                </div>

                <v-spacer height="3rem" />

                <!-- Current Or Prior Employer -->
                <div class="inline-form-group">
                    <app-label class="label inline col1">
                        This employer is:
                    </app-label>

                    <h-spacer width="2rem" />

                    <div class="radio-group-wrapper col2">
                        <div class="radioButton-container">
                            <radio-button
                                label="Prior"
                                name="currentOrPriorEmployer"
                                class-list="light"
                                width="100%"
                                v-model="localIncomeDetails.currentOrPriorEmployer"
                            />
                        </div>

                        <div class="radioButton-container">
                            <radio-button
                                label="Current"
                                name="currentOrPriorEmployer"
                                class-list="light"
                                width="100%"
                                v-model="localIncomeDetails.currentOrPriorEmployer"
                            />
                        </div>
                    </div>
                </div>

                <v-spacer height="2rem" />

                <!-- Employment Start / End  -->
                <div
                    v-if="localIncomeDetails.currentOrPriorEmployer !== null"
                    class="inline-form-group"
                >
                    <!-- Employment Start -->
                    <div class="col col2-4">
                        <app-label for="employmentStartDate">Start Date</app-label>
                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employmentStartDate"
                            id="employmentStartDate"
                            name="employmentStartDate"
                        />
                    </div>

                    <h-spacer width="2rem" />

                    <!-- Employment End -->
                    <div class="col col2-4">
                        <app-label for="employmentEndDate">End Date</app-label>
                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employmentEndDate"
                            id="employmentEndDate"
                            name="employmentEndDate"
                        />
                    </div>
                </div>

                <v-spacer height="3rem" />

                <!-- Compensation Type -->
                <div class="input-group">
                    <app-label>How are you paid? (Check all that apply)</app-label>
                    <multi-select
                        mode="tags"
                        :options="[
                            {
                                value: 'salary',
                                label: 'Salary'
                            },
                            {
                                value: 'hourly',
                                label: 'Hourly'
                            },
                            {
                                value: 'commission',
                                label: 'Commission'
                            },
                            {
                                value: 'bonus',
                                label: 'Bonus'
                            },
                        ]"
                        :can-clear="false"
                        class="multiselect light"
                        v-model="localIncomeDetails.compensationType"
                        @select="onCompensationTypeSelected"
                    />
                </div>

                <v-spacer height="3rem" />

                <div v-if="localIncomeDetails.compensationType.length !== 0">
                    <!-- Monthly Salary / Hourly Pay / Hours Weekly -->
                    <div class="inline-form-group">
                        <!--  Monthly Salary -->
                        <div
                            v-if="localIncomeDetails.compensationType.includes('salary')"
                            class="col col2-4"
                        >
                            <app-label for="monthlySalary">Monthly Salary</app-label>
                            <text-field
                                theme="light"
                                v-model="localIncomeDetails.monthlySalary"
                                id="monthlySalary"
                                name="monthlySalary"
                            />
                        </div>

                        <!-- <h-spacer
                            v-if="localIncomeDetails.compensationType.includes('salary')"
                            width="2rem"
                        /> -->
                        <app-column
                            v-if="localIncomeDetails.compensationType.includes('salary')"
                            :c-assign="2"
                            :c-total="4"
                        />

                        <!--  Hourly Pay Rate -->
                        <app-column
                            v-if="localIncomeDetails.compensationType.includes('hourly')"
                            :c-assign="2"
                            :c-total="4"
                        >
                            <app-label for="hourlyPayRate">Hourly Pay Rate</app-label>
                            <text-field
                                theme="light"
                                v-model="localIncomeDetails.hourlyPayRate"
                                id="hourlyPayRate"
                                name="hourlyPayRate"
                            />
                        </app-column>

                        <h-spacer width="2rem" />

                        <!-- Average Weekly Hours -->
                        <app-column
                            v-if="localIncomeDetails.compensationType.includes('hourly')"
                            :c-assign="2"
                            :c-total="4"
                        >
                            <app-label for="weeklyHours">Average Hours Per Week</app-label>
                            <text-field
                                theme="light"
                                v-model="localIncomeDetails.weeklyHours"
                                id="weeklyHours"
                                name="weeklyHours"
                            />
                        </app-column>
                    </div>

                    <v-spacer height="3rem" />

                    <!-- Commission / Bonus Amounts -->
                    <div
                        v-if="localIncomeDetails.compensationType.includes('commission')
                            || localIncomeDetails.compensationType.includes('bonus')"
                        class="inline-form-group"
                    >
                        <!--  Monthly Commission -->
                        <app-column
                            v-if="localIncomeDetails.compensationType.includes('commission')"
                            :c-assign="2"
                            :c-total="4"
                        >
                            <app-label for="monthlyCommission">Monthly Commission</app-label>
                            <text-field
                                theme="light"
                                v-model="localIncomeDetails.monthlyCommission"
                                id="monthlyCommission"
                                name="monthlyCommission"
                            />
                        </app-column>

                        <h-spacer
                            v-if="localIncomeDetails.compensationType.includes('commission')"
                            width="2rem"
                        />

                        <!-- Monthly Bonus -->
                        <app-column
                            v-if="localIncomeDetails.compensationType.includes('bonus')"
                            :c-assign="2"
                            :c-total="4"
                        >
                            <app-label for="weeklyHours">Monthly Bonus</app-label>
                            <text-field
                                theme="light"
                                v-model="localIncomeDetails.monthlyBonus"
                                id="monthlyBonus"
                                name="monthlyBonus"
                            />
                        </app-column>
                    </div>
                </div>
            </div>

            <v-spacer height="4rem" />

            <div class="button-wrapper">
                <app-button
                    @click="saveLocalData()"
                    :is-posting="isPosting"
                    indicator-type="button"
                >
                    {{ modalAction }}
                </app-button>
            </div>
        </template>
    </app-modal>
</template>

<script>
import { mapState } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    name: "IncomeModal",
    components: {},
    emits: ["saveIncome", "close"],
    mixins: [deepClone],
    props: {
        isShowing: {
            type: Boolean,
        },
        isPosting: {
            type: Boolean,
        },
        modalAction: {
            type: String,
        },
        profile: {
            type: Object,
        },
        income: {
            type: Object,
        },
        incomeDetails: {
            type: Object,
        },
    },
    data() {
        return {
            localIncome: {},
            localIncomeDetails: {},
        };
    },
    computed: {
        ...mapState(["states"]),

        supportingInputsShouldShow() {
            const { incomeType } = this.localIncomeDetails;
            return incomeType !== null && incomeType !== undefined;
        },
    },
    watch: {
        income() {
            this.localIncome = this.deepClone(this.income);
        },
        incomeDetails() {
            this.localIncomeDetails = this.deepClone(this.incomeDetails);
        },
    },
    methods: {
        saveLocalData() {
            let { incomeHistory } = this.localIncome;
            if (incomeHistory === null) {
                incomeHistory = [this.localIncomeDetails];
            } else {
                incomeHistory.push(this.localIncomeDetails);
            }
            this.$emit("save-income", this.localIncome);
        },
        onCompensationTypeSelected(option) {
            let { compensationType } = this.localIncomeDetails;
            if (option === "salary" && compensationType.includes("hourly")) {
                const hourlyIndex = compensationType.indexOf("hourly");
                compensationType.splice(hourlyIndex, 1);
            }
            if (option === "hourly" && compensationType.includes("salary")) {
                const hourlyIndex = compensationType.indexOf("salary");
                compensationType.splice(hourlyIndex, 1);
            }
        },
    },

    mounted() {
        this.localIncomeDetails = this.deepClone(this.incomeDetails);
    },
};
</script>

<style lang="scss" scoped>
@import "@/design/scss/_modalContent.scss";

.inline-form-group {
    margin-bottom: 0;
}
.input-group {
    margin-bottom: 0;
}
</style>
