<template>
    <div class="referral">
        <h1 class="appHeading">How did you hear about Ruoff Mortgage?</h1>

        <div class="body-wrapper">
            <div class="input-group">
                <app-label
                    theme="dark"
                    for="referralSource"
                >Referral Source</app-label>
                <multi-select
                    :options="sourceOptions"
                    :can-clear="false"
                    v-model="localAbout.referralSource"
                />
            </div>

            <div
                v-if="localAbout.referralSource === 'Realtor'
                    || localAbout.referralSource === 'Other'"
                class="input-group"
            >
                <app-label theme="dark">Please specify:</app-label>
                <text-field v-model="localAbout.referralSourceName" />
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
    name: "Referral",
    mixins: [about],
    data() {
        return {
            sourceOptions: [
                {
                    label: "Online Advertisement",
                    value: "Online Advertisement",
                },
                {
                    label: "Social Media",
                    value: "Social Media",
                },
                {
                    label: "Radio",
                    value: "Radio",
                },
                {
                    label: "TV",
                    value: "TV",
                },
                {
                    label: "Realtor",
                    value: "Realtor",
                },
                {
                    label: "Preferred Partner",
                    value: "Preferred Partner",
                },
                {
                    label: "Other",
                    value: "Other",
                },
            ],
        };
    },
    methods: {
        async submitPage() {
            if (this.localDataIsPosting == false) {
                // start loader
                this.localDataIsPosting = true;
                // post data
                await this.postBorrowerProfile(this.localAbout);
                // post progress
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < 3
                ) {
                    this.localSectionProgress.about = 3;
                    this.postSectionProgress(this.sectionProgressa);
                }
                // next route
                this.$router.push("/about/select-loan-officer");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.referral {
    .body-wrapper {
        width: 300px;
        margin: 0 auto;
    }
}
</style>
