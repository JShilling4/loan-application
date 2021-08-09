<template>
    <app-modal
        width="60rem"
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
                <app-label theme="light">
                    Choose your income type
                </app-label>

                <multi-select
                    :options="[
                        {
                            value: 'Employed',
                            label: 'Employed'
                        },
                        {
                            value: 'Self Employed',
                            label: 'Self Employed'
                        },
                        {
                            value: 'Military',
                            label: 'Military'
                        },
                        {
                            value: 'Social Security',
                            label: 'Social Security'
                        },
                        {
                            value: 'Pension',
                            label: 'Pension'
                        },
                        {
                            value: 'Other',
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

                <div v-if="localIncomeDetails.incomeType !== 'Social Security'
                        && localIncomeDetails.incomeType !== 'Other'">
                    <!-- Employer Name / Job Title -->
                    <div class="inline-form-group">
                        <!-- Employer Name -->
                        <div class="col col2-4">
                            <app-label theme="light">
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
                            <app-label theme="light">
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
                        <app-label theme="light">
                            Employer Address (optional)
                        </app-label>

                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employerAddress"
                        />
                    </div>

                    <v-spacer height="2rem" />

                    <div v-if="localIncomeDetails.incomeType !== 'Pension'">
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
                                    for="zipcode"
                                >
                                    Employer Zip Code
                                </app-label>
                                <text-field
                                    theme="light"
                                    v-model="localIncomeDetails.employerZipcode"
                                    id="zipcode"
                                    name="zipcode"
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
                    </div>

                    <v-spacer
                        v-if="localIncomeDetails.incomeType !== 'Pension'"
                        height="3rem"
                    />
                </div>

                <!-- Current Or Prior Employer -->
                <div
                    v-if="localIncomeDetails.incomeType !== 'Social Security'
                        && localIncomeDetails.incomeType !== 'Pension'"
                    class="inline-form-group"
                >
                    <app-label theme="light">
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

                <v-spacer
                    v-if="localIncomeDetails.incomeType !== 'Social Security'
                        && localIncomeDetails.incomeType !== 'Pension'"
                    height="2rem"
                />

                <!-- Employment Start / End  -->
                <div
                    v-if="localIncomeDetails.currentOrPriorEmployer !== null
                        || localIncomeDetails.incomeType === 'Social Security'
                        || localIncomeDetails.incomeType === 'Pension'"
                    class="inline-form-group"
                >
                    <!-- Employment Start -->
                    <app-column
                        :c-assign="2"
                        :c-total="4"
                    >
                        <app-label
                            theme="light"
                            for="employmentStartDate"
                        >Start Date</app-label>
                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.startDate"
                            id="employmentStartDate"
                            name="employmentStartDate"
                        />
                    </app-column>

                    <h-spacer width="2rem" />

                    <!-- Employment End -->
                    <app-column
                        v-if="localIncomeDetails.currentOrPriorEmployer !== 'Current'
                            && localIncomeDetails.incomeType !== 'Social Security'
                            && localIncomeDetails.incomeType === 'Other'"
                        :c-assign="2"
                        :c-total="4"
                    >
                        <app-label
                            theme="light"
                            for="employmentEndDate"
                        >End Date</app-label>
                        <text-field
                            theme="light"
                            v-model="localIncomeDetails.employmentEndDate"
                            id="employmentEndDate"
                            name="employmentEndDate"
                        />
                    </app-column>

                </div>

                <v-spacer
                    v-if="localIncomeDetails.currentOrPriorEmployer !== null
                        || localIncomeDetails.incomeType === 'Social Security'
                        || localIncomeDetails.incomeType === 'Pension'"
                    height="2rem"
                />

                <!-- Compensation Type -->
                <div
                    v-if="localIncomeDetails.incomeType === 'Employed'
                        || localIncomeDetails.incomeType === 'Military'"
                    class="input-group"
                >
                    <app-label theme="light">How are you paid? (Check all that apply)</app-label>
                    <multi-select
                        mode="tags"
                        :options="[
                            {
                                value: 'salary',
                                label: 'Salary'
                            },
                            ...(localIncomeDetails.incomeType !== 'Military' ? [{
                                value: 'hourly',
                                label: 'Hourly'
                            },] : []),
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
                    <v-spacer height="2rem" />
                </div>

                <div v-if="localIncomeDetails.compensationType.length !== 0">
                    <!-- Monthly Salary / Hourly Pay / Hours Weekly -->
                    <div class="inline-form-group">
                        <!--  Monthly Salary -->
                        <div
                            v-if="localIncomeDetails.compensationType.includes('salary')"
                            class="col col2-4"
                        >
                            <app-label
                                theme="light"
                                for="monthlySalary"
                            >Monthly Salary</app-label>
                            <text-field
                                theme="light"
                                :is-currency="true"
                                v-model="localIncomeDetails.monthlySalary"
                                id="monthlySalary"
                                name="monthlySalary"
                            />
                        </div>

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
                            <app-label
                                theme="light"
                                for="hourlyPayRate"
                            >Hourly Pay Rate</app-label>
                            <text-field
                                theme="light"
                                :is-currency="true"
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
                            <app-label
                                theme="light"
                                for="weeklyHours"
                            >Average Hours Per Week</app-label>
                            <text-field
                                theme="light"
                                v-model="localIncomeDetails.averageWeeklyHours"
                                id="weeklyHours"
                                name="weeklyHours"
                            />
                        </app-column>
                    </div>

                    <v-spacer
                        v-if="localIncomeDetails.compensationType.includes('salary')
                            || localIncomeDetails.compensationType.includes('hourly')"
                        height="2rem"
                    />

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
                            <app-label
                                theme="light"
                                for="monthlyCommission"
                            >Monthly Commission</app-label>
                            <text-field
                                theme="light"
                                :is-currency="true"
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
                            <app-label
                                theme="light"
                                for="weeklyHours"
                            >Monthly Bonus</app-label>
                            <text-field
                                theme="light"
                                :is-currency="true"
                                v-model="localIncomeDetails.monthlyBonus"
                                id="monthlyBonus"
                                name="monthlyBonus"
                            />
                        </app-column>
                    </div>
                </div>

                <v-spacer
                    v-if="localIncomeDetails.compensationType.includes('commission')
                        || localIncomeDetails.compensationType.includes('bonus')"
                    height="2rem"
                />

                <!-- Monthly Income -->
                <app-column
                    v-if="localIncomeDetails.incomeType !== 'Employed'
                        && localIncomeDetails.incomeType !== 'Military'"
                    :c-assign="2"
                    :c-total="4"
                >
                    <app-label
                        theme="light"
                        for="monthlyIncome"
                    >Monthly Income</app-label>
                    <text-field
                        theme="light"
                        :is-currency="true"
                        v-model="localIncomeDetails.monthlyIncome"
                        id="monthlyIncome"
                        name="monthlyIncome"
                    />
                </app-column>

                <v-spacer
                    v-if="localIncomeDetails.incomeType !== 'Employed'
                        && localIncomeDetails.incomeType !== 'Military'"
                    height="2rem"
                />

                <!-- Income Description -->
                <div
                    v-if="localIncomeDetails.incomeType === 'Other'"
                    class="input-group"
                >
                    <app-label
                        theme="light"
                        for="incomeDescription"
                    >Income Description</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncomeDetails.incomeDescription"
                        id="incomeDescription"
                        name="incomeDescription"
                    />
                </div>

                <v-spacer
                    v-if="localIncomeDetails.incomeType === 'Other'"
                    height="2rem"
                />
            </div>

            <v-spacer
                v-if="localIncomeDetails.incomeType === null"
                height="3rem"
            />

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
    emits: ["save-income", "close"],
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
        incomeDetails: {
            type: Object,
        },
    },

    data() {
        return {
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
        incomeDetails() {
            this.localIncomeDetails = this.deepClone(this.incomeDetails);
        },
    },

    methods: {
        saveLocalData() {
            this.$emit("save-income", this.localIncomeDetails);
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

    // mounted() {
    //     this.localIncomeDetails = this.deepClone(this.incomeDetails);
    // },
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
