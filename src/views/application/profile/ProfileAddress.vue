<template>
    <div class="profileAddress">
        <page-heading :theme="appTheme">
            {{ $t('headings.profile2') }}
        </page-heading>

        <div class="pageWrapper">
            <!-- State/Unit Group -->
            <div class="inline-form-group">
                <!-- Street Address -->
                <div class="input-group">
                    <app-label
                        :theme="appTheme"
                        for="address"
                    >Home Address</app-label>
                    <text-field
                        id="address"
                        :theme="appTheme"
                        type="text"
                        name="address"
                        v-model="localProfile.streetAddress"
                    />
                </div>

                <!-- Unit -->
                <div class="input-group short">
                    <app-label
                        :theme="appTheme"
                        for="suite"
                    >Unit / Apt.</app-label>
                    <text-field
                        :theme="appTheme"
                        id="suite"
                        type="text"
                        name="suite"
                        v-model="localProfile.unit"
                    />
                </div>
            </div>

            <!-- City -->
            <div class="input-group">
                <app-label
                    :theme="appTheme"
                    for="city"
                >City</app-label>
                <text-field
                    :theme="appTheme"
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
                    <app-label :theme="appTheme">State</app-label>
                    <multi-select
                        :options="states"
                        :can-clear="false"
                        name="state"
                        :class="appTheme"
                        v-model="localProfile.state"
                    />
                </div>

                <!-- Zip Code -->
                <div class="input-group short">
                    <app-label
                        :theme="appTheme"
                        for="zipcode"
                    >Zip Code</app-label>
                    <text-field
                        type="number"
                        id="zipcode"
                        :theme="appTheme"
                        name="zipcode"
                        v-model="localProfile.zipcode"
                    />
                </div>
            </div>

            <view-controls
                @advance-app="submitPage()"
                @retreat-app="toggleComponent(1)"
                :theme="appTheme"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import profile from "@/includes/mixins/application/profile";

export default {
    name: "ProfileAddress",
    mixins: [profile],
    props: {
        toggleComponent: {
            type: Function,
        },
        saveState: {
            type: Function,
        },
        profile: {
            type: Object,
        },
    },

    data() {
        return {
            localProfile: {},
        };
    },

    computed: {
        ...mapState(["application", "states"]),
    },

    methods: {
        ...mapActions(["postBorrowerProfile"]),

        submitPage() {
            this.saveState(this.localProfile);
            if (this.application.sectionProgress.profile >= 1) {
                this.localDataIsPosting = true;
                this.postBorrowerProfile(this.localProfile).then(() => {
                    this.$router.push("/about/referral");
                });
            } else {
                this.toggleComponent(3);
            }
        },
    },
    mounted() {
        this.localProfile = this.deepClone(this.profile);
    },
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 350px;
    margin: 0 auto;
}
</style>
