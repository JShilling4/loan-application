<template>
    <div class="declarations">
        <h1 class="appHeading">Borrower Declarations</h1>
        <div class="pageWrapper">
            <p class="pageCopy">
                The federal government requires us to ask the following questions.
            </p>

            <transition name="fade" appear>
                <question-slider
                    v-if="localIdentity.declarations"
                    :active-set="activeSet"
                    :set-total="setTotal"
                    @advance="goToNextQuestion()"
                    @retreat="goToPreviousQuestion()"
                >
                    <div class="questions">
                        <!-- Citizenship Status -->
                        <div
                            v-if="activeSet === 1"
                            class="input-group"
                        >
                            <p class="question">What is your citizenship status?</p>
                            <multi-select
                                :options="[
                                    {
                                        value: 'U.S. Citizen',
                                        label: 'U.S. Citizen'
                                    },
                                    {
                                        value: 'Permanent Resident Alien',
                                        label: 'Permanent Resident Alien'
                                    },
                                    {
                                        value: 'Non Permanent Resident Alien',
                                        label: 'Non Permanent Resident Alien'
                                    },
                                ]"
                                :can-clear="false"
                                class="multiselect"
                                v-model="localIdentity.declarations.citizenshipStatus"
                            />
                        </div>

                        <!-- Primary Residence Set -->
                        <div
                            v-if="activeSet === 2"
                            class="input-group"
                        >
                            <p class="question">Will you occupy the property as your primary residence?</p>
                            <!-- Primary Residence-->
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="primaryResidence"
                                        width="100%"
                                        v-model="localIdentity.declarations.primaryResidence"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="primaryResidence"
                                        width="100%"
                                        v-model="localIdentity.declarations.primaryResidence"
                                    />
                                </div>
                            </div>

                            <!-- Ownership Interest -->
                            <div v-if="localIdentity.declarations.primaryResidence === 'Yes'">
                                <v-spacer height="2rem" />
                                <app-label>Have you had ownership interest in another property in the last three years?</app-label>
                                <div class="inline-group">
                                    <div class="radioButton-container">
                                        <radio-button
                                            label="Yes"
                                            name="hadOwnershipInterest"
                                            width="100%"
                                            v-model="localIdentity.declarations.hadOwnershipInterest"
                                        />
                                    </div>

                                    <div class="radioButton-container">
                                        <radio-button
                                            label="No"
                                            name="hadOwnershipInterest"
                                            width="100%"
                                            v-model="localIdentity.declarations.hadOwnershipInterest"
                                        />
                                    </div>
                                </div>
                                <v-spacer height="2rem" />
                            </div>

                            <!-- Property Type / How Title Held -->
                            <div v-if="localIdentity.declarations.hadOwnershipInterest === 'Yes'">
                                <app-label>What type of property did you own?</app-label>
                                <multi-select
                                    :options="[
                                        {
                                            value: 'Primary Residence',
                                            label: 'Primary Residence'
                                        },
                                        {
                                            value: 'Second Home',
                                            label: 'Second Home'
                                        },
                                        {
                                            value: 'FHA Secondary Residence',
                                            label: 'FHA Secondary Residence'
                                        },
                                        {
                                            value: 'Investment Property',
                                            label: 'Investment Property'
                                        },
                                    ]"
                                    :can-clear="false"
                                    class="multiselect"
                                    v-model="localIdentity.declarations.propertyType"
                                />
                                <v-spacer height="2rem" />
                                <!-- Borrower How Title Held -->
                                <app-label>How did you hold title to the property?</app-label>
                                <multi-select
                                    :options="[
                                        {
                                            value: 'Sole Ownership',
                                            label: 'Sole Ownership'
                                        },
                                        {
                                            value: 'Joint With Spouse',
                                            label: 'Joint With Spouse'
                                        },
                                        {
                                            value: 'Joint With Other Than Spouse',
                                            label: 'Joint With Other Than Spouse'
                                        }
                                    ]"
                                    :can-clear="false"
                                    class="multiselect"
                                    v-model="localIdentity.declarations.howTitleHeld"
                                />
                            </div>
                        </div>

                        <!-- Relation to Seller -->
                        <div
                            v-if="activeSet === 3"
                            class="input-group"
                        >
                            <p class="question">Do you have a family relationship or business affiliation with the seller of the property?</p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasRelationToSeller"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasRelationToSeller"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasRelationToSeller"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasRelationToSeller"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Borrowing Money -->
                        <div
                            v-if="activeSet == 4"
                            class="input-group"
                        >
                            <p class="question">Are you borrowing any money for this real estate transaction (e.g., money for your
                                closing costs or down payment) or obtaining any money from another party, such as the
                                seller or realtor, that you have not disclosed on this loan application?
                            </p>
                            <!-- Borrowing Money-->
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="isBorrowingMoney"
                                        width="100%"
                                        v-model="localIdentity.declarations.isBorrowingMoney"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="isBorrowingMoney"
                                        width="100%"
                                        v-model="localIdentity.declarations.isBorrowingMoney"
                                    />
                                </div>
                            </div>

                            <!-- Borrowed Amount -->
                            <div
                                v-if="localIdentity.declarations.isBorrowingMoney === 'Yes'"
                                class="input-group restrict-width"
                            >
                                <v-spacer height="2rem" />
                                <app-label>What is the amount of this money?</app-label>
                                <text-field
                                    :is-currency="true"
                                    v-model="localIdentity.declarations.borrowedAmount"
                                />
                            </div>
                        </div>

                        <!-- Undisclosed Additional Loan -->
                        <div
                            v-if="activeSet == 5"
                            class="input-group"
                        >
                            <p class="question">Have you or will you be applying for a mortgage loan on another property (not the
                                property securing this loan) on or before closing this transaction that is not disclosed
                                on this loan application?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasUndisclosedAdditionalLoan"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasUndisclosedAdditionalLoan"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasUndisclosedAdditionalLoan"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasUndisclosedAdditionalLoan"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Undisclosed New Credit -->
                        <div
                            v-if="activeSet == 6"
                            class="input-group"
                        >
                            <p class="question">
                                Have you or will you be applying for any new credit (e.g., installment loan, credit card, etc.)
                                on or before closing this loan that is not disclosed on this application?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasUndisclosedNewCredit"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasUndisclosedNewCredit"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasUndisclosedNewCredit"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasUndisclosedNewCredit"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Additional Lien -->
                        <div
                            v-if="activeSet == 7"
                            class="input-group"
                        >
                            <p class="question">
                                Will this property be subject to a lien that could take priority over the first mortgage
                                lien, such as a clean energy lien paid through your property taxes (e.g., the Property
                                Assessed Clean Energy Program)?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasadditionalLien"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasadditionalLien"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasadditionalLien"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasadditionalLien"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Undisclosed Debt -->
                        <div
                            v-if="activeSet == 8"
                            class="input-group"
                        >
                            <p class="question">
                                Are you a co-signer or guarantor on any debt or loan that is not disclosed on this application?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasUndisclosedDebt"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasUndisclosedDebt"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasUndisclosedDebt"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasUndisclosedDebt"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Outstanding Judgements -->
                        <div
                            v-if="activeSet == 9"
                            class="input-group"
                        >
                            <p class="question">
                                Do you currently have any outstanding judgements?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="outstandingJudgements"
                                        width="100%"
                                        v-model="localIdentity.declarations.outstandingJudgements"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="outstandingJudgements"
                                        width="100%"
                                        v-model="localIdentity.declarations.outstandingJudgements"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Delinquent Debt -->
                        <div
                            v-if="activeSet == 10"
                            class="input-group"
                        >
                            <p class="question">
                                Are you currently delinquent on any federal debt or any other loans?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasDelinquentDebt"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasDelinquentDebt"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasDelinquentDebt"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasDelinquentDebt"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Lawsuit Liability -->
                        <div
                            v-if="activeSet == 11"
                            class="input-group"
                        >
                            <p class="question">
                                Are you a party to a lawsuit in which you potentially have any personal financial liability?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasLawsuitLiability"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasLawsuitLiability"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasDelinquentDebt"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasLawsuitLiability"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Conveyed Title -->
                        <div
                            v-if="activeSet == 12"
                            class="input-group"
                        >
                            <p class="question">
                                Have you conveyed title to any property in lieu of foreclosure in the past 7 years?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasConveyedTitle"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasConveyedTitle"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasConveyedTitle"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasConveyedTitle"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Pre-foreclosure or Short Sale -->
                        <div
                            v-if="activeSet == 13"
                            class="input-group"
                        >
                            <p class="question">
                                Within the past 7 years, have you completed a pre-foreclosure sale or short sale, whereby
                                the property was sold to a third party and the Lender agreed to accept less than the
                                outstanding mortgage balance due?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hadPreforeclosureOrShortsale"
                                        width="100%"
                                        v-model="localIdentity.declarations.hadPreforeclosureOrShortsale"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hadPreforeclosureOrShortsale"
                                        width="100%"
                                        v-model="localIdentity.declarations.hadPreforeclosureOrShortsale"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Recent Foreclosure -->
                        <div
                            v-if="activeSet == 14"
                            class="input-group"
                        >
                            <p class="question">
                                Have you held ownership in a property that has resulted in foreclosure in the last seven years?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hadRecentForeclosure"
                                        width="100%"
                                        v-model="localIdentity.declarations.hadRecentForeclosure"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasRecentForeclosure"
                                        width="100%"
                                        v-model="localIdentity.declarations.hadRecentForeclosure"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Bankruptcy -->
                        <div
                            v-if="activeSet == 15"
                            class="input-group"
                        >
                            <p class="question">
                                Have you been declared bankrupt in the last seven years?
                            </p>
                            <div class="inline-group">
                                <div class="radioButton-container">
                                    <radio-button
                                        label="Yes"
                                        name="hasDeclaredBankruptcy"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasDeclaredBankruptcy"
                                    />
                                </div>

                                <div class="radioButton-container">
                                    <radio-button
                                        label="No"
                                        name="hasDeclaredBankruptcy"
                                        width="100%"
                                        v-model="localIdentity.declarations.hasDeclaredBankruptcy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </question-slider>
            </transition>

            <view-controls
                @advance-app="submitQuestion()"
                @retreat-app="goToPreviousPage()"
            />
        </div>
    </div>
</template>

<script>
import declarations from "@/includes/mixins/application/declarations";
import identity from "@/includes/mixins/application/identity";

export default {
    name: "Declarations",
    mixins: [identity, declarations],
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        submitQuestion() {
            this.$router.push("/identity/coborrower-declarations");
        },

    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 650px;
    margin: 0 auto;
}

.question, label {
    text-align: center;
    color: #fff;
    font-weight: 600;
    margin-bottom: 2rem;
}

.input-group {
    &.restrict-width {
        width: 28rem;
        margin: 0 auto;
    }
}
.inline-group {
    justify-content: center;
}
.multiselect {
    width: 28rem;
}
.radioButton-container {
    width: 10rem;
}
</style>
