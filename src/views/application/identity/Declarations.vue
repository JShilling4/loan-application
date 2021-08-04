<template>
    <div class="declarations">
        <h1 class="appHeading">Declarations</h1>
        <div class="pageWrapper">
            <p class="pageCopy">
                The federal government requires us to ask the following questions.
            </p>

            <div class="questionBox">
                <div class="questionSlider">
                    <!-- Citizenship Status -->
                    <div
                        v-if="activeSet === 1"
                        class="input-group"
                    >
                        <p class="question">What is your citizenship status?</p>
                        <!-- Borrower -->
                        <app-label>{{borrowerProfile.firstName}}</app-label>
                        <multi-select
                            :options="[
                                {
                                    value: 'US Citizen',
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
                            v-model="localDeclarations.citizenshipStatus"
                        />
                        <v-spacer height="1.5rem" />
                        <!-- Coborrower -->
                        <app-label>{{coborrowerProfile.firstName}}</app-label>
                        <multi-select
                            :options="[
                                {
                                    value: 'US Citizen',
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
                            v-model="localCoborrowerDeclarations.citizenshipStatus"
                        />
                    </div>

                    <!-- Primary Residence -->
                    <div
                        v-if="activeSet === 2"
                        class="input-group"
                    >
                        <p class="question">Will you occupy the property as your primary residence?</p>
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="primaryResidence"
                                    width="100%"
                                    v-model="localDeclarations.primaryResidence"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="primaryResidence"
                                    width="100%"
                                    v-model="localDeclarations.primaryResidence"
                                />
                            </div>
                        </div>
                        <v-spacer height="1.5rem" />
                        <!-- Coborrower -->
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coPrimaryResidence"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.primaryResidence"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coPrimaryResidence"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.primaryResidence"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Relation to Seller -->
                    <div
                        v-if="activeSet === 3"
                        class="input-group"
                    >v-if="activeSet == 1"
                        <p class="question">Do you have a family relationship or business affiliation with the seller of the property?</p>
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasRelationToSeller"
                                    width="100%"
                                    v-model="localDeclarations.hasRelationToSeller"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasRelationToSeller"
                                    width="100%"
                                    v-model="localDeclarations.hasRelationToSeller"
                                />
                            </div>
                        </div>
                        <v-spacer height="1.5rem" />
                        <!-- Coborrower -->
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasRelationToSeller"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasRelationToSeller"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasRelationToSeller"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasRelationToSeller"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="isBorrowingMoney"
                                    width="100%"
                                    v-model="localDeclarations.isBorrowingMoney"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="isBorrowingMoney"
                                    width="100%"
                                    v-model="localDeclarations.isBorrowingMoney"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coIsBorrowingMoney"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.isBorrowingMoney"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coIsBorrowingMoney"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.isBorrowingMoney"
                                />
                            </div>
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasUndisclosedAdditionalLoan"
                                    width="100%"
                                    v-model="localDeclarations.hasUndisclosedAdditionalLoan"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasUndisclosedAdditionalLoan"
                                    width="100%"
                                    v-model="localDeclarations.hasUndisclosedAdditionalLoan"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasUndisclosedAdditionalLoan"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasUndisclosedAdditionalLoan"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasUndisclosedAdditionalLoan"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasUndisclosedAdditionalLoan"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasUndisclosedNewCredit"
                                    width="100%"
                                    v-model="localDeclarations.hasUndisclosedNewCredit"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasUndisclosedNewCredit"
                                    width="100%"
                                    v-model="localDeclarations.hasUndisclosedNewCredit"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasUndisclosedNewCredit"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasUndisclosedNewCredit"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasUndisclosedNewCredit"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasUndisclosedNewCredit"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasadditionalLien"
                                    width="100%"
                                    v-model="localDeclarations.hasadditionalLien"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasadditionalLien"
                                    width="100%"
                                    v-model="localDeclarations.hasadditionalLien"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasadditionalLien"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasadditionalLien"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasadditionalLien"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasadditionalLien"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasUndisclosedDebt"
                                    width="100%"
                                    v-model="localDeclarations.hasUndisclosedDebt"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasUndisclosedDebt"
                                    width="100%"
                                    v-model="localDeclarations.hasUndisclosedDebt"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasUndisclosedDebt"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasUndisclosedDebt"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasUndisclosedDebt"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasUndisclosedDebt"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="outstandingJudgements"
                                    width="100%"
                                    v-model="localDeclarations.outstandingJudgements"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="outstandingJudgements"
                                    width="100%"
                                    v-model="localDeclarations.outstandingJudgements"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coOutstandingJudgements"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.outstandingJudgements"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coOutstandingJudgements"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.outstandingJudgements"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasDelinquentDebt"
                                    width="100%"
                                    v-model="localDeclarations.hasDelinquentDebt"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasDelinquentDebt"
                                    width="100%"
                                    v-model="localDeclarations.hasDelinquentDebt"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasDelinquentDebt"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasDelinquentDebt"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasDelinquentDebt"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasDelinquentDebt"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasLawsuitLiability"
                                    width="100%"
                                    v-model="localDeclarations.hasLawsuitLiability"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasDelinquentDebt"
                                    width="100%"
                                    v-model="localDeclarations.hasLawsuitLiability"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasLawsuitLiability"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasLawsuitLiability"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasLawsuitLiability"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasLawsuitLiability"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasConveyedTitle"
                                    width="100%"
                                    v-model="localDeclarations.hasConveyedTitle"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasConveyedTitle"
                                    width="100%"
                                    v-model="localDeclarations.hasConveyedTitle"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasConveyedTitle"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasConveyedTitle"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasConveyedTitle"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasConveyedTitle"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hadPreforeclosureOrShortsale"
                                    width="100%"
                                    v-model="localDeclarations.hadPreforeclosureOrShortsale"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hadPreforeclosureOrShortsale"
                                    width="100%"
                                    v-model="localDeclarations.hadPreforeclosureOrShortsale"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHadPreforeclosureOrShortsale"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hadPreforeclosureOrShortsale"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHadPreforeclosureOrShortsale"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hadPreforeclosureOrShortsale"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hadRecentForeclosure"
                                    width="100%"
                                    v-model="localDeclarations.hadRecentForeclosure"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasRecentForeclosure"
                                    width="100%"
                                    v-model="localDeclarations.hadRecentForeclosure"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHadRecentForeclosure"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hadRecentForeclosure"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasRecentForeclosure"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hadRecentForeclosure"
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
                        <!-- Borrower -->
                        <app-label>{{ borrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="hasDeclaredBankruptcy"
                                    width="100%"
                                    v-model="localDeclarations.hasDeclaredBankruptcy"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="hasDeclaredBankruptcy"
                                    width="100%"
                                    v-model="localDeclarations.hasDeclaredBankruptcy"
                                />
                            </div>
                        </div>
                        <!-- Coborrower -->
                        <v-spacer height="1.5rem" />
                        <app-label>{{ coborrowerProfile.firstName }}</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="coHasDeclaredBankruptcy"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasDeclaredBankruptcy"
                                />
                            </div>

                            <div class="radioButton-container">
                                <radio-button
                                    label="No"
                                    name="coHasDeclaredBankruptcy"
                                    width="100%"
                                    v-model="localCoborrowerDeclarations.hasDeclaredBankruptcy"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <view-controls
                @advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Declarations",
    data() {
        return {
            localDeclarations: {},
            localCoborrowerDeclarations: {},
            activeSet: 1,
            questionSets: 15,
        };
    },
    computed: {
        ...mapState(["borrower", "coborrower"]),
        borrowerProfile() {
            return this.borrower.borrower.profile;
        },
        coborrowerProfile() {
            return this.coborrower.coborrower.profile;
        },
    },
    methods: {
        submitPage() {
            this.$router.push("/identity/coborrower-declarations");
        },
    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 700px;
    margin: 0 auto;
}
.questionBox {
    width: 600px;
    margin: 4rem auto;
    /* padding: 2rem 8rem; */
    /* border: 1px solid #fff; */
    /* border-radius: 5px; */

    .questionSlider {
        text-align: center;
        width: 500px;
        margin: 0 auto;
    }

    .question {
        color: #fff;
        font-weight: 600;
        margin-bottom: 1rem;
    }
}

.input-group {
    margin-bottom: 3rem;
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
