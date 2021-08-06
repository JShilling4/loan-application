<template>
    <div class="referral">
        <h1 class="appHeading">Loan Officer Selection</h1>

        <div class="body-wrapper">
            <div class="input-group">
                <app-label for="referralSource">Loan Officer</app-label>
                <multi-select
                    :options="sourceOptions"
                    :can-clear="false"
                    v-model="localProfile.loanOfficer"
                />
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
import profile from "@/includes/mixins/application/profile";

export default {
    name: "Referral",
    mixins: [profile],
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
                await this.postBorrowerProfile(this.localProfile);
                // post progress
                if (
                    this.sectionProgress.profile === null ||
                    this.sectionProgress.profile < 4
                ) {
                    this.localSectionProgress.profile = 4;
                    this.postSectionProgress(this.localSectionProgress);
                }
                // next route
                if (this.borrowerData.profile.password === null) {
					this.$router.push("/profile/create-password");
				} else {
					this.$router.push("/about/veteran");
				}
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
