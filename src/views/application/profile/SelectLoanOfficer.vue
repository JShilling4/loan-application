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
                @next-view="submitPage()"
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
                    this.applicationData.progress.profile === null ||
                    this.applicationData.progress.profile < 4
                ) {
                    this.localApplicationData.progress.profile = 4;
                    this.postApplicationData(this.localApplicationData);
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
