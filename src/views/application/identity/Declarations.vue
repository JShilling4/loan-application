<template>
    <div class="declarations">
        <h1 class="appHeading">Declarations</h1>
        <div class="pageWrapper">
            <p class="pageCopy">
                The federal government requires us to ask the questions below.
            </p>

            <div class="questionBox">
                <div class="questionSlider">
                    <!-- Citizenship Status -->
                    <div class="input-group">
                        <app-label>What is your citizenship status?</app-label>
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
                    </div>

                    <!-- Primary Residence -->
                    <div class="input-group">
                        <app-label>Will you occupy the property as your primary residence?</app-label>
                        <div class="inline-group">
                            <div class="radioButton-container">
                                <radio-button
                                    label="Yes"
                                    name="currentOrPriorEmployer"
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
                    </div>

                    <!-- Relation to Seller -->
                    <div class="input-group">
                        <app-label>Do you have a family relationship or business affiliation with the seller of the property?</app-label>
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
                    </div>

                    <!-- Borrowing Money -->
                    <div class="input-group">
                        <app-label>Are you borrowing any money for this real estate transaction (e.g., money for your
                            closing costs or down payment) or obtaining any money from another party, such as the
                            seller or realtor, that you have not disclosed on this loan application?
                        </app-label>
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
                    </div>

                    <!-- Undisclosed Additional Loan -->
                    <div class="input-group">
                        <app-label>Have you or will you be applying for a mortgage loan on another property (not the
                            property securing this loan) on or before closing this transaction that is not disclosed
                            on this loan application?
                        </app-label>
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
                    </div>
                </div>
            </div>

            <view-controls @next-view="$router.push('/identity/coborrower-declarations')" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Declarations",
    data() {
        return {
            localDeclarations: {},
        };
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
    padding: 2rem 8rem;
    border: 1px solid #fff;
    border-radius: 5px;

    .questionSlider {
        text-align: center;
        width: 350px;
        margin: 0 auto;
    }
}
</style>
