<template>
    <div class="referral">
        <page-heading :theme="appTheme">
            Loan Officer Selection
        </page-heading>

        <div class="body-wrapper">
            <div class="input-group">
                <app-label for="referralSource" :theme="appTheme">Loan Officer</app-label>
                <multi-select
                    :options="sourceOptions"
                    :can-clear="false"
                    :class="[appTheme]"
                    v-model="localAbout.loanOfficer"
                />
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

const SECTION_NUMBER = 2;

export default {
    name: "Referral",
    mixins: [about],
    data() {
        return {
            sourceOptions: [
                {
                    label: "Clint Morgan",
                    value: "clintmorgan",
                },
                {
                    label: "Adam Garman",
                    value: "adamgarman",
                },
                {
                    label: "Ryan Frantz",
                    value: "ryanfrantz",
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
                await this.postBorrowerAbout(this.localAbout);
                // post progress if newly completed
                if (
                    this.sectionProgress.about === null ||
                    this.sectionProgress.about < SECTION_NUMBER
                ) {
                    this.localSectionProgress.about = SECTION_NUMBER;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
				this.$router.push("/about/veteran");
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
