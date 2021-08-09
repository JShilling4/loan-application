<template>
    <div
        v-if="localCoborrowerProfile"
        class="coborrowerAddress"
    >
        <page-heading :theme="appTheme">
            Please provide coborrower information.
        </page-heading>

        <div class="pageWrapper">
            <div class="inline-form-group">
                <!-- Street Address -->
                <div class="input-group">
                    <app-label
                        :theme="appTheme"
                        for="route"
                    >Home Address</app-label>
                    <text-field
                        id="addressAutocomplete"
                        :theme="appTheme"
                        type="text"
                        name="HomeAddress"
                        v-model="localCoborrowerProfile.streetAddress"
                    />
                </div>

                <!-- Unit -->
                <div class="input-group short">
                    <app-label
                        :theme="appTheme"
                        for="unitNumber"
                    >Unit / Apt.</app-label>
                    <text-field
                        :theme="appTheme"
                        id="unitNumber"
                        type="text"
                        name="Unit"
                        v-model="localCoborrowerProfile.apartmentNumber"
                    />
                </div>
            </div>

            <!-- City -->
            <div class="input-group">
                <app-label :theme="appTheme">City</app-label>
                <text-field
                    :theme="appTheme"
                    id="dynamicId"
                    type="text"
                    name="City"
                    v-model="localCoborrowerProfile.city"
                />
            </div>

            <!-- Unit/City/State/Zip Group -->
            <div class="inline-form-group">
                <!-- State -->
                <div class="input-group">
                    <app-label :theme="appTheme">State</app-label>
                    <multi-select
                        :options="states"
                        :can-clear="false"
                        :class="[appTheme]"
                        v-model="localCoborrowerProfile.state"
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
                        :theme="appTheme"
                        v-model="localCoborrowerProfile.zipcode"
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

const SECTION_NUMBER = 6;

export default {
    name: "CoborrowerAddress",
    mixins: [about],
    components: {},

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
				this.$router.push("/about/coborrower/auth");
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
