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
                    v-model="localIncome.incomeType"
                />
            </div>

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
                        v-model="localIncome.employerName"
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
                        v-model="localIncome.jobTitle"
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
                    v-model="localIncome.employerAddress"
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
                        v-model="localIncome.employerCity"
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
                        v-model="localIncome.employerState"
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
                        v-model="localIncome.employerZipcode"
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
                        v-model="localIncome.employerPhone"
                    />
                </div>
            </div>

            <v-spacer height="3rem" />

            <!-- Current Or Prior Employer -->
            <div class="inline-form-group">
                <p class="label inline col1">
                    This employer is:
                </p>

                <h-spacer width="2rem" />

                <div class="radio-group-wrapper col2">
                    <div class="radioButton-container">
                        <radio-button
                            label="Prior"
                            name="currentOrPriorEmployer"
                            class-list="light"
                            width="100%"
                            v-model="localIncome.currentOrPriorEmployer"
                        />
                    </div>

                    <div class="radioButton-container">
                        <radio-button
                            label="Current"
                            name="currentOrPriorEmployer"
                            class-list="light"
                            width="100%"
                            v-model="localIncome.currentOrPriorEmployer"
                        />
                    </div>
                </div>
            </div>

            <v-spacer height="3rem" />

            <!-- Employment Start / End  -->
            <div class="inline-form-group">
                <div class="col col2-4">
                    <app-label for="employmentStartDate">Start Date</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncome.employmentStartDate"
                        id="employmentStartDate"
                        name="employmentStartDate"
                    />
                </div>

                <h-spacer width="2rem" />

                <div class="col col2-4">
                    <app-label for="employmentEndDate">End Date</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncome.employmentEndDate"
                        id="employmentEndDate"
                        name="employmentEndDate"
                    />
                </div>
            </div>

            <v-spacer height="3rem" />

            <!-- Compensation Type -->
            <div class="input-group">
                <app-label>How are you paid? (Check all that apply)</app-label>
                <div class="inline-group">
                    <div class="radio-group-wrapper col2">
                        <div class="radioButton-container">
                            <radio-button
                                label="Salary"
                                name="compensationType"
                                class-list="light"
                                width="100%"
                                v-model="localIncome.compensationType"
                            />
                        </div>
                        <div class="radioButton-container">
                            <radio-button
                                label="Hourly"
                                name="compensationType"
                                class-list="light"
                                width="100%"
                                v-model="localIncome.compensationType"
                            />
                        </div>
                    </div>

                    <h-spacer width="2rem" />

                    <div class="radio-group-wrapper col2">
                        <div class="radioButton-container">
                            <radio-button
                                label="Commission"
                                name="compensationType"
                                class-list="light"
                                width="100%"
                                v-model="localIncome.compensationType"
                            />
                        </div>
                        <div class="radioButton-container">
                            <radio-button
                                label="Bonus"
                                name="compensationType"
                                class-list="light"
                                width="100%"
                                v-model="localIncome.compensationType"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <v-spacer height="3rem" />

            <!-- Monthly Salary / Hourly Pay / Hours Weekly -->
            <div class="inline-form-group">
                <!--  Monthly Salary -->
                <div class="col col2-4">
                    <app-label for="monthlySalary">Monthly Salary</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncome.monthlySalary"
                        id="monthlySalary"
                        name="monthlySalary"
                    />
                </div>

                <h-spacer width="2rem" />

                <!--  Hourly Pay Rate -->
                <div class="col col2-4">
                    <app-label for="hourlyPayRate">Hourly Pay Rate</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncome.hourlyPayRate"
                        id="hourlyPayRate"
                        name="hourlyPayRate"
                    />
                </div>

                <h-spacer width="2rem" />

                <!-- Average Weekly Hours -->
                <div class="col col2-4">
                    <app-label for="weeklyHours">Average Hours Per Week</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncome.weeklyHours"
                        id="weeklyHours"
                        name="weeklyHours"
                    />
                </div>
            </div>

            <v-spacer height="3rem" />

            <!-- Commission / Bonus Amounts -->
            <div class="inline-form-group">
                <!--  Monthly Commission -->
                <div class="col col2-4">
                    <app-label for="monthlyCommission">Monthly Commission</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncome.monthlyCommission"
                        id="monthlyCommission"
                        name="monthlyCommission"
                    />
                </div>

                <h-spacer width="2rem" />

                <!-- Monthly Bonus -->
                <div class="col col2-4">
                    <app-label for="weeklyHours">Monthly Bonus</app-label>
                    <text-field
                        theme="light"
                        v-model="localIncome.monthlyBonus"
                        id="monthlyBonus"
                        name="monthlyBonus"
                    />
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
    emits: ["saveIncome"],
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
    },
    data() {
        return {
            localIncome: {},
        };
    },
    computed: {
        ...mapState(["states"]),
    },
    watch: {
        income() {
            this.localIncome = this.deepClone(this.income);
        },
    },
    methods: {
        saveLocalData() {
            this.$emit("save-income", this.localIncome);
        },
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
