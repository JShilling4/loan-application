<template>
    <div class="coborrowerAlimony">
        <page-heading :theme="appTheme">
            Coborrower Alimony/Chid Support
        </page-heading>

        <div class="body-wrapper">
            <!-- Pay/Recieve Support -->
            <div class="input-group">
                <app-label
                    class-list="dark"
                    for="payReceiveSupport"
                >
                    {{ localCoborrowerProfile.firstName }}, do you pay or receive
                    alimony or child support?
                </app-label>
                <multi-select
                    :options="[
						{ value: 'Pay', label: 'Pay' },
						{ value: 'Receive', label: 'Receive' },
						{ value: 'NotApplicable', label: 'Not Applicable' }
					]"
                    :can-clear="false"
                    v-model="localCoborrowerAbout.payOrReceiveSupport"
                />
            </div>

            <!-- Support Type -->
            <div
                v-if="compInputsShouldShow"
                class="input-group"
            >
                <app-label
                    class-list="dark"
                    for="payReceiveSupport"
                >
                    Child support or alimony?
                </app-label>
                <multi-select
                    :options="[
						{ value: 'ChildSupport', label: 'Child Support' },
						{ value: 'Alimony', label: 'Alimony' }
					]"
                    :can-clear="false"
                    v-model="localCoborrowerAbout.supportType"
                />
            </div>

            <!-- Support Amount/Frequency -->
            <div
                v-if="compInputsShouldShow"
                class="input-group"
            >
                <app-label
                    class-list="dark"
                    for="payReceiveSupport"
                >
                    How much do you pay?
                </app-label>
                <div class="inline-group">
                    <text-field
                        v-model="localCoborrowerAbout.supportAmount"
                        :is-currency="true"
                        class="supportAmount"
                    />

                    <!-- Payment Frequency -->
                    <multi-select
                        :options="[
                            { value: 'month', label: 'Month' },
                            { value: 'week', label: 'Week' },
                        ]"
                        :can-clear="false"
                        v-model="supportFrequency"
                        class="supportFrequency"
                    />
                </div>
            </div>

            <view-controls
                @advance-app="submitPage()"
                @retreat-app="$router.go(-1)"
                :local-posting="localDataIsPosting"
                :theme="appTheme"
            />
        </div>
    </div>
</template>

<script>
import about from "@/includes/mixins/application/about";

const SECTION_NUMBER = 11;

export default {
    name: "CoborrowerAlimony",
    mixins: [about],
    data() {
        return {
            supportFrequency: "month",
        };
    },
    computed: {
        compInputsShouldShow() {
            return (
                this.localCoborrowerAbout.payOrReceiveSupport !== "NotApplicable" &&
                this.localCoborrowerAbout.payOrReceiveSupport != null
            );
        },
    },
    methods: {
        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postCoborrowerAbout(this.localCoborrowerAbout);
                // post progress if newly completed
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < SECTION_NUMBER
                ) {
                    this.localSectionProgress.about = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
				this.$router.push("/property/loan-type");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.coborrowerAlimony {
    .body-wrapper {
        max-width: 300px;
        margin: 0 auto;
    }
    .inline-group {
        align-items: center;
        margin-bottom: 2rem;
    }
    .supportAmount {
        margin-right: 1rem;
    }

    .supportFrequency {
        width: 22rem;
    }
}
</style>
