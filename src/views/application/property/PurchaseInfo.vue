<template>
    <div class="purchaseInfo">
        <page-heading :theme="appTheme">
            Describe the property you would like to buy
        </page-heading>

        <form class="pageForm">
            <!-- Found Home -->
            <div class="inline-form-group">
                <div class="label-container">
                    <app-label :theme="appTheme">
                        Have you found a home yet?
                    </app-label>
                </div>

                <div class="inline-input-container">
                    <div class="radioButton-container">
                        <radio-button
                            label="Yes"
                            id="foundHomeYes"
                            name="foundHome"
                            v-model="localProperty.foundHome"
                            @input="clearInputSet('looking')"
                        />
                    </div>

                    <div class="radioButton-container">
                        <radio-button
                            label="No"
                            id="foundHomeNo"
                            name="foundHome"
                            v-model="localProperty.foundHome"
                            @input="clearInputSet('location')"
                        />
                    </div>
                </div>
            </div>

            <!-- If yes found home, property location -->
            <div v-if="localProperty.foundHome == 'Yes'">
                <!-- Property location city -->
                <div class="inline-form-group">
                    <div class="label-container">
                        <app-label
                            :theme="appTheme"
                            for="propertyLocationCity"
                        >
                            Which city is the property located in?
                        </app-label>
                    </div>

                    <div class="inline-input-container">
                        <text-field
                            :theme="appTheme"
                            type="text"
                            id="propertyLocationCity"
                            v-model="localProperty.propertyLocationCity"
                        />
                    </div>
                </div>

                <!-- Property location state -->
                <div class="inline-form-group">
                    <div class="label-container">
                        <app-label :theme="appTheme">
                            Which state is the property located in?
                        </app-label>
                    </div>

                    <div class="inline-input-container">
                        <multi-select
                            :options="states"
                            :can-clear="false"
                            :class="[appTheme]"
                            v-model="localProperty.propertyLocationState"
                        />
                    </div>
                </div>
            </div>

            <!-- If no found home, where looking -->
            <div v-if="localProperty.foundHome == 'No'">
                <!-- Where looking city -->
                <div class="inline-form-group">
                    <div class="label-container">
                        <app-label
                            :theme="appTheme"
                            for="propertyLocationCity"
                        >
                            In which city are you looking to buy?
                        </app-label>
                    </div>

                    <div class="inline-input-container">
                        <text-field
                            :theme="appTheme"
                            type="text"
                            id="propertyLocationCity"
                            v-model="localProperty.whereLookingCity"
                        />
                    </div>
                </div>

                <!-- Property location state -->
                <div class="inline-form-group">
                    <div class="label-container">
                        <app-label :theme="appTheme">
                            In which state are you looking to buy?
                        </app-label>
                    </div>

                    <div class="inline-input-container">
                        <multi-select
                            :options="states"
                            :can-clear="false"
                            :class="[appTheme]"
                            v-model="localProperty.whereLookingState"
                        />
                    </div>
                </div>
            </div>

            <!-- Property Use -->
            <div class="inline-form-group">
                <div class="label-container">
                    <app-label
                        :theme="appTheme"
                        for="propertyUse"
                    >
                        How do you plan to use this property?
                    </app-label>
                </div>

                <div class="inline-input-container">
                    <multi-select
                        :options="[
							{ value: 'primary', label: 'Primary Residence' },
							{
								value: 'secondary',
								label: 'Secondary/Vacation'
							},
							{ value: 'notApplicable', label: 'Not Applicable' }
						]"
                        :can-clear="false"
                        :class="[appTheme]"
                        v-model="localProperty.propertyUse"
                    />
                </div>
            </div>

            <!-- Real Estate Agent -->
            <div class="inline-form-group">
                <div class="label-container">
                    <app-label :theme="appTheme">
                        Are you currently working with a real estate agent?
                    </app-label>
                </div>

                <div class="inline-input-container">
                    <div class="radioButton-container">
                        <radio-button
                            label="Yes"
                            value="yes"
                            id="hasRealEstateAgentYes"
                            name="hasRealEstateAgent"
                            v-model="localProperty.hasRealEstateAgent"
                        />
                    </div>

                    <div class="radioButton-container">
                        <radio-button
                            label="No"
                            value="no"
                            id="hasRealEstateAgentNo"
                            name="hasRealEstateAgent"
                            v-model="localProperty.hasRealEstateAgent"
                            @input="clearInputSet('agentName')"
                        />
                    </div>
                </div>
            </div>

            <!-- If yes realtor, realtor name -->
            <div v-if="localProperty.hasRealEstateAgent == 'Yes'">
                <!-- Real Estate Agent Name -->
                <div class="inline-form-group">
                    <div class="label-container">
                        <app-label
                            :theme="appTheme"
                            for="realEstateAgentName"
                        >
                            Name of Real Estate Agent?
                        </app-label>
                    </div>

                    <div class="inline-input-container">
                        <text-field
                            :theme="appTheme"
                            type="text"
                            id="realEstateAgentName"
                            v-model="localProperty.realEstateAgentName"
                        />
                    </div>
                </div>
            </div>

            <!-- Page Submit -->
            <view-controls
                @advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
                :local-posting="localDataIsPosting"
                :theme="appTheme"
            />
        </form>
    </div>
</template>

<script>
import property from "@/includes/mixins/application/property";

const SECTION_NUMBER = 4;

export default {
    name: "PurchaseInfo",
    mixins: [property],

    methods: {
        clearInputSet(inputSet) {
            switch (inputSet) {
                case "looking": {
                    this.localProperty.whereLookingCity = null;
                    this.localProperty.whereLookingState = null;
                    break;
                }
                case "location": {
                    this.localProperty.propertyLocationCity = null;
                    this.localProperty.propertyLocationState = null;
                    break;
                }
                case "agentName": {
                    this.localProperty.realEstateAgentName = null;
                    break;
                }
            }
        },

        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerProperty(this.localProperty);
                // post progress if newly completed
                if (
                    this.sectionProgress.property === null ||
                    this.sectionProgress.property < SECTION_NUMBER
                ) {
                    this.localSectionProgress.property = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                this.$router.push("/property/purchase-price");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.purchaseInfo {
    form {
        max-width: 620px;
    }
    .inline-form-group {
        margin: 0 0 3rem;
        align-items: center;
    }
    .label-container {
        width: 60%;
    }
    .inline-input-container {
        display: flex;
        justify-content: space-between;
        width: 40%;
    }
}
</style>
