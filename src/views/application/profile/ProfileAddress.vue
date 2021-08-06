<template>
    <div class="profileAddress">
        <h1 class="appHeading">{{ $t('headings.profile2') }}</h1>

        <div class="pageWrapper">
            <!-- State/Unit Group -->
            <div class="inline-form-group">
                <!-- Street Address -->
                <div class="input-group">
                    <app-label
                        class-list="dark"
                        for="address"
                    >Home Address</app-label>
                    <text-field
                        id="address"
                        class-list="dark"
                        type="text"
                        name="address"
                        v-model="localProfile.streetAddress"
                    />
                </div>

                <!-- Unit -->
                <div class="input-group short">
                    <app-label
                        class-list="dark"
                        for="suite"
                    >Unit / Apt.</app-label>
                    <text-field
                        class-list="dark"
                        id="suite"
                        type="text"
                        name="suite"
                        v-model="localProfile.unit"
                    />
                </div>
            </div>

            <!-- City -->
            <div class="input-group">
                <app-label class-list="dark">City</app-label>
                <text-field
                    class-list="dark"
                    id="city"
                    type="text"
                    name="city"
                    v-model="localProfile.city"
                />
            </div>

            <!-- State/Zip Group -->
            <div class="inline-form-group">
                <!-- State -->
                <div class="input-group">
                    <app-label class-list="dark">State</app-label>
                    <multi-select
                        :options="states"
                        :can-clear="false"
                        name="state"
                        v-model="localProfile.state"
                    />
                </div>

                <!-- Zip Code -->
                <div class="input-group short">
                    <app-label
                        class-list="dark"
                        for="zipcode"
                    >Zip Code</app-label>
                    <text-field
                        type="number"
                        id="zipcode"
                        name="zipcode"
                        class-list="dark"
                        v-model="localProfile.zipcode"
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
import profile from "@/includes/mixins/application/profile";

export default {
    name: "ProfileAddress",
    mixins: [profile],
    methods: {
        async submitPage() {
            if (this.localDataIsPosting == false) {
                this.localDataIsPosting = true;
                await this.postBorrowerProfile(this.localProfile);

                if (
                    this.sectionProgress.profile === null ||
                    this.sectionProgress.profile < 2
                ) {
                    this.localSectionProgress.profile = 2;
                    this.postSectionProgress(this.sectionProgress);
                }
                this.$router.push("/profile/referral");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 350px;
    margin: 0 auto;
}
</style>
