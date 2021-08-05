<template>
    <div class="demographics">
        <h1 class="appHeading">Borrower Demographics</h1>
        <div
            v-if="localIdentity.demographics"
            class="pageWrapper"
        >
            <p class="pageCopy">
                The following information is requested by the federal government for
                certain types of loans related to a dwelling in order to monitor the
                lender's compliance with equal credit opportunity, fair housing, and
                home mortgage disclosure laws. You are not required to furnish this
                information, but are encouraged to do so. You may select one or more
                designations for "Race." The law provides that a lender may not
                discriminate on the basis of this information, or on whether you choose
                to furnish it. However, if you choose not to furnish the information and
                you have made this application in person, under federal regulations the
                lender is required to note ethnicity, race, and gender on the basis of
                visual observation or surname. If you do not wish to furnish the
                information, please check below.
            </p>

            <div class="optOut-container">
                <check-box
                    id="optOut"
                    label="I do not wish to provide this information"
                    v-model:checked="localIdentity.demographics.isOptingOut"
                />
            </div>

            <question-slider
                v-if="localIdentity.demographics.isOptingOut === false"
                :active-set="activeSet"
                :set-total="setTotal"
                @advance="goToNextQuestion()"
                @retreat="goToPreviousQuestion()"
            >
                <!-- Ethnicity -->
                <div v-if="activeSet === 1" class="input-group">
                    <app-label theme="dark">What is your ethnicity?</app-label>
                    <multi-select
                        :options="[
                            {
                                value: 'Hispanic or Latino',
                                label: 'Hispanic or Latino'
                            },
                            {
                                value: 'Not Hispanic or Latino',
                                label: 'Not Hispanic or Latino'
                            },
                            {
                                value: 'Not Applicable',
                                label: 'Not Applicable'
                            },
                        ]"
                        :can-clear="false"
                        class="multiselect"
                        v-model="localIdentity.demographics.ethnicity"
                    />
                </div>

                <!-- Gender -->
                <div v-if="activeSet === 2" class="input-group">
                    <app-label theme="dark">What is your gender?</app-label>
                    <multi-select
                        :options="[
                            {
                                value: 'Male',
                                label: 'Male'
                            },
                            {
                                value: 'Female',
                                label: 'Female'
                            },
                            {
                                value: 'Not Applicable',
                                label: 'Not Applicable'
                            },
                        ]"
                        :can-clear="false"
                        class="multiselect"
                        v-model="localIdentity.demographics.gender"
                    />
                </div>

                <!-- Race -->
                <div v-if="activeSet === 3" class="input-group">
                    <app-label theme="dark">What is your race?</app-label>
                    <multi-select
                        mode="tags"
                        :options="[
                            {
                                value: 'Asian',
                                label: 'Asian'
                            },
                            {
                                value: 'Black/African-American',
                                label: 'Black/African-American'
                            },
                            {
                                value: 'Native Hawaiian/Other Pacific Islander',
                                label: 'Native Hawaiian/Other Pacific Islander'
                            },
                            {
                                value: 'American Indiana or Alaska Native',
                                label: 'American Indiana or Alaska Native'
                            },
                            {
                                value: 'White',
                                label: 'White'
                            },
                            {
                                value: 'Information Not Provided',
                                label: 'Information Not Provided'
                            },
                            {
                                value: 'Not Applicable',
                                label: 'Not Applicable'
                            },
                        ]"
                        :can-clear="false"
                        class="multiselect"
                        v-model="localIdentity.demographics.race"
                    />
                </div>
            </question-slider>

            <view-controls
                @advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
            />
        </div>

        <transition name="fade">
            <div
                v-if="localDataIsLoading"
                class="loading-wrapper"
            >
                <loading-indicator />
            </div>
        </transition>
    </div>
</template>

<script>
import identity from "@/includes/mixins/application/identity";
import demographics from "@/includes/mixins/application/demographics";

export default {
    name: "Demographics",
    mixins: [identity, demographics],
    components: {},
    data() {
        return {};
    },
    methods: {
        submitPage() {
            this.$router.push("/identity/coborrower-demographics");
        },
    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 650px;
    margin: 0 auto;
}
.pageCopy {
    margin-bottom: 2rem;
    font-size: 16px;
}

.name {
    margin-bottom: 2rem;
    font-size: 20px;
    color: #fff;
    text-align: center;
}

.optOut-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 500;

    .optOutLabel {
        color: #fff;
        font-weight: 500;
        font-size: 16px;
    }
}

.question, label {
    text-align: center;
    color: #fff;
    font-weight: 600;
    margin-bottom: 2rem;
}

.multiselect {
    width: 28rem;
}
</style>
