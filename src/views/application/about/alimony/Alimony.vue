<template>
    <div class="alimony">
        <h1 class="appHeading">Alimony/Chid Support</h1>

        <div class="body-wrapper">
            <!-- Pay/Recieve Support -->
            <div class="input-group">
                <app-label
                    class-list="dark"
                    for="payReceiveSupport"
                >
                    {{ borrowerData.profile.firstName }}, do you pay or receive alimony
                    or child support?
                </app-label>
                <multi-select
                    :options="[
						{ value: 'Pay', label: 'Pay' },
						{ value: 'Receive', label: 'Receive' },
						{ value: 'NotApplicable', label: 'Not Applicable' }
					]"
                    :can-clear="false"
                    v-model="localAbout.payOrReceiveSupport"
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
                    v-model="localAbout.supportType"
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
                        v-model="localAbout.supportAmount"
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
            />
        </div>
    </div>
</template>

<script>
import about from "@/includes/mixins/application/about";

export default {
    name: "Alimony",
    mixins: [about],
    data() {
        return {
            supportFrequency: "month",
        };
    },
    computed: {
        compInputsShouldShow() {
            return (
                this.localAbout.payOrReceiveSupport !== "NotApplicable" &&
                this.localAbout.payOrReceiveSupport !== null
            );
        },
    },
    methods: {
        async submitPage() {
            if (this.localDataIsPosting !== true) {
                this.localDataIsPosting = true;

                await this.postBorrowerAbout(this.localAbout);

                if (this.localAbout.hasCoborrower) {
                    this.editSectionProgress(8);
                    this.$router.push("/about/coborrower-alimony");
                } else {
                    this.editSectionProgress(4);
                    this.$router.push("/property/loan-type");
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.alimony {
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
