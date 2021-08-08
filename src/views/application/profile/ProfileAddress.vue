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
                @retreat-app="toggleComponent(1)"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { deepClone } from "@/includes/mixins/helpers";

export default {
    name: "ProfileAddress",
    mixins: [deepClone],
    props: {
        toggleComponent: {
            type: Function,
        },
        saveState: {
            type: Function,
        },
        profile: {
            type: Object,
        }
    },

    data() {
        return {
            localProfile: {},
        }
    },

    computed: {
        ...mapState(["application", "appTheme", "states"]),
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
        }
    },
    mounted() {
        this.localProfile = this.deepClone(this.profile);
    }
};
</script>

<style lang="scss" scoped>
.pageWrapper {
    width: 350px;
    margin: 0 auto;
}
</style>
